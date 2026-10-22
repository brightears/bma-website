const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

// Content-Security-Policy, shipped as Report-Only first. Origins are taken from
// the code that actually loads third-party resources:
// - Google Tag Manager / GA4 and Apollo tracker: components/layout/CookieConsent.tsx
//   (loaded only after analytics consent)
// - Cloudflare Turnstile: components/security/useTurnstile.ts (only when keys are set)
// - Beat Breeze sample covers/audio: presigned R2 URLs via app/api/beat-breeze-samples
// - Fonts are self-hosted by next/font; Calendly and Soundtrack are plain links.
// Next.js inline bootstrap scripts and JSON-LD need 'unsafe-inline' until a
// nonce-based policy is introduced. Review browser console reports before
// switching to an enforced Content-Security-Policy header.
const isDev = process.env.NODE_ENV !== 'production';
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://www.google-analytics.com https://assets.apollo.io https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.r2.cloudflarestorage.com https://www.googletagmanager.com https://*.google-analytics.com https://*.apollo.io",
  "media-src 'self' blob: https://*.r2.cloudflarestorage.com https://bmasia-audio-sharing.onrender.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.apollo.io https://challenges.cloudflare.com",
  "frame-src 'self' https://challenges.cloudflare.com",
  "worker-src 'self' blob:",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ');

// No site feature uses the camera, microphone (the chat is text-only) or
// location. Turnstile may request private-state tokens from Cloudflare.
const permissionsPolicy = [
  'camera=()',
  'microphone=()',
  'geolocation=()',
  'payment=()',
  'usb=()',
  'serial=()',
  'bluetooth=()',
  'hid=()',
  'midi=()',
  'magnetometer=()',
  'gyroscope=()',
  'accelerometer=()',
  'display-capture=()',
  'browsing-topics=()',
  'private-state-token-redemption=(self "https://challenges.cloudflare.com")',
  'private-state-token-issuance=(self "https://challenges.cloudflare.com")',
].join(', ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Note: Removed 'output: export' to enable API routes with PostgreSQL + email
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.r2.cloudflarestorage.com',
      },
    ],
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/design',
        destination: '/en/quotation?source=music-design',
        permanent: true,
      },
      {
        source: '/design/:path*',
        destination: '/en/quotation?source=music-design',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/presentations/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Content-Security-Policy-Report-Only', value: contentSecurityPolicy },
          { key: 'Permissions-Policy', value: permissionsPolicy },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/listen/:path*',
          destination: 'https://bmasia-audio-sharing.onrender.com/listen/:path*',
        },
        {
          source: '/admin/:path*',
          destination: 'https://bmasia-audio-sharing.onrender.com/admin/:path*',
        },
        {
          source: '/admin',
          destination: 'https://bmasia-audio-sharing.onrender.com/admin',
        },
        {
          source: '/login',
          destination: 'https://bmasia-audio-sharing.onrender.com/login',
        },
        {
          source: '/login/',
          destination: 'https://bmasia-audio-sharing.onrender.com/login/',
        },
        {
          source: '/api/auth/:path*',
          destination: 'https://bmasia-audio-sharing.onrender.com/api/auth/:path*',
        },
        {
          source: '/api/folders/:path*',
          destination: 'https://bmasia-audio-sharing.onrender.com/api/folders/:path*',
        },
        {
          source: '/api/shares/:path*',
          destination: 'https://bmasia-audio-sharing.onrender.com/api/shares/:path*',
        },
        {
          source: '/api/tracks/:path*',
          destination: 'https://bmasia-audio-sharing.onrender.com/api/tracks/:path*',
        },
        {
          source: '/api/analytics/:path*',
          destination: 'https://bmasia-audio-sharing.onrender.com/api/analytics/:path*',
        },
        {
          source: '/api/tags/:path*',
          destination: 'https://bmasia-audio-sharing.onrender.com/api/tags/:path*',
        },
      ],
    };
  },
};

module.exports = withNextIntl(nextConfig);
