'use client';

import { useState, useCallback, KeyboardEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Loader2 } from 'lucide-react';
import { useChatContext } from './ChatContext';

/**
 * HeroChat Component
 *
 * Prominent chat input in the hero section.
 * Sends messages and opens the slide-in panel.
 */
export function HeroChat() {
  const t = useTranslations('chat');
  const { sendMessage, isConnecting, isOpen, openPanel } = useChatContext();
  const [message, setMessage] = useState('');

  const handleSend = useCallback(() => {
    const trimmed = message.trim();
    if (trimmed && !isConnecting) {
      sendMessage(trimmed);
      setMessage('');
    }
  }, [message, isConnecting, sendMessage]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleFocus = useCallback(() => {
    // Optionally open panel on focus to show quick actions
    // For now, only open when they send a message
  }, []);

  const canSend = message.trim().length > 0 && !isConnecting;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mt-10 w-full max-w-2xl mx-auto px-4"
    >
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-xl shadow-black/10">
        {/* Input area */}
        <div className="flex items-center gap-3 p-4">
          {/* Chat icon */}
          <div className="flex-shrink-0 text-brand-orange">
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
          </div>

          {/* Input field */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            placeholder={isConnecting ? t('status.connecting') : t('placeholder')}
            disabled={isConnecting}
            className="flex-1 bg-transparent border-none text-white placeholder-gray-400
                       focus:outline-none focus:ring-0 text-base"
            aria-label={t('placeholder')}
          />

          {/* Send button */}
          <motion.button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            whileHover={canSend ? { scale: 1.05 } : undefined}
            whileTap={canSend ? { scale: 0.95 } : undefined}
            className={`flex-shrink-0 p-2 rounded-lg transition-colors
              ${canSend
                ? 'bg-brand-orange hover:bg-brand-orange-dark text-white cursor-pointer'
                : 'bg-white/10 text-gray-500 cursor-not-allowed'
              }`}
            aria-label={t('send')}
          >
            {isConnecting ? (
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="w-5 h-5" aria-hidden="true" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default HeroChat;
