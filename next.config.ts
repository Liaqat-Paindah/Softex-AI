import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,  // Ignore ESLint during production builds
  },
  typescript: {
    ignoreBuildErrors: true,  // Ignore TypeScript errors during builds
  },
};



export default nextConfig;
