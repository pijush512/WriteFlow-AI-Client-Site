/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // এটি বিল্ড স্পিড বাড়াবে এবং এরর কমাতে সাহায্য করবে
    turbopack: false, 
  },
};

export default nextConfig;