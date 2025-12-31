# BMAsia Website Project

## Project Overview
Modern website rebuild for BMAsia (bmasiamusic.com) - a B2B background music solutions provider founded in 2002. Migrated from WordPress/Elementor to Next.js, deployed on Render.

**Status**: Live at https://bmasiamusic.com (production)

**Goal**: Create a premium, animated website that outshines competitors with modern design and smooth interactions.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **i18n**: next-intl (8 languages)
- **Forms**: React Hook Form + API routes + Prisma + Email notifications
- **Database**: PostgreSQL (via Prisma ORM)
- **Icons**: Lucide React
- **Deployment**: Render
- **Repository**: https://github.com/brightears/bma-website.git

## Brand Guidelines

### Colors
```
Primary Orange:  #EFA634
Dark Background: #0f0f0f
Navy:            #1a1a2e
White:           #ffffff
```

### Typography
- Font: Inter or Plus Jakarta Sans
- Headings: Bold, large (text-4xl to text-6xl)
- Body: Regular (text-base to text-lg)

### Tagline
"Wherever Music Matters"

### Headline
"Craft the Perfect Atmosphere"

### Product Taglines
- **Soundtrack Your Brand**: "Premium Music Solution"
- **Beat Breeze**: "Essential Solution"

### Copywriting Standards
- Use contractions naturally ("we'll" not "we will")
- Avoid overusing "atmosphere" - alternate with "ambiance", "environment", "space"
- No ampersands in body copy (use "and")
- Positive framing ("Enhancing" not "Embellishing")
- Professional but approachable tone

## Common Commands
```bash
npm run dev                      # Start development server
NODE_ENV=production npm run build # Build for production (outputs to /out)
npm run lint                     # Run ESLint
npm run start                    # Start production server (if not static)
```

**Note**: Use `NODE_ENV=production` prefix for builds to avoid Next.js 16 global-error prerender issue.

## Project Structure
```
bma_website/
├── app/
│   ├── layout.tsx          # Minimal root layout
│   ├── [locale]/           # Locale-based routing
│   │   ├── layout.tsx      # Main layout (header/footer/i18n provider)
│   │   ├── page.tsx        # Landing page (/en/, /th/, etc.)
│   │   ├── how-it-works/   # /[locale]/how-it-works
│   │   ├── licensing/      # /[locale]/licensing
│   │   └── quotation/      # /[locale]/quotation
│   └── api/                # API routes (forms)
├── components/
│   ├── layout/             # Header, Footer, LanguageSwitcher
│   ├── sections/           # Page sections (Hero, Products, etc.)
│   ├── forms/              # InquiryForm, QuotationForm
│   └── ui/                 # Reusable UI (Button, Card, Input)
├── lib/
│   ├── constants.ts        # Colors, URLs, form IDs
│   └── i18n-config.ts      # Locale configuration
├── messages/               # Translation files
│   ├── en.json             # English (default)
│   ├── th.json             # Thai
│   ├── vi.json             # Vietnamese
│   └── ...                 # Other languages
├── middleware.ts           # Language detection middleware
├── i18n.ts                 # next-intl configuration
└── public/
    └── images/             # Static assets
```

## Pages Overview

| Route | Page | Key Sections |
|-------|------|--------------|
| `/[locale]/` | Landing | Hero, Value Pillars, Products, SmartFeatures, ClientLogos, Calendly, About, Contact |
| `/[locale]/how-it-works` | Process | 3-step process, Benefits, Demo CTA |
| `/[locale]/licensing` | Education | License types, Streaming warning, Solutions |
| `/[locale]/quotation` | Form | Quotation request form |

## Internationalization (i18n)

### Supported Languages
| Code | Language | Region |
|------|----------|--------|
| `en` | English | Default (all other countries) |
| `th` | Thai | Thailand |
| `vi` | Vietnamese | Vietnam |
| `ms` | Malay | Malaysia |
| `id` | Indonesian | Indonesia |
| `ko` | Korean | South Korea |
| `ja` | Japanese | Japan |
| `zh` | Simplified Chinese | China, Singapore |

### URL Structure
All pages use locale prefix: `/en/`, `/th/`, `/vi/`, etc.
- Homepage: `bmasiamusic.com/en/`
- Subpages: `bmasiamusic.com/th/how-it-works/`

### Language Detection
1. URL locale prefix (explicit user choice)
2. Cookie preference (returning visitors)
3. Accept-Language header (browser preference)
4. Default to English

