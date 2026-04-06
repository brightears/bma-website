'use client';

import { motion } from 'framer-motion';
import { Hotel, UtensilsCrossed, Store, Coffee, Heart, Dumbbell } from 'lucide-react';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const INDUSTRIES = [
  {
    icon: Hotel,
    title: 'Hotels & Resorts',
    tagline: 'Multi-zone, multi-mood',
    href: '/solutions/hotels',
    gradient: 'from-amber-500/20 to-transparent',
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurants & Bars',
    tagline: 'From brunch to midnight',
    href: '/solutions/restaurants',
    gradient: 'from-red-500/20 to-transparent',
  },
  {
    icon: Store,
    title: 'Retail & Fashion',
    tagline: 'Your brand, amplified',
    href: '/solutions/retail',
    gradient: 'from-violet-500/20 to-transparent',
  },
  {
    icon: Coffee,
    title: 'Cafés & Coffee Shops',
    tagline: 'The perfect backdrop',
    href: '/quotation',
    gradient: 'from-orange-500/20 to-transparent',
  },
  {
    icon: Heart,
    title: 'Medical & Wellness',
    tagline: 'Calm, trust, comfort',
    href: '/quotation',
    gradient: 'from-teal-500/20 to-transparent',
  },
  {
    icon: Dumbbell,
    title: 'Gyms & Fitness',
    tagline: 'Energy on demand',
    href: '/quotation',
    gradient: 'from-blue-500/20 to-transparent',
  },
] as const;

export const IndustriesGrid: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center py-20 md:py-28 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark to-brand-navy" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Music for Every{' '}
            <span className="gradient-text">Space</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Wherever your business welcomes people, we design the sound that makes it memorable.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {INDUSTRIES.map((industry) => {
            const Icon = industry.icon;
            return (
              <motion.div key={industry.title} variants={itemVariants}>
                <Link href={industry.href}>
                  <motion.div
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className={`group relative h-48 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-8 hover:bg-white/[0.08] hover:border-brand-orange/30 transition-all duration-300 overflow-hidden cursor-pointer`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="relative z-10">
                      <Icon className="w-8 h-8 text-brand-orange mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-xl font-bold text-white mb-1">{industry.title}</h3>
                      <p className="text-gray-500 text-sm">{industry.tagline}</p>
                      <span className="inline-block mt-3 text-brand-orange text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Explore →
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesGrid;
