# BMAsia Website

BMAsia's multilingual public product site for music, media, messaging and connected venue experiences.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + PostgreSQL/Prisma + Gmail notifications
- **Locales**: English, Thai, Vietnamese, Malay, Indonesian, Korean, Japanese and Simplified Chinese
- **Deployment**: Render

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/brightears/bma-website.git
cd bma-website

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

This creates the production server build, including API routes for inquiry, quotation, trial and assistant handoff workflows.

## Project Structure

```
├── app/                # Next.js pages
├── components/         # React components
│   ├── layout/         # Header, Footer
│   ├── sections/       # Page sections
│   ├── forms/          # Form components
│   └── ui/             # Reusable UI
├── lib/                # Utilities and constants
├── public/             # Static assets
└── styles/             # Global styles
```

## Pages

| Route | Description |
|-------|-------------|
| `/[locale]` | BMAsia product-choice homepage and Venue Time Machine |
| `/[locale]/beat-breeze` | Beat Breeze product experience |
| `/[locale]/soundtrack-your-brand` | Soundtrack product experience |
| `/[locale]/soundtrack-trial` | Reviewed Soundtrack trial request |
| `/[locale]/how-it-works` | BMAsia operating model |
| `/[locale]/licensing` | Music licensing guidance |
| `/[locale]/quotation` | Request a tailored proposal |
| `/[locale]/solutions/[industry]` | 12 tailored industry experiences |
| `/[locale]/privacy`, `/cookies`, `/terms` | Legal and privacy controls |

## Verification

```bash
npm run lint
npm run typecheck
npm run check:locales
npm run build
```

## Environment Variables

See `.env.example` for required variables.

## Deployment

This site deploys to Render from the configured production branch. Do not treat a branch preview as a production deployment.

## Brand Colors

- Primary Orange: `#EFA634`
- Dark: `#0f0f0f`
- Navy: `#1a1a2e`

## License

Private - BMAsia
