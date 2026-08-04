'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, CircleCheck, Headphones, Music2 } from 'lucide-react';
import { SITE, SOCIAL } from '@/lib/constants';
import { EXTERNAL_LINKS, withAttribution } from '@/lib/external-links';
import { LineLink, WhatsAppLink } from '@/components/icons';

const QuotationForm = dynamic(() => import('@/components/forms/QuotationForm').then((mod) => mod.QuotationForm), {
  ssr: false,
  loading: () => <div className="min-h-[42rem] animate-pulse rounded-[1.75rem] bg-white/[0.035]" aria-label="Loading form" />,
});

const EXPECT_ITEMS = ['fastResponse', 'noObligation', 'tailored'] as const;

export default function QuotationPage() {
  const t = useTranslations('quotationPage');
  const locale = useLocale();

  return (
    <div className="relative overflow-hidden bg-[#06111a]">
      <div className="bma-grid-lines pointer-events-none absolute inset-x-0 top-0 h-[70rem] opacity-20" aria-hidden="true" />
      <section className="relative px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-44 lg:px-16">
        <div className="bma-container grid gap-16 lg:grid-cols-[minmax(0,0.82fr)_minmax(30rem,1fr)] lg:gap-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:sticky lg:top-32 lg:self-start">
            <p className="bma-kicker">{t('hero.label')}</p>
            <h1 className="bma-display mt-6 text-[clamp(3.8rem,8vw,7.2rem)]">{t('hero.title')} <span className="text-[#f0a539]">{t('hero.titleHighlight')}</span></h1>
            <p className="bma-lede mt-7 max-w-xl">{t('hero.subtitle')}</p>

            <div className="mt-12 border-y border-white/10">
              {EXPECT_ITEMS.map((key) => (
                <div key={key} className="grid grid-cols-[1.5rem_1fr] gap-4 border-t border-white/10 py-5 first:border-t-0">
                  <CircleCheck className="mt-1 h-4 w-4 text-[#f0a539]" aria-hidden="true" />
                  <div><h2 className="font-label text-sm font-semibold text-white">{t(`whatToExpect.${key}.title`)}</h2><p className="mt-1 text-sm leading-6 text-white/48">{t(`whatToExpect.${key}.desc`)}</p></div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Link href={`/${locale}/beat-breeze`} className="rounded-2xl border border-[#ff9f2f]/20 bg-[#ff9f2f]/[0.035] p-5 transition hover:border-[#ff9f2f]/45">
                <Music2 className="h-5 w-5 text-[#ff9f2f]" aria-hidden="true" /><h2 className="mt-5 font-headline text-xl text-white">Beat Breeze</h2><p className="mt-2 text-xs leading-5 text-white/45">{t('ourSolutions.bbTagline')}</p>
              </Link>
              <Link href={`/${locale}/soundtrack-your-brand`} className="rounded-2xl border border-[#d6c2ff]/20 bg-[#d6c2ff]/[0.035] p-5 transition hover:border-[#d6c2ff]/45">
                <Headphones className="h-5 w-5 text-[#d6c2ff]" aria-hidden="true" /><h2 className="mt-5 font-headline text-xl text-white">Soundtrack</h2><p className="mt-2 text-xs leading-5 text-white/45">{t('ourSolutions.sybTagline')}</p>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-white/10 pt-6">
              <a href={`mailto:${SITE.email}`} className="text-sm text-white/54 transition hover:text-[#f0a539]">{SITE.email}</a>
              <WhatsAppLink href={SOCIAL.whatsapp} size={20} />
              <LineLink href={SOCIAL.line} size={20} />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
            <div className="rounded-[2rem] border border-white/12 bg-[#0a1a25]/95 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.32)] sm:p-10">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[#f0a539]">VENUE BRIEF / 01</p>
              <h2 className="mt-4 font-headline text-3xl font-medium tracking-[-0.04em] text-white sm:text-4xl">{t('formHeader.title')}</h2>
              <p className="mt-3 max-w-xl leading-7 text-white/48">{t('formHeader.subtitle')}</p>
              <div className="mt-9"><QuotationForm /></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#081823] px-5 py-16 sm:px-8 sm:py-20 lg:px-16">
        <div className="bma-container flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div><p className="bma-kicker">LIVE WALKTHROUGH</p><h2 className="mt-4 font-headline text-3xl font-medium tracking-[-0.04em] text-white sm:text-5xl">{t('demoCta.title')} <span className="text-[#f0a539]">{t('demoCta.titleHighlight')}</span></h2><p className="mt-3 text-white/50">{t('demoCta.subtitle')}</p></div>
          <a href={withAttribution(EXTERNAL_LINKS.calendly, 'quotation', 'demo')} target="_blank" rel="noopener noreferrer" className="bma-button-secondary shrink-0">{t('demoCta.ctaButton')} <ArrowRight className="h-4 w-4" /></a>
        </div>
      </section>
    </div>
  );
}
