import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { RouteMap } from "@/components/brand/route-map";
import { TextLoop } from "@/components/effects/text-loop";
import { JsonLd } from "@/components/layout/json-ld";
import { Photo, isPhotoShown } from "@/components/media/photo";
import { RatingSummary } from "@/components/reviews/rating-summary";
import { ReviewsSection } from "@/components/reviews/reviews-section";
import { BoatFeatures } from "@/components/sections/boat-features";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqList } from "@/components/sections/faq-list";
import { HandledForYou } from "@/components/sections/handled-for-you";
import { NextSailings } from "@/components/sections/next-sailings";
import { Packages } from "@/components/sections/packages";
import { TripCard } from "@/components/sections/trip-card";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DayChips } from "@/components/ui/day-chips";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/content/faq";
import { bookingLabel, downstreamBookingHref } from "@/content/navigation";
import { photos } from "@/content/photos";
import { site } from "@/content/site";
import { getTrip, trips } from "@/content/trips";
import { availableOptions } from "@/lib/departures";
import { formatAmount, fromPriceUSD } from "@/lib/money";
import { faqJsonLd } from "@/lib/structured-data";

const homeFaqs = faqs.slice(0, 6);

export const metadata: Metadata = { alternates: { canonical: "/" } };

/**
 * Section order follows the traveller's questions (docs/04-offer-brief.md §2):
 * what is it → can I trust it → what's included → what does it cost → how do I book.
 */
