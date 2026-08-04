'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { locales, localeNames, type Locale } from '@/lib/i18n-config';

interface LanguageSwitcherProps {
  openDirection?: 'up' | 'down';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  openDirection = 'down',
}) => {
  const locale = useLocale() as Locale;
  const t = useTranslations('navigation');
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    // Replace current locale in pathname with new locale
    // pathname format: /en/page or /en
    const segments = pathname.split('/');
    segments[1] = newLocale; // Replace the locale segment
    const newPathname = segments.join('/');

    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;samesite=lax`;
    router.push(newPathname || `/${newLocale}`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-h-11 items-center gap-2 rounded-full border border-transparent px-3 text-white/68 transition-colors hover:border-white/10 hover:bg-white/[0.045] hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#06111a]"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`${localeNames[locale]} — ${t('language')}`}
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="hidden text-sm font-medium sm:inline">
          {localeNames[locale]}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: openDirection === 'up' ? 10 : -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: openDirection === 'up' ? 10 : -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute right-0 ${
              openDirection === 'up' ? 'bottom-full mb-2' : 'mt-2'
            } z-50 w-56 overflow-hidden rounded-2xl border border-white/12 bg-[#091722] p-2 shadow-[0_28px_90px_rgba(0,0,0,.72)] ring-1 ring-black/30`}
            role="listbox"
            aria-label={t('language')}
          >
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                  loc === locale
                    ? 'bg-brand-orange/12 text-brand-orange'
                    : 'text-white/72 hover:bg-white/[0.06] hover:text-white'
                }`}
                role="option"
                aria-selected={loc === locale}
              >
                <span>{localeNames[loc]}</span>
                {loc === locale && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-brand-orange rounded-full"
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
