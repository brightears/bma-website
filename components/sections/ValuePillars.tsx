'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Heart, Music, LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * Map of icon names to Lucide React components
 */
const iconMap: Record<string, LucideIcon> = {
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
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

/**
 * Animation variants for individual pillar cards
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
 * Animation variants for the icon container
 */
const iconVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

interface PillarCardProps {
  title: string;
  description: string;
  icon: string;
}

/**
 * Individual pillar card component with glassmorphism styling
 */
const PillarCard: React.FC<PillarCardProps> = ({ title, description, icon }) => {
  const IconComponent = iconMap[icon] || Music;

  return (
    <motion.article
      variants={cardVariants}
      className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-colors duration-300"
    >
      {/* Icon container with gradient background */}
      <motion.div
        variants={iconVariants}
        className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
      >
        <IconComponent
          className="w-7 h-7 md:w-8 md:h-8 text-white"
          aria-hidden="true"
        />
      </motion.div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>

      {/* Decorative gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.article>
  );
};

/**
 * Pillar configuration with translation keys and icons
 */
const PILLAR_CONFIG = [
  { key: 'revenueResonance', icon: 'TrendingUp' },
  { key: 'emotionalEchoes', icon: 'Heart' },
  { key: 'brandHarmony', icon: 'Music' },
] as const;

/**
 * ValuePillars Section Component
 *
 * Displays the three core value propositions of BMAsia's music solutions:
 * - Revenue Resonance
 * - Emotional Echoes
 * - Brand Harmony
 *
 * Features:
 * - Scroll-triggered staggered animations
 * - Glassmorphism card design
 * - Responsive 1-3 column grid layout
 * - Navy gradient background
 */
export const ValuePillars: React.FC = () => {
  const t = useTranslations('valuePillars');

  return (
    <section
      className="relative py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden"
      aria-labelledby="value-pillars-heading"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy to-brand-dark" />

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            id="value-pillars-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {t('sectionTitle')}{' '}
            <span className="gradient-text">{t('sectionTitleHighlight')}</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            {t('sectionSubtitle')}
          </p>
        </motion.div>

        {/* Pillars grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {PILLAR_CONFIG.map((pillar) => (
            <PillarCard
              key={pillar.key}
              title={t(`${pillar.key}.title`)}
              description={t(`${pillar.key}.description`)}
              icon={pillar.icon}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValuePillars;
