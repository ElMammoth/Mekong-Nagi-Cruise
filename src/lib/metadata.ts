import type { Metadata, Viewport } from "next";
import { getTripData } from "@/content/trips";
import { site } from "@/content/site";
import { defaultLocale, localeInfo, locales, type Locale } from "@/i18n/config";
import { fmt, getMessages } from "@/i18n/index";
import { alternatesFor, pathFor, type PageKey, type TripSlug } from "@/i18n/routes";
import { formatCurrency, fromPriceUsd } from "@/lib/currency";
import { availableOptions } from "@/lib/departures";
import { token } from "@/lib/tokens";

export const rootViewport: Viewport = {
  themeColor: token("color-primary"),
  width: "device-width",
  initialScale: 1,
};

/** Defaults for every page of a language (each page overrides title, description, URLs). */
export function rootMetadata(locale: Locale): Metadata {
  const m = getMessages(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: m.meta.siteTitle, template: `%s · ${site.name}` },
    description: homeDescription(locale),
    applicationName: site.name,
    formatDetection: { telephone: false },
  };
}

/** "From US$140" in a language's number format, from the live (non-expired) options. */
export function fromPriceText(locale: Locale, slug: TripSlug): string {
  const from = fromPriceUsd(availableOptions(getTripData(slug)?.options ?? []));
  return from === undefined ? "" : formatCurrency(from, "USD", localeInfo[locale].intl);
}

function homeDescription(locale: Locale) {
  return fmt(getMessages(locale).meta.siteDescription, {
    from: fromPriceText(locale, "downstream"),
  });
}

/** Title (without the site name) and description of a page in a language. */
export function pageCopy(locale: Locale, key: PageKey): { title: string; description: string } {
  const m = getMessages(locale);
  if (key.startsWith("trip:")) {
    const slug = key.slice(5) as TripSlug;
    const seo = m.trips[slug].seo;
    return {
      title: seo.title,
      description: fmt(seo.description, { from: fromPriceText(locale, slug) }),
    };
  }
  switch (key) {
    case "home":
      return { title: m.meta.siteTitle, description: homeDescription(locale) };
    case "whereToStay":
      return m.whereToStay;
    case "charters":
      return m.charters;
    case "guide":
      return m.guide;
    case "faq":
      return m.faqPage;
    case "contact":
      return m.contactPage;
    case "privacy":
      return m.privacy;
    default:
      throw new Error(`No copy for page ${key}`);
  }
}

/**
 * Full metadata for a page: title, description, self-referencing canonical, hreflang for
 * every language plus x-default (the English page), and Open Graph with its locale.
 * Every language version is built from the same route table, so the hreflang links are
 * always reciprocal. Next.js replaces (doesn't merge) `openGraph` and `twitter` from the
 * layout, so they are set completely here.
 */
export function pageMetadata(locale: Locale, key: PageKey): Metadata {
  const m = getMessages(locale);
  const { title, description } = pageCopy(locale, key);
  const home = key === "home";
  const fullTitle = home ? title : `${title} · ${site.name}`;
  const path = pathFor(locale, key);
  const alternates = alternatesFor(key);
  const image = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    type: "image/png",
    alt: m.meta.ogAlt,
  };
  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(locales.map((l) => [localeInfo[l].tag, alternates[l]])),
        "x-default": alternates[defaultLocale],
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: localeInfo[locale].og,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeInfo[l].og),
      title: fullTitle,
      description,
      url: path,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}
