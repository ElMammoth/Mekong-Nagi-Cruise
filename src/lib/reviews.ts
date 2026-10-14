import { ratings, reviewPlatforms, reviews } from "@/content/reviews";
import type { RatingSnapshot, Review, ReviewPlatform } from "@/content/types";

const MONTHS = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" });
const DAYS = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

/** "2025-11" → "November 2025"; "2025-11-03" → "3 November 2025". */
export function formatReviewDate(value: string): string {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m) return value;
  return d ? DAYS.format(new Date(y, m - 1, d)) : MONTHS.format(new Date(y, m - 1, 1));
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
