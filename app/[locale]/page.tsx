'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { HeroChat, ClientLogos } from '@/components/sections';

/**
 * BMAsia Homepage — Cinematic Conversion-Optimized
 * Design source: Google Stitch (Variant B Conversion-Optimized)
 * HTML/CSS ported directly from Stitch output
 */
export default function Home() {
  const t = useTranslations('hero');

  return (
    <>
      {/* ===== 2. HERO SECTION (from Stitch) ===== */}
      <section className="relative h-screen flex items-center overflow-hidden pt-16">
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
        <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10 flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline text-white leading-[1.05] mb-8">
              {t('headline')}{' '}
              <br />
              <span className="italic text-brand-orange">{t('headlineHighlight')}</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
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
        </div>
      </section>

      {/* ===== 3. SOCIAL PROOF BAR ===== */}
      <ClientLogos />

      {/* ===== AI CHAT INTERFACE ===== */}
      <section className="py-12 px-4 md:px-8 bg-[#0f0f0f]">
        <div className="max-w-2xl mx-auto">
          <HeroChat />
        </div>
      </section>

      {/* ===== 4. THE PROBLEM (from Stitch) ===== */}
      <section className="min-h-screen relative flex items-center overflow-hidden bg-[#0f0f0f]">
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
            <h2 className="text-5xl md:text-7xl font-headline text-white mb-8 leading-tight">
              Your Guests Can <br /><span className="italic">Hear the Difference</span>
            </h2>
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-7xl font-headline text-brand-orange">37%</span>
              <p className="text-xl text-gray-300">revenue impact when music is <br />designed intentionally.</p>
            </div>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Most venues play background noise. We curate sonic identities that increase dwell time, average check size, and brand recall. Silence isn&apos;t golden; the right sound is.
            </p>
            <Link href="/licensing" className="inline-flex items-center gap-2 text-brand-orange font-label font-bold border-b border-brand-orange/30 pb-1 hover:border-brand-orange transition-all">
              Learn How Our Method Works →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== 5. TWO SOLUTIONS (from Stitch) ===== */}
      <section className="min-h-screen flex flex-col md:flex-row border-t border-white/10 relative">
        {/* Soundtrack Your Brand — RED */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 relative group overflow-hidden flex flex-col justify-end p-12 border-r border-white/5"
        >
          <div className="absolute inset-0 z-0">
            <Image src="/images/product-syb-hero.webp" alt="Soundtrack Your Brand in a premium venue" fill className="object-cover opacity-30 group-hover:scale-110 transition-transform duration-1000" sizes="50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </div>
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-brand-red/20 text-brand-red font-label text-xs uppercase tracking-widest rounded mb-4">
              The Global Standard
            </span>
            <h3 className="text-4xl font-headline text-white mb-4">Soundtrack Your Brand</h3>
            <p className="text-gray-400 mb-6">The world&apos;s largest commercial music library for business.</p>
            <ul className="space-y-4 mb-6">
              {['100M+ tracks — any artist, any genre', 'Recording + publishing licenses included', 'Drag-and-drop scheduling + Spotify sync', 'Bespoke music design, refreshed quarterly'].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red text-xs">✓</span>
                  {feature}
                </li>
              ))}
              <li className="flex items-center gap-3 text-amber-300 text-sm">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs">!</span>
                Public performance license required separately
              </li>
            </ul>
            <Link href="/quotation">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full text-center bg-brand-red hover:bg-brand-red-dark text-white font-label font-bold py-4 rounded-lg transition-all shadow-lg shadow-brand-red/20"
              >
                Explore Soundtrack
              </motion.span>
            </Link>
            <a href="/listen" className="block text-center mt-3 text-sm text-gray-500 hover:text-brand-red font-label transition-colors">
              Listen to samples →
            </a>
          </div>
        </motion.div>

        {/* Beat Breeze — GOLD */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex-1 relative group overflow-hidden flex flex-col justify-end p-12"
        >
          <div className="absolute inset-0 z-0">
            <Image src="/images/product-bb-hero.webp" alt="Beat Breeze in a cozy venue" fill className="object-cover opacity-30 group-hover:scale-110 transition-transform duration-1000" sizes="50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </div>
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-brand-orange/20 text-brand-orange font-label text-xs uppercase tracking-widest rounded mb-4">
              All-Inclusive Curation
            </span>
            <h3 className="text-4xl font-headline text-white mb-4">Beat Breeze</h3>
            <p className="text-gray-400 mb-6">Fully licensed background music — zero hassle.</p>
            <ul className="space-y-4 mb-6">
              {['30,000+ royalty-free tracks — ALL 3 licenses included', 'No collection society fees, no compliance paperwork', 'Bespoke curation by our music designers', 'Offline-capable, multi-zone scheduling'].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange text-xs">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/quotation">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full text-center bg-brand-orange hover:bg-amber-400 text-black font-label font-bold py-4 rounded-lg transition-all shadow-lg shadow-brand-orange/20"
              >
                Explore Beat Breeze
              </motion.span>
            </Link>
            <a href="/listen" className="block text-center mt-3 text-sm text-gray-500 hover:text-brand-orange font-label transition-colors">
              Listen to samples →
            </a>
          </div>
        </motion.div>

        {/* Center divider */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
          <div className="bg-[#0f0f0f] border border-white/10 px-6 py-3 rounded-full shadow-2xl">
            <p className="font-label text-xs text-gray-500 whitespace-nowrap">
              Not sure? <Link href="/quotation" className="text-brand-orange hover:underline">Talk to us</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ===== 6. INDUSTRIES GRID (from Stitch) ===== */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="text-5xl font-headline text-white mb-6 leading-tight">
              Tailored Sound for <br />Every Space
            </h2>
            <p className="text-gray-400">
              We don&apos;t believe in one-size-fits-all. Every industry requires a specific frequency and mood to maximize performance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Hotels & Resorts', desc: 'Elevate guest loyalty with signature lobby scores.', href: '/solutions/hotels', img: '/images/hero-hotel.webp' },
              { title: 'Restaurants & Bars', desc: 'Curate the energy from brunch to late-night lounge.', href: '/solutions/restaurants', img: '/images/hero-restaurant.webp' },
              { title: 'Retail & Fashion', desc: 'Drive brand affinity with rhythmic, fashion-forward sound.', href: '/solutions/retail', img: '/images/hero-retail.webp' },
              { title: 'Cafés & Coffee Shops', desc: 'The perfect acoustic backdrop for work and social flow.', href: '/quotation', img: '/images/hero-cafe.webp' },
              { title: 'Medical & Wellness', desc: 'Reduce anxiety and enhance serenity with bio-sonic design.', href: '/quotation', img: '/images/hero-medical.webp' },
              { title: 'Gyms & Fitness', desc: 'High-energy BPM tracks designed to push performance limits.', href: '/quotation', img: '/images/hero-gym.webp' },
            ].map((industry) => (
              <Link key={industry.title} href={industry.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
                >
                  <Image
                    src={industry.img}
                    alt={industry.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-black/20 transition-all" />
                  <div className="absolute bottom-8 left-8">
                    <h4 className="text-2xl font-headline text-white mb-2">{industry.title}</h4>
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity mb-4">{industry.desc}</p>
                    <span className="text-brand-orange font-label text-sm flex items-center gap-2">
                      Explore →
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. HOW IT WORKS (from Stitch) ===== */}
      <section className="py-24 bg-brand-navy relative overflow-hidden">
        <div className="container mx-auto px-8 relative z-10">
          <h2 className="text-center text-5xl font-headline text-white mb-24">The BMAsia Journey</h2>
          <div className="grid md:grid-cols-3 gap-16 relative">
            {/* Connector Line — positioned below the numbers */}
            <div className="hidden md:block absolute top-[5.5rem] left-0 w-full h-[1px] bg-brand-orange/20">
              <div className="w-1/3 h-full bg-brand-orange/40" />
            </div>
            {[
              { num: '01', title: 'We Listen', desc: 'Our music designers analyze your brand DNA, guest demographics, and venue acoustics.' },
              { num: '02', title: 'We Design', desc: 'We curate a multi-layered sonic schedule that evolves throughout the day and week.' },
              { num: '03', title: 'We Deliver', desc: 'Using smart hardware or software, your music plays flawlessly across all your locations.' },
            ].map((step) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="text-7xl font-headline text-brand-orange/20 mb-6">{step.num}</div>
                <h3 className="text-2xl font-headline text-white mb-4">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. TRUSTED BY ===== */}
      <ClientLogos />

      {/* ===== 9. FINAL CTA (from Stitch) ===== */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden" id="demo">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, rgba(239, 166, 52, 0.15) 0%, rgba(15, 15, 15, 1) 70%)' }} />
        <div className="container mx-auto px-8 text-center relative z-10">
          <h2 className="text-6xl md:text-9xl font-headline text-white mb-12">
            Let&apos;s Design <br />
            <span className="italic text-brand-orange">Your Sound</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-20">
            <Link href="/quotation">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-brand-orange hover:bg-amber-400 text-black px-12 py-5 rounded-full font-label font-bold text-lg transition-all shadow-2xl shadow-brand-orange/30"
              >
                Get a Quote
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
              Book a Free Demo
            </motion.a>
          </div>
          <div className="grid md:grid-cols-3 gap-8 pt-20 border-t border-white/5 max-w-4xl mx-auto">
            <div>
              <p className="font-label text-xs uppercase text-gray-500 mb-2">Email Us</p>
              <p className="text-lg text-white">info@bmasiamusic.com</p>
            </div>
            <div>
              <p className="font-label text-xs uppercase text-gray-500 mb-2">Reach Us</p>
              <p className="text-lg text-white">Bangkok · Singapore · Hong Kong</p>
            </div>
            <div className="flex justify-center gap-6">
              <a href="https://wa.me/66632377765" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-orange transition-colors text-sm font-label">WhatsApp</a>
              <a href="https://lin.ee/GKG9FGX" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-orange transition-colors text-sm font-label">LINE</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
