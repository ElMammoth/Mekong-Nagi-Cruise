import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BookingForm } from "@/components/booking/booking-form";
import { BookingReview } from "@/components/reviews/reviews-section";
import { NextSteps } from "@/components/sections/next-steps";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getTrips } from "@/content/localized";
import { site } from "@/content/site";
import { pathFor } from "@/i18n/routes";
import { getI18n } from "@/i18n/server";

export function ContactView() {
  const { locale, m } = getI18n();
  const copy = m.contactPage;
  const { contact } = site;
  const channels = [
    {
      icon: MessageCircle,
      term: m.common.whatsapp,
      value: contact.phoneDisplay,
      href: contact.whatsappHref,
    },
    { icon: Phone, term: copy.phone, value: contact.phoneDisplay, href: contact.phoneHref },
    { icon: Mail, term: copy.email, value: contact.email, href: `mailto:${contact.email}` },
    { icon: Clock, term: copy.hours, value: contact.hours },
    {
      icon: MapPin,
      term: copy.basedIn,
      value: `${contact.location.locality}, ${contact.location.region} ${contact.location.postalCode}, ${m.contact.country}`,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow}
        title={copy.heading}
        intro={`${copy.intro} ${m.contact.replyPromise}`}
        crumbs={[{ href: pathFor(locale, "contact"), label: m.nav.contact }]}
      >
        <dl className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map(({ icon: Icon, term, value, href }) => (
            <div key={term} className="grid grid-cols-icon gap-x-3">
              <Icon aria-hidden="true" className="row-span-2 mt-1 size-5 text-primary" />
              <dt className="font-display text-eyebrow text-muted uppercase">{term}</dt>
              <dd className="mt-0.5 min-w-0 break-words text-ink">
                {href ? (
                  <a href={href} className="hover:text-primary hover:underline">
                    {value}
                  </a>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <section id="booking" aria-labelledby="booking-title" className="py-14 sm:py-20">
        <Container>
          <SectionHeading id="booking-title" title={copy.bookingTitle} intro={copy.bookingIntro} />
          <NextSteps className="mt-10 rounded-md border border-line bg-surface p-6" />
          <div className="mt-12">
            <BookingForm
              trips={getTrips(locale)}
              asideFooter={<BookingReview />}
              copy={m.booking}
              replyPromise={m.contact.replyPromise}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
