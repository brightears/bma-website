'use client';

import { motion } from 'framer-motion';
import { Timer, CloudSun, Sparkles, LucideIcon } from 'lucide-react';

/**
 * Feature type definition
 */
interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * Smart features data
 */
const FEATURES: Feature[] = [
  {
    icon: Timer,
    title: 'Smart Scheduling',
    description:
      'Preprogram volume levels, automatic adjustments based on business hours, and regional adaptations like prayer time pauses.',
  },
  {
    icon: CloudSun,
    title: 'Context-Aware Music',
    description:
      'Music that adapts to weather conditions, syncs with lighting systems, and responds to real-time data feeds.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Playlists',
    description:
      'Simply describe what you want — our AI creates the perfect playlist. No music expertise needed.',
  },
];

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
 * Animation variants for individual feature cards
 */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
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
 * Individual Feature Card Component
 */
interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const IconComponent = feature.icon;

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative flex flex-col h-full bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
    >
      {/* Icon */}
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-white" aria-hidden="true" />
      </div>

      {/* Content */}
      <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
        {feature.title}
      </h3>
      <p className="text-gray-400 text-base md:text-lg leading-relaxed flex-grow">
        {feature.description}
      </p>

      {/* Decorative gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 bg-gradient-to-br from-brand-orange/10 via-transparent to-transparent opacity-0 group-hover:opacity-100" />
    </motion.article>
  );
};

/**
 * SmartFeatures Section Component
 *
 * Showcases BMAsia's intelligent automation capabilities:
 * - Smart Scheduling (volume presets, prayer times)
 * - Context-Aware Music (weather, lighting, data feeds)
 * - AI-Powered Playlists (describe and create)
 *
 * Features:
 * - Scroll-triggered staggered animations
 * - Glassmorphism card design
 * - Responsive 3-column grid layout
 * - CTA button linking to demo booking
 */
export const SmartFeatures: React.FC = () => {
  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden"
      aria-labelledby="smart-features-heading"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-dark to-brand-dark" />

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
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
            id="smart-features-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Music That{' '}
            <span className="gradient-text">Works For You</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Intelligent automation that adapts your soundtrack to your business
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          <motion.button
            onClick={scrollToDemo}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            Book a Demo
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SmartFeatures;
