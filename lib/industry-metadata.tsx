import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE } from '@/lib/constants';
import { locales } from '@/lib/i18n-config';
import type { IndustrySlug } from '@/lib/industry-data';

export async function createIndustryMetadata(slug: IndustrySlug, locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `industryData.${slug}` });
  const path = `/${locale}/solutions/${slug}/`;
  const languages = Object.fromEntries(locales.map((loc) => [loc, `${SITE.url}/${loc}/solutions/${slug}/`]));
  languages['x-default'] = `${SITE.url}/en/solutions/${slug}/`;

  return {
    title: t('headline'),
    description: t('subheadline'),
    alternates: { canonical: `${SITE.url}${path}`, languages },
    openGraph: {
      title: t('headline'), description: t('subheadline'), url: `${SITE.url}${path}`, siteName: SITE.name, type: 'website',
      images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: t('headline') }],
    },
    twitter: { card: 'summary_large_image', title: t('headline'), description: t('subheadline'), images: [`${SITE.url}/images/og-image.jpg`] },
  };
}

export async function IndustryRouteLayout({ slug, locale, children }: { slug: IndustrySlug; locale: string; children: React.ReactNode }) {
  const t = await getTranslations({ locale, namespace: `industryData.${slug}` });
  const url = `${SITE.url}/${locale}/solutions/${slug}/`;
  const serviceSchema = {
    '@context': 'https://schema.org', '@type': 'Service', name: t('headline'), description: t('subheadline'), url,
    provider: { '@type': 'Organization', name: 'BMAsia', url: `${SITE.url}/` },
    areaServed: 'Asia-Pacific', serviceType: 'Business music and atmosphere design',
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'BMAsia', item: `${SITE.url}/${locale}/` },
      { '@type': 'ListItem', position: 2, name: t('headline'), item: url },
    ],
  };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />{children}</>;
}
