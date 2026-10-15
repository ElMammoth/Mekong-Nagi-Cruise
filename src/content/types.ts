/**
 * Content model. Structure, prices and dates live in `src/content/*`; every word shown to
 * visitors lives in the translation files (`src/i18n/messages/*`). Both are checked by
 * TypeScript at build time, so a typo in a price, weekday or key fails the build.
 */
import type { TripSlug } from "@/i18n/routes";

export type { TripSlug };

/** 0 = Sunday … 6 = Saturday (same as `Date.prototype.getDay`). */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type TripKind = "cruise" | "landCruise";

/** A price option as authored: prices in US dollars only (the single source of truth). */
export interface PriceOptionData {
  id: string;
  /** Price per person in US dollars. */
  usd: number;
  /** True when the price is per person in a shared twin/double room. */
  twinShare?: boolean;
  /** Single supplement in US dollars. */
  singleSupplementUsd?: number;
  /** ISO date (inclusive). Options outside their window are hidden automatically. */
  validFrom?: string;
  /** ISO date (inclusive). */
  validTo?: string;
}

export interface TripData {
  slug: TripSlug;
  kind: TripKind;
  /** Ordered places along the route (place names are not translated). */
  route: string[];
  departures: { weekdays: Weekday[] };
  options: PriceOptionData[];
  /** Grouping of `options` into package cards, in display order (copy in the messages). */
  packages?: { id: string; optionIds: string[] }[];
  photo?: PhotoId;
}

/** A price option with its copy in the page's language. */
export interface PriceOption extends PriceOptionData {
  label: string;
  detail?: string;
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

export interface Package {
  id: string;
  name: string;
  summary: string;
  optionIds: string[];
  highlight?: string;
  points: string[];
}

/** A trip with its copy in the page's language (what components render). */
export interface Trip {
  slug: TripSlug;
  kind: TripKind;
  kindLabel: string;
  name: string;
  /** Short label for navigation and form selects. */
  shortName: string;
  bookTitle: string;
  summary: string;
  route: string[];
  duration: string;
  departures: { weekdays: Weekday[]; label: string; note?: string };
  priceOnRequest?: string;
  options: PriceOption[];
  minimum?: string;
  included: string[];
  notIncluded: string[];
  itinerary: ItineraryDay[];
  goodToKnow: string[];
  packages?: Package[];
  extras?: string[];
  photo?: PhotoSlot;
  seo: { title: string; description: string };
  /** English names for the message sent to the operator, whatever the page language. */
  operator: { name: string; options: Record<string, string>; extras: string[] };
}

export type StayPlace = "Pak Beng" | "Luang Prabang" | "Houay Xai";
export type StayId = "mon-savahn" | "le-grande" | "sanctuary" | "villa-mira" | "homy-dormy";

export interface StayData {
  id: StayId;
  name: string;
  place: StayPlace;
  url?: string;
  contact?: string;
  /** Downstream price option that includes this hotel, if any. */
  packageOptionId?: string;
}

export interface Stay extends StayData {
  tier: string;
  description: string;
  facts: string[];
}

export interface Faq {
  question: string;
  answer: string;
}

export type PhotoRatio = "16/9" | "3/2" | "4/3" | "1/1" | "4/5";

export type PhotoId =
  | "hero"
  | "riverBanks"
  | "pakOuCave"
  | "pakBeng"
  | "village"
  | "boatExterior"
  | "boatInterior"
  | "lunch"
  | "host"
  | "crew"
  | "upstream"
  | "chiangMai"
  | "nan"
  | "charter";

/** A photo slot as authored. Drop `photos/<file>.jpg` in the repo and it appears on the next build. */
export interface PhotoSlotData {
  /** File name without extension: lowercase words joined by hyphens. */
  file: string;
  ratio: PhotoRatio;
  /** Brief for the photographer (see docs/06-shot-list.md). Not shown on the site. */
  shot: string;
}

/** A photo slot with its alt text and caption in the page's language. */
export interface PhotoSlot extends PhotoSlotData {
  alt: string;
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
  /** True when the platform says the figures combine Viator and Tripadvisor. */
  combined?: boolean;
}

export interface Review {
  platform: ReviewPlatform;
  reviewer: string;
  /** As shown on the platform: "YYYY-MM" or "YYYY-MM-DD". */
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title?: string;
  /** Verbatim text, never translated. */
  text: string;
  /** BCP 47 language the review is written in. Defaults to "en". */
  lang?: string;
  url: string;
  placement?: "offer" | "booking";
}

/** A TikTok video that mentions Nagi of Mekong (social proof, not a rated review). */
export interface TikTokVideo {
  /** Numeric video id, as in the URL. */
  id: string;
  /** Creator handle without "@". */
  handle: string;
  /** Clean video URL: https://www.tiktok.com/@handle/video/id (no tracking parameters). */
  url: string;
  /** ISO date the video was found and its public details read. */
  retrievedAt: string;
  /** BCP 47 language of the caption. */
  captionLang: string;
}
