import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { RouteStrip } from "@/components/brand/route-strip";
import { Price } from "@/components/currency/price";
import { DayChips } from "@/components/ui/day-chips";
import { RouteLabel } from "@/components/ui/route-label";
import type { Trip } from "@/content/types";
import { pathFor, tripKey } from "@/i18n/routes";
import { getI18n } from "@/i18n/server";
import { fromPriceUsd } from "@/lib/currency";
import { availableOptions } from "@/lib/departures";

/**
 * Class for the list item holding a TripCard. From `lg`, cards sit side by side on one shared
 * grid: each item spans the list's seven row tracks as a subgrid, and the card inside does the
 * same. Every row type (kind, title, route, summary, departures, price, link) therefore lines
 * up across cards whatever the text length or language, and all cards get the same height.
 */
export const tripCardItemClass = "lg:row-span-7 lg:grid lg:grid-rows-subgrid";
/** Class for the list itself: three columns from `lg`, rows spaced like the cards' insides. */
export const tripCardListClass = "grid gap-6 lg:grid-cols-3 lg:gap-y-4";

export function TripCard({
  trip,
  headingLevel: H = "h3",
}: {
  trip: Trip;
  headingLevel?: "h2" | "h3";
}) {
  const { locale, m } = getI18n();
  const from = fromPriceUsd(availableOptions(trip.options));
  const title = trip.shortName.split(" · ")[1] ?? trip.name;
  return (
    <article className="group relative flex h-full flex-col gap-4 rounded-md border border-line bg-surface p-6 shadow-sm transition-shadow duration-base focus-within:shadow-md hover:shadow-md sm:p-7 lg:row-span-7 lg:grid lg:grid-rows-subgrid lg:gap-4">
      {/* 1 · Kind and duration */}
      <p className="flex flex-wrap items-center gap-2 font-display text-eyebrow text-primary uppercase">
        {trip.kindLabel}
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1 tracking-normal normal-case">
          <Clock aria-hidden="true" className="size-4" />
          {trip.duration}
        </span>
      </p>
      {/* 2 · Title */}
      <H className="text-h3">
        <Link
          href={pathFor(locale, tripKey(trip.slug))}
          className="after:absolute after:inset-0 after:rounded-md focus-visible:outline-none"
        >
          <RouteLabel text={title} />
        </Link>
      </H>
      {/* 3 · Route */}
      <RouteStrip stops={trip.route} />
      {/* 4 · Summary (the flexible row) */}
      <p className="text-muted">{trip.summary}</p>
      {/* 5 · Departures */}
      <div className="mt-auto lg:mt-0">
        <p className="font-display text-eyebrow text-muted uppercase">{trip.departures.label}</p>
        <DayChips days={trip.departures.weekdays} className="mt-1.5" />
      </div>
      {/* 6 · Price, or price on request, on the same row and left edge in every card */}
      <p className="lg:self-end">
        {from ? (
          <>
            <span className="block font-display text-eyebrow text-muted uppercase">
              {m.common.from}
            </span>
            <Price usd={from} className="font-display text-2xl text-heading" />
            <span className="text-sm text-muted"> {m.common.perPersonShort}</span>
          </>
        ) : (
          <span className="block font-display text-lg text-heading">{m.common.priceOnRequest}</span>
        )}
      </p>
      {/* 7 · Link */}
      <span
        aria-hidden="true"
        className="inline-flex items-center gap-1.5 border-t border-line pt-4 text-primary"
      >
        {m.trip.seeItinerary}
        <ArrowRight className="size-4 transition-transform duration-base group-hover:translate-x-1" />
      </span>
    </article>
  );
}
