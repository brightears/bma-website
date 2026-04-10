/**
 * Industry page CONFIG — non-translatable bits (images, counts).
 * All user-facing strings live in messages/*.json under `industryData.<slug>`.
 */

export type IndustrySlug =
  | 'hotels'
  | 'restaurants'
  | 'retail'
  | 'bars'
  | 'spas'
  | 'cafes'
  | 'malls'
  | 'gyms'
  | 'medical'
  | 'offices'
  | 'showrooms'
  | 'events';

export interface IndustryConfig {
  slug: IndustrySlug;
  heroImage: string;
  editorialImage: string;
  statCount: number;
  zoneCount: number;
  benefitCount: number;
}

export const INDUSTRY_CONFIG: Record<IndustrySlug, IndustryConfig> = {
  hotels:      { slug: 'hotels',      heroImage: '/images/hero-hotel.webp',      editorialImage: '/images/hero-hotel.webp',      statCount: 4, zoneCount: 6, benefitCount: 5 },
  restaurants: { slug: 'restaurants', heroImage: '/images/hero-restaurant.webp', editorialImage: '/images/hero-restaurant.webp', statCount: 4, zoneCount: 6, benefitCount: 5 },
  retail:      { slug: 'retail',      heroImage: '/images/hero-retail.webp',     editorialImage: '/images/hero-retail.webp',     statCount: 4, zoneCount: 6, benefitCount: 5 },
  bars:        { slug: 'bars',        heroImage: '/images/hero-restaurant.webp', editorialImage: '/images/hero-restaurant.webp', statCount: 4, zoneCount: 6, benefitCount: 5 },
  spas:        { slug: 'spas',        heroImage: '/images/hero-medical.webp',    editorialImage: '/images/hero-medical.webp',    statCount: 4, zoneCount: 6, benefitCount: 5 },
  cafes:       { slug: 'cafes',       heroImage: '/images/hero-cafe.webp',       editorialImage: '/images/hero-cafe.webp',       statCount: 4, zoneCount: 6, benefitCount: 5 },
  malls:       { slug: 'malls',       heroImage: '/images/hero-retail.webp',     editorialImage: '/images/hero-retail.webp',     statCount: 4, zoneCount: 6, benefitCount: 5 },
  gyms:        { slug: 'gyms',        heroImage: '/images/hero-gym.webp',        editorialImage: '/images/hero-gym.webp',        statCount: 4, zoneCount: 6, benefitCount: 5 },
  medical:     { slug: 'medical',     heroImage: '/images/hero-medical.webp',    editorialImage: '/images/hero-medical.webp',    statCount: 4, zoneCount: 6, benefitCount: 5 },
  offices:     { slug: 'offices',     heroImage: '/images/hero-hotel.webp',      editorialImage: '/images/hero-hotel.webp',      statCount: 4, zoneCount: 6, benefitCount: 5 },
  showrooms:   { slug: 'showrooms',   heroImage: '/images/hero-retail.webp',     editorialImage: '/images/hero-retail.webp',     statCount: 4, zoneCount: 6, benefitCount: 5 },
  events:      { slug: 'events',      heroImage: '/images/hero-hotel.webp',      editorialImage: '/images/hero-hotel.webp',      statCount: 4, zoneCount: 6, benefitCount: 5 },
};
