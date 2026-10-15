import { CalendarCheck, MessageCircle, Sailboat } from "lucide-react";
import { fmt } from "@/i18n/index";
import { getI18n } from "@/i18n/server";
import { cn } from "@/lib/cn";

/**
 * What happens after "send": removes the uncertainty of a request-based booking
 * (docs/04-offer-brief.md §2, time delay). Pattern: numbered steps (Mora, Samara on Mobbin).
 */
export function NextSteps({
  dayOne,
  tone = "light",
  className,
}: {
  /** What happens on day one of this trip. */
  dayOne?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const { m } = getI18n();
  const copy = m.nextSteps;
  const steps = [
    { icon: MessageCircle, title: copy.send.title, text: copy.send.text },
    { icon: CalendarCheck, title: copy.confirm.title, text: copy.confirm.text },
    { icon: Sailboat, title: copy.travel.title, text: dayOne ?? copy.defaultDayOne },
  ];
  return (
    <ol className={cn("grid gap-6 sm:grid-cols-3", className)}>
      {steps.map(({ icon: Icon, title, text }, i) => (
        <li key={title} className="flex gap-3">
          <span
            aria-hidden="true"
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-sm",
              tone === "dark" ? "bg-primary-hover text-on-primary" : "bg-surface-tint text-primary",
            )}
          >
            <Icon className="size-5" />
          </span>
          <div>
            <p
              className={cn(
                "font-display text-sm",
                tone === "dark" ? "text-on-primary" : "text-heading",
              )}
            >
              <span className="sr-only">{fmt(copy.stepSr, { n: i + 1 })} </span>
              {title}
            </p>
            <p className={cn("text-sm", tone === "dark" ? "text-on-primary-muted" : "text-muted")}>
              {text}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
