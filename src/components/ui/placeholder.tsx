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
        "rounded-md border border-dashed p-5 text-sm",
        tone === "dark"
          ? "border-on-primary-muted bg-primary text-on-primary-muted"
          : "border-control bg-surface-subtle text-muted",
        className,
      )}
    >
      <p
        className={cn(
          "inline-block rounded-xs px-2 py-0.5 font-display text-micro tracking-label uppercase",
          tone === "dark" ? "bg-surface text-heading" : "bg-surface-tint text-heading",
        )}
      >
        Placeholder · {label}
      </p>
      {children ? <div className="mt-2 space-y-1">{children}</div> : null}
    </div>
  );
}
