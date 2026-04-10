'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Layers,
  Calendar,
  Megaphone,
  Smartphone,
  CloudOff,
  ShieldCheck,
  Sparkles,
  Network,
  Wrench,
  Router,
  MonitorSmartphone,
  Apple,
  Speaker,
  Cable,
  Headphones,
  Music,
  Bot,
  Plus,
} from 'lucide-react';

const VALUE_PROP_KEYS = ['01', '02', '03'] as const;

const FEATURES = [
  { Icon: Layers, key: 'multiZone' },
  { Icon: Calendar, key: 'scheduling' },
  { Icon: Megaphone, key: 'audioMessaging' },
  { Icon: Smartphone, key: 'mobileApps' },
  { Icon: CloudOff, key: 'offlineReady' },
  { Icon: ShieldCheck, key: 'enterpriseSecurity' },
] as const;

const INTEGRATIONS = [
  { Icon: Sparkles, key: 'aiPlaylist' },
  { Icon: Network, key: 'smartBuilding' },
  { Icon: Wrench, key: 'bespoke' },
] as const;

const DEVICES = [
  { Icon: Router, key: 'soundtrackPlayer' },
  { Icon: MonitorSmartphone, key: 'windows' },
  { Icon: Smartphone, key: 'androidIos' },
  { Icon: Apple, key: 'macos' },
  { Icon: Speaker, key: 'sonos' },
  { Icon: Cable, key: 'qsys' },
] as const;

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const;

const SUPPORT = [
  { Icon: Headphones, key: 'technical' },
  { Icon: Music, key: 'musicDesign' },
  { Icon: Bot, key: 'aiAssist' },
] as const;

export default function SoundtrackYourBrandPage() {
  const t = useTranslations('soundtrackPage');

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/product-syb-hero.webp"
            alt="Premium hotel lobby with ambient music"
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

      {/* AI & Custom Integrations */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 max-w-3xl"
          >
            <span className="font-label text-brand-orange text-xs tracking-[0.2em] uppercase block mb-4">
              {t('integrations.sectionLabel')}
            </span>
            <h2 className="font-headline text-4xl md:text-5xl text-white [text-wrap:balance] mb-6">{t('integrations.sectionTitle')}</h2>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed">
              {t('integrations.sectionDesc')}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INTEGRATIONS.map((item, i) => {
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
                  <h4 className="font-headline text-xl text-white mb-3 [text-wrap:balance]">{t(`integrations.${item.key}.title`)}</h4>
                  <p className="text-base text-white/50 leading-relaxed">{t(`integrations.${item.key}.desc`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Licensing Clarity */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#121212] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-headline text-4xl md:text-5xl text-white [text-wrap:balance] mb-4">{t('licensing.sectionTitle')}</h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              {t('licensing.sectionDesc')}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#0f0f0f] p-10 md:p-12 border-t-4 border-brand-orange"
            >
              <h4 className="font-label text-xs font-bold tracking-[0.2em] uppercase text-brand-orange mb-8">
                {t('licensing.included.label')}
              </h4>
              <ul className="space-y-5">
                {(['item1', 'item2', 'item3', 'item4', 'item5'] as const).map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="text-brand-orange mt-1">✓</span>
                    <span className="text-white/80">{t(`licensing.included.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#0f0f0f] p-10 md:p-12 border-t-4 border-white/20"
            >
              <h4 className="font-label text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-8">
                {t('licensing.separate.label')}
              </h4>
              <p className="text-white/70 mb-6 leading-relaxed">
                {t('licensing.separate.desc')}{' '}
                <span className="text-brand-orange">{t('licensing.separate.descHighlight')}</span>{' '}
                {t('licensing.separate.descTail')}
              </p>
              <div className="bg-white/5 p-6 border-l-2 border-brand-orange mt-8">
                <p className="font-label text-[10px] tracking-widest uppercase text-brand-orange mb-2">
                  {t('licensing.separate.calloutLabel')}
                </p>
                <p className="text-sm text-white/60 leading-relaxed">
                  {t('licensing.separate.calloutDesc')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Supported Devices */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-label text-brand-orange text-xs tracking-[0.2em] uppercase block mb-4">
              {t('devices.sectionLabel')}
            </span>
            <h2 className="font-headline text-4xl md:text-5xl text-white [text-wrap:balance]">{t('devices.sectionTitle')}</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {DEVICES.map((device, i) => {
              const Icon = device.Icon;
              return (
                <motion.div
                  key={device.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-[#161616] p-8 text-center border-t border-white/5"
                >
                  <Icon className="text-brand-orange w-10 h-10 mb-4 mx-auto" strokeWidth={1.5} />
                  <h4 className="font-label text-sm font-bold tracking-widest uppercase text-white mb-3 [text-wrap:balance]">
                    {t(`devices.${device.key}.title`)}
                  </h4>
                  <p className="text-sm text-white/50 leading-relaxed">{t(`devices.${device.key}.desc`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trial & Onboarding */}
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
            src="/images/hero-lounge.webp"
            alt="Atmospheric hospitality venue"
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
