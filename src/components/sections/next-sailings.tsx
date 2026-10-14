"use client";

import type { Weekday } from "@/content/types";
import { cn } from "@/lib/cn";
import { formatWeekdays, parseIsoDate, upcomingDepartures } from "@/lib/departures";
import { useToday } from "@/lib/use-today";

const short = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

/**
 * The next real departure dates, computed in the visitor's browser (honest urgency:
 * fixed sailing days, never invented seat counts). Falls back to the weekdays.
 */
export function NextSailings({
  weekdays,
  count = 3,
  label = "Next sailings",
  className,
}: {
  weekdays: readonly Weekday[];
  count?: number;
  label?: string;
  className?: string;
}) {
  const today = useToday();
  const dates = today ? upcomingDepartures(weekdays, parseIsoDate(today), count) : [];
  return (
    <p className={cn("text-sm text-muted", className)}>
      <span className="text-ink">{label}: </span>
      {dates.length
        ? dates.map((d) => short.format(parseIsoDate(d))).join(" · ")
        : `every ${formatWeekdays(weekdays)}`}
    </p>
  );
}
