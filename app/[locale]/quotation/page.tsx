'use client';

import { motion } from 'framer-motion';
import { Mail, Clock, CheckCircle, Music, Zap, Shield } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { QuotationForm } from '@/components/forms';
import { PRODUCTS, SITE, SOCIAL } from '@/lib/constants';
import { WhatsAppLink, LineLink } from '@/components/icons';

/**
 * Animation variants for the container with staggered children
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

/**
 * Animation variants for individual items
 */
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Animation variants for product cards
 */
const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * What to expect items data
 */
const EXPECTATIONS = [
  {
    icon: Clock,
    title: 'Fast Response',
    description: 'Receive your personalized quote within 24-48 hours',
  },
  {
    icon: CheckCircle,
    title: 'No Obligation',
    description: 'Free consultation with no commitment required',
  },
  {
    icon: Shield,
    title: 'Tailored Solutions',
    description: 'Custom pricing based on your specific needs',
  },
] as const;

/**
 * Product overview cards data
 */
const PRODUCT_CARDS = [
  {
    name: PRODUCTS.soundtrackYourBrand.name,
    tagline: PRODUCTS.soundtrackYourBrand.tagline,
    highlights: ['100M+ tracks', 'Spotify sync', 'Bespoke design'],
    icon: Music,
  },
  {
    name: PRODUCTS.beatBreeze.name,
    tagline: PRODUCTS.beatBreeze.tagline,
    highlights: ['30K+ tracks', '50 playlists', 'License included'],
    icon: Zap,
  },
] as const;

/**
 * Quotation Page Component
 *
 * A comprehensive quotation request page featuring:
 * - Hero section with heading and description
 * - Two-column layout with information and form
 * - "What to Expect" section
 * - Product overview cards
 * - Contact information
 * - Glassmorphism form container
 *
 * Features:
 * - Dark gradient background with decorative elements
 * - Scroll-triggered staggered animations
 * - Fully responsive design
 * - Accessible with proper ARIA labels and heading hierarchy
 */
export default function QuotationPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 px-4 md:px-8 lg:px-16 overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/hero-spa.webp"
          alt="Luxury spa setting with relaxing atmosphere"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-navy/40 to-brand-dark/80" />

        {/* Decorative background elements - hidden on mobile to prevent overflow */}
        <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
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
              Request a{' '}
              <span className="bg-gradient-to-r from-brand-orange to-amber-400 bg-clip-text text-transparent">
                Quote
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Provide your details and we'll respond with a personalized
              quotation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section
        className="relative py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden"
        aria-labelledby="quotation-form-heading"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-navy to-brand-dark" />

        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {/* Left side glow */}
          <div className="absolute top-1/4 -left-40 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl" />
          {/* Right side glow */}
          <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Information */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="space-y-10"
            >
              {/* What to Expect Section */}
              <motion.div variants={itemVariants}>
                <h2
                  id="quotation-form-heading"
                  className="text-2xl md:text-3xl font-bold text-white mb-6"
                >
                  What to{' '}
                  <span className="bg-gradient-to-r from-brand-orange to-amber-400 bg-clip-text text-transparent">
                    Expect
                  </span>
                </h2>
                <div className="space-y-4">
                  {EXPECTATIONS.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={item.title}
                        variants={itemVariants}
                        className="flex items-start gap-4"
                      >
                        <div className="w-10 h-10 rounded-lg bg-brand-orange/20 flex items-center justify-center flex-shrink-0">
                          <IconComponent
                            className="w-5 h-5 text-brand-orange"
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {item.title}
                          </h3>
                          <p className="text-gray-400">{item.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Product Overview Section */}
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Our{' '}
                  <span className="bg-gradient-to-r from-brand-orange to-amber-400 bg-clip-text text-transparent">
                    Solutions
                  </span>
                </h2>
                <div className="space-y-4">
                  {PRODUCT_CARDS.map((product) => {
                    const IconComponent = product.icon;
                    return (
                      <motion.article
                        key={product.name}
                        variants={cardVariants}
                        whileHover={{ x: 8, transition: { duration: 0.2 } }}
                        className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <IconComponent
                              className="w-6 h-6 text-white"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white">
                              {product.name}
                            </h3>
                            <p className="text-sm text-brand-orange mb-2">
                              {product.tagline}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {product.highlights.map((highlight) => (
                                <span
                                  key={highlight}
                                  className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full"
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
                <Link href="/how-it-works">
                  <motion.span
                    whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-2 text-brand-orange hover:text-brand-orange-light mt-4 text-sm font-medium transition-colors"
                  >
                    Learn more about our solutions
                    <span aria-hidden="true">&rarr;</span>
                  </motion.span>
                </Link>
              </motion.div>

              {/* Contact Information */}
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Have{' '}
                  <span className="bg-gradient-to-r from-brand-orange to-amber-400 bg-clip-text text-transparent">
                    Questions?
                  </span>
                </h2>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5 space-y-4">
                  {/* Email contact */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-orange/20 flex items-center justify-center">
                      <Mail
                        className="w-6 h-6 text-brand-orange"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">
                        Reach out to us directly
                      </p>
                      <a
                        href={`mailto:${SITE.email}`}
                        className="text-white font-medium hover:text-brand-orange transition-colors"
                      >
                        {SITE.email}
                      </a>
                    </div>
                  </div>
                  {/* Messaging icons */}
                  <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                    <span className="text-gray-400 text-sm">Or message us:</span>
                    <div className="flex items-center gap-4">
                      <WhatsAppLink href={SOCIAL.whatsapp} size={24} />
                      <LineLink href={SOCIAL.line} size={24} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              {/* Glassmorphism form container */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
                <div className="mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                    Quotation Request Form
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Fill in your details below and we'll get back to you with a
                    personalized quote.
                  </p>
                </div>
                <QuotationForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden"
        aria-labelledby="demo-cta-heading"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-navy to-brand-dark" />

        {/* Decorative elements - hidden on mobile to prevent overflow */}
        <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-orange/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2
              id="demo-cta-heading"
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
            >
              Prefer a{' '}
              <span className="bg-gradient-to-r from-brand-orange to-amber-400 bg-clip-text text-transparent">
                Live Demo?
              </span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
              Book a free online demo with our team to see our music solutions
              in action and get answers to all your questions.
            </p>
            <Link href="/#demo">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
              >
                Book Free Demo
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
