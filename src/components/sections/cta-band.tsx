import { Mail, MessageCircle, Phone } from "lucide-react";
import { BoatMark } from "@/components/brand/boat-mark";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { bookingHref } from "@/content/navigation";
import { site } from "@/content/site";

export function CtaBand({
  title = "Book in one message",
  text = `Tell us your date and how many of you are travelling. ${site.contact.replyPromise}`,
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-maroon px-6 py-12 text-river-mist sm:px-12 sm:py-16">
          <BoatMark
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -bottom-6 w-[28rem] max-w-[80%] text-vermilion/25"
          />
          <div className="relative max-w-2xl">
            <h2 id="cta-title" className="text-h2 text-sand">
              {title}
            </h2>
            <p className="mt-4 text-lead">{text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={bookingHref} size="lg" variant="onDark">
                Request a booking
              </ButtonLink>
              <ButtonAnchor href={site.contact.whatsappHref} variant="secondary" size="lg">
                <MessageCircle aria-hidden="true" />
                WhatsApp
              </ButtonAnchor>
              <ButtonAnchor href={`mailto:${site.contact.email}`} variant="secondary" size="lg">
                <Mail aria-hidden="true" />
                Email
              </ButtonAnchor>
            </div>
            <p className="mt-6 inline-flex items-center gap-2">
              <Phone aria-hidden="true" className="size-4 text-gold" />
              Or call{" "}
              <a
                href={site.contact.phoneHref}
                className="font-semibold text-sand underline-offset-4 hover:underline"
              >
                {site.contact.phoneDisplay}
              </a>
              <span className="text-river-mist/80">({site.contact.hours})</span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
