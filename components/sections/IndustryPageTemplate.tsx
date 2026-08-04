'use client';

import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowRight,
  Braces,
  CalendarClock,
  Check,
  Clapperboard,
  Gauge,
  ImageIcon,
  Languages,
  MessageSquareText,
  MonitorPlay,
  MoonStar,
  Music2,
  PhoneCall,
  Radio,
  Sparkles,
  Volume2,
  Workflow,
} from 'lucide-react';
import type { CapabilityKey, IndustryConfig } from '@/lib/industry-data';

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
  const zones = Array.from({ length: 6 }, (_, index) => `z${index + 1}`);
  const benefits = Array.from({ length: 5 }, (_, index) => `b${index + 1}`);

  return (
    <div
      className="overflow-hidden bg-[#06111a] text-white"
      style={{ '--industry-accent': config.accent, '--industry-soft': config.accentSoft } as CSSProperties}
    >
      <section className="bma-grain relative isolate min-h-[88dvh] overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:flex lg:items-center lg:px-16">
        <Image src={config.heroImage} alt={t('headline')} fill priority loading="eager" className="-z-30 object-cover opacity-45" sizes="100vw" />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(95deg,#06111a_0%,rgba(6,17,26,.94)_50%,rgba(6,17,26,.45)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_18%,color-mix(in_srgb,var(--industry-soft)_20%,transparent),transparent_30%),radial-gradient(circle_at_12%_72%,color-mix(in_srgb,var(--industry-accent)_16%,transparent),transparent_28%)]" />

        <div className="bma-container grid gap-12 lg:grid-cols-[.83fr_1.17fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .72 }}>
            <p className="font-label text-[11px] font-semibold uppercase tracking-[.25em] text-[var(--industry-accent)]">{tt('heroEyebrow', { industry: t('headline') })}</p>
            <h1 className="mt-6 max-w-4xl font-headline text-[clamp(3.7rem,7.2vw,7.6rem)] font-medium leading-[.93] tracking-[-.058em]">{t('headline')}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/62 sm:text-xl">{t('subheadline')}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={`/${locale}/quotation?industry=${config.slug}&source=industry-hero`} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[var(--industry-accent)] px-7 font-label text-sm font-semibold text-[#111820] transition hover:-translate-y-0.5 hover:brightness-110">
                {tt('helpChoose')} <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#day-flow" className="bma-button-secondary min-h-14 px-7">{tt('seeDayFlow')}</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .72, delay: .12 }} className="relative lg:pl-10">
            <div className="absolute -inset-8 rounded-full bg-[var(--industry-soft)]/[0.07] blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#07131e]/90 shadow-[0_42px_120px_rgba(0,0,0,.52)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-7"><div><p className="font-label text-[9px] uppercase tracking-[.18em] text-white/32">{tt('livePlan')}</p><strong className="mt-1 block text-sm">{t('zonesTitle')}</strong></div><span className="inline-flex items-center gap-2 text-xs text-emerald-200"><i className="h-1.5 w-1.5 rounded-full bg-emerald-300" />{tt('ready')}</span></div>
              <div className="relative p-5 sm:p-7">
                <div className="absolute bottom-8 left-[2.1rem] top-8 w-px bg-gradient-to-b from-[var(--industry-accent)] via-[var(--industry-soft)] to-transparent sm:left-[2.6rem]" />
                <div className="space-y-3">
                  {config.moments.slice(0, 3).map((moment, index) => {
                    const zoneKey = `z${moment.zone + 1}`;
                    const Icon = capabilityIcons[moment.capability];
                    return (
                      <div key={`${moment.time}-${zoneKey}`} className="relative grid grid-cols-[2.8rem_1fr_auto] items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-3.5 sm:grid-cols-[3.4rem_1fr_auto] sm:p-4">
                        <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-[#07131e] font-mono text-[9px] text-[var(--industry-accent)]">{moment.time}</span>
                        <div><p className="text-sm font-medium">{t(`zones.${zoneKey}.name`)}</p><p className="mt-1 line-clamp-1 text-xs text-white/38">{t(`zones.${zoneKey}.description`)}</p></div>
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--industry-accent)]/[0.09] text-[var(--industry-accent)]"><Icon className="h-4 w-4" /></span>
                        {index === 1 && <i className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[var(--industry-soft)] shadow-[0_0_14px_var(--industry-soft)]" />}
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
          <motion.div {...reveal} className="grid gap-8 lg:grid-cols-[.64fr_1fr] lg:items-end">
            <div><p className="font-label text-[11px] uppercase tracking-[.25em] text-[var(--industry-accent)]">{tt('dayEyebrow')}</p><h2 className="mt-5 font-headline text-5xl font-medium leading-[.97] tracking-[-.052em] sm:text-6xl lg:text-7xl">{tt('dayTitle')}</h2></div>
            <p className="max-w-2xl text-lg leading-8 text-white/52 lg:justify-self-end">{tt('dayDescription')}</p>
          </motion.div>

          <div className="relative mt-16">
            <div className="absolute bottom-0 left-5 top-0 w-px bg-[linear-gradient(var(--industry-accent),var(--industry-soft),transparent)] sm:left-[7.5rem] lg:left-1/2" />
            {config.moments.map((moment, index) => {
              const zoneKey = `z${moment.zone + 1}`;
              const Icon = capabilityIcons[moment.capability];
              return (
                <motion.article key={`${moment.time}-${zoneKey}`} {...reveal} className={`relative grid min-h-[14rem] grid-cols-[2.8rem_1fr] gap-5 pb-9 sm:grid-cols-[8rem_1fr] lg:grid-cols-2 lg:gap-16 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                  <div className={`hidden lg:block ${index % 2 ? 'order-2' : ''}`}>
                    <p className="font-mono text-sm text-[var(--industry-accent)]">{moment.time}</p>
                    <h3 className="mt-4 text-3xl font-medium">{t(`zones.${zoneKey}.name`)}</h3>
                    <p className={`mt-3 text-base leading-7 text-white/46 ${index % 2 ? 'max-w-lg' : 'ml-auto max-w-lg'}`}>{t(`zones.${zoneKey}.description`)}</p>
                    <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-3 py-1.5 text-[10px] text-white/52"><Icon className="h-3.5 w-3.5 text-[var(--industry-accent)]" />{tt(`capabilities.${moment.capability}`)}</span>
                  </div>
                  <span className="relative z-10 mt-1 grid h-10 w-10 place-items-center rounded-full border border-white/14 bg-[#081521] font-mono text-xs text-[var(--industry-accent)] sm:ml-[5.5rem] lg:absolute lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">0{index + 1}</span>
                  <div className="lg:hidden"><p className="font-mono text-sm text-[var(--industry-accent)]">{moment.time}</p><h3 className="mt-3 text-2xl font-medium">{t(`zones.${zoneKey}.name`)}</h3><p className="mt-3 text-sm leading-6 text-white/46">{t(`zones.${zoneKey}.description`)}</p><span className="mt-4 inline-flex items-center gap-2 text-[10px] text-white/52"><Icon className="h-3.5 w-3.5 text-[var(--industry-accent)]" />{tt(`capabilities.${moment.capability}`)}</span></div>
                  <div className={`hidden lg:block ${index % 2 ? 'order-1' : 'order-2'}`}><MomentSignal accent={config.accent} soft={config.accentSoft} index={index} label={tt(`capabilities.${moment.capability}`)} /></div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bma-grain bma-section bg-[#06111a]">
        <div className="bma-container">
          <motion.div {...reveal} className="max-w-4xl"><p className="font-label text-[11px] uppercase tracking-[.25em] text-[var(--industry-accent)]">{tt('touchpointsEyebrow')}</p><h2 className="mt-5 font-headline text-5xl font-medium leading-[.97] tracking-[-.052em] sm:text-6xl">{tt('touchpointsTitle')}</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-white/52">{tt('touchpointsDescription')}</p></motion.div>

          <div className="mt-14 grid gap-4 lg:grid-cols-12">
            {config.featureZones.map((zoneIndex, index) => {
              const key = `z${zoneIndex + 1}`;
              const capability = config.capabilities[index % config.capabilities.length];
              const Icon = capabilityIcons[capability];
              return (
                <motion.article key={key} {...reveal} className={`relative min-h-[22rem] overflow-hidden rounded-[1.6rem] border border-white/[0.09] bg-[#091722] p-6 sm:p-8 ${index === 0 ? 'lg:col-span-6' : 'lg:col-span-3'}`}>
                  {index === 0 && <Image src={config.heroImage} alt="" fill className="object-cover opacity-[0.12]" sizes="50vw" />}
                  <div className="relative flex h-full flex-col"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--industry-accent)]/[0.09] text-[var(--industry-accent)]"><Icon className="h-5 w-5" /></span><p className="mt-auto font-label text-[9px] uppercase tracking-[.18em] text-[var(--industry-accent)]">{tt(`capabilities.${capability}`)}</p><h3 className="mt-3 text-2xl font-medium">{t(`zones.${key}.name`)}</h3><p className="mt-3 max-w-lg text-sm leading-6 text-white/46">{t(`zones.${key}.description`)}</p></div>
                </motion.article>
              );
            })}
            <motion.article {...reveal} className="rounded-[1.6rem] border border-white/[0.09] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--industry-accent)_12%,#091722),#091722)] p-6 sm:p-8 lg:col-span-12">
              <div className="grid gap-8 lg:grid-cols-[.45fr_1fr] lg:items-center"><div><p className="font-label text-[10px] uppercase tracking-[.2em] text-[var(--industry-accent)]">{t('benefitsTitle')}</p><h3 className="mt-4 text-3xl font-medium">{tt('operationsTitle')}</h3></div><div className="grid gap-3 sm:grid-cols-2">{benefits.map((key) => <p key={key} className="flex gap-3 text-sm leading-6 text-white/54"><Check className="mt-1 h-4 w-4 shrink-0 text-[var(--industry-accent)]" />{t(`benefits.${key}`)}</p>)}</div></div>
            </motion.article>
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">{config.capabilities.map((key) => { const Icon = capabilityIcons[key]; return <span key={key} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.025] px-4 py-2 text-xs text-white/52"><Icon className="h-3.5 w-3.5 text-[var(--industry-accent)]" />{tt(`capabilities.${key}`)}</span>; })}</div>
        </div>
      </section>

      <section className="bma-section border-y border-white/[0.08] bg-[#081521]">
        <div className="bma-container">
          <motion.div {...reveal} className="text-center"><p className="font-label text-[11px] uppercase tracking-[.25em] text-[var(--industry-accent)]">{tt('productFitEyebrow')}</p><h2 className="mx-auto mt-5 max-w-4xl font-headline text-5xl font-medium leading-[.98] tracking-[-.052em] sm:text-6xl">{tt('productFitTitle')}</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/50">{tt('productFitDescription')}</p></motion.div>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <ProductFit href={`/${locale}/beat-breeze`} palette="beat" label="Beat Breeze" eyebrow={tt('beatBreeze.eyebrow')} text={tt('beatBreeze.text')} cta={tt('beatBreeze.cta')} />
            <ProductFit href={`/${locale}/soundtrack-your-brand`} palette="soundtrack" label="Soundtrack" eyebrow={tt('soundtrack.eyebrow')} text={tt('soundtrack.text')} cta={tt('soundtrack.cta')} />
          </div>
          <div className="mt-5 text-center"><Link href={`/${locale}/quotation?industry=${config.slug}&source=industry-product-fit`} className="inline-flex items-center gap-2 font-label text-sm font-semibold text-[var(--industry-accent)] hover:text-white">{tt('notSure')} <ArrowRight className="h-4 w-4" /></Link></div>
        </div>
      </section>

      <section className="bma-grain relative overflow-hidden px-5 py-24 text-center sm:px-8 md:py-32 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,color-mix(in_srgb,var(--industry-accent)_18%,transparent),transparent_48%)]" />
        <motion.div {...reveal} className="relative mx-auto max-w-4xl"><Gauge className="mx-auto h-8 w-8 text-[var(--industry-accent)]" /><h2 className="mt-7 font-headline text-5xl font-medium leading-[.98] tracking-[-.052em] sm:text-7xl">{t('ctaHeadline')}</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/50">{tt('finalDescription')}</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Link href={`/${locale}/quotation?industry=${config.slug}&source=industry-final`} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[var(--industry-accent)] px-8 font-label text-sm font-semibold text-[#111820] hover:brightness-110">{tt('helpChoose')} <ArrowRight className="h-4 w-4" /></Link><Link href={`/${locale}/how-it-works`} className="bma-button-secondary min-h-14 px-8">{tt('howItWorks')}</Link></div></motion.div>
      </section>
    </div>
  );
}

function MomentSignal({ accent, soft, index, label }: { accent: string; soft: string; index: number; label: string }) {
  return (
    <div className="ml-auto max-w-md rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 text-left">
      <div className="flex items-center justify-between"><span className="font-label text-[9px] uppercase tracking-[.18em] text-white/30">{label}</span><Sparkles className="h-4 w-4" style={{ color: accent }} /></div>
      <div className="mt-6 flex h-14 items-end gap-1.5">{[31, 58, 39, 75, 47, 84, 61, 70, 43, 66].map((height, bar) => <i key={bar} className="w-full rounded-full" style={{ height: `${Math.max(16, height - index * 4)}%`, background: `linear-gradient(${soft}, ${accent}55)` }} />)}</div>
    </div>
  );
}

function ProductFit({ href, palette, label, eyebrow, text, cta }: { href: string; palette: 'beat' | 'soundtrack'; label: string; eyebrow: string; text: string; cta: string }) {
  const tone = palette === 'beat' ? 'border-brand-orange/22 bg-[linear-gradient(135deg,rgba(239,166,52,.1),rgba(73,213,197,.04))]' : 'border-[#d6c2ff]/20 bg-[linear-gradient(135deg,rgba(214,194,255,.09),rgba(61,29,75,.15))]';
  const accent = palette === 'beat' ? 'text-brand-orange' : 'text-[#d6c2ff]';
  return <Link href={href} className={`group rounded-[1.6rem] border p-7 transition hover:-translate-y-1 sm:p-9 ${tone}`}><p className={`font-label text-[10px] uppercase tracking-[.2em] ${accent}`}>{eyebrow}</p><h3 className="mt-5 text-3xl font-medium">{label}</h3><p className="mt-4 max-w-xl text-sm leading-6 text-white/48">{text}</p><span className={`mt-8 inline-flex items-center gap-2 font-label text-sm font-semibold ${accent}`}>{cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link>;
}

export default IndustryPageTemplate;
