import type { CSSProperties } from "react";
import { getI18n } from "@/i18n/server";
import { cn } from "@/lib/cn";

/**
 * Compact horizontal route: the stops sit on one line, Houay Xai ■—□—■ Luang Prabang, with
 * the names underneath. Ends are filled squares, stops in between are outlined. Layout and
 * centring come from `.route-line` in globals.css (same tokens as the itinerary).
 */
export function RouteStrip({
  stops,
  tone = "light",
  className,
}: {
  stops: readonly string[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const { m } = getI18n();
  return (
    <ol
      aria-label={m.common.route}
      style={{ "--stops": stops.length } as CSSProperties}
      className={cn(
        "route-line text-sm",
        tone === "dark" ? "text-on-primary-muted" : "text-muted",
        className,
      )}
    >
      {stops.map((stop, i) => (
        <li key={stop}>
          <span
            aria-hidden="true"
            className={cn(
              "timeline-marker rounded-xs",
              i === 0 || i === stops.length - 1 ? "bg-accent" : "border-2 border-accent bg-surface",
            )}
          />
          {stop}
        </li>
      ))}
    </ol>
  );
}
