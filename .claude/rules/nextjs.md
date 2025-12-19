---
paths: app/**/*.tsx, components/**/*.tsx
---

# Next.js 14 Patterns

## App Router Conventions

### Page Components
```tsx
// app/page-name/page.tsx
export default function PageName() {
  return (
    <main>
      {/* Page content */}
    </main>
  );
}
```

### Client Components
Use `'use client'` directive for components with:
- useState, useEffect, or other hooks
- Event handlers (onClick, onChange, etc.)
- Browser APIs (window, document)
- Framer Motion animations

```tsx
'use client';

import { motion } from 'framer-motion';

export function AnimatedComponent() {
  // Interactive component
}
```

### Server Components (Default)
Keep as server components when possible:
- Static content
- Data fetching
- SEO-critical content

### Metadata
```tsx
// app/page-name/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title | BMAsia',
  description: 'Page description for SEO (150-160 chars)',
  openGraph: {
    title: 'Page Title | BMAsia',
    description: 'OpenGraph description',
    url: 'https://bmasiamusic.com/page-name',
    siteName: 'BMAsia',
    type: 'website',
  },
};
```

### Layout Pattern
```tsx
// app/layout.tsx
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

## Image Optimization
```tsx
import Image from 'next/image';

<Image
  src="/images/photo.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  priority // for above-fold images
  className="object-cover"
/>
```

## Link Navigation
```tsx
import Link from 'next/link';

<Link href="/how-it-works" className="text-orange-500 hover:underline">
  How It Works
</Link>
```

## Static Export Config
```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
};

module.exports = nextConfig;
```
