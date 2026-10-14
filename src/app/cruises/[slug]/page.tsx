import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, MessageCircle, Users } from "lucide-react";
import { RouteStrip } from "@/components/brand/route-strip";
import { BookingForm } from "@/components/booking/booking-form";
import { JsonLd } from "@/components/layout/json-ld";
import { CtaBand } from "@/components/sections/cta-band";
import { Included } from "@/components/sections/included";
import { Itinerary } from "@/components/sections/itinerary";
import { PageHeader } from "@/components/sections/page-header";
import { PriceList } from "@/components/sections/price-list";
import { TripCard } from "@/components/sections/trip-card";
import { ButtonAnchor, buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DayChips } from "@/components/ui/day-chips";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";
import { getTrip, trips } from "@/content/trips";
import { availableOptions } from "@/lib/departures";
import { formatAmount, fromPriceUSD } from "@/lib/money";
import { tripJsonLd } from "@/lib/structured-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return trips.map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const trip = getTrip((await params).slug);
  if (!trip) return {};
  const path = `/cruises/${trip.slug}/`;
  return {
    title: trip.seo.title,
    description: trip.seo.description,
    alternates: { canonical: path },
    openGraph: { title: trip.seo.title, description: trip.seo.description, url: path },
  };
}

export default async function TripPage({ params }: Props) {
  const trip = getTrip((await params).slug);
  if (!trip) notFound();

  const options = availableOptions(trip.options);
  const from = fromPriceUSD(options);
  const others = trips.filter((t) => t.slug !== trip.slug).slice(0, 2);

  return (
    <>
      <PageHeader
        eyebrow={trip.kind}
        title={trip.name}
        intro={trip.summary}
        crumbs={[
          { href: `/cruises/${trip.slug}/`, label: trip.shortName.split(" · ")[1] ?? trip.name },
        ]}
      >
        <RouteStrip stops={trip.route} className="mt-6" />
      </PageHeader>

      <Container className="grid gap-14 py-14 sm:py-20 lg:grid-cols-[1fr_21rem] lg:gap-16">
        <div className="min-w-0 space-y-20">
          {/* Key facts */}
          <section aria-label="Key facts">
            <dl className="grid gap-6 rounded-card border border-silt bg-paper p-6 sm:grid-cols-3">
              <Fact icon={<Clock className="size-5" />} term="Duration">
                {trip.duration}
              </Fact>
              <Fact icon={<CalendarDays className="size-5" />} term={trip.departures.label}>
                <DayChips days={trip.departures.weekdays} />
              </Fact>
              <Fact icon={<Users className="size-5" />} term="Group">
                {trip.minimum ?? trip.departures.note ?? "Up to 40 passengers on board"}
              </Fact>
            </dl>
          </section>

          <section aria-labelledby="itinerary-title">
            <SectionHeading id="itinerary-title" eyebrow="Day by day" title="Itinerary" />
            <div className="mt-10">
              <Itinerary days={trip.itinerary} />
            </div>
          </section>

          <section aria-labelledby="prices-title">
            <SectionHeading
              id="prices-title"
              eyebrow="Prices"
              title={options.length ? "Prices per person" : "Prices on request"}
              intro={options.length ? undefined : trip.priceOnRequest}
            />
            {options.length ? (
              <div className="mt-8">
                <PriceList options={options} />
                {trip.minimum ? <p className="mt-4 text-muted">{trip.minimum}</p> : null}
              </div>
            ) : null}
          </section>

          <section aria-labelledby="included-title">
            <SectionHeading id="included-title" eyebrow="The details" title="What’s included" />
            <div className="mt-8">
              <Included included={trip.included} notIncluded={trip.notIncluded} />
            </div>
          </section>

          {trip.goodToKnow.length ? (
            <section aria-labelledby="know-title">
              <SectionHeading id="know-title" eyebrow="Before you go" title="Good to know" />
              <ul className="mt-6 space-y-3">
                {trip.goodToKnow.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-2 shrink-0 rounded-full bg-vermilion"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        {/* Sticky summary (desktop) */}
        <aside aria-label="Book this trip" className="hidden lg:block">
          <div className="sticky top-24 rounded-card border border-silt bg-paper p-6 shadow-card">
            {from ? (
              <p>
                <span className="block text-xs font-semibold tracking-[0.12em] text-muted uppercase">
                  From
                </span>
                <span className="font-display text-4xl font-semibold text-maroon">
                  {formatAmount(from, "USD")}
                </span>
                <span className="text-muted"> / person</span>
              </p>
            ) : (
              <p className="font-display text-2xl font-semibold text-maroon">Price on request</p>
            )}
            <p className="mt-4 text-sm font-semibold text-muted">{trip.departures.label}</p>
            <DayChips days={trip.departures.weekdays} className="mt-1.5" />
            <a href="#book" className={buttonClasses({ size: "lg" }) + " mt-6 w-full"}>
              Choose a date
            </a>
            <ButtonAnchor
              href={site.contact.whatsappHref}
              variant="secondary"
              className="mt-3 w-full"
            >
              <MessageCircle aria-hidden="true" />
              Ask on WhatsApp
            </ButtonAnchor>
            <p className="mt-4 text-sm text-muted">{site.contact.replyPromise}</p>
          </div>
        </aside>
      </Container>

      {/* Booking */}
      <section
        id="book"
        aria-labelledby="book-title"
        className="scroll-mt-20 border-t border-silt bg-paper/60 py-16 sm:py-24"
      >
        <Container>
          <SectionHeading
            id="book-title"
            eyebrow="Request a booking"
            title={`Book the ${trip.shortName.split(" · ")[0]?.toLowerCase()} ${trip.kind === "River cruise" ? "cruise" : "journey"}`}
            intro="Pick a departure and tell us who is coming. We confirm availability and the final price within 24 hours."
          />
          <div className="mt-12">
            <BookingForm trips={trips} defaultTrip={trip.slug} lockTrip />
          </div>
        </Container>
      </section>

      {/* Other journeys */}
      <section aria-labelledby="more-title" className="pt-16 sm:pt-24">
        <Container>
          <SectionHeading id="more-title" eyebrow="More ways to travel" title="Other journeys" />
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {others.map((t) => (
              <li key={t.slug}>
                <TripCard trip={t} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />

      {/* Mobile booking bar */}
      <div className="sticky bottom-0 z-30 border-t border-silt bg-paper/95 backdrop-blur lg:hidden">
        <Container className="flex items-center justify-between gap-4 py-3">
          <p className="text-sm leading-tight">
            {from ? (
              <>
                <span className="text-muted">From </span>
                <span className="font-display text-xl font-semibold text-maroon">
                  {formatAmount(from, "USD")}
                </span>
                <span className="text-muted"> / person</span>
              </>
            ) : (
              <span className="font-semibold text-maroon">Price on request</span>
            )}
          </p>
          <a href="#book" className={buttonClasses()}>
            Choose a date
          </a>
        </Container>
      </div>

      <JsonLd data={tripJsonLd(trip)} />
    </>
  );
}

function Fact({
  icon,
  term,
  children,
}: {
  icon: React.ReactNode;
  term: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-3">
      <span aria-hidden="true" className="row-span-2 mt-0.5 text-lantern">
        {icon}
      </span>
      <dt className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">{term}</dt>
      <dd className="mt-1 font-semibold text-ink">{children}</dd>
    </div>
  );
}
