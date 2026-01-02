'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { NAV_LINKS } from '@/lib/constants';
import { LanguageSwitcher } from './LanguageSwitcher';

/**
 * Header component for the BMAsia website
 * Features:
 * - Responsive navigation with mobile hamburger menu
 * - Sticky header with scroll-based background transition
 * - Framer Motion animations for smooth interactions
 * - Full accessibility support with ARIA labels and keyboard navigation
 */

interface NavLinkItem {
  href: string;
  label: string;
}

// Animation variants for the mobile menu
const menuVariants = {
  closed: {
    x: '100%',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

// Animation variants for menu items
const menuItemVariants = {
  closed: {
    opacity: 0,
    x: 20,
  },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
};

// Animation variants for the overlay
const overlayVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

export const Header: React.FC = () => {
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll events for sticky header background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-b from-brand-dark/70 to-transparent'
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="relative z-50 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-brand-dark rounded-lg"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative h-8 md:h-10 w-auto"
            >
              <Image
                src="/images/BMAsia_Logo.png"
                alt="BMAsia - Wherever Music Matters"
                height={40}
                width={120}
                className="h-8 md:h-10 w-auto object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {NAV_LINKS.map((link: NavLinkItem) => (
              <NavLink
                key={link.href}
                href={`/${locale}${link.href === '/' ? '' : link.href}`}
                label={link.label}
              />
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            className="relative z-50 md:hidden p-2 -mr-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-brand-dark rounded-lg"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">
              {isMenuOpen ? 'Close menu' : 'Open menu'}
            </span>
            <HamburgerIcon isOpen={isMenuOpen} />
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              id="mobile-menu"
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-brand-dark border-l border-white/10 md:hidden"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-6">
                <nav className="flex-1" aria-label="Mobile navigation">
                  <ul className="space-y-2">
                    {NAV_LINKS.map((link: NavLinkItem, index: number) => (
                      <motion.li
                        key={link.href}
                        custom={index}
                        variants={menuItemVariants}
                        initial="closed"
                        animate="open"
                      >
                        <MobileNavLink
                          href={`/${locale}${link.href === '/' ? '' : link.href}`}
                          label={link.label}
                          onClick={closeMenu}
                        />
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Language Switcher */}
                <motion.div
                  custom={NAV_LINKS.length}
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                  className="py-4 border-t border-white/10"
                >
                  <div className="flex items-center justify-between px-4">
                    <span className="text-white/60 text-sm">Language</span>
                    <LanguageSwitcher openDirection="up" />
                  </div>
                </motion.div>

                {/* Mobile CTA */}
                <motion.div
                  custom={NAV_LINKS.length + 1}
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                  className="pt-4"
                >
                  <Link
                    href={`/${locale}/quotation`}
                    onClick={closeMenu}
                    className="block w-full text-center bg-brand-orange hover:bg-brand-orange-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-brand-dark"
                  >
                    Get a Quote
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

/**
 * Desktop navigation link with hover animations
 */
interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label }) => {
  return (
    <Link
      href={href}
      className="relative px-4 py-2 text-white/90 hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-brand-dark rounded-lg group"
    >
      <span>{label}</span>
      <motion.span
        className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-orange origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </Link>
  );
};

/**
 * Mobile navigation link with tap animation
 */
interface MobileNavLinkProps {
  href: string;
  label: string;
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({
  href,
  label,
  onClick,
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 text-lg text-white/90 hover:text-white hover:bg-white/5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-inset"
    >
      {label}
    </Link>
  );
};

/**
 * Animated hamburger icon that transforms into an X
 */
interface HamburgerIconProps {
  isOpen: boolean;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen }) => {
  return (
    <div className="w-6 h-6 flex flex-col justify-center items-center">
      <motion.span
        className="block w-6 h-0.5 bg-current rounded-full"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -4,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block w-6 h-0.5 bg-current rounded-full"
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block w-6 h-0.5 bg-current rounded-full"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 4,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};

export default Header;
