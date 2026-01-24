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

interface ChatContextType {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  error: string | null;
  isConnecting: boolean;
  openPanel: () => void;
  closePanel: () => void;
  sendMessage: (text: string) => Promise<void>;
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

  // Track session to prevent multiple startSession calls
  const sessionStartingRef = useRef(false);

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
        openPanel,
        closePanel,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