export default function HomePage() {
  const downstream = getTrip("downstream")!;
  const from = fromPriceUSD(availableOptions(downstream.options));
  const [day1, day2] = downstream.itinerary;
  const journeyPhotos = [photos.riverBanks, photos.village, photos.pakOuCave].filter(isPhotoShown);
  const onboardPhotos = [photos.boatInterior, photos.lunch].filter(isPhotoShown);
  const teamPhotos = [photos.host, photos.crew].filter(isPhotoShown);

  return (
    <>
      {/* 1 · Hero: the outcome, the days, the price, the action, the proof */}
      <section aria-labelledby="hero-title" className="overflow-hidden">
        <Container className="grid items-center gap-10 pt-10 pb-16 sm:pt-16 lg:grid-cols-hero lg:gap-12 lg:pt-20 lg:pb-24">
          <div>
            <Eyebrow>{site.offerName}</Eyebrow>
            <h1 id="hero-title" className="text-display">
              Houay Xai to Luang Prabang, in comfort and safety
            </h1>
            <RatingSummary className="mt-5" />
            <p className="mt-6 max-w-xl text-lead text-muted">
              Two days down the Mekong, with a night in Pak Beng. We pick you up from your hotel in
              Chiang Khong or Houay Xai, help you across the border, serve lunch on board and drop
              you off at your hotel in Luang Prabang.
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
              <div>
                <dt className="font-display text-eyebrow text-muted uppercase">Departures</dt>
                <dd className="mt-1.5">
                  <DayChips days={downstream.departures.weekdays} />
                </dd>
              </div>
              {from ? (
                <div>
                  <dt className="font-display text-eyebrow text-muted uppercase">From</dt>
                  <dd className="mt-0.5">
                    <span className="font-display text-2xl text-heading">
                      {formatAmount(from, "USD")}
                    </span>
                    <span className="text-muted"> per person</span>
                  </dd>
                </div>
              ) : null}
            </dl>
            <NextSailings weekdays={downstream.departures.weekdays} className="mt-4" />

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={downstreamBookingHref} size="lg" variant="cta">
                {bookingLabel}
              </ButtonLink>
              <ButtonAnchor href={site.contact.whatsappHref} size="lg" variant="secondary">
                <MessageCircle aria-hidden="true" />
                Ask on WhatsApp
              </ButtonAnchor>
            </div>
            <p className="mt-3 text-sm text-muted">{site.contact.replyPromise}</p>
          </div>

          <Photo
            photo={photos.hero}
            eager
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="shadow-md"
            fallback={<RouteMap className="mx-auto w-full max-w-xl lg:max-w-none" />}
          />
        </Container>
        {/* A short phrase flows along the river; the h1 above stays static. */}
        <TextLoop
          text={site.loopPhrase}
          shape="wave"
          curviness={14}
          fontSize={30}
          letterSpacing={3}
          ribbonWidth={58}
          viewHeight={120}
          speed={60}
          fit="slice"
          svgClassName="h-16 w-full sm:h-auto"
          className="-mt-4 pb-6"
        />
      </section>

      {/* 2 · Facts */}
      <section aria-label="Key facts" className="border-y border-line bg-surface">
        <Container>
          <ul className="grid grid-cols-3 divide-x divide-line">
            {site.facts.map((fact) => (
              <li
                key={fact.label}
                className="flex flex-col gap-1 px-3 py-6 first:pl-0 sm:flex-row sm:items-baseline sm:justify-center sm:gap-4 sm:px-6 sm:py-8"
              >
                <span className="font-display text-h1 text-primary">{fact.value}</span>
                <span className="max-w-fact text-sm text-muted sm:text-base">{fact.label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 3 · The offer: everything handled */}
      <Container className="py-section">
        <HandledForYou
          action={
            <>
              <ButtonLink href={downstreamBookingHref}>{bookingLabel}</ButtonLink>
              <p className="mt-3 text-sm text-muted">Free to ask, no commitment.</p>
            </>
          }
        />
      </Container>

      {/* 4 · Proof, right after the promise */}
      <div className="border-y border-line bg-surface-subtle py-section">
        <Container>
          <ReviewsSection />
        </Container>
      </div>

      {/* 5 · The journey */}
      <section aria-labelledby="journey-title" className="py-section">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                id="journey-title"
                eyebrow="The journey"
                title="Two days on the river"
                intro={downstream.summary}
              />
              <ol className="mt-10 space-y-8">
                {[day1, day2].map((day) =>
                  day ? (
                    <li key={day.label} className="flex gap-4">
                      <span className="grid size-12 shrink-0 place-items-center rounded-sm bg-surface-tint font-display text-primary">
                        {day.label.replace("Day ", "D")}
                      </span>
                      <div>
                        <h3 className="text-h3">
                          <span className="sr-only">{day.label}: </span>
                          {day.title}
                        </h3>
                        <p className="mt-1 text-muted">
                          {day.stops.map((stop) => stop.title).join(" · ")}
                        </p>
                      </div>
                    </li>
                  ) : null,
                )}
              </ol>
              <Link
                href="/cruises/downstream/"
                className="mt-8 inline-flex items-center gap-1.5 text-primary hover:underline"
              >
                See the full downstream itinerary
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <RouteMap className="mx-auto w-full max-w-xl lg:max-w-none" />
          </div>
          {journeyPhotos.length ? (
            <ul className="mt-14 grid gap-6 sm:grid-cols-3">
              {journeyPhotos.map((photo) => (
                <li key={photo.file}>
                  <Photo photo={photo} sizes="(min-width: 640px) 33vw, 100vw" />
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </section>

      {/* 6 · Packages and prices */}
      <section
        aria-labelledby="packages-title"
        className="border-y border-line bg-surface-subtle py-section"
      >
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="packages-title"
              eyebrow="Prices per person"
              title="Same boat, choose your night in Pak Beng"
              intro="Every package includes the pick-up, the border help, both lunches, the stops and the transfers. What changes is where you sleep."
            />
            <Link
              href="/where-to-stay/"
              className="inline-flex items-center gap-1.5 text-primary hover:underline"
            >
              Compare the Pak Beng hotels
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="mt-14">
            <Packages trip={downstream} />
          </div>
          <NextSailings weekdays={downstream.departures.weekdays} className="mt-8" />
        </Container>
      </section>

      {/* 7 · On board and the people */}
      <section aria-labelledby="onboard-title" className="bg-primary py-section inverse">
        <Container>
          <div className="grid gap-14 lg:grid-cols-intro">
            <SectionHeading
              id="onboard-title"
              tone="dark"
              eyebrow="On board the Nagi of Mekong"
              title="A river cruise to reminisce"
              intro="We are a mid-range cruise operator: a comfortable, safe boat, a fresh lunch every day and a host who looks after the details from the pier to your hotel."
            />
            <BoatFeatures />
          </div>
          {onboardPhotos.length || teamPhotos.length ? (
            <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...onboardPhotos, ...teamPhotos].map((photo) => (
                <li key={photo.file}>
                  <figure>
                    <Photo
                      photo={photo}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                    {photo.caption ? (
                      <figcaption className="mt-3 text-sm text-on-primary-muted">
                        {photo.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </section>

      {/* 8 · Other ways to travel */}
      <section aria-labelledby="journeys-title" className="py-section">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="journeys-title"
              eyebrow="More ways to travel"
              title="Going upstream, or starting further away?"
              intro="Sail up from Luang Prabang, or start in Chiang Mai or Nan and let us handle the road to the river."
            />
            <Link
              href="/guides/houay-xai-to-luang-prabang/"
              className="inline-flex items-center gap-1.5 text-primary hover:underline"
            >
              Read the route guide
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {trips
              .filter((trip) => trip.slug !== "downstream")
              .map((trip) => (
                <li key={trip.slug}>
                  <TripCard trip={trip} />
                </li>
              ))}
          </ul>
        </Container>
      </section>

      {/* 9 · Objections */}
      <section aria-labelledby="faq-title" className="border-t border-line bg-surface py-section">
        <Container className="grid gap-10 lg:grid-cols-intro">
          <div>
            <SectionHeading
              id="faq-title"
              eyebrow="Good to know"
              title="Questions before you sail"
            />
            <Link
              href="/plan-your-trip/"
              className="mt-6 inline-flex items-center gap-1.5 text-primary hover:underline"
            >
              All questions about visas, food and weather
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <FaqList faqs={homeFaqs} />
        </Container>
        <JsonLd data={faqJsonLd(homeFaqs)} />
      </section>

      {/* 10 · Book */}
      <CtaBand href={downstreamBookingHref} />
    </>
  );
}
