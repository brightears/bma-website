'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  ShieldCheck,
  Wallet,
  Headset,
  MonitorSmartphone,
  Globe,
  Smartphone,
  CloudOff,
  Calendar,
  Megaphone,
  Palette,
  Wrench,
  Headphones,
  Music,
  Bot,
  Plus,
} from 'lucide-react';

const VALUE_PROP_KEYS = ['01', '02', '03'] as const;

const FEATURES = [
  { Icon: ShieldCheck, key: 'zeroLicensing' },
  { Icon: Palette, key: 'curation' },
  { Icon: CloudOff, key: 'offline' },
  { Icon: Calendar, key: 'scheduling' },
  { Icon: Megaphone, key: 'audioSignatures' },
  { Icon: Headset, key: 'remoteMgmt' },
] as const;

const PLATFORMS = [
  { Icon: MonitorSmartphone, key: 'windows' },
  { Icon: Smartphone, key: 'android' },
  { Icon: Globe, key: 'web' },
] as const;

const CUSTOM = [
  { Icon: Palette, key: 'whiteLabel' },
  { Icon: Wrench, key: 'customBuilds' },
  { Icon: Wallet, key: 'volumePricing' },
] as const;

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const;

const SUPPORT = [
  { Icon: Headphones, key: 'technical' },
  { Icon: Music, key: 'musicDesign' },
  { Icon: Bot, key: 'aiAssist' },
] as const;

