'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowRight,
  Check,
  CloudSun,
  ImageIcon,
  Laptop,
  MessageSquareText,
  MonitorPlay,
  MoonStar,
  Music2,
  Pause,
  PhoneCall,
  Play,
  Radio,
  SlidersHorizontal,
  Sparkles,
  Smartphone,
  Volume2,
  WandSparkles,
  Workflow,
} from 'lucide-react';
import { FloatingChatButton } from '@/components/chat/FloatingChatButton';
import { EXTERNAL_LINKS, withAttribution } from '@/lib/external-links';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.62 },
};

const conciergeScenarios = ['arrival', 'campaign', 'recovery'] as const;

export default function BeatBreezePage() {
  const locale = useLocale();
  const t = useTranslations('beatBreezePage');
  const [scenario, setScenario] = useState<(typeof conciergeScenarios)[number]>('arrival');

  const signup = withAttribution(EXTERNAL_LINKS.beatBreezeSignup, 'beat_breeze_product', 'hero_trial');

  return (
    <div className="overflow-hidden bg-[#06111a] text-white">
      <section className="bma-grain relative isolate min-h-[100dvh] overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:flex lg:items-center lg:px-16">
        <Image src="/images/product-bb-hero.webp" alt="" fill priority className="-z-30 object-cover opacity-[0.11]" sizes="100vw" aria-hidden="true" />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(105deg,#06111a_0%,rgba(6,17,26,.96)_47%,rgba(6,17,26,.72)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_30%,rgba(52,211,199,.14),transparent_27%),radial-gradient(circle_at_16%_28%,rgba(239,166,52,.18),transparent_28%)]" />

        <div className="bma-container grid gap-14 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/20 bg-brand-orange/[0.07] px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.2em] text-brand-orange">
              <span className="h-1.5 w-1.5 rounded-full bg-[#49d5c5] shadow-[0_0_12px_#49d5c5]" /> Beat Breeze
            </div>
            <p className="bma-kicker mt-7">{t('redesign.hero.eyebrow')}</p>
            <h1 className="bma-display mt-5 max-w-3xl text-[clamp(3.7rem,7.2vw,7.7rem)]">
              {t('redesign.hero.title')} <span className="bg-gradient-to-r from-brand-orange via-[#e4ca68] to-[#49d5c5] bg-clip-text text-transparent">{t('redesign.hero.highlight')}</span>
            </h1>
            <p className="bma-lede mt-7 max-w-2xl text-lg sm:text-xl">{t('redesign.hero.description')}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={signup} className="bma-button-primary min-h-14 px-7">{t('redesign.hero.trial')} <ArrowRight className="h-4 w-4" /></a>
              <Link href={`/${locale}/quotation?solution=beat-breeze&source=product-hero`} className="bma-button-secondary min-h-14 px-7">{t('redesign.hero.talk')}</Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/46">
              {(['proof1', 'proof2', 'proof3'] as const).map((key) => <span key={key} className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-brand-orange" />{t(`redesign.hero.${key}`)}</span>)}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .75, delay: .14 }} className="relative">
            <div className="absolute -inset-12 rounded-full bg-[#49d5c5]/[0.06] blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#081622]/90 shadow-[0_42px_120px_rgba(0,0,0,.48)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-7 sm:py-5">
                <div><p className="font-label text-[10px] uppercase tracking-[.2em] text-white/36">{t('redesign.controlRoom.label')}</p><p className="mt-1 text-sm font-semibold">{t('redesign.controlRoom.venue')}</p></div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] px-3 py-1.5 text-xs text-emerald-200"><i className="h-1.5 w-1.5 rounded-full bg-emerald-300" />{t('redesign.controlRoom.live')}</span>
              </div>

              <div className="grid border-b border-white/[0.08] sm:grid-cols-4">
                {[
                  [CloudSun, 'weather', '29°C'],
                  [MoonStar, 'prayer', '18:42'],
                  [Volume2, 'volume', '-8 dB'],
                  [Workflow, 'schedule', 'Evening'],
                ].map(([Icon, key, value]) => {
                  const ControlIcon = Icon as typeof CloudSun;
                  return <div key={key as string} className="border-b border-white/[0.07] p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"><ControlIcon className="h-4 w-4 text-brand-orange" /><p className="mt-4 font-label text-[9px] uppercase tracking-[.16em] text-white/30">{t(`redesign.controlRoom.${key as string}`)}</p><strong className="mt-1 block text-sm font-medium text-white/82">{value as string}</strong></div>;
                })}
              </div>

              <div className="relative p-5 sm:p-7">
                <div className="absolute inset-y-8 left-[2.15rem] w-px bg-gradient-to-b from-brand-orange via-[#49d5c5] to-transparent sm:left-[2.65rem]" aria-hidden="true" />
                <div className="space-y-3">
                  {[
                    ['18:30', 'lobby', 'Bossa Nova Lounge', '72%'],
                    ['18:34', 'restaurant', 'Italian Lounge', '68%'],
                    ['19:00', 'rooftop', 'Deep House', '84%'],
                  ].map(([time, key, playlist, energy], index) => (
                    <div key={key} className="relative grid grid-cols-[2.9rem_1fr_auto] items-center gap-3 rounded-2xl border border-white/[0.075] bg-white/[0.03] p-3.5 sm:grid-cols-[3.5rem_1fr_auto] sm:p-4">
                      <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-[#081622] font-mono text-[9px] text-brand-orange">{time}</span>
                      <div><p className="text-sm font-medium">{t(`redesign.controlRoom.${key}`)}</p><p className="mt-1 text-xs text-white/40">{playlist}</p></div>
                      <div className="hidden text-right sm:block"><p className="font-mono text-xs text-[#49d5c5]">{energy}</p><p className="mt-1 text-[9px] uppercase tracking-[.16em] text-white/25">{t('redesign.controlRoom.energy')}</p></div>
                      {index === 1 && <span className="absolute -right-1 -top-2 rounded-md bg-brand-orange px-2 py-1 font-label text-[8px] uppercase tracking-[.12em] text-[#101417]">{t('redesign.controlRoom.updated')}</span>}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-brand-orange/18 bg-brand-orange/[0.065] p-4">
                  <Sparkles className="h-5 w-5 shrink-0 text-brand-orange" />
                  <p className="text-xs leading-5 text-white/56">{t('redesign.controlRoom.note')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bma-section border-y border-white/[0.08] bg-[#081521]">
        <div className="bma-container">
          <motion.div {...reveal} className="grid gap-8 lg:grid-cols-[0.62fr_1fr] lg:items-end">
            <div><p className="bma-kicker">{t('redesign.day.eyebrow')}</p><h2 className="bma-display mt-5 text-5xl sm:text-6xl lg:text-7xl">{t('redesign.day.title')}</h2></div>
            <p className="bma-lede lg:justify-self-end">{t('redesign.day.description')}</p>
          </motion.div>

          <div className="relative mt-16">
            <div className="absolute left-5 top-0 h-full w-px bg-[linear-gradient(#efa634,#49d5c5,rgba(73,213,197,.08))] sm:left-20 lg:left-1/2" aria-hidden="true" />
            {(['morning', 'weather', 'prayer', 'evening'] as const).map((key, index) => (
              <motion.article key={key} {...reveal} className={`relative grid min-h-[15rem] grid-cols-[3rem_1fr] gap-5 pb-10 sm:grid-cols-[8rem_1fr] lg:grid-cols-2 lg:gap-16 ${index % 2 ? '' : 'lg:text-right'}`}>
                <div className={`hidden lg:block ${index % 2 ? 'lg:order-2' : ''}`}>
                  <p className="font-mono text-sm text-brand-orange">{t(`redesign.day.${key}.time`)}</p>
                  <h3 className="mt-4 font-headline text-3xl font-medium">{t(`redesign.day.${key}.title`)}</h3>
                  <p className={`mt-4 text-base leading-7 text-white/48 ${index % 2 ? 'max-w-lg' : 'ml-auto max-w-lg'}`}>{t(`redesign.day.${key}.text`)}</p>
                </div>
                <span className="relative z-10 mt-1 grid h-10 w-10 place-items-center rounded-full border border-brand-orange/35 bg-[#081521] font-mono text-xs text-brand-orange sm:ml-[3.75rem] lg:absolute lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">0{index + 1}</span>
                <div className={`lg:hidden ${index % 2 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <p className="font-mono text-sm text-brand-orange">{t(`redesign.day.${key}.time`)}</p>
                  <h3 className="mt-3 font-headline text-2xl font-medium">{t(`redesign.day.${key}.title`)}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/48">{t(`redesign.day.${key}.text`)}</p>
                </div>
                <div className={`hidden lg:block ${index % 2 ? 'lg:order-1' : 'lg:order-2'}`} aria-hidden="true">
                  <SignalScene variant={index} />
                </div>
              </motion.article>
            ))}
          </div>
          <p className="mx-auto mt-4 max-w-3xl rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 py-4 text-center text-xs leading-5 text-white/42">{t('redesign.day.volumeNote')}</p>
        </div>
      </section>

      <section className="bma-grain bma-section relative bg-[#06111a]">
        <div className="bma-container grid gap-12 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
          <motion.div {...reveal} className="lg:sticky lg:top-32">
            <p className="bma-kicker">{t('redesign.concierge.eyebrow')}</p>
            <h2 className="bma-display mt-5 text-5xl sm:text-6xl">{t('redesign.concierge.title')}</h2>
            <p className="bma-lede mt-6">{t('redesign.concierge.description')}</p>
            <div className="mt-8 space-y-2">
              {conciergeScenarios.map((key) => (
                <button key={key} type="button" onClick={() => setScenario(key)} aria-pressed={scenario === key} className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${scenario === key ? 'border-brand-orange/35 bg-brand-orange/[0.08] text-white' : 'border-white/[0.08] bg-white/[0.02] text-white/52 hover:bg-white/[0.04]'}`}>
                  <span><small className="block font-label text-[9px] uppercase tracking-[.18em] text-brand-orange">{t(`redesign.concierge.${key}.label`)}</small><strong className="mt-1 block text-sm font-medium">{t(`redesign.concierge.${key}.prompt`)}</strong></span>
                  <ArrowRight className={`h-4 w-4 transition-transform ${scenario === key ? 'translate-x-0 text-brand-orange' : '-translate-x-1 text-white/22'}`} />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div {...reveal} className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#091722] shadow-[0_34px_100px_rgba(0,0,0,.3)]">
            <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-7"><p className="font-label text-[10px] uppercase tracking-[.2em] text-white/32">Music Concierge</p><span className="inline-flex items-center gap-2 text-xs text-emerald-200"><i className="h-1.5 w-1.5 rounded-full bg-emerald-300" />{t('redesign.concierge.ready')}</span></div>
            <div className="p-5 sm:p-8">
              <div className="ml-auto max-w-[85%] rounded-[1.4rem_1.4rem_.35rem_1.4rem] bg-brand-orange px-5 py-4 text-sm leading-6 text-[#111820] shadow-[0_18px_50px_rgba(239,166,52,.12)]">
                {t(`redesign.concierge.${scenario}.request`)}
              </div>
              <div className="mt-6 grid gap-5 rounded-[1.5rem_1.5rem_1.5rem_.35rem] border border-white/[0.08] bg-white/[0.03] p-5 sm:grid-cols-[7rem_1fr] sm:p-6">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image src={scenario === 'arrival' ? '/images/covers/bossa-nova-lounge.jpg' : scenario === 'campaign' ? '/images/covers/nu-disco-vocal.jpg' : '/images/covers/balinese-spa.jpg'} alt="" fill className="object-cover" sizes="112px" />
                  <span className="absolute inset-0 grid place-items-center bg-black/18"><Play className="h-7 w-7 fill-white text-white" /></span>
                </div>
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[.18em] text-[#49d5c5]">{t('redesign.concierge.recommendation')}</p>
                  <h3 className="mt-2 text-xl font-medium">{t(`redesign.concierge.${scenario}.result`)}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/48">{t(`redesign.concierge.${scenario}.reason`)}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {[t('redesign.concierge.preview'), t('redesign.concierge.schedule'), t('redesign.concierge.keepBrowsing')].map((label, index) => <button key={label} type="button" className={`rounded-full px-4 py-2 text-xs font-semibold ${index === 1 ? 'bg-brand-orange text-[#111820]' : 'border border-white/12 text-white/62 hover:bg-white/[0.05]'}`}>{label}</button>)}
                  </div>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-4">
                {(['ask', 'recommend', 'review', 'play'] as const).map((key, index) => <div key={key} className="rounded-xl border border-white/[0.07] p-3"><span className="font-mono text-[10px] text-brand-orange">0{index + 1}</span><p className="mt-2 text-xs font-medium text-white/68">{t(`redesign.concierge.steps.${key}`)}</p></div>)}
              </div>
            </div>
            <div className="border-t border-white/[0.08] bg-brand-orange/[0.045] px-5 py-4 sm:px-8"><p className="flex items-start gap-3 text-xs leading-5 text-white/48"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />{t('redesign.concierge.control')}</p></div>
          </motion.div>
        </div>
      </section>

      <section className="bma-section border-y border-white/[0.08] bg-[#081521]">
        <div className="bma-container">
          <motion.div {...reveal} className="max-w-4xl">
            <p className="bma-kicker">{t('redesign.media.eyebrow')}</p>
            <h2 className="bma-display mt-5 text-5xl sm:text-6xl lg:text-7xl">{t('redesign.media.title')}</h2>
            <p className="bma-lede mt-6">{t('redesign.media.description')}</p>
          </motion.div>

          <div className="mt-14 grid auto-rows-[minmax(13rem,auto)] gap-4 lg:grid-cols-12">
            <MediaChapter className="lg:col-span-7 lg:row-span-2" icon={MonitorPlay} label={t('redesign.media.screens.label')} title={t('redesign.media.screens.title')} text={t('redesign.media.screens.text')} visual="screens" />
            <MediaChapter className="lg:col-span-5" icon={ImageIcon} label={t('redesign.media.create.label')} title={t('redesign.media.create.title')} text={t('redesign.media.create.text')} visual="create" />
            <MediaChapter className="lg:col-span-5" icon={MessageSquareText} label={t('redesign.media.messages.label')} title={t('redesign.media.messages.title')} text={t('redesign.media.messages.text')} visual="messages" />
            <MediaChapter className="lg:col-span-4" icon={Radio} label={t('redesign.media.soundscapes.label')} title={t('redesign.media.soundscapes.title')} text={t('redesign.media.soundscapes.text')} />
            <MediaChapter className="lg:col-span-4" icon={PhoneCall} label={t('redesign.media.phone.label')} title={t('redesign.media.phone.title')} text={t('redesign.media.phone.text')} />
            <MediaChapter className="lg:col-span-4" icon={WandSparkles} label={t('redesign.media.catalogue.label')} title={t('redesign.media.catalogue.title')} text={t('redesign.media.catalogue.text')} />
          </div>
        </div>
      </section>

      <section className="bma-section bg-[#06111a]">
        <div className="bma-container grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <motion.div {...reveal}>
            <p className="bma-kicker">{t('redesign.connections.eyebrow')}</p>
            <h2 className="bma-display mt-5 text-5xl sm:text-6xl">{t('redesign.connections.title')}</h2>
            <p className="bma-lede mt-6">{t('redesign.connections.description')}</p>
          </motion.div>
          <div className="relative">
            <div className="absolute bottom-0 left-5 top-0 w-px bg-white/[0.09] sm:left-[7.5rem]" />
            {(['schedules', 'weather', 'prayer', 'volume', 'api'] as const).map((key, index) => (
              <motion.div key={key} {...reveal} className="relative grid grid-cols-[2.6rem_1fr] gap-5 pb-9 sm:grid-cols-[8rem_1fr]">
                <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-[#06111a] font-mono text-xs text-brand-orange sm:ml-[5.5rem]">0{index + 1}</span>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6"><h3 className="text-lg font-medium">{t(`redesign.connections.${key}.title`)}</h3><p className="mt-3 text-sm leading-6 text-white/46">{t(`redesign.connections.${key}.text`)}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-[#081521] px-5 py-16 sm:px-8 lg:px-16">
        <div className="bma-container grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <motion.div {...reveal}><p className="bma-kicker">{t('product.playersLabel')}</p><h2 className="bma-display mt-5 text-4xl sm:text-5xl">{t('product.playersTitle')}</h2></motion.div>
          <motion.div {...reveal} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[[Smartphone, t('product.mobile')], [Laptop, t('product.windows')], [MonitorPlay, t('product.web')], [Music2, t('product.offline')]].map(([Icon, label]) => { const DeviceIcon = Icon as typeof Smartphone; return <div key={label as string} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"><DeviceIcon className="h-5 w-5 text-brand-orange" /><p className="mt-6 text-sm text-white/64">{label as string}</p></div>; })}
          </motion.div>
        </div>
      </section>

      <section className="bma-grain relative overflow-hidden px-5 py-24 text-center sm:px-8 md:py-36 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(239,166,52,.19),transparent_46%),radial-gradient(circle_at_75%_0,rgba(73,213,197,.08),transparent_32%)]" />
        <motion.div {...reveal} className="relative mx-auto max-w-4xl">
          <h2 className="bma-display bg-gradient-to-r from-brand-orange via-[#e6cf74] to-[#49d5c5] bg-clip-text text-5xl text-transparent sm:text-7xl">{t('redesign.final.title')}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/52">{t('redesign.final.description')}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={withAttribution(EXTERNAL_LINKS.beatBreezeSignup, 'beat_breeze_product', 'final_trial')} className="bma-button-primary min-h-14 px-8">{t('redesign.hero.trial')} <ArrowRight className="h-4 w-4" /></a>
            <Link href={`/${locale}/quotation?solution=beat-breeze&source=product-final`} className="bma-button-secondary min-h-14 px-8">{t('redesign.hero.talk')}</Link>
          </div>
          <p className="mt-6 text-xs text-white/34">{t('redesign.final.support')}</p>
        </motion.div>
      </section>

      <FloatingChatButton />
    </div>
  );
}

function SignalScene({ variant }: { variant: number }) {
  return (
    <div className="ml-auto max-w-md rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 text-left">
      <div className="flex items-center justify-between"><span className="font-mono text-[10px] text-white/30">SIGNAL / 0{variant + 1}</span><i className="h-1.5 w-1.5 rounded-full bg-emerald-300" /></div>
      <div className="mt-5 flex h-14 items-end gap-1.5">{[28, 52, 38, 72, 44, 82, 57, 68, 34, 62, 46, 76].map((height, index) => <i key={index} className="w-full rounded-full bg-gradient-to-t from-brand-orange/30 to-[#49d5c5]" style={{ height: `${Math.max(18, height - variant * 4)}%` }} />)}</div>
    </div>
  );
}

function MediaChapter({ className = '', icon: Icon, label, title, text, visual }: { className?: string; icon: typeof Music2; label: string; title: string; text: string; visual?: 'screens' | 'create' | 'messages' }) {
  return (
    <motion.article {...reveal} className={`group relative overflow-hidden rounded-[1.6rem] border border-white/[0.09] bg-[#0a1825] p-6 sm:p-8 ${className}`}>
      {visual === 'screens' && <div className="absolute inset-x-0 top-0 h-2/5 bg-[radial-gradient(circle_at_70%_10%,rgba(73,213,197,.16),transparent_38%)]" />}
      <div className="relative flex h-full flex-col">
        <span className="grid h-11 w-11 place-items-center rounded-2xl border border-brand-orange/20 bg-brand-orange/[0.07] text-brand-orange"><Icon className="h-5 w-5" /></span>
        <p className="mt-8 font-label text-[10px] uppercase tracking-[.2em] text-brand-orange">{label}</p>
        <h3 className="mt-3 max-w-lg text-2xl font-medium sm:text-3xl">{title}</h3>
        <p className="mt-4 max-w-xl text-sm leading-6 text-white/46">{text}</p>
        {visual === 'screens' && <div className="mt-10 grid flex-1 grid-cols-[1fr_.42fr] gap-3"><div className="relative min-h-44 overflow-hidden rounded-2xl"><Image src="/images/hero-visualization.webp" alt="" fill className="object-cover opacity-70" sizes="500px" /><span className="absolute inset-x-4 bottom-4 rounded-xl border border-white/12 bg-[#06111a]/75 px-4 py-3 text-xs text-white/60 backdrop-blur">18:30 / Evening visual loop</span></div><div className="grid gap-3"><div className="rounded-2xl bg-brand-orange/10" /><div className="rounded-2xl bg-[#49d5c5]/10" /></div></div>}
        {visual === 'create' && <div className="mt-8 flex gap-3"><span className="h-20 flex-1 rounded-2xl bg-[linear-gradient(135deg,rgba(239,166,52,.2),rgba(73,213,197,.12))]" /><span className="h-20 flex-1 rounded-2xl bg-[linear-gradient(135deg,rgba(73,213,197,.16),rgba(117,111,214,.13))]" /></div>}
        {visual === 'messages' && <div className="mt-8 space-y-2"><span className="block w-4/5 rounded-full bg-white/[0.07] px-4 py-2 text-xs text-white/46">EN · Welcome to tonight&apos;s tasting menu</span><span className="ml-auto block w-4/5 rounded-full bg-brand-orange/12 px-4 py-2 text-right text-xs text-white/56">TH · ยินดีต้อนรับ</span></div>}
      </div>
    </motion.article>
  );
}
