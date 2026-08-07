'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { SITE, SOCIAL } from '@/lib/constants';
import { WhatsAppLink, LineLink } from '@/components/icons';

export function Footer() {
  const year = new Date().getFullYear();
  const locale = useLocale();
  const t = useTranslations('footer');
  const local = (path: string) => `/${locale}${path}`;

  const industries = [
    ['hotels', '/solutions/hotels'],
    ['restaurants', '/solutions/restaurants'],
    ['retail', '/solutions/retail'],
    ['fitness', '/solutions/gyms'],
  ] as const;

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#040c13]" aria-label="Site footer">
      <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-brand-orange/[0.08] blur-3xl" />
      <div className="bma-container relative px-5 py-14 sm:px-8 md:py-16 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr_0.7fr] lg:gap-16">
          <div>
            <Link href={`/${locale}`} className="inline-block rounded-lg" aria-label="BMAsia">
              <Image src="/images/BMAsia_Logo.png" alt="BMAsia" width={150} height={50} className="h-10 w-auto" />
            </Link>
            <div className="mt-8 flex items-center gap-4">
              <a href={`mailto:${SITE.email}`} className="text-sm text-white/62 hover:text-brand-orange">{SITE.email}</a>
              <WhatsAppLink href={SOCIAL.whatsapp} size={18} />
              <LineLink href={SOCIAL.line} size={18} />
            </div>
          </div>

          <div>
            <p className="bma-kicker">{t('choosePath')}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ProductRoute
                href={local('/beat-breeze')}
                title="Beat Breeze"
                description={t('beatBreezeDescription')}
                palette="beat"
              />
              <ProductRoute
                href={local('/soundtrack-your-brand')}
                title="Soundtrack"
                description={t('soundtrackDescription')}
                palette="soundtrack"
              />
            </div>
            <Link href={local('/quotation')} className="bma-text-link mt-5">
              {t('talkToBMAsia')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-1">
            <FooterLinks
              title={t('forBusiness')}
              links={industries.map(([key, href]) => ({ label: t(key), href: local(href) }))}
            />
            <FooterLinks
              title={t('startHere')}
              links={[
                { label: t('howItWorks'), href: local('/how-it-works') },
                { label: t('musicLicensing'), href: local('/licensing') },
                { label: t('talkToBMAsia'), href: local('/quotation') },
              ]}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/[0.08] pt-6 text-xs text-white/46 md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} {SITE.name}. {t('allRightsReserved')}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            <Link href={local('/privacy')} className="hover:text-white">{t('privacyPolicy')}</Link>
            <Link href={local('/cookies')} className="hover:text-white">{t('cookiePolicy')}</Link>
            <button type="button" onClick={() => window.dispatchEvent(new Event('bma:open-cookie-preferences'))} className="hover:text-white">
              {t('manageCookies')}
            </button>
            <Link href={local('/terms')} className="hover:text-white">{t('termsOfService')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ProductRoute({ href, title, description, palette }: { href: string; title: string; description: string; palette: 'beat' | 'soundtrack' }) {
  const tone = palette === 'beat'
    ? 'border-brand-orange/22 bg-[linear-gradient(135deg,rgba(239,166,52,.1),rgba(56,211,199,.045))] hover:border-brand-orange/45'
    : 'border-[#d6c2ff]/20 bg-[linear-gradient(135deg,rgba(214,194,255,.1),rgba(61,29,75,.18))] hover:border-[#d6c2ff]/42';
  const accent = palette === 'beat' ? 'text-brand-orange' : 'text-[#d6c2ff]';
  return (
    <Link href={href} className={`group rounded-2xl border p-5 transition duration-200 hover:-translate-y-0.5 ${tone}`}>
      <span className="flex items-center justify-between gap-4">
        <strong className="font-label text-base font-medium text-white">{title}</strong>
        <ArrowUpRight className={`h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${accent}`} />
      </span>
      <span className="mt-3 block text-sm leading-6 text-white/44">{description}</span>
    </Link>
  );
}

function FooterLinks({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div>
      <p className="font-label text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-white/55 hover:text-white">{link.label}</Link></li>)}
      </ul>
    </div>
  );
}

export default Footer;
