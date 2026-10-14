import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Clearly marked "content goes here" box, shown only while `showPlaceholders` is on.
 * Never contains invented content: just what belongs here and where to put it.
 */
export function Placeholder({
  label,
  children,
  tone = "light",
  className,
}: {
  label: string;
  children?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      data-placeholder=""
      className={cn(
        "rounded-card border-2 border-dashed p-5 text-sm",
        tone === "dark"
          ? "border-gold/60 bg-maroon text-river-mist"
          : "border-lantern/40 bg-paper text-muted",
        className,
      )}
    >
      <p
        className={cn(
          "inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase",
          tone === "dark" ? "bg-sand text-maroon" : "bg-vermilion/10 text-lantern",
        )}
      >
        Placeholder · {label}
      </p>
      {children ? <div className="mt-2 space-y-1">{children}</div> : null}
    </div>
  );
}
