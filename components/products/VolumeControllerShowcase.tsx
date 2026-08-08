'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Gauge, RadioTower, ShieldCheck, SlidersHorizontal } from 'lucide-react';

type VolumeControllerShowcaseProps = {
  compact?: boolean;
  product?: 'beat-breeze' | 'soundtrack-your-brand';
  theme?: 'beat' | 'neutral' | 'soundtrack';
};

const steps = [
  ['measure', Gauge],
  ['send', RadioTower],
  ['adjust', SlidersHorizontal],
] as const;

export function VolumeControllerShowcase({
  compact = false,
  product = 'beat-breeze',
  theme = 'neutral',
}: VolumeControllerShowcaseProps) {
  const locale = useLocale();
  const t = useTranslations('volumeController');
  const reduceMotion = useReducedMotion();
  const accent = theme === 'soundtrack' ? '#d6c2ff' : theme === 'beat' ? '#49d5c5' : '#efa634';
  const href = `/${locale}/quotation?solution=${product}&source=volume-controller`;

  if (compact) {
    return (
      <motion.aside
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        className="relative mt-8 overflow-hidden border border-white/[0.09] bg-[#07131d]/88 p-5 shadow-[0_24px_60px_rgba(0,0,0,.28)] sm:p-6"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand-orange via-[#e6cf74] to-[#49d5c5]" />
        <div className="grid gap-5 sm:grid-cols-[8rem_1fr] sm:items-center">
          <div className="relative aspect-[3/2] overflow-hidden bg-white">
            <Image src="/images/bmasia-volume-controller.webp" alt={t('imageAlt')} fill sizes="160px" className="object-cover" />
          </div>
          <div>
            <p className="font-label text-[9px] uppercase tracking-[.2em]" style={{ color: accent }}>{t('eyebrow')}</p>
            <h4 className="mt-2 text-xl font-medium text-white">{t('compactTitle')}</h4>
            <p className="mt-2 text-sm leading-6 text-white/48">{t('compactText')}</p>
            <p className="mt-3 flex items-center gap-2 text-xs text-white/58"><ShieldCheck className="h-4 w-4" style={{ color: accent }} />{t('privacy')}</p>
          </div>
        </div>
      </motion.aside>
    );
  }

  return (
    <section className="bma-grain bma-section relative overflow-hidden border-y border-white/[0.08] bg-[#07131d]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_45%,rgba(73,213,197,.12),transparent_28%),radial-gradient(circle_at_14%_30%,rgba(239,166,52,.12),transparent_30%)]" />
      <div className="bma-container relative grid gap-12 lg:grid-cols-[.86fr_1.14fr] lg:items-center lg:gap-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="bma-kicker" style={{ color: accent }}>{t('eyebrow')}</p>
          <h2 className="bma-section-title mt-5 max-w-3xl text-white">{t('title')}</h2>
          <p className="bma-lede mt-6 max-w-2xl">{t('description')}</p>

          <div className="mt-8 grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
            {steps.map(([key, Icon], index) => (
              <div key={key} className="bg-[#091722] p-5">
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5" style={{ color: accent }} />
                  <span className="font-mono text-[10px] text-white/24">0{index + 1}</span>
                </div>
                <strong className="mt-6 block text-sm font-medium text-white/84">{t(`${key}.title`)}</strong>
                <p className="mt-2 text-xs leading-5 text-white/42">{t(`${key}.text`)}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href={href} className="bma-button-primary min-h-14 px-6">{t('cta')} <ArrowRight className="h-4 w-4" /></Link>
            <p className="flex items-center gap-2 text-xs text-white/46"><ShieldCheck className="h-4 w-4" style={{ color: accent }} />{t('privacy')}</p>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: .96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: .65 }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-full blur-3xl" style={{ background: `${accent}14` }} />
          <div className="relative overflow-hidden border border-white/[0.1] bg-white shadow-[0_32px_100px_rgba(0,0,0,.42)]">
            <Image src="/images/bmasia-volume-controller.webp" alt={t('imageAlt')} width={1536} height={1024} className="h-auto w-full" sizes="(max-width: 1023px) 100vw, 50vw" />
          </div>
          <div className="relative -mt-9 ml-5 mr-5 grid grid-cols-2 gap-px overflow-hidden border border-white/[0.09] bg-white/[0.08] shadow-2xl sm:ml-10 sm:mr-0 sm:grid-cols-4">
            {(['live', 'automatic', 'compatible', 'private'] as const).map((key) => (
              <div key={key} className="bg-[#091722]/95 px-4 py-4 backdrop-blur-xl">
                <span className="block h-1 w-6" style={{ background: accent }} />
                <strong className="mt-3 block text-[11px] font-medium leading-4 text-white/68">{t(`proof.${key}`)}</strong>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
