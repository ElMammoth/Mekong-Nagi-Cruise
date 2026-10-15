import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getMessages } from "@/i18n/index";
import { token } from "@/lib/tokens";

export const dynamic = "force-static";

/** Web app manifest: icons generated from src/brand/logo.svg (npm run brand). */
export default function manifest(): MetadataRoute.Manifest {
  const m = getMessages("en");
  return {
    name: site.name,
    short_name: site.name,
    description: m.meta.tagline,
    start_url: "/",
    display: "browser",
    background_color: token("color-canvas"),
    theme_color: token("color-primary"),
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
