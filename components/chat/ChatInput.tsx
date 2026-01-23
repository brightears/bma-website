'use client';

import { useState, useCallback, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder: string;
  isLoading?: boolean;
  disabled?: boolean;
  onFocus?: () => void;
}

/**
 * ChatInput Component
 *
 * Text input field with send button for the AI chat interface.
 * Matches existing BMAsia form styling with glassmorphism design.
 */
export function ChatInput({
  onSend,
  placeholder,
  isLoading = false,
  disabled = false,
  onFocus,
}: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = useCallback(() => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !isLoading && !disabled) {
      onSend(trimmedMessage);
      setMessage('');
    }
  }, [message, onSend, isLoading, disabled]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const canSend = message.trim().length > 0 && !isLoading && !disabled;

  return (
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
        onFocus={onFocus}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 bg-transparent border-none text-white placeholder-gray-400
                   focus:outline-none focus:ring-0 text-base"
        aria-label={placeholder}
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
        aria-label="Send message"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="w-5 h-5" aria-hidden="true" />
        )}
      </motion.button>
    </div>
  );
}

export default ChatInput;
