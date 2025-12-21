/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: Removed 'output: export' to enable API routes with PostgreSQL + email
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
