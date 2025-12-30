// BMAsia Website Constants

// Brand Colors
export const COLORS = {
  orange: '#EFA634',
  orangeDark: '#d99530',
  orangeLight: '#f5b84d',
  dark: '#0f0f0f',
  navy: '#1a1a2e',
  white: '#ffffff',
} as const;

// Site Metadata
export const SITE = {
  name: 'BMAsia',
  tagline: 'Wherever Music Matters',
  description: 'Craft the perfect atmosphere for your business. BMAsia provides customized background music solutions for hotels, restaurants, and retail across Asia-Pacific since 2002.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://bmasiamusic.com',
  email: 'info@bmasiamusic.com',
} as const;

// Social/Messaging Links
export const SOCIAL = {
  whatsapp: 'https://wa.me/66632377765',
  line: 'https://lin.ee/GKG9FGX',
} as const;

// External URLs
export const URLS = {
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/bmasia/sound-innovations',
  formspreeInquiry: process.env.NEXT_PUBLIC_FORMSPREE_INQUIRY_ID || '',
  formspreeQuotation: process.env.NEXT_PUBLIC_FORMSPREE_QUOTATION_ID || '',
} as const;

// Navigation Links
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/licensing', label: 'Licensing' },
  { href: '/quotation', label: 'Get a Quote' },
] as const;

// Company Stats
export const STATS = [
  { value: '23+', label: 'Years Experience', suffix: '' },
  { value: '50K+', label: 'Hours of Music', suffix: '' },
  { value: '100M+', label: 'Available Tracks', suffix: '' },
] as const;

// Products
export const PRODUCTS = {
  soundtrackYourBrand: {
    name: 'Soundtrack Your Brand',
    tagline: 'Premium Music Solution',
    image: '/images/product-soundtrack.webp',
    features: [
      '100M+ tracks available',
      'Drag-and-drop scheduling',
      'Text-to-speech messaging',
      'Offline playback',
      'Legal Spotify sync',
      'Bespoke music design',
      '24/7 support',
    ],
    platforms: ['iOS', 'Android', 'Windows'],
  },
  beatBreeze: {
    name: 'Beat Breeze',
    tagline: 'Essential Solution',
    image: '/images/product-beatbreeze.webp',
    features: [
      '30K+ curated tracks',
      '50 ready-made playlists',
      'Public performance license included',
      'Multi-zone setup',
      'Advanced scheduling',
      'Integrated messaging',
      'Offline playback',
    ],
    platforms: ['Android', 'Windows'],
  },
} as const;

// Value Pillars (The Power of Music)
export const VALUE_PILLARS = [
  {
    title: 'Revenue Resonance',
    description: 'Driving revenue with compelling soundscapes that encourage customers to stay longer and spend more.',
    icon: 'TrendingUp',
  },
  {
    title: 'Emotional Echoes',
    description: 'Shaping moods and behaviors with musical precision, creating the ideal ambiance for your space.',
    icon: 'Heart',
  },
  {
    title: 'Brand Harmony',
    description: 'Enhancing brand identity through distinctive music designs that resonate with your customers.',
    icon: 'Music',
  },
] as const;

// Process Steps (How It Works)
export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Choose Your Sound and Get a Quote',
    description: 'Select between our solutions, request a personalized quote, or book a free online demo to experience our platform.',
  },
  {
    step: 2,
    title: 'Customize Your Playlist',
    description: 'Collaborate with our expert music designers to tailor samples that match your brand voice and venue ambiance.',
  },
  {
    step: 3,
    title: 'Setup and Get Started',
    description: 'We handle the installation and provide comprehensive training so you can easily manage your music experience.',
  },
] as const;

// License Types
export const LICENSE_TYPES = [
  {
    name: 'Recording License',
    description: 'Covers the right to use a specific recording of a song and compensates the recording artist.',
  },
  {
    name: 'Publishing License',
    description: 'Covers the right to use the original composition and compensates the songwriters and composers.',
  },
  {
    name: 'Public Performance License',
    description: 'Allows you to play the song in a public environment like your business venue.',
  },
] as const;
