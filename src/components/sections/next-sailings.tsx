"use client";

import type { Weekday } from "@/content/types";
import { useI18n } from "@/i18n/client";
import { fmt } from "@/i18n/format";
import { cn } from "@/lib/cn";
import { formatWeekdays, parseIsoDate, upcomingDepartures } from "@/lib/departures";
import { useToday } from "@/lib/use-today";

/**
 * The next real departure dates, computed in the visitor's browser (honest urgency:
 * fixed sailing days, never invented seat counts). Falls back to the weekdays.
 */
export function NextSailings({
  weekdays,
  count = 3,
  className,
}: {
  weekdays: readonly Weekday[];
  count?: number;
  className?: string;
}) {
  const { intl, m } = useI18n();
  const today = useToday();
  const dates = today ? upcomingDepartures(weekdays, parseIsoDate(today), count) : [];
  const short = new Intl.DateTimeFormat(intl, { weekday: "short", day: "numeric", month: "short" });
  return (
    <p className={cn("text-sm text-muted", className)}>
      <span className="text-ink">{m.nextSailings.label}: </span>
      {dates.length
        ? dates.map((d) => short.format(parseIsoDate(d))).join(" · ")
        : fmt(m.nextSailings.every, { days: formatWeekdays(weekdays, intl) })}
    </p>
  );
}
