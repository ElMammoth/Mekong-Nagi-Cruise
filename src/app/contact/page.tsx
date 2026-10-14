import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BookingForm } from "@/components/booking/booking-form";
import { BookingReview } from "@/components/reviews/reviews-section";
import { NextSteps } from "@/components/sections/next-steps";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";
import { trips } from "@/content/trips";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Book a Mekong cruise or contact us",
  description:
    "Check availability for the Nagi of Mekong by WhatsApp or email. Call +66 95 507 3264 or write to adisak.star@gmail.com. We reply within 24 hours.",
  path: "/contact/",
});

export default function ContactPage() {
  const { contact } = site;
  const channels = [
    {
      icon: MessageCircle,
      term: "WhatsApp",
      value: contact.phoneDisplay,
      href: contact.whatsappHref,
    },
    { icon: Phone, term: "Phone", value: contact.phoneDisplay, href: contact.phoneHref },
    { icon: Mail, term: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Clock, term: "Hours", value: contact.hours },
    {
      icon: MapPin,
      term: "Based in",
      value: `${contact.location.locality}, ${contact.location.region} ${contact.location.postalCode}, ${contact.location.country}`,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Book & contact"
        title="Check availability"
        intro={`Send us your request: it’s free and doesn’t commit you. ${contact.replyPromise}`}
        crumbs={[{ href: "/contact/", label: "Contact" }]}
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
          <SectionHeading
            id="booking-title"
            title="Your booking request"
            intro="Four short steps. Your message opens in WhatsApp or your email app, ready to send."
          />
          <NextSteps className="mt-10 rounded-md border border-line bg-surface p-6" />
          <div className="mt-12">
            <BookingForm trips={trips} asideFooter={<BookingReview />} />
          </div>
        </Container>
      </section>
    </>
  );
}
