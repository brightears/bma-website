'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Client data with logo file paths
 * Organized for diverse industry representation (not just hotels)
 */
const CLIENTS = [
  // Row 1: Mix of industries
  { name: 'Accor', logo: '/images/logos/accor-seeklogo.png' },
  { name: 'The North Face', logo: '/images/logos/The-North-Face-Logo.png' },
  { name: 'Tim Hortons', logo: '/images/logos/tim-hortons-seeklogo.png' },
  { name: 'DBS', logo: '/images/logos/DBS_Bank_Logo_(alternative).svg' },
  { name: 'TUI', logo: '/images/logos/TUI_Logo_2016.svg.png' },
  // Row 2: Mix of industries
  { name: 'Hyatt', logo: '/images/logos/hyatt-seeklogo.png' },
  { name: 'JLL', logo: '/images/logos/JLL_logo.svg' },
  { name: 'The Ascott', logo: '/images/logos/the-ascott-limited-seeklogo.png' },
  { name: 'Centara', logo: '/images/logos/centara-hotels-resorts-seeklogo.png' },
  { name: 'Minor Hotels', logo: '/images/logos/minor-hotels-seeklogo.png' },
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
 * Displays a subtle, tasteful section of client references using actual
 * brand logos with CSS filters for a monochrome look.
 *
 * Features:
 * - Actual brand logos with monochrome filter
 * - Diverse industry representation
 * - 5-column grid for even distribution (10 logos = 2 rows)
 * - Scroll-reveal animation
 * - Responsive layout
 */
export const ClientLogos: React.FC = () => {
  return (
    <section
      className="relative py-12 md:py-16 px-4 md:px-8 lg:px-16 overflow-hidden"
      aria-label="Trusted by leading brands"
    >
      {/* Background - subtle gradient continuation */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-dark to-brand-dark" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header - subtle and minimal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-gray-500 text-sm uppercase tracking-[0.2em] font-medium">
            Trusted by industry leaders
          </p>
        </motion.div>

        {/* Client logos grid - 5 columns on desktop, 3 on tablet, 2 on mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-12 items-center justify-items-center"
        >
          {CLIENTS.map((client) => (
            <motion.div
              key={client.name}
              variants={itemVariants}
              className="group relative w-full flex items-center justify-center py-2"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={140}
                height={60}
                className="w-auto h-auto max-h-10 md:max-h-12 max-w-[110px] md:max-w-[130px] object-contain
                           transition-opacity duration-300
                           group-hover:opacity-80"
                style={{
                  filter: 'grayscale(100%) brightness(0) invert(1)',
                  opacity: 0.5
                }}
                unoptimized={client.logo.endsWith('.svg')}
              />
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
