import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";

/**
 * The offer as a list of problems a traveller would otherwise solve alone, each matched to
 * what's included (docs/04-offer-brief.md §3). Names the task, never a competitor.
 */
export function HandledForYou({
  id = "handled-title",
  title = "Everything between your hotel and Luang Prabang, handled",
  intro = "Travelling the river on your own means sorting out each of these yourself. On the Nagi of Mekong they’re part of the trip.",
  action,
}: {
  id?: string;
  title?: string;
  intro?: string;
  action?: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="grid gap-10 lg:grid-cols-intro lg:gap-16">
      <div>
        <SectionHeading id={id} eyebrow="Door to door" title={title} intro={intro} />
        {action ? <div className="mt-8">{action}</div> : null}
      </div>
      <div className="rounded-md border border-line bg-surface shadow-sm">
        <div
          aria-hidden="true"
          className="hidden grid-cols-compare gap-6 border-b border-line px-6 py-3 font-display text-eyebrow text-muted uppercase sm:grid"
        >
          <span>On your own, you’d sort out…</span>
          <span>With us</span>
        </div>
        <ul className="divide-y divide-line">
          {site.handledForYou.map((item) => (
            <li
              key={item.task}
              className="grid gap-1 px-6 py-4 sm:grid-cols-compare sm:items-center sm:gap-6"
            >
              <span className="flex items-center gap-2 text-muted">
                <span className="sr-only">On your own: </span>
                {item.task}
                <ArrowRight
                  aria-hidden="true"
                  className="hidden size-4 shrink-0 sm:ml-auto sm:block"
                />
              </span>
              <span className="flex gap-2.5 text-heading">
                <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                <span>
                  <span className="sr-only">Included: </span>
                  {item.handled}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
