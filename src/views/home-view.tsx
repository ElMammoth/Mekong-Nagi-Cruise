import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { RouteMap } from "@/components/brand/route-map";
import { Price } from "@/components/currency/price";
import { TextLoop } from "@/components/effects/text-loop";
import { Photo, isPhotoShown } from "@/components/media/photo";
import { RatingSummary } from "@/components/reviews/rating-summary";
import { ReviewsSection } from "@/components/reviews/reviews-section";
import { BoatFeatures } from "@/components/sections/boat-features";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqSection } from "@/components/sections/faq-section";
import { HandledForYou } from "@/components/sections/handled-for-you";
import { Packages } from "@/components/sections/packages";
import { TripCard } from "@/components/sections/trip-card";
import { WhyNagi } from "@/components/sections/why-nagi";
import { TikTokSection } from "@/components/tiktok/tiktok-section";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DayChips } from "@/components/ui/day-chips";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { getFaqs, getPhotos, getTrip, getTrips } from "@/content/localized";
import { site } from "@/content/site";
import { fmt } from "@/i18n/index";
import { pathFor } from "@/i18n/routes";
import { getI18n } from "@/i18n/server";
import { fromPriceUsd } from "@/lib/currency";
import { availableOptions } from "@/lib/departures";
import { navigation } from "@/lib/navigation";

/**
 * Section order follows the traveller's questions (docs/04-offer-brief.md §2):
 * what is it → can I trust it → what's included → what does it cost → how do I book.
 */
