import { ExternalLink } from "lucide-react";
import type { Review } from "@/content/types";
import { cn } from "@/lib/cn";
import { formatReviewDate, platformName } from "@/lib/reviews";
import { Stars } from "./stars";

/** A genuine review, quoted verbatim, credited and linked to its source. */
export function ReviewCard({
  review,
  variant = "card",
  className,
}: {
  review: Review;
  variant?: "card" | "quote";
  className?: string;
}) {
  const source = platformName(review.platform);
  return (
    <figure
      className={cn(
        "flex h-full flex-col",
        variant === "card" && "rounded-card border border-silt bg-paper p-6 shadow-card",
        className,
      )}
    >
      <Stars rating={review.rating} />
      <blockquote lang={review.lang} cite={review.url} className="mt-4 flex-1">
        {review.title ? (
          <p className="font-display text-xl font-semibold text-maroon">{review.title}</p>
        ) : null}
        <p className={cn("text-ink", review.title && "mt-2", variant === "quote" && "text-lead")}>
          “{review.text}”
        </p>
      </blockquote>
      <figcaption className="mt-5 border-t border-silt pt-4 text-sm">
        <span className="block font-semibold text-ink">{review.reviewer}</span>
        <span className="text-muted">
          {formatReviewDate(review.date)} · on{" "}
          <a
            href={review.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-lantern hover:underline"
          >
            {source}
            <ExternalLink aria-hidden="true" className="size-3.5" />
            <span className="sr-only">(read the original review, opens in a new tab)</span>
          </a>
        </span>
      </figcaption>
    </figure>
  );
}
