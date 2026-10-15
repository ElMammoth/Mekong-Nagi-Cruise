import { ratings, reviewPlatforms, reviews } from "@/content/reviews";
import type { RatingSnapshot, Review, ReviewPlatform } from "@/content/types";

/** "2025-11" → "November 2025"; "2025-11-03" → "3 November 2025" (in the page's locale). */
export function formatReviewDate(value: string, intlLocale = "en-GB"): string {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m) return value;
  return d
    ? new Intl.DateTimeFormat(intlLocale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(y, m - 1, d))
    : new Intl.DateTimeFormat(intlLocale, { month: "long", year: "numeric" }).format(
        new Date(y, m - 1, 1),
      );
}

/** Language a review is written in ("en" when not set). */
export function reviewLang(review: Review): string {
  return review.lang ?? "en";
}

/** Name of a language in the page's language: ("nl", "fr-FR") → "néerlandais". */
export function languageName(tag: string, intlLocale: string): string {
  try {
    const name = new Intl.DisplayNames([intlLocale], { type: "language" }).of(tag) ?? tag;
    return name.charAt(0).toLocaleUpperCase(intlLocale) + name.slice(1);
  } catch {
    return tag;
  }
}

export function platformName(platform: ReviewPlatform) {
  return reviewPlatforms[platform].name;
}

export function ratingFor(platform: ReviewPlatform): RatingSnapshot | undefined {
  return ratings.find((r) => r.platform === platform);
}

/** Reviews for the cards next to the offer: those placed there first, then the rest. */
export function offerReviews(limit = 3): Review[] {
  const placed = reviews.filter((r) => r.placement === "offer");
  const rest = reviews.filter((r) => r.placement !== "offer" && r.placement !== "booking");
  return [...placed, ...rest].slice(0, limit);
}

/** Every review not already shown in the offer cards, newest first. */
export function moreReviews(shown: readonly Review[]): Review[] {
  return reviews.filter((r) => !shown.includes(r)).sort((a, b) => b.date.localeCompare(a.date));
}

/** The single review shown next to the booking form. */
export function bookingReview(): Review | undefined {
  return reviews.find((r) => r.placement === "booking");
}

export const allPlatforms = Object.keys(reviewPlatforms) as ReviewPlatform[];

const HOSTS: Record<ReviewPlatform, RegExp> = {
  tripadvisor: /(^|\.)tripadvisor\.[a-z.]+$/,
  viator: /(^|\.)viator\.com$/,
};

/** Problems with a review entry; empty when it can be published. Used by the tests. */
export function reviewProblems(review: Review): string[] {
  const problems: string[] = [];
  let host = "";
  try {
    host = new URL(review.url).hostname;
  } catch {
    problems.push("url is not a valid link");
  }
  if (host && !HOSTS[review.platform].test(host)) problems.push("url is not on the platform");
  if (!review.reviewer.trim()) problems.push("reviewer is empty");
  if (!review.text.trim()) problems.push("text is empty");
  if (!/^\d{4}-\d{2}(-\d{2})?$/.test(review.date)) problems.push("date must be YYYY-MM(-DD)");
  if (![1, 2, 3, 4, 5].includes(review.rating)) problems.push("rating must be 1–5");
  return problems;
}

export function ratingProblems(rating: RatingSnapshot, today: string): string[] {
  const problems: string[] = [];
  if (!(rating.rating >= 1 && rating.rating <= 5)) problems.push("rating must be between 1 and 5");
  if (!Number.isInteger(rating.count) || rating.count < 1) problems.push("count must be ≥ 1");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(rating.asOf)) problems.push("asOf must be YYYY-MM-DD");
  else if (rating.asOf > today) problems.push("asOf is in the future");
  return problems;
}
