import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // বিল্ডের সময় TypeScript এররগুলোকে ইগনোর করবে
    ignoreBuildErrors: true,
  },
  eslint: {
    // বিল্ডের সময় ESLint এররগুলোকেও ইগনোর করবে
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;