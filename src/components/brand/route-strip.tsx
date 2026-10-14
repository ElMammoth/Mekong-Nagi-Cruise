import { cn } from "@/lib/cn";

/** Compact horizontal route: "Houay Xai — Pak Beng — Luang Prabang". */
export function RouteStrip({
  stops,
  tone = "light",
  className,
}: {
  stops: readonly string[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ol
      aria-label="Route"
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-sm",
        tone === "dark" ? "text-on-primary-muted" : "text-muted",
        className,
      )}
    >
      {stops.map((stop, i) => (
        <li key={stop} className="flex items-center gap-2">
          {i > 0 ? (
            <span
              aria-hidden="true"
              className={cn("h-px w-5", tone === "dark" ? "bg-on-primary-muted" : "bg-line-strong")}
            />
          ) : null}
          <span
            aria-hidden="true"
            className={cn(
              "size-2 rounded-xs",
              i === 0 || i === stops.length - 1 ? "bg-accent" : "border-2 border-accent",
            )}
          />
          {stop}
        </li>
      ))}
    </ol>
  );
}
