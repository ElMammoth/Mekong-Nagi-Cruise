import { site } from "@/content/site";
import type { Trip } from "@/content/types";
import { availableOptions } from "./departures";

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
  return { "@context": "https://schema.org", ...org };
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
    }));
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
    ...(offers.length ? { offers } : {}),
  };
}

/** Safe inline JSON for <script type="application/ld+json">. */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
