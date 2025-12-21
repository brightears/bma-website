'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Client data with logo file paths
 * Organized for diverse industry representation (not just hotels)
 */
const CLIENTS = [
  // Row 1: Mix of industries
  { name: 'Accor', logo: '/images/logos/accor-logo.jpg', category: 'hospitality' },
  { name: 'The North Face', logo: '/images/logos/The-North-Face-Logo.png', category: 'retail' },
  { name: 'Tim Hortons', logo: '/images/logos/tim-hortons-logo.jpg', category: 'fnb' },
  { name: 'DBS', logo: '/images/logos/dbs-logo.jpg', category: 'finance' },
  { name: 'Vans', logo: '/images/logos/vans-logo-png_seeklogo-257446.png', category: 'retail' },
  { name: 'Hyatt', logo: '/images/logos/hyatt-logo.jpg', category: 'hospitality' },
  { name: 'Wine Connection', logo: '/images/logos/wine-connection-logo.png', category: 'fnb' },
  // Row 2: Mix of industries
  { name: 'JLL', logo: '/images/logos/JLL-logo.jpg', category: 'realestate' },
  { name: 'Dickies', logo: '/images/logos/Dickies-Logo-500x281.png', category: 'retail' },
  { name: 'The Ascott', logo: '/images/logos/ascott-logo.png', category: 'hospitality' },
  { name: 'TUI', logo: '/images/logos/TUI_Logo_2016.svg.png', category: 'travel' },
  { name: 'Love, Bonito', logo: '/images/logos/Love, Bonito.svg', category: 'retail' },
  { name: 'Centara', logo: '/images/logos/centara-logo.jpg', category: 'hospitality' },
  { name: 'Minor Hotels', logo: '/images/logos/minor-logo.jpg', category: 'hospitality' },
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
 * - 7-column grid for even distribution
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

        {/* Client logos grid - 7 columns on desktop, 4 on tablet, 3 on mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-6 md:gap-8 items-center justify-items-center"
        >
          {CLIENTS.map((client) => (
            <motion.div
              key={client.name}
              variants={itemVariants}
              className="group relative h-10 md:h-12 w-full flex items-center justify-center"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={120}
                height={48}
                className="h-8 md:h-10 w-auto max-w-[100px] md:max-w-[120px] object-contain
                           grayscale brightness-[1.8] opacity-50
                           transition-all duration-300
                           group-hover:opacity-70 group-hover:brightness-[2]"
                style={{ filter: 'grayscale(100%) brightness(1.8)' }}
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
