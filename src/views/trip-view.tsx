import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, MessageCircle, Users } from "lucide-react";
import { RouteStrip } from "@/components/brand/route-strip";
import { BookingForm } from "@/components/booking/booking-form";
import { Price } from "@/components/currency/price";
import { JsonLd } from "@/components/layout/json-ld";
import { RatingSummary } from "@/components/reviews/rating-summary";
import { BookingReview, ReviewsSection } from "@/components/reviews/reviews-section";
import { CtaBand } from "@/components/sections/cta-band";
import { Included } from "@/components/sections/included";
import { Itinerary } from "@/components/sections/itinerary";
import { NextSteps } from "@/components/sections/next-steps";
import { Packages } from "@/components/sections/packages";
import { PageHeader } from "@/components/sections/page-header";
import { PriceList } from "@/components/sections/price-list";
import { TripCard } from "@/components/sections/trip-card";
import { TikTokSection } from "@/components/tiktok/tiktok-section";
import { ButtonAnchor, buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DayChips } from "@/components/ui/day-chips";
import { SectionHeading } from "@/components/ui/section-heading";
import { getTrip, getTrips } from "@/content/localized";
import { site } from "@/content/site";
import type { TripSlug } from "@/i18n/routes";
import { fmt } from "@/i18n/index";
import { pathFor, tripKey } from "@/i18n/routes";
import { getI18n } from "@/i18n/server";
import { cn } from "@/lib/cn";
import { fromPriceUsd } from "@/lib/currency";
import { availableOptions } from "@/lib/departures";
import { tripJsonLd } from "@/lib/structured-data";

