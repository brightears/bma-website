import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';
import { SITE } from '@/lib/constants';
import { locales, type Locale } from '@/lib/i18n-config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

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
  // Generate alternate URLs for all locales
  const alternateLanguages: Record<string, string> = {};
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${SITE.url}/${loc}`;
  });

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: `${SITE.name} | ${SITE.tagline}`,
      template: `%s | ${SITE.name}`,
    },
    description: SITE.description,
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
      canonical: `${SITE.url}/${locale}`,
      languages: alternateLanguages,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale,
      url: `${SITE.url}/${locale}`,
      siteName: SITE.name,
      title: `${SITE.name} | ${SITE.tagline}`,
      description: SITE.description,
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
      title: `${SITE.name} | ${SITE.tagline}`,
      description: SITE.description,
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

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        {/* Preconnect hints for external resources */}
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />

        {/* Organization Schema (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'BMAsia',
              url: `https://bmasiamusic.com/${locale}`,
              logo: 'https://bmasiamusic.com/images/BMAsia_Logo.png',
              description:
                'BMAsia provides customized background music solutions for businesses across Asia-Pacific.',
              foundingDate: '2002',
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'info@bmasiamusic.com',
                contactType: 'sales',
              },
              areaServed: 'Asia-Pacific',
              serviceType: 'Background Music Solutions',
            }),
          }}
        />

        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `,
            }}
          />
        )}
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        {/* Skip to main content link for accessibility */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-brand-orange text-white px-4 py-2 rounded-lg font-semibold"
        >
          Skip to main content
        </a>

        <NextIntlClientProvider messages={messages}>
          {/* Main content */}
          <div className="min-h-screen flex flex-col bg-brand-dark">
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
