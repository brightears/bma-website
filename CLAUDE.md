# BMAsia Website Project

## Project Overview
Modern website rebuild for BMAsia (bmasiamusic.com) - a B2B background music solutions provider founded in 2002. Migrating from WordPress/Elementor to Next.js, deployed on Render.

**Goal**: Create a premium, animated website that outshines competitors with modern design and smooth interactions.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Formspree
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
npm run dev      # Start development server
npm run build    # Build for production (outputs to /out)
npm run lint     # Run ESLint
npm run start    # Start production server (if not static)
```

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
└── styles/
    └── globals.css         # Global styles + Tailwind
```

## Pages Overview

| Route | Page | Key Sections |
|-------|------|--------------|
| `/` | Landing | Hero, Value Pillars, Products, Calendly, About, Contact |
| `/how-it-works` | Process | 3-step process, Benefits, Demo CTA |
| `/licensing` | Education | License types, Streaming warning, Solutions |
| `/quotation` | Form | Quotation request form |

## Forms

### Music Inquiry Form (Contact)
- Name, Company, Email, Message
- Formspree endpoint: `NEXT_PUBLIC_FORMSPREE_INQUIRY_ID`

### Quotation Request Form
- First Name, Last Name, Email, Country
- Company Name, Company Address
- Preferred Solution (dropdown), Number of Zones
- Formspree endpoint: `NEXT_PUBLIC_FORMSPREE_QUOTATION_ID`

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
1. Make changes locally
2. Commit to main branch
3. Push to GitHub
4. Render auto-deploys from GitHub
5. Test on Render preview URL

## Environment Variables
See `.env.example` for required variables. Create `.env.local` for local development.

## Sub-Agents Available
- **component-builder**: Create React components with TypeScript/Tailwind/Framer Motion
- **code-reviewer**: Review code for quality, accessibility, performance
- **seo-auditor**: Audit pages for SEO, performance, accessibility

## Key Integrations
- **Calendly**: `/bmasia/sound-innovations` for demo booking
- **Google Tag Manager**: GT-WRDQZP6W
- **Formspree**: Form submissions to norbert@bmasiamusic.com
