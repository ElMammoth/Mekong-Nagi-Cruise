import { CalendarCheck, MessageCircle, Sailboat } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * What happens after "send": removes the uncertainty of a request-based booking
 * (docs/04-offer-brief.md §2, time delay). Pattern: numbered steps (Mora, Samara on Mobbin).
 */
export function NextSteps({
  dayOne = "Hotel pick-up on departure morning",
  tone = "light",
  className,
}: {
  /** What happens on day one of this trip. */
  dayOne?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const steps = [
    {
      icon: MessageCircle,
      title: "You send your request",
      text: "A pre-filled WhatsApp or email message. It’s free and doesn’t commit you.",
    },
    {
      icon: CalendarCheck,
      title: "We confirm within 24 hours",
      text: "Availability on your date and the final price.",
    },
    { icon: Sailboat, title: "You travel", text: dayOne },
  ];
  return (
    <ol className={cn("grid gap-6 sm:grid-cols-3", className)}>
      {steps.map(({ icon: Icon, title, text }, i) => (
        <li key={title} className="flex gap-3">
          <span
            aria-hidden="true"
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-full",
              tone === "dark" ? "bg-sand/10 text-gold" : "bg-vermilion/10 text-lantern",
            )}
          >
            <Icon className="size-5" />
          </span>
          <div>
            <p className={cn("font-semibold", tone === "dark" ? "text-sand" : "text-ink")}>
              <span className="sr-only">Step {i + 1}: </span>
              {title}
            </p>
            <p className={cn("text-sm", tone === "dark" ? "text-river-mist" : "text-muted")}>
              {text}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