### Key Files
- `lib/i18n-config.ts` - Locale configuration and language mapping
- `i18n.ts` - next-intl request configuration
- `middleware.ts` - Language detection and routing
- `messages/*.json` - Translation files (~200 strings each)
- `components/layout/LanguageSwitcher.tsx` - Language dropdown

### Adding Translations
1. Create/edit `messages/[locale].json`
2. Use same structure as `messages/en.json`
3. Product names stay in English (Soundtrack Your Brand, Beat Breeze)

### Using Translations in Components
```tsx
'use client';
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('sectionName');
  return <h1>{t('title')}</h1>;
}
```

### Status
- Infrastructure: Complete
- English translations: Complete (~200 strings)
- Other languages: Pending
- Component integration: Pending (currently shows English on all locales)

## Forms

Both forms use API routes with Prisma (database) + email notifications. Honeypot spam protection and rate limiting included.

### Music Inquiry Form (Contact Section)
- **Fields**: Name, Company, Email, Message
- **API Route**: `app/api/inquiry/route.ts`
- **Component**: `components/forms/InquiryForm.tsx`

### Quotation Request Form (/quotation page)
- **Fields**: First Name, Last Name, Email, Country, Company Name, Company Address, Preferred Solution (dropdown), Number of Zones
- **API Route**: `app/api/quotation/route.ts`
- **Component**: `components/forms/QuotationForm.tsx`

## Client Logos Section

### Overview
Subtle "Trusted by industry leaders" section displaying monochrome client logos on the landing page. Located between SmartFeatures and Calendly sections.

### Component
`components/sections/ClientLogos.tsx`

### Current Logos (10 total, 2 rows of 5)
| Logo | File | Industry |
|------|------|----------|
| Accor | accor-seeklogo.png | Hospitality |
| The North Face | The-North-Face-Logo.png | Retail |
| Tim Hortons | tim-hortons-seeklogo.png | F&B |
| DBS | dbs-logo.svg | Finance |
| TUI | TUI_Logo_2016.svg.png | Travel |
| Hyatt | hyatt-seeklogo.png | Hospitality |
| JLL | JLL_logo.svg | Real Estate |
| Hilton | hilton-hotels-seeklogo.png | Hospitality |
| Centara | centara-hotels-resorts-seeklogo.png | Hospitality |
| Minor Hotels | minor-hotels-seeklogo.png | Hospitality |

### Technical Implementation
- **Monochrome Filter**: `filter: 'grayscale(100%) brightness(0) invert(1)'` converts any logo to white
- **Opacity**: 0.5 for subtle appearance
- **Grid**: 5 columns desktop, 3 tablet, 2 mobile
- **Logo Requirements**: MUST have transparent background (solid backgrounds become gray boxes with the invert filter)

### Adding/Replacing Logos
1. Download transparent PNG/SVG from SeekLogo, Wikipedia, or brand press kits
2. Save to `public/images/logos/`
3. Update `CLIENTS` array in `ClientLogos.tsx`
4. Build with `NODE_ENV=production npm run build` (required to avoid Next.js 16 global-error issue)

### Special Case: DBS Logo
The DBS logo has a white star cutout that becomes invisible with the monochrome filter. A custom SVG (`dbs-logo.svg`) was created with the white background polygon removed, so the star appears as a transparent cutout showing the page background.

## Hero & Section Images

### Overview
AI-generated images (Google Gemini) used throughout the site for visual impact. All images optimized to WebP format for performance.

### Image Files (`public/images/`)
| File | Size | Used On | Description |
|------|------|---------|-------------|
| `hero-lounge.webp` | 142 KB | Homepage | Dark hotel lounge with orange ceiling glow |
| `hero-restaurant.webp` | 189 KB | How It Works | Restaurant with amber pendant lights |
| `hero-abstract.webp` | 162 KB | Licensing | Abstract orange soundwave on dark navy |
| `hero-spa.webp` | ~150 KB | Quotation | Luxury spa setting with relaxing atmosphere |
| `about-studio.webp` | 34 KB | Homepage (About) | Music studio control room |
| `product-soundtrack.webp` | 41 KB | Homepage (Products) | Tablet with music interface in restaurant |
| `product-beatbreeze.webp` | 49 KB | Homepage (Products) | Speaker in cafe setting |
| `og-image.jpg` | ~200 KB | Social sharing | Hotel lounge with logo and tagline (1200x630) |

