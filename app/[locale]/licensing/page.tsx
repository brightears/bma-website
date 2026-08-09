'use client';

import { type ReactNode, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleHelp,
  Disc3,
  FileAudio2,
  Globe2,
  Library,
  MapPin,
  Music2,
  Radio,
  ShieldCheck,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { LicensingMarket } from '@/lib/licensing-markets';

const DEFAULT_MARKET: LicensingMarket = {
  countryCode: null,
  publicPerformance: 'confirm',
  societies: [],
  soundtrackAvailable: false,
  soundtrackGuideUrl: 'https://www.soundtrack.io/licensing/',
};

const RIGHTS = [
  { id: '01', icon: Music2, tone: 'orange' },
  { id: '02', icon: Disc3, tone: 'teal' },
  { id: '03', icon: FileAudio2, tone: 'orange' },
  { id: '04', icon: Radio, tone: 'teal' },
] as const;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8%' },
  transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
} as const;

export default function LicensingPage() {
  const t = useTranslations('licensingPage');
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const [market, setMarket] = useState<LicensingMarket>(DEFAULT_MARKET);
  const [marketReady, setMarketReady] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    fetch('/api/licensing-market', { cache: 'no-store', signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Licensing market request failed with ${response.status}`);
        return response.json() as Promise<LicensingMarket>;
      })
      .then((nextMarket) => {
        if (active) setMarket(nextMarket);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        console.error('Licensing market detection failed:', error);
      })
      .finally(() => {
        if (active) setMarketReady(true);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const countryName = useMemo(() => {
    if (!market.countryCode) return t('market.global');
    try {
      return new Intl.DisplayNames([locale], { type: 'region' }).of(market.countryCode) ?? t('market.global');
    } catch {
      return t('market.global');
    }
  }, [locale, market.countryCode, t]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-hidden bg-[#06111a]">
        <section className="relative min-h-[min(58rem,100dvh)] border-b border-white/[0.08] px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-40 lg:px-16">
        <div className="bma-grid-lines absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="absolute -left-24 top-48 h-80 w-80 rounded-full bg-[#ef9f2f]/[0.08] blur-[100px]" aria-hidden="true" />
        <div className="absolute right-0 top-16 h-[34rem] w-[45rem] max-w-[72vw] rounded-full bg-[#23cfc2]/[0.08] blur-[130px]" aria-hidden="true" />

        <div className="bma-container relative grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <motion.div {...reveal}>
            <p className="bma-kicker">{t('hero.label')}</p>
            <h1 className="bma-display bma-page-title mt-7 max-w-[12ch] text-balance text-white">
              {t('hero.title')} <span className="bma-gradient-text">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="bma-lede mt-8 max-w-2xl">{t('hero.subtitle')}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={`/${locale}/quotation?source=licensing-hero`} className="bma-button-primary">
                {t('hero.cta')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href="#rights-map" className="bma-button-secondary">{t('hero.secondaryCta')}</a>
            </div>
          </motion.div>

          <RightsSignal countryName={countryName} marketReady={marketReady} reduceMotion={Boolean(reduceMotion)} />
        </div>
        </section>

        <section id="rights-map" className="bma-section scroll-mt-24">
        <div className="bma-container">
          <motion.div {...reveal} className="grid gap-9 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="bma-kicker">{t('rights.label')}</p>
              <h2 className="bma-section-title mt-5 max-w-xl text-balance text-white">{t('rights.title')}</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-white/52 lg:justify-self-end">{t('rights.description')}</p>
          </motion.div>

          <div className="relative mt-16 grid gap-4 lg:grid-cols-4">
            <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-12 hidden h-px bg-[linear-gradient(90deg,rgba(239,159,47,.62),rgba(35,207,194,.62))] lg:block" aria-hidden="true">
              {!reduceMotion && <motion.span className="absolute -top-1.5 h-3 w-3 rounded-full bg-[#f0a539] shadow-[0_0_24px_rgba(240,165,57,.9)]" animate={{ left: ['0%', '100%'] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }} />}
            </div>
            {RIGHTS.map(({ id, icon: Icon, tone }, index) => (
              <motion.article
                key={id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="relative rounded-[1.6rem] border border-white/[0.09] bg-[#0a1823]/90 p-6 shadow-[0_28px_80px_rgba(1,8,13,.24)] sm:p-7"
              >
                <div className={`grid h-12 w-12 place-items-center rounded-full border ${tone === 'orange' ? 'border-[#f0a539]/35 bg-[#f0a539]/10 text-[#f0a539]' : 'border-[#38d3c7]/35 bg-[#38d3c7]/10 text-[#38d3c7]'}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="mt-8 font-label text-[0.65rem] tracking-[0.2em] text-white/30">{t('rights.layer', { number: id })}</p>
                <h3 className="mt-3 font-headline text-2xl font-medium tracking-[-0.035em] text-white">{t(`rights.${id}.title`)}</h3>
                <p className="mt-4 text-sm leading-6 text-white/48">{t(`rights.${id}.description`)}</p>
              </motion.article>
            ))}
          </div>

          <motion.div {...reveal} className="mt-10 grid overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[radial-gradient(circle_at_50%_0%,rgba(56,211,199,.09),transparent_48%),rgba(255,255,255,.025)] lg:grid-cols-2">
            <CopyrightHalf icon={Library} eyebrow={t('split.compositionLabel')} title={t('split.compositionTitle')} description={t('split.compositionDescription')} accent="orange" />
            <CopyrightHalf icon={Disc3} eyebrow={t('split.recordingLabel')} title={t('split.recordingTitle')} description={t('split.recordingDescription')} accent="teal" bordered />
          </motion.div>
        </div>
        </section>

        <section className="border-y border-white/[0.08] bg-[#07141f] px-5 py-20 sm:px-8 sm:py-28 lg:px-16">
        <div className="bma-container">
          <motion.div {...reveal}>
            <p className="bma-kicker">{t('comparison.label')}</p>
            <h2 className="bma-section-title mt-5 max-w-4xl text-balance text-white">{t('comparison.sectionTitle')}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/50">{t('comparison.description')}</p>
          </motion.div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <ProductScope
              palette="beat"
              name="Beat Breeze"
              badge={t('comparison.bb.badge')}
              headline={t('comparison.bb.headline')}
              note={t('comparison.bb.performanceNote')}
              labels={[t('comparison.recordingLicense'), t('comparison.publishingLicense'), t('comparison.performanceIncluded')]}
              href={`/${locale}/beat-breeze`}
              cta={t('comparison.bb.cta')}
            />
            <ProductScope
              palette="soundtrack"
              name="Soundtrack"
              badge={t('comparison.syb.badge')}
              headline={market.publicPerformance === 'included'
                ? t('comparison.syb.headlineIncluded')
                : market.publicPerformance === 'local'
                  ? t('comparison.syb.headlineLocal')
                  : t('market.confirmTitle')}
              note={market.publicPerformance === 'included'
                ? t('comparison.syb.noteIncluded')
                : market.publicPerformance === 'local'
                  ? t('comparison.syb.performanceNote')
                  : t('comparison.syb.noteConfirm')}
              labels={[
                t('comparison.recordingLicense'),
                t('comparison.publishingLicense'),
                market.publicPerformance === 'included' ? t('comparison.performanceIncluded') : t('comparison.performanceSeparate'),
              ]}
              href={`/${locale}/soundtrack-your-brand`}
              cta={t('comparison.syb.cta')}
              conditionalLast={market.publicPerformance !== 'included'}
            />
          </div>
        </div>
        </section>

        <MarketGuide market={market} countryName={countryName} marketReady={marketReady} />

        <section className="bma-section">
        <div className="bma-container grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <motion.div {...reveal}>
            <p className="bma-kicker">{t('personal.label')}</p>
            <h2 className="bma-section-title mt-5 max-w-xl text-balance text-white">{t('personal.title')}</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/52">{t('personal.description')}</p>
          </motion.div>

          <motion.div {...reveal} className="overflow-hidden rounded-[2rem] border border-white/[0.1] bg-white/[0.025]">
            <ComparisonRow icon={X} title={t('personal.consumerTitle')} description={t('personal.consumerDescription')} meta={t('personal.consumerExamples')} tone="muted" />
            <ComparisonRow icon={Check} title={t('personal.businessTitle')} description={t('personal.businessDescription')} meta="Beat Breeze · Soundtrack" tone="active" bordered />
          </motion.div>
        </div>
        </section>

        <section className="border-t border-white/[0.08] px-5 py-20 sm:px-8 sm:py-28 lg:px-16">
        <div className="bma-container">
          <motion.div {...reveal} className="rounded-[2rem] border border-white/[0.1] bg-[radial-gradient(circle_at_82%_15%,rgba(56,211,199,.12),transparent_34%),radial-gradient(circle_at_12%_85%,rgba(240,165,57,.1),transparent_32%),#081722] p-7 sm:p-10 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="bma-kicker">{t('cta.label')}</p>
                <h2 className="bma-section-title mt-5 max-w-3xl text-balance text-white">{t('cta.title')} <span className="bma-gradient-text">{t('cta.titleHighlight')}</span></h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-white/48">{t('cta.description')}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href={`/${locale}/quotation?source=licensing`} className="bma-button-primary">{t('cta.ctaQuote')} <ArrowRight className="h-4 w-4" /></Link>
                <Link href={`/${locale}/book-demo?source=licensing`} className="bma-button-secondary">{t('cta.ctaDemo')}</Link>
              </div>
            </div>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/34">
            <span>{t('sources.label')}</span>
            <SourceLink href="https://www.copyright.gov/engage/musicians/">{t('sources.copyright')}</SourceLink>
            <SourceLink href="https://www.soundtrack.io/licensing/">{t('sources.soundtrack')}</SourceLink>
            <SourceLink href="https://support.spotify.com/article/spotify-public-commercial-use/">{t('sources.spotify')}</SourceLink>
            <SourceLink href="https://www.youtube.com/static?template=terms">{t('sources.youtube')}</SourceLink>
          </div>
        </div>
        </section>
      </div>
    </MotionConfig>
  );
}

