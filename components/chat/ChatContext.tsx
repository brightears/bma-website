'use client';

import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import { useConversation } from '@elevenlabs/react';
import { useTranslations, useLocale } from 'next-intl';
import { ELEVENLABS } from '@/lib/constants';

export interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  text: string;
  timestamp: Date;
}

export interface EscalationData {
  name: string;
  company: string;
  email: string;
}

// Phrases that trigger the escalation modal
const ESCALATION_TRIGGERS = [
  'connect you with',
  'speak with a human',
  'speak to someone',
  'one of our specialists',
  'escalate',
  'human agent',
  'specialist who can help',
  'team member',
];

// Patterns to detect when AI confirms email was captured (progressive profiling)
// These match AI responses like "Got it! I've noted john@example.com"
const LEAD_CAPTURE_PATTERNS = [
  /i've noted\s+(\S+@\S+\.\S+)/i,
  /i have\s+(\S+@\S+\.\S+)/i,
  /got it.*?(\S+@\S+\.\S+)/i,
  /noted.*?(\S+@\S+\.\S+)/i,
  /i'll send.*?to\s+(\S+@\S+\.\S+)/i,
];

interface ChatContextType {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  error: string | null;
  isConnecting: boolean;
  showEscalationModal: boolean;
  isSubmittingEscalation: boolean;
  openPanel: () => void;
  closePanel: () => void;
  sendMessage: (text: string) => Promise<void>;
  setShowEscalationModal: (show: boolean) => void;
  submitEscalation: (data: EscalationData) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within ChatProvider');
  }
  return context;
}

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const t = useTranslations('chat');
  const locale = useLocale();

  // State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEscalationModal, setShowEscalationModal] = useState(false);
  const [isSubmittingEscalation, setIsSubmittingEscalation] = useState(false);

  // Track session to prevent multiple startSession calls
  const sessionStartingRef = useRef(false);

  // Track if escalation has already been triggered this session
  const escalationTriggeredRef = useRef(false);

  // Track if lead has been captured this session (to avoid duplicate notifications)
  const leadCapturedRef = useRef(false);

  // ElevenLabs conversation hook
  const conversation = useConversation({
    textOnly: true,
    overrides: {
      agent: {
        language: locale,
      },
    },
    onConnect: () => {
      setError(null);
      sessionStartingRef.current = false;
    },
    onDisconnect: () => {
      setIsTyping(false);
      sessionStartingRef.current = false;
    },
    onMessage: (message) => {
      if (message.source === 'ai') {
        setIsTyping(false);
        const newMessage: ChatMessage = {
          id: `agent-${Date.now()}-${Math.random().toString(36).substring(7)}`,
          role: 'agent',
          text: message.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newMessage]);

        // Check if this message triggers escalation
        if (!escalationTriggeredRef.current) {
          const lowerMessage = message.message.toLowerCase();
          const isEscalation = ESCALATION_TRIGGERS.some(trigger =>
            lowerMessage.includes(trigger)
          );
          if (isEscalation) {
            escalationTriggeredRef.current = true;
            setShowEscalationModal(true);
          }
        }

        // Check if this message indicates lead capture (email collected)
        // Only capture if not already captured and not escalated
        if (!leadCapturedRef.current && !escalationTriggeredRef.current) {
          for (const pattern of LEAD_CAPTURE_PATTERNS) {
            const match = message.message.match(pattern);
            if (match && match[1]) {
              const capturedEmail = match[1];
              leadCapturedRef.current = true;

              // Build conversation summary for context
              const conversationSummary = messages
                .slice(-6) // Last 6 messages for context
                .map((msg) => `${msg.role === 'user' ? 'Customer' : 'Agent'}: ${msg.text}`)
                .join('\n');

              // Send lead capture notification (fire and forget)
              fetch('/api/chat-lead-capture', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: capturedEmail,
                  conversationSummary,
                  locale,
                }),
              }).catch((err) => {
                console.error('Lead capture notification failed:', err);
              });

              break; // Only capture first email match
            }
          }
        }
      }
    },
    onError: (err) => {
      console.error('Chat error:', err);
      setError(t('errors.connectionFailed'));
      setIsTyping(false);
      sessionStartingRef.current = false;
    },
  });

  // Start session if not already started
  const ensureSession = useCallback(async () => {
    if (hasStarted || sessionStartingRef.current) return;

    sessionStartingRef.current = true;
    setError(null);

    try {
      await conversation.startSession({
        agentId: ELEVENLABS.agentId,
        connectionType: 'websocket',
      });
      setHasStarted(true);
    } catch (err) {
      console.error('Failed to start session:', err);
      setError(t('errors.connectionFailed'));
      sessionStartingRef.current = false;
    }
  }, [conversation, hasStarted, t]);

  // Open panel
  const openPanel = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Close panel and optionally end session
  const closePanel = useCallback(() => {
    setIsOpen(false);
    // Don't end session - keep conversation for if they reopen
  }, []);

  // Submit escalation with email to backend
  const submitEscalation = useCallback(
    async (data: EscalationData) => {
      setIsSubmittingEscalation(true);
      setError(null);

      try {
        // Format conversation history for escalation
        const conversationHistory = messages
          .map((msg) => `${msg.role === 'user' ? 'Customer' : 'Agent'}: ${msg.text}`)
          .join('\n');

        // Send to our API route which forwards to bma_messenger_hub
        const response = await fetch('/api/chat-escalation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.email,
            name: data.name || undefined,
            company: data.company || undefined,
            conversationHistory,
            locale,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit escalation');
        }

        // Close modal
        setShowEscalationModal(false);

        // Add confirmation message to chat
        const confirmationMessage: ChatMessage = {
          id: `agent-confirm-${Date.now()}`,
          role: 'agent',
          text: t('escalation.success', { email: data.email }),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, confirmationMessage]);
      } catch (err) {
        console.error('Escalation error:', err);
        setError(t('escalation.error'));
      } finally {
        setIsSubmittingEscalation(false);
      }
    },
    [messages, locale, t]
  );

  // Send a message
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      setError(null);
      await ensureSession();

      // Add user message immediately
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        role: 'user',
        text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      // Open panel to show conversation
      setIsOpen(true);

      // Show typing indicator
      setIsTyping(true);

      // Send to ElevenLabs
      try {
        conversation.sendUserMessage(text);
      } catch (err) {
        console.error('Failed to send message:', err);
        setError(t('errors.messageFailed'));
        setIsTyping(false);
      }
    },
    [conversation, ensureSession, t]
  );

  const isConnecting = conversation.status === 'connecting';

  return (
    <ChatContext.Provider
      value={{
        messages,
        isOpen,
        isTyping,
        error,
        isConnecting,
        showEscalationModal,
        isSubmittingEscalation,
        openPanel,
        closePanel,
        sendMessage,
        setShowEscalationModal,
        submitEscalation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
