'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Sparkles, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useChatContext } from './ChatContext';

const NUDGE_KEY = 'bma-assistant-nudge-dismissed';
const NUDGE_INTERVAL = 24 * 60 * 60 * 1000;

export function FloatingChatButton() {
  const { openPanel, isOpen } = useChatContext();
  const t = useTranslations('chat');
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [showNudge, setShowNudge] = useState(false);

  useEffect(() => {
    const reveal = window.setTimeout(() => setVisible(true), 1_200);
    const lastDismissed = Number(window.localStorage.getItem(NUDGE_KEY) || 0);
    const mayNudge = Date.now() - lastDismissed > NUDGE_INTERVAL;
    const nudge = mayNudge ? window.setTimeout(() => setShowNudge(true), 9_000) : undefined;
    return () => {
      window.clearTimeout(reveal);
      if (nudge) window.clearTimeout(nudge);
    };
  }, [pathname]);

  const dismissNudge = () => {
    setShowNudge(false);
    window.localStorage.setItem(NUDGE_KEY, String(Date.now()));
  };

  const open = () => {
    dismissNudge();
    openPanel();
  };

  if (isOpen) return null;

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-5 right-4 z-50 flex items-end gap-3 sm:bottom-7 sm:right-7">
          <AnimatePresence>
            {showNudge && (
              <motion.div
                initial={{ opacity: 0, x: 15, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 10, scale: .97 }}
                className="relative hidden max-w-[18rem] overflow-hidden rounded-2xl border border-white/12 bg-[#091923]/95 p-4 pr-10 text-sm leading-5 text-white/70 shadow-[0_25px_80px_rgba(0,0,0,.45)] backdrop-blur-xl sm:block"
              >
                <span className="mb-2 flex items-center gap-2 font-label text-[.62rem] font-semibold uppercase tracking-[.16em] text-[#49d5c5]"><Sparkles className="h-3.5 w-3.5" /> {t('guideLabel')}</span>
                <button type="button" onClick={open} className="text-left transition hover:text-white">{t('nudge')}</button>
                <button type="button" onClick={dismissNudge} className="absolute right-2 top-2 rounded-full p-1.5 text-white/35 transition hover:bg-white/5 hover:text-white" aria-label={t('dismiss')}><X className="h-3.5 w-3.5" /></button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            initial={{ opacity: 0, scale: .78, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: .8, y: 16 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: .96 }}
            onClick={open}
            className="group relative grid h-15 w-15 place-items-center rounded-full border border-[#efa634]/55 bg-[#0a1923] text-white shadow-[0_16px_50px_rgba(0,0,0,.4),0_0_34px_rgba(239,166,52,.16)] sm:h-16 sm:w-16"
            aria-label={t('open')}
          >
            <span className="absolute inset-1 rounded-full bg-[linear-gradient(135deg,rgba(239,166,52,.26),rgba(73,213,197,.12))] transition group-hover:brightness-125" aria-hidden="true" />
            <MessageCircle className="relative h-6 w-6 text-[#f4bc58]" aria-hidden="true" />
            <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full border-2 border-[#0a1923] bg-[#49d5c5]" aria-hidden="true" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
