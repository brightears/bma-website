import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';
import { locales, type Locale } from '@/lib/i18n-config';

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

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title = 'Beat Breeze';
  const description =
    'Beat Breeze is BMAsia’s music operations platform for business: a growing licensed catalogue, Music Concierge, scheduling, offline players and live control across every zone.';

  const alternateLanguages: Record<string, string> = {};
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${SITE.url}/${loc}/beat-breeze`;
  });

  return {
    title: `${title} | ${SITE.name}`,
    description,
    alternates: {
      canonical: `${SITE.url}/${locale}/beat-breeze`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      locale: ogLocaleMap[locale as Locale] || 'en_US',
      url: `${SITE.url}/${locale}/beat-breeze`,
      siteName: SITE.name,
      type: 'website',
      images: [
        {
          url: `${SITE.url}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Beat Breeze — BMAsia',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE.name}`,
      description,
      images: [`${SITE.url}/images/og-image.jpg`],
    },
  };
}

export default function BeatBreezeLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do I need to pay any music licensing fees separately with Beat Breeze?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Beat Breeze uses music licensed for its intended business use. Licensing requirements can vary by country and venue, so BMAsia confirms the applicable setup during onboarding.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is Beat Breeze different from Soundtrack Your Brand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Beat Breeze uses a curated royalty-free catalogue and adds venue operations, recommendations, scheduling and live control. Soundtrack Your Brand is the alternative when familiar chart and major-label repertoire is the priority.',
        },
      },
      {
        '@type': 'Question',
        name: 'What devices does Beat Breeze run on?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Beat Breeze offers venue players for iPhone, iPad, Android, Windows and modern web browsers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can Beat Breeze work offline?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The music downloads to your device and plays locally, so the experience stays smooth even if your internet drops.',
        },
      },
      {
        '@type': 'Question',
        name: 'How big is the Beat Breeze music catalog?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Beat Breeze royalty-free catalogue is growing continuously. New catalogue playlists are included automatically in discovery and recommendation workflows.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
