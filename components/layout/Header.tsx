'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { NAV_LINKS, SOLUTIONS_CATEGORIES } from '@/lib/constants';
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
  external?: boolean;
  rawHref?: boolean;
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
            <NavLink href={`/${locale}`} label="Home" />
            {/* Solutions Mega Dropdown */}
            <div className="relative group">
              <button className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-1">
                Solutions
                <svg className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 5 3 3 3-3"/></svg>
              </button>
              <div className="absolute top-full left-0 mt-1 bg-brand-dark/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-6 min-w-[480px]">
                <div className="grid grid-cols-3 gap-6">
                  {SOLUTIONS_CATEGORIES.map((cat) => (
                    <div key={cat.category}>
                      <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">{cat.category}</p>
                      {cat.links.map((link) => (
                        <Link
                          key={link.label}
                          href={`/${locale}${link.href}`}
                          className="block py-1.5 text-sm text-white/70 hover:text-brand-orange transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-xs text-white/40 mb-2">Not sure which solution fits?</p>
                  <Link href={`/${locale}/quotation`} className="text-sm text-brand-orange hover:text-brand-orange-light transition-colors font-medium">
                    Talk to us →
                  </Link>
                </div>
              </div>
            </div>
            {NAV_LINKS.filter(l => l.label !== 'Home' && l.label !== 'Get a Quote').map((link: NavLinkItem) => (
              <NavLink
                key={link.href}
                href={link.external ? link.href : link.rawHref ? link.href : `/${locale}${link.href === '/' ? '' : link.href}`}
                label={link.label}
                external={link.external}
              />
            ))}
            <LanguageSwitcher />
            <Link
              href={`/${locale}/quotation`}
              className="ml-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm shadow-brand-orange/20"
            >
              Get a Quote
            </Link>
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
                          href={link.external ? link.href : link.rawHref ? link.href : `/${locale}${link.href === '/' ? '' : link.href}`}
                          label={link.label}
                          onClick={closeMenu}
                          external={link.external}
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
  external?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, external }) => {
  const className = "relative px-4 py-2 text-white/90 hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-brand-dark rounded-lg group";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        <span>{label}</span>
        <motion.span
          className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-orange origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
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
  external?: boolean;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({
  href,
  label,
  onClick,
  external,
}) => {
  const className = "block px-4 py-3 text-lg text-white/90 hover:text-white hover:bg-white/5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-inset";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={className}>
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