### Implementation Pattern
```tsx
// Hero background with gradient overlay
<Image
  src="/images/hero-lounge.webp"
  alt=""
  fill
  priority
  className="object-cover opacity-60"
  sizes="100vw"
/>
<div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-navy/40 to-brand-dark/80" />
```

### Image Optimization Workflow
1. Generate images via Google Gemini (or other AI tools)
2. Save PNG to `public/images/`
3. Resize with `sips -Z [width] [filename].png` (1920px for hero, 800px for sections)
4. Convert to WebP: `cwebp -q 85 [filename].png -o [filename].webp`
5. Use WebP version in code, keep PNG as backup

### Opacity & Overlay Guidelines
- **Hero images**: 50-60% opacity + gradient overlay for text readability
- **Section images**: Use `aspect-[16/9]` for wide shots, `aspect-[4/3]` for taller
- **Product cards**: Include gradient fade at bottom (`bg-gradient-to-t from-black/60`)

### Hero Image Alt Text
All hero images include descriptive alt text for accessibility:
- Homepage: "Elegant hotel lounge with warm ambient lighting"
- How It Works: "Modern restaurant interior with sophisticated ambiance"
- Licensing: "Abstract sound wave visualization representing music licensing"
- Quotation: "Luxury spa setting with relaxing atmosphere"

## Design Patterns

### Section Container
```tsx
<section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
  <div className="max-w-7xl mx-auto">
    {/* Content */}
  </div>
</section>
```

### Scroll Reveal Animation
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {children}
</motion.div>
```

### Orange Button
```tsx
<button className="bg-[#EFA634] hover:bg-[#d99530] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
  {children}
</button>
```

### Header Behavior
- **Not scrolled**: Subtle gradient (`from-brand-dark/70 to-transparent`) for logo visibility
- **Scrolled**: Solid dark background with blur (`bg-brand-dark/95 backdrop-blur-md`)
- Transition: 300ms smooth animation between states

## Deployment Workflow

**IMPORTANT: Never run dev server, builds, or tests locally. Always push to GitHub and deploy on Render.**

1. Make code changes
2. Commit to main branch
3. Push to GitHub
4. Render auto-deploys from GitHub
5. Verify on live site: https://bmasiamusic.com

### DNS Configuration
- **Domain**: bmasiamusic.com (managed at GoDaddy)
- **A Record**: `@` → `216.24.57.1` (Render)
- **CNAME**: `www` → `bmasia-website.onrender.com`
- **Email**: Stays on GoDaddy (Google Workspace)

## Environment Variables
Production environment variables are configured on Render dashboard.

## Sub-Agents Available
- **component-builder**: Create React components with TypeScript/Tailwind/Framer Motion
- **code-reviewer**: Review code for quality, accessibility, performance
- **seo-auditor**: Audit pages for SEO, performance, accessibility
- **test-writer**: Generate comprehensive tests for components, API routes, forms (Vitest/Jest + Testing Library)
- **performance-auditor**: Analyze bundle size, Core Web Vitals, image optimization, render performance

## Key Integrations
- **Calendly**: Popup widget (not inline embed) - works on mobile/incognito
  - URL: `https://calendly.com/bmasia/sound-innovations`
  - Component: `components/sections/CalendlyEmbed.tsx`
- **Google Tag Manager**: GT-WRDQZP6W
- **Google Search Console**: Sitemap submitted, 4 pages indexed
- **Database**: PostgreSQL on Render (form submissions stored via Prisma)
- **Email**: Notifications sent via configured email service

## SEO Status
- **Score**: 82/100 (Dec 2024 audit)
- **Canonical URL**: Set on all pages
- **Meta description**: 158 chars, keyword-optimized ("Craft the perfect atmosphere...")
- **OG Image**: `og-image.jpg` (1200x630) - hotel lounge with logo/tagline
- **Structured data**:
  - Organization schema (JSON-LD) on all pages
  - BreadcrumbList schema on subpages (How It Works, Licensing, Quotation)
- **Sitemap**: `/sitemap.xml` submitted to Google (last updated Dec 2024)
- **Image SEO**: All hero images have descriptive alt text

### Social Sharing Preview Testing
- **Facebook**: https://developers.facebook.com/tools/debug/
- **Twitter**: https://cards-dev.twitter.com/validator
- **LinkedIn**: https://www.linkedin.com/post-inspector/
