import type { NextConfig } from "next";

const isExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isExport && {
    output: "export",
  }),
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
