import { cn } from "@/lib/cn";
import { BoatMark } from "./boat-mark";

/** Text-based wordmark: crisp at every size, accessible, no image request. */
export function Wordmark({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid size-10 place-items-center rounded-xl",
          tone === "dark" ? "bg-vermilion text-sand" : "bg-vermilion text-paper",
        )}
      >
        <BoatMark className="w-8" />
      </span>
      <span className="flex flex-col leading-none whitespace-nowrap">
        <span
          className={cn(
            "font-display text-[1.375rem] font-semibold tracking-tight italic",
            tone === "dark" ? "text-sand" : "text-maroon",
          )}
        >
          Nagi
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.6875rem] font-semibold tracking-[0.22em] uppercase",
            tone === "dark" ? "text-river-mist" : "text-muted",
          )}
        >
          of Mekong
        </span>
      </span>
    </span>
  );
}
