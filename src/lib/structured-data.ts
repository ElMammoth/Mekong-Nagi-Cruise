import manifest from "@/content/photos.generated.json";
import { site } from "@/content/site";
import type { Faq, PhotoSlot, Trip } from "@/content/types";
import { availableOptions } from "./departures";

/** Largest generated file for a photo, if the photo exists. */
function photoUrl(photo?: PhotoSlot): string | undefined {
  const entry = photo ? (manifest as Record<string, { widths: number[] }>)[photo.file] : undefined;
  const width = entry?.widths.at(-1);
  return photo && width ? `${site.url}/images/${photo.file}-${width}.webp` : undefined;
}

const org = {
  "@type": "TravelAgency",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  email: site.contact.email,
  telephone: site.contact.phoneHref.replace("tel:", ""),
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.contact.location.locality,
    addressRegion: site.contact.location.region,
    postalCode: site.contact.location.postalCode,
    addressCountry: "TH",
  },
  areaServed: ["Laos", "Thailand"],
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { ...org, logo: `${site.url}/brand/logo-original.jpg` },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "en",
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };
}

/** BreadcrumbList for an inner page; `crumbs` is the trail after Home. */
export function breadcrumbJsonLd(crumbs: readonly { href: string; label: string }[]) {
  const trail = [{ href: "/", label: "Home" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: `${site.url}${crumb.href}`,
    })),
  };
}

/** FAQPage: only for questions shown in full on the same page. */
export function faqJsonLd(faqs: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function tripJsonLd(trip: Trip) {
  const offers = availableOptions(trip.options)
    .filter((o) => typeof o.perPerson.USD === "number")
    .map((o) => ({
      "@type": "Offer",
      name: o.label,
      price: o.perPerson.USD,
      priceCurrency: "USD",
      url: `${site.url}/cruises/${trip.slug}/`,
      ...(o.validTo ? { priceValidUntil: o.validTo } : {}),
    }));
  const image = photoUrl(trip.photo);
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trip.name,
    description: trip.summary,
    url: `${site.url}/cruises/${trip.slug}/`,
    itinerary: {
      "@type": "ItemList",
      itemListElement: trip.route.map((place, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "Place", name: place },
      })),
    },
    provider: { "@id": `${site.url}/#organization` },
    ...(image ? { image } : {}),
    ...(offers.length ? { offers } : {}),
  };
}

/** Safe inline JSON for <script type="application/ld+json">. */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
