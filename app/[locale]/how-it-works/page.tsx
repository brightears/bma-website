'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type CSSProperties } from 'react';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, AudioLines, Blend, Check, Map, RadioTower } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { EXTERNAL_LINKS, withAttribution } from '@/lib/external-links';
import styles from './HowItWorks.module.css';

const STEPS = [
  { id: '01', icon: Map, visual: 'brief', outcome: 'experience' },
  { id: '02', icon: AudioLines, visual: 'day', outcome: 'speed' },
  { id: '03', icon: RadioTower, visual: 'system', outcome: 'legal' },
  { id: '04', icon: Blend, visual: 'operate', outcome: 'legal' },
] as const;

const OUTCOMES = ['experience', 'speed', 'legal'] as const;
const DAYPARTS = ['06:30', '12:00', '18:30', '22:00'] as const;

export default function HowItWorksPage() {
  const t = useTranslations('howItWorksPage');
  const immersive = useTranslations('homePage.immersive');
  const beatBreeze = useTranslations('beatBreezePage');
  const soundtrack = useTranslations('soundtrackPage');
  const navigation = useTranslations('navigation');
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState<(typeof STEPS)[number]['id']>('01');
  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: reduceMotion ? { duration: 0 } : { duration: 0.68 },
  };
  const beatBreezeSignup = withAttribution(EXTERNAL_LINKS.beatBreezeSignup, 'how_it_works', 'beat_breeze_trial');

  return (
    <MotionConfig reducedMotion="user">
      <main className={styles.page}>
        <section className={`${styles.hero} bma-grain`}>
          <Image
            src="/images/hero-lounge.webp"
            alt=""
            fill
            priority
            className={styles.heroImage}
            sizes="100vw"
            aria-hidden="true"
          />
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroGlow} aria-hidden="true" />

          <div className={`${styles.heroInner} bma-container`}>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.72 }}
              className={styles.heroCopy}
            >
              <p className="bma-kicker">{t('hero.label')}</p>
              <h1 className={`${styles.heroTitle} bma-page-title`}>
                <span>{t('hero.title')}</span>{' '}
                <em>{t('hero.titleHighlight')}</em>
              </h1>
              <p className={`${styles.heroLede} bma-lede`}>{t('hero.subtitle')}</p>
              <div className={styles.heroActions}>
                <Link href={`/${locale}/quotation?source=how-it-works-hero`} className="bma-button-primary min-h-14 px-7">
                  {t('cta.ctaQuote')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a href="#process" className="bma-button-secondary min-h-14 px-7">
                  {navigation('howItWorks')} <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <div className={styles.heroProof}>
                {OUTCOMES.map((key) => (
                  <span key={key}><Check aria-hidden="true" />{t(`stats.${key}.value`)}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.76, delay: 0.12 }}
              className={styles.heroInstrument}
              aria-hidden="true"
            >
              <div className={styles.instrumentHeader}>
                <div>
                  <span>{t('hero.label')}</span>
                  <strong>{t('stats.sectionTitle')}</strong>
                </div>
                <p><i />04 / 04</p>
              </div>
              <div className={styles.instrumentField}>
                <i className={styles.instrumentOrbitOne} />
                <i className={styles.instrumentOrbitTwo} />
                <i className={styles.instrumentSweep} />
                <div className={styles.instrumentCore}>
                  <span>BMAsia</span>
                  <strong>{t('stats.speed.value')}</strong>
                </div>
                {STEPS.map(({ id, icon: Icon }, index) => (
                  <motion.div
                    key={id}
                    className={`${styles.instrumentNode} ${styles[`instrumentNode${index + 1}`]}`}
                    animate={reduceMotion ? undefined : { y: [0, index % 2 ? 6 : -6, 0] }}
                    transition={{ duration: 4.6 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span>{id}</span>
                    <Icon aria-hidden="true" />
                    <strong>{t(`steps.${id}.title`)}</strong>
                  </motion.div>
                ))}
              </div>
              <div className={styles.instrumentFooter}>
                {OUTCOMES.map((key, index) => (
                  <div key={key}>
                    <span>0{index + 1}</span>
                    <strong>{t(`stats.${key}.value`)}</strong>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="process" className={styles.processSection}>
          <div className={`${styles.processLayout} bma-container`}>
            <motion.header {...reveal} className={styles.processIntro}>
              <p className="bma-kicker">{t('stats.label')}</p>
              <h2 className="bma-section-title">{t('stats.sectionTitle')}</h2>
              <p>{t('stats.experience.desc')}</p>
              <div className={styles.processIndex} aria-hidden="true">
                {STEPS.map(({ id }) => (
                  <span key={id} data-active={activeStep === id}>{id}</span>
                ))}
              </div>
              <motion.div
                key={activeStep}
                initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className={styles.processActive}
                aria-hidden="true"
              >
                <span>{activeStep} / 04</span>
                <strong>{t(`steps.${activeStep}.title`)}</strong>
              </motion.div>
            </motion.header>

            <div className={styles.processStack}>
              {STEPS.map(({ id, icon: Icon, visual, outcome }) => (
                <motion.article
                  key={id}
                  {...reveal}
                  viewport={{ once: false, amount: 0.45 }}
                  onViewportEnter={() => setActiveStep(id)}
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                  className={styles.processCard}
                >
                  <div className={styles.processCopy}>
                    <div className={styles.processMeta}>
                      <span>{id}</span>
                      <Icon aria-hidden="true" />
                    </div>
                    <h3>{t(`steps.${id}.title`)}</h3>
                    <p>{t(`steps.${id}.desc`)}</p>
                  </div>
                  <ProcessVisual
                    visual={visual}
                    stepTitle={t(`steps.${id}.title`)}
                    outcome={t(`stats.${outcome}.value`)}
                  />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.handoffSection}>
          <div className={`${styles.handoffInner} bma-container`}>
            <motion.div {...reveal} className={styles.handoffScene}>
              <Image src="/images/about-studio.webp" alt="" fill className={styles.handoffImage} sizes="(min-width: 1024px) 58vw, 100vw" aria-hidden="true" />
              <div className={styles.handoffOverlay} aria-hidden="true" />
              <div className={styles.handoffSignal} aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className={styles.handoffCaption}>
                <span>{t('stats.label')}</span>
                <strong>{t('steps.04.title')}</strong>
                <p>{t('steps.04.desc')}</p>
              </div>
            </motion.div>

            <motion.div {...reveal} className={styles.outcomeStack}>
              {OUTCOMES.map((key, index) => (
                <article key={key}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{t(`stats.${key}.value`)}</h3>
                    <p>{t(`stats.${key}.desc`)}</p>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className={`${styles.finalSection} bma-grain`}>
          <div className={styles.finalGlow} aria-hidden="true" />
          <div className="bma-container relative">
            <motion.header {...reveal} className={styles.finalHeader}>
              <p className="bma-kicker">{t('hero.label')}</p>
              <h2 className="bma-section-title">{t('cta.title')}</h2>
              <p>{immersive('worlds.description')}</p>
            </motion.header>

            <div className={styles.routeGrid}>
              <motion.article
                {...reveal}
                whileHover={reduceMotion ? undefined : { y: -5 }}
                className={`${styles.routeCard} ${styles.beatRoute}`}
              >
                <Image src="/images/product-bb-hero.webp" alt="" fill className={styles.routeImage} sizes="(min-width: 768px) 50vw, 100vw" aria-hidden="true" />
                <div className={styles.routeOverlay} aria-hidden="true" />
                <div className={styles.routeContent}>
                  <span>{immersive('paths.beatLabel')}</span>
                  <h3>Beat Breeze</h3>
                  <p>{immersive('paths.beatText')}</p>
                  <a href={beatBreezeSignup} className={styles.routeAction}>
                    {beatBreeze('redesign.hero.trial')} <ArrowRight aria-hidden="true" />
                  </a>
                </div>
              </motion.article>

              <motion.article
                {...reveal}
                whileHover={reduceMotion ? undefined : { y: -5 }}
                className={`${styles.routeCard} ${styles.soundtrackRoute}`}
              >
                <Image src="/images/product-syb-hero.webp" alt="" fill className={styles.routeImage} sizes="(min-width: 768px) 50vw, 100vw" aria-hidden="true" />
                <div className={styles.routeOverlay} aria-hidden="true" />
                <div className={styles.routeContent}>
                  <span>{immersive('paths.soundtrackLabel')}</span>
                  <h3>Soundtrack</h3>
                  <p>{immersive('paths.soundtrackText')}</p>
                  <Link href={`/${locale}/soundtrack-trial?source=how-it-works`} className={styles.routeAction}>
                    {soundtrack('redesign.hero.trial')} <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </motion.article>
            </div>

            <motion.div {...reveal} className={styles.consultationRow}>
              <Link href={`/${locale}/quotation?source=how-it-works-final`} className="bma-button-primary min-h-14 px-8">
                {t('cta.ctaQuote')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href={`/${locale}/book-demo?source=how-it-works`} className="bma-button-secondary min-h-14 px-8">
                {t('cta.ctaDemo')}
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}

function ProcessVisual({
  visual,
  stepTitle,
  outcome,
}: {
  visual: (typeof STEPS)[number]['visual'];
  stepTitle: string;
  outcome: string;
}) {
  if (visual === 'brief') {
    return (
      <div className={`${styles.processVisual} ${styles.briefVisual}`} aria-hidden="true">
        <div className={styles.briefPhotoMain}><Image src="/images/hero-hotel.webp" alt="" fill sizes="20rem" /></div>
        <div className={styles.briefPhotoSmall}><Image src="/images/hero-restaurant.webp" alt="" fill sizes="10rem" /></div>
        <div className={styles.briefNote}>
          <span>01 / 04</span>
          <strong>{stepTitle}</strong>
          <i /><i /><i />
        </div>
      </div>
    );
  }

  if (visual === 'day') {
    return (
      <div className={`${styles.processVisual} ${styles.dayVisual}`} aria-hidden="true">
        <div className={styles.dayHeader}><span>{stepTitle}</span><strong>{outcome}</strong></div>
        <div className={styles.dayBars}>
          {DAYPARTS.map((time, index) => (
            <div key={time}>
              <span>{time}</span>
              <i style={{ '--bar-height': `${38 + index * 15}%` } as CSSProperties} />
            </div>
          ))}
        </div>
        <div className={styles.daySweep} />
      </div>
    );
  }

  if (visual === 'system') {
    return (
      <div className={`${styles.processVisual} ${styles.systemVisual}`} aria-hidden="true">
        <div className={styles.systemCore}><span>BMAsia</span><strong>{stepTitle}</strong></div>
        <div className={`${styles.systemNode} ${styles.systemBeat}`}><i />Beat Breeze</div>
        <div className={`${styles.systemNode} ${styles.systemSoundtrack}`}><i />Soundtrack</div>
        <div className={styles.systemBeamOne} />
        <div className={styles.systemBeamTwo} />
      </div>
    );
  }

  if (visual === 'operate') {
    return (
      <div className={`${styles.processVisual} ${styles.operateVisual}`} aria-hidden="true">
        <div className={styles.operateHeader}><span>{stepTitle}</span><i /></div>
        {DAYPARTS.slice(0, 3).map((time, index) => (
          <div className={styles.operateRow} key={time}>
            <span>{time}</span>
            <div><strong>{outcome}</strong><i style={{ width: `${46 + index * 19}%` }} /></div>
            <em>0{index + 1}</em>
          </div>
        ))}
        <div className={styles.operateScan} />
      </div>
    );
  }

  const exhaustiveVisual: never = visual;
  return exhaustiveVisual;
}
