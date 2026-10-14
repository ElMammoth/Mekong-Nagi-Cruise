import { ExternalLink } from "lucide-react";
import { reviewPlatforms } from "@/content/reviews";
import { showPlaceholders } from "@/content/settings";
import { cn } from "@/lib/cn";
import { allPlatforms, formatReviewDate, ratingFor } from "@/lib/reviews";
import { Placeholder } from "@/components/ui/placeholder";
import { Stars } from "./stars";

/**
 * One line per review platform: stars, score, count, date of the figures and a link to
 * the listing. Used near the hero and in the reviews section.
 */
export function RatingSummary({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const items = allPlatforms.map((platform) => ({ platform, rating: ratingFor(platform) }));
  const shown = items.filter((i) => i.rating || showPlaceholders);
  if (shown.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-3", className)} aria-label="Traveller ratings">
      {shown.map(({ platform, rating }) => {
        const { name, listingUrl } = reviewPlatforms[platform];
        if (!rating) {
          return (
            <li key={platform} className="min-w-0">
              <Placeholder label={`${name} rating`} tone={tone} className="px-4 py-3">
                <p>Add score, review count and date in src/content/reviews.ts</p>
              </Placeholder>
            </li>
          );
        }
        return (
          <li key={platform}>
            <a
              href={listingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 rounded-full border px-4 py-2 text-sm transition-colors",
                tone === "dark"
                  ? "border-sand/25 text-river-mist hover:border-gold"
                  : "border-silt bg-paper text-ink hover:border-lantern",
              )}
            >
              <Stars rating={rating.rating} />
              <span className="font-semibold">{rating.rating.toFixed(1)}</span>
              <span>
                {rating.count.toLocaleString("en-GB")} reviews on{" "}
                <span className="font-semibold">{name}</span>
              </span>
              <span className={tone === "dark" ? "text-river-mist/90" : "text-muted"}>
                · as of {formatReviewDate(rating.asOf)}
              </span>
              <ExternalLink aria-hidden="true" className="size-3.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
