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
    <article className="group relative flex h-full flex-col rounded-md border border-line bg-surface p-6 shadow-sm transition-shadow duration-base focus-within:shadow-md hover:shadow-md sm:p-7">
      <p className="flex flex-wrap items-center gap-2 font-display text-eyebrow text-primary uppercase">
        {trip.kindLabel}
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1 tracking-normal normal-case">
          <Clock aria-hidden="true" className="size-4" />
          {trip.duration}
        </span>
      </p>
      <H className="mt-3 text-h3">
        <Link
          href={pathFor(locale, tripKey(trip.slug))}
          className="after:absolute after:inset-0 after:rounded-md focus-visible:outline-none"
        >
          <RouteLabel text={title} />
        </Link>
      </H>
      <RouteStrip stops={trip.route} className="mt-4" />
      <p className="mt-4 text-muted">{trip.summary}</p>

      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
        <div>
          <p className="font-display text-eyebrow text-muted uppercase">{trip.departures.label}</p>
          <DayChips days={trip.departures.weekdays} className="mt-1.5" />
        </div>
        <p className="text-right">
          {from ? (
            <>
              <span className="block font-display text-eyebrow text-muted uppercase">
                {m.common.from}
              </span>
              <Price usd={from} className="font-display text-2xl text-heading" />
              <span className="text-sm text-muted"> {m.common.perPersonShort}</span>
            </>
          ) : (
            <span className="text-sm text-muted">{m.common.priceOnRequest}</span>
          )}
        </p>
      </div>
      <span
        aria-hidden="true"
        className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 text-primary"
      >
        {m.trip.seeItinerary}
        <ArrowRight className="size-4 transition-transform duration-base group-hover:translate-x-1" />
      </span>
    </article>
  );
}
