/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/chase-manning/pokemon-tcg-pocket-cards/**',
      },
    ],
  },
  experimental: {
    appDir: true, // Enable the App Router if required
  },
};

module.exports = nextConfig;
