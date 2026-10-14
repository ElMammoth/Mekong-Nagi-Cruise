/**
 * Content model. Everything the organisation may want to change lives in `src/content/*`
 * and is checked by TypeScript at build time, so a typo in a price or weekday fails the build
 * instead of shipping.
 */

export type Currency = "USD" | "EUR" | "THB";

/** A price expressed in one or more currencies, exactly as published by the operator. */
export type Money = Partial<Record<Currency, number>>;

/** 0 = Sunday … 6 = Saturday (same as `Date.prototype.getDay`). */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface PriceOption {
  id: string;
  label: string;
  detail?: string;
  perPerson: Money;
  /** True when the published price is per person in a shared twin/double room. */
  twinShare?: boolean;
  singleSupplement?: Money;
  /** ISO date (inclusive). Options outside their window are hidden automatically. */
  validFrom?: string;
  /** ISO date (inclusive). */
  validTo?: string;
  badge?: string;
}

export interface ItineraryStop {
  title: string;
  text?: string;
}

export interface ItineraryDay {
  label: string;
  title: string;
  meals?: string;
  stops: ItineraryStop[];
  note?: string;
}

export interface Trip {
  slug: string;
  name: string;
  /** Short label for navigation and form selects. */
  shortName: string;
  kind: "River cruise" | "Land & cruise";
  summary: string;
  /** Ordered places along the route. */
  route: string[];
  duration: string;
  departures: {
    weekdays: Weekday[];
    /** What happens on that weekday, e.g. "Boat leaves Houay Xai". */
    label: string;
    note?: string;
  };
  /** Shown when the trip has no published prices. */
  priceOnRequest?: string;
  options: PriceOption[];
  minimum?: string;
  included: string[];
  notIncluded: string[];
  itinerary: ItineraryDay[];
  goodToKnow: string[];
  seo: { title: string; description: string };
}

export interface Stay {
  name: string;
  place: "Pak Beng" | "Luang Prabang" | "Houay Xai";
  tier: string;
  description: string;
  facts: string[];
  url?: string;
  contact?: string;
  /** Downstream price option that includes this hotel, if any. */
  packageOptionId?: string;
}

export interface Faq {
  question: string;
  answer: string;
}
