'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { SITE, SOCIAL } from '@/lib/constants';
import { WhatsAppLink, LineLink } from '@/components/icons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const locale = useLocale();

  return (
    <footer
      className="bg-brand-dark border-t border-white/10"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Desktop: single horizontal row */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-6">
        {/* Desktop layout */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href={`/${locale}`} aria-label="BMAsia - Go to homepage">
              <Image
                src="/images/BMAsia_Logo.png"
                alt="BMAsia"
                width={80}
                height={22}
                className="h-5 w-auto"
              />
            </Link>
            <span className="text-white/10">|</span>
            <p className="text-gray-500 text-xs font-label tracking-wide">
              Bangkok · Hong Kong
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={`mailto:${SITE.email}`}
              className="text-gray-500 hover:text-brand-orange transition-colors text-xs font-label tracking-wide"
            >
              {SITE.email}
            </a>
            <WhatsAppLink href={SOCIAL.whatsapp} size={16} />
            <LineLink href={SOCIAL.line} size={16} />
            <span className="text-white/10">|</span>
            <p className="text-gray-600 text-xs font-label">
              &copy; {currentYear} {SITE.name}
            </p>
          </div>
        </div>

        {/* Mobile layout: two rows */}
        <div className="flex flex-col gap-4 md:hidden">
          <div className="flex items-center justify-between">
            <Link href={`/${locale}`} aria-label="BMAsia - Go to homepage">
              <Image
                src="/images/BMAsia_Logo.png"
                alt="BMAsia"
                width={80}
                height={22}
                className="h-5 w-auto"
              />
            </Link>
            <p className="text-gray-500 text-xs font-label tracking-wide">
              Bangkok · Hong Kong
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href={`mailto:${SITE.email}`}
                className="text-gray-500 hover:text-brand-orange transition-colors text-xs font-label"
              >
                {SITE.email}
              </a>
              <WhatsAppLink href={SOCIAL.whatsapp} size={16} />
              <LineLink href={SOCIAL.line} size={16} />
            </div>
            <p className="text-gray-600 text-xs font-label">
              &copy; {currentYear} {SITE.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
