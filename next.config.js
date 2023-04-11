/** @type {import('next').NextConfig} */
const securityHeaders = require('./headers');

const nextConfig = {
  images: {
    domains: ['static.truesparrow.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    formats: ['image/avif', 'image/webp']
  },
  reactStrictMode: true,
  basePath: '',
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders
      }
    ];
  }
};

module.exports = nextConfig;
