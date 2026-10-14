import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { RouteStrip } from "@/components/brand/route-strip";
import { DayChips } from "@/components/ui/day-chips";
import type { Trip } from "@/content/types";
import { availableOptions } from "@/lib/departures";
import { formatAmount, fromPriceUSD } from "@/lib/money";

export function TripCard({
  trip,
  headingLevel: H = "h3",
}: {
  trip: Trip;
  headingLevel?: "h2" | "h3";
}) {
  const from = fromPriceUSD(availableOptions(trip.options));
  const title = trip.shortName.split(" · ")[1] ?? trip.name;
  return (
    <article className="group relative flex h-full flex-col rounded-card border border-silt bg-paper p-6 shadow-card transition-shadow duration-300 focus-within:shadow-raised hover:shadow-raised sm:p-7">
      <p className="flex items-center gap-2 text-sm font-semibold tracking-[0.12em] text-lantern uppercase">
        {trip.kind}
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1 tracking-normal normal-case">
          <Clock aria-hidden="true" className="size-4" />
          {trip.duration}
        </span>
      </p>
      <H className="mt-3 text-h3">
        <Link
          href={`/cruises/${trip.slug}/`}
          className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none"
        >
          {title}
        </Link>
      </H>
      <RouteStrip stops={trip.route} className="mt-3" />
      <p className="mt-4 text-muted">{trip.summary}</p>

      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">
            {trip.departures.label}
          </p>
          <DayChips days={trip.departures.weekdays} className="mt-1.5" />
        </div>
        <p className="text-right">
          {from ? (
            <>
              <span className="block text-xs font-semibold tracking-[0.12em] text-muted uppercase">
                From
              </span>
              <span className="font-display text-2xl font-semibold text-maroon">
                {formatAmount(from, "USD")}
              </span>
              <span className="text-sm text-muted"> / person</span>
            </>
          ) : (
            <span className="text-sm font-semibold text-muted">Price on request</span>
          )}
        </p>
      </div>
      <span
        aria-hidden="true"
        className="mt-5 inline-flex items-center gap-1.5 border-t border-silt pt-4 font-semibold text-lantern"
      >
        See itinerary & prices
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </article>
  );
}
