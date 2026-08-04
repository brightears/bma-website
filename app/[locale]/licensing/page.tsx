'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, CheckCircle2, Disc3, FileCheck2, Landmark, TriangleAlert } from 'lucide-react';
import { EXTERNAL_LINKS, withAttribution } from '@/lib/external-links';

const RIGHTS = [
  { id: '01', icon: Disc3 },
  { id: '02', icon: FileCheck2 },
  { id: '03', icon: Landmark },
] as const;

export default function LicensingPage() {
  const t = useTranslations('licensingPage');
  const locale = useLocale();

  return (
    <div className="overflow-hidden bg-[#06111a]">
      <section className="relative border-b border-white/10 px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-44 lg:px-16">
        <div className="bma-grid-lines absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="bma-container relative">
          <p className="bma-kicker">{t('hero.label')}</p>
          <h1 className="bma-display mt-7 max-w-6xl text-[clamp(3.7rem,8.4vw,8rem)]">{t('hero.title')} <span className="text-[#f0a539]">{t('hero.titleHighlight')}</span></h1>
          <p className="bma-lede mt-8 max-w-3xl">{t('hero.subtitle')}</p>
        </div>
      </section>

      <section className="bma-section">
        <div className="bma-container">
          <div className="max-w-4xl">
            <p className="text-xl leading-9 text-white/64 sm:text-2xl sm:leading-10">{t('intro.paragraph1')}</p>
            <p className="mt-5 font-headline text-3xl tracking-[-0.04em] text-white sm:text-5xl">{t('intro.paragraph2Prefix')} <span className="text-[#f0a539]">{t('intro.paragraph2Highlight')}</span></p>
          </div>
          <div className="mt-16 grid border-y border-white/10 lg:grid-cols-3">
            {RIGHTS.map(({ id, icon: Icon }, index) => (
              <motion.article key={id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`py-10 lg:px-9 ${index > 0 ? 'border-t border-white/10 lg:border-l lg:border-t-0' : ''}`}>
                <div className="flex items-center justify-between"><Icon className="h-6 w-6 text-[#f0a539]" aria-hidden="true" /><span className="font-label text-xs tracking-[0.2em] text-white/30">LAYER {id}</span></div>
                <h2 className="mt-10 text-balance font-headline text-3xl font-medium tracking-[-0.04em] text-white">{t(`licenses.${id}.title`)}</h2>
                <p className="mt-5 leading-8 text-white/55">{t(`licenses.${id}.desc`)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#f0a539]/18 bg-[#f0a539]/[0.035] px-5 py-16 sm:px-8 sm:py-20 lg:px-16">
        <div className="bma-container grid gap-8 lg:grid-cols-[4rem_1fr] lg:items-start">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-[#f0a539]/30 text-[#f0a539]"><TriangleAlert className="h-6 w-6" aria-hidden="true" /></span>
          <div>
            <p className="font-label text-xs uppercase tracking-[0.22em] text-[#f0a539]">{t('warning.label')}</p>
            <h2 className="mt-4 max-w-5xl text-balance font-headline text-4xl font-medium tracking-[-0.045em] text-white sm:text-6xl">{t('warning.titleStart')} <span className="text-[#f0a539]">{t('warning.titleNot')}</span> {t('warning.titleEnd')}</h2>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/58">{t('warning.quote')}</p>
          </div>
        </div>
      </section>

      <section className="bma-section">
        <div className="bma-container">
          <p className="bma-kicker">PRODUCT SCOPE</p>
          <h2 className="mt-5 max-w-4xl text-balance font-headline text-4xl font-medium tracking-[-0.045em] text-white sm:text-6xl">{t('comparison.sectionTitle')}</h2>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <ProductScope name="Beat Breeze" accent="#ff9f2f" badge={t('comparison.bb.badge')} note={t('comparison.bb.performanceNote')} labels={[t('comparison.recordingLicense'), t('comparison.publishingLicense'), t('comparison.performanceLicense')]} href={`/${locale}/beat-breeze`} cta={t('comparison.bb.cta')} />
            <ProductScope name="Soundtrack" accent="#d6c2ff" badge={t('comparison.syb.badge')} note={t('comparison.syb.performanceNote')} labels={[t('comparison.recordingLicense'), t('comparison.publishingLicense'), t('comparison.performanceLicense')]} href={`/${locale}/soundtrack-your-brand`} cta={t('comparison.syb.cta')} />
          </div>
          <p className="mt-7 max-w-3xl text-sm leading-6 text-white/38">{t('hero.subtitle')}</p>
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-20 sm:px-8 sm:py-28 lg:px-16">
        <div className="bma-container flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <h2 className="max-w-4xl text-balance font-headline text-5xl font-medium tracking-[-0.05em] text-white sm:text-7xl">{t('cta.title')} <span className="text-[#f0a539]">{t('cta.titleHighlight')}</span></h2>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href={`/${locale}/quotation`} className="bma-button-primary">{t('cta.ctaQuote')} <ArrowRight className="h-4 w-4" /></Link>
            <a href={withAttribution(EXTERNAL_LINKS.calendly, 'licensing_guidance', 'final')} target="_blank" rel="noopener noreferrer" className="bma-button-secondary">{t('cta.ctaDemo')}</a>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductScope({ name, accent, badge, note, labels, href, cta }: { name: string; accent: string; badge: string; note: string; labels: string[]; href: string; cta: string }) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-7 sm:p-9" style={{ borderTopColor: accent }}>
      <div className="flex flex-wrap items-center justify-between gap-4"><h3 className="font-headline text-3xl font-medium tracking-[-0.04em] text-white">{name}</h3><span className="rounded-full border px-3 py-1 font-label text-[0.65rem] uppercase tracking-[0.17em]" style={{ color: accent, borderColor: `${accent}55` }}>{badge}</span></div>
      <ul className="mt-8 space-y-4">{labels.map((label) => <li key={label} className="flex items-center gap-3 border-t border-white/8 pt-4 text-white/66"><CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: accent }} aria-hidden="true" />{label}</li>)}</ul>
      <p className="mt-7 min-h-14 text-sm leading-6 text-white/42">{note}</p>
      <Link href={href} className="mt-6 inline-flex items-center gap-2 font-label text-sm font-semibold" style={{ color: accent }}>{cta} <ArrowRight className="h-4 w-4" /></Link>
    </article>
  );
}
