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
  { href: "/plan-your-trip/", label: "Plan your trip" },
  { href: "/contact/", label: "Contact" },
] as const;

export const bookingHref = "/contact/#booking";
