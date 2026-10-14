import { trips } from "./trips";

export const cruiseLinks = trips.map((trip) => ({
  href: `/cruises/${trip.slug}/`,
  label: trip.shortName.split(" · ")[1] ?? trip.shortName,
  kind: trip.kind,
  duration: trip.duration,
}));

export const primaryLinks = [
  { href: "/where-to-stay/", label: "Where to stay" },
  { href: "/private-charters/", label: "Private charters" },
  { href: "/guides/houay-xai-to-luang-prabang/", label: "Route guide" },
  { href: "/plan-your-trip/", label: "FAQ" },
  { href: "/contact/", label: "Contact" },
] as const;

/** General booking form (any trip). */
export const bookingHref = "/contact/#booking";
/** The core offer's booking form: one step shorter from the home page. */
export const downstreamBookingHref = "/cruises/downstream/#book";
/** One label for the primary action everywhere (docs/04-offer-brief.md §9). */
export const bookingLabel = "Check availability";
