import { redirect } from 'next/navigation';

export default async function RetiredMusicDesignPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/quotation?source=music-design`);
}
