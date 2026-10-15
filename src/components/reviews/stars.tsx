import { fmt } from "@/i18n/index";
import { getI18n } from "@/i18n/server";
import { cn } from "@/lib/cn";
import { STAR_SYMBOL } from "./platform-logo";

/**
 * Star rating with partial fill. The label carries the meaning for screen readers.
 * Each star references one shared symbol (a page shows a few hundred of them).
 */
export function Stars({
  rating,
  className,
  size = "size-4",
}: {
  rating: number;
  className?: string;
  /** A size-* token utility. */
  size?: string;
}) {
  const { m } = getI18n();
  const percent = Math.max(0, Math.min(100, (rating / 5) * 100));
  const row = (filled: boolean) =>
    Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.75}
        className={cn(size, "shrink-0")}
      >
        <use href={`#${STAR_SYMBOL}`} />
      </svg>
    ));
  return (
    <span
      role="img"
      aria-label={fmt(m.reviews.rated, { rating })}
      className={cn("relative inline-flex text-accent", className)}
    >
      <span className="inline-flex text-line-strong">{row(false)}</span>
      <span
        className="absolute inset-y-0 left-0 inline-flex overflow-hidden"
        style={{ width: `${percent}%` }}
      >
        {row(true)}
      </span>
    </span>
  );
}
