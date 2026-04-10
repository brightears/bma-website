'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const STEP_NUMBERS = ['01', '02', '03', '04'] as const;
const STAT_KEYS = ['experience', 'speed', 'legal'] as const;

export default function HowItWorksPage() {
  const t = useTranslations('howItWorksPage');

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-hotel.webp"
            alt="Luxury hotel lobby with warm ambient lighting"
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-transparent to-[#0f0f0f]" />
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
              <h1 className="font-headline text-5xl md:text-7xl leading-tight mb-8 text-white">
                {t('hero.title')} <br />
                <span className="italic text-brand-orange">{t('hero.titleHighlight')}</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-20 md:py-32 bg-[#0f0f0f]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col space-y-20 md:space-y-32">
            {STEP_NUMBERS.map((num, i) => (
              <div key={num}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start border-t border-white/10 pt-10 md:pt-12"
                >
                  <div className="md:col-span-2">
                    <span className="font-headline text-6xl md:text-8xl text-white/15">{num}</span>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="font-headline text-2xl md:text-4xl text-white mb-4 md:mb-0">{t(`steps.${num}.title`)}</h3>
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-lg text-white/60 leading-relaxed">
                      {t(`steps.${num}.desc`)}
                    </p>
                  </div>
                </motion.div>

                {/* Image break after step 2 */}
                {i === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-64 md:h-96 mt-20 md:mt-32 overflow-hidden relative"
                  >
                    <Image
                      src="/images/hero-cafe.webp"
                      alt="Warm café interior with ambient lighting"
                      fill
                      className="object-cover opacity-50 grayscale"
                      sizes="100vw"
                    />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 md:py-32 bg-[#0f0f0f] border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-16 md:mb-24"
          >
            <span className="font-label text-brand-orange text-sm tracking-[0.3em] uppercase mb-6 block">
              {t('stats.label')}
            </span>
            <h2 className="font-headline text-4xl md:text-5xl leading-tight text-white">
              {t('stats.sectionTitle')}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {STAT_KEYS.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border-l border-white/10 pl-8"
              >
                <h4 className="font-headline text-4xl md:text-5xl text-brand-orange mb-4">{t(`stats.${key}.value`)}</h4>
                <p className="text-lg text-white/50 leading-relaxed">{t(`stats.${key}.desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-36 bg-[#0f0f0f] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/hero-restaurant.webp"
            alt="Restaurant atmosphere"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-headline text-4xl md:text-5xl text-white mb-12">
              {t('cta.title')}
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <Link href="/quotation" className="px-12 py-5 bg-brand-orange text-black font-label font-bold text-lg tracking-wide hover:bg-white transition-all duration-300">
                {t('cta.ctaQuote')}
              </Link>
              <a
                href="https://calendly.com/bmasia/sound-innovations"
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-5 border border-white text-white font-label font-bold text-lg tracking-wide hover:bg-white hover:text-black transition-all duration-300"
              >
                {t('cta.ctaDemo')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
