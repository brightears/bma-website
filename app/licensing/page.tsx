'use client';

import { motion } from 'framer-motion';
import {
  Disc3,
  FileText,
  Users,
  AlertTriangle,
  Shield,
  CheckCircle2,
  LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { LICENSE_TYPES, PRODUCTS } from '@/lib/constants';

/**
 * Map of license types to their corresponding Lucide icons
 */
const licenseIcons: Record<string, LucideIcon> = {
  'Recording License': Disc3,
  'Publishing License': FileText,
  'Public Performance License': Users,
};

/**
 * Consumer streaming services that are NOT licensed for business use
 */
const CONSUMER_STREAMING_SERVICES = [
  'Spotify',
  'Apple Music',
  'YouTube Music',
  'Amazon Music',
  'Tidal',
  'Deezer',
] as const;

/**
 * Animation variants for the container with staggered children
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

/**
 * Animation variants for individual cards
 */
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/**
 * Animation variants for list items
 */
const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

interface LicenseCardProps {
  name: string;
  description: string;
}

/**
 * Individual license type card with glassmorphism styling
 */
const LicenseCard: React.FC<LicenseCardProps> = ({ name, description }) => {
  const IconComponent = licenseIcons[name] || FileText;

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Icon container with gradient background */}
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <IconComponent
          className="w-7 h-7 md:w-8 md:h-8 text-white"
          aria-hidden="true"
        />
      </div>

      {/* License name */}
      <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
        {name}
      </h3>

      {/* Description */}
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>

      {/* Decorative gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.article>
  );
};

/**
 * Licensing Page Component
 *
 * Explains music licensing requirements for businesses:
 * - Three types of licenses needed (Recording, Publishing, Public Performance)
 * - Warning about consumer streaming services
 * - How BMAsia solutions include all necessary licensing
 *
 * Features:
 * - Hero section with dark gradient background
 * - License types displayed as glassmorphism cards
 * - Warning section with alert styling
 * - Solution section referencing BMAsia products
 * - CTA section linking to quotation page
 * - Scroll-triggered staggered animations
 * - Fully responsive design
 * - Accessible with proper ARIA labels and heading hierarchy
 */
export default function LicensingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-navy to-brand-dark" />

        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Radial gradient for depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-3xl" />
          {/* Additional glow effect */}
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-navy/50 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Music Licensing{' '}
              <span className="gradient-text">Made Simple</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Understanding the licenses your business needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section
        className="relative py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden"
        aria-labelledby="intro-heading"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-navy to-brand-dark" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center"
          >
            <h2
              id="intro-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Why Does Your Business{' '}
              <span className="gradient-text">Need Licenses?</span>
            </h2>

            <div className="space-y-4 text-gray-300 text-lg md:text-xl leading-relaxed">
              <p>
                Playing music in a business is different from listening at home. When you use music commercially, you need permission from the rights holders who created that music.
              </p>
              <p className="font-semibold text-white">
                To legally play music in your business, you need{' '}
                <span className="text-brand-orange">three different licenses</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* License Types Section */}
      <section
        className="relative py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden"
        aria-labelledby="license-types-heading"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-navy to-brand-navy" />

        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Left side glow */}
          <div className="absolute top-1/3 -left-40 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl" />
          {/* Right side glow */}
          <div className="absolute bottom-1/3 -right-40 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-12 md:mb-16"
          >
            <h2
              id="license-types-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              The Three{' '}
              <span className="gradient-text">Essential Licenses</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Each license protects different rights holders and ensures fair compensation
            </p>
          </motion.div>

          {/* License cards grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {LICENSE_TYPES.map((license) => (
              <LicenseCard
                key={license.name}
                name={license.name}
                description={license.description}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Warning Section */}
      <section
        className="relative py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden"
        aria-labelledby="warning-heading"
      >
        {/* Background with warning accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-dark to-brand-dark" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative bg-gradient-to-br from-red-500/10 via-orange-500/10 to-amber-500/5 backdrop-blur-lg border border-red-500/30 rounded-2xl p-8 md:p-12"
            role="alert"
            aria-live="polite"
          >
            {/* Warning icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                <AlertTriangle
                  className="w-8 h-8 md:w-10 md:h-10 text-red-400"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Warning heading */}
            <h2
              id="warning-heading"
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white mb-6"
            >
              Consumer Streaming Services Are{' '}
              <span className="text-red-400">NOT</span>{' '}
              Licensed for Business Use
            </h2>

            {/* Services list */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              {CONSUMER_STREAMING_SERVICES.map((service) => (
                <motion.span
                  key={service}
                  variants={listItemVariants}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-300"
                >
                  <span className="w-2 h-2 rounded-full bg-red-400" aria-hidden="true" />
                  {service}
                </motion.span>
              ))}
            </motion.div>

            {/* Explanation */}
            <div className="space-y-4 text-center text-gray-300">
              <p className="text-lg leading-relaxed">
                These services are licensed for <span className="text-white font-semibold">personal use only</span>.
                Using them in a commercial setting violates their terms of service and can expose your business to legal liability.
              </p>

              {/* Spotify terms citation */}
              <blockquote className="relative mt-6 px-6 py-4 bg-white/5 rounded-lg border-l-4 border-brand-orange italic text-gray-400">
                <p className="text-sm md:text-base">
                  &ldquo;The Spotify Service and the Content are the property of Spotify or Spotify&apos;s licensors. We grant you a limited, non-exclusive, revocable licence to make <span className="text-white not-italic font-medium">personal, non-commercial use</span> of the Spotify Service...&rdquo;
                </p>
                <footer className="mt-2 text-xs text-gray-500 not-italic">
                  - Spotify Terms of Service
                </footer>
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section
        className="relative py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden"
        aria-labelledby="solution-heading"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-navy to-brand-dark" />

        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-brand-orange to-amber-500 mb-6">
              <Shield
                className="w-8 h-8 md:w-10 md:h-10 text-white"
                aria-hidden="true"
              />
            </div>

            <h2
              id="solution-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              BMAsia Solutions Include{' '}
              <span className="gradient-text">All Licensing</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              When you choose BMAsia, you get fully licensed music without the hassle
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'All three license types included',
                'No separate PRO negotiations',
                'No hidden fees or extra costs',
                'Full legal protection for your business',
                'Worry-free commercial music playback',
                'Coverage for all your locations',
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    className="w-6 h-6 text-brand-orange flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-gray-300 text-lg">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Product cards summary */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {/* Soundtrack Your Brand */}
            <motion.article
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="relative bg-white/5 backdrop-blur-lg border border-brand-orange/50 rounded-2xl p-6 md:p-8 hover:border-brand-orange transition-all duration-300"
            >
              <div className="absolute -top-3 left-6 px-4 py-1 bg-gradient-to-r from-brand-orange to-amber-500 rounded-full text-xs font-semibold text-white uppercase tracking-wider">
                Premium
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 mt-2">
                {PRODUCTS.soundtrackYourBrand.name}
              </h3>
              <p className="text-brand-orange mb-4">
                {PRODUCTS.soundtrackYourBrand.tagline}
              </p>
              <p className="text-gray-400 mb-6">
                Access over 100 million tracks with complete licensing included. Perfect for brands that want premium music curation.
              </p>

              <Link href="/quotation">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block w-full text-center bg-brand-orange hover:bg-brand-orange-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  Get a Quote
                </motion.span>
              </Link>
            </motion.article>

            {/* Beat Breeze */}
            <motion.article
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                {PRODUCTS.beatBreeze.name}
              </h3>
              <p className="text-gray-400 mb-4">
                {PRODUCTS.beatBreeze.tagline}
              </p>
              <p className="text-gray-400 mb-6">
                Over 30,000 curated tracks with public performance license included. Ideal for cost-conscious businesses.
              </p>

              <Link href="/quotation">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block w-full text-center bg-white/10 hover:bg-white/20 text-white border border-white/10 px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  Get a Quote
                </motion.span>
              </Link>
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden"
        aria-labelledby="cta-heading"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-navy to-brand-dark" />

        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-orange/10 rounded-full blur-3xl" />
          {/* Bottom pattern - sound wave visualization */}
          <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center gap-1 opacity-10">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-brand-orange rounded-full"
                initial={{ height: 16 }}
                animate={{ height: [16, Math.random() * 60 + 20, 16] }}
                transition={{
                  duration: 1.5 + Math.random() * 0.5,
                  repeat: Infinity,
                  delay: i * 0.05,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Heading */}
            <h2
              id="cta-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Get Started with{' '}
              <span className="gradient-text">Licensed Music</span>
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Protect your business and enjoy premium music with complete peace of mind. Get a personalized quote today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quotation">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-brand-orange/30"
                >
                  Get a Quote
                </motion.span>
              </Link>
              <Link href="/#demo">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                >
                  Book Free Demo
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
