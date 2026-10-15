import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { defaultLocale, localeInfo, locales } from "@/i18n/config";
import { alternatesFor, pageKeys } from "@/i18n/routes";

export const dynamic = "force-static";

/**
 * Every page in every language. Each entry lists all its language versions (and x-default),
 * so the hreflang annotations in the sitemap match the ones in the page heads.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pageKeys.flatMap((key) => {
    const alternates = alternatesFor(key);
    const languages = {
      ...Object.fromEntries(locales.map((l) => [localeInfo[l].tag, `${site.url}${alternates[l]}`])),
      "x-default": `${site.url}${alternates[defaultLocale]}`,
    };
    return locales.map((locale) => ({
      url: `${site.url}${alternates[locale]}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: key === "home" ? 1 : key.startsWith("trip:") ? 0.9 : 0.6,
      alternates: { languages },
    }));
  });
}
