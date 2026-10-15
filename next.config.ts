import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  // Fully static output: the site can be hosted anywhere (GoDaddy, Netlify, S3, Vercel…).
  output: "export",
  trailingSlash: true,
  images: {
    // Photos are resized ahead of time by scripts/build-photos.mjs; the loader picks the
    // closest pre-generated width, so responsive images work without an image server.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [480, 768, 1080, 1440, 1920],
    imageSizes: [320],
  },
  reactStrictMode: true,
  // Two root layouts (English at "/", other languages under their prefix) need a global 404.
  experimental: { globalNotFound: true },
  poweredByHeader: false,
};

export default nextConfig;
