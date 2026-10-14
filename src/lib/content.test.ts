import { describe, expect, it } from "vitest";
import { photos } from "@/content/photos";
import { ratings, reviews, reviewsRetrievedAt } from "@/content/reviews";
import { trips } from "@/content/trips";
import { buildInquiryMessage } from "@/lib/inquiry";
import { formatReviewDate, ratingProblems, reviewProblems } from "@/lib/reviews";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";
import { toIsoDate } from "@/lib/departures";

describe("reviews", () => {
  it("every pasted review is complete and links to its platform", () => {
    for (const review of reviews) {
      expect(reviewProblems(review), review.reviewer).toEqual([]);
    }
  });

  it("has a valid retrieval date once data is pasted in", () => {
    if (ratings.length || reviews.length) expect(reviewsRetrievedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    if (reviewsRetrievedAt) expect(reviewsRetrievedAt <= toIsoDate(new Date())).toBe(true);
  });

  it("rating breakdowns never exceed the review count", () => {
    for (const rating of ratings) {
      const total = Object.values(rating.distribution ?? {}).reduce((a, b) => a + (b ?? 0), 0);
      expect(total).toBeLessThanOrEqual(rating.count);
    }
  });

  it("every rating is dated and plausible", () => {
    const today = toIsoDate(new Date());
    for (const rating of ratings) {
      expect(ratingProblems(rating, today), rating.platform).toEqual([]);
    }
    expect(new Set(ratings.map((r) => r.platform)).size).toBe(ratings.length);
  });

  it("flags incomplete or off-platform reviews", () => {
    const base = {
      platform: "viator" as const,
      reviewer: "A",
      date: "2025-11",
      rating: 5 as const,
      text: "Great",
      url: "https://www.viator.com/tours/x",
    };
    expect(reviewProblems(base)).toEqual([]);
    expect(reviewProblems({ ...base, url: "https://example.com/x" })).toContain(
      "url is not on the platform",
    );
    expect(reviewProblems({ ...base, text: " " })).toContain("text is empty");
    expect(
      reviewProblems({ ...base, platform: "tripadvisor", url: "https://www.tripadvisor.fr/x" }),
    ).toEqual([]);
    expect(
      ratingProblems(
        { platform: "viator", rating: 4.5, count: 10, asOf: "2999-01-01" },
        "2026-10-14",
      ),
    ).toContain("asOf is in the future");
  });

  it("formats review dates", () => {
    expect(formatReviewDate("2025-11")).toBe("November 2025");
    expect(formatReviewDate("2025-11-03")).toBe("3 November 2025");
  });
});

describe("packages and extras", () => {
  it("package options exist on the trip", () => {
    for (const trip of trips) {
      const ids = new Set(trip.options.map((o) => o.id));
      for (const pkg of trip.packages ?? []) {
        for (const id of pkg.optionIds)
          expect(ids.has(id), `${trip.slug}/${pkg.id}/${id}`).toBe(true);
      }
    }
  });

  it("every option belongs to at most one package", () => {
    for (const trip of trips) {
      const all = (trip.packages ?? []).flatMap((p) => p.optionIds);
      expect(new Set(all).size).toBe(all.length);
    }
  });

  it("adds extras to the message", () => {
    const text = buildInquiryMessage({
      name: "Ana",
      trip: "Downstream",
      travellers: 2,
      extras: ["A night in Houay Xai before the cruise"],
    });
    expect(text).toContain("Please also tell me about: A night in Houay Xai before the cruise");
  });
});

describe("photo slots", () => {
  const slots = Object.values(photos);
  it("use descriptive, unique, URL-safe file names", () => {
    for (const slot of slots) {
      expect(slot.file).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+){2,}$/);
      expect(slot.alt.length).toBeGreaterThan(20);
    }
    expect(new Set(slots.map((s) => s.file)).size).toBe(slots.length);
  });
});

describe("structured data", () => {
  it("builds a breadcrumb trail from Home", () => {
    const data = breadcrumbJsonLd([{ href: "/where-to-stay/", label: "Where to stay" }]);
    expect(data.itemListElement.map((i) => i.name)).toEqual(["Home", "Where to stay"]);
    expect(data.itemListElement[1]?.item).toBe("https://nagiofmekong.com/where-to-stay/");
  });

  it("marks up FAQs one to one", () => {
    const data = faqJsonLd([{ question: "Q?", answer: "A." }]);
    expect(data.mainEntity[0]?.acceptedAnswer.text).toBe("A.");
  });
});
