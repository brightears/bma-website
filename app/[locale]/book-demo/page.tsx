'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CalendarCheck2, Clock3, MessagesSquare, ShieldCheck } from 'lucide-react';
import { BookingExperience } from '@/components/booking/BookingExperience';

export default function BookDemoPage() {
  const t = useTranslations('bookingPage');

  return (
    <div className="relative overflow-hidden bg-[#06111a]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[72rem] bg-[radial-gradient(circle_at_15%_17%,rgba(239,166,52,.16),transparent_29%),radial-gradient(circle_at_84%_31%,rgba(73,213,197,.12),transparent_30%)]" aria-hidden="true" />
      <div className="bma-grid-lines pointer-events-none absolute inset-x-0 top-0 h-[72rem] opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" aria-hidden="true" />

      <section className="relative px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40 lg:px-16">
        <div className="bma-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }} className="mx-auto max-w-5xl text-center">
            <p className="bma-kicker">{t('eyebrow')}</p>
            <h1 className="bma-display mt-6 text-[clamp(3.5rem,8vw,7.4rem)]">
              {t('title')}<br />
              <span className="bg-[linear-gradient(96deg,#efa634_0%,#e7c762_46%,#49d5c5_100%)] bg-clip-text text-transparent">{t('titleHighlight')}</span>
            </h1>
            <p className="bma-lede mx-auto mt-7 max-w-3xl text-lg sm:text-xl">{t('description')}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 font-label text-xs text-white/45">
              <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#efa634]" /> {t('duration')}</span>
              <span className="flex items-center gap-2"><MessagesSquare className="h-4 w-4 text-[#49d5c5]" /> {t('oneToOne')}</span>
              <span className="flex items-center gap-2"><CalendarCheck2 className="h-4 w-4 text-[#e7c762]" /> {t('calendar')}</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#49d5c5]" /> {t('noCommitment')}</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .12 }} className="relative mx-auto mt-14 max-w-[92rem]">
            <div className="pointer-events-none absolute -inset-px rounded-[2rem] bg-[linear-gradient(135deg,rgba(239,166,52,.58),rgba(255,255,255,.09)_32%,rgba(73,213,197,.52))]" aria-hidden="true" />
            <div className="bma-grain relative overflow-hidden rounded-[calc(2rem-1px)] bg-[#081923]/[0.985] shadow-[0_38px_120px_rgba(0,0,0,.45)]">
              <BookingExperience />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
