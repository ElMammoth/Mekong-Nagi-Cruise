import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RouteMap } from "@/components/brand/route-map";
import { BoatFeatures } from "@/components/sections/boat-features";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqList } from "@/components/sections/faq-list";
import { StayCard } from "@/components/sections/stay-card";
import { TripCard } from "@/components/sections/trip-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DayChips } from "@/components/ui/day-chips";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/content/faq";
import { bookingHref } from "@/content/navigation";
import { site } from "@/content/site";
import { stays } from "@/content/stays";
import { getTrip, trips } from "@/content/trips";
import { availableOptions } from "@/lib/departures";
import { formatAmount, formatMoney, fromPriceUSD } from "@/lib/money";

export default function HomePage() {
  const downstream = getTrip("downstream")!;
  const downstreamOptions = availableOptions(downstream.options);
  const from = fromPriceUSD(downstreamOptions);
  const pakBengStays = stays.filter((s) => s.place === "Pak Beng");
  const priceFor = (optionId?: string) => {
    const match = downstreamOptions.find((o) => o.id === optionId);
    return match ? formatMoney(match.perPerson) : undefined;
  };

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="overflow-hidden">
        <Container className="grid items-center gap-10 pt-10 pb-16 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pt-20 lg:pb-24">
          <div className="animate-rise">
            <Eyebrow>Mekong slow-boat cruises · Laos</Eyebrow>
            <h1 id="hero-title" className="text-display">
              Cruise the majestic Mekong in <span className="text-vermilion italic">comfort</span>{" "}
              and safety
            </h1>
            <p className="mt-6 max-w-xl text-lead text-muted">
              Two days on the river from Houay Xai, on the Thai–Lao border, to the UNESCO World
              Heritage town of Luang Prabang, with a night in Pak Beng.
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
              <div>
                <dt className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">
                  Departures
                </dt>
                <dd className="mt-1.5">
                  <DayChips days={downstream.departures.weekdays} />
                </dd>
              </div>
              {from ? (
                <div>
                  <dt className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">
                    From
                  </dt>
                  <dd className="mt-0.5">
                    <span className="font-display text-2xl font-semibold text-maroon">
                      {formatAmount(from, "USD")}
                    </span>
                    <span className="text-muted"> per person</span>
                  </dd>
                </div>
              ) : null}
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={bookingHref} size="lg">
                Request a booking
              </ButtonLink>
              <ButtonLink href="/cruises/downstream/" size="lg" variant="secondary">
                See the itinerary
              </ButtonLink>
            </div>
          </div>

          <RouteMap className="mx-auto w-full max-w-xl lg:max-w-none" />
        </Container>
      </section>

      {/* Facts */}
      <section aria-label="Key facts" className="border-y border-silt bg-paper">
        <Container>
          <ul className="grid grid-cols-3 divide-x divide-silt">
            {site.facts.map((fact) => (
              <li
                key={fact.label}
                className="flex flex-col gap-1 px-3 py-6 first:pl-0 sm:flex-row sm:items-baseline sm:justify-center sm:gap-4 sm:px-6 sm:py-8"
              >
                <span className="font-display text-4xl font-semibold text-vermilion sm:text-5xl">
                  {fact.value}
                </span>
                <span className="max-w-[12rem] text-sm text-muted sm:text-base">{fact.label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Journeys */}
      <section aria-labelledby="journeys-title" className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="journeys-title"
              eyebrow="Cruises & journeys"
              title="Choose your way down the river"
              intro="Sail downstream or upstream between Houay Xai and Luang Prabang, or start further away in Chiang Mai or Nan and let us handle the road to the river."
            />
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {trips.map((trip) => (
              <li key={trip.slug}>
                <TripCard trip={trip} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* On board */}
      <section aria-labelledby="onboard-title" className="bg-river py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="onboard-title"
            tone="dark"
            eyebrow="On board the Nagi of Mekong"
            title="A river cruise to reminisce"
            intro="We are a mid-range cruise operator: a comfortable, safe boat, a fresh lunch every day and a host who looks after the details from the pier to your hotel."
          />
          <BoatFeatures />
        </Container>
      </section>

      {/* Stays */}
      <section aria-labelledby="stays-title" className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="stays-title"
              eyebrow="Your night in Pak Beng"
              title="Pick the hotel, the price follows"
              intro="Every downstream package includes one night in Pak Beng, the halfway village. Choose the comfort level that suits you, or book the boat only."
            />
            <Link
              href="/where-to-stay/"
              className="inline-flex items-center gap-1.5 font-semibold text-lantern hover:underline"
            >
              All places to stay
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {pakBengStays.map((stay) => (
              <li key={stay.name}>
                <StayCard stay={stay} price={priceFor(stay.packageOptionId)} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="border-t border-silt bg-paper py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              id="faq-title"
              eyebrow="Good to know"
              title="Questions before you sail"
            />
            <Link
              href="/plan-your-trip/"
              className="mt-6 inline-flex items-center gap-1.5 font-semibold text-lantern hover:underline"
            >
              Plan your trip
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <FaqList faqs={faqs.slice(0, 6)} />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
