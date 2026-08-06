/**
 * Industry page configuration. User-facing strings remain in messages/*.json;
 * this file controls each route's visual rhythm and operational scenario.
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

export type CapabilityKey =
  | 'music'
  | 'screens'
  | 'messages'
  | 'video'
  | 'scheduling'
  | 'automation'
  | 'api'
  | 'volume'
  | 'prayer'
  | 'phone'
  | 'soundscapes';

export type EvidenceKey = 'brandFit' | 'exercise' | 'care' | 'focus';

export interface IndustryConfig {
  slug: IndustrySlug;
  heroImage: string;
  accent: string;
  accentSoft: string;
  evidence: EvidenceKey;
  capabilities: CapabilityKey[];
  moments: Array<{ time: string; zone: number; capability: CapabilityKey }>;
  featureZones: number[];
}

export const INDUSTRY_CONFIG: Record<IndustrySlug, IndustryConfig> = {
  hotels: {
    slug: 'hotels', heroImage: '/images/hero-hotel.webp', accent: '#efa634', accentSoft: '#49d5c5',
    evidence: 'brandFit',
    capabilities: ['music', 'screens', 'messages', 'video', 'scheduling', 'automation', 'api', 'volume', 'prayer'],
    moments: [{ time: '06:30', zone: 1, capability: 'scheduling' }, { time: '12:00', zone: 2, capability: 'screens' }, { time: '18:36', zone: 0, capability: 'prayer' }, { time: '21:00', zone: 5, capability: 'volume' }],
    featureZones: [0, 2, 5],
  },
  restaurants: {
    slug: 'restaurants', heroImage: '/images/hero-restaurant.webp', accent: '#f0a238', accentSoft: '#e0c569',
    evidence: 'brandFit',
    capabilities: ['music', 'screens', 'messages', 'video', 'scheduling', 'automation', 'volume'],
    moments: [{ time: '07:00', zone: 0, capability: 'scheduling' }, { time: '11:45', zone: 1, capability: 'screens' }, { time: '17:30', zone: 3, capability: 'messages' }, { time: '21:15', zone: 5, capability: 'volume' }],
    featureZones: [0, 1, 5],
  },
  retail: {
    slug: 'retail', heroImage: '/images/hero-retail.webp', accent: '#ef9636', accentSoft: '#76d2ba',
    evidence: 'brandFit',
    capabilities: ['music', 'screens', 'messages', 'video', 'scheduling', 'automation', 'api'],
    moments: [{ time: '09:45', zone: 0, capability: 'video' }, { time: '12:30', zone: 1, capability: 'music' }, { time: '16:00', zone: 2, capability: 'screens' }, { time: '19:30', zone: 4, capability: 'api' }],
    featureZones: [0, 2, 4],
  },
  bars: {
    slug: 'bars', heroImage: '/images/hero-restaurant.webp', accent: '#f39a45', accentSoft: '#c690db',
    evidence: 'brandFit',
    capabilities: ['music', 'screens', 'messages', 'video', 'scheduling', 'volume'],
    moments: [{ time: '17:00', zone: 0, capability: 'music' }, { time: '19:30', zone: 2, capability: 'video' }, { time: '22:00', zone: 3, capability: 'screens' }, { time: '00:30', zone: 4, capability: 'volume' }],
    featureZones: [0, 3, 4],
  },
  spas: {
    slug: 'spas', heroImage: '/images/hero-spa.webp', accent: '#d49b60', accentSoft: '#83cab4',
    evidence: 'care',
    capabilities: ['music', 'soundscapes', 'screens', 'messages', 'scheduling', 'volume'],
    moments: [{ time: '08:30', zone: 0, capability: 'music' }, { time: '10:00', zone: 1, capability: 'soundscapes' }, { time: '14:30', zone: 2, capability: 'screens' }, { time: '19:00', zone: 4, capability: 'volume' }],
    featureZones: [0, 1, 4],
  },
  cafes: {
    slug: 'cafes', heroImage: '/images/hero-cafe.webp', accent: '#e59a48', accentSoft: '#a8cf9b',
    evidence: 'brandFit',
    capabilities: ['music', 'screens', 'messages', 'scheduling', 'automation', 'volume', 'phone'],
    moments: [{ time: '06:45', zone: 0, capability: 'scheduling' }, { time: '10:30', zone: 1, capability: 'music' }, { time: '14:00', zone: 2, capability: 'screens' }, { time: '18:15', zone: 3, capability: 'phone' }],
    featureZones: [0, 1, 3],
  },
  malls: {
    slug: 'malls', heroImage: '/images/hero-retail.webp', accent: '#e9a03c', accentSoft: '#55c9c2',
    evidence: 'brandFit',
    capabilities: ['music', 'screens', 'messages', 'video', 'scheduling', 'automation', 'api', 'prayer'],
    moments: [{ time: '09:30', zone: 0, capability: 'music' }, { time: '12:15', zone: 1, capability: 'screens' }, { time: '18:20', zone: 2, capability: 'prayer' }, { time: '20:30', zone: 3, capability: 'messages' }],
    featureZones: [0, 1, 3],
  },
  gyms: {
    slug: 'gyms', heroImage: '/images/hero-gym.webp', accent: '#f19b35', accentSoft: '#62d0c3',
    evidence: 'exercise',
    capabilities: ['music', 'screens', 'messages', 'video', 'scheduling', 'api', 'volume'],
    moments: [{ time: '06:00', zone: 0, capability: 'music' }, { time: '08:00', zone: 1, capability: 'api' }, { time: '12:30', zone: 3, capability: 'screens' }, { time: '18:00', zone: 2, capability: 'volume' }],
    featureZones: [0, 2, 3],
  },
  medical: {
    slug: 'medical', heroImage: '/images/hero-medical.webp', accent: '#d9a15e', accentSoft: '#79c7b7',
    evidence: 'care',
    capabilities: ['music', 'soundscapes', 'screens', 'messages', 'scheduling', 'volume'],
    moments: [{ time: '07:45', zone: 0, capability: 'music' }, { time: '09:00', zone: 1, capability: 'volume' }, { time: '13:00', zone: 2, capability: 'screens' }, { time: '17:30', zone: 4, capability: 'messages' }],
    featureZones: [0, 1, 2],
  },
  offices: {
    slug: 'offices', heroImage: '/images/hero-hotel.webp', accent: '#e7a04b', accentSoft: '#77caba',
    evidence: 'focus',
    capabilities: ['music', 'soundscapes', 'screens', 'messages', 'scheduling', 'automation', 'phone'],
    moments: [{ time: '08:30', zone: 1, capability: 'music' }, { time: '10:00', zone: 0, capability: 'soundscapes' }, { time: '12:30', zone: 3, capability: 'screens' }, { time: '17:45', zone: 4, capability: 'phone' }],
    featureZones: [0, 1, 3],
  },
  showrooms: {
    slug: 'showrooms', heroImage: '/images/hero-retail.webp', accent: '#efa23e', accentSoft: '#b29bd8',
    evidence: 'brandFit',
    capabilities: ['music', 'screens', 'messages', 'video', 'scheduling', 'automation', 'api', 'phone'],
    moments: [{ time: '09:50', zone: 0, capability: 'music' }, { time: '11:00', zone: 1, capability: 'video' }, { time: '16:30', zone: 2, capability: 'screens' }, { time: '19:00', zone: 4, capability: 'api' }],
    featureZones: [0, 1, 4],
  },
  events: {
    slug: 'events', heroImage: '/images/hero-hotel.webp', accent: '#f09a39', accentSoft: '#b99ade',
    evidence: 'brandFit',
    capabilities: ['music', 'screens', 'messages', 'video', 'scheduling', 'automation', 'api', 'volume'],
    moments: [{ time: '15:00', zone: 4, capability: 'video' }, { time: '17:30', zone: 0, capability: 'music' }, { time: '19:00', zone: 1, capability: 'messages' }, { time: '22:00', zone: 3, capability: 'volume' }],
    featureZones: [0, 1, 4],
  },
};
