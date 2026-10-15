import { Info, Utensils } from "lucide-react";
import type { ItineraryDay } from "@/content/types";
import { getI18n } from "@/i18n/server";

/**
 * Day-by-day timeline. The spine echoes the river line of the brand; markers sit exactly
 * on it (`.timeline` in globals.css: one marker size, one line width, centred by transform).
 */
export function Itinerary({ days }: { days: readonly ItineraryDay[] }) {
  const { m } = getI18n();
  return (
    <ol className="space-y-10">
      {days.map((day) => (
        <li key={day.label} className="grid gap-4 sm:grid-cols-label sm:gap-8">
          <div>
            <span className="inline-flex rounded-xs bg-primary px-2.5 py-1 font-display text-sm text-on-primary">
              {day.label}
            </span>
          </div>
          <div>
            <h3 className="text-h3">{day.title}</h3>
            {day.meals ? (
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted">
                <Utensils aria-hidden="true" className="size-4" />
                <span className="sr-only">{m.common.meals} </span>
                {day.meals}
              </p>
            ) : null}
            <ol className="timeline mt-5">
              {day.stops.map((stop) => (
                <li key={stop.title}>
                  <p className="timeline-title font-display text-base text-heading">
                    <span aria-hidden="true" className="timeline-marker rounded-xs bg-accent" />
                    {stop.title}
                  </p>
                  {stop.text ? <p className="mt-0.5 text-muted">{stop.text}</p> : null}
                </li>
              ))}
            </ol>
            {day.note ? (
              <p className="mt-5 flex gap-2 rounded-sm bg-surface-tint p-4 text-sm text-ink">
                <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                {day.note}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
