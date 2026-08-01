'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowRight,
  CalendarClock,
  Check,
  CloudOff,
  Headphones,
  MessageSquare,
  MonitorPlay,
  Music2,
  Play,
  ShieldCheck,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { ClientLogos } from '@/components/sections';
import { FloatingChatButton } from '@/components/chat/FloatingChatButton';

const capabilities = [
  { key: 'curation', icon: Sparkles, index: '01' },
  { key: 'scheduling', icon: CalendarClock, index: '02' },
  { key: 'remoteMgmt', icon: Volume2, index: '03' },
  { key: 'offline', icon: CloudOff, index: '04' },
  { key: 'audioSignatures', icon: MessageSquare, index: '05' },
  { key: 'zeroLicensing', icon: ShieldCheck, index: '06' },
] as const;

const industries = [
  { key: 'hotels', href: '/solutions/hotels', image: '/images/hero-hotel.webp' },
  { key: 'restaurants', href: '/solutions/restaurants', image: '/images/hero-restaurant.webp' },
  { key: 'retail', href: '/solutions/retail', image: '/images/hero-retail.webp' },
] as const;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65 },
};

function VenuePulse() {
  const h = useTranslations('homePage');
  const zones = [
    { key: 'lobby', progress: '68%', tone: 'from-[#f39a20] to-[#f7c66b]' },
    { key: 'restaurant', progress: '46%', tone: 'from-[#00d3c7] to-[#71e6c2]' },
    { key: 'rooftop', progress: '22%', tone: 'from-[#7687ff] to-[#00d3c7]' },
  ] as const;

  return (
    <div className="relative mx-auto w-full max-w-[620px]" aria-label={h('venuePulse.ariaLabel')}>
      <div className="absolute -inset-16 rounded-full bg-brand-orange/10 blur-3xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#091221]/90 shadow-[0_35px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-7">
          <div>
            <p className="font-label text-[10px] uppercase tracking-[0.28em] text-white/40">{h('venuePulse.label')}</p>
            <p className="mt-1 text-sm font-medium text-white">{h('venuePulse.venue')}</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />
            {h('venuePulse.ready')}
          </div>
        </div>

        <div className="space-y-3 p-4 sm:p-6">
          {zones.map((zone, index) => (
            <motion.div
              key={zone.key}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.22 + index * 0.1, duration: 0.55 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 transition-colors hover:bg-white/[0.055]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${zone.tone}`} />
                    <p className="text-sm font-semibold text-white">{h(`venuePulse.${zone.key}.name`)}</p>
                  </div>
                  <p className="mt-2 truncate pl-5 text-xs text-white/45">{h(`venuePulse.${zone.key}.playlist`)}</p>
                </div>
                <span className="shrink-0 font-label text-[10px] uppercase tracking-[0.16em] text-white/35">
                  {h(`venuePulse.${zone.key}.status`)}
                </span>
              </div>
              <div className="mt-4 h-px bg-white/[0.08]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: zone.progress }}
                  transition={{ delay: 0.55 + index * 0.12, duration: 1, ease: 'easeOut' }}
                  className={`h-px bg-gradient-to-r ${zone.tone}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 border-t border-white/[0.08] bg-white/[0.025] px-5 py-5 sm:grid-cols-[auto_1fr] sm:px-7">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-orange/30 bg-brand-orange/10 text-brand-orange">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center justify-between gap-4">
              <p className="font-label text-[10px] uppercase tracking-[0.22em] text-brand-orange">{h('venuePulse.conciergeLabel')}</p>
              <span className="font-label text-[10px] text-white/30">18:30</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{h('venuePulse.conciergeText')}</p>
            <p className="mt-2 text-xs text-white/35">{h('venuePulse.reason')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const locale = useLocale();
  const t = useTranslations('hero');
  const h = useTranslations('homePage');
  const bb = useTranslations('beatBreezePage');

  return (
    <>
      <section className="relative isolate min-h-[860px] overflow-hidden bg-[#070d17] pb-20 pt-28 lg:flex lg:min-h-screen lg:items-center lg:pb-24 lg:pt-28">
        <Image
          src="/images/hero-lounge.webp"
          alt=""
          fill
          priority
          className="-z-30 object-cover opacity-[0.16]"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#070d17_0%,rgba(7,13,23,0.92)_48%,rgba(7,13,23,0.72)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(239,166,52,0.14),transparent_31%),radial-gradient(circle_at_84%_35%,rgba(0,211,199,0.10),transparent_28%)]" />

        <div className="mx-auto grid w-full max-w-[1440px] gap-14 px-6 sm:px-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(520px,1.12fr)] lg:items-center lg:gap-16 lg:px-16 xl:px-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <div className="mb-7 flex items-center gap-3 font-label text-[11px] uppercase tracking-[0.28em] text-brand-orange">
              <span className="h-px w-9 bg-brand-orange" />
              {t('tagline')}
            </div>
            <h1 className="max-w-[760px] font-headline text-[clamp(3.4rem,7vw,6.8rem)] leading-[0.94] tracking-[-0.055em] text-white">
              {t('headline')}
              <span className="mt-2 block bg-gradient-to-r from-brand-orange via-[#e7bf68] to-[#42d6ca] bg-clip-text pb-2 text-transparent">
                {t('headlineHighlight')}
              </span>
            </h1>
            <p className="mt-7 max-w-[620px] text-lg leading-8 text-white/58 md:text-xl">
              {t('subheading')}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="https://beatbreeze.io/sign-up"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-brand-orange px-7 font-label text-sm font-semibold text-[#101010] transition-all hover:bg-[#ffb64a] focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-4 focus:ring-offset-[#070d17]"
              >
                {t('ctaQuote')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <Link
                href={`/${locale}/beat-breeze`}
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/15 px-7 font-label text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-4 focus:ring-offset-[#070d17]"
              >
                {t('ctaDemo')}
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/40">
              {[h('beatBreezeLead.proof1'), h('beatBreezeLead.proof2'), h('beatBreezeLead.proof3')].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-brand-orange" aria-hidden="true" /> {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 34 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.12 }}>
            <VenuePulse />
          </motion.div>
        </div>
      </section>

      <ClientLogos />

      <section className="relative overflow-hidden border-y border-white/[0.08] bg-[#09111d] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_50%,rgba(0,211,199,0.08),transparent_55%)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
          <motion.div {...reveal}>
            <p className="font-label text-[11px] uppercase tracking-[0.28em] text-brand-orange">{h('beatBreezeLead.label')}</p>
            <h2 className="mt-5 max-w-xl font-headline text-4xl leading-[1.04] tracking-[-0.035em] text-white md:text-6xl">
              {h('beatBreezeLead.title')}
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/52">{h('beatBreezeLead.description')}</p>
            <Link
              href={`/${locale}/beat-breeze`}
              className="group mt-8 inline-flex items-center gap-3 font-label text-sm font-semibold text-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange"
            >
              {h('beatBreezeLead.cta')} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.div>

          <div className="border-t border-white/10 lg:border-l lg:border-t-0 lg:pl-14">
            {capabilities.map(({ key, icon: Icon, index }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="grid gap-4 border-b border-white/[0.08] py-7 sm:grid-cols-[48px_1fr_auto] sm:items-start"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-white/65">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{bb(`features.${key}.title`)}</h3>
                  <p className="mt-2 max-w-2xl leading-7 text-white/48">{bb(`features.${key}.desc`)}</p>
                </div>
                <span className="hidden pt-1 font-label text-xs text-white/20 sm:block">{index}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#070d17] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-[1320px]">
          <motion.div {...reveal} className="max-w-3xl">
            <p className="font-label text-[11px] uppercase tracking-[0.28em] text-brand-orange">{h('beatBreezeLead.workflowLabel')}</p>
            <h2 className="mt-5 font-headline text-4xl tracking-[-0.035em] text-white md:text-6xl">{h('beatBreezeLead.workflowTitle')}</h2>
            <p className="mt-6 text-lg leading-8 text-white/50">{h('beatBreezeLead.workflowDescription')}</p>
          </motion.div>

          <div className="mt-16 grid overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b1423] lg:grid-cols-3">
            {[
              { icon: Music2, title: h('beatBreezeLead.step1Title'), text: h('beatBreezeLead.step1Text'), number: '01' },
              { icon: MonitorPlay, title: h('beatBreezeLead.step2Title'), text: h('beatBreezeLead.step2Text'), number: '02' },
              { icon: Headphones, title: h('beatBreezeLead.step3Title'), text: h('beatBreezeLead.step3Text'), number: '03' },
            ].map((step, index) => {
              const StepIcon = step.icon;
              return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative min-h-[300px] border-b border-white/[0.08] p-8 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0 md:p-10"
              >
                <span className="font-label text-xs text-brand-orange">{step.number}</span>
                <StepIcon className="mt-12 h-8 w-8 text-white/70" strokeWidth={1.4} aria-hidden="true" />
                <h3 className="mt-6 text-2xl font-medium text-white">{step.title}</h3>
                <p className="mt-3 max-w-sm leading-7 text-white/48">{step.text}</p>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-[#0a121f] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-[1320px]">
          <motion.div {...reveal} className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <p className="font-label text-[11px] uppercase tracking-[0.28em] text-white/38">{h('twoSolutions.syb.badge')}</p>
              <h2 className="mt-5 max-w-3xl font-headline text-4xl leading-[1.06] tracking-[-0.035em] text-white md:text-6xl">
                {h('alternative.title')}
              </h2>
            </div>
            <div className="lg:pb-1">
              <p className="text-lg leading-8 text-white/52">{h('alternative.description')}</p>
              <Link
                href={`/${locale}/soundtrack-your-brand`}
                className="group mt-7 inline-flex items-center gap-3 font-label text-sm font-semibold text-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange"
              >
                {h('twoSolutions.syb.cta')} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
            {(['feature1', 'feature2', 'feature3'] as const).map((key) => (
              <div key={key} className="bg-[#0b1423] p-7 text-sm leading-6 text-white/58 md:p-8">
                <Check className="mb-5 h-4 w-4 text-brand-orange" aria-hidden="true" />
                {h(`twoSolutions.syb.${key}`)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#070d17] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-[1320px]">
          <motion.div {...reveal} className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="font-label text-[11px] uppercase tracking-[0.28em] text-brand-orange">{h('industries.sectionTitle')}</p>
              <h2 className="mt-5 font-headline text-4xl tracking-[-0.035em] text-white md:text-6xl">{h('industries.sectionSubtitle')}</h2>
            </div>
            <Link href={`/${locale}/quotation`} className="group inline-flex items-center gap-3 text-sm font-semibold text-white/65 hover:text-white">
              {h('twoSolutions.notSureCta')} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <motion.div key={industry.key} {...reveal} transition={{ duration: 0.55, delay: index * 0.08 }}>
                <Link
                  href={`/${locale}${industry.href}`}
                  className="group relative block min-h-[460px] overflow-hidden rounded-[1.5rem] border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-4 focus:ring-offset-[#070d17]"
                >
                  <Image
                    src={industry.image}
                    alt={h(`industries.${industry.key}.title`)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070d17] via-[#070d17]/45 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
                    <p className="font-label text-[10px] uppercase tracking-[0.22em] text-brand-orange">0{index + 1}</p>
                    <h3 className="mt-3 font-headline text-3xl text-white">{h(`industries.${industry.key}.title`)}</h3>
                    <p className="mt-3 max-w-sm leading-7 text-white/60">{h(`industries.${industry.key}.desc`)}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="start" className="relative overflow-hidden border-t border-white/[0.08] bg-[#09111d] px-6 py-24 sm:px-10 md:py-36 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(239,166,52,0.16),transparent_48%)]" aria-hidden="true" />
        <motion.div {...reveal} className="relative mx-auto max-w-4xl text-center">
          <Play className="mx-auto h-9 w-9 text-brand-orange" strokeWidth={1.5} aria-hidden="true" />
          <h2 className="mt-7 font-headline text-5xl leading-[1.02] tracking-[-0.04em] text-white md:text-7xl">
            {h('finalCta.title')} <span className="bg-gradient-to-r from-brand-orange to-[#42d6ca] bg-clip-text text-transparent">{h('finalCta.titleHighlight')}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/50">{h('beatBreezeLead.finalDescription')}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="https://beatbreeze.io/sign-up" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-brand-orange px-8 font-label text-sm font-semibold text-[#101010] hover:bg-[#ffb64a]">
              {t('ctaQuote')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link href={`/${locale}/quotation`} className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/15 px-8 font-label text-sm font-semibold text-white hover:bg-white/5">
              {h('finalCta.ctaDemo')}
            </Link>
          </div>
        </motion.div>
      </section>

      <FloatingChatButton />
    </>
  );
}
