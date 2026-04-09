const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: Removed 'output: export' to enable API routes with PostgreSQL + email
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/design',
          destination: 'https://bmasia-music-brief-v2.onrender.com/',
        },
        {
          source: '/design/:path*',
          destination: 'https://bmasia-music-brief-v2.onrender.com/:path*',
        },
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
