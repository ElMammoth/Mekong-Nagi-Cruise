import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static output: the site can be hosted anywhere (GoDaddy, Netlify, S3, Vercel…).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
