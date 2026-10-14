import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { trips } from "@/content/trips";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = [
    "/",
    "/where-to-stay/",
    "/private-charters/",
    "/guides/houay-xai-to-luang-prabang/",
    "/plan-your-trip/",
    "/contact/",
    "/privacy/",
  ];
  return [
    ...pages.map((path) => ({
      url: `${site.url}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.6,
    })),
    ...trips.map((trip) => ({
      url: `${site.url}/cruises/${trip.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
