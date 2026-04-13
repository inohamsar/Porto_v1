import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Allow mobile devices on local network to access dev server (dev-only, ignored in production)
  allowedDevOrigins: ['10.10.10.6'],
  // Higher performance during dev
  reactStrictMode: false,
};

export default nextConfig;
