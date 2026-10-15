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
  /**
   * Optional grouping of `options` into packages shown as side-by-side cards.
   * Trips without packages show a simple price list.
   */
  packages?: Package[];
  /** Optional extras the traveller can tick in the booking form ("Also ask us about…"). */
  extras?: string[];
  /** Header photo for the trip page. */
  photo?: PhotoSlot;
  seo: { title: string; description: string };
}

export interface Package {
  id: string;
  name: string;
  summary: string;
  /** Price options (by id) that belong to this package. Unavailable ones are skipped. */
  optionIds: string[];
  /** Short factual label on the card, e.g. "Everything included". */
  highlight?: string;
  /** What this package adds or leaves out, in plain words. */
  points: string[];
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

export type PhotoRatio = "16/9" | "3/2" | "4/3" | "1/1" | "4/5";

/** A photo slot. Drop `photos/<file>.jpg` in the repo and it appears on the next build. */
export interface PhotoSlot {
  /** File name without extension: lowercase words joined by hyphens. */
  file: string;
  /** Describes what the photo shows. Update it if your photo shows something else. */
  alt: string;
  ratio: PhotoRatio;
  /** Brief for the photographer (see docs/06-shot-list.md). Not shown on the site. */
  shot: string;
  caption?: string;
}

export type ReviewPlatform = "tripadvisor" | "viator";

export interface RatingSnapshot {
  platform: ReviewPlatform;
  /** Average rating exactly as displayed, out of 5. */
  rating: number;
  /** Number of reviews exactly as displayed. */
  count: number;
  /** ISO date the figures were copied from the platform. */
  asOf: string;
  /** Optional breakdown as shown on the platform: number of reviews per star level. */
  distribution?: Partial<Record<1 | 2 | 3 | 4 | 5, number>>;
  /** What the figures cover, in the platform's own words when it says (shown with them). */
  note?: string;
}

export interface Review {
  platform: ReviewPlatform;
  reviewer: string;
  /** As shown on the platform: "YYYY-MM" or "YYYY-MM-DD". */
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title?: string;
  /** Verbatim text. */
  text: string;
  /** BCP 47 language of the text when it isn't English, e.g. "fr". */
  lang?: string;
  url: string;
  placement?: "offer" | "booking";
}
