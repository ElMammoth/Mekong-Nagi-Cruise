import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/index";
import { href, pathFor, tripKey, type PageKey } from "@/i18n/routes";
import { getTrips } from "@/content/localized";

export interface NavLink {
  href: string;
  label: string;
}

export interface CruiseLink extends NavLink {
  /** "River cruise · 2 days · 1 night" */
  meta: string;
}

export interface Navigation {
  cruises: CruiseLink[];
  primary: NavLink[];
  /** General booking form (any trip). */
  bookingHref: string;
  /** The core offer's booking form: one step shorter from the home page. */
  downstreamBookingHref: string;
  bookingLabel: string;
  homeHref: string;
  privacyHref: string;
}

const primaryKeys = [
  ["whereToStay", "whereToStay"],
  ["charters", "charters"],
  ["guide", "guide"],
  ["faq", "faq"],
  ["contact", "contact"],
] as const satisfies readonly (readonly [PageKey, string])[];

/** Every navigation link in a language (header, mobile menu, footer). */
export function navigation(locale: Locale): Navigation {
  const m = getMessages(locale);
  return {
    cruises: getTrips(locale).map((trip) => ({
      href: pathFor(locale, tripKey(trip.slug)),
      label: trip.shortName.split(" · ")[1] ?? trip.shortName,
      meta: `${trip.kindLabel} · ${trip.duration}`,
    })),
    primary: primaryKeys.map(([key, label]) => ({
      href: pathFor(locale, key),
      label: m.nav[label],
    })),
    bookingHref: href(locale, "contact", { hash: "booking" }),
    downstreamBookingHref: href(locale, "trip:downstream", { hash: "book" }),
    bookingLabel: m.nav.bookingLabel,
    homeHref: pathFor(locale, "home"),
    privacyHref: pathFor(locale, "privacy"),
  };
}
