'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  ClientLogos,
  CalendlyEmbed,
  ContactSection,
  HeroChat,
  ProblemStatement,
  SolutionsSplit,
  IndustriesGrid,
  HowWeWork,
} from '@/components/sections';

export default function Home() {
  const t = useTranslations('hero');
  const tStats = useTranslations('stats');

  return (
    <>
      {/* ===== HERO (100vh) ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/hero-lounge.webp"
          alt={t('imageAlt')}
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
        {/* Gradient overlay — heavier on left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/70 to-brand-dark/40" />

        {/* Animated soundwave at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 flex items-end justify-center gap-[2px] opacity-15" aria-hidden="true">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="w-[2px] bg-brand-orange rounded-full"
              initial={{ height: 8 }}
              animate={{ height: [8, Math.random() * 60 + 12, 8] }}
              transition={{
                duration: 1.2 + Math.random() * 0.6,
                repeat: Infinity,
                delay: i * 0.04,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Content — asymmetric, left-aligned */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-label text-brand-orange font-semibold text-sm md:text-base tracking-[0.2em] uppercase mb-6"
             
            >
              {t('tagline')}
            </motion.p>

            {/* Main heading — cinematic, serif */}
            <h1
              className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]"
             
            >
              {t('headline')}{' '}
              <span className="gradient-text">{t('headlineHighlight')}</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
              Licensed music for hotels, restaurants, retail, and beyond — designed, managed, and always on brand.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quotation">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg shadow-brand-orange/25"
                >
                  {t('ctaQuote')}
                </motion.span>
              </Link>
              <motion.a
                href="#demo"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-colors text-center"
              >
                {t('ctaDemo')}
              </motion.a>
            </div>

            {/* AI Chat prompt */}
            <HeroChat />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5"
          >
            <div className="w-0.5 h-1.5 bg-white/40 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== SOCIAL PROOF BAR ===== */}
      <ClientLogos />

      {/* ===== THE PROBLEM ===== */}
      <ProblemStatement />

      {/* ===== TWO SOLUTIONS SPLIT ===== */}
      <SolutionsSplit />

      {/* ===== INDUSTRIES GRID ===== */}
      <IndustriesGrid />

      {/* ===== HOW WE WORK ===== */}
      <HowWeWork />

      {/* ===== DEMO BOOKING ===== */}
      <CalendlyEmbed />

      {/* ===== FINAL CTA / CONTACT ===== */}
      <ContactSection />
    </>
  );
}
