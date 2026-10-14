import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Full metadata for a page. Next.js replaces (doesn't merge) `openGraph` and `twitter`
 * from the layout, so every page sets them completely here.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  /** With trailing slash, e.g. "/where-to-stay/". */
  path: string;
  /** Use the title as-is, without the " · Nagi of Mekong" suffix. */
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · ${site.name}`;
  const image = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    type: "image/png",
    alt: `${site.name}: slow-boat cruises from Houay Xai to Luang Prabang`,
  };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_GB",
      title: fullTitle,
      description,
      url: path,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}
