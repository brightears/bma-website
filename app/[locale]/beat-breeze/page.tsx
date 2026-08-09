'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowRight,
  CalendarClock,
  Check,
  CloudRain,
  ExternalLink,
  Gauge,
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
  Sparkles,
  Smartphone,
  Volume2,
  VolumeX,
  WandSparkles,
  Workflow,
} from 'lucide-react';
import { EXTERNAL_LINKS, withAttribution } from '@/lib/external-links';
import { useMarketFeatureProfile } from '@/hooks/use-market-feature-profile';
import {
  type PlaylistSampleAsset,
  type PlaylistSampleTrack,
} from '@/components/home/venue-time-machine-data';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.62 },
};

const conciergeScenarios = ['arrival', 'campaign', 'recovery'] as const;
const capabilityKeys = ['play', 'create', 'communicate', 'connect'] as const;

const conciergeSampleDirections: Record<
  (typeof conciergeScenarios)[number],
  { playlist: string; bpm: number }
> = {
  arrival: { playlist: 'Bossa Nova Lounge', bpm: 98 },
  campaign: { playlist: 'Nu Disco Vocal', bpm: 122 },
  recovery: { playlist: 'Balinese Spa', bpm: 70 },
};

const includedVisualLoops = [
  {
    key: 'waterfall',
    src: '/media/beat-breeze/waterfall-steps-back.mp4',
    poster: '/media/beat-breeze/waterfall-steps-back.jpg',
    duration: '0:19',
    hasAudio: true,
    accent: '#49d5c5',
  },
  {
    key: 'snow',
    src: '/media/beat-breeze/snow-visitor.mp4',
    poster: '/media/beat-breeze/snow-visitor.jpg',
    duration: '0:10',
    hasAudio: false,
    accent: '#e6cf74',
  },
  {
    key: 'underwater',
    src: '/media/beat-breeze/underwater-wall.mp4',
    poster: '/media/beat-breeze/underwater-wall.jpg',
    duration: '1:01',
    hasAudio: true,
    accent: '#38cfe0',
  },
] as const;

function closestSample(
  samples: PlaylistSampleTrack[] | undefined,
  targetBpm: number,
): PlaylistSampleTrack | undefined {
  return samples?.reduce<PlaylistSampleTrack | undefined>((closest, sample) => {
    if (!closest) return sample;
    if (sample.tempoBpm === null) return closest;
    if (closest.tempoBpm === null) return sample;

    return Math.abs(sample.tempoBpm - targetBpm) < Math.abs(closest.tempoBpm - targetBpm)
      ? sample
      : closest;
  }, undefined);
}

