'use client';

import { useId, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowRight,
  BookOpenText,
  Braces,
  CalendarClock,
  Check,
  Clapperboard,
  ExternalLink,
  Gauge,
  MessageSquareText,
  MonitorPlay,
  MoonStar,
  Music2,
  PhoneCall,
  Radio,
  Volume2,
  Workflow,
} from 'lucide-react';
import type { CapabilityKey, EvidenceKey, IndustryConfig } from '@/lib/industry-data';
import styles from './IndustryPageTemplate.module.css';

const capabilityIcons = {
  music: Music2,
  screens: MonitorPlay,
  messages: MessageSquareText,
  video: Clapperboard,
  scheduling: CalendarClock,
  automation: Workflow,
  api: Braces,
  volume: Volume2,
  prayer: MoonStar,
  phone: PhoneCall,
  soundscapes: Radio,
} satisfies Record<CapabilityKey, typeof Music2>;

const evidenceSources: Record<EvidenceKey, Array<{ label: string; href: string }>> = {
  brandFit: [
    { label: 'Soundtrack research', href: 'https://www.soundtrack.io/research/' },
    { label: 'Journal of Consumer Research', href: 'https://academic.oup.com/jcr/article-abstract/13/2/286/1846377' },
  ],
  exercise: [
    { label: 'BMC Sports Science, Medicine and Rehabilitation', href: 'https://pubmed.ncbi.nlm.nih.gov/41430324/' },
  ],
  care: [
    { label: 'SAGE Open Medicine review', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9072951/' },
  ],
  focus: [
    { label: 'Communications Psychology', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11819607/' },
  ],
};

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
};

export function IndustryPageTemplate({ config }: { config: IndustryConfig }) {
  const locale = useLocale();
  const t = useTranslations(`industryData.${config.slug}`);
  const tt = useTranslations('industryTemplate');
  const benefits = Array.from({ length: 5 }, (_, index) => `b${index + 1}`);

  return (
    <div
      className="overflow-hidden bg-[#06111a] text-white"
      style={{ '--industry-accent': config.accent, '--industry-soft': config.accentSoft } as CSSProperties}
    >
      <section className="bma-grain relative isolate min-h-[82dvh] overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:flex lg:items-center lg:px-16">
        <Image src={config.heroImage} alt={t('headline')} fill priority loading="eager" className="-z-30 object-cover opacity-45" sizes="100vw" />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(98deg,#06111a_0%,rgba(6,17,26,.94)_48%,rgba(6,17,26,.48)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_20%,color-mix(in_srgb,var(--industry-soft)_22%,transparent),transparent_31%),radial-gradient(circle_at_14%_76%,color-mix(in_srgb,var(--industry-accent)_18%,transparent),transparent_30%)]" />

        <div className="bma-container grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .72 }}>
            <p className="font-label text-[11px] font-semibold uppercase tracking-[.25em] text-[var(--industry-accent)]">{tt('heroEyebrow', { industry: t('headline') })}</p>
            <h1 className={`${styles.heroHeading} mt-6 font-headline text-[clamp(3.25rem,5.7vw,5.8rem)] font-medium leading-[.94] tracking-[-.056em]`}>{t('headline')}</h1>
            <p className="mt-7 max-w-[42rem] text-base leading-7 text-white/62 sm:text-lg sm:leading-8">{t('subheadline')}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={`/${locale}/quotation?industry=${config.slug}&source=industry-hero`} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[var(--industry-accent)] px-7 font-label text-sm font-semibold text-[#111820] transition hover:-translate-y-0.5 hover:brightness-110">
                {tt('helpChoose')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href="#day-flow" className="bma-button-secondary min-h-14 px-7">{tt('seeDayFlow')}</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .72, delay: .12 }} className="relative lg:pl-8">
            <div className="absolute -inset-8 rounded-full bg-[var(--industry-soft)]/[0.07] blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#07131e]/90 shadow-[0_42px_120px_rgba(0,0,0,.52)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-7">
                <div><p className="font-label text-[9px] uppercase tracking-[.18em] text-white/32">{tt('livePlan')}</p><strong className="mt-1 block text-sm">{t('zonesTitle')}</strong></div>
                <span className="inline-flex items-center gap-2 text-xs text-emerald-200"><i className="h-1.5 w-1.5 rounded-full bg-emerald-300" />{tt('ready')}</span>
              </div>
              <div className="p-5 sm:p-7">
                <div className="space-y-3">
                  {config.moments.slice(0, 3).map((moment, index) => {
                    const zoneKey = `z${moment.zone + 1}`;
                    const Icon = capabilityIcons[moment.capability];
                    return (
                      <div key={`${moment.time}-${zoneKey}`} className={`${styles.previewCard} grid grid-cols-[3.2rem_1fr_auto] items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-3.5 sm:grid-cols-[3.8rem_1fr_auto] sm:p-4`}>
                        <span className="font-mono text-[10px] text-[var(--industry-accent)]">{moment.time}</span>
                        <div><p className="text-sm font-medium">{t(`zones.${zoneKey}.name`)}</p><p className="mt-1 line-clamp-1 text-xs text-white/38">{t(`zones.${zoneKey}.description`)}</p></div>
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--industry-accent)]/[0.09] text-[var(--industry-accent)]"><Icon className="h-4 w-4" aria-hidden="true" /></span>
                        {index === 1 && <i className={styles.previewPulse} aria-hidden="true" />}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">{config.capabilities.slice(0, 5).map((key) => <span key={key} className="rounded-full border border-white/[0.08] px-3 py-1.5 text-[10px] text-white/46">{tt(`capabilities.${key}`)}</span>)}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="day-flow" className="bma-section border-y border-white/[0.08] bg-[#081521]">
        <div className="bma-container">
          <motion.div {...reveal} className="grid gap-8 lg:grid-cols-[.72fr_1fr] lg:items-end">
            <div>
              <p className="font-label text-[11px] uppercase tracking-[.25em] text-[var(--industry-accent)]">{tt('dayEyebrow')}</p>
              <h2 className={`${styles.sectionHeading} mt-5 max-w-3xl font-headline text-[clamp(2.75rem,5vw,4.25rem)] font-medium leading-[.98] tracking-[-.052em]`}>{tt('dayTitle')}</h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/52 sm:text-lg sm:leading-8 lg:justify-self-end">{tt('dayDescription')}</p>
          </motion.div>

          <div className="mt-14 grid gap-4 lg:grid-cols-12">
            {config.moments.map((moment, index) => {
              const zoneKey = `z${moment.zone + 1}`;
              const Icon = capabilityIcons[moment.capability];
              const wide = index === 0 || index === 3;
              return (
                <motion.article key={`${moment.time}-${zoneKey}`} {...reveal} className={`${styles.momentCard} group p-6 sm:p-8 ${wide ? 'lg:col-span-7' : 'lg:col-span-5'}`}>
                  <AtmosphereField image={config.heroImage} index={index} />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3"><span className="font-label text-[10px] uppercase tracking-[.22em] text-white/35">0{index + 1}</span><span className="rounded-full border border-white/12 bg-[#07131e]/60 px-3 py-1.5 font-mono text-[11px] text-[var(--industry-accent)] backdrop-blur-md">{moment.time}</span></div>
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-[#07131e]/55 text-[var(--industry-accent)] backdrop-blur-md"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  </div>
                  <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
                    <p className="font-label text-[10px] uppercase tracking-[.2em] text-[var(--industry-soft)]">{tt(`capabilities.${moment.capability}`)}</p>
                    <h3 className="mt-3 max-w-xl font-headline text-3xl font-medium tracking-[-.035em] sm:text-4xl">{t(`zones.${zoneKey}.name`)}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/55 sm:text-base sm:leading-7">{t(`zones.${zoneKey}.description`)}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bma-grain bma-section bg-[#06111a]">
        <div className="bma-container">
          <motion.div {...reveal} className="max-w-4xl">
            <p className="font-label text-[11px] uppercase tracking-[.25em] text-[var(--industry-accent)]">{tt('touchpointsEyebrow')}</p>
            <h2 className={`${styles.sectionHeading} mt-5 font-headline text-[clamp(2.75rem,5vw,4.1rem)] font-medium leading-[.98] tracking-[-.052em]`}>{tt('touchpointsTitle')}</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/52 sm:text-lg sm:leading-8">{tt('touchpointsDescription')}</p>
          </motion.div>

          <div className="mt-14 grid gap-4 lg:grid-cols-12">
            {config.featureZones.map((zoneIndex, index) => {
              const key = `z${zoneIndex + 1}`;
              const capability = config.capabilities[index % config.capabilities.length];
              const Icon = capabilityIcons[capability];
              return (
                <motion.article key={key} {...reveal} className={`group relative min-h-[20rem] overflow-hidden rounded-[1.6rem] border border-white/[0.09] bg-[#091722] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/[0.16] sm:p-8 ${index === 0 ? 'lg:col-span-6' : 'lg:col-span-3'}`}>
                  <Image src={config.heroImage} alt="" fill className="object-cover opacity-[0.1] transition duration-700 group-hover:scale-105 group-hover:opacity-[0.16]" style={{ objectPosition: `${22 + index * 29}% center` }} sizes={index === 0 ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 100vw'} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07131e] via-[#07131e]/82 to-[#07131e]/28" />
                  <i className={styles.cardSpectrum} aria-hidden="true" />
                  <div className="relative flex h-full flex-col"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--industry-accent)]/[0.09] text-[var(--industry-accent)]"><Icon className="h-5 w-5" aria-hidden="true" /></span><p className="mt-auto font-label text-[9px] uppercase tracking-[.18em] text-[var(--industry-soft)]">{tt(`capabilities.${capability}`)}</p><h3 className="mt-3 font-headline text-2xl font-medium tracking-[-.03em]">{t(`zones.${key}.name`)}</h3><p className="mt-3 max-w-lg text-sm leading-6 text-white/50">{t(`zones.${key}.description`)}</p></div>
                </motion.article>
              );
            })}
            <motion.article {...reveal} className="relative overflow-hidden rounded-[1.6rem] border border-white/[0.09] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--industry-accent)_12%,#091722),#091722)] p-6 sm:p-8 lg:col-span-12">
              <i className={styles.cardSpectrum} aria-hidden="true" />
              <div className="grid gap-8 lg:grid-cols-[.45fr_1fr] lg:items-center"><div><p className="font-label text-[10px] uppercase tracking-[.2em] text-[var(--industry-accent)]">{t('benefitsTitle')}</p><h3 className="mt-4 font-headline text-3xl font-medium tracking-[-.035em]">{tt('operationsTitle')}</h3></div><div className="grid gap-3 sm:grid-cols-2">{benefits.map((key) => <p key={key} className="flex gap-3 text-sm leading-6 text-white/54"><Check className="mt-1 h-4 w-4 shrink-0 text-[var(--industry-soft)]" aria-hidden="true" />{t(`benefits.${key}`)}</p>)}</div></div>
            </motion.article>
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">{config.capabilities.map((key) => { const Icon = capabilityIcons[key]; return <span key={key} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.025] px-4 py-2 text-xs text-white/52"><Icon className="h-3.5 w-3.5 text-[var(--industry-accent)]" aria-hidden="true" />{tt(`capabilities.${key}`)}</span>; })}</div>
        </div>
      </section>

      <EvidenceSection evidence={config.evidence} />

      <section className="bma-section border-y border-white/[0.08] bg-[#081521]">
        <div className="bma-container">
          <motion.div {...reveal} className="text-center"><p className="font-label text-[11px] uppercase tracking-[.25em] text-[var(--industry-accent)]">{tt('productFitEyebrow')}</p><h2 className={`${styles.sectionHeading} mx-auto mt-5 max-w-4xl font-headline text-[clamp(2.75rem,5vw,4.1rem)] font-medium leading-[.98] tracking-[-.052em]`}>{tt('productFitTitle')}</h2><p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/50 sm:text-lg sm:leading-8">{tt('productFitDescription')}</p></motion.div>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <ProductFit href={`/${locale}/beat-breeze`} palette="beat" label="Beat Breeze" eyebrow={tt('beatBreeze.eyebrow')} text={tt('beatBreeze.text')} cta={tt('beatBreeze.cta')} />
            <ProductFit href={`/${locale}/soundtrack-your-brand`} palette="soundtrack" label="Soundtrack" eyebrow={tt('soundtrack.eyebrow')} text={tt('soundtrack.text')} cta={tt('soundtrack.cta')} />
          </div>
          <div className="mt-5 text-center"><Link href={`/${locale}/quotation?industry=${config.slug}&source=industry-product-fit`} className="inline-flex items-center gap-2 font-label text-sm font-semibold text-[var(--industry-accent)] hover:text-white">{tt('notSure')} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
        </div>
      </section>

      <section className="bma-grain relative overflow-hidden px-5 py-24 text-center sm:px-8 md:py-28 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,color-mix(in_srgb,var(--industry-accent)_18%,transparent),transparent_48%)]" />
        <motion.div {...reveal} className="relative mx-auto max-w-4xl"><Gauge className="mx-auto h-8 w-8 text-[var(--industry-accent)]" aria-hidden="true" /><h2 className={`${styles.sectionHeading} mt-7 font-headline text-[clamp(2.8rem,5vw,4.4rem)] font-medium leading-[.98] tracking-[-.052em]`}>{t('ctaHeadline')}</h2><p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/50 sm:text-lg sm:leading-8">{tt('finalDescription')}</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Link href={`/${locale}/quotation?industry=${config.slug}&source=industry-final`} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[var(--industry-accent)] px-8 font-label text-sm font-semibold text-[#111820] hover:brightness-110">{tt('helpChoose')} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link href={`/${locale}/how-it-works`} className="bma-button-secondary min-h-14 px-8">{tt('howItWorks')}</Link></div></motion.div>
      </section>
    </div>
  );
}

function AtmosphereField({ image, index }: { image: string; index: number }) {
  const gradientId = useId().replaceAll(':', '');
  const objectPositions = ['32% center', '68% center', '48% center', '78% center'];

  return (
    <div className={styles.field} aria-hidden="true">
      <Image src={image} alt="" fill className={styles.fieldImage} style={{ objectPosition: objectPositions[index % objectPositions.length] }} sizes="(min-width: 1024px) 58vw, 100vw" />
      <div className={styles.fieldWash} />
      <i className={styles.fieldOrb} />
      <i className={styles.fieldOrbSecondary} />
      <svg className={styles.fieldSvg} viewBox="0 0 560 220" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--industry-accent)" stopOpacity=".1" />
            <stop offset=".5" stopColor="var(--industry-accent)" stopOpacity=".92" />
            <stop offset="1" stopColor="var(--industry-soft)" stopOpacity=".18" />
          </linearGradient>
        </defs>
        <path className={styles.fieldRibbon} stroke={`url(#${gradientId})`} d="M-30 153 C64 33 144 202 255 94 S434 33 590 138" />
        <path className={styles.fieldRibbon} stroke={`url(#${gradientId})`} d="M-24 92 C76 192 151 20 278 124 S463 186 592 66" />
        <path className={styles.fieldRibbon} stroke={`url(#${gradientId})`} d="M-40 184 C86 113 159 160 275 62 S448 112 600 24" />
      </svg>
      <i className={styles.particle} /><i className={styles.particle} /><i className={styles.particle} />
    </div>
  );
}

function EvidenceSection({ evidence }: { evidence: EvidenceKey }) {
  const tt = useTranslations('industryTemplate');
  return (
    <section className="bma-section bg-[#06111a]">
      <div className="bma-container">
        <motion.article {...reveal} className={`${styles.evidencePanel} grid gap-10 p-7 sm:p-10 lg:grid-cols-[.86fr_1.14fr] lg:items-center lg:p-14`}>
          <div>
            <p className="font-label text-[11px] uppercase tracking-[.25em] text-[var(--industry-accent)]">{tt('evidence.eyebrow')}</p>
            <h2 className={`${styles.sectionHeading} mt-5 max-w-xl font-headline text-[clamp(2.65rem,4.7vw,4rem)] font-medium leading-[.99] tracking-[-.052em]`}>{tt('evidence.title')}</h2>
            <p className="mt-6 max-w-xl text-sm leading-6 text-white/48 sm:text-base sm:leading-7">{tt('evidence.description')}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/[0.1] bg-[#07131e]/72 p-6 backdrop-blur-md sm:p-8">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--industry-accent)]/[0.1] text-[var(--industry-accent)]"><BookOpenText className="h-5 w-5" aria-hidden="true" /></span>
            <h3 className="mt-6 font-headline text-2xl font-medium tracking-[-.03em] sm:text-3xl">{tt(`evidence.notes.${evidence}.title`)}</h3>
            <p className="mt-4 text-sm leading-6 text-white/54 sm:text-base sm:leading-7">{tt(`evidence.notes.${evidence}.body`)}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {evidenceSources[evidence].map((source) => (
                <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-white/58 transition hover:border-white/20 hover:text-white">
                  {source.label}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only"> — {tt('evidence.opensSource')}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

function ProductFit({ href, palette, label, eyebrow, text, cta }: { href: string; palette: 'beat' | 'soundtrack'; label: string; eyebrow: string; text: string; cta: string }) {
  const tone = palette === 'beat' ? 'border-brand-orange/22 bg-[linear-gradient(135deg,rgba(239,166,52,.1),rgba(73,213,197,.04))]' : 'border-[#d6c2ff]/20 bg-[linear-gradient(135deg,rgba(214,194,255,.09),rgba(61,29,75,.15))]';
  const accent = palette === 'beat' ? 'text-brand-orange' : 'text-[#d6c2ff]';
  return <Link href={href} className={`group rounded-[1.6rem] border p-7 transition hover:-translate-y-1 sm:p-9 ${tone}`}><p className={`font-label text-[10px] uppercase tracking-[.2em] ${accent}`}>{eyebrow}</p><h3 className="mt-5 font-headline text-3xl font-medium tracking-[-.035em]">{label}</h3><p className="mt-4 max-w-xl text-sm leading-6 text-white/48">{text}</p><span className={`mt-8 inline-flex items-center gap-2 font-label text-sm font-semibold ${accent}`}>{cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span></Link>;
}

export default IndustryPageTemplate;
