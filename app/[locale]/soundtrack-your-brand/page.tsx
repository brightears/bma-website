'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowRight,
  CalendarDays,
  Check,
  CloudSun,
  Disc3,
  Headphones,
  Languages,
  Layers3,
  MoonStar,
  Network,
  Play,
  RefreshCw,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { EXTERNAL_LINKS } from '@/lib/external-links';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.62 },
};

const covers = [
  '/images/covers/nu-disco-vocal.jpg',
  '/images/covers/jazz-piano.jpg',
  '/images/covers/deep-house.jpg',
  '/images/covers/pop-mid-tempo.jpg',
  '/images/covers/french-cafe.jpg',
  '/images/covers/bossa-nova-lounge.jpg',
] as const;

export default function SoundtrackPage() {
  const locale = useLocale();
  const t = useTranslations('soundtrackPage');

  return (
    <div className="overflow-hidden bg-[#160b1f] text-white">
      <section className="bma-grain relative isolate min-h-[100dvh] overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:flex lg:items-center lg:px-16">
        <Image src="/images/product-syb-hero.webp" alt="" fill priority className="-z-30 object-cover opacity-[0.22] saturate-[0.7]" sizes="100vw" aria-hidden="true" />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(100deg,#160b1f_0%,rgba(22,11,31,.97)_48%,rgba(22,11,31,.68)_100%)]" />
        <div className="absolute -right-48 top-10 -z-10 h-[44rem] w-[44rem] rounded-full border border-[#d6c2ff]/10 shadow-[0_0_0_110px_rgba(214,194,255,.025),0_0_0_220px_rgba(214,194,255,.015)]" />

        <div className="bma-container grid gap-14 lg:grid-cols-[0.84fr_1.16fr] lg:items-center lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }}>
            <Image src="/images/brand/soundtrack/soundtrack-logo-white.svg" alt="Soundtrack" width={502} height={147} className="h-auto w-48 sm:w-56" priority />
            <p className="mt-8 font-label text-[11px] font-semibold uppercase tracking-[.25em] text-[#d6c2ff]">{t('redesign.hero.eyebrow')}</p>
            <h1 className="mt-5 max-w-3xl font-headline text-[clamp(3.7rem,7vw,7.4rem)] font-medium leading-[.94] tracking-[-.058em]">
              {t('redesign.hero.title')} <span className="text-[#d6c2ff]">{t('redesign.hero.highlight')}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#f1eaff]/60 sm:text-xl">{t('redesign.hero.description')}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={`/${locale}/soundtrack-trial?source=soundtrack-hero`} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#d6c2ff] px-7 font-label text-sm font-semibold text-[#1b0b25] transition hover:-translate-y-0.5 hover:bg-white">
                {t('redesign.hero.trial')} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={`/${locale}/quotation?solution=soundtrack-your-brand&source=soundtrack-hero`} className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#d6c2ff]/25 bg-[#d6c2ff]/[0.04] px-7 font-label text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#d6c2ff]/[0.09]">
                {t('redesign.hero.talk')}
              </Link>
            </div>
            <p className="mt-6 max-w-xl text-xs leading-5 text-[#f1eaff]/38">{t('redesign.hero.note')}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .75, delay: .14 }} className="relative">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
              {covers.map((cover, index) => (
                <div key={cover} className={`group relative aspect-square overflow-hidden rounded-[1.25rem] border border-[#d6c2ff]/18 shadow-[0_22px_55px_rgba(0,0,0,.35)] ${index === 0 ? 'col-span-2 row-span-2' : index === 5 ? 'hidden sm:block' : ''}`}>
                  <Image src={cover} alt="" fill className="object-cover opacity-85 transition duration-700 group-hover:scale-105" sizes="(max-width:768px) 30vw, 180px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160b1f]/75 to-transparent" />
                  {index === 0 && <div className="absolute inset-x-0 bottom-0 p-5"><span className="font-label text-[9px] uppercase tracking-[.18em] text-[#d6c2ff]">{t('redesign.catalogue.nowPlaying')}</span><strong className="mt-2 block text-lg">{t('redesign.catalogue.featured')}</strong><button type="button" className="mt-4 grid h-10 w-10 place-items-center rounded-full bg-[#d6c2ff] text-[#160b1f]"><Play className="h-4 w-4 fill-current" /><span className="sr-only">{t('redesign.catalogue.preview')}</span></button></div>}
                </div>
              ))}
              <div className="col-span-2 flex min-h-24 items-center justify-between rounded-[1.25rem] border border-[#d6c2ff]/18 bg-[#d6c2ff]/[0.06] px-5 sm:col-span-3">
                <div><span className="font-label text-[9px] uppercase tracking-[.18em] text-[#d6c2ff]">{t('redesign.catalogue.label')}</span><strong className="mt-2 block text-sm sm:text-base">{t('redesign.catalogue.line')}</strong></div>
                <Disc3 className="h-7 w-7 text-[#d6c2ff] motion-safe:animate-[spin_8s_linear_infinite]" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[#d6c2ff]/12 bg-[#d6c2ff] px-5 py-8 text-[#1a0a24] sm:px-8 lg:px-16">
        <div className="bma-container grid gap-5 sm:grid-cols-3">
          {(['catalogue', 'musicDesign', 'service'] as const).map((key, index) => (
            <motion.div key={key} {...reveal} className="flex items-start gap-4 border-black/12 py-3 sm:border-r sm:pr-6 sm:last:border-r-0">
              <span className="font-mono text-xs text-[#5f3b89]">0{index + 1}</span>
              <div><strong className="block text-sm font-semibold">{t(`redesign.pillars.${key}.title`)}</strong><p className="mt-1 text-xs leading-5 text-[#1a0a24]/58">{t(`redesign.pillars.${key}.text`)}</p></div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bma-section bg-[#160b1f]">
        <div className="bma-container grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
          <motion.div {...reveal} className="lg:sticky lg:top-32">
            <p className="font-label text-[11px] uppercase tracking-[.25em] text-[#d6c2ff]">{t('redesign.direction.eyebrow')}</p>
            <h2 className="mt-5 font-headline text-5xl font-medium leading-[.98] tracking-[-.05em] sm:text-6xl">{t('redesign.direction.title')}</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#f1eaff]/52">{t('redesign.direction.description')}</p>
            <div className="mt-8 rounded-2xl border border-[#d6c2ff]/16 bg-[#d6c2ff]/[0.045] p-5"><p className="text-sm font-medium">{t('redesign.direction.refreshTitle')}</p><p className="mt-2 text-sm leading-6 text-[#f1eaff]/46">{t('redesign.direction.refreshText')}</p></div>
          </motion.div>

          <div className="relative">
            <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-[#d6c2ff] via-[#8c66bf] to-transparent sm:left-[7.25rem]" />
            {(['listen', 'design', 'schedule', 'refresh'] as const).map((key, index) => (
              <motion.article key={key} {...reveal} className="relative grid grid-cols-[2.6rem_1fr] gap-5 pb-9 sm:grid-cols-[8rem_1fr]">
                <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-[#d6c2ff]/28 bg-[#160b1f] font-mono text-xs text-[#d6c2ff] sm:ml-[5.25rem]">0{index + 1}</span>
                <div className="rounded-[1.5rem] border border-[#d6c2ff]/13 bg-[#d6c2ff]/[0.035] p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-6"><div><p className="font-label text-[9px] uppercase tracking-[.18em] text-[#d6c2ff]">{t(`redesign.direction.${key}.label`)}</p><h3 className="mt-3 text-2xl font-medium">{t(`redesign.direction.${key}.title`)}</h3></div>{index === 0 ? <Headphones className="h-6 w-6 text-[#d6c2ff]" /> : index === 1 ? <Sparkles className="h-6 w-6 text-[#d6c2ff]" /> : index === 2 ? <CalendarDays className="h-6 w-6 text-[#d6c2ff]" /> : <RefreshCw className="h-6 w-6 text-[#d6c2ff]" />}</div>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-[#f1eaff]/46">{t(`redesign.direction.${key}.text`)}</p>
                  {index === 1 && <div className="mt-6 flex -space-x-3">{covers.slice(0, 4).map((cover) => <span key={cover} className="relative h-12 w-12 overflow-hidden rounded-xl border-2 border-[#24112f]"><Image src={cover} alt="" fill className="object-cover" sizes="48px" /></span>)}</div>}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bma-grain bma-section border-y border-[#d6c2ff]/12 bg-[#1d0e28]">
        <div className="bma-container">
          <motion.div {...reveal} className="grid gap-8 lg:grid-cols-[.66fr_1fr] lg:items-end">
            <div><p className="font-label text-[11px] uppercase tracking-[.25em] text-[#d6c2ff]">{t('redesign.extensions.eyebrow')}</p><h2 className="mt-5 font-headline text-5xl font-medium leading-[.98] tracking-[-.05em] sm:text-6xl lg:text-7xl">{t('redesign.extensions.title')}</h2></div>
            <div><p className="max-w-2xl text-lg leading-8 text-[#f1eaff]/52">{t('redesign.extensions.description')}</p><p className="mt-4 max-w-2xl text-xs leading-5 text-[#d6c2ff]/52">{t('redesign.extensions.scope')}</p></div>
          </motion.div>

          <div className="mt-14 overflow-hidden rounded-[2rem] border border-[#d6c2ff]/16 bg-[#13091b] shadow-[0_38px_110px_rgba(0,0,0,.35)]">
            <div className="grid border-b border-[#d6c2ff]/12 md:grid-cols-[.38fr_1fr]">
              <div className="border-b border-[#d6c2ff]/12 p-6 md:border-b-0 md:border-r md:p-8">
                <Image src="/images/brand/soundtrack/soundtrack-logo-white.svg" alt="Soundtrack" width={502} height={147} className="h-auto w-40 opacity-80" />
                <div className="mt-9"><p className="font-label text-[9px] uppercase tracking-[.18em] text-[#d6c2ff]">{t('redesign.extensions.location')}</p><strong className="mt-2 block">{t('redesign.extensions.venue')}</strong></div>
                <div className="mt-6 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-300/[0.08] text-emerald-200"><Check className="h-4 w-4" /></span><p className="text-xs leading-5 text-[#f1eaff]/46">{t('redesign.extensions.connected')}</p></div>
              </div>
              <div className="grid sm:grid-cols-2">
                {[
                  [MoonStar, 'prayer', '18:42'],
                  [Volume2, 'volume', '-8 dB'],
                  [CloudSun, 'weather', 'Warm / rain'],
                  [Network, 'api', 'Ready'],
                ].map(([Icon, key, value]) => { const ExtensionIcon = Icon as typeof MoonStar; return <div key={key as string} className="border-b border-[#d6c2ff]/10 p-6 last:border-b-0 sm:border-r sm:p-8 sm:even:border-r-0"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#d6c2ff]/[0.07] text-[#d6c2ff]"><ExtensionIcon className="h-5 w-5" /></span><span className="font-mono text-xs text-[#d6c2ff]">{value as string}</span></div><h3 className="mt-7 text-lg font-medium">{t(`redesign.extensions.${key as string}.title`)}</h3><p className="mt-3 text-sm leading-6 text-[#f1eaff]/43">{t(`redesign.extensions.${key as string}.text`)}</p></div>; })}
              </div>
            </div>
            <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8"><p className="text-xs text-[#f1eaff]/38">{t('redesign.extensions.footer')}</p><span className="font-label text-[9px] uppercase tracking-[.18em] text-[#d6c2ff]">BMAsia service layer</span></div>
          </div>
        </div>
      </section>

      <section className="bma-section bg-[#160b1f]">
        <div className="bma-container grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
          <motion.div {...reveal}>
            <p className="font-label text-[11px] uppercase tracking-[.25em] text-[#d6c2ff]">{t('redesign.operations.eyebrow')}</p>
            <h2 className="mt-5 font-headline text-5xl font-medium leading-[.98] tracking-[-.05em] sm:text-6xl">{t('redesign.operations.title')}</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#f1eaff]/52">{t('redesign.operations.description')}</p>
            <Link href={`/${locale}/quotation?solution=soundtrack-your-brand&source=soundtrack-service`} className="mt-8 inline-flex items-center gap-2 font-label text-sm font-semibold text-[#d6c2ff] hover:text-white">{t('redesign.operations.cta')} <ArrowRight className="h-4 w-4" /></Link>
          </motion.div>
          <motion.div {...reveal} className="grid gap-px overflow-hidden rounded-[1.6rem] border border-[#d6c2ff]/12 bg-[#d6c2ff]/12 sm:grid-cols-2">
            {[
              [Layers3, 'onboarding'],
              [SlidersHorizontal, 'design'],
              [Languages, 'regional'],
              [Headphones, 'support'],
            ].map(([Icon, key], index) => { const ServiceIcon = Icon as typeof Layers3; return <div key={key as string} className="bg-[#1a0d24] p-6 sm:p-8"><span className="flex items-center justify-between"><ServiceIcon className="h-5 w-5 text-[#d6c2ff]" /><small className="font-mono text-[10px] text-[#d6c2ff]/50">0{index + 1}</small></span><h3 className="mt-10 text-xl font-medium">{t(`redesign.operations.${key as string}.title`)}</h3><p className="mt-3 text-sm leading-6 text-[#f1eaff]/43">{t(`redesign.operations.${key as string}.text`)}</p></div>; })}
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[#d6c2ff]/12 bg-[#1d0e28] px-5 py-16 sm:px-8 lg:px-16">
        <div className="bma-container grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
          <motion.div {...reveal}><p className="font-label text-[11px] uppercase tracking-[.25em] text-[#d6c2ff]">{t('redesign.licensing.eyebrow')}</p><h2 className="mt-5 font-headline text-4xl font-medium tracking-[-.045em] sm:text-5xl">{t('redesign.licensing.title')}</h2><p className="mt-5 max-w-xl text-sm leading-6 text-[#f1eaff]/46">{t('redesign.licensing.description')}</p></motion.div>
          <motion.div {...reveal} className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#d6c2ff]/16 bg-[#d6c2ff]/[0.045] p-6"><p className="font-label text-[10px] uppercase tracking-[.18em] text-[#d6c2ff]">{t('redesign.licensing.included')}</p><ul className="mt-5 space-y-3 text-sm text-[#f1eaff]/58"><li className="flex gap-2"><Check className="h-4 w-4 text-[#d6c2ff]" />{t('redesign.licensing.recording')}</li><li className="flex gap-2"><Check className="h-4 w-4 text-[#d6c2ff]" />{t('redesign.licensing.publishing')}</li><li className="flex gap-2"><Check className="h-4 w-4 text-[#d6c2ff]" />{t('redesign.licensing.commercial')}</li></ul></div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6"><p className="font-label text-[10px] uppercase tracking-[.18em] text-white/38">{t('redesign.licensing.local')}</p><p className="mt-5 text-sm leading-6 text-[#f1eaff]/48">{t('redesign.licensing.localText')}</p></div>
          </motion.div>
        </div>
      </section>

      <section className="bma-grain relative overflow-hidden px-5 py-24 text-center sm:px-8 md:py-36 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(214,194,255,.17),transparent_48%)]" />
        <motion.div {...reveal} className="relative mx-auto max-w-4xl">
          <Image src="/images/brand/soundtrack/soundtrack-logo-white.svg" alt="Soundtrack" width={502} height={147} className="mx-auto h-auto w-44 opacity-72" />
          <h2 className="mt-9 font-headline text-5xl font-medium leading-[.98] tracking-[-.05em] sm:text-7xl">{t('redesign.final.title')} <span className="text-[#d6c2ff]">{t('redesign.final.highlight')}</span></h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#f1eaff]/52">{t('redesign.final.description')}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={`/${locale}/soundtrack-trial?source=soundtrack-final`} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#d6c2ff] px-8 font-label text-sm font-semibold text-[#1b0b25] hover:bg-white">{t('redesign.hero.trial')} <ArrowRight className="h-4 w-4" /></Link>
            <a href={EXTERNAL_LINKS.soundtrackLogin} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#d6c2ff]/24 px-8 font-label text-sm font-semibold text-white hover:bg-[#d6c2ff]/[0.06]">{t('redesign.final.login')} <Smartphone className="h-4 w-4" /></a>
          </div>
          <p className="mt-6 text-xs text-[#f1eaff]/34">{t('redesign.final.support')}</p>
        </motion.div>
      </section>
    </div>
  );
}
