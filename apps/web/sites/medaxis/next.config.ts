import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@portfolio/content", "@portfolio/sdk", "@portfolio/ui"]
};

export default nextConfig;

