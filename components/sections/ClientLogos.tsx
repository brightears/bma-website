'use client';

import { motion } from 'framer-motion';

/**
 * Client data with industry categories for diverse representation
 */
const CLIENTS = [
  // Hotels & Hospitality
  { name: 'Accor', category: 'hospitality' },
  { name: 'Hilton', category: 'hospitality' },
  { name: 'Hyatt', category: 'hospitality' },
  { name: 'Marina Bay Sands', category: 'hospitality' },
  // Retail & Fashion
  { name: 'The North Face', category: 'retail' },
  { name: 'Vans', category: 'retail' },
  { name: 'Dickies', category: 'retail' },
  { name: 'Love, Bonito', category: 'retail' },
  // F&B
  { name: 'Tim Hortons', category: 'fnb' },
  { name: 'Wine Connection', category: 'fnb' },
  // Fitness
  { name: 'Jetts Fitness', category: 'fitness' },
  // Finance & Real Estate
  { name: 'DBS', category: 'finance' },
  { name: 'JLL', category: 'realestate' },
  // Travel
  { name: 'TUI', category: 'travel' },
] as const;

/**
 * Animation variants for the container
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

/**
 * Animation variants for individual items
 */
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

/**
 * ClientLogos Component
 *
 * Displays a subtle, tasteful section of client references.
 * Uses text-based styling for a clean, monochrome look that
 * blends with the dark theme.
 *
 * Features:
 * - Diverse industry representation (not just hotels)
 * - Minimal height, non-intrusive design
 * - Scroll-reveal animation
 * - Responsive flex layout
 */
export const ClientLogos: React.FC = () => {
  return (
    <section
      className="relative py-12 md:py-16 px-4 md:px-8 lg:px-16 overflow-hidden"
      aria-label="Trusted by leading brands"
    >
      {/* Background - subtle gradient continuation */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-dark to-brand-dark" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header - subtle and minimal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-gray-500 text-sm uppercase tracking-[0.2em] font-medium">
            Trusted by industry leaders
          </p>
        </motion.div>

        {/* Client logos grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12 md:gap-y-6"
        >
          {CLIENTS.map((client) => (
            <motion.div
              key={client.name}
              variants={itemVariants}
              className="group"
            >
              <span
                className="text-gray-500 text-sm md:text-base font-medium tracking-wide
                           transition-colors duration-300 group-hover:text-gray-400
                           select-none cursor-default"
              >
                {client.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Subtle separator line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"
        />
      </div>
    </section>
  );
};

export default ClientLogos;
