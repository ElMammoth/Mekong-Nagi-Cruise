import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";

/** Green check mark for an included item; labelled, so it never relies on colour alone. */
function IncludedMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label="Included"
      focusable="false"
      className="size-6 shrink-0"
    >
      <circle cx="12" cy="12" r="12" className="fill-success" />
      <path
        d="M7 12.5l3.2 3.2L17 8.8"
        fill="none"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-on-success"
      />
    </svg>
  );
}

/**
 * The offer as a list of problems a traveller would otherwise solve alone, each matched to
 * what's included (docs/04-offer-brief.md §3). Names the task, never a competitor.
 *
 * Two fixed columns (`grid-cols-compare`) shared by the header and every row, equal row
 * heights (`auto-rows-fr`) and the same cell padding throughout. Below `sm` each row
 * stacks: the task as a muted line, then the included item with its check mark.
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
      <div className="overflow-hidden rounded-md border border-line bg-surface shadow-sm">
        <div
          aria-hidden="true"
          className="hidden grid-cols-compare border-b border-line font-display text-eyebrow uppercase sm:grid"
        >
          <span className="px-6 py-3 text-muted">On your own, you’d sort out…</span>
          <span className="border-l border-line px-6 py-3 text-heading">With us</span>
        </div>
        <ul className="divide-y divide-line sm:grid sm:auto-rows-fr">
          {site.handledForYou.map((item) => (
            <li
              key={item.task}
              className="grid gap-2 px-5 py-4 sm:grid-cols-compare sm:gap-0 sm:p-0"
            >
              <p className="flex items-center text-sm text-muted sm:px-6 sm:py-4 sm:text-base">
                <span>
                  <span className="sr-only">On your own: </span>
                  {item.task}
                </span>
              </p>
              <p className="flex items-center gap-3 text-heading sm:border-l sm:border-line sm:px-6 sm:py-4">
                <IncludedMark />
                <span>{item.handled}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
