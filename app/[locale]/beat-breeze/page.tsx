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
  Laptop,
  MessageSquare,
  MonitorPlay,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { FloatingChatButton } from '@/components/chat/FloatingChatButton';

const features = [
  { key: 'curation', icon: Sparkles },
  { key: 'scheduling', icon: CalendarClock },
  { key: 'remoteMgmt', icon: Volume2 },
  { key: 'offline', icon: CloudOff },
  { key: 'audioSignatures', icon: MessageSquare },
  { key: 'zeroLicensing', icon: ShieldCheck },
] as const;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65 },
};

export default function BeatBreezePage() {
  const locale = useLocale();
  const t = useTranslations('beatBreezePage');
  const h = useTranslations('homePage');
  const zones = [
    { key: 'lobby', tone: 'bg-[#ef9c2f]' },
    { key: 'restaurant', tone: 'bg-[#39d7c8]' },
    { key: 'rooftop', tone: 'bg-[#8796ff]' },
  ] as const;

  return (
    <>
      <section className="relative isolate min-h-[880px] overflow-hidden bg-[#070d17] px-6 pb-24 pt-32 sm:px-10 lg:flex lg:min-h-screen lg:items-center lg:px-16">
        <Image src="/images/product-bb-hero.webp" alt="" fill priority className="-z-30 object-cover opacity-[0.13]" sizes="100vw" aria-hidden="true" />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#070d17_0%,rgba(7,13,23,.94)_50%,rgba(7,13,23,.72)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_35%,rgba(0,211,199,.12),transparent_30%),radial-gradient(circle_at_20%_20%,rgba(239,166,52,.14),transparent_30%)]" />

        <div className="mx-auto grid w-full max-w-[1440px] gap-14 lg:grid-cols-[.86fr_1.14fr] lg:items-center lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <p className="font-label text-[11px] uppercase tracking-[.28em] text-brand-orange">{h('beatBreezeLead.label')}</p>
            <h1 className="mt-7 bg-gradient-to-r from-brand-orange via-[#c9c56f] to-[#37d5cb] bg-clip-text pb-3 text-balance font-label text-[clamp(3.7rem,5.4vw,4.85rem)] leading-[.98] tracking-[-.05em] text-transparent">
              {t('hero.title')}
              <span className="block">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-white/58 md:text-xl">{h('beatBreezeLead.description')}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="https://beatbreeze.io/sign-up" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-brand-orange px-7 text-sm font-semibold text-[#101010] hover:bg-[#ffb64a]">
                {h('beatBreezeLead.proof1')} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a href="https://beatbreeze.io" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/15 px-7 text-sm font-semibold text-white hover:bg-white/5">
                {t('product.openProduct')}
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/55">
              {[h('beatBreezeLead.proof2'), h('beatBreezeLead.proof3'), t('product.price')].map((item) => (
                <span key={item} className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-brand-orange" aria-hidden="true" />{item}</span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .18, duration: .75 }} className="relative">
            <div className="absolute -inset-12 rounded-full bg-brand-orange/10 blur-3xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#091221]/92 shadow-[0_40px_100px_rgba(0,0,0,.5)] backdrop-blur-xl" role="img" aria-label={h('venuePulse.ariaLabel')}>
              <div className="flex items-center justify-between border-b border-white/[.08] px-6 py-5">
                <div><p className="font-label text-[10px] uppercase tracking-[.24em] text-white/35">{t('product.liveVenue')}</p><p className="mt-1 text-sm font-semibold text-white">{h('venuePulse.venue')}</p></div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/5 px-3 py-1.5 text-xs text-emerald-300">{t('product.zonesReady', { count: 3 })}</span>
              </div>
              <div className="grid gap-3 p-5 sm:grid-cols-3">
                {zones.map((zone) => (
                  <div key={zone.key} className="rounded-2xl border border-white/[.08] bg-white/[.035] p-4">
                    <div className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${zone.tone}`} /><span className="text-sm font-semibold text-white">{h(`venuePulse.${zone.key}.name`)}</span></div>
                    <p className="mt-5 text-xs text-white/45">{h(`venuePulse.${zone.key}.playlist`)}</p><p className="mt-2 font-label text-[9px] uppercase tracking-[.16em] text-white/25">{h(`venuePulse.${zone.key}.status`)}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-5 border-t border-white/[.08] bg-white/[.025] p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange"><Sparkles className="h-5 w-5" aria-hidden="true" /></div>
                <div><p className="text-sm font-medium text-white">{h('venuePulse.conciergeLabel')}</p><p className="mt-1 text-pretty text-xs leading-5 text-white/42">{h('venuePulse.conciergeText')}</p></div>
                <span className="font-label text-[10px] uppercase tracking-[.16em] text-brand-orange">{t('product.explainable')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/[.08] bg-[#09111d] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-[1320px]">
          <motion.div {...reveal} className="max-w-4xl">
            <p className="font-label text-[11px] uppercase tracking-[.28em] text-brand-orange">{t('features.sectionLabel')}</p>
            <h2 className="mt-5 max-w-[1100px] bg-gradient-to-r from-brand-orange via-[#c9c56f] to-[#37d5cb] bg-clip-text text-balance font-label text-[clamp(2.5rem,3.2vw,3.25rem)] leading-[1.02] tracking-[-.04em] text-transparent">{h('beatBreezeLead.title')}</h2>
            <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-white/50">{t('hero.subtitle')}</p>
          </motion.div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-[1.6rem] border border-white/[.08] bg-white/[.08] md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ key, icon: Icon }, index) => (
              <motion.div key={key} {...reveal} transition={{ duration: .5, delay: index * .04 }} className="min-h-[275px] bg-[#0b1423] p-8 md:p-10">
                <Icon className="h-7 w-7 text-brand-orange" strokeWidth={1.45} aria-hidden="true" />
                <h3 className="mt-12 text-balance text-xl font-medium text-white">{t(`features.${key}.title`)}</h3>
                <p className="mt-3 text-pretty leading-7 text-white/48">{t(`features.${key}.desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#070d17] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <motion.div {...reveal}>
            <p className="font-label text-[11px] uppercase tracking-[.28em] text-brand-orange">{t('product.waysLabel')}</p>
            <h2 className="mt-5 text-balance font-label text-3xl tracking-[-.04em] text-white md:text-5xl">{t('product.waysTitle')}</h2>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-white/50">{t('product.waysDescription')}</p>
          </motion.div>
          <motion.div {...reveal} className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-[1.5rem] border border-white/10 bg-[#0b1423] p-7 md:p-9">
              <Headphones className="h-7 w-7 text-white/70" aria-hidden="true" />
              <h3 className="mt-10 text-balance text-2xl text-white">{t('product.selfTitle')}</h3>
              <p className="mt-3 text-pretty leading-7 text-white/48">{t('product.selfText')}</p>
            </article>
            <article className="rounded-[1.5rem] border border-brand-orange/25 bg-brand-orange/[.08] p-7 md:p-9">
              <Sparkles className="h-7 w-7 text-brand-orange" aria-hidden="true" />
              <h3 className="mt-10 text-balance text-2xl text-white">{t('product.conciergeTitle')}</h3>
              <p className="mt-3 text-pretty leading-7 text-white/52">{t('product.conciergeText')}</p>
            </article>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/[.08] bg-[#0a121f] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-[1320px]">
          <motion.div {...reveal} className="text-center">
            <p className="font-label text-[11px] uppercase tracking-[.28em] text-brand-orange">{t('product.playersLabel')}</p>
            <h2 className="mt-5 text-balance font-label text-3xl tracking-[-.04em] text-white md:text-5xl">{t('product.playersTitle')}</h2>
          </motion.div>
          <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Smartphone, label: t('product.mobile') },
              { icon: Laptop, label: t('product.windows') },
              { icon: MonitorPlay, label: t('product.web') },
              { icon: CloudOff, label: t('product.offline') },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-2xl border border-white/[.08] bg-[#0b1423] p-6 text-center">
                <Icon className="mx-auto h-6 w-6 text-brand-orange" strokeWidth={1.5} aria-hidden="true" /><p className="mt-5 text-sm text-white/65">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#070d17] px-6 py-24 sm:px-10 md:py-36 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(239,166,52,.17),transparent_48%)]" aria-hidden="true" />
        <motion.div {...reveal} className="relative mx-auto max-w-4xl text-center">
          <h2 className="bg-gradient-to-r from-brand-orange via-[#c9c56f] to-[#37d5cb] bg-clip-text text-balance font-label text-[clamp(2.75rem,4vw,3.75rem)] tracking-[-.045em] text-transparent">{t('product.finalTitle')}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/50">{h('beatBreezeLead.finalDescription')}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="https://beatbreeze.io/sign-up" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-brand-orange px-8 text-sm font-semibold text-[#101010] hover:bg-[#ffb64a]">{t('product.startFree')} <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
            <Link href={`/${locale}/quotation`} className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/15 px-8 text-sm font-semibold text-white hover:bg-white/5">{t('product.talkToBMAsia')}</Link>
          </div>
        </motion.div>
      </section>
      <FloatingChatButton />
    </>
  );
}
