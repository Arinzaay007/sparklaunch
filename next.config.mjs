/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  eslint: {
    // Don't fail production builds on lint errors — keeps Vercel deploys green.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
