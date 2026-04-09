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
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-6">
        {/* Desktop layout — two rows */}
        <div className="hidden md:block">
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

            <div className="flex items-center gap-6">
              <a
                href={`mailto:${SITE.email}`}
                className="text-gray-500 hover:text-brand-orange transition-colors text-xs font-label tracking-wide"
              >
                {SITE.email}
              </a>
              <WhatsAppLink href={SOCIAL.whatsapp} size={16} />
              <LineLink href={SOCIAL.line} size={16} />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-6">
              <Link href={`/${locale}/privacy`} className="text-gray-600 hover:text-gray-400 transition-colors text-xs font-label">
                Privacy Policy
              </Link>
              <Link href={`/${locale}/cookies`} className="text-gray-600 hover:text-gray-400 transition-colors text-xs font-label">
                Cookie Policy
              </Link>
              <Link href={`/${locale}/terms`} className="text-gray-600 hover:text-gray-400 transition-colors text-xs font-label">
                Terms of Service
              </Link>
            </div>
            <p className="text-gray-600 text-xs font-label">
              &copy; {currentYear} {SITE.name}. All rights reserved.
            </p>
          </div>
        </div>

        {/* Mobile layout */}
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
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${SITE.email}`}
                className="text-gray-500 hover:text-brand-orange transition-colors text-xs font-label"
              >
                {SITE.email}
              </a>
              <WhatsAppLink href={SOCIAL.whatsapp} size={16} />
              <LineLink href={SOCIAL.line} size={16} />
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-center gap-4">
              <Link href={`/${locale}/privacy`} className="text-gray-600 hover:text-gray-400 transition-colors text-[10px] font-label">
                Privacy
              </Link>
              <Link href={`/${locale}/cookies`} className="text-gray-600 hover:text-gray-400 transition-colors text-[10px] font-label">
                Cookies
              </Link>
              <Link href={`/${locale}/terms`} className="text-gray-600 hover:text-gray-400 transition-colors text-[10px] font-label">
                Terms
              </Link>
            </div>
            <p className="text-gray-600 text-[10px] font-label">
              &copy; {currentYear} {SITE.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