function RightsSignal({ countryName, marketReady, reduceMotion }: { countryName: string; marketReady: boolean; reduceMotion: boolean }) {
  const t = useTranslations('licensingPage');
  const steps = [
    { id: '01', label: t('signal.composition') },
    { id: '02', label: t('signal.recording') },
    { id: '03', label: t('signal.service') },
    { id: '04', label: t('signal.venue') },
  ];

  return (
    <motion.div {...reveal} className="relative">
      <div className="absolute -inset-4 rounded-[2.75rem] bg-[linear-gradient(135deg,rgba(240,165,57,.13),transparent_42%,rgba(56,211,199,.1))] blur-2xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/[0.11] bg-[#081722]/92 p-5 shadow-[0_40px_100px_rgba(0,0,0,.34)] sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <p className="font-label text-[0.65rem] uppercase tracking-[0.21em] text-[#38d3c7]">{t('signal.label')}</p>
            <h2 className="mt-2 font-headline text-xl font-medium tracking-[-0.025em] text-white">{t('signal.title')}</h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#38d3c7]/20 bg-[#38d3c7]/[0.06] px-3 py-2 text-xs text-[#79e4da]">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {marketReady ? countryName : t('market.detecting')}
          </span>
        </div>

        <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
          <div className="pointer-events-none absolute bottom-[23%] left-[24%] right-[24%] top-[23%] hidden rounded-[45%] border border-dashed border-white/[0.09] sm:block" aria-hidden="true" />
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative flex min-h-24 items-center gap-4 rounded-[1.2rem] border border-white/[0.08] bg-white/[0.025] p-4"
              animate={reduceMotion ? undefined : { borderColor: ['rgba(255,255,255,.08)', index % 2 === 0 ? 'rgba(240,165,57,.28)' : 'rgba(56,211,199,.25)', 'rgba(255,255,255,.08)'] }}
              transition={{ duration: 4.8, delay: index * 0.55, repeat: Infinity }}
            >
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border font-mono text-xs ${index % 2 === 0 ? 'border-[#f0a539]/30 text-[#f0a539]' : 'border-[#38d3c7]/30 text-[#38d3c7]'}`}>{step.id}</span>
              <span className="text-sm font-medium text-white/70">{step.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-[1.1rem] border border-[#f0a539]/20 bg-[#f0a539]/[0.055] px-4 py-3.5">
          <ShieldCheck className="h-5 w-5 shrink-0 text-[#f0a539]" aria-hidden="true" />
          <p className="text-sm leading-6 text-white/56">{t('signal.footer')}</p>
        </div>
      </div>
    </motion.div>
  );
}

function CopyrightHalf({ icon: Icon, eyebrow, title, description, accent, bordered = false }: { icon: LucideIcon; eyebrow: string; title: string; description: string; accent: 'orange' | 'teal'; bordered?: boolean }) {
  return (
    <article className={`relative p-7 sm:p-10 ${bordered ? 'border-t border-white/[0.08] lg:border-l lg:border-t-0' : ''}`}>
      <div className={`grid h-12 w-12 place-items-center rounded-xl border ${accent === 'orange' ? 'border-[#f0a539]/25 bg-[#f0a539]/[0.07] text-[#f0a539]' : 'border-[#38d3c7]/25 bg-[#38d3c7]/[0.07] text-[#38d3c7]'}`}><Icon className="h-5 w-5" aria-hidden="true" /></div>
      <p className={`mt-7 font-label text-[0.65rem] uppercase tracking-[0.2em] ${accent === 'orange' ? 'text-[#f0a539]' : 'text-[#38d3c7]'}`}>{eyebrow}</p>
      <h3 className="mt-3 font-headline text-3xl font-medium tracking-[-0.04em] text-white">{title}</h3>
      <p className="mt-4 max-w-xl text-base leading-7 text-white/48">{description}</p>
    </article>
  );
}

function ProductScope({ name, palette, badge, headline, note, labels, href, cta, conditionalLast = false }: { name: string; palette: 'beat' | 'soundtrack'; badge: string; headline: string; note: string; labels: string[]; href: string; cta: string; conditionalLast?: boolean }) {
  const accent = palette === 'beat' ? '#f0a539' : '#d6c2ff';
  const surface = palette === 'beat'
    ? 'bg-[radial-gradient(circle_at_85%_10%,rgba(56,211,199,.12),transparent_31%),linear-gradient(145deg,rgba(240,165,57,.09),rgba(8,23,34,.94))]'
    : 'bg-[radial-gradient(circle_at_85%_10%,rgba(214,194,255,.14),transparent_32%),linear-gradient(145deg,rgba(61,29,75,.23),rgba(8,23,34,.94))]';

  return (
    <motion.article {...reveal} className={`flex min-h-[34rem] flex-col rounded-[2rem] border border-white/[0.1] p-7 sm:p-9 ${surface}`} style={{ borderTopColor: accent }}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="font-headline text-3xl font-medium tracking-[-0.04em] text-white">{name}</h3>
        <span className="border-b pb-1 font-label text-[0.65rem] uppercase tracking-[0.17em]" style={{ color: accent, borderColor: `${accent}66` }}>{badge}</span>
      </div>
      <p className="mt-12 max-w-lg font-headline text-4xl font-medium tracking-[-0.045em] text-white sm:text-5xl">{headline}</p>
      <ul className="mt-10 space-y-4">
        {labels.map((label, index) => (
          <li key={label} className="flex items-center gap-3 border-t border-white/[0.08] pt-4 text-sm text-white/62">
            {conditionalLast && index === labels.length - 1
              ? <CircleHelp className="h-4 w-4 shrink-0" style={{ color: accent }} aria-hidden="true" />
              : <Check className="h-4 w-4 shrink-0" style={{ color: accent }} aria-hidden="true" />}
            {label}
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm leading-6 text-white/42">{note}</p>
      <Link href={href} className="mt-auto inline-flex items-center gap-2 pt-9 font-label text-sm font-semibold" style={{ color: accent }}>{cta} <ArrowRight className="h-4 w-4" /></Link>
    </motion.article>
  );
}

function MarketGuide({ market, countryName, marketReady }: { market: LicensingMarket; countryName: string; marketReady: boolean }) {
  const t = useTranslations('licensingPage');
  const mode = market.publicPerformance;
  const title = mode === 'included' ? t('market.includedTitle') : mode === 'local' ? t('market.localTitle') : t('market.confirmTitle');
  const description = mode === 'included' ? t('market.includedDescription') : mode === 'local' ? t('market.localDescription') : t('market.confirmDescription');

  return (
    <section className="relative border-b border-white/[0.08] px-5 py-20 sm:px-8 sm:py-28 lg:px-16">
      <div className="absolute inset-y-0 right-0 w-2/3 bg-[radial-gradient(circle_at_70%_48%,rgba(56,211,199,.09),transparent_47%)]" aria-hidden="true" />
      <div className="bma-container relative grid gap-12 lg:grid-cols-[0.74fr_1.26fr] lg:items-center">
        <motion.div {...reveal}>
          <p className="bma-kicker">{t('market.label')}</p>
          <h2 className="bma-section-title mt-5 max-w-xl text-balance text-white">{t('market.title')}</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/50">{t('market.description')}</p>
        </motion.div>

        <motion.aside {...reveal} className="overflow-hidden rounded-[2rem] border border-white/[0.11] bg-[#091923]/94 shadow-[0_30px_90px_rgba(0,0,0,.28)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] p-6 sm:p-8">
            <div>
              <p className="font-label text-[0.65rem] uppercase tracking-[0.2em] text-[#38d3c7]">{marketReady ? t('market.location', { country: countryName }) : t('market.detecting')}</p>
              <h3 className="mt-3 font-headline text-3xl font-medium tracking-[-0.04em] text-white">{title}</h3>
            </div>
            <Globe2 className="h-8 w-8 text-white/20" aria-hidden="true" />
          </div>

          <div className="p-6 sm:p-8">
            <p className="max-w-2xl text-base leading-7 text-white/50">{description}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <MarketStatus title="Beat Breeze" status={t('market.beatStatus')} description={t('market.beatDescription')} tone="beat" />
              <MarketStatus title="Soundtrack" status={mode === 'included' ? t('market.includedStatus') : mode === 'local' ? t('market.localStatus') : t('market.confirmStatus')} description={mode === 'included' ? t('market.soundtrackIncluded') : mode === 'local' ? t('market.soundtrackLocal') : t('market.soundtrackConfirm')} tone="soundtrack" />
            </div>

            {(market.societies.length > 0 || market.soundtrackAvailable) && (
              <div className="mt-8 border-t border-white/[0.08] pt-7">
                {market.societies.length > 0 && <p className="font-label text-[0.65rem] uppercase tracking-[0.18em] text-white/34">{t('market.societies')}</p>}
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {market.societies.map((society) => (
                    <a key={society.name} href={society.url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/[0.11] bg-white/[0.025] px-4 text-sm text-white/66 transition hover:border-[#38d3c7]/35 hover:text-white">
                      {society.name} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ))}
                  {market.soundtrackAvailable && (
                    <a href={market.soundtrackGuideUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#d6c2ff]/20 bg-[#d6c2ff]/[0.055] px-4 text-sm text-[#e4d7ff] transition hover:border-[#d6c2ff]/45">
                      {t('market.countryGuide', { country: countryName })} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            )}

            <p className="mt-7 flex gap-2.5 text-xs leading-5 text-white/32"><CircleHelp className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />{t('market.disclaimer')}</p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

function MarketStatus({ title, status, description, tone }: { title: string; status: string; description: string; tone: 'beat' | 'soundtrack' }) {
  const color = tone === 'beat' ? '#f0a539' : '#d6c2ff';
  return (
    <div className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.02] p-5">
      <div className="flex items-center justify-between gap-3"><strong className="text-base text-white">{title}</strong><span className="h-2 w-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 16px ${color}` }} /></div>
      <p className="mt-4 font-label text-[0.65rem] uppercase tracking-[0.16em]" style={{ color }}>{status}</p>
      <p className="mt-3 text-sm leading-6 text-white/42">{description}</p>
    </div>
  );
}

function ComparisonRow({ icon: Icon, title, description, meta, tone, bordered = false }: { icon: LucideIcon; title: string; description: string; meta: string; tone: 'muted' | 'active'; bordered?: boolean }) {
  return (
    <div className={`grid gap-5 p-6 sm:grid-cols-[3.25rem_1fr_auto] sm:items-center sm:p-8 ${bordered ? 'border-t border-white/[0.08]' : ''}`}>
      <span className={`grid h-12 w-12 place-items-center rounded-full border ${tone === 'active' ? 'border-[#38d3c7]/28 bg-[#38d3c7]/[0.07] text-[#38d3c7]' : 'border-white/[0.11] bg-white/[0.025] text-white/36'}`}><Icon className="h-5 w-5" aria-hidden="true" /></span>
      <div><h3 className="font-headline text-2xl font-medium tracking-[-0.03em] text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-white/46">{description}</p></div>
      <p className="font-label text-[0.62rem] uppercase tracking-[0.15em] text-white/28 sm:max-w-36 sm:text-right">{meta}</p>
    </div>
  );
}

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer" className="underline decoration-white/16 underline-offset-4 transition hover:text-white/60">{children}</a>;
}
