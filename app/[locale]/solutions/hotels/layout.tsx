import { createIndustryMetadata, IndustryRouteLayout } from '@/lib/industry-metadata';
export const generateMetadata = async ({ params }: { params: Promise<{ locale: string }> }) => createIndustryMetadata('hotels', (await params).locale);
export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) { return <IndustryRouteLayout slug="hotels" locale={(await params).locale}>{children}</IndustryRouteLayout>; }
