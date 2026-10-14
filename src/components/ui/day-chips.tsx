import type { Weekday } from "@/content/types";
import { formatWeekdays, sortWeekdays, weekdayName } from "@/lib/departures";
import { cn } from "@/lib/cn";

/** Departure days as chips, with the full sentence for screen readers. */
export function DayChips({
  days,
  tone = "light",
  className,
}: {
  days: readonly Weekday[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span className={cn("inline-flex flex-wrap gap-1.5", className)}>
      <span className="sr-only">{formatWeekdays(days)}</span>
      {sortWeekdays(days).map((d) => (
        <span
          key={d}
          aria-hidden="true"
          className={cn(
            "rounded-xs px-2 py-0.5 text-sm",
            tone === "dark" ? "bg-primary-hover text-on-primary" : "bg-surface-tint text-primary",
          )}
        >
          {weekdayName(d, "short")}
        </span>
      ))}
    </span>
  );
}
