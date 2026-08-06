import type { Metadata, Viewport } from 'next';
import { Geist, Space_Grotesk } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import '../globals.css';
import { SITE } from '@/lib/constants';
import { locales, type Locale } from '@/lib/i18n-config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChatProvider, ChatPanel, FloatingChatButton } from '@/components/chat';
import { CookieConsent } from '@/components/layout/CookieConsent';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-label',
  display: 'swap',
});

// Map locale codes to OpenGraph locale format
const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US',
  th: 'th_TH',
  vi: 'vi_VN',
  ms: 'ms_MY',
  id: 'id_ID',
  ko: 'ko_KR',
  ja: 'ja_JP',
  zh: 'zh_CN',
};

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Generate metadata for each locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Get translations for metadata
  const t = await getTranslations({ locale, namespace: 'metadata' });

  // Generate alternate URLs for all locales
  const alternateLanguages: Record<string, string> = {};
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${SITE.url}/${loc}/`;
  });
  alternateLanguages['x-default'] = `${SITE.url}/en/`;

  const title = t('title');
  const description = t('description');

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: title,
      template: `%s | ${SITE.name}`,
    },
    description,
    keywords: [
      'background music',
      'business music',
      'music for retail',
      'hotel music',
      'restaurant music',
      'music licensing',
      'B2B music',
      'Asia music solutions',
    ],
    authors: [{ name: SITE.name }],
    creator: SITE.name,
    alternates: {
      canonical: `${SITE.url}/${locale}/`,
      languages: alternateLanguages,
    },
    openGraph: {
      type: 'website',
      locale: ogLocaleMap[locale as Locale] || 'en_US',
      url: `${SITE.url}/${locale}/`,
      siteName: SITE.name,
      title,
      description,
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'BMAsia - Wherever Music Matters',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Get messages and translations for the locale
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const tNav = await getTranslations({ locale, namespace: 'navigation' });

  return (
    <html lang={locale} suppressHydrationWarning className={`scroll-smooth ${geist.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Apollo preconnect added dynamically after consent */}

        {/* Organization Schema (JSON-LD) - with translated description */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'BMAsia',
              url: `${SITE.url}/${locale}/`,
              logo: `${SITE.url}/images/BMAsia_Logo.png`,
              description: t('description'),
              foundingDate: '2002',
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'info@bmasiamusic.com',
                contactType: 'sales',
              },
              areaServed: 'Asia-Pacific',
              serviceType: 'Background Music Solutions',
              inLanguage: locale,
            }),
          }}
        />

        {/* GTM + Apollo load dynamically after cookie consent — see CookieConsent component */}
      </head>
      <body className={geist.className}>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-brand-orange text-white px-4 py-2 rounded-lg font-semibold"
        >
          {tNav('skipToContent')}
        </a>

        <NextIntlClientProvider messages={messages}>
          <ChatProvider>
            {/* Main content */}
            <div className="min-h-screen flex flex-col bg-brand-dark">
              <Header />
              <main id="main" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            {/* Chat Panel (slides in from right) */}
            <ChatPanel />
            {/* Persistent, low-interruption site guide */}
            <FloatingChatButton />
            {/* Cookie consent banner */}
            <CookieConsent />
          </ChatProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
