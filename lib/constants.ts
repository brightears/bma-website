// BMAsia Website Constants

// Site Metadata
export const SITE = {
  name: 'BMAsia',
  tagline: 'Wherever Music Matters',
  description: 'BMAsia designs and operates music experiences for hospitality, retail, wellness, workplaces, and public venues across Asia-Pacific.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://bmasiamusic.com',
  email: 'info@bmasiamusic.com',
} as const;

// Social/Messaging Links
export const SOCIAL = {
  whatsapp: 'https://wa.me/66632377765',
  line: 'https://lin.ee/GKG9FGX',
} as const;

// Solutions dropdown — categorized like Soundtrack's "Business types"
export const SOLUTIONS_CATEGORIES = [
  {
    categoryKey: 'hospitality',
    links: [
      { href: '/solutions/hotels', labelKey: 'hotels' },
      { href: '/solutions/restaurants', labelKey: 'restaurants' },
      { href: '/solutions/bars', labelKey: 'bars' },
      { href: '/solutions/spas', labelKey: 'spas' },
    ],
  },
  {
    categoryKey: 'retailLifestyle',
    links: [
      { href: '/solutions/retail', labelKey: 'retail' },
      { href: '/solutions/cafes', labelKey: 'cafes' },
      { href: '/solutions/malls', labelKey: 'malls' },
      { href: '/solutions/gyms', labelKey: 'gyms' },
    ],
  },
  {
    categoryKey: 'professional',
    links: [
      { href: '/solutions/medical', labelKey: 'medical' },
      { href: '/solutions/offices', labelKey: 'offices' },
      { href: '/solutions/showrooms', labelKey: 'showrooms' },
      { href: '/solutions/events', labelKey: 'events' },
    ],
  },
] as const;


// ElevenLabs Conversational AI Configuration
export const ELEVENLABS = {
  agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'agent_8501kesasj5fe8b8rm6nnxcvn4kb',
} as const;
