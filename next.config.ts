import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // টাইপ চেকিং পুরোপুরি বন্ধ করার জন্য
  webpack: (config) => {
    config.plugins = config.plugins.filter((plugin: any) => plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin');
    return config;
  },
};

export default nextConfig;