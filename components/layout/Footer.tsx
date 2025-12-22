'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { NAV_LINKS, SITE, SOCIAL } from '@/lib/constants';
import { WhatsAppLink, LineLink } from '@/components/icons';

/**
 * Footer component for the BMAsia website
 * Features:
 * - Responsive multi-column layout (stacked on mobile, grid on desktop)
 * - Brand logo with tagline
 * - Navigation links with hover animations
 * - Contact information
 * - Copyright notice with dynamic year
 * - Full accessibility support
 */

interface NavLinkItem {
  href: string;
  label: string;
}

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

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

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-brand-dark border-t border-white/10"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Main Footer Content */}
        <motion.div
          className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link
              href="/"
              className="inline-block focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-brand-dark rounded-lg"
              aria-label="BMAsia - Go to homepage"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src="/images/BMAsia_Logo.png"
                  alt="BMAsia - Wherever Music Matters"
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                />
              </motion.div>
            </Link>
            <p className="mt-3 text-lg text-white/80 font-medium">
              {SITE.tagline}
            </p>
            <p className="mt-4 text-gray-400 max-w-md leading-relaxed">
              {SITE.description}
            </p>
          </motion.div>

          {/* Navigation Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold text-lg mb-4">
              Navigation
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {NAV_LINKS.map((link: NavLinkItem) => (
                  <li key={link.href}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold text-lg mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group inline-flex items-center gap-2 text-gray-400 hover:text-brand-orange transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-brand-dark rounded"
                >
                  <EmailIcon className="w-5 h-5 flex-shrink-0" />
                  <span className="group-hover:underline underline-offset-2">
                    {SITE.email}
                  </span>
                </a>
              </li>
              {/* Messaging icons */}
              <li>
                <div className="flex items-center gap-4 mt-4">
                  <WhatsAppLink href={SOCIAL.whatsapp} size={24} />
                  <LineLink href={SOCIAL.line} size={24} />
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              &copy; {currentYear} {SITE.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/licensing"
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-brand-dark rounded"
              >
                Licensing
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href="/how-it-works"
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-brand-dark rounded"
              >
                Music for Business
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * Footer navigation link with hover animation
 */
interface FooterLinkProps {
  href: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, label }) => {
  return (
    <Link
      href={href}
      className="group inline-flex items-center text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-brand-dark rounded"
    >
      <motion.span
        className="inline-block"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {label}
      </motion.span>
      <motion.span
        className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ x: -4, opacity: 0 }}
        whileHover={{ x: 0, opacity: 1 }}
      >
        <ArrowIcon className="w-4 h-4" />
      </motion.span>
    </Link>
  );
};

/**
 * Email icon component
 */
interface IconProps {
  className?: string;
}

const EmailIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  </svg>
);

/**
 * Arrow icon for link hover state
 */
const ArrowIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
    />
  </svg>
);

export default Footer;
