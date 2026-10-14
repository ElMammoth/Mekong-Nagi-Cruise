import { MessageCircle, Phone } from "lucide-react";
import { BoatMark } from "@/components/brand/boat-mark";
import { BookingReview } from "@/components/reviews/reviews-section";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { bookingHref, bookingLabel } from "@/content/navigation";
import { site } from "@/content/site";
import { NextSteps } from "./next-steps";

/**
 * Closing call to action: the action, the reason (reply in 24 hours), what happens next,
 * and one genuine review right beside it (docs/04-offer-brief.md §6, §9).
 */
export function CtaBand({
  title = "Send your dates, we’ll handle the rest",
  text = `Tell us when you’d like to sail and how many of you are travelling. ${site.contact.replyPromise}`,
  href = bookingHref,
  showReview = true,
}: {
  title?: string;
  text?: string;
  href?: string;
  showReview?: boolean;
}) {
  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-maroon px-6 py-12 text-river-mist sm:px-12 sm:py-16">
          <BoatMark
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -bottom-6 w-[28rem] max-w-[80%] text-vermilion/25"
          />
          <div className="relative grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <div>
              <h2 id="cta-title" className="text-h2 text-sand">
                {title}
              </h2>
              <p className="mt-4 text-lead">{text}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={href} size="lg" variant="onDark">
                  {bookingLabel}
                </ButtonLink>
                <ButtonAnchor href={site.contact.whatsappHref} variant="secondary" size="lg">
                  <MessageCircle aria-hidden="true" />
                  Ask on WhatsApp
                </ButtonAnchor>
              </div>
              <p className="mt-6 inline-flex flex-wrap items-center gap-x-2">
                <Phone aria-hidden="true" className="size-4 text-gold" />
                Or call{" "}
                <a
                  href={site.contact.phoneHref}
                  className="font-semibold text-sand underline-offset-4 hover:underline"
                >
                  {site.contact.phoneDisplay}
                </a>
                <span className="text-river-mist/90">({site.contact.hours})</span>
                <span className="text-river-mist/90">
                  · or email{" "}
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="font-semibold text-sand underline-offset-4 hover:underline"
                  >
                    {site.contact.email}
                  </a>
                </span>
              </p>
            </div>
            {showReview ? <BookingReview tone="dark" /> : null}
          </div>
          <NextSteps tone="dark" className="relative mt-12 border-t border-sand/15 pt-8" />
        </div>
      </Container>
    </section>
  );
}
