'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { IndustryConfig } from '@/lib/industry-data';

interface Props {
  config: IndustryConfig;
}

export const IndustryPageTemplate: React.FC<Props> = ({ config }) => {
  const t = useTranslations(`industryData.${config.slug}`);
  const tt = useTranslations('industryTemplate');

  const statKeys = Array.from({ length: config.statCount }, (_, i) => `s${i + 1}`);
  const zoneKeys = Array.from({ length: config.zoneCount }, (_, i) => `z${i + 1}`);
  const benefitKeys = Array.from({ length: config.benefitCount }, (_, i) => `b${i + 1}`);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden pt-24">
        <Image
          src={config.heroImage}
          alt={t('headline')}
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-brand-dark/40" />
        <div className="relative z-10 max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
              {t('headline')}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mb-8">
              {t('subheadline')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/quotation" className="font-label text-sm bg-brand-orange hover:bg-brand-orange-dark text-black px-6 py-3 rounded transition-colors font-bold">
                {tt('ctaQuote')}
              </Link>
              <a href="https://calendly.com/bmasia/sound-innovations" target="_blank" rel="noopener noreferrer" className="font-label text-sm border border-white/20 hover:bg-white/10 text-white px-6 py-3 rounded transition-colors font-bold">
                {tt('ctaDemo')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-brand-navy py-16 px-4 md:px-8 border-y border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {statKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-headline text-3xl md:text-4xl text-brand-orange">{t(`stats.${key}.value`)}</p>
              <p className="text-sm text-gray-400 mt-1">{t(`stats.${key}.label`)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ZONES + BENEFITS */}
      <section className="py-12 md:py-16 px-4 md:px-8 lg:px-16 bg-[#0f0f0f]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-headline text-3xl md:text-4xl text-white"
            >
              {t('zonesTitle')}
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5">
            {zoneKeys.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-start gap-4"
              >
                <span className="w-2 h-2 rounded-full bg-brand-orange mt-2.5 flex-shrink-0" />
                <div>
                  <h3 className="font-headline text-xl text-white mb-1">{t(`zones.${key}.name`)}</h3>
                  <p className="text-gray-500 text-sm">{t(`zones.${key}.description`)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Benefits */}
          <div className="mt-14 pt-10 border-t border-white/10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-label text-xs uppercase tracking-widest text-brand-orange mb-8"
            >
              {t('benefitsTitle')}
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefitKeys.map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 flex-shrink-0" />
                  <p className="text-gray-300">{t(`benefits.${key}`)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL STAT */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src={config.editorialImage}
          alt={t('editorialStat')}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h2 className="font-headline text-4xl md:text-5xl text-white mb-4">{t('editorialStat')}</h2>
          <p className="text-brand-orange text-xl">{t('editorialStatSub')}</p>
          <p className="font-label text-gray-500 text-xs mt-4">
            {tt('source')}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-4 md:px-8 lg:px-16 bg-[#0f0f0f] text-center">
        <h2 className="font-headline text-4xl md:text-5xl text-white mb-8">{t('ctaHeadline')}</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          <Link href="/quotation" className="font-label text-brand-orange text-lg hover:text-white transition-colors border-b border-brand-orange/30 pb-1">
            {tt('footerCtaQuote')}
          </Link>
          <a href="https://calendly.com/bmasia/sound-innovations" target="_blank" rel="noopener noreferrer" className="font-label text-white/60 text-lg hover:text-white transition-colors border-b border-white/10 pb-1">
            {tt('footerCtaDemo')}
          </a>
        </div>
      </section>
    </>
  );
};

export default IndustryPageTemplate;