export function HomeView() {
  const { locale, m } = getI18n();
  const h = m.home;
  const nav = navigation(locale);
  const photos = getPhotos(locale);
  const downstream = getTrip(locale, "downstream")!;
  const homeFaqs = getFaqs(locale).slice(0, 6);
  const from = fromPriceUsd(availableOptions(downstream.options));
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
            <Eyebrow>{h.offerName}</Eyebrow>
            <h1 id="hero-title" className="text-display">
              {h.title}
            </h1>
            <RatingSummary className="mt-5" />
            <p className="mt-6 max-w-xl text-lead text-muted">{h.intro}</p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
              <div>
                <dt className="font-display text-eyebrow text-muted uppercase">{h.departures}</dt>
                <dd className="mt-1.5">
                  <DayChips days={downstream.departures.weekdays} />
                </dd>
              </div>
              {from ? (
                <div>
                  <dt className="font-display text-eyebrow text-muted uppercase">
                    {m.common.from}
                  </dt>
                  <dd className="mt-0.5">
                    <Price usd={from} className="font-display text-2xl text-heading" />
                    <span className="text-muted"> {m.common.perPerson}</span>
                  </dd>
                </div>
              ) : null}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={nav.downstreamBookingHref} size="lg" variant="cta">
                {nav.bookingLabel}
              </ButtonLink>
              <ButtonAnchor href={site.contact.whatsappHref} size="lg" variant="secondary">
                <MessageCircle aria-hidden="true" />
                {m.common.askOnWhatsApp}
              </ButtonAnchor>
            </div>
            <p className="mt-3 text-sm text-muted">{m.contact.replyPromise}</p>
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
          text={h.loopPhrase}
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
      <section aria-label={m.common.keyFacts} className="border-y border-line bg-surface">
        <Container>
          <ul className="grid grid-cols-3 divide-x divide-line">
            {m.facts.map((fact) => (
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

      {/* 3 · Why us: three claims, each with its proof */}
      <WhyNagi />

      {/* 4 · The offer: everything handled */}
      <Container className="border-t border-line py-section">
        <HandledForYou
          action={
            <>
              <ButtonLink href={nav.downstreamBookingHref}>{nav.bookingLabel}</ButtonLink>
              <p className="mt-3 text-sm text-muted">{h.freeToAsk}</p>
            </>
          }
        />
      </Container>

      {/* 5 · Proof, right after the promise: written reviews, then TikTok videos */}
      <div className="border-y border-line bg-surface-subtle py-section">
        <Container className="space-y-section">
          <ReviewsSection />
          <TikTokSection />
        </Container>
      </div>

      {/* 6 · The journey */}
      <section aria-labelledby="journey-title" className="py-section">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                id="journey-title"
                eyebrow={h.journeyEyebrow}
                title={h.journeyTitle}
                intro={downstream.summary}
              />
              <ol data-reveal="group" className="mt-10 space-y-8">
                {[day1, day2].map((day, i) =>
                  day ? (
                    <li key={day.label} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="grid size-12 shrink-0 place-items-center rounded-sm bg-surface-tint font-display text-primary"
                      >
                        {fmt(h.dayChip, { n: i + 1 })}
                      </span>
                      <div>
                        <h3 className="text-h3">
                          <span className="sr-only">{fmt(h.dayLabel, { n: i + 1 })} </span>
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
                href={pathFor(locale, "trip:downstream")}
                className="mt-8 inline-flex items-center gap-1.5 text-primary hover:underline"
              >
                {h.fullItinerary}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <RouteMap className="mx-auto w-full max-w-xl lg:max-w-none" />
          </div>
          {journeyPhotos.length ? (
            <ul data-reveal="group" className="mt-14 grid gap-6 sm:grid-cols-3">
              {journeyPhotos.map((photo) => (
                <li key={photo.file}>
                  <Photo photo={photo} sizes="(min-width: 640px) 33vw, 100vw" />
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </section>

      {/* 7 · Packages and prices */}
      <section
        aria-labelledby="packages-title"
        className="border-y border-line bg-surface-subtle py-section"
      >
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="packages-title"
              eyebrow={m.packagesSection.eyebrow}
              title={m.packagesSection.title}
              intro={m.packagesSection.intro}
            />
            <Link
              href={pathFor(locale, "whereToStay")}
              className="inline-flex items-center gap-1.5 text-primary hover:underline"
            >
              {h.compareHotels}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="mt-14">
            <Packages trip={downstream} />
          </div>
        </Container>
      </section>

      {/* 8 · On board and the people */}
      <section aria-labelledby="onboard-title" className="bg-primary py-section inverse">
        <Container>
          <div className="grid gap-14 lg:grid-cols-intro">
            <SectionHeading
              id="onboard-title"
              tone="dark"
              eyebrow={h.onboardEyebrow}
              title={h.onboardTitle}
              intro={h.onboardIntro}
            />
            <BoatFeatures />
          </div>
          {onboardPhotos.length || teamPhotos.length ? (
            <ul data-reveal="group" className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* 9 · Other ways to travel */}
      <section aria-labelledby="journeys-title" className="py-section">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="journeys-title"
              eyebrow={h.moreEyebrow}
              title={h.moreTitle}
              intro={h.moreIntro}
            />
            <Link
              href={pathFor(locale, "guide")}
              className="inline-flex items-center gap-1.5 text-primary hover:underline"
            >
              {h.readGuide}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <ul data-reveal="group" className="mt-12 grid gap-6 lg:grid-cols-3">
            {getTrips(locale)
              .filter((trip) => trip.slug !== "downstream")
              .map((trip) => (
                <li key={trip.slug}>
                  <TripCard trip={trip} />
                </li>
              ))}
          </ul>
        </Container>
      </section>

      {/* 10 · Objections */}
      <section aria-labelledby="faq-title" className="border-t border-line bg-surface py-section">
        <Container>
          <FaqSection
            id="faq-title"
            eyebrow={h.faqEyebrow}
            title={h.faqTitle}
            faqs={homeFaqs}
            action={
              <Link
                href={pathFor(locale, "faq")}
                className="inline-flex items-center gap-1.5 text-primary hover:underline"
              >
                {h.allQuestions}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            }
          />
        </Container>
      </section>

      {/* 11 · Book */}
      <CtaBand href={nav.downstreamBookingHref} />
    </>
  );
}
