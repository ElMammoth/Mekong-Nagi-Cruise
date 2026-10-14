import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, MessageCircle, Users } from "lucide-react";
import { RouteStrip } from "@/components/brand/route-strip";
import { BookingForm } from "@/components/booking/booking-form";
import { JsonLd } from "@/components/layout/json-ld";
import { RatingSummary } from "@/components/reviews/rating-summary";
import { BookingReview, ReviewsSection } from "@/components/reviews/reviews-section";
import { CtaBand } from "@/components/sections/cta-band";
import { Included } from "@/components/sections/included";
import { Itinerary } from "@/components/sections/itinerary";
import { NextSailings } from "@/components/sections/next-sailings";
import { NextSteps } from "@/components/sections/next-steps";
import { Packages } from "@/components/sections/packages";
import { PageHeader } from "@/components/sections/page-header";
import { PriceList } from "@/components/sections/price-list";
import { TripCard } from "@/components/sections/trip-card";
import { ButtonAnchor, buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DayChips } from "@/components/ui/day-chips";
import { SectionHeading } from "@/components/ui/section-heading";
import { bookingLabel } from "@/content/navigation";
import { site } from "@/content/site";
import { getTrip, trips } from "@/content/trips";
import { availableOptions } from "@/lib/departures";
import { pageMetadata } from "@/lib/metadata";
import { formatAmount, fromPriceUSD } from "@/lib/money";
import { tripJsonLd } from "@/lib/structured-data";
import { cn } from "@/lib/cn";

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
  return pageMetadata({
    title: trip.seo.title,
    description: trip.seo.description,
    path: `/cruises/${trip.slug}/`,
  });
}

