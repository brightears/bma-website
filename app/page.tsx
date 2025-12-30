'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SITE, STATS } from '@/lib/constants';
import { ValuePillars, ProductCards, SmartFeatures, ClientLogos, CalendlyEmbed, AboutSection, ContactSection } from '@/components/sections';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/hero-lounge.webp"
          alt=""
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-navy/70 to-brand-dark" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {/* Soundwave bars animation */}
          <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 flex items-end justify-center gap-1 opacity-20">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-brand-orange rounded-full"
                initial={{ height: 20 }}
                animate={{ height: [20, Math.random() * 100 + 20, 20] }}
                transition={{
                  duration: 1 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.05,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-max px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-semibold text-lg mb-4 tracking-[0.25em] uppercase animate-tagline-shimmer"
            >
              {SITE.tagline}
            </motion.p>

            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Transform Your Space with the{' '}
              <span className="gradient-text">Perfect Soundtrack</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
              Elevate your business atmosphere with customized background music
              that influences guest behavior and creates unforgettable experiences.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/quotation"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary text-lg px-8 py-4"
              >
                Get a Quote
              </motion.a>
              <motion.a
                href="#demo"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                Book Free Demo
              </motion.a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto"
          >
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-orange">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Value Pillars Section */}
      <ValuePillars />

      {/* Product Cards Section */}
      <ProductCards />

      {/* Smart Features Section */}
      <SmartFeatures />

      {/* Client Logos Section */}
      <ClientLogos />

      {/* Calendly Demo Booking Section */}
      <CalendlyEmbed />

      {/* About Section */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
