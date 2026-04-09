'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useChatContext } from './ChatContext';

/**
 * FloatingChatButton — Mobile-only floating button
 *
 * Appears after scrolling past the hero section (400px).
 * Tapping opens the chat panel. Shows on mobile only (md:hidden).
 */
export function FloatingChatButton() {
  const { openPanel, isOpen } = useChatContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide when chat panel is already open
  if (isOpen) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={openPanel}
          className="md:hidden fixed bottom-6 right-6 z-50 bg-brand-orange hover:bg-brand-orange-dark text-white rounded-full p-4 shadow-lg shadow-brand-orange/30 transition-colors"
          aria-label="Chat with Lyra"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