export default async function TripPage({ params }: Props) {
  const trip = getTrip((await params).slug);
  if (!trip) notFound();

  const options = availableOptions(trip.options);
  const from = fromPriceUSD(options);
  const others = trips.filter((t) => t.slug !== trip.slug).slice(0, 3);
  const firstStop = trip.itinerary[0]?.stops[0]?.title;
  const short = trip.shortName.split(" · ")[1] ?? trip.name;
  const hasPackages = Boolean(trip.packages?.length) && options.length > 0;

  return (
    <>
      <PageHeader
        eyebrow={trip.kind}
        title={trip.name}
        intro={trip.summary}
        crumbs={[{ href: `/cruises/${trip.slug}/`, label: short }]}
        photo={trip.photo}
      >
        <RouteStrip stops={trip.route} className="mt-6" />
        <RatingSummary className="mt-6" />
      </PageHeader>

      <Container className="grid gap-14 py-14 sm:py-20 lg:grid-cols-sidebar lg:gap-16">
        <div className="min-w-0 space-y-20">
          {/* Key facts */}
          <section aria-label="Key facts">
            <dl className="grid gap-6 rounded-md border border-line bg-surface p-6 sm:grid-cols-3">
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

          <section aria-labelledby="included-title">
            <SectionHeading
              id="included-title"
              eyebrow="Handled for you"
              title="What’s included"
              intro="Everything below is part of the price, so there’s nothing to organise on the way."
            />
            <div className="mt-8">
              <Included included={trip.included} notIncluded={trip.notIncluded} />
            </div>
          </section>

          <section aria-labelledby="itinerary-title">
            <SectionHeading id="itinerary-title" eyebrow="Day by day" title="Itinerary" />
            <div className="mt-10">
              <Itinerary days={trip.itinerary} />
            </div>
          </section>

          {hasPackages ? null : (
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
                  <NextSailings weekdays={trip.departures.weekdays} className="mt-6" />
                </div>
              ) : null}
            </section>
          )}

          {trip.goodToKnow.length ? (
            <section aria-labelledby="know-title">
              <SectionHeading id="know-title" eyebrow="Before you go" title="Good to know" />
              <ul className="mt-6 space-y-3">
                {trip.goodToKnow.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-2 shrink-0 rounded-sm bg-accent"
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
          <div className="sticky top-24 rounded-md border border-line bg-surface p-6 shadow-sm">
            {from ? (
              <p>
                <span className="block font-display text-eyebrow text-muted uppercase">From</span>
                <span className="font-display text-3xl text-heading">
                  {formatAmount(from, "USD")}
                </span>
                <span className="text-muted"> / person</span>
              </p>
            ) : (
              <p className="font-display text-2xl text-heading">Price on request</p>
            )}
            <p className="mt-4 text-sm text-muted">{trip.departures.label}</p>
            <DayChips days={trip.departures.weekdays} className="mt-1.5" />
            <NextSailings weekdays={trip.departures.weekdays} className="mt-3" />
            {trip.departures.note ? (
              <p className="mt-2 text-sm text-muted">{trip.departures.note} Ask early.</p>
            ) : null}
            <a
              href="#book"
              className={cn(buttonClasses({ size: "lg", variant: "cta" }), "mt-6 w-full")}
            >
              {bookingLabel}
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

      {/* Proof right before the price (docs/04-offer-brief.md §6) */}
      <div className="border-t border-line bg-surface-subtle py-section">
        <Container>
          <ReviewsSection id="trip-reviews-title" />
        </Container>
      </div>

      {hasPackages ? (
        <section aria-labelledby="prices-title" className="border-t border-line py-section">
          <Container>
            <SectionHeading
              id="prices-title"
              eyebrow="Prices per person"
              title="Same boat, choose your night in Pak Beng"
              intro="Every package includes the pick-up, the border help, both lunches, the stops and the transfers. What changes is where you sleep."
            />
            <div className="mt-14">
              <Packages trip={trip} />
            </div>
            <NextSailings weekdays={trip.departures.weekdays} className="mt-8" />
          </Container>
        </section>
      ) : null}

      {/* Booking */}
      <section
        id="book"
        aria-labelledby="book-title"
        className="border-t border-line bg-surface-subtle py-section"
      >
        <Container>
          <SectionHeading
            id="book-title"
            eyebrow={bookingLabel}
            title={`Book the ${trip.shortName.split(" · ")[0]?.toLowerCase()} ${trip.kind === "River cruise" ? "cruise" : "journey"}`}
            intro="Pick a departure and tell us who is coming. Sending a request is free and doesn’t commit you."
          />
          <NextSteps
            dayOne={firstStop ? `${firstStop} on day one` : undefined}
            className="mt-10 rounded-md border border-line bg-surface p-6"
          />
          <div className="mt-12">
            <BookingForm
              trips={trips}
              defaultTrip={trip.slug}
              lockTrip
              asideFooter={<BookingReview />}
            />
          </div>
        </Container>
      </section>

      {/* Other journeys */}
      <section aria-labelledby="more-title" className="pt-section">
        <Container>
          <SectionHeading id="more-title" eyebrow="More ways to travel" title="Other journeys" />
          <ul className="mt-10 grid gap-6 lg:grid-cols-3">
            {others.map((t) => (
              <li key={t.slug}>
                <TripCard trip={t} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand href="#book" showReview={false} />

      {/* Mobile booking bar */}
      <div className="sticky bottom-0 z-30 border-t border-line bg-surface shadow-md lg:hidden">
        <Container className="flex items-center justify-between gap-4 py-3">
          <p className="text-sm leading-tight">
            {from ? (
              <>
                <span className="text-muted">From </span>
                <span className="font-display text-xl text-heading">
                  {formatAmount(from, "USD")}
                </span>
                <span className="text-muted"> / person</span>
              </>
            ) : (
              <span className="text-heading">Price on request</span>
            )}
          </p>
          <a href="#book" className={buttonClasses({ variant: "cta" })}>
            {bookingLabel}
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
    <div className="grid grid-cols-icon gap-x-3">
      <span aria-hidden="true" className="row-span-2 mt-0.5 text-primary">
        {icon}
      </span>
      <dt className="font-display text-eyebrow text-muted uppercase">{term}</dt>
      <dd className="mt-1 text-ink">{children}</dd>
    </div>
  );
}
