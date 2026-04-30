/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  // PWA Support can be added via @ducanh2912/next-pwa if preferred
};

module.exports = nextConfig;