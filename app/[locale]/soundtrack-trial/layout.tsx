import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n-config';
import { SITE } from '@/lib/constants';

const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US', th: 'th_TH', vi: 'vi_VN', ms: 'ms_MY', id: 'id_ID', ko: 'ko_KR', ja: 'ja_JP', zh: 'zh_CN',
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'soundtrackTrialPage.metadata' });
  const languages = Object.fromEntries(locales.map((loc) => [loc, `${SITE.url}/${loc}/soundtrack-trial`]));

  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `${SITE.url}/${locale}/soundtrack-trial`, languages },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE.url}/${locale}/soundtrack-trial`,
      locale: ogLocaleMap[locale as Locale] || 'en_US',
      siteName: SITE.name,
      type: 'website',
    },
  };
}

export default function SoundtrackTrialLayout({ children }: { children: React.ReactNode }) {
  return children;
}
