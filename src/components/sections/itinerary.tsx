import { Info, Utensils } from "lucide-react";
import type { ItineraryDay } from "@/content/types";

/** Day-by-day timeline. The spine echoes the river line of the brand. */
export function Itinerary({ days }: { days: readonly ItineraryDay[] }) {
  return (
    <ol className="space-y-10">
      {days.map((day) => (
        <li key={day.label} className="grid gap-4 sm:grid-cols-[7rem_1fr] sm:gap-8">
          <div>
            <span className="inline-flex rounded-full bg-river px-3 py-1 text-sm font-semibold text-sand">
              {day.label}
            </span>
          </div>
          <div>
            <h3 className="text-h3">{day.title}</h3>
            {day.meals ? (
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted">
                <Utensils aria-hidden="true" className="size-4" />
                <span className="sr-only">Meals: </span>
                {day.meals}
              </p>
            ) : null}
            <ol className="relative mt-5 space-y-5 border-l-2 border-river/25 pl-6">
              {day.stops.map((stop) => (
                <li key={stop.title} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 -left-[calc(1.5rem+7px)] size-3 rounded-full border-2 border-sand bg-vermilion"
                  />
                  <p className="font-semibold text-maroon">{stop.title}</p>
                  {stop.text ? <p className="mt-0.5 text-muted">{stop.text}</p> : null}
                </li>
              ))}
            </ol>
            {day.note ? (
              <p className="mt-5 flex gap-2 rounded-xl bg-gold/20 p-4 text-sm text-ink">
                <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-lantern" />
                {day.note}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
