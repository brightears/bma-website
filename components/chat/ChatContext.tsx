'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

export interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  text: string;
  timestamp: Date;
  actions?: string[];
}

export interface EscalationData {
  name: string;
  company: string;
  email: string;
}

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
  const pathname = usePathname();

  // State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEscalationModal, setShowEscalationModal] = useState(false);
  const [isSubmittingEscalation, setIsSubmittingEscalation] = useState(false);

  // Open panel
  const openPanel = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Close panel
  const closePanel = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Submit escalation with email to backend
  const submitEscalation = useCallback(
    async (data: EscalationData) => {
      setIsSubmittingEscalation(true);
      setError(null);

      try {
        const conversationHistory = messages
          .map((msg) => `${msg.role === 'user' ? 'Customer' : 'Agent'}: ${msg.text}`)
          .join('\n');

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

        setShowEscalationModal(false);

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

  // Send a message through the same-origin assistant gateway.
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      setError(null);

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

      try {
        const history = messages.slice(-8).map((message) => ({ role: message.role, text: message.text }));
        const response = await fetch('/api/assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            locale,
            pagePath: pathname,
            history,
          }),
        });

        if (!response.ok) {
          throw new Error('Chat request failed');
        }

        const data = await response.json() as { reply?: string; escalate?: boolean; actions?: string[] };
        if (!data.reply) throw new Error('Assistant returned no reply');

        setIsTyping(false);

        // Add agent response
        const agentMessage: ChatMessage = {
          id: `agent-${Date.now()}-${Math.random().toString(36).substring(7)}`,
          role: 'agent',
          text: data.reply,
          timestamp: new Date(),
          actions: data.actions,
        };
        setMessages((prev) => [...prev, agentMessage]);

        // Check if response triggers escalation
        if (data.escalate) {
          setShowEscalationModal(true);
        }
      } catch (err) {
        console.error('Failed to send message:', err);
        setError(t('errors.messageFailed'));
        setIsTyping(false);
      }
    },
    [locale, messages, pathname, t]
  );

  return (
    <ChatContext.Provider
      value={{
        messages,
        isOpen,
        isTyping,
        error,
        isConnecting: false, // No WebSocket connection needed
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
