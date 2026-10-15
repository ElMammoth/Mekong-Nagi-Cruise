import { ChevronDown, ExternalLink } from "lucide-react";
import { reviewPlatforms, reviews, reviewsRetrievedAt } from "@/content/reviews";
import { showPlaceholders } from "@/content/settings";
import type { RatingSnapshot, ReviewPlatform } from "@/content/types";
import { localeInfo } from "@/i18n/config";
import { fmt } from "@/i18n/index";
import { getI18n } from "@/i18n/server";
import { cn } from "@/lib/cn";
import {
  allPlatforms,
  bookingReview,
  formatReviewDate,
  moreReviews,
  offerReviews,
  ratingFor,
} from "@/lib/reviews";
import { Placeholder } from "@/components/ui/placeholder";
import { SectionHeading } from "@/components/ui/section-heading";
import { PlatformLogo } from "./platform-logo";
import { ReviewCard } from "./review-card";
import { Stars } from "./stars";

const SLOTS = 3;
const LEVELS = [5, 4, 3, 2, 1] as const;

/**
 * Reviews block (Tripadvisor pattern): a rating summary per platform on the left —
 * score, stars, count, date, optional breakdown — and the review list on the right.
 */
export function ReviewsSection({
  id = "reviews-title",
  className,
}: {
  id?: string;
  className?: string;
}) {
  const { locale, m } = getI18n();
  const intl = localeInfo[locale].intl;
  const shown = offerReviews(SLOTS);
  const more = moreReviews(shown);
  if (reviews.length === 0 && !showPlaceholders) return null;
  const empty = showPlaceholders ? Math.max(0, SLOTS - shown.length) : 0;

  return (
    <section aria-labelledby={id} className={cn("@container", className)}>
      <SectionHeading
        id={id}
        eyebrow={m.reviews.eyebrow}
        title={m.reviews.title}
        intro={m.reviews.intro}
      />
      <div className="mt-10 grid gap-10 @4xl:grid-cols-summary @4xl:gap-14">
        <div className="space-y-8">
          {allPlatforms.map((platform) => (
            <PlatformSummary key={platform} platform={platform} rating={ratingFor(platform)} />
          ))}
          <p className="text-sm text-muted">
            {reviewsRetrievedAt
              ? fmt(m.reviews.copiedOn, { date: formatReviewDate(reviewsRetrievedAt, intl) })
              : showPlaceholders
                ? "Placeholder: set reviewsRetrievedAt in src/content/reviews.ts."
                : null}
          </p>
        </div>

        <div>
          <ul className="divide-y divide-line border-y border-line">
            {shown.map((review) => (
              <li key={review.url + review.reviewer} className="py-6">
                <ReviewCard review={review} />
              </li>
            ))}
            {Array.from({ length: empty }, (_, i) => (
              <li key={`slot-${i}`} className="py-6">
                <ReviewPlaceholder />
              </li>
            ))}
          </ul>
          {more.length ? (
            <details className="group border-b border-line">
              <summary className="cursor-pointer list-none rounded-sm py-4 font-display text-base text-primary [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-3">
                  {fmt(m.reviews.showAll, { count: reviews.length })}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-5 shrink-0 transition-transform duration-base group-open:rotate-180"
                  />
                </span>
              </summary>
              <ul className="divide-y divide-line border-t border-line">
                {more.map((review) => (
                  <li key={review.url + review.reviewer} className="py-6">
                    <ReviewCard review={review} />
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function PlatformSummary({
  platform,
  rating,
}: {
  platform: ReviewPlatform;
  rating?: RatingSnapshot;
}) {
  const { locale, m } = getI18n();
  const intl = localeInfo[locale].intl;
  const { name, listingUrl } = reviewPlatforms[platform];
  return (
    <div className="border-b border-line pb-8 last-of-type:border-b-0">
      <PlatformLogo platform={platform} className="h-5" />
      {rating ? (
        <>
          <p className="mt-3 flex items-center gap-3">
            <span className="font-display text-3xl text-heading">
              {rating.rating.toLocaleString(intl, { minimumFractionDigits: 1 })}
            </span>
            <span>
              <Stars rating={rating.rating} />
              <span className="block text-sm text-muted">
                {fmt(m.reviews.reviewCount, { count: rating.count.toLocaleString(intl) })} ·{" "}
                {fmt(m.reviews.asOf, { date: formatReviewDate(rating.asOf, intl) })}
              </span>
            </span>
          </p>
          {rating.combined ? <p className="mt-2 text-sm text-muted">{m.reviews.note}</p> : null}
          {rating.distribution ? (
            <dl className="mt-4 space-y-1.5 text-sm">
              {LEVELS.map((level) => {
                const n = rating.distribution?.[level] ?? 0;
                const share = rating.count ? Math.round((n / rating.count) * 100) : 0;
                return (
                  <div key={level} className="grid grid-cols-label items-center gap-3">
                    <dt className="text-ink">{m.reviews.levels[level]}</dt>
                    <dd className="flex items-center gap-2">
                      <span className="h-2 flex-1 overflow-hidden rounded-xs bg-surface-tint">
                        <span className="block h-full bg-primary" style={{ width: `${share}%` }} />
                      </span>
                      <span className="w-8 text-right text-muted">{n.toLocaleString(intl)}</span>
                    </dd>
                  </div>
                );
              })}
            </dl>
          ) : null}
        </>
      ) : showPlaceholders ? (
        <Placeholder label={`${name} rating`} className="mt-3">
          <p>
            In <code>ratings</code>: the score (e.g. 4.5), the review count and the date you copied
            them.
          </p>
        </Placeholder>
      ) : null}
      <a
        href={listingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 rounded-sm text-sm text-primary underline-offset-4 hover:underline"
      >
        {fmt(m.reviews.readAllOn, { name })}
        <ExternalLink aria-hidden="true" className="size-3.5" />
        <span className="sr-only">{m.common.opensNewTab}</span>
      </a>
    </div>
  );
}

/** One review next to the booking form or call to action. */
export function BookingReview({ tone = "light" }: { tone?: "light" | "dark" }) {
  const review = bookingReview();
  if (review) return <ReviewCard review={review} variant="card" />;
  if (!showPlaceholders) return null;
  return <ReviewPlaceholder tone={tone} placement="booking" />;
}

function ReviewPlaceholder({
  tone = "light",
  placement = "offer",
}: {
  tone?: "light" | "dark";
  placement?: "offer" | "booking";
}) {
  return (
    <Placeholder label="Genuine review" tone={tone}>
      <p>
        Paste a real review in <code>src/content/reviews.ts</code> with{" "}
        <code>placement: &quot;{placement}&quot;</code>: exact text, reviewer name, date, rating and
        the link to it on Tripadvisor or Viator.
      </p>
    </Placeholder>
  );
}
