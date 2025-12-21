'use client';

import { motion } from 'framer-motion';
import { MessageSquareQuote, Palette, Settings, TrendingUp, Heart, Music, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { PROCESS_STEPS, VALUE_PILLARS } from '@/lib/constants';

/**
 * Map of step numbers to their corresponding Lucide icons
 */
const stepIcons: Record<number, LucideIcon> = {
  1: MessageSquareQuote,
  2: Palette,
  3: Settings,
};

/**
 * Map of icon names to Lucide React components for value pillars
 */
const pillarIconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Heart,
  Music,
};

/**
 * Animation variants for the container with staggered children
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

/**
 * Animation variants for individual step cards
 */
const stepCardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/**
 * Animation variants for the step number circle
 */
const stepNumberVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

/**
 * Animation variants for value pillar cards
 */
const pillarCardVariants = {
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

interface ProcessStepCardProps {
  step: number;
  title: string;
  description: string;
  isLast: boolean;
}

/**
 * Individual process step card with timeline connector
 */
const ProcessStepCard: React.FC<ProcessStepCardProps> = ({
  step,
  title,
  description,
  isLast,
}) => {
  const IconComponent = stepIcons[step] || MessageSquareQuote;

  return (
    <motion.div
      variants={stepCardVariants}
      className="relative flex gap-6 md:gap-8"
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center">
        {/* Step number circle */}
        <motion.div
          variants={stepNumberVariants}
          className="relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center shadow-lg shadow-brand-orange/30"
          aria-label={`Step ${step}`}
        >
          <span className="text-xl md:text-2xl font-bold text-white">
            {step}
          </span>
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-0.5 bg-gradient-to-b from-brand-orange/50 to-brand-orange/10 flex-grow mt-4"
          />
        )}
      </div>

      {/* Content card */}
      <motion.article
        whileHover={{ x: 8, transition: { duration: 0.3 } }}
        className="group flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 mb-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
      >
        {/* Icon container */}
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-brand-orange/20 to-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <IconComponent
            className="w-6 h-6 md:w-7 md:h-7 text-brand-orange"
            aria-hidden="true"
          />
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 leading-relaxed">
          {description}
        </p>

        {/* Decorative gradient overlay on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.article>
    </motion.div>
  );
};

interface ValuePillarCardProps {
  title: string;
  description: string;
  icon: string;
}

/**
 * Individual value pillar card component
 */
const ValuePillarCard: React.FC<ValuePillarCardProps> = ({
  title,
  description,
  icon,
}) => {
  const IconComponent = pillarIconMap[icon] || Music;

  return (
    <motion.article
      variants={pillarCardVariants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Icon container */}
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <IconComponent
          className="w-7 h-7 md:w-8 md:h-8 text-white"
          aria-hidden="true"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
        {title}
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
 * How It Works Page Component
 *
 * Displays the three-step process for getting started with BMAsia:
 * 1. Choose Your Sound & Get A Quote
 * 2. Customize Your Playlist
 * 3. Setup & Master The System
 *
 * Features:
 * - Hero section with dark gradient background
 * - Vertical timeline layout with animated connectors
 * - Glassmorphism step cards with icons
 * - Benefits section showing value pillars
 * - Demo CTA section with dual buttons
 * - Scroll-triggered staggered animations
 * - Fully responsive design
 * - Accessible with proper ARIA labels and heading hierarchy
 */
export default function HowItWorksPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-navy to-brand-dark" />

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
              How It{' '}
              <span className="gradient-text">Works</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Harmonizing Your Space in 3 Simple Steps
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section
        className="relative py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden"
        aria-labelledby="process-steps-heading"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-navy to-brand-dark" />

        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Left side glow */}
          <div className="absolute top-1/3 -left-40 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl" />
          {/* Right side glow */}
          <div className="absolute bottom-1/3 -right-40 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-12 md:mb-16"
          >
            <h2
              id="process-steps-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Your Journey to{' '}
              <span className="gradient-text">Perfect Sound</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Getting started with BMAsia is simple. Follow these three steps to transform your space.
            </p>
          </motion.div>

          {/* Timeline with steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative"
            role="list"
            aria-label="Process steps"
          >
            {PROCESS_STEPS.map((processStep, index) => (
              <ProcessStepCard
                key={processStep.step}
                step={processStep.step}
                title={processStep.title}
                description={processStep.description}
                isLast={index === PROCESS_STEPS.length - 1}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        className="relative py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden"
        aria-labelledby="benefits-heading"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-navy to-brand-navy" />

        {/* Decorative background elements - hidden on mobile to prevent overflow */}
        <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle radial gradient for depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-3xl" />
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
              id="benefits-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Why Choose{' '}
              <span className="gradient-text">BMAsia</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Discover the transformative power of professionally curated music
            </p>
          </motion.div>

          {/* Value pillars grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {VALUE_PILLARS.map((pillar) => (
              <ValuePillarCard
                key={pillar.title}
                title={pillar.title}
                description={pillar.description}
                icon={pillar.icon}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Demo CTA Section */}
      <section
        className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden"
        aria-labelledby="cta-heading"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-dark to-brand-dark" />

        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {/* Top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-orange/10 rounded-full blur-3xl" />
          {/* Bottom pattern */}
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
              Ready to Transform{' '}
              <span className="gradient-text">Your Space?</span>
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Take the first step towards creating the perfect atmosphere for your business. Our team is ready to help you find the ideal music solution.
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
