import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // বিল্ডের সময় TypeScript এররগুলোকে ইগনোর করবে
    ignoreBuildErrors: true,
  },

};

export default nextConfig;