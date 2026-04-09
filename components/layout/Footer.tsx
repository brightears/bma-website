'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-5"
        >
          {/* Logo */}
          <Link href={`/${locale}`} aria-label="BMAsia - Go to homepage">
            <Image
              src="/images/BMAsia_Logo.png"
              alt="BMAsia"
              width={100}
              height={28}
              className="h-7 w-auto"
            />
          </Link>

          {/* Locations */}
          <p className="text-gray-500 text-sm tracking-wide">
            Bangkok · Hong Kong
          </p>

          {/* Contact row */}
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${SITE.email}`}
              className="text-gray-400 hover:text-brand-orange transition-colors text-sm"
            >
              {SITE.email}
            </a>
            <span className="text-white/10">|</span>
            <WhatsAppLink href={SOCIAL.whatsapp} size={20} />
            <LineLink href={SOCIAL.line} size={20} />
          </div>

          {/* Copyright */}
          <p className="text-gray-600 text-xs mt-2">
            &copy; {currentYear} {SITE.name}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
