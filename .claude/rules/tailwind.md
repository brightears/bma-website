---
paths: **/*.tsx, styles/**/*.css, tailwind.config.*
---

# Tailwind CSS Patterns - BMAsia

## Brand Colors

### Primary Palette
```
Orange (Primary): #EFA634
Dark Background:  #0f0f0f
Navy:             #1a1a2e
White:            #ffffff
```

### Tailwind Config
```js
// tailwind.config.ts
colors: {
  brand: {
    orange: '#EFA634',
    'orange-dark': '#d99530',
    dark: '#0f0f0f',
    navy: '#1a1a2e',
  }
}
```

### Usage
```tsx
// Using custom colors
<div className="bg-brand-orange text-white">
<div className="bg-brand-dark text-white">

// Or inline when needed
<div className="bg-[#EFA634]">
```

## Common Patterns

### Section Container
```tsx
<section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
  <div className="max-w-7xl mx-auto">
    {/* Content */}
  </div>
</section>
```

### Dark Section
```tsx
<section className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a2e] py-24">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-white text-4xl font-bold">
      Heading
    </h2>
  </div>
</section>
```

### Glassmorphism Card
```tsx
<div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
  {/* Card content */}
</div>
```

### Primary Button
```tsx
<button className="bg-[#EFA634] hover:bg-[#d99530] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
  Get Started
</button>
```

### Outline Button
```tsx
<button className="border-2 border-[#EFA634] text-[#EFA634] hover:bg-[#EFA634] hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors">
  Learn More
</button>
```

### Gradient Text
```tsx
<span className="bg-gradient-to-r from-[#EFA634] to-amber-400 bg-clip-text text-transparent">
  Highlighted Text
</span>
```

## Responsive Breakpoints
```
sm:  640px   // Mobile landscape
md:  768px   // Tablet
lg:  1024px  // Laptop
xl:  1280px  // Desktop
2xl: 1536px  // Large desktop
```

### Mobile-First Pattern
```tsx
// Start with mobile, add larger breakpoints
<div className="text-lg md:text-xl lg:text-2xl">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<div className="px-4 md:px-8 lg:px-16">
```

## Typography Scale

### Headings
```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
<h2 className="text-3xl md:text-4xl font-bold">
<h3 className="text-2xl md:text-3xl font-semibold">
```

### Body Text
```tsx
<p className="text-base md:text-lg text-gray-300">
<p className="text-sm text-gray-400">
```

## Spacing Reference
```
4:  1rem   (16px)
6:  1.5rem (24px)
8:  2rem   (32px)
12: 3rem   (48px)
16: 4rem   (64px)
20: 5rem   (80px)
24: 6rem   (96px)
```

## Animation Classes (with Framer Motion)
```tsx
// Combine Tailwind with Framer Motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="transition-colors hover:bg-white/10"
>
```

## Focus & Accessibility
```tsx
// Always include focus states
<button className="focus:outline-none focus:ring-2 focus:ring-[#EFA634] focus:ring-offset-2 focus:ring-offset-[#0f0f0f]">

// Skip to content link
<a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#EFA634] text-white px-4 py-2 rounded">
  Skip to content
</a>
```
