'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Check, Play, Sparkles } from 'lucide-react';
import { ImmersiveBeatBreeze } from '@/components/home/ImmersiveBeatBreeze';
import { ClientLogos } from '@/components/sections';
import { FloatingChatButton } from '@/components/chat/FloatingChatButton';

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

export default function Home() {
  const locale = useLocale();
  const t = useTranslations('hero');
  const h = useTranslations('homePage');

  return (
    <>
      <ImmersiveBeatBreeze />

      <ClientLogos />

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#070d17,#090f1b)] px-6 py-24 sm:px-10 md:py-36 lg:px-16">
        <div className="mx-auto max-w-[1480px]">
          <motion.div {...reveal} className="mx-auto max-w-4xl text-center">
            <p className="font-label text-[11px] uppercase tracking-[0.28em] text-brand-orange">{h('immersive.worlds.eyebrow')}</p>
            <h2 className="mt-5 text-balance font-headline text-5xl font-medium leading-[0.98] tracking-[-0.055em] text-white md:text-7xl">
              {h('immersive.worlds.title')}{' '}
              <span className="bg-gradient-to-r from-[#e8850c] via-[#d9bd61] to-[#00d4c8] bg-clip-text text-transparent">
                {h('immersive.worlds.highlight')}
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/52">{h('immersive.worlds.description')}</p>
          </motion.div>

          <div className="mt-16 grid gap-6 xl:grid-cols-[1.14fr_0.86fr]">
            <motion.article {...reveal} className="relative overflow-hidden rounded-[2rem] border border-[#e8850c]/25 bg-[#0b1423] shadow-[0_30px_90px_rgba(0,212,200,0.06)] before:absolute before:inset-x-0 before:top-0 before:z-20 before:h-0.5 before:bg-[linear-gradient(90deg,#e8850c,#e7b94e,#73cf98,#00d4c8)]">
              <div className="relative grid min-h-[430px] place-items-center overflow-hidden bg-[radial-gradient(circle_at_center,rgba(0,212,200,0.18),transparent_33%),radial-gradient(circle_at_15%_75%,rgba(232,133,12,0.24),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(115,207,152,0.11),transparent_26%),#09121f]">
                <div className="absolute aspect-square w-[560px] rounded-full border border-cyan-300/15 shadow-[0_0_0_76px_rgba(0,212,200,0.025),0_0_0_150px_rgba(232,133,12,0.025)] motion-safe:animate-pulse-slow" />
                <div className="relative z-10 flex h-48 w-48 flex-col items-center justify-center rounded-full border border-white/15 bg-[#0b1321]/80 text-center shadow-[0_0_90px_rgba(232,133,12,0.18)] backdrop-blur-xl">
                  <Sparkles className="h-6 w-6 text-brand-orange" aria-hidden="true" />
                  <strong className="mt-4 bg-gradient-to-r from-[#e8850c] via-[#e7b94e] to-[#00d4c8] bg-clip-text font-label text-xl font-medium text-transparent">Beat Breeze</strong>
                  <span className="mt-1 text-xs text-white/40">{h('immersive.worlds.bbCore')}</span>
                </div>
                {[
                  { src: '/images/covers/bossa-nova-lounge.jpg', className: 'left-[8%] top-[16%] -rotate-6' },
                  { src: '/images/covers/deep-house.jpg', className: 'right-[8%] top-[22%] rotate-6 [animation-delay:-1.6s]' },
                  { src: '/images/covers/jazz-piano.jpg', className: 'bottom-[8%] right-[23%] -rotate-3 [animation-delay:-3s]' },
                ].map((cover) => (
                  <div key={cover.src} className={`absolute h-24 w-24 overflow-hidden rounded-2xl border border-white/15 shadow-2xl motion-safe:animate-float ${cover.className}`}>
                    <Image src={cover.src} alt="" fill sizes="96px" className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="p-7 sm:p-10">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-brand-orange">{h('twoSolutions.bb.badge')}</p>
                <h3 className="mt-3 bg-gradient-to-r from-[#e8850c] via-[#e7b94e] via-[55%] to-[#00d4c8] bg-clip-text font-headline text-4xl font-medium tracking-[-0.045em] text-transparent sm:text-5xl">Beat Breeze</h3>
                <p className="mt-4 max-w-2xl text-pretty text-lg leading-8 text-white/52">{h('twoSolutions.bb.tagline')}</p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {(['feature1', 'feature3', 'feature4'] as const).map((key) => (
                    <li key={key} className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/60">{h(`twoSolutions.bb.${key}`)}</li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="https://beatbreeze.io/sign-up" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-brand-orange px-6 font-label text-sm font-semibold text-[#101010] hover:bg-[#ffb64a]">
                    {h('immersive.worlds.tryBeatBreeze')} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                  <Link href={`/${locale}/beat-breeze`} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 font-label text-sm font-semibold text-white hover:bg-white/5">
                    {h('twoSolutions.bb.cta')}
                  </Link>
                </div>
              </div>
            </motion.article>

            <motion.article {...reveal} transition={{ duration: 0.65, delay: 0.08 }} className="overflow-hidden rounded-[2rem] border border-[#d6c2ff]/40 bg-[#190d21] shadow-[0_30px_90px_rgba(214,194,255,0.08)]">
              <div className="relative min-h-[430px] overflow-hidden bg-[#d6c2ff] p-6 sm:p-8">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-black/10" aria-hidden="true" />
                <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border border-black/10" aria-hidden="true" />
                <Image
                  src="/images/brand/soundtrack/reseller-of-soundtrack-purple.svg"
                  alt="Official reseller of Soundtrack"
                  width={502}
                  height={213}
                  className="relative z-10 h-auto w-full max-w-[390px]"
                />
                <div className="relative z-10 mt-7 min-h-[225px] overflow-hidden rounded-[1.5rem] border border-black/15 bg-[#190d21] shadow-[0_24px_70px_rgba(25,13,33,0.28)]">
                  <Image src="/images/product-syb-hero.webp" alt="" fill sizes="(max-width:1280px) 100vw, 43vw" className="object-cover opacity-55 saturate-[0.76]" />
                  <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(25,13,33,0.94),rgba(25,13,33,0.35))]" />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                    <span className="font-label text-[10px] uppercase tracking-[0.18em] text-[#d6c2ff]">{h('immersive.worlds.sybDiscLabel')}</span>
                    <strong className="mt-2 block max-w-sm text-balance text-lg font-medium leading-6 text-white">{h('immersive.worlds.sybDiscText')}</strong>
                  </div>
                </div>
              </div>
              <div className="p-7 sm:p-10">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-[#c9b2ff]">{h('twoSolutions.syb.badge')}</p>
                <h3 className="mt-3 text-balance font-headline text-4xl font-medium tracking-[-0.045em] text-white sm:text-5xl">Soundtrack Your Brand</h3>
                <p className="mt-4 text-pretty text-lg leading-8 text-[#eee6ff]/58">{h('alternative.description')}</p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {(['feature1', 'feature2', 'feature3'] as const).map((key) => (
                    <li key={key} className="rounded-full border border-[#eee6ff]/15 px-3 py-2 text-xs text-[#eee6ff]/65">{h(`twoSolutions.syb.${key}`)}</li>
                  ))}
                </ul>
                <Link href={`/${locale}/quotation`} className="group mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#c9b2ff] px-6 font-label text-sm font-semibold text-[#180424] hover:bg-[#ded0ff]">
                  {h('immersive.worlds.talkSoundtrack')} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </motion.article>
          </div>

          <motion.div {...reveal} className="mt-6 flex flex-col items-start justify-between gap-5 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.2em] text-white/35">{h('immersive.worlds.compareLabel')}</p>
              <p className="mt-2 text-pretty text-lg text-white/68">{h('immersive.worlds.compareText')}</p>
            </div>
            <Link href={`/${locale}/quotation`} className="group inline-flex shrink-0 items-center gap-3 font-label text-sm font-semibold text-brand-orange">
              {h('twoSolutions.notSureCta')} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#070d17] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-[1320px]">
          <motion.div {...reveal} className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="font-label text-[11px] uppercase tracking-[0.28em] text-brand-orange">{h('industries.sectionTitle')}</p>
              <h2 className="mt-5 text-balance font-headline text-4xl font-medium tracking-[-0.045em] text-white md:text-6xl">{h('industries.sectionSubtitle')}</h2>
            </div>
            <Link href={`/${locale}/quotation`} className="group inline-flex items-center gap-3 text-sm font-semibold text-white/65 hover:text-white">
              {h('twoSolutions.notSureCta')} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <motion.div key={industry.key} {...reveal} transition={{ duration: 0.55, delay: index * 0.08 }}>
                <Link href={`/${locale}${industry.href}`} className="group relative block min-h-[460px] overflow-hidden rounded-[1.5rem] border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-4 focus:ring-offset-[#070d17]">
                  <Image src={industry.image} alt={h(`industries.${industry.key}.title`)} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" sizes="(max-width: 1024px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070d17] via-[#070d17]/45 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
                    <p className="font-label text-[10px] uppercase tracking-[0.22em] text-brand-orange">0{index + 1}</p>
                    <h3 className="mt-3 text-balance font-headline text-3xl font-medium text-white">{h(`industries.${industry.key}.title`)}</h3>
                    <p className="mt-3 max-w-sm text-pretty leading-7 text-white/60">{h(`industries.${industry.key}.desc`)}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="start" className="relative overflow-hidden border-t border-white/[0.08] bg-[#09111d] px-6 py-24 sm:px-10 md:py-36 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_100%,rgba(232,133,12,0.18),transparent_40%),radial-gradient(circle_at_75%_100%,rgba(0,212,200,0.11),transparent_42%)]" aria-hidden="true" />
        <motion.div {...reveal} className="relative mx-auto max-w-4xl text-center">
          <Play className="mx-auto h-9 w-9 text-brand-orange" strokeWidth={1.5} aria-hidden="true" />
          <h2 className="mt-7 text-balance font-headline text-5xl font-medium leading-[1.02] tracking-[-0.05em] text-white md:text-7xl">
            {h('finalCta.title')}{' '}
            <span className="bg-gradient-to-r from-brand-orange via-[#d9bd61] to-[#42d6ca] bg-clip-text text-transparent">{h('finalCta.titleHighlight')}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/50">{h('beatBreezeLead.finalDescription')}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="https://beatbreeze.io/sign-up" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-brand-orange px-8 font-label text-sm font-semibold text-[#101010] hover:bg-[#ffb64a]">
              {t('ctaQuote')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link href={`/${locale}/quotation`} className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/15 px-8 font-label text-sm font-semibold text-white hover:bg-white/5">
              {h('finalCta.ctaDemo')}
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/38">
            {[h('beatBreezeLead.proof1'), h('beatBreezeLead.proof2'), h('beatBreezeLead.proof3')].map((item) => (
              <span key={item} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-brand-orange" aria-hidden="true" />{item}</span>
            ))}
          </div>
        </motion.div>
      </section>

      <FloatingChatButton />
    </>
  );
}
