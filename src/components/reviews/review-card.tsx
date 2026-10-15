import { ExternalLink, Languages } from "lucide-react";
import type { Review } from "@/content/types";
import { localeInfo } from "@/i18n/config";
import { fmt } from "@/i18n/index";
import { getI18n } from "@/i18n/server";
import { cn } from "@/lib/cn";
import { formatReviewDate, languageName, platformName, reviewLang } from "@/lib/reviews";
import { PlatformLogo } from "./platform-logo";
import { Stars } from "./stars";

/**
 * A genuine review, quoted verbatim in the language it was written in and credited
 * (Tripadvisor review-row pattern): initial + name, written date, stars, language, title,
 * full text, source logo and link back. Never translated.
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
  const { locale, m } = getI18n();
  const intl = localeInfo[locale].intl;
  const source = platformName(review.platform);
  const lang = reviewLang(review);
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
          <span className="block text-sm text-muted">
            {fmt(m.reviews.written, { date: formatReviewDate(review.date, intl) })}
          </span>
        </span>
      </figcaption>
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <Stars rating={review.rating} />
        <span className="inline-flex items-center gap-1 rounded-xs bg-surface-tint px-2 py-0.5 text-sm text-primary">
          <Languages aria-hidden="true" className="size-3.5" />
          <span className="sr-only">{m.reviews.language} </span>
          {languageName(lang, intl)}
        </span>
      </p>
      <blockquote lang={lang} cite={review.url}>
        {review.title ? (
          <p className="font-display text-base text-heading">{review.title}</p>
        ) : null}
        {review.text.split(/\n+/).map((paragraph, i) => (
          <p key={i} className={cn("text-ink", (review.title || i > 0) && "mt-2")}>
            {paragraph}
          </p>
        ))}
      </blockquote>
      <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <span>{m.reviews.reviewFrom}</span>
        <PlatformLogo platform={review.platform} />
        <a
          href={review.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-sm text-primary underline-offset-4 hover:underline"
        >
          {fmt(m.reviews.readOn, { name: source })}
          <ExternalLink aria-hidden="true" className="size-3.5" />
          <span className="sr-only">{m.common.opensNewTab}</span>
        </a>
      </p>
    </figure>
  );
}
