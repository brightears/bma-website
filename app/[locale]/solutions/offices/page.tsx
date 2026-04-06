'use client';
import { IndustryPageTemplate } from '@/components/sections/IndustryPageTemplate';
import { INDUSTRY_DATA } from '@/lib/industry-data';

export default function Page() {
  return <IndustryPageTemplate {...INDUSTRY_DATA.offices} />;
}
