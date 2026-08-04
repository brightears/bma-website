'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Check, CircleDot, MailCheck, ShieldCheck } from 'lucide-react';
import { SoundtrackTrialForm } from '@/components/forms/SoundtrackTrialForm';

const STEPS = [
  { key: 'request', Icon: CircleDot },
  { key: 'verify', Icon: ShieldCheck },
  { key: 'access', Icon: MailCheck },
] as const;

export default function SoundtrackTrialPage() {
  const t = useTranslations('soundtrackTrialPage');

  return (
    <div className="relative overflow-hidden bg-[#14091d] px-6 pb-24 pt-32 sm:px-10 md:pt-40 lg:px-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 top-8 h-[34rem] w-[34rem] rounded-full bg-[#8c66bf]/16 blur-3xl" />
        <div className="absolute -right-48 top-48 h-[38rem] w-[38rem] rounded-full bg-[#d6c2ff]/10 blur-3xl" />
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_center,transparent_0,transparent_42%,rgba(214,194,255,.12)_42.2%,transparent_42.7%)] [background-size:34rem_34rem]" />
      </div>

      <div className="relative mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="lg:sticky lg:top-36 lg:self-start">
          <p className="font-label text-[11px] uppercase tracking-[0.28em] text-[#d6c2ff]">{t('hero.label')}</p>
          <h1 className="mt-6 max-w-2xl text-balance font-headline text-[clamp(3.2rem,7vw,6.7rem)] font-medium leading-[0.92] tracking-[-0.055em] text-white">
            {t('hero.title')} <span className="text-[#d6c2ff]">{t('hero.titleHighlight')}</span>
          </h1>
          <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-white/58 sm:text-xl">{t('hero.subtitle')}</p>

          <div className="mt-9 flex flex-wrap gap-2.5">
            {(['noCard', 'oneZone'] as const).map((key) => (
              <span key={key} className="inline-flex items-center gap-2 rounded-full border border-[#d6c2ff]/16 bg-[#d6c2ff]/[0.055] px-4 py-2 text-sm text-white/62">
                <Check className="h-3.5 w-3.5 text-[#d6c2ff]" aria-hidden="true" /> {t(`proof.${key}`)}
              </span>
            ))}
          </div>

          <div className="mt-14 border-t border-[#d6c2ff]/12 pt-8">
            <p className="font-label text-[10px] uppercase tracking-[0.24em] text-white/34">{t('steps.label')}</p>
            <ol className="mt-6 space-y-6">
              {STEPS.map(({ key, Icon }, index) => (
                <li key={key} className="grid grid-cols-[3rem_1fr] gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d6c2ff]/16 bg-[#d6c2ff]/[0.055] text-[#d6c2ff]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white"><span className="mr-2 font-mono text-[#d6c2ff]/64">0{index + 1}</span>{t(`steps.${key}Title`)}</p>
                    <p className="mt-1 text-sm leading-6 text-white/42">{t(`steps.${key}Desc`)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 rounded-2xl border border-[#d6c2ff]/14 bg-[#d6c2ff]/[0.045] p-5">
            <p className="text-sm font-medium text-white">{t('note.title')}</p>
            <p className="mt-2 text-sm leading-6 text-white/44">{t('note.desc')}</p>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}>
          <SoundtrackTrialForm />
        </motion.section>
      </div>
    </div>
  );
}
