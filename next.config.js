/** @type {import('next').NextConfig} */
const securityHeaders = require('./headers');

const nextConfig = {
  images: {
    loader: 'custom'
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
