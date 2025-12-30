'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Globe, Clock, Music2, Award, ArrowRight } from 'lucide-react';
import Image from 'next/image';

/**
 * Stat item interface
 */
interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  displayValue?: string;
}

/**
 * Stats data for the About section
 */
const ABOUT_STATS: StatItem[] = [
  {
    value: 23,
    suffix: '+',
    label: 'Years of Experience',
    description: 'Founded in 2002',
    icon: Clock,
  },
  {
    value: 50000,
    suffix: '+',
    label: 'Hours of Music',
    description: 'Created annually',
    icon: Music2,
  },
  {
    value: 100,
    suffix: 'M+',
    label: 'Tracks Available',
    description: 'In our library',
    icon: Award,
  },
  {
    value: 1,
    suffix: '',
    label: 'Global Presence',
    description: 'Worldwide reach',
    icon: Globe,
    displayValue: 'Global',
  },
];

/**
 * Key differentiators for BMAsia
 */
const DIFFERENTIATORS = [
  'Music tailored to your venue concept',
  'Aligned with your brand image',
  'Designed for your customer demographics',
  'Expert music curation team',
] as const;

/**
 * Animation variants for the container with staggered children
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
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

interface AnimatedCounterProps {
  value: number;
  suffix: string;
  displayValue?: string;
}

/**
 * Animated counter component that counts up when in view
 */
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix,
  displayValue,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: 2000,
    bounce: 0,
  });
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    if (isInView && !displayValue) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue, displayValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayNumber(Math.floor(latest));
    });
    return unsubscribe;
  }, [springValue]);

  // Format number with commas for thousands
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  if (displayValue) {
    return <span ref={ref}>{displayValue}</span>;
  }

  return (
    <span ref={ref}>
      {formatNumber(displayNumber)}
      {suffix}
    </span>
  );
};

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  displayValue?: string;
}

/**
 * Individual stat card with animated counter
 */
const StatCard: React.FC<StatCardProps> = ({
  value,
  suffix,
  label,
  description,
  icon: Icon,
  displayValue,
}) => {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-white" aria-hidden="true" />
        </div>
        <div>
          <div className="text-2xl md:text-3xl font-bold text-white">
            <AnimatedCounter
              value={value}
              suffix={suffix}
              displayValue={displayValue}
            />
          </div>
          <div className="text-sm font-medium text-brand-orange">{label}</div>
          <div className="text-xs text-gray-500 mt-1">{description}</div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * AboutSection Component
 *
 * Displays the "Who We Are" section with:
 * - Company story and introduction
 * - Animated stat counters
 * - Key differentiators
 * - Image placeholder with gradient pattern
 * - Call to action
 *
 * Features:
 * - Two-column responsive layout
 * - Scroll-triggered animations
 * - Animated number counters
 * - Dark background with subtle gradient
 */
export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-[#121218] to-brand-navy" />

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        {/* Radial gradient for depth */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-brand-navy/50 rounded-full blur-3xl" />
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
            id="about-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Who We <span className="gradient-text">Are</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Your trusted partner in creating memorable sonic experiences
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Company story */}
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Since <span className="text-brand-orange font-semibold">2002</span>,
                BMAsia has been a leading global B2B provider of{' '}
                <span className="text-white font-medium">
                  customized background music solutions
                </span>
                .
              </p>
              <p className="text-gray-400 leading-relaxed">
                We create over 50,000 hours of music annually, carefully crafted
                to match your venue concepts, reinforce your brand image, and
                resonate with your customer demographics. Our expert team
                understands that the right soundtrack can transform customer
                experiences and drive business success.
              </p>
            </div>

            {/* Key differentiators */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="space-y-3"
            >
              <h3 className="text-sm font-semibold text-brand-orange uppercase tracking-wider mb-4">
                What Sets Us Apart
              </h3>
              {DIFFERENTIATORS.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-2 h-2 rounded-full bg-brand-orange group-hover:scale-150 transition-transform duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.a
                href="/quotation"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 text-brand-orange hover:text-brand-orange-light font-semibold group"
              >
                Learn how we can help your business
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right column: Image placeholder with stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="space-y-6"
          >
            {/* Studio image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
              <Image
                src="/images/about-studio.webp"
                alt="Professional music studio control room"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient overlay for visual consistency */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent" />
              {/* Border overlay */}
              <div className="absolute inset-0 border border-white/10 rounded-2xl" />
            </div>

            {/* Stats grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-2 gap-4"
            >
              {ABOUT_STATS.map((stat) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  description={stat.description}
                  icon={stat.icon}
                  displayValue={stat.displayValue}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
