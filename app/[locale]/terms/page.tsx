import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { localizedAlternates } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalPages.terms' });
  return { title: t('title'), description: t('summary'), alternates: localizedAlternates('terms', locale) };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalPages.terms' });
  const ids = ['scope', 'services', 'requests', 'assistant', 'rights', 'acceptable', 'external', 'liability', 'law', 'contact'] as const;
  const sections = ids.map((id) => ({
    title: t(`sections.${id}.title`),
    paragraphs: t.raw(`sections.${id}.paragraphs`) as string[],
    items: t.raw(`sections.${id}.items`) as string[] | undefined,
    extra: id === 'contact' ? <a className="inline-flex text-[#f0a539] underline-offset-4 hover:underline" href="mailto:info@bmasiamusic.com">info@bmasiamusic.com</a> : undefined,
  }));

  return <LegalDocument eyebrow={t('eyebrow')} title={t('title')} summary={t('summary')} updated={t('updated')} sections={sections} />;
}
