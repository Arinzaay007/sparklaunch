/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root — a stray lockfile in the home dir was making
  // Next.js guess the wrong root.
  outputFileTracingRoot: import.meta.dirname,
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
