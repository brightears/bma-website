'use client';
import { IndustryPageTemplate } from '@/components/sections/IndustryPageTemplate';
import { INDUSTRY_CONFIG } from '@/lib/industry-data';

export default function Page() {
  return <IndustryPageTemplate config={INDUSTRY_CONFIG.offices} />;
}
