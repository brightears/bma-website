'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, ChevronDown, ExternalLink, Headphones, Layers3, X } from 'lucide-react';
import { SOLUTIONS_CATEGORIES } from '@/lib/constants';
import { EXTERNAL_LINKS } from '@/lib/external-links';
import { LanguageSwitcher } from './LanguageSwitcher';

type NavigationTranslator = ReturnType<typeof useTranslations>;

const menuVariants = {
  closed: { x: '100%', transition: { type: 'spring', stiffness: 380, damping: 38 } },
  open: { x: 0, transition: { type: 'spring', stiffness: 380, damping: 38 } },
} as const;

export function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('navigation');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuDialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => setIsMounted(true), []);
  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 18);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);
  useEffect(() => {
    if (!isMenuOpen) return;
    const menuButton = menuButtonRef.current;
    const dialog = menuDialogRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), select, [tabindex]:not([tabindex="-1"])');
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      menuButton?.focus();
    };
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const local = (path: string) => `/${locale}${path}`;
  const active = (path: string) => pathname === local(path) || pathname.startsWith(`${local(path)}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'border-white/[0.09] bg-[#06111a]/94 shadow-[0_18px_65px_rgba(0,0,0,0.34)] backdrop-blur-2xl'
          : 'border-transparent bg-[linear-gradient(180deg,rgba(6,17,26,.92),rgba(6,17,26,.36),transparent)]'
      }`}
    >
      <nav className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12" aria-label={t('mainNavigation')}>
        <div className="flex h-[4.5rem] items-center justify-between gap-5 md:h-20">
          <Link
            href={`/${locale}`}
            className="relative z-50 rounded-lg focus-visible:outline-none"
            aria-label="BMAsia"
          >
            <Image src="/images/BMAsia_Logo.png" alt="BMAsia" width={132} height={44} priority className="h-8 w-auto sm:h-9" />
          </Link>

          <div className="hidden items-center gap-0.5 xl:flex">
            <DesktopLink href={local('/beat-breeze')} active={active('/beat-breeze')}>{t('beatBreeze')}</DesktopLink>
            <DesktopLink href={local('/soundtrack-your-brand')} active={active('/soundtrack-your-brand')}>{t('soundtrack')}</DesktopLink>
            <SolutionsMenu locale={locale} t={t} />
            <DesktopLink href={local('/how-it-works')} active={active('/how-it-works')}>{t('howItWorks')}</DesktopLink>
            <LanguageSwitcher />
          </div>

          <div className="hidden items-center gap-2 xl:flex">
            <LoginMenu t={t} />
            <Link href={local('/quotation')} className="bma-button-primary min-h-11 px-5">
              {t('talkToBMAsia')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="relative z-50 grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-white xl:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
            aria-hidden={isMenuOpen || undefined}
            tabIndex={isMenuOpen ? -1 : 0}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <MenuGlyph />}
          </button>
        </div>
      </nav>

      {isMounted && createPortal(
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.button
                type="button"
                className="fixed inset-0 z-[60] bg-[#02080d]/80 backdrop-blur-md xl:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMenu}
                aria-hidden="true"
                tabIndex={-1}
              />
              <motion.div
                ref={menuDialogRef}
                id="mobile-menu"
                className="fixed bottom-0 right-0 top-0 z-[70] w-full max-w-[30rem] overflow-y-auto xl:hidden"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                role="dialog"
                aria-modal="true"
                aria-label={t('mobileNavigation')}
              >
                <div className="absolute inset-0 border-l border-white/10 bg-[#07131e]" aria-hidden="true" />
                <div className="relative flex min-h-full flex-col px-6 pb-7 pt-24 sm:px-8">
                  <button type="button" onClick={closeMenu} className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-white" aria-label={t('closeMenu')}>
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <p className="bma-kicker">{t('products')}</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <MobileProduct
                      href={local('/beat-breeze')}
                      label="Beat Breeze"
                      description={t('beatBreezeShort')}
                      accent="orange"
                      onClick={closeMenu}
                    />
                    <MobileProduct
                      href={local('/soundtrack-your-brand')}
                      label="Soundtrack"
                      description={t('soundtrackShort')}
                      accent="plum"
                      onClick={closeMenu}
                    />
                  </div>

                  <nav className="mt-8 border-y border-white/[0.08] py-4" aria-label={t('mobileNavigation')}>
                    {[
                      [t('solutions'), local('/solutions/hotels')],
                      [t('howItWorks'), local('/how-it-works')],
                      [t('licensing'), local('/licensing')],
                    ].map(([label, href]) => (
                      <Link key={href} href={href} onClick={closeMenu} className="flex items-center justify-between rounded-xl px-2 py-3.5 text-lg text-white/76 hover:bg-white/[0.05] hover:text-white">
                        {label}<ArrowRight className="h-4 w-4 text-white/30" aria-hidden="true" />
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="text-sm text-white/48">{t('language')}</span>
                    <LanguageSwitcher openDirection="up" />
                  </div>

                  <div className="mt-auto pt-8">
                    <p className="bma-kicker">{t('login')}</p>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <a href={EXTERNAL_LINKS.beatBreezeLogin} className="bma-button-secondary px-3" onClick={closeMenu}>Beat Breeze</a>
                      <a href={EXTERNAL_LINKS.soundtrackLogin} className="bma-button-secondary px-3" onClick={closeMenu}>Soundtrack</a>
                    </div>
                    <Link href={local('/quotation')} onClick={closeMenu} className="bma-button-primary mt-3 w-full">
                      {t('talkToBMAsia')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </header>
  );
}

function DesktopLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${active ? 'bg-white/[0.07] text-white' : 'text-white/62 hover:bg-white/[0.045] hover:text-white'}`}
    >
      {children}
    </Link>
  );
}

function SolutionsMenu({ locale, t }: { locale: string; t: NavigationTranslator }) {
  return (
    <div className="group relative">
      <button type="button" className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-white/62 transition-colors hover:bg-white/[0.045] hover:text-white" aria-haspopup="true">
        {t('solutions')} <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-[44rem] -translate-x-1/2 translate-y-2 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="overflow-hidden rounded-[1.5rem] border border-white/12 bg-[#091722] p-6 shadow-[0_34px_110px_rgba(0,0,0,.72)] ring-1 ring-black/40">
          <div className="mb-5 flex items-end justify-between gap-6 border-b border-white/[0.08] pb-5">
            <div>
              <p className="bma-kicker">{t('solutions')}</p>
              <p className="mt-2 max-w-md text-sm leading-6 text-white/48">{t('solutionsIntro')}</p>
            </div>
            <Link href={`/${locale}/quotation`} className="bma-text-link shrink-0">{t('helpMeChoose')} <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {SOLUTIONS_CATEGORIES.map((category) => (
              <div key={category.category}>
                <p className="font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-white/34">{category.category}</p>
                <div className="mt-3 space-y-0.5">
                  {category.links.map((link) => (
                    <Link key={link.href} href={`/${locale}${link.href}`} className="block rounded-lg px-2 py-1.5 text-sm text-white/66 transition hover:bg-white/[0.05] hover:text-white">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginMenu({ t }: { t: NavigationTranslator }) {
  return (
    <div className="group relative">
      <button type="button" className="flex min-h-11 items-center gap-1 rounded-full px-4 text-sm font-medium text-white/66 hover:bg-white/[0.045] hover:text-white" aria-haspopup="true">
        {t('login')} <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <div className="invisible absolute right-0 top-full mt-3 w-72 translate-y-2 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="rounded-2xl border border-white/12 bg-[#091722] p-3 shadow-[0_28px_90px_rgba(0,0,0,.7)]">
          <LoginLink href={EXTERNAL_LINKS.beatBreezeLogin} icon={Layers3} title="Beat Breeze" description={t('beatBreezeLogin')} />
          <LoginLink href={EXTERNAL_LINKS.soundtrackLogin} icon={Headphones} title="Soundtrack" description={t('soundtrackLogin')} />
        </div>
      </div>
    </div>
  );
}

function LoginLink({ href, icon: Icon, title, description }: { href: string; icon: typeof Layers3; title: string; description: string }) {
  return (
    <a href={href} className="group/link grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-xl p-3 hover:bg-white/[0.06]">
      <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-orange"><Icon className="h-4 w-4" /></span>
      <span><strong className="block text-sm font-medium text-white">{title}</strong><span className="mt-0.5 block text-xs text-white/40">{description}</span></span>
      <ExternalLink className="h-3.5 w-3.5 text-white/24 transition-colors group-hover/link:text-white/60" aria-hidden="true" />
    </a>
  );
}

function MobileProduct({ href, label, description, accent, onClick }: { href: string; label: string; description: string; accent: 'orange' | 'plum'; onClick: () => void }) {
  const palette = accent === 'orange' ? 'border-brand-orange/25 bg-brand-orange/[0.07]' : 'border-[#d6c2ff]/20 bg-[#d6c2ff]/[0.06]';
  return (
    <Link href={href} onClick={onClick} className={`rounded-2xl border p-4 ${palette}`}>
      <strong className="block text-base text-white">{label}</strong>
      <span className="mt-2 block text-xs leading-5 text-white/46">{description}</span>
    </Link>
  );
}

function MenuGlyph() {
  return <span className="flex w-5 flex-col gap-1.5" aria-hidden="true"><i className="h-px w-full bg-current" /><i className="h-px w-3/4 self-end bg-current" /></span>;
}

export default Header;
