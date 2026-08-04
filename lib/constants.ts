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
    category: 'Hospitality',
    links: [
      { href: '/solutions/hotels', label: 'Hotels & Resorts' },
      { href: '/solutions/restaurants', label: 'Restaurants' },
      { href: '/solutions/bars', label: 'Bars & Lounges' },
      { href: '/solutions/spas', label: 'Spas & Wellness' },
    ],
  },
  {
    category: 'Retail & Lifestyle',
    links: [
      { href: '/solutions/retail', label: 'Retail & Fashion' },
      { href: '/solutions/cafes', label: 'Cafés & Coffee Shops' },
      { href: '/solutions/malls', label: 'Shopping Malls' },
      { href: '/solutions/gyms', label: 'Gyms & Fitness' },
    ],
  },
  {
    category: 'Professional',
    links: [
      { href: '/solutions/medical', label: 'Medical & Dental' },
      { href: '/solutions/offices', label: 'Offices' },
      { href: '/solutions/showrooms', label: 'Showrooms' },
      { href: '/solutions/events', label: 'Events & Venues' },
    ],
  },
] as const;


// ElevenLabs Conversational AI Configuration
export const ELEVENLABS = {
  agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'agent_8501kesasj5fe8b8rm6nnxcvn4kb',
} as const;
