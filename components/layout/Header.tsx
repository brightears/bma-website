'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { SOLUTIONS_CATEGORIES } from '@/lib/constants';
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
  const t = useTranslations('navigation');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Track client-side mount for createPortal (SSR-safe)
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const mobileNavLinks: NavLinkItem[] = [
    { href: '/', label: t('home') },
    { href: '/beat-breeze', label: t('beatBreeze') },
    { href: '/soundtrack-your-brand', label: t('soundtrack') },
    { href: '/how-it-works', label: t('howItWorks') },
    { href: '/licensing', label: t('licensing') },
    { href: '/quotation', label: t('getQuote') },
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'border-white/10 bg-[#070d17]/92 shadow-[0_16px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl'
          : 'border-transparent bg-gradient-to-b from-[#070d17]/90 to-transparent'
      }`}
      role="banner"
    >
      <nav
        className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16"
        role="navigation"
        aria-label={t('mainNavigation')}
      >
        <div className="flex h-[72px] items-center justify-between md:h-20">
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
          <div className="hidden items-center gap-1 xl:flex">
            <NavLink href={`/${locale}/beat-breeze`} label={t('beatBreeze')} />
            <NavLink href={`/${locale}/soundtrack-your-brand`} label={t('soundtrack')} />
            {/* Solutions Mega Dropdown */}
            <div className="relative group">
              <button type="button" className="flex cursor-pointer items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-white/65 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-brand-dark">
                {t('solutions')}
                <svg className="w-3 h-3 opacity-50" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 5 3 3 3-3"/></svg>
              </button>
              <div className="invisible absolute left-0 top-full z-50 mt-2 min-w-[520px] rounded-2xl border border-white/10 bg-[#09111d]/98 p-6 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
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
                  <p className="text-xs text-white/40 mb-2">{t('notSure')}</p>
                  <Link href={`/${locale}/quotation`} className="text-sm text-brand-orange hover:text-brand-orange-light transition-colors font-medium">
                    {t('talkToUs')} →
                  </Link>
                </div>
              </div>
            </div>
            <LanguageSwitcher />
            <Link
              href={`/${locale}/quotation`}
              className="ml-1 rounded-full px-3 py-2 text-sm font-medium text-brand-orange transition-colors hover:bg-brand-orange/5 hover:text-[#ffb64a]"
            >
              {t('talkToBMAsia')}
            </Link>
            <a
              href="https://beatbreeze.io/sign-in"
              className="ml-1 rounded-full px-3 py-2 text-sm font-medium text-white/65 transition-colors hover:text-white"
            >
              {t('signIn')}
            </a>
            <a
              href="https://beatbreeze.io/sign-up"
              className="ml-1 rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-[#101010] shadow-sm shadow-brand-orange/20 transition-colors hover:bg-[#ffb64a]"
            >
              {t('startFree')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            className="relative z-50 -mr-2 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-brand-dark xl:hidden"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">
              {isMenuOpen ? t('closeMenu') : t('openMenu')}
            </span>
            <HamburgerIcon isOpen={isMenuOpen} />
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu — rendered via Portal to document.body to escape the header's
          stacking context. iOS Safari has known bugs where a position:fixed element
          inside another position:fixed parent (plus framer-motion transforms) can
          drop its background paint. A portal sidesteps this entirely. */}
      {isMounted && createPortal(
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm xl:hidden"
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
                className="fixed bottom-0 right-0 top-0 z-[70] w-full max-w-sm xl:hidden"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                role="dialog"
                aria-modal="true"
                aria-label={t('mobileNavigation')}
              >
                {/* Solid background layer — isolated from framer-motion transform */}
                <div
                  className="absolute inset-0 border-l border-white/10"
                  style={{ backgroundColor: '#0f0f0f' }}
                  aria-hidden="true"
                />
                <div className="relative flex flex-col h-full pt-24 pb-8 px-6">
                  <nav className="flex-1" aria-label={t('mobileNavigation')}>
                    <ul className="space-y-2">
                      {mobileNavLinks.map((link: NavLinkItem, index: number) => (
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
                    custom={mobileNavLinks.length}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    className="py-4 border-t border-white/10"
                  >
                    <div className="flex items-center justify-between px-4">
                      <span className="text-white/60 text-sm">{t('language')}</span>
                      <LanguageSwitcher openDirection="up" />
                    </div>
                  </motion.div>

                  {/* Mobile CTA */}
                  <motion.div
                    custom={mobileNavLinks.length + 1}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    className="pt-4"
                  >
                    <Link
                      href={`/${locale}/quotation`}
                      onClick={closeMenu}
                      className="mb-3 block w-full rounded-full border border-white/15 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-brand-dark"
                    >
                      {t('talkToBMAsia')}
                    </Link>
                    <a
                      href="https://beatbreeze.io/sign-in"
                      onClick={closeMenu}
                      className="mb-3 block w-full rounded-full border border-brand-orange/35 px-6 py-3 text-center font-semibold text-brand-orange transition-colors hover:bg-brand-orange/10 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-brand-dark"
                    >
                      {t('signIn')}
                    </a>
                    <a
                      href="https://beatbreeze.io/sign-up"
                      onClick={closeMenu}
                      className="block w-full rounded-full bg-brand-orange px-6 py-3 text-center font-semibold text-[#101010] transition-colors hover:bg-[#ffb64a] focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-brand-dark"
                    >
                      {t('startTrial')}
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
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
  const className = "group relative rounded-full px-3 py-2 text-sm font-medium text-white/65 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-brand-dark";

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
