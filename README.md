# BMAsia Website

Modern website for BMAsia - a B2B background music solutions provider.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Formspree
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

This creates a static export in the `/out` directory.

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
| `/` | Landing page |
| `/how-it-works` | Process explanation |
| `/licensing` | Music licensing info |
| `/quotation` | Request a quote |

## Environment Variables

See `.env.example` for required variables.

## Deployment

This site deploys automatically to Render when changes are pushed to the main branch.

## Brand Colors

- Primary Orange: `#EFA634`
- Dark: `#0f0f0f`
- Navy: `#1a1a2e`

## License

Private - BMAsia
