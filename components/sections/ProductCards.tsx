'use client';

import { motion } from 'framer-motion';
import { Check, Smartphone, Monitor, Apple } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/constants';

/**
 * Product type definition based on PRODUCTS constant
 */
interface Product {
  name: string;
  tagline: string;
  features: readonly string[];
  platforms: readonly string[];
}

interface ProductCardProps {
  product: Product;
  isPremium?: boolean;
  index: number;
}

/**
 * Platform icon mapping
 */
const platformIcons: Record<string, React.FC<{ className?: string }>> = {
  iOS: Apple,
  Android: Smartphone,
  Windows: Monitor,
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
 * Animation variants for individual product cards
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
 * Animation variants for feature list items
 */
const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Platform Badge Component
 */
const PlatformBadge: React.FC<{ platform: string }> = ({ platform }) => {
  const IconComponent = platformIcons[platform] || Smartphone;

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full text-sm text-gray-300">
      <IconComponent className="w-4 h-4" aria-hidden="true" />
      {platform}
    </span>
  );
};

/**
 * Individual Product Card Component
 */
const ProductCard: React.FC<ProductCardProps> = ({ product, isPremium = false, index }) => {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`
        group relative flex flex-col h-full
        bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8
        border transition-all duration-300
        ${isPremium
          ? 'border-brand-orange/50 hover:border-brand-orange hover:shadow-lg hover:shadow-brand-orange/20'
          : 'border-white/10 hover:border-white/20 hover:bg-white/10'
        }
      `}
    >
      {/* Premium indicator */}
      {isPremium && (
        <div className="absolute -top-3 left-6 px-4 py-1 bg-gradient-to-r from-brand-orange to-amber-500 rounded-full text-xs font-semibold text-white uppercase tracking-wider">
          Premium
        </div>
      )}

      {/* Product header */}
      <div className="mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {product.name}
        </h3>
        <p className={`text-lg ${isPremium ? 'text-brand-orange' : 'text-gray-400'}`}>
          {product.tagline}
        </p>
      </div>

      {/* Features list */}
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-3 mb-8 flex-grow"
      >
        {product.features.map((feature, featureIndex) => (
          <motion.li
            key={featureIndex}
            variants={featureVariants}
            className="flex items-start gap-3 text-gray-300"
          >
            <span className={`
              flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5
              ${isPremium ? 'bg-brand-orange/20' : 'bg-white/10'}
            `}>
              <Check
                className={`w-3 h-3 ${isPremium ? 'text-brand-orange' : 'text-gray-400'}`}
                aria-hidden="true"
              />
            </span>
            <span>{feature}</span>
          </motion.li>
        ))}
      </motion.ul>

      {/* Platform badges */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">
          Available on
        </p>
        <div className="flex flex-wrap gap-2">
          {product.platforms.map((platform) => (
            <PlatformBadge key={platform} platform={platform} />
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <Link href="/quotation" className="mt-auto">
        <motion.span
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            block w-full text-center px-6 py-4 rounded-xl font-semibold transition-colors
            ${isPremium
              ? 'bg-brand-orange hover:bg-brand-orange-dark text-white'
              : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
            }
          `}
        >
          Get a Quote
        </motion.span>
      </Link>

      {/* Decorative gradient overlay on hover */}
      <div
        className={`
          absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300
          ${isPremium
            ? 'bg-gradient-to-br from-brand-orange/10 via-transparent to-transparent opacity-0 group-hover:opacity-100'
            : 'bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100'
          }
        `}
      />
    </motion.article>
  );
};

/**
 * ProductCards Section Component
 *
 * Displays the two main product offerings from BMAsia:
 * - Soundtrack Your Brand (Premium)
 * - Beat Breeze (Cost-Effective)
 *
 * Features:
 * - Scroll-triggered staggered animations
 * - Glassmorphism card design
 * - Premium card with orange accent border
 * - Responsive 1-2 column grid layout
 * - Platform availability badges
 * - CTA buttons linking to quotation page
 */
export const ProductCards: React.FC = () => {
  const products = [
    { key: 'soundtrackYourBrand', isPremium: true },
    { key: 'beatBreeze', isPremium: false },
  ] as const;

  return (
    <section
      className="relative py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden"
      aria-labelledby="products-heading"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark to-brand-navy" />

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left side glow */}
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl" />
        {/* Right side glow */}
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl" />
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
            id="products-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Our{' '}
            <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Choose the perfect music solution tailored to your business needs and budget
          </p>
        </motion.div>

        {/* Products grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          {products.map((item, index) => (
            <ProductCard
              key={item.key}
              product={PRODUCTS[item.key]}
              isPremium={item.isPremium}
              index={index}
            />
          ))}
        </motion.div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-gray-400 mb-4">
            Not sure which solution is right for you?
          </p>
          <Link href="#demo">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Book a Free Demo
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCards;
