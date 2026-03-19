const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: Removed 'output: export' to enable API routes with PostgreSQL + email
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
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
      ],
    };
  },
};

module.exports = withNextIntl(nextConfig);
