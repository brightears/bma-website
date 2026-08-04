'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowDown,
  ArrowRight,
  Check,
  Copy,
  MessageSquareText,
  MonitorPlay,
  Music2,
  Pause,
  PhoneCall,
  Play,
  SlidersHorizontal,
  Sparkles,
  Volume2,
  VolumeX,
  Workflow,
} from 'lucide-react';
import styles from './ImmersiveBeatBreeze.module.css';
import {
  PLAYLIST_COVERS,
  PREVIEW_AUDIO_BY_PLAYLIST,
  TIME_STOPS,
  VENUES,
  type VenueKey,
} from './venue-time-machine-data';

type TouchpointKey = 'sound' | 'screens' | 'messages' | 'phone';

const phaseAccents = [
  ['#e8850c', '#79d7a5'],
  ['#e7b94e', '#00d4c8'],
  ['#e8850c', '#00c6d7'],
  ['#d67c2c', '#36bed1'],
] as const;

function getPhaseIndex(hour: number) {
  if (hour < 9) return 0;
  if (hour < 16) return 1;
  if (hour < 21) return 2;
  return 3;
}

function formatHour(hour: number) {
  return `${String(hour).padStart(2, '0')}:00`;
}

function Equalizer({ active = false }: { active?: boolean }) {
  return (
    <span className={`${styles.equalizer} ${active ? styles.equalizerActive : ''}`} aria-hidden="true">
      {[7, 13, 20, 11, 17, 9, 14].map((height, index) => (
        <i key={`${height}-${index}`} style={{ height }} />
      ))}
    </span>
  );
}

