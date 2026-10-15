import type { NextConfig } from "next";
import { isBrevoFormUrl } from "./src/lib/newsletter/brevo";

// Fail the build, not the visitor, when the newsletter provider is misconfigured.
const provider = process.env.NEXT_PUBLIC_NEWSLETTER_PROVIDER;
if (provider && !["stub", "brevo"].includes(provider)) {
  throw new Error(`Unknown NEXT_PUBLIC_NEWSLETTER_PROVIDER "${provider}" (use "brevo" or "stub").`);
}
if (provider === "brevo" && !isBrevoFormUrl(process.env.NEXT_PUBLIC_BREVO_FORM_URL)) {
  throw new Error(
    "NEXT_PUBLIC_NEWSLETTER_PROVIDER=brevo needs NEXT_PUBLIC_BREVO_FORM_URL set to the Brevo form's action URL (https://….sibforms.com/serve/…).",
  );
}

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
