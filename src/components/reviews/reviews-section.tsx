import { ExternalLink } from "lucide-react";
import { reviewPlatforms, reviews } from "@/content/reviews";
import { showPlaceholders } from "@/content/settings";
import { cn } from "@/lib/cn";
import { allPlatforms, bookingReview, offerReviews } from "@/lib/reviews";
import { Placeholder } from "@/components/ui/placeholder";
import { SectionHeading } from "@/components/ui/section-heading";
import { RatingSummary } from "./rating-summary";
import { ReviewCard } from "./review-card";

const SLOTS = 3;

/** Reviews next to the offer: rating per platform, up to three review cards, links out. */
export function ReviewsSection({
  id = "reviews-title",
  eyebrow = "Reviews",
  title = "What travellers say",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  className?: string;
}) {
  const shown = offerReviews(SLOTS);
  if (reviews.length === 0 && !showPlaceholders) return null;
  const empty = showPlaceholders ? Math.max(0, SLOTS - shown.length) : 0;

  return (
    <section aria-labelledby={id} className={cn("@container", className)}>
      <SectionHeading
        id={id}
        eyebrow={eyebrow}
        title={title}
        intro="Unedited reviews from Tripadvisor and Viator, each linked to the original."
      />
      <RatingSummary className="mt-6" />
      <ul className="mt-10 grid gap-6 @3xl:grid-cols-3">
        {shown.map((review) => (
          <li key={review.url + review.reviewer}>
            <ReviewCard review={review} />
          </li>
        ))}
        {Array.from({ length: empty }, (_, i) => (
          <li key={`slot-${i}`}>
            <ReviewPlaceholder />
          </li>
        ))}
      </ul>
      <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        {allPlatforms.map((platform) => (
          <a
            key={platform}
            href={reviewPlatforms[platform].listingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-lantern hover:underline"
          >
            Read all reviews on {reviewPlatforms[platform].name}
            <ExternalLink aria-hidden="true" className="size-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ))}
      </p>
    </section>
  );
}

/** One review next to the booking form or call to action. */
export function BookingReview({ tone = "light" }: { tone?: "light" | "dark" }) {
  const review = bookingReview();
  if (review) {
    return <ReviewCard review={review} />;
  }
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
    <Placeholder
      label="Genuine review"
      tone={tone}
      className={placement === "offer" ? "h-full" : undefined}
    >
      <p>
        Paste a real review in <code>src/content/reviews.ts</code> with{" "}
        <code>placement: &quot;{placement}&quot;</code>: exact text, reviewer name, date, rating and
        the link to it on Tripadvisor or Viator.
      </p>
    </Placeholder>
  );
}