export function TripView({ slug }: { slug: TripSlug }) {
  const { locale, m } = getI18n();
  const t = m.trip;
  const trip = getTrip(locale, slug);
  if (!trip) notFound();

  const options = availableOptions(trip.options);
  const from = fromPriceUsd(options);
  const others = getTrips(locale)
    .filter((other) => other.slug !== trip.slug)
    .slice(0, 3);
  const firstStop = trip.itinerary[0]?.stops[0]?.title;
  const short = trip.shortName.split(" · ")[1] ?? trip.name;
  const hasPackages = Boolean(trip.packages?.length) && options.length > 0;

  return (
    <>
      <PageHeader
        eyebrow={trip.kindLabel}
        title={trip.name}
        intro={trip.summary}
        crumbs={[{ href: pathFor(locale, tripKey(trip.slug)), label: short }]}
        photo={trip.photo}
      >
        <RouteStrip stops={trip.route} className="mt-6 max-w-xl" />
        <RatingSummary className="mt-6" />
      </PageHeader>

      <Container className="grid gap-14 py-14 sm:py-20 lg:grid-cols-sidebar lg:gap-16">
        <div className="min-w-0 space-y-20">
          {/* Key facts */}
          <section aria-label={m.common.keyFacts}>
            <dl className="grid gap-6 rounded-md border border-line bg-surface p-6 sm:grid-cols-3">
              <Fact icon={<Clock className="size-5" />} term={t.duration}>
                {trip.duration}
              </Fact>
              <Fact icon={<CalendarDays className="size-5" />} term={trip.departures.label}>
                <DayChips days={trip.departures.weekdays} />
              </Fact>
              <Fact icon={<Users className="size-5" />} term={t.group}>
                {trip.minimum ?? trip.departures.note ?? t.groupDefault}
              </Fact>
            </dl>
          </section>

          <section aria-labelledby="included-title">
            <SectionHeading
              id="included-title"
              eyebrow={t.includedEyebrow}
              title={t.includedTitle}
              intro={t.includedIntro}
            />
            <div className="mt-8">
              <Included included={trip.included} notIncluded={trip.notIncluded} />
            </div>
          </section>

          <section aria-labelledby="itinerary-title">
            <SectionHeading
              id="itinerary-title"
              eyebrow={t.itineraryEyebrow}
              title={t.itineraryTitle}
            />
            <div className="mt-10">
              <Itinerary days={trip.itinerary} />
            </div>
          </section>

          {hasPackages ? null : (
            <section aria-labelledby="prices-title">
              <SectionHeading
                id="prices-title"
                eyebrow={t.pricesEyebrow}
                title={options.length ? t.pricesTitle : t.pricesOnRequestTitle}
                intro={options.length ? undefined : trip.priceOnRequest}
              />
              {options.length ? (
                <div className="mt-8">
                  <PriceList options={options} />
                  {trip.minimum ? <p className="mt-4 text-muted">{trip.minimum}</p> : null}
                </div>
              ) : null}
            </section>
          )}

          {trip.goodToKnow.length ? (
            <section aria-labelledby="know-title">
              <SectionHeading id="know-title" eyebrow={t.knowEyebrow} title={t.knowTitle} />
              <ul data-reveal="group" className="mt-6 space-y-3">
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
        <aside aria-label={t.asideLabel} className="hidden lg:block">
          <div className="sticky top-24 rounded-md border border-line bg-surface p-6 shadow-sm">
            {from ? (
              <p>
                <span className="block font-display text-eyebrow text-muted uppercase">
                  {m.common.from}
                </span>
                <Price usd={from} className="font-display text-3xl text-heading" />
                <span className="text-muted"> {m.common.perPersonShort}</span>
              </p>
            ) : (
              <p className="font-display text-2xl text-heading">{m.common.priceOnRequest}</p>
            )}
            <p className="mt-4 text-sm text-muted">{trip.departures.label}</p>
            <DayChips days={trip.departures.weekdays} className="mt-1.5" />
            {trip.departures.note ? (
              <p className="mt-2 text-sm text-muted">
                {fmt(t.askEarly, { note: trip.departures.note })}
              </p>
            ) : null}
            <a
              href="#book"
              className={cn(buttonClasses({ size: "lg", variant: "cta" }), "mt-6 w-full")}
            >
              {m.nav.bookingLabel}
            </a>
            <ButtonAnchor
              href={site.contact.whatsappHref}
              variant="secondary"
              className="mt-3 w-full"
            >
              <MessageCircle aria-hidden="true" />
              {m.common.askOnWhatsApp}
            </ButtonAnchor>
            <p className="mt-4 text-sm text-muted">{m.contact.replyPromise}</p>
          </div>
        </aside>
      </Container>

      {/* Proof right before the price (docs/04-offer-brief.md §6) */}
      <div className="border-t border-line bg-surface-subtle py-section">
        <Container className="space-y-section">
          <ReviewsSection id="trip-reviews-title" />
          <TikTokSection id="trip-tiktok-title" />
        </Container>
      </div>

      {hasPackages ? (
        <section aria-labelledby="prices-title" className="border-t border-line py-section">
          <Container>
            <SectionHeading
              id="prices-title"
              eyebrow={m.packagesSection.eyebrow}
              title={m.packagesSection.title}
              intro={m.packagesSection.intro}
            />
            <div className="mt-14">
              <Packages trip={trip} />
            </div>
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
            eyebrow={m.nav.bookingLabel}
            title={trip.bookTitle}
            intro={t.bookIntro}
          />
          <NextSteps
            dayOne={firstStop ? fmt(t.dayOne, { stop: firstStop }) : undefined}
            className="mt-10 rounded-md border border-line bg-surface p-6"
          />
          <div className="mt-12">
            <BookingForm
              trips={getTrips(locale)}
              defaultTrip={trip.slug}
              lockTrip
              asideFooter={<BookingReview />}
              copy={m.booking}
              replyPromise={m.contact.replyPromise}
            />
          </div>
        </Container>
      </section>

      {/* Other journeys */}
      <section aria-labelledby="more-title" className="pt-section">
        <Container>
          <SectionHeading id="more-title" eyebrow={t.moreEyebrow} title={t.moreTitle} />
          <ul data-reveal="group" className="mt-10 grid gap-6 lg:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <TripCard trip={other} />
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
                <span className="text-muted">{m.common.from} </span>
                <Price usd={from} className="font-display text-xl text-heading" />
                <span className="text-muted"> {m.common.perPersonShort}</span>
              </>
            ) : (
              <span className="text-heading">{m.common.priceOnRequest}</span>
            )}
          </p>
          <a href="#book" className={buttonClasses({ variant: "cta" })}>
            {m.nav.bookingLabel}
          </a>
        </Container>
      </div>

      <JsonLd data={tripJsonLd(locale, trip)} />
    </>
  );
}

function Fact({ icon, term, children }: { icon: ReactNode; term: string; children: ReactNode }) {
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
