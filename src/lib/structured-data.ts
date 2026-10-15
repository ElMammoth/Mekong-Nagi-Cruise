import manifest from "@/content/photos.generated.json";
import { site } from "@/content/site";
import type { Faq, PhotoSlot, Trip } from "@/content/types";
import { localeInfo, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/index";
import { pathFor, tripKey, type PageKey } from "@/i18n/routes";
import { availableOptions } from "./departures";

/*
 * Structured data, in the language of the page (names, descriptions and `inLanguage`).
 * Prices stay in US dollars, the currency bookings are charged in. No Review or
 * AggregateRating markup: reviews come from Tripadvisor and Viator, and the TikTok videos
 * are social proof, not ratings.
 */

const abs = (path: string) => `${site.url}${path}`;

/** Largest generated file for a photo, if the photo exists. */
function photoUrl(photo?: PhotoSlot): string | undefined {
  const entry = photo ? (manifest as Record<string, { widths: number[] }>)[photo.file] : undefined;
  const width = entry?.widths.at(-1);
  return photo && width ? `${site.url}/images/${photo.file}-${width}.webp` : undefined;
}

const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

export function organizationJsonLd(locale: Locale) {
  const m = getMessages(locale);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": orgId,
        name: site.name,
        url: site.url,
        logo: `${site.url}/brand/logo.png`,
        email: site.contact.email,
        telephone: site.contact.phoneHref.replace("tel:", ""),
        description: m.meta.tagline,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.contact.location.locality,
          addressRegion: site.contact.location.region,
          postalCode: site.contact.location.postalCode,
          addressCountry: site.contact.location.countryCode,
        },
        areaServed: ["Laos", "Thailand"],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        inLanguage: localeInfo[locale].tag,
        publisher: { "@id": orgId },
      },
    ],
  };
}

/** The page itself, with its language (and what it is about, for trip pages). */
export function webPageJsonLd(
  locale: Locale,
  key: PageKey,
  { name, description }: { name: string; description: string },
) {
  const url = abs(pathFor(locale, key));
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: localeInfo[locale].tag,
    isPartOf: { "@id": websiteId },
    ...(key.startsWith("trip:") ? { about: { "@id": `${url}#trip` } } : {}),
  };
}

/** BreadcrumbList for an inner page; `crumbs` is the trail after Home (localized hrefs). */
export function breadcrumbJsonLd(
  locale: Locale,
  crumbs: readonly { href: string; label: string }[],
) {
  const m = getMessages(locale);
  const trail = [{ href: pathFor(locale, "home"), label: m.common.home }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: abs(crumb.href),
    })),
  };
}

/** FAQPage: only for questions shown in full on the same page (answers as plain text). */
export function faqJsonLd(locale: Locale, faqs: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: localeInfo[locale].tag,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function tripJsonLd(locale: Locale, trip: Trip) {
  const url = abs(pathFor(locale, tripKey(trip.slug)));
  const offers = availableOptions(trip.options).map((o) => ({
    "@type": "Offer",
    name: o.label,
    price: o.usd,
    priceCurrency: "USD",
    url,
    ...(o.validTo ? { priceValidUntil: o.validTo } : {}),
  }));
  const image = photoUrl(trip.photo);
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${url}#trip`,
    name: trip.name,
    description: trip.summary,
    url,
    itinerary: {
      "@type": "ItemList",
      itemListElement: trip.route.map((place, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "Place", name: place },
      })),
    },
    provider: { "@id": orgId },
    ...(image ? { image } : {}),
    ...(offers.length ? { offers } : {}),
  };
}

/** Safe inline JSON for <script type="application/ld+json">. */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