export default function BeatBreezePage() {
  const t = useTranslations('beatBreezePage');

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/product-bb-hero.webp"
            alt="Beat Breeze by BMAsia"
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-label text-brand-orange text-sm tracking-[0.3em] uppercase mb-6 block">
                {t('hero.label')}
              </span>
              <h1 className="font-headline text-5xl md:text-7xl leading-none tracking-tight text-white mb-6">
                {t('hero.title')} <br />
                <span className="italic text-brand-orange">{t('hero.titleHighlight')}</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/60 max-w-xl leading-relaxed mb-10">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quotation"
                  className="bg-brand-orange text-black px-10 py-4 font-label font-bold uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 text-center"
                >
                  {t('hero.ctaQuote')}
                </Link>
                <Link
                  href="#trial"
                  className="border border-white/20 text-white px-10 py-4 font-label font-bold uppercase tracking-widest text-sm hover:border-brand-orange hover:text-brand-orange transition-all duration-300 text-center"
                >
                  {t('hero.ctaTrial')}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0f0f0f] border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-headline text-3xl md:text-5xl leading-tight text-white/90 [text-wrap:balance]"
          >
            {t('positioning.text1')}
            {' '}
            <span className="italic text-brand-orange">{t('positioning.highlight')}</span>
            {' '}
            {t('positioning.text2')}
          </motion.p>
        </div>
      </section>

      {/* Core Value Props */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {VALUE_PROP_KEYS.map((num, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 md:p-12"
              >
                <span className="font-label text-brand-orange text-xs tracking-[0.2em] uppercase block mb-4">
                  {num} / {t(`valueProps.${num}.label`)}
                </span>
                <h3 className="font-headline text-2xl md:text-3xl text-white mb-4 [text-wrap:balance]">{t(`valueProps.${num}.title`)}</h3>
                <p className="text-lg text-white/50 leading-relaxed">{t(`valueProps.${num}.desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#121212] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="font-label text-brand-orange text-xs tracking-[0.2em] uppercase block mb-4">
              {t('features.sectionLabel')}
            </span>
            <h2 className="font-headline text-4xl md:text-5xl text-white [text-wrap:balance]">{t('features.sectionTitle')}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {FEATURES.map((feature, i) => {
              const Icon = feature.Icon;
              return (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-[#121212] p-10 md:p-12"
                >
                  <Icon className="text-brand-orange w-10 h-10 mb-6" strokeWidth={1.5} />
                  <h4 className="font-label text-sm font-bold tracking-widest uppercase text-white mb-3 [text-wrap:balance]">{t(`features.${feature.key}.title`)}</h4>
                  <p className="text-base text-white/60 leading-relaxed">{t(`features.${feature.key}.desc`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Licensing Clarity — BB version, all-inclusive */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0f0f0f]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-headline text-4xl md:text-5xl text-white [text-wrap:balance] mb-4">
              {t('licensing.sectionTitle')} <span className="italic text-brand-orange">{t('licensing.sectionTitleHighlight')}</span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              {t('licensing.sectionDesc')}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#161616] p-10 md:p-14 border-t-4 border-brand-orange"
          >
            <ul className="space-y-6">
              {(['recording', 'publishing', 'performance'] as const).map((k) => (
                <li key={k} className="flex items-start gap-4">
                  <ShieldCheck className="text-brand-orange w-6 h-6 flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-label text-sm font-bold tracking-widest uppercase text-white mb-1">{t(`licensing.${k}.title`)}</h4>
                    <p className="text-white/60">{t(`licensing.${k}.desc`)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 pt-8 border-t border-white/5">
              <p className="text-base text-white/70 leading-relaxed">
                {t('licensing.footnote1')}{' '}
                <Link href="/soundtrack-your-brand" className="text-brand-orange hover:underline">{t('licensing.footnoteLink')}</Link>{' '}
                {t('licensing.footnote2')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#121212] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-label text-brand-orange text-xs tracking-[0.2em] uppercase block mb-4">
              {t('platforms.sectionLabel')}
            </span>
            <h2 className="font-headline text-4xl md:text-5xl text-white [text-wrap:balance]">{t('platforms.sectionTitle')}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PLATFORMS.map((platform, i) => {
              const Icon = platform.Icon;
              return (
                <motion.div
                  key={platform.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[#0f0f0f] p-10 text-center border-t border-white/5"
                >
                  <Icon className="text-brand-orange w-12 h-12 mb-6 mx-auto" strokeWidth={1.5} />
                  <h4 className="font-headline text-2xl text-white mb-4 [text-wrap:balance]">{t(`platforms.${platform.key}.title`)}</h4>
                  <p className="text-base text-white/50 leading-relaxed">{t(`platforms.${platform.key}.desc`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom & Scale */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 max-w-3xl"
          >
            <span className="font-label text-brand-orange text-xs tracking-[0.2em] uppercase block mb-4">
              {t('custom.sectionLabel')}
            </span>
            <h2 className="font-headline text-4xl md:text-5xl text-white [text-wrap:balance] mb-6">{t('custom.sectionTitle')}</h2>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed">
              {t('custom.sectionDesc')}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CUSTOM.map((item, i) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border-l-2 border-brand-orange/30 pl-8"
                >
                  <Icon className="text-brand-orange w-8 h-8 mb-4" strokeWidth={1.5} />
                  <h4 className="font-headline text-xl text-white mb-3 [text-wrap:balance]">{t(`custom.${item.key}.title`)}</h4>
                  <p className="text-base text-white/50 leading-relaxed">{t(`custom.${item.key}.desc`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trial */}
      <section id="trial" className="py-20 md:py-32 px-6 md:px-12 bg-[#0f0f0f] border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-label text-brand-orange text-xs tracking-[0.2em] uppercase block mb-6">
              {t('trial.sectionLabel')}
            </span>
            <h2 className="font-headline text-4xl md:text-6xl text-white mb-8 leading-tight [text-wrap:balance]">
              {t('trial.title')} <span className="italic text-brand-orange">{t('trial.titleHighlight')}</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/60 leading-relaxed mb-4">
              {t('trial.desc1')}
            </p>
            <p className="text-lg text-white/40 leading-relaxed mb-12">
              {t('trial.desc2')}
            </p>
            <Link
              href="/quotation"
              className="inline-block bg-brand-orange text-black px-12 py-5 font-label font-bold uppercase tracking-widest hover:bg-white transition-all duration-300"
            >
              {t('trial.cta')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Support */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-label text-brand-orange text-xs tracking-[0.2em] uppercase block mb-4">
              {t('support.sectionLabel')}
            </span>
            <h2 className="font-headline text-4xl md:text-5xl text-white [text-wrap:balance]">{t('support.sectionTitle')}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {SUPPORT.map((item, i) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center md:text-left"
                >
                  <Icon className="text-brand-orange w-10 h-10 mb-6 mx-auto md:mx-0" strokeWidth={1.5} />
                  <h4 className="font-headline text-2xl text-white mb-4 [text-wrap:balance]">{t(`support.${item.key}.title`)}</h4>
                  <p className="text-base text-white/50 leading-relaxed">{t(`support.${item.key}.desc`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#121212] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-headline text-4xl md:text-5xl text-white [text-wrap:balance] mb-16 text-center"
          >
            {t('faq.title')}
          </motion.h2>
          <div className="space-y-6">
            {FAQ_KEYS.map((fk, i) => (
              <motion.details
                key={fk}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group border-b border-white/10 pb-6"
              >
                <summary className="flex justify-between items-start cursor-pointer list-none">
                  <h5 className="font-headline text-xl md:text-2xl text-white pr-8 [text-wrap:balance]">{t(`faq.${fk}.q`)}</h5>
                  <Plus className="text-brand-orange w-6 h-6 flex-shrink-0 group-open:rotate-45 transition-transform" strokeWidth={1.5} />
                </summary>
                <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed pr-8">
                  {t(`faq.${fk}.a`)}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[#0f0f0f]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-cafe.webp"
            alt="Atmospheric venue with background music"
            fill
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/80 to-[#0f0f0f]/40" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-headline text-4xl md:text-6xl text-white mb-8 leading-tight [text-wrap:balance]">
              {t('finalCta.title')} <br />
              <span className="italic text-brand-orange">{t('finalCta.titleHighlight')}</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
              {t('finalCta.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quotation"
                className="bg-brand-orange text-black px-12 py-5 font-label font-bold uppercase tracking-widest hover:bg-white transition-all duration-300"
              >
                {t('finalCta.ctaQuote')}
              </Link>
              <a
                href="https://calendly.com/bmasia/sound-innovations"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 text-white px-12 py-5 font-label font-bold uppercase tracking-widest hover:border-brand-orange hover:text-brand-orange transition-all duration-300"
              >
                {t('finalCta.ctaDemo')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
