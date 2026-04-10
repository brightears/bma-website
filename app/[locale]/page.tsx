'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ClientLogos } from '@/components/sections';
import { FloatingChatButton } from '@/components/chat/FloatingChatButton';

/**
 * BMAsia Homepage — Cinematic Conversion-Optimized
 * Design source: Google Stitch (Variant B Conversion-Optimized)
 * HTML/CSS ported directly from Stitch output
 */
export default function Home() {
  const t = useTranslations('hero');
  const h = useTranslations('homePage');

  return (
    <>
      {/* ===== 2. HERO SECTION (from Stitch) ===== */}
      <section className="relative h-[calc(100svh-4rem)] md:h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-lounge.webp"
            alt="Luxurious dark hotel lobby bar with warm amber lighting and high-end modern furniture"
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent" />
        </div>
        <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-headline text-white leading-[1.05] mb-6">
            {t('headline')}{' '}
            <br />
            <span className="italic text-brand-orange">{t('headlineHighlight')}</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-xl">
            {t('subheading')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/quotation">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-amber-400 text-black px-8 py-4 rounded-full font-label font-bold transition-all shadow-lg shadow-brand-orange/20"
              >
                {t('ctaQuote')}
              </motion.span>
            </Link>
            <motion.a
              href="#demo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/20 hover:bg-white/5 text-white px-8 py-4 rounded-full font-label font-bold transition-all"
            >
              {t('ctaDemo')}
            </motion.a>
          </div>
        </div>
      </section>

      {/* ===== 3. SOCIAL PROOF BAR ===== */}
      <ClientLogos />

      {/* ===== 4. THE PROBLEM (from Stitch) ===== */}
      <section className="min-h-screen relative flex items-center overflow-hidden bg-[#0f0f0f] pb-20 md:pb-0">
        <div className="container mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden group"
          >
            <Image
              src="/images/hero-lounge.webp"
              alt="Moody close-up of a sophisticated cocktail bar"
              width={800}
              height={600}
              className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-brand-orange/10 mix-blend-overlay" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className="text-4xl md:text-5xl font-headline text-white mb-8 leading-tight">
              {h('theProblem.title')} <br /><span className="italic">{h('theProblem.titleHighlight')}</span>
            </h2>
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-7xl font-headline text-brand-orange">{h('theProblem.statNumber')}</span>
              <p className="text-xl text-gray-300">{h('theProblem.statDesc')}</p>
            </div>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              {h('theProblem.paragraph')}
            </p>
            <p className="text-gray-500 text-sm italic">
              {h('theProblem.source')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== 5. TWO SOLUTIONS (Stitch editorial cards) ===== */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0f0f0f] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-headline text-4xl md:text-5xl text-white leading-none tracking-tight mb-6">
              {h('twoSolutions.sectionTitle')} <span className="italic text-brand-orange">{h('twoSolutions.sectionTitleHighlight')}</span>
            </h2>
            <p className="text-xl text-white/50 max-w-2xl leading-relaxed">
              {h('twoSolutions.sectionSubtitle')}
            </p>
          </motion.div>

          {/* Product cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Card 1: Soundtrack Your Brand (Premium) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-brand-red/20 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl" />
              <div className="relative flex flex-col h-full bg-[#161616] border border-white/10 p-8 md:p-12">
                <div className="mb-10">
                  <span className="font-label text-xs tracking-[0.3em] text-brand-red font-bold uppercase block mb-4">{h('twoSolutions.syb.badge')}</span>
                  <h3 className="text-3xl md:text-4xl font-headline text-white mb-4">{h('twoSolutions.syb.title')}</h3>
                  <p className="text-lg text-white/50 leading-relaxed italic">
                    {h('twoSolutions.syb.tagline')}
                  </p>
                </div>
                <ul className="space-y-5 mb-10 flex-grow">
                  {(['feature1', 'feature2', 'feature3', 'feature4'] as const).map((key) => (
                    <li key={key} className="flex items-start gap-4 text-white/80">
                      <span className="w-5 h-5 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red text-xs mt-0.5 flex-shrink-0">✓</span>
                      <span>{h(`twoSolutions.syb.${key}`)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8 border-t border-white/5">
                  <p className="flex items-center gap-2 mb-6 text-white/40 text-sm italic">
                    <span className="text-amber-400">⚠</span>
                    {h('twoSolutions.syb.licenseNote')}
                  </p>
                  <Link href="/soundtrack-your-brand">
                    <motion.span
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="block w-full text-center bg-brand-red hover:bg-brand-red-dark text-white py-4 font-label text-sm font-bold tracking-widest uppercase transition-all"
                    >
                      {h('twoSolutions.syb.cta')}
                    </motion.span>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Beat Breeze (Essential) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-brand-orange/20 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl" />
              <div className="relative flex flex-col h-full bg-[#161616] border border-white/10 p-8 md:p-12">
                <div className="mb-10">
                  <span className="font-label text-xs tracking-[0.3em] text-brand-orange font-bold uppercase block mb-4">{h('twoSolutions.bb.badge')}</span>
                  <h3 className="text-3xl md:text-4xl font-headline text-white mb-4">{h('twoSolutions.bb.title')}</h3>
                  <p className="text-lg text-white/50 leading-relaxed italic">
                    {h('twoSolutions.bb.tagline')}
                  </p>
                </div>
                <ul className="space-y-5 mb-10 flex-grow">
                  {(['feature1', 'feature2', 'feature3', 'feature4'] as const).map((key) => (
                    <li key={key} className="flex items-start gap-4 text-white/80">
                      <span className="w-5 h-5 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange text-xs mt-0.5 flex-shrink-0">✓</span>
                      <span>{h(`twoSolutions.bb.${key}`)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8 border-t border-white/5">
                  <div className="mt-6">
                    <Link href="/beat-breeze">
                      <motion.span
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="block w-full text-center bg-brand-orange hover:bg-amber-400 text-black py-4 font-label text-sm font-bold tracking-widest uppercase transition-all"
                      >
                        {h('twoSolutions.bb.cta')}
                      </motion.span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <Link href="/quotation" className="font-headline text-2xl md:text-3xl text-white group inline-block">
              {h('twoSolutions.notSurePrefix')}{' '}
              <span className="text-brand-orange underline decoration-white/20 underline-offset-8 group-hover:decoration-brand-orange transition-all duration-300">
                {h('twoSolutions.notSureCta')}
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== 6. INDUSTRIES GRID (from Stitch) ===== */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl md:text-5xl font-headline text-white mb-6 leading-tight">
              {h('industries.sectionTitle')}
            </h2>
            <p className="text-gray-400">
              {h('industries.sectionSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {([
              { key: 'hotels', href: '/solutions/hotels', img: '/images/hero-hotel.webp' },
              { key: 'restaurants', href: '/solutions/restaurants', img: '/images/hero-restaurant.webp' },
              { key: 'retail', href: '/solutions/retail', img: '/images/hero-retail.webp' },
              { key: 'cafes', href: '/solutions/cafes', img: '/images/hero-cafe.webp' },
              { key: 'medical', href: '/solutions/medical', img: '/images/hero-medical.webp' },
              { key: 'gyms', href: '/solutions/gyms', img: '/images/hero-gym.webp' },
            ] as const).map((industry) => (
              <Link key={industry.key} href={industry.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
                >
                  <Image
                    src={industry.img}
                    alt={h(`industries.${industry.key}.title`)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-black/20 transition-all" />
                  <div className="absolute bottom-8 left-8">
                    <h3 className="text-2xl font-headline text-white mb-2">{h(`industries.${industry.key}.title`)}</h3>
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity mb-4">{h(`industries.${industry.key}.desc`)}</p>
                    <span className="text-brand-orange font-label text-sm flex items-center gap-2">
                      {h('industries.exploreCta')}
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. FINAL CTA (from Stitch) ===== */}
      <section className="py-24 md:py-36 relative flex items-center justify-center overflow-hidden" id="demo">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, rgba(239, 166, 52, 0.15) 0%, rgba(15, 15, 15, 1) 70%)' }} />
        <div className="container mx-auto px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-headline text-white mb-12">
            {h('finalCta.title')} <br />
            <span className="italic text-brand-orange">{h('finalCta.titleHighlight')}</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-20">
            <Link href="/quotation">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-brand-orange hover:bg-amber-400 text-black px-12 py-5 rounded-full font-label font-bold text-lg transition-all shadow-2xl shadow-brand-orange/30"
              >
                {h('finalCta.ctaQuote')}
              </motion.span>
            </Link>
            <motion.a
              href="https://calendly.com/bmasia/sound-innovations"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/20 hover:bg-white/5 text-white px-12 py-5 rounded-full font-label font-bold text-lg transition-all"
            >
              {h('finalCta.ctaDemo')}
            </motion.a>
          </div>
        </div>
      </section>

      {/* Floating chat button — mobile only, appears after scrolling */}
      <FloatingChatButton />
    </>
  );
}
