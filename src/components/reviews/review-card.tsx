import { ExternalLink } from "lucide-react";
import type { Review } from "@/content/types";
import { cn } from "@/lib/cn";
import { formatReviewDate, platformName } from "@/lib/reviews";
import { PlatformLogo } from "./platform-logo";
import { Stars } from "./stars";

/**
 * A genuine review, quoted verbatim and credited (Tripadvisor review-row pattern):
 * initial + name, written date, stars, title, full text, source logo and link back.
 */
export function ReviewCard({
  review,
  variant = "row",
  className,
}: {
  review: Review;
  /** `row`: inside the reviews list. `card`: standalone (next to the booking form). */
  variant?: "row" | "card";
  className?: string;
}) {
  const source = platformName(review.platform);
  return (
    <figure
      className={cn(
        "flex flex-col gap-3",
        variant === "card" && "rounded-md border border-line bg-surface p-6 shadow-sm",
        className,
      )}
    >
      <figcaption className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-sm bg-surface-tint font-display text-base text-primary"
        >
          {review.reviewer.trim().charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block font-display text-sm text-heading">{review.reviewer}</span>
          <span className="block text-sm text-muted">Written {formatReviewDate(review.date)}</span>
        </span>
      </figcaption>
      <Stars rating={review.rating} />
      <blockquote lang={review.lang} cite={review.url}>
        {review.title ? (
          <p className="font-display text-base text-heading">{review.title}</p>
        ) : null}
        <p className={cn("text-ink", review.title && "mt-1")}>{review.text}</p>
      </blockquote>
      <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <span>Review from</span>
        <PlatformLogo platform={review.platform} />
        <a
          href={review.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-sm text-primary underline-offset-4 hover:underline"
        >
          Read on {source}
          <ExternalLink aria-hidden="true" className="size-3.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </p>
    </figure>
  );
}
