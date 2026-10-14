import type { RatingSnapshot, Review, ReviewPlatform } from "./types";

/**
 * Customer reviews — genuine only.
 *
 * Rules (also checked by `npm test`):
 * 1. Copy each review exactly as published: same words, spelling and punctuation. Never
 *    edit, shorten inside a sentence or combine reviews. If you need it shorter, pick a
 *    different review.
 * 2. `reviewer` is the name exactly as the platform shows it.
 * 3. `url` is the link to that review (or to the listing page if the review has no link).
 * 4. Rating figures must match the platform on the day you copy them; put that day in `asOf`.
 *    Update them when you add reviews.
 *
 * Nothing is marked up as structured data: Google doesn't allow review rich results for
 * reviews collected on other sites.
 */

/**
 * Date the reviews and ratings below were last copied from the platforms (ISO "YYYY-MM-DD").
 * `null` until real data is pasted in; shown on the site next to the reviews.
 */
export const reviewsRetrievedAt: string | null = null;

export const reviewPlatforms: Record<ReviewPlatform, { name: string; listingUrl: string }> = {
  tripadvisor: {
    name: "Tripadvisor",
    listingUrl:
      "https://www.tripadvisor.fr/Attraction_Review-g737155-d15773080-Reviews-Nagi_of_Mekong_Cruise-Huay_Xai_Bokeo_Province.html",
  },
  viator: {
    name: "Viator",
    listingUrl:
      "https://www.viator.com/tours/Northern-Thailand/Nagi-of-Mekong-cruise/d22518-223302P2",
  },
};

/**
 * Overall rating per platform, as displayed on the listing page.
 *
 * Example (replace with the real figures):
 * { platform: "tripadvisor", rating: 4.5, count: 120, asOf: "2026-10-14" },
 */
export const ratings: RatingSnapshot[] = [];

/**
 * Individual reviews. `placement` chooses where a review appears:
 * "offer" → the review cards next to the packages (up to 3),
 * "booking" → the single quote next to the booking form and call to action.
 *
 * Example (replace with a real review):
 * {
 *   platform: "tripadvisor",
 *   reviewer: "Name as shown",
 *   date: "2025-11",            // month of the trip/review as shown ("YYYY-MM" or "YYYY-MM-DD")
 *   rating: 5,
 *   title: "Title as shown",     // optional
 *   text: "Full review text exactly as published.",
 *   lang: "fr",                  // language of the original text, if not English
 *   url: "https://www.tripadvisor.fr/ShowUserReviews-…",
 *   placement: "offer",
 * },
 */
export const reviews: Review[] = [];
