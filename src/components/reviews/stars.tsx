import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

/** Star rating with partial fill. The label carries the meaning for screen readers. */
export function Stars({
  rating,
  className,
  size = "size-4",
}: {
  rating: number;
  className?: string;
  size?: string;
}) {
  const percent = Math.max(0, Math.min(100, (rating / 5) * 100));
  const row = (filled: boolean) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        aria-hidden="true"
        className={cn(size, "shrink-0")}
        fill={filled ? "currentColor" : "none"}
        strokeWidth={1.75}
      />
    ));
  return (
    <span
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className={cn("relative inline-flex text-lantern", className)}
    >
      <span className="inline-flex opacity-35">{row(false)}</span>
      <span
        className="absolute inset-y-0 left-0 inline-flex overflow-hidden"
        style={{ width: `${percent}%` }}
      >
        {row(true)}
      </span>
    </span>
  );
}