export default function BeatBreezePage() {
  const locale = useLocale();
  const t = useTranslations('beatBreezePage');
  const immersive = useTranslations('homePage.immersive');
  const volumeT = useTranslations('volumeController');
  const reduceMotion = useReducedMotion();
  const marketProfile = useMarketFeatureProfile();
  const [scenario, setScenario] = useState<(typeof conciergeScenarios)[number]>('arrival');
  const [sampleAssets, setSampleAssets] = useState<Record<string, PlaylistSampleAsset>>({});
  const [sampleLoadState, setSampleLoadState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [audioState, setAudioState] = useState<'idle' | 'playing' | 'paused' | 'error'>('idle');
  const [showSchedulePreview, setShowSchedulePreview] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const signup = withAttribution(EXTERNAL_LINKS.beatBreezeSignup, 'beat_breeze_product', 'hero_trial');
  const catalogue = withAttribution(EXTERNAL_LINKS.beatBreezeCatalogue, 'beat_breeze_product', 'concierge_catalogue');
  const selectedDirection = conciergeSampleDirections[scenario];
  const selectedSample = useMemo(
    () => closestSample(sampleAssets[selectedDirection.playlist]?.samples, selectedDirection.bpm),
    [sampleAssets, selectedDirection],
  );
  const apiTime = useMemo(
    () => new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    }).format(new Date(Date.UTC(2026, 0, 1, 14, 0))),
    [locale],
  );
  const selectedAudioSource = selectedSample?.audioUrl;
  const controlSignals = [
    { Icon: Workflow, label: t('redesign.controlRoom.schedule'), value: t('redesign.controlRoom.scheduleValue') },
    { Icon: WandSparkles, label: t('redesign.media.musicCreation.label'), value: t('redesign.media.musicCreation.value') },
    { Icon: Volume2, label: t('redesign.controlRoom.volume'), value: '-8 dB' },
    { Icon: MessageSquareText, label: t('redesign.media.messages.label'), value: t('redesign.media.messages.value') },
  ];
  const adaptiveMoment = marketProfile === 'prayer'
    ? {
        key: 'prayer',
        time: t('redesign.day.prayer.time'),
        title: t('redesign.day.prayer.title'),
        text: t('redesign.day.prayer.text'),
      }
    : marketProfile === 'climate'
      ? {
          key: 'weather',
          time: t('redesign.day.weather.time'),
          title: t('redesign.day.weather.title'),
          text: t('redesign.day.weather.text'),
        }
      : {
          key: 'api',
          time: apiTime,
          title: t('redesign.connections.api.title'),
          text: t('redesign.connections.api.text'),
        };
  const dayMoments = [
    {
      key: 'morning',
      time: t('redesign.day.morning.time'),
      title: t('redesign.day.morning.title'),
      text: t('redesign.day.morning.text'),
    },
    adaptiveMoment,
    {
      key: 'evening',
      time: t('redesign.day.evening.time'),
      title: t('redesign.day.evening.title'),
      text: t('redesign.day.evening.text'),
    },
  ];

  useEffect(() => {
    const controller = new AbortController();

    void fetch('/api/beat-breeze-samples/', { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Sample manifest unavailable');
        return response.json() as Promise<{ playlists?: PlaylistSampleAsset[] }>;
      })
      .then(({ playlists = [] }) => {
        setSampleAssets(Object.fromEntries(
          playlists.map((playlist) => [playlist.name, playlist]),
        ));
        setSampleLoadState('ready');
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setSampleLoadState('error');
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setAudioState('idle');
    setShowSchedulePreview(false);
  }, [scenario, selectedAudioSource]);

  function handleAudioPreview() {
    const audio = audioRef.current;
    if (!audio || !selectedAudioSource) return;

    if (!audio.paused) {
      audio.pause();
      setAudioState('paused');
      return;
    }

    void audio.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setAudioState('error');
    });
  }

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
            <h1 className="bma-display bma-page-title mt-5 max-w-3xl">
              {t('redesign.hero.title')} <span className="bg-gradient-to-r from-brand-orange via-[#e4ca68] to-[#49d5c5] bg-clip-text text-transparent">{t('redesign.hero.highlight')}</span>
            </h1>
            <p className="bma-lede mt-7 max-w-2xl">{t('redesign.hero.description')}</p>
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
                {controlSignals.map(({ Icon, label, value }) => (
                  <div key={label} className="border-b border-white/[0.07] p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"><Icon className="h-4 w-4 text-brand-orange" /><p className="mt-4 font-label text-[9px] uppercase tracking-[.16em] text-white/30">{label}</p><strong className="mt-1 block truncate text-sm font-medium text-white/82">{value}</strong></div>
                ))}
              </div>

              <div className="relative p-5 sm:p-7">
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
                  <p className="text-xs leading-5 text-white/56">{volumeT('compactText')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bma-section border-y border-white/[0.08] bg-[#081521]">
        <div className="bma-container">
          <motion.div {...reveal} className="grid gap-8 lg:grid-cols-[0.62fr_1fr] lg:items-end">
            <div><p className="bma-kicker">{t('redesign.day.eyebrow')}</p><h2 className="bma-section-title mt-5 text-white">{t('redesign.day.title')}</h2></div>
            <p className="bma-lede lg:justify-self-end">{marketProfile === 'prayer' ? t('redesign.day.description') : t('redesign.connections.description')}</p>
          </motion.div>

          <div className="relative mt-16">
            <div className="absolute left-5 top-0 h-full w-px bg-[linear-gradient(#efa634,#49d5c5,rgba(73,213,197,.08))] sm:left-20 lg:left-1/2" aria-hidden="true" />
            {dayMoments.map((moment, index) => (
              <motion.article key={moment.key} {...reveal} className={`relative grid min-h-[15rem] grid-cols-[3rem_1fr] gap-5 pb-10 sm:grid-cols-[8rem_1fr] lg:grid-cols-2 lg:gap-16 ${index % 2 ? '' : 'lg:text-right'}`}>
                <div className={`hidden lg:block ${index % 2 ? 'lg:order-2' : ''}`}>
                  <p className="font-mono text-sm text-brand-orange">{moment.time}</p>
                  <h3 className="mt-4 font-headline text-3xl font-medium">{moment.title}</h3>
                  <p className={`mt-4 text-base leading-7 text-white/48 ${index % 2 ? 'max-w-lg' : 'ml-auto max-w-lg'}`}>{moment.text}</p>
                </div>
                <span className="relative z-10 mt-1 grid h-10 w-10 place-items-center rounded-full border border-brand-orange/35 bg-[#081521] font-mono text-xs text-brand-orange sm:ml-[3.75rem] lg:absolute lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">0{index + 1}</span>
                <div className={`lg:hidden ${index % 2 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <p className="font-mono text-sm text-brand-orange">{moment.time}</p>
                  <h3 className="mt-3 font-headline text-2xl font-medium">{moment.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/48">{moment.text}</p>
                </div>
                <div className={`hidden lg:block ${index % 2 ? 'lg:order-1' : 'lg:order-2'}`} aria-hidden="true">
                  <DaySignalScene variant={moment.key === 'morning' ? 0 : moment.key === 'weather' ? 1 : moment.key === 'prayer' ? 2 : 3} />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bma-grain bma-section relative bg-[#06111a]">
        <div className="bma-container grid gap-12 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
          <motion.div {...reveal} className="lg:sticky lg:top-32">
            <p className="bma-kicker">{t('redesign.concierge.eyebrow')}</p>
            <h2 className="bma-section-title mt-5 bg-[linear-gradient(100deg,#ffffff_8%,#ffffff_36%,#e7c55f_68%,#49d5c5_100%)] bg-clip-text text-transparent">{t('redesign.concierge.title')}</h2>
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
                  <span className="absolute inset-0 grid place-items-center bg-black/18" aria-hidden="true">
                    {audioState === 'playing'
                      ? <Pause className="h-7 w-7 fill-white text-white" />
                      : <Play className="h-7 w-7 fill-white text-white" />}
                  </span>
                </div>
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[.18em] text-[#49d5c5]">{t('redesign.concierge.recommendation')}</p>
                  <h3 className="mt-2 text-xl font-medium">{t(`redesign.concierge.${scenario}.result`)}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/48">{t(`redesign.concierge.${scenario}.reason`)}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleAudioPreview}
                      disabled={!selectedAudioSource}
                      aria-pressed={audioState === 'playing'}
                      aria-label={!selectedAudioSource && sampleLoadState !== 'loading' ? immersive('audio.unavailable') : undefined}
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-xs font-semibold text-white/72 transition hover:border-brand-orange/35 hover:bg-brand-orange/[0.07] disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      {audioState === 'playing' ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                      {audioState === 'playing' ? immersive('audio.pause') : t('redesign.concierge.preview')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSchedulePreview((current) => !current)}
                      aria-expanded={showSchedulePreview}
                      className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-4 py-2 text-xs font-semibold text-[#111820] transition hover:bg-[#ffc164]"
                    >
                      <CalendarClock className="h-3.5 w-3.5" />
                      {t('redesign.concierge.schedule')}
                    </button>
                    <a
                      href={catalogue}
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-xs font-semibold text-white/72 transition hover:border-[#49d5c5]/35 hover:bg-[#49d5c5]/[0.06]"
                    >
                      {t('redesign.concierge.keepBrowsing')}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  {audioState === 'error' && <p className="mt-3 text-xs text-rose-300/75">{immersive('audio.unavailable')}</p>}
                </div>
              </div>
              <AnimatePresence initial={false}>
                {showSchedulePreview && (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, height: 0, y: -8 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, height: 0, y: -8 }}
                    transition={reduceMotion ? { duration: 0 } : undefined}
                    className="overflow-hidden"
                  >
                    <div role="status" className="mt-4 grid gap-4 rounded-2xl border border-[#49d5c5]/20 bg-[#49d5c5]/[0.055] p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-[#49d5c5]/25 bg-[#49d5c5]/[0.08] text-[#7ce8da]">
                        <CalendarClock className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-label text-[9px] uppercase tracking-[.18em] text-[#7ce8da]">{t('redesign.concierge.steps.review')}</p>
                        <strong className="mt-1 block text-sm font-medium text-white/82">{t(`redesign.concierge.${scenario}.prompt`)}</strong>
                      </div>
                      <span className="font-mono text-[10px] text-white/38">{t('redesign.concierge.steps.play')}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="mt-6 grid gap-3 sm:grid-cols-4">
                {(['ask', 'recommend', 'review', 'play'] as const).map((key, index) => <div key={key} className="rounded-xl border border-white/[0.07] p-3"><span className="font-mono text-[10px] text-brand-orange">0{index + 1}</span><p className="mt-2 text-xs font-medium text-white/68">{t(`redesign.concierge.steps.${key}`)}</p></div>)}
              </div>
            </div>
            <div className="border-t border-white/[0.08] bg-brand-orange/[0.045] px-5 py-4 sm:px-8"><p className="flex items-start gap-3 text-xs leading-5 text-white/48"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />{t('redesign.concierge.control')}</p></div>
            <audio
              ref={audioRef}
              src={selectedAudioSource}
              preload="none"
              onPlay={() => setAudioState('playing')}
              onPause={() => setAudioState((current) => current === 'playing' ? 'paused' : current)}
              onEnded={() => setAudioState('idle')}
              onError={() => setAudioState('error')}
            />
          </motion.div>
        </div>
      </section>

      <section className="bma-section border-y border-white/[0.08] bg-[#081521]">
        <div className="bma-container">
          <motion.div {...reveal} className="max-w-4xl">
            <p className="bma-kicker">{t('redesign.media.eyebrow')}</p>
            <h2 className="bma-section-title mt-5 bg-[linear-gradient(100deg,#ffffff_8%,#ffffff_36%,#e7c55f_68%,#49d5c5_100%)] bg-clip-text text-transparent">{t('redesign.media.title')}</h2>
            <p className="bma-lede mt-6">{t('redesign.media.description')}</p>
          </motion.div>

          <nav aria-label={t('redesign.media.title')} className="mt-12 grid grid-cols-2 overflow-hidden rounded-[1.4rem] border border-white/[0.09] bg-white/[0.018] sm:grid-cols-4">
            {capabilityKeys.map((key, index) => (
              <a
                key={key}
                href={`#beat-breeze-${key}`}
                className={`group flex min-h-20 items-center gap-4 border-white/[0.08] px-4 text-left text-white/52 transition duration-300 hover:bg-white/[0.035] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-orange sm:px-5 ${index < 2 ? 'border-b sm:border-b-0' : ''} ${index % 2 === 0 ? 'border-r' : ''} ${index < capabilityKeys.length - 1 ? 'sm:border-r' : 'sm:border-r-0'}`}
              >
                <span className="font-mono text-[10px] text-brand-orange transition group-hover:text-[#71e2d4]">0{index + 1}</span>
                <span className="font-label text-[10px] font-semibold uppercase tracking-[.16em]">{t(`redesign.capabilities.${key}`)}</span>
              </a>
            ))}
          </nav>

          <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
            <CapabilityChapter id="beat-breeze-play" number="01" title={t('redesign.capabilities.play')}>
              <MediaChapter className="lg:col-span-8" icon={Music2} label={t('redesign.media.musicCreation.label')} title={t('redesign.media.musicCreation.title')} text={t('redesign.media.musicCreation.text')} />
              <MediaChapter className="lg:col-span-4" icon={Radio} label={t('redesign.media.soundscapes.label')} title={t('redesign.media.soundscapes.title')} text={t('redesign.media.soundscapes.text')} />
              <MediaChapter className="lg:col-span-12" icon={WandSparkles} label={t('redesign.media.catalogue.label')} title={t('redesign.media.catalogue.title')} text={t('redesign.media.catalogue.text')} />
            </CapabilityChapter>

            <CapabilityChapter id="beat-breeze-create" number="02" title={t('redesign.capabilities.create')} accent>
              <MediaChapter className="lg:col-span-8" icon={MonitorPlay} label={t('redesign.media.screens.label')} title={t('redesign.media.screens.title')} text={t('redesign.media.screens.text')} visual="screens" visualPlayLabel={t('redesign.media.screens.loopPlay')} visualPauseLabel={t('redesign.media.screens.loopPause')} />
              <MediaChapter className="lg:col-span-4" icon={ImageIcon} label={t('redesign.media.create.label')} title={t('redesign.media.create.title')} text={t('redesign.media.create.text')} visual="create" />
            </CapabilityChapter>

            <CapabilityChapter id="beat-breeze-communicate" number="03" title={t('redesign.capabilities.communicate')}>
              <MediaChapter className="lg:col-span-7" icon={MessageSquareText} label={t('redesign.media.messages.label')} title={t('redesign.media.messages.title')} text={t('redesign.media.messages.text')} visual="messages" />
              <MediaChapter className="lg:col-span-5" icon={PhoneCall} label={t('redesign.media.phone.label')} title={t('redesign.media.phone.title')} text={t('redesign.media.phone.text')} />
            </CapabilityChapter>

            <CapabilityChapter id="beat-breeze-connect" number="04" title={t('redesign.capabilities.connect')}>
              <MediaChapter className="lg:col-span-7" icon={Workflow} label={t('redesign.connections.eyebrow')} title={t('redesign.connections.title')} text={t('redesign.connections.description')} />
              <MediaChapter className="lg:col-span-5" icon={Gauge} label={volumeT('eyebrow')} title={volumeT('compactTitle')} text={volumeT('compactText')} />
            </CapabilityChapter>
          </div>
        </div>
      </section>

      <section className="bma-section bg-[#06111a]">
        <div className="bma-container grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <motion.div {...reveal}>
            <p className="bma-kicker">{t('redesign.connections.eyebrow')}</p>
            <h2 className="bma-section-title mt-5 bg-[linear-gradient(100deg,#ffffff_8%,#ffffff_38%,#e7c55f_70%,#49d5c5_100%)] bg-clip-text text-transparent">{t('redesign.connections.title')}</h2>
            <p className="bma-lede mt-6">{t('redesign.connections.description')}</p>
          </motion.div>
          <div className="relative">
            <div className="absolute bottom-0 left-5 top-0 w-px bg-white/[0.09] sm:left-[7.5rem]" />
            {(['schedules', 'weather', 'volume', 'api'] as const).map((key, index) => (
              <motion.div key={key} {...reveal} className="relative grid grid-cols-[2.6rem_1fr] gap-5 pb-9 sm:grid-cols-[8rem_1fr]">
                <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-[#06111a] font-mono text-xs text-brand-orange sm:ml-[5.5rem]">0{index + 1}</span>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6"><h3 className="text-lg font-medium">{t(`redesign.connections.${key}.title`)}</h3><p className="mt-3 text-sm leading-6 text-white/46">{key === 'volume' ? volumeT('compactText') : t(`redesign.connections.${key}.text`)}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-[#081521] px-5 py-16 sm:px-8 lg:px-16">
        <div className="bma-container grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <motion.div {...reveal}><p className="bma-kicker">{t('product.playersLabel')}</p><h2 className="bma-section-title mt-5 text-white">{t('product.playersTitle')}</h2></motion.div>
          <motion.div {...reveal} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[[Smartphone, t('product.mobile')], [Laptop, t('product.windows')], [MonitorPlay, t('product.web')], [Music2, t('product.offline')]].map(([Icon, label]) => { const DeviceIcon = Icon as typeof Smartphone; return <div key={label as string} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"><DeviceIcon className="h-5 w-5 text-brand-orange" /><p className="mt-6 text-sm text-white/64">{label as string}</p></div>; })}
          </motion.div>
        </div>
      </section>

      <section className="bma-grain relative overflow-hidden px-5 py-24 text-center sm:px-8 md:py-36 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(239,166,52,.19),transparent_46%),radial-gradient(circle_at_75%_0,rgba(73,213,197,.08),transparent_32%)]" />
        <motion.div {...reveal} className="relative mx-auto max-w-4xl">
          <h2 className="bma-section-title bg-gradient-to-r from-brand-orange via-[#e6cf74] to-[#49d5c5] bg-clip-text text-transparent">{t('redesign.final.title')}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/52">{t('redesign.final.description')}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={withAttribution(EXTERNAL_LINKS.beatBreezeSignup, 'beat_breeze_product', 'final_trial')} className="bma-button-primary min-h-14 px-8">{t('redesign.hero.trial')} <ArrowRight className="h-4 w-4" /></a>
            <Link href={`/${locale}/quotation?solution=beat-breeze&source=product-final`} className="bma-button-secondary min-h-14 px-8">{t('redesign.hero.talk')}</Link>
          </div>
          <p className="mt-6 text-xs text-white/34">{t('redesign.final.support')}</p>
        </motion.div>
      </section>

    </div>
  );
}

function DaySignalScene({ variant }: { variant: number }) {
  const t = useTranslations('beatBreezePage.redesign.day');
  const reduceMotion = useReducedMotion();

  return (
    <div className="ml-auto max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-[linear-gradient(145deg,rgba(255,255,255,.035),rgba(73,213,197,.025))] p-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,.035)]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-white/30">{t('signal')} / 0{variant + 1}</span>
        <i className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.65)]" />
      </div>

      {variant === 0 && (
        <div className="relative mt-5 grid h-24 grid-cols-[5rem_1fr] items-center gap-5 overflow-hidden rounded-xl border border-brand-orange/10 bg-brand-orange/[0.035] px-4">
          <div className="relative grid h-16 w-16 place-items-center">
            <motion.i
              animate={reduceMotion ? undefined : { scale: [0.86, 1.05, 0.86], opacity: [.55, 1, .55] }}
              transition={reduceMotion ? undefined : { duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(239,166,52,.5),rgba(239,166,52,.04)_62%,transparent_64%)]"
            />
            <Gauge className="relative h-6 w-6 text-brand-orange" />
          </div>
          <div className="space-y-2.5">
            {[74, 56, 38].map((width, index) => (
              <div key={width} className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.i
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  whileInView={reduceMotion ? undefined : { scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={reduceMotion ? undefined : { duration: .7, delay: index * .12 }}
                  className="block h-full origin-left rounded-full bg-[linear-gradient(90deg,#efa634,#e7c55f,#49d5c5)]"
                  style={{ width: `${width}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {variant === 1 && (
        <div className="relative mt-5 grid h-24 grid-cols-[1fr_auto] items-center overflow-hidden rounded-xl border border-[#49d5c5]/10 bg-[#49d5c5]/[0.035] px-5">
          <div>
            <CloudRain className="h-6 w-6 text-[#74dfd2]" />
            <strong className="mt-2 block font-mono text-lg font-medium text-white/78">29°C</strong>
          </div>
          <div className="relative h-20 w-40">
            <motion.i
              animate={reduceMotion ? undefined : { x: [-8, 12, -8], y: [2, -5, 2] }}
              transition={reduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-1 top-2 h-14 w-24 rounded-[55%_45%_60%_40%] bg-[radial-gradient(circle_at_35%_35%,rgba(73,213,197,.5),rgba(73,213,197,.04)_70%)] blur-sm"
            />
            <i className="absolute bottom-3 left-0 h-px w-full bg-[linear-gradient(90deg,transparent,#49d5c5,#efa634,transparent)]" />
            <i className="absolute bottom-7 left-8 h-px w-24 rotate-[-8deg] bg-white/18" />
          </div>
        </div>
      )}

      {variant === 2 && (
        <div className="relative mt-5 grid h-24 place-items-center overflow-hidden rounded-xl border border-brand-orange/10 bg-[radial-gradient(circle_at_center,rgba(239,166,52,.08),transparent_62%)]">
          <motion.i
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={reduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute h-20 w-20 rounded-full border border-dashed border-brand-orange/25"
          />
          <i className="absolute h-14 w-14 rounded-full border border-[#49d5c5]/18" />
          <div className="relative text-center">
            <MoonStar className="mx-auto h-5 w-5 text-brand-orange" />
            <strong className="mt-1 block font-mono text-xs font-medium text-white/76">18:36</strong>
          </div>
        </div>
      )}

      {variant === 3 && (
        <div className="mt-5 space-y-2 rounded-xl border border-white/[0.07] bg-white/[0.018] p-3">
          {[
            [Music2, 82],
            [MonitorPlay, 64],
            [MessageSquareText, 48],
          ].map(([SceneIcon, width], index) => {
            const TouchpointIcon = SceneIcon as typeof Music2;
            return (
              <div key={width as number} className="grid grid-cols-[1.7rem_1fr_auto] items-center gap-2.5">
                <TouchpointIcon className="h-3.5 w-3.5 text-white/38" />
                <span className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.i
                    animate={reduceMotion ? undefined : { opacity: [.45, 1, .45] }}
                    transition={reduceMotion ? undefined : { duration: 2.8, delay: index * .35, repeat: Infinity }}
                    className="block h-full rounded-full bg-[linear-gradient(90deg,#efa634,#49d5c5)]"
                    style={{ width: `${width}%` }}
                  />
                </span>
                <span className="font-mono text-[9px] text-[#6fe0d2]">0{index + 1}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function VisualLoopTheater({
  ariaLabel,
  playLabel,
  pauseLabel,
}: {
  ariaLabel: string;
  playLabel: string;
  pauseLabel: string;
}) {
  const t = useTranslations('beatBreezePage.redesign.media.screens');
  const reduceMotion = useReducedMotion();
  const [activeLoop, setActiveLoop] = useState(0);
  const [isPlaying, setIsPlaying] = useState(!reduceMotion);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loop = includedVisualLoops[activeLoop] ?? includedVisualLoops[0]!;
  const loopName = t(`loops.${loop.key}.name`);
  const loopMood = t(`loops.${loop.key}.mood`);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduceMotion || !isPlaying) {
      video.pause();
      if (reduceMotion) setIsPlaying(false);
      return;
    }

    void video.play().catch(() => setIsPlaying(false));
  }, [activeLoop, isPlaying, reduceMotion]);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }

  function toggleSound() {
    const video = videoRef.current;
    if (!video || !loop.hasAudio) return;

    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
      if (video.paused) {
        void video.play().then(() => setIsPlaying(true)).catch(() => {
          video.muted = true;
          setIsMuted(true);
          setIsPlaying(false);
        });
      }
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  }

  function selectLoop(index: number) {
    if (index === activeLoop) return;
    if (videoRef.current) videoRef.current.muted = true;
    setIsMuted(true);
    setActiveLoop(index);
  }

  return (
    <div className="mt-9" role="group" aria-label={ariaLabel}>
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#050b12] shadow-[0_24px_70px_rgba(0,0,0,.34)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={loop.src}
            initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: .45 }}
            className="absolute inset-0"
          >
            <video
              ref={videoRef}
              src={loop.src}
              poster={loop.poster}
              muted={isMuted}
              autoPlay={isPlaying && !reduceMotion}
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
              aria-label={`${loopName} · ${loopMood}`}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,13,.06),rgba(3,8,13,.12)_48%,rgba(3,8,13,.82))]" />
            <motion.i
              animate={reduceMotion ? undefined : { x: ['-120%', '250%'] }}
              transition={reduceMotion ? undefined : { duration: 5.6, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
              className="absolute -inset-y-10 w-24 rotate-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent)] blur-md"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
              <div>
                <span className="font-label text-[9px] uppercase tracking-[.2em] text-white/42">
                  {loop.duration} · 16:9 · {loop.hasAudio ? t('loopWithSound') : t('loopSilent')}
                </span>
                <strong className="mt-1 block text-sm font-medium text-white sm:text-base">{loopName}</strong>
                <span className="mt-0.5 block text-xs text-white/48">{loopMood}</span>
              </div>
              <span className="h-1.5 w-12 rounded-full" style={{ background: loop.accent }} />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
          {loop.hasAudio ? (
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={!isMuted}
              aria-label={isMuted ? t('loopSoundOn') : t('loopSoundOff')}
              title={isMuted ? t('loopSoundOn') : t('loopSoundOff')}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/14 bg-[#06111a]/70 text-white shadow-lg backdrop-blur transition hover:bg-[#06111a]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#49d5c5]"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          ) : (
            <span
              role="img"
              aria-label={t('loopSilent')}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-[#06111a]/58 text-white/55 shadow-lg backdrop-blur"
              title={t('loopSilent')}
            >
              <VolumeX className="h-4 w-4" />
            </span>
          )}
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? pauseLabel : playLabel}
            title={isPlaying ? pauseLabel : playLabel}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/14 bg-[#06111a]/70 text-white shadow-lg backdrop-blur transition hover:bg-[#06111a]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
          >
            {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {includedVisualLoops.map((candidate, index) => {
          const candidateName = t(`loops.${candidate.key}.name`);
          const candidateMood = t(`loops.${candidate.key}.mood`);

          return (
            <button
              key={candidate.src}
              type="button"
              onClick={() => selectLoop(index)}
              aria-pressed={activeLoop === index}
              aria-label={`${candidateName} · ${candidateMood}`}
              className={`group/loop relative aspect-video overflow-hidden rounded-xl border transition ${activeLoop === index ? 'border-brand-orange/65 ring-2 ring-brand-orange/15' : 'border-white/10 opacity-58 hover:opacity-100'}`}
            >
              <Image src={candidate.poster} alt="" fill sizes="180px" className="object-cover transition duration-500 group-hover/loop:scale-105" />
              <span className="absolute inset-x-0 bottom-0 h-1" style={{ background: candidate.accent }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CreativeReviewPreview({ ariaLabel }: { ariaLabel: string }) {
  const reduceMotion = useReducedMotion();
  const [draft, setDraft] = useState(0);
  const drafts = [
    '/images/beat-breeze/visual-draft-botanical.webp',
    '/images/beat-breeze/visual-draft-underwater.webp',
    '/images/beat-breeze/visual-draft-snow.webp',
    '/images/beat-breeze/visual-draft-ribbons.webp',
  ] as const;
  const activeDraft = drafts[draft] ?? drafts[0];

  return (
    <div className="mt-8 flex min-h-[34rem] flex-1 flex-col rounded-[1.35rem] border border-white/[0.08] bg-[#06111a]/78 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.025)]">
      <div className="flex items-center justify-between px-1 pb-3">
        <div className="flex items-center gap-2" aria-hidden="true">
          {drafts.map((image, index) => (
            <span
              key={image}
              className={`h-1 rounded-full transition-[width,background-color] duration-300 ${draft === index ? 'w-8 bg-brand-orange' : 'w-2 bg-white/16'}`}
            />
          ))}
        </div>
        <span className="font-mono text-[10px] tracking-[.16em] text-white/38" aria-hidden="true">
          0{draft + 1} / 04
        </span>
      </div>

      <div className="relative min-h-64 flex-1 overflow-hidden rounded-[1.05rem] border border-white/10 bg-[#06111a]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeDraft}
            initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: .42 }}
            className="absolute inset-0"
          >
            <Image src={activeDraft} alt={`${ariaLabel} 0${draft + 1}`} fill sizes="(min-width: 1024px) 31vw, 90vw" className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,17,26,.02)_42%,rgba(6,17,26,.72)_100%)]" />
          </motion.div>
        </AnimatePresence>
        <span className="absolute bottom-3 left-3 grid h-8 w-8 place-items-center rounded-full bg-brand-orange text-xs font-bold text-[#111820] shadow-[0_8px_24px_rgba(239,166,52,.24)]" aria-hidden="true">✓</span>
        <span className="absolute inset-x-3 bottom-3 ml-11 h-px bg-[linear-gradient(90deg,#efa634,#e7c55f,#49d5c5,transparent)]" aria-hidden="true" />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {drafts.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setDraft(index)}
            aria-pressed={draft === index}
            aria-label={`${ariaLabel} 0${index + 1}`}
            className={`group/draft relative aspect-video overflow-hidden rounded-xl border transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${draft === index ? 'border-[#49d5c5]/65 opacity-100' : 'border-white/10 opacity-52 hover:border-white/20 hover:opacity-100'}`}
          >
            <Image src={image} alt="" fill sizes="(min-width: 1024px) 15vw, 42vw" className="object-cover transition duration-500 group-hover/draft:scale-[1.025]" />
            <span className={`absolute inset-0 transition ${draft === index ? 'bg-transparent' : 'bg-[#06111a]/32'}`} aria-hidden="true" />
            <span className="absolute bottom-2 left-2 font-mono text-[10px] tracking-[.14em] text-white/80" aria-hidden="true">0{index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function MediaChapter({
  className = '',
  icon: Icon,
  label,
  title,
  text,
  visual,
  visualPlayLabel,
  visualPauseLabel,
}: {
  className?: string;
  icon: typeof Music2;
  label: string;
  title: string;
  text: string;
  visual?: 'screens' | 'create' | 'messages';
  visualPlayLabel?: string;
  visualPauseLabel?: string;
}) {
  const messagesT = useTranslations('beatBreezePage.redesign.media.messages');
  const reduceMotion = useReducedMotion();

  return (
    <motion.article {...reveal} className={`group relative overflow-hidden rounded-[1.6rem] border border-white/[0.09] bg-[#0a1825] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.025)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,#efa634,#e7c55f,#49d5c5,transparent)] before:opacity-55 sm:p-8 ${className}`}>
      {visual === 'screens' && <div className="absolute inset-x-0 top-0 h-2/5 bg-[radial-gradient(circle_at_70%_10%,rgba(73,213,197,.16),transparent_38%)]" />}
      <div className="relative flex h-full flex-col">
        <span className="grid h-11 w-11 place-items-center rounded-2xl border border-brand-orange/20 bg-brand-orange/[0.07] text-brand-orange transition duration-300 group-hover:-translate-y-0.5 group-hover:border-[#49d5c5]/25 group-hover:text-[#77e3d6]"><Icon className="h-5 w-5" /></span>
        <p className="mt-8 font-label text-[10px] uppercase tracking-[.2em] text-brand-orange">{label}</p>
        <h3 className="mt-3 max-w-lg text-2xl font-medium sm:text-3xl">{title}</h3>
        <p className="mt-4 max-w-xl text-sm leading-6 text-white/46">{text}</p>
        {visual === 'screens' && (
          <VisualLoopTheater
            ariaLabel={title}
            playLabel={visualPlayLabel ?? title}
            pauseLabel={visualPauseLabel ?? title}
          />
        )}
        {visual === 'create' && <CreativeReviewPreview ariaLabel={title} />}
        {visual === 'messages' && (
          <div className="mt-8 space-y-2">
            <motion.span initial={reduceMotion ? false : { opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={reduceMotion ? { duration: 0 } : undefined} className="block w-4/5 rounded-full bg-white/[0.07] px-4 py-2 text-xs text-white/46">{messagesT('examplePrimary')}</motion.span>
            <motion.span initial={reduceMotion ? false : { opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={reduceMotion ? { duration: 0 } : { delay: .12 }} className="ml-auto block w-4/5 rounded-full bg-brand-orange/12 px-4 py-2 text-right text-xs text-white/56">{messagesT('exampleSecondary')}</motion.span>
          </div>
        )}
      </div>
    </motion.article>
  );
}

function CapabilityChapter({
  id,
  number,
  title,
  accent = false,
  children,
}: {
  id: string;
  number: string;
  title: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.article id={id} {...reveal} className="scroll-mt-28">
      <header className="mb-7 flex items-center gap-4 sm:mb-9">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border font-mono text-[10px] ${accent ? 'border-[#49d5c5]/35 bg-[#49d5c5]/[0.07] text-[#74e4d7]' : 'border-brand-orange/28 bg-brand-orange/[0.055] text-brand-orange'}`}>{number}</span>
        <h3 className="font-label text-xs font-semibold uppercase tracking-[.2em] text-white/74 sm:text-sm">{title}</h3>
        <span className={`h-px flex-1 ${accent ? 'bg-[linear-gradient(90deg,rgba(73,213,197,.58),rgba(239,166,52,.2),transparent)]' : 'bg-[linear-gradient(90deg,rgba(239,166,52,.42),rgba(73,213,197,.22),transparent)]'}`} />
      </header>
      <div className="grid gap-4 lg:grid-cols-12">{children}</div>
    </motion.article>
  );
}
