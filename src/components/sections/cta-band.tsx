import { MessageCircle, Phone } from "lucide-react";
import { BoatMark } from "@/components/brand/boat-mark";
import { BookingReview } from "@/components/reviews/reviews-section";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";
import { getI18n } from "@/i18n/server";
import { navigation } from "@/lib/navigation";
import { NextSteps } from "./next-steps";

/**
 * Closing call to action: the action, the reason (reply in 24 hours), what happens next,
 * and one genuine review right beside it (docs/04-offer-brief.md §6, §9).
 */
export function CtaBand({
  title,
  text,
  href,
  showReview = true,
}: {
  title?: string;
  /** Lead text; the reply promise is added after it. */
  text?: string;
  href?: string;
  showReview?: boolean;
}) {
  const { locale, m } = getI18n();
  const nav = navigation(locale);
  return (
    <section data-reveal aria-labelledby="cta-title" className="py-section">
      <Container>
        <div className="relative overflow-hidden rounded-md bg-primary px-6 py-12 text-on-primary-muted inverse sm:px-12 sm:py-16">
          <BoatMark
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 bottom-6 w-mark text-primary-hover"
          />
          <div className="relative grid gap-12 lg:grid-cols-cta lg:items-start">
            <div>
              <h2 id="cta-title" className="text-h2 text-on-primary">
                {title ?? m.cta.title}
              </h2>
              <p className="mt-4 text-lead">
                {text ?? m.cta.text} {m.contact.replyPromise}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={href ?? nav.bookingHref} size="lg" variant="cta">
                  {nav.bookingLabel}
                </ButtonLink>
                <ButtonAnchor href={site.contact.whatsappHref} variant="secondary" size="lg">
                  <MessageCircle aria-hidden="true" />
                  {m.common.askOnWhatsApp}
                </ButtonAnchor>
              </div>
              <p className="mt-6 inline-flex flex-wrap items-center gap-x-2">
                <Phone aria-hidden="true" className="size-4 text-on-primary-muted" />
                {m.cta.orCall}{" "}
                <a
                  href={site.contact.phoneHref}
                  className="text-on-primary underline underline-offset-4 hover:decoration-2"
                >
                  {site.contact.phoneDisplay}
                </a>
                <span>({site.contact.hours})</span>
                <span>
                  · {m.cta.orEmail}{" "}
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="text-on-primary underline underline-offset-4 hover:decoration-2"
                  >
                    {site.contact.email}
                  </a>
                </span>
              </p>
            </div>
            {showReview ? <BookingReview tone="dark" /> : null}
          </div>
          <NextSteps tone="dark" className="relative mt-12 border-t border-primary-hover pt-8" />
        </div>
      </Container>
    </section>
  );
}
