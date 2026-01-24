'use client';

import { useEffect, useRef, useState, useCallback, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { X, Headphones, User, Send, Loader2 } from 'lucide-react';
import { useChatContext } from './ChatContext';
import { QuickActions } from './QuickActions';
import { EscalationModal } from './EscalationModal';

/**
 * ChatPanel Component
 *
 * Slide-in panel from the right side of the screen.
 * Shows conversation history with the AI agent.
 */
export function ChatPanel() {
  const t = useTranslations('chat');
  const {
    messages,
    isOpen,
    isTyping,
    error,
    isConnecting,
    showEscalationModal,
    isSubmittingEscalation,
    closePanel,
    sendMessage,
    setShowEscalationModal,
    submitEscalation,
  } = useChatContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = useCallback(() => {
    const trimmed = inputValue.trim();
    if (trimmed && !isConnecting) {
      sendMessage(trimmed);
      setInputValue('');
    }
  }, [inputValue, isConnecting, sendMessage]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleQuickAction = useCallback(
    (message: string) => {
      sendMessage(message);
    },
    [sendMessage]
  );

  const canSend = inputValue.trim().length > 0 && !isConnecting;

  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:bg-transparent lg:backdrop-blur-none lg:pointer-events-none"
            onClick={closePanel}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-brand-dark/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-brand-orange" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-white font-semibold text-base">{t('assistantName')}</h2>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
                    <span className="text-gray-400 text-xs">{t('status.connected')}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={closePanel}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label={t('close')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-red-500/10 border-b border-red-500/20 px-4 py-2"
                >
                  <p className="text-red-400 text-sm">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
            >
              {/* Welcome state with quick actions */}
              {messages.length === 0 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-4"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-gray-400">
                      <Headphones className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-tl-sm text-sm text-gray-200 text-left">
                      {t('welcomePrompt')}
                    </div>
                  </div>
                  <div className="ml-11">
                    <QuickActions onSelect={handleQuickAction} disabled={false} />
                    <p className="text-sm text-gray-400 mt-3">{t('orAskAnything')}</p>
                  </div>
                </motion.div>
              )}

              {/* Messages */}
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-start gap-3 ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user'
                        ? 'bg-brand-orange/20 text-brand-orange'
                        : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Headphones className="w-4 h-4" aria-hidden="true" />
                    )}
                  </div>

                  {/* Message bubble */}
                  <div
                    className={`max-w-[80%] px-4 py-3 text-sm text-left ${
                      message.role === 'user'
                        ? 'bg-brand-orange/20 text-white rounded-2xl rounded-tr-sm'
                        : 'bg-white/10 text-gray-200 rounded-2xl rounded-tl-sm'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-gray-400">
                    <Headphones className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input area */}
            <div className="border-t border-white/10 p-4">
              <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isConnecting ? t('status.connecting') : t('placeholder')}
                  disabled={isConnecting}
                  className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-0 text-sm"
                  aria-label={t('placeholder')}
                />
                <motion.button
                  type="button"
                  onClick={handleSend}
                  disabled={!canSend}
                  whileHover={canSend ? { scale: 1.05 } : undefined}
                  whileTap={canSend ? { scale: 0.95 } : undefined}
                  className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                    canSend
                      ? 'bg-brand-orange hover:bg-brand-orange-dark text-white cursor-pointer'
                      : 'bg-white/10 text-gray-500 cursor-not-allowed'
                  }`}
                  aria-label={t('send')}
                >
                  {isConnecting ? (
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Send className="w-4 h-4" aria-hidden="true" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

      {/* Escalation Modal */}
      <EscalationModal
        isOpen={showEscalationModal}
        onClose={() => setShowEscalationModal(false)}
        onSubmit={submitEscalation}
        isSubmitting={isSubmittingEscalation}
      />
    </>
  );
}

export default ChatPanel;