export function ImmersiveBeatBreeze() {
  const locale = useLocale();
  const t = useTranslations('homePage.immersive');
  const [venueKey, setVenueKey] = useState<VenueKey>('hotel');
  const [timeIndex, setTimeIndex] = useState(4);
  const [focus, setFocus] = useState(0);
  const [copied, setCopied] = useState(false);
  const [audioState, setAudioState] = useState<'idle' | 'playing' | 'paused' | 'error'>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [activeTouchpoint, setActiveTouchpoint] = useState<TouchpointKey>('sound');
  const audioRef = useRef<HTMLAudioElement>(null);
  const resumeAfterSourceChangeRef = useRef(false);

  const venue = VENUES[venueKey];
  const hour = TIME_STOPS[timeIndex] ?? TIME_STOPS[0];
  const phaseIndex = getPhaseIndex(hour);
  const playlists = venue.zones.map(({ zone, recommendations }) => ({
    zone,
    ...(recommendations[timeIndex] ?? recommendations[0]),
  }));
  const selectedPlaylist = playlists[focus] ?? playlists[0]!;
  const selectedAudioSource = PREVIEW_AUDIO_BY_PLAYLIST[selectedPlaylist.title]
    ?? '/audio/beat-breeze-demo/daytime.mp3';
  const [accent, accentTwo] = phaseAccents[phaseIndex]!;
  const energy = selectedPlaylist.energy;
  const zoneSummary = playlists
    .map((item) => `${t(`zones.${item.zone}`)} — ${item.title} (${t(`zonePurpose.${item.zone}`)})`)
    .join('; ');
  const brief = useMemo(
    () => t('brief.text', {
      venue: t(`venues.${venueKey}`),
      time: formatHour(hour),
      mood: t(`phases.${phaseIndex}.mood`),
      guidance: t(`guidance.${phaseIndex}`),
      zones: zoneSummary,
    }),
    [hour, phaseIndex, t, venueKey, zoneSummary],
  );

  useEffect(() => {
    setIsMuted(window.sessionStorage.getItem('bmasia-audio-muted') === 'true');
    const storedVolume = Number(window.sessionStorage.getItem('bmasia-audio-volume'));
    if (Number.isFinite(storedVolume) && storedVolume >= 0 && storedVolume <= 1) {
      setVolume(storedVolume);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    resumeAfterSourceChangeRef.current = false;
    audio.pause();
    audio.currentTime = 0;
    setAudioState('idle');
  }, [timeIndex, venueKey]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const shouldResume = resumeAfterSourceChangeRef.current;
    resumeAfterSourceChangeRef.current = false;
    audio.pause();
    audio.currentTime = 0;
    audio.load();
    setAudioState('idle');

    if (shouldResume) {
      void audio.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setAudioState('error');
      });
    }
  }, [selectedAudioSource, selectedPlaylist.title]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume;
  }, [volume]);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setAudioState('paused');
      return;
    }

    try {
      if (audio.ended) audio.currentTime = 0;
      await audio.play();
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setAudioState('error');
    }
  };

  const toggleMuted = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    window.sessionStorage.setItem('bmasia-audio-muted', String(nextMuted));
  };

  const changeVolume = (nextVolume: number) => {
    setVolume(nextVolume);
    window.sessionStorage.setItem('bmasia-audio-volume', String(nextVolume));
    if (nextVolume > 0 && isMuted) {
      setIsMuted(false);
      window.sessionStorage.setItem('bmasia-audio-muted', 'false');
    }
  };

  const selectPlaylist = (index: number) => {
    const audio = audioRef.current;
    resumeAfterSourceChangeRef.current = Boolean(audio && !audio.paused);
    setFocus(index);
  };

  const audioStatus = audioState === 'playing'
    ? t(isMuted ? 'audio.playingMuted' : 'audio.playing')
    : audioState === 'paused'
      ? t('audio.paused')
      : audioState === 'error'
        ? t('audio.unavailable')
        : t('audio.visualOnly');

  const copyBrief = async () => {
    await navigator.clipboard?.writeText(brief);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className={styles.shell}
      style={{ '--phase-a': accent, '--phase-b': accentTwo } as CSSProperties}
    >
      <section className={styles.hero}>
        <div className={`${styles.aurora} ${styles.auroraOne}`} aria-hidden="true" />
        <div className={`${styles.aurora} ${styles.auroraTwo}`} aria-hidden="true" />
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span />{t('hero.eyebrow')}</p>
            <h1><span>{t('hero.title')}</span> <em>{t('hero.highlight')}</em></h1>
            <p className={styles.heroLead}>{t('hero.description')}</p>
            <div className={styles.heroActions}>
              <a href="#choose-path" className={styles.primaryButton}>
                {t('hero.try')} <ArrowDown aria-hidden="true" />
              </a>
              <Link href={`/${locale}/quotation?source=homepage-hero`} className={styles.secondaryButton}>{t('hero.start')}</Link>
            </div>
            <div className={styles.proofRow}>
              {(['proof1', 'proof2', 'proof3'] as const).map((key) => (
                <span key={key}><Check aria-hidden="true" />{t(`hero.${key}`)}</span>
              ))}
            </div>
          </div>

          <div className={styles.livingField} aria-label={t('field.ariaLabel')}>
            <div className={`${styles.orbitRing} ${styles.ringOne}`} aria-hidden="true" />
            <div className={`${styles.orbitRing} ${styles.ringTwo}`} aria-hidden="true" />
            <div className={`${styles.orbitRing} ${styles.ringThree}`} aria-hidden="true" />
            <div className={styles.orbitCore}>
              <span>{formatHour(hour)}</span>
              <strong>{t(`phases.${phaseIndex}.label`)}</strong>
              <small>{t('field.energy', { energy })}</small>
              <Equalizer active={audioState === 'playing'} />
            </div>
            {playlists.map((playlist, index) => {
              const cover = PLAYLIST_COVERS[playlist.title];
              const orbitClass = `${styles.orbitCover} ${[styles.orbitCover1, styles.orbitCover2, styles.orbitCover3][index]}`;
              return cover ? (
                <Image
                  key={`${venueKey}-${timeIndex}-${playlist.zone}`}
                  src={cover}
                  alt=""
                  width={160}
                  height={160}
                  className={orbitClass}
                  aria-hidden="true"
                />
              ) : (
                <span
                  key={`${venueKey}-${timeIndex}-${playlist.zone}`}
                  className={`${orbitClass} ${styles.orbitFallback}`}
                  aria-hidden="true"
                >
                  <Music2 />
                  <small>{playlist.title}</small>
                </span>
              );
            })}
          </div>
        </div>
        <div className={styles.productChoice} id="choose-path">
          <div className={styles.productChoiceIntro}>
            <span>{t('paths.eyebrow')}</span>
            <strong>{t('paths.title')}</strong>
          </div>
          <Link href={`/${locale}/beat-breeze`} className={styles.beatPath}>
            <span><small>{t('paths.beatLabel')}</small><strong>Beat Breeze</strong></span>
            <p>{t('paths.beatText')}</p>
            <ArrowRight aria-hidden="true" />
          </Link>
          <Link href={`/${locale}/soundtrack-your-brand`} className={styles.soundtrackPath}>
            <span><small>{t('paths.soundtrackLabel')}</small><strong>Soundtrack</strong></span>
            <p>{t('paths.soundtrackText')}</p>
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <a className={styles.scrollCue} href="#experience"><span>{t('hero.scroll')}</span><i /></a>
      </section>

      <section className={styles.experience} id="experience">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}><span />{t('demo.eyebrow')}</p>
          <h2>{t('demo.title')} <em>{t('demo.highlight')}</em></h2>
          <p>{t('demo.description')}</p>
        </div>

        <div className={styles.timeMachine}>
          <div className={styles.machineGlow} aria-hidden="true" />
          <div className={styles.machineTopline}>
            <div>
              <p>{t('demo.machineLabel')}</p>
              <strong>{venue.location}</strong>
            </div>
            <span className={styles.livePill}><i />{t('demo.live')}</span>
          </div>

          <div className={styles.venueTabs} role="group" aria-label={t('demo.chooseVenue')}>
            {(Object.keys(VENUES) as VenueKey[]).map((key) => (
              <button
                type="button"
                key={key}
                className={venueKey === key ? styles.active : ''}
                onClick={() => { setVenueKey(key); setFocus(VENUES[key].defaultFocus); }}
                aria-pressed={venueKey === key}
              >
                {t(`venues.${key}`)}
              </button>
            ))}
          </div>

          <div className={styles.timeControl}>
            <div className={styles.timeHeading}>
              <div>
                <span>{t('demo.localTime')}</span>
                <strong>{formatHour(hour)}</strong>
              </div>
              <div className={styles.phaseCopy}>
                <span>{t(`phases.${phaseIndex}.label`)}</span>
                <strong>{t(`phases.${phaseIndex}.mood`)}</strong>
              </div>
            </div>
            <label>
              <span className="sr-only">{t('demo.chooseTime')}</span>
              <input
                className={styles.timeSlider}
                type="range"
                min="0"
                max={TIME_STOPS.length - 1}
                step="1"
                value={timeIndex}
                onChange={(event) => setTimeIndex(Number(event.target.value))}
                style={{ '--time-progress': `${(timeIndex / (TIME_STOPS.length - 1)) * 100}%` } as CSSProperties}
              />
            </label>
            <div className={styles.timeLabels}>
              {TIME_STOPS.map((time) => <span key={time}>{formatHour(time)}</span>)}
            </div>

            <div className={styles.audioPreview}>
              <audio
                ref={audioRef}
                src={selectedAudioSource}
                preload="none"
                muted={isMuted}
                playsInline
                onPlay={() => setAudioState('playing')}
                onPause={() => setAudioState((current) => (current === 'playing' ? 'paused' : current))}
                onEnded={() => setAudioState('idle')}
                onError={() => setAudioState('error')}
              />
              <span className={styles.audioGlyph} aria-hidden="true">
                <Equalizer active={audioState === 'playing'} />
              </span>
              <div className={styles.audioCopy}>
                <strong>{t('audio.title')}</strong>
                <span aria-live="polite">
                  {t('audio.selection', {
                    zone: t(`zones.${selectedPlaylist.zone}`),
                    playlist: selectedPlaylist.title,
                    status: audioStatus,
                  })}
                </span>
              </div>
              <button type="button" className={styles.audioPlay} onClick={toggleAudio}>
                {audioState === 'playing' ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
                {audioState === 'playing' ? t('audio.pause') : t('audio.hear')}
              </button>
              <div className={styles.audioVolume}>
                <label htmlFor="venue-audio-volume" className="sr-only">
                  {t('audio.volume')}
                </label>
                <button
                  type="button"
                  className={styles.audioVolumeToggle}
                  onClick={toggleMuted}
                  aria-label={isMuted ? t('audio.unmute') : t('audio.mute')}
                  aria-pressed={isMuted}
                >
                  {isMuted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
                </button>
                <input
                  id="venue-audio-volume"
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(event) => changeVolume(Number(event.target.value))}
                  style={{ '--audio-volume': `${volume * 100}%` } as CSSProperties}
                />
                <output>{Math.round(volume * 100)}%</output>
              </div>
            </div>
          </div>

          <div className={styles.zonesStage}>
            <div className={styles.pulseField} aria-hidden="true"><i /><i /><i /></div>
            <div className={styles.zonePlanIntro}>
              <div>
                <span>{t('demo.zonePlanEyebrow')}</span>
                <strong>{t('demo.zonePlanTitle')}</strong>
              </div>
              <p>{t('demo.zonePlanDescription')}</p>
            </div>
            {playlists.map((playlist, index) => {
              const cover = PLAYLIST_COVERS[playlist.title];
              return (
                <button
                  type="button"
                  key={`${venueKey}-${timeIndex}-${playlist.zone}`}
                  className={`${styles.playlistCard} ${focus === index ? styles.focused : ''}`}
                  onClick={() => selectPlaylist(index)}
                  aria-pressed={focus === index}
                >
                  <span className={styles.coverWrap}>
                    {cover ? (
                      <Image src={cover} alt="" fill sizes="112px" />
                    ) : (
                      <span className={styles.coverFallback}>
                        <Music2 aria-hidden="true" />
                        <small>{playlist.title}</small>
                      </span>
                    )}
                    <span className={styles.coverEnergy}>{playlist.energy}</span>
                    {focus === index && <span className={styles.coverSelected}><Equalizer active={audioState === 'playing'} /></span>}
                  </span>
                  <span className={styles.zoneName}>
                    <i />
                    {t('demo.zoneLabel', {
                      index: String(index + 1).padStart(2, '0'),
                      zone: t(`zones.${playlist.zone}`),
                    })}
                  </span>
                  <strong>{playlist.title}</strong>
                  <span className={styles.zonePurpose}>{t(`zonePurpose.${playlist.zone}`)}</span>
                  <small>{t('demo.playlistDetail', { energy: playlist.energy, bpm: playlist.bpm })}</small>
                </button>
              );
            })}
          </div>

          <div className={styles.machineFooter}>
            <div className={styles.conciergeNote}>
              <span className={styles.spark}><Sparkles aria-hidden="true" /></span>
              <div>
                <span>{t('demo.concierge')}</span>
                <strong>
                  {t('demo.conciergeReason', {
                    playlist: selectedPlaylist.title,
                    zone: t(`zones.${selectedPlaylist.zone}`),
                    time: formatHour(hour),
                    purpose: t(`zonePurpose.${selectedPlaylist.zone}`),
                    energy: selectedPlaylist.energy,
                    bpm: selectedPlaylist.bpm,
                  })}
                </strong>
              </div>
            </div>
            <div className={styles.energyReadout}>
              <span>{t('demo.energy')}</span>
              <strong>{selectedPlaylist.energy}</strong>
              <div><i style={{ width: `${selectedPlaylist.energy}%` }} /></div>
            </div>
          </div>

          <div className={styles.touchpointRail}>
            <div className={styles.touchpointIntro}>
              <p className={styles.eyebrow}><span />{t('touchpoints.eyebrow')}</p>
              <h3>{t('touchpoints.title')}</h3>
              <p>{t('touchpoints.description')}</p>
            </div>
            <div
              className={styles.touchpointTabs}
              role="tablist"
              aria-label={t('touchpoints.title')}
            >
              {([
                ['sound', Music2],
                ['screens', MonitorPlay],
                ['messages', MessageSquareText],
                ['phone', PhoneCall],
              ] as const).map(([key, Icon]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={activeTouchpoint === key}
                  aria-controls="touchpoint-preview"
                  className={`${styles.touchpointTab} ${activeTouchpoint === key ? styles.touchpointTabActive : ''}`}
                  onClick={() => setActiveTouchpoint(key)}
                >
                  <Icon aria-hidden="true" />
                  <span>{t(`touchpoints.${key}.label`)}</span>
                </button>
              ))}
            </div>
            <div
              id="touchpoint-preview"
              className={styles.touchpointPreview}
              role="tabpanel"
              aria-live="polite"
            >
              <span className={styles.touchpointPreviewIcon} aria-hidden="true">
                {activeTouchpoint === 'sound' && <Music2 />}
                {activeTouchpoint === 'screens' && <MonitorPlay />}
                {activeTouchpoint === 'messages' && <MessageSquareText />}
                {activeTouchpoint === 'phone' && <PhoneCall />}
              </span>
              <div>
                <span>{t('touchpoints.status')}</span>
                <h4>{t(`touchpoints.${activeTouchpoint}.title`)}</h4>
                <p>{t(`touchpoints.${activeTouchpoint}.text`, {
                  playlist: selectedPlaylist.title,
                  zone: t(`zones.${selectedPlaylist.zone}`),
                  time: formatHour(hour),
                  phase: t(`phases.${phaseIndex}.mood`),
                })}</p>
              </div>
              <strong>{formatHour(hour)}</strong>
            </div>
          </div>
        </div>

        <div className={styles.takeaway}>
          <div>
            <p className={styles.eyebrow}><span />{t('brief.eyebrow')}</p>
            <h3>{t('brief.title')}</h3>
            <p>{brief}</p>
          </div>
          <button type="button" className={styles.secondaryButton} onClick={copyBrief}>
            <Copy aria-hidden="true" />{copied ? t('brief.copied') : t('brief.copy')}
          </button>
        </div>

        <div className={styles.routeDecision}>
          <div>
            <p className={styles.eyebrow}><span />{t('paths.resultEyebrow')}</p>
            <h3>{t('paths.resultTitle')}</h3>
            <p>{t('paths.resultText')}</p>
          </div>
          <div>
            <Link href={`/${locale}/beat-breeze`} className={styles.beatDecision}>
              <strong>Beat Breeze</strong><span>{t('paths.beatDecision')}</span><ArrowRight aria-hidden="true" />
            </Link>
            <Link href={`/${locale}/soundtrack-your-brand`} className={styles.soundtrackDecision}>
              <strong>Soundtrack</strong><span>{t('paths.soundtrackDecision')}</span><ArrowRight aria-hidden="true" />
            </Link>
            <Link href={`/${locale}/quotation?source=venue-time-machine`} className={styles.helpDecision}>
              {t('paths.helpDecision')} <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className={styles.connectedReveal}>
          <div className={styles.connectedHeading}>
            <p className={styles.eyebrow}><span />{t('connected.eyebrow')}</p>
            <h3>{t('connected.title')} <em>{t('connected.highlight')}</em></h3>
            <p>{t('connected.description')}</p>
          </div>
          <div className={styles.connectedScene}>
            <div className={styles.connectedCore}>
              <Sparkles aria-hidden="true" />
              <strong>{t('connected.core')}</strong>
              <span>{t('connected.coreText')}</span>
            </div>
            <div className={styles.capabilityGrid}>
              {([
                ['sound', Music2],
                ['screens', MonitorPlay],
                ['messages', MessageSquareText],
                ['calls', PhoneCall],
                ['automation', Workflow],
                ['operations', SlidersHorizontal],
              ] as const).map(([key, Icon]) => (
                <div className={styles.capabilityCard} key={key}>
                  <Icon aria-hidden="true" />
                  <div>
                    <strong>{t(`connected.${key}.title`)}</strong>
                    <span>{t(`connected.${key}.text`)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.story} id="bmasia-story">
        <div className={styles.storyHeading}>
          <p className={styles.eyebrow}><span />{t('story.eyebrow')}</p>
          <h2>{t('story.title')} <em>{t('story.highlight')}</em></h2>
        </div>
        <div className={styles.storyTrack}>
          {(['sound', 'screens', 'messages', 'calls', 'automate', 'control'] as const).map((key, index) => (
            <article key={key}>
              <span>0{index + 1}</span>
              <div className={styles.storyLine}><i className={index === 0 ? styles.storyActive : ''} /></div>
              <h3>{t(`story.${key}.title`)}</h3>
              <p>{t(`story.${key}.text`)}</p>
            </article>
          ))}
        </div>
        <div className={styles.storyCta}>
          <Link href={`/${locale}/how-it-works`}>
            {t('story.cta')} <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
