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
- **Forms**: React Hook Form + API routes + Prisma + Email notifications
- **Database**: PostgreSQL (via Prisma ORM)
- **Icons**: Lucide React
- **Deployment**: Render (static export)
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
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (header/footer)
│   ├── page.tsx            # Landing page (/)
│   ├── how-it-works/       # /how-it-works
│   ├── licensing/          # /licensing
│   └── quotation/          # /quotation
├── components/
│   ├── layout/             # Header, Footer, Navigation
│   ├── sections/           # Page sections (Hero, Products, etc.)
│   ├── forms/              # InquiryForm, QuotationForm
│   └── ui/                 # Reusable UI (Button, Card, Input)
├── lib/
│   └── constants.ts        # Colors, URLs, form IDs
├── public/
│   └── images/             # Static assets
│       └── logos/          # Client logos (transparent PNGs/SVGs)
└── styles/
    └── globals.css         # Global styles + Tailwind
```

## Pages Overview

| Route | Page | Key Sections |
|-------|------|--------------|
| `/` | Landing | Hero, Value Pillars, Products, SmartFeatures, ClientLogos, Calendly, About, Contact |
| `/how-it-works` | Process | 3-step process, Benefits, Demo CTA |
| `/licensing` | Education | License types, Streaming warning, Solutions |
| `/quotation` | Form | Quotation request form |

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
| DBS | DBS_Bank_Logo_(alternative).svg | Finance |
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
- **Canonical URL**: Set on homepage
- **Meta description**: 158 chars, keyword-optimized
- **Structured data**: Organization schema (JSON-LD)
- **Sitemap**: `/sitemap.xml` submitted to Google

### Future SEO Improvements (Optional)
- Add OG image (1200x630px) for better social sharing previews
- Add breadcrumb structured data to subpages
