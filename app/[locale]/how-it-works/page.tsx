'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowDown, ArrowRight, AudioLines, Blend, Map, RadioTower } from 'lucide-react';
import { EXTERNAL_LINKS, withAttribution } from '@/lib/external-links';

const STEPS = [
  { id: '01', icon: Map, note: 'BRIEF' },
  { id: '02', icon: AudioLines, note: 'DESIGN' },
  { id: '03', icon: RadioTower, note: 'CONNECT' },
  { id: '04', icon: Blend, note: 'EVOLVE' },
] as const;
const OUTCOMES = ['experience', 'speed', 'legal'] as const;

export default function HowItWorksPage() {
  const t = useTranslations('howItWorksPage');
  const locale = useLocale();

  return (
    <div className="overflow-hidden bg-[#06111a]">
      <section className="relative min-h-[88svh] border-b border-white/10 px-5 pt-36 sm:px-8 sm:pt-44 lg:px-16">
        <div className="bma-grid-lines absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="absolute left-[62%] top-24 h-[32rem] w-[32rem] rounded-full bg-[#f0a539]/10 blur-[130px]" aria-hidden="true" />
        <div className="bma-container relative grid min-h-[66svh] content-between gap-16 pb-12 lg:grid-cols-[1fr_18rem] lg:items-end">
          <div className="max-w-5xl">
            <p className="bma-kicker">{t('hero.label')}</p>
            <h1 className="bma-display mt-7 max-w-5xl text-[clamp(3.7rem,9.5vw,8.6rem)]">
              {t('hero.title')} <span className="text-[#f0a539]">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="bma-lede mt-8 max-w-3xl">{t('hero.subtitle')}</p>
          </div>
          <a href="#process" className="group flex items-center justify-between border-t border-white/15 py-5 font-label text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white">
            01—04 <ArrowDown className="h-4 w-4 transition group-hover:translate-y-1" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section id="process" className="bma-section">
        <div className="bma-container">
          <div className="relative">
            <div className="absolute bottom-0 left-[1.55rem] top-0 hidden w-px bg-gradient-to-b from-[#f0a539] via-white/10 to-transparent sm:block" aria-hidden="true" />
            {STEPS.map(({ id, icon: Icon, note }, index) => (
              <motion.article
                key={id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.55 }}
                className="grid border-t border-white/10 py-10 first:border-t-0 sm:grid-cols-[3.2rem_minmax(12rem,0.55fr)_1fr] sm:gap-10 sm:py-16"
              >
                <div className="relative z-10 hidden h-12 w-12 place-items-center rounded-full border border-[#f0a539]/35 bg-[#06111a] text-[#f0a539] sm:grid"><Icon className="h-5 w-5" aria-hidden="true" /></div>
                <div>
                  <p className="font-label text-xs tracking-[0.24em] text-[#f0a539]">{id} / {note}</p>
                  <h2 className="mt-4 text-balance font-headline text-3xl font-medium tracking-[-0.04em] text-white sm:text-5xl">{t(`steps.${id}.title`)}</h2>
                </div>
                <div className="mt-5 sm:mt-0 sm:pt-8">
                  <p className="max-w-2xl text-lg leading-8 text-white/58 sm:text-xl sm:leading-9">{t(`steps.${id}.desc`)}</p>
                  {index < STEPS.length - 1 && <div className="mt-9 h-px w-16 bg-[#f0a539]/35" aria-hidden="true" />}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#081823] px-5 py-20 sm:px-8 sm:py-28 lg:px-16">
        <div className="bma-container">
          <p className="bma-kicker">{t('stats.label')}</p>
          <h2 className="mt-6 max-w-4xl text-balance font-headline text-4xl font-medium tracking-[-0.045em] text-white sm:text-6xl">{t('stats.sectionTitle')}</h2>
          <div className="mt-14 grid border-y border-white/10 md:grid-cols-3">
            {OUTCOMES.map((key, index) => (
              <div key={key} className={`py-8 md:px-8 md:py-10 ${index > 0 ? 'border-t border-white/10 md:border-l md:border-t-0' : ''}`}>
                <p className="font-label text-sm uppercase tracking-[0.18em] text-[#f0a539]">{t(`stats.${key}.value`)}</p>
                <p className="mt-4 leading-7 text-white/54">{t(`stats.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bma-section">
        <div className="bma-container grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="bma-kicker">NEXT / YOUR VENUE</p>
            <h2 className="mt-5 max-w-3xl text-balance font-headline text-5xl font-medium tracking-[-0.05em] text-white sm:text-7xl">{t('cta.title')}</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href={`/${locale}/quotation`} className="bma-button-primary">{t('cta.ctaQuote')} <ArrowRight className="h-4 w-4" /></Link>
            <a href={withAttribution(EXTERNAL_LINKS.calendly, 'how_it_works', 'final')} target="_blank" rel="noopener noreferrer" className="bma-button-secondary">{t('cta.ctaDemo')}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
