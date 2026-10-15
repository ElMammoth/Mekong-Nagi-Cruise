import { ExternalLink } from "lucide-react";
import { reviewPlatforms } from "@/content/reviews";
import { showPlaceholders } from "@/content/settings";
import { localeInfo } from "@/i18n/config";
import { fmt } from "@/i18n/index";
import { getI18n } from "@/i18n/server";
import { cn } from "@/lib/cn";
import { allPlatforms, formatReviewDate, ratingFor } from "@/lib/reviews";
import { PlatformLogo } from "./platform-logo";
import { Stars } from "./stars";

/**
 * Compact rating line per platform (Tripadvisor listing-header pattern): logo, stars,
 * score, review count and the date the figures were copied, linked to the source.
 */
export function RatingSummary({ className }: { className?: string }) {
  const { locale, m } = getI18n();
  const intl = localeInfo[locale].intl;
  const items = allPlatforms.map((platform) => ({ platform, rating: ratingFor(platform) }));
  const shown = items.filter((i) => i.rating || showPlaceholders);
  if (shown.length === 0) return null;

  return (
    <ul
      className={cn("flex flex-wrap gap-x-6 gap-y-3", className)}
      aria-label={m.reviews.ratingsLabel}
    >
      {shown.map(({ platform, rating }) => {
        const { name, listingUrl } = reviewPlatforms[platform];
        return (
          <li key={platform}>
            <a
              href={listingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-sm text-sm text-ink"
            >
              <PlatformLogo platform={platform} />
              {rating ? (
                <>
                  <Stars rating={rating.rating} />
                  <span className="font-display text-heading">
                    {rating.rating.toLocaleString(intl, { minimumFractionDigits: 1 })}
                  </span>
                  <span className="group-hover:underline">
                    {fmt(m.reviews.reviewCount, { count: rating.count.toLocaleString(intl) })}
                  </span>
                  <span className="text-muted">
                    · {fmt(m.reviews.asOf, { date: formatReviewDate(rating.asOf, intl) })}
                  </span>
                </>
              ) : (
                <span
                  data-placeholder=""
                  className="rounded-xs border border-dashed border-control px-2 py-0.5 text-muted"
                >
                  {m.common.placeholder}: {name}
                </span>
              )}
              <ExternalLink aria-hidden="true" className="size-3.5 text-muted" />
              <span className="sr-only">{fmt(m.reviews.seeAllOn, { name })}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
