'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { SITE, SOCIAL } from '@/lib/constants';
import { WhatsAppLink, LineLink } from '@/components/icons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const locale = useLocale();
  const t = useTranslations('footer');
  const productLinks = [
    { label: 'Beat Breeze', href: `/${locale}/beat-breeze` },
    { label: 'Soundtrack Your Brand', href: `/${locale}/soundtrack-your-brand` },
    { label: t('howItWorks'), href: `/${locale}/how-it-works` },
    { label: t('musicLicensing'), href: `/${locale}/licensing` },
  ];
  const businessLinks = [
    { label: t('hotels'), href: `/${locale}/solutions/hotels` },
    { label: t('restaurants'), href: `/${locale}/solutions/restaurants` },
    { label: t('retail'), href: `/${locale}/solutions/retail` },
    { label: t('fitness'), href: `/${locale}/solutions/gyms` },
  ];

  return (
    <footer className="border-t border-white/[0.08] bg-[#060b13]" role="contentinfo" aria-label="Site footer">
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 md:py-20 lg:px-16">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.8fr_0.8fr_0.9fr]">
          <div className="max-w-md">
            <Link href={`/${locale}`} aria-label="BMAsia - Go to homepage" className="inline-block rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange">
              <Image src="/images/BMAsia_Logo.png" alt="BMAsia" width={150} height={50} className="h-11 w-auto" />
            </Link>
            <p className="mt-7 text-lg leading-8 text-white/48">
              {t('operationsDescription')}
            </p>
            <div className="mt-7 flex items-center gap-4">
              <a href={`mailto:${SITE.email}`} className="text-sm text-white/58 transition-colors hover:text-brand-orange">{SITE.email}</a>
              <WhatsAppLink href={SOCIAL.whatsapp} size={18} />
              <LineLink href={SOCIAL.line} size={18} />
            </div>
          </div>

          <FooterColumn title={t('products')} links={productLinks} />
          <FooterColumn title={t('forBusiness')} links={businessLinks} />

          <div>
            <p className="font-label text-[10px] uppercase tracking-[0.24em] text-white/55">{t('startHere')}</p>
            <a href="https://beatbreeze.io/sign-up" className="group mt-5 flex items-center justify-between rounded-2xl border border-brand-orange/25 bg-brand-orange/10 p-5 text-white transition-colors hover:border-brand-orange/50 hover:bg-brand-orange/15">
              <span>
                <span className="block text-sm font-semibold">{t('tryBeatBreeze')}</span>
                <span className="mt-1 block text-xs text-white/42">{t('trialProof')}</span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-brand-orange transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <Link href={`/${locale}/quotation`} className="mt-3 block rounded-2xl border border-white/10 p-5 text-sm font-semibold text-white/65 transition-colors hover:bg-white/5 hover:text-white">
              {t('talkToBMAsia')}
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/[0.08] pt-7 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>&copy; {currentYear} {SITE.name}. {t('allRightsReserved')}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link href={`/${locale}/privacy`} className="hover:text-white">{t('privacyPolicy')}</Link>
            <Link href={`/${locale}/cookies`} className="hover:text-white">{t('cookiePolicy')}</Link>
            <Link href={`/${locale}/terms`} className="hover:text-white">{t('termsOfService')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

function FooterColumn({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div>
      <p className="font-label text-[10px] uppercase tracking-[0.24em] text-white/55">{title}</p>
      <ul className="mt-5 space-y-3.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-white/55 transition-colors hover:text-white">{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
