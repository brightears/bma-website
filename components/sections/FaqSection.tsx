'use client';

import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.62 },
};

type FaqItem = { q: string; a: string };

/**
 * Answers stay mounted in the server-rendered HTML at all times (AI crawlers
 * and search engines read the static markup); expanding only toggles CSS
 * visibility. Do not switch this to conditional rendering.
 */
export function FaqSection({
  namespace,
  accent,
  className = '',
}: {
  namespace: string;
  accent: string;
  className?: string;
}) {
  const t = useTranslations(namespace);
  const items = t.raw('items') as FaqItem[];

  return (
    <section id="faq" className={`scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 lg:px-16 ${className}`}>
      <div className="bma-container grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <motion.div {...reveal} className="lg:sticky lg:top-32">
          <p className="font-label text-[11px] font-semibold uppercase tracking-[.25em]" style={{ color: accent }}>
            {t('eyebrow')}
          </p>
          <h2 className="bma-section-title mt-5 max-w-xl text-balance text-white">{t('title')}</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/52">{t('subtitle')}</p>
        </motion.div>

        <motion.div {...reveal} className="border-t border-white/[0.08]">
          {items.map((item, index) => (
            <FaqRow key={item.q} item={item} accent={accent} defaultOpen={index === 0} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FaqRow({ item, accent, defaultOpen = false }: { item: FaqItem; accent: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const buttonId = `${id}-question`;
  const panelId = `${id}-answer`;

  return (
    <div className="border-b border-white/[0.08]">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex min-h-14 w-full items-center justify-between gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/60"
        >
          <span className="text-base font-medium text-white/88 sm:text-lg">{item.q}</span>
          <span
            aria-hidden="true"
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-transform duration-300 motion-reduce:transition-none ${open ? 'rotate-45' : ''}`}
            style={{ borderColor: `${accent}45`, color: accent }}
          >
            <Plus className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
        className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-6 text-sm leading-7 text-white/55">{item.a}</p>
        </div>
      </div>
    </div>
  );
}
