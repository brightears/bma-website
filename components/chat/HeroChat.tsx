'use client';

import { useState, useCallback, useRef } from 'react';
import { useConversation } from '@elevenlabs/react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { ChatInput } from './ChatInput';
import { ChatMessages, type ChatMessage } from './ChatMessages';
import { QuickActions } from './QuickActions';
import { ELEVENLABS } from '@/lib/constants';

/**
 * HeroChat Component
 *
 * Main AI chat interface for the BMAsia website.
 * Integrates with ElevenLabs Conversational AI in text-only mode.
 *
 * Features:
 * - Text-only mode (no audio processing)
 * - Expandable message panel
 * - Quick action suggestions
 * - Automatic reconnection handling
 * - Multi-language support via locale
 */
export function HeroChat() {
  const t = useTranslations('chat');
  const locale = useLocale();

  // State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
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
      // Handle agent responses
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
      });
      setHasStarted(true);
    } catch (err) {
      console.error('Failed to start session:', err);
      setError(t('errors.connectionFailed'));
      sessionStartingRef.current = false;
    }
  }, [conversation, hasStarted, t]);

  // Send a message
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      // Clear any previous error
      setError(null);

      // Ensure we have a session
      await ensureSession();

      // Add user message immediately
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        role: 'user',
        text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      // Expand the chat panel to show the conversation
      setIsExpanded(true);

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

  // Handle close - end session and clear messages
  const handleClose = useCallback(() => {
    setIsExpanded(false);
    setMessages([]);
    setHasStarted(false);
    setIsTyping(false);
    sessionStartingRef.current = false;
    if (conversation.status === 'connected') {
      conversation.endSession();
    }
  }, [conversation]);

  // Handle minimize - just collapse the panel
  const handleMinimize = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const isConnecting = conversation.status === 'connecting';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mt-10 w-full max-w-2xl mx-auto px-4"
    >
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-xl shadow-black/10">
        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-red-500/10 border-b border-red-500/20 px-4 py-2"
            >
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expandable message panel */}
        <AnimatePresence>
          {isExpanded && messages.length > 0 && (
            <ChatMessages
              messages={messages}
              onClose={handleClose}
              onMinimize={handleMinimize}
              isTyping={isTyping}
            />
          )}
        </AnimatePresence>

        {/* Input area */}
        <ChatInput
          onSend={sendMessage}
          placeholder={isConnecting ? t('status.connecting') : t('placeholder')}
          isLoading={isConnecting}
          disabled={false}
        />
      </div>

      {/* Quick actions */}
      <QuickActions onSelect={sendMessage} disabled={isConnecting} />
    </motion.div>
  );
}

export default HeroChat;
