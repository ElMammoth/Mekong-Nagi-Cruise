import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BookingForm } from "@/components/booking/booking-form";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";
import { trips } from "@/content/trips";

export const metadata: Metadata = {
  title: "Book a Mekong cruise or contact us",
  description:
    "Request a booking for the Nagi of Mekong by WhatsApp or email. Call +66 95 507 3264 or write to adisak.star@gmail.com. We reply within 24 hours.",
  alternates: { canonical: "/contact/" },
};

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
        title="Request a booking"
        intro={`Booking is easy: send us your request and we get back to you. ${contact.replyPromise}`}
        crumbs={[{ href: "/contact/", label: "Contact" }]}
      >
        <dl className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map(({ icon: Icon, term, value, href }) => (
            <div key={term} className="grid grid-cols-[auto_1fr] gap-x-3">
              <Icon aria-hidden="true" className="row-span-2 mt-1 size-5 text-lantern" />
              <dt className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">
                {term}
              </dt>
              <dd className="mt-0.5 min-w-0 font-semibold break-words text-ink">
                {href ? (
                  <a href={href} className="hover:text-lantern hover:underline">
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

      <section id="booking" aria-labelledby="booking-title" className="scroll-mt-20 py-14 sm:py-20">
        <Container>
          <SectionHeading
            id="booking-title"
            title="Your booking request"
            intro="Four short steps. Your message opens in WhatsApp or your email app, ready to send."
          />
          <div className="mt-12">
            <BookingForm trips={trips} />
          </div>
        </Container>
      </section>
    </>
  );
}
