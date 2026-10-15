"use client";

import { Fragment, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Accordion, Tabs } from "radix-ui";
import { Plus } from "lucide-react";
import { DualPrice } from "@/components/currency/price";
import { faqAnchor } from "@/content/faq";
import type { Faq } from "@/content/types";

/** Renders an answer, replacing `{price:option-id}` with the live price of that option. */
function Answer({ text, prices }: { text: string; prices: Record<string, number> }) {
  const parts = text.split(/(\{price:[\w-]+\})/g);
  return (
    <>
      {parts.map((part, i) => {
        const id = /^\{price:([\w-]+)\}$/.exec(part)?.[1];
        const usd = id ? prices[id] : undefined;
        return <Fragment key={i}>{usd !== undefined ? <DualPrice usd={usd} /> : part}</Fragment>;
      })}
    </>
  );
}

/* `lg` breakpoint. On the server and during hydration this is false, so the static HTML is
   always the accordion (every answer in it); wide screens switch after hydration. */
const WIDE = "(min-width: 64rem)";
function useWide(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const query = window.matchMedia(WIDE);
      query.addEventListener("change", callback);
      return () => query.removeEventListener("change", callback);
    },
    () => window.matchMedia(WIDE).matches,
    () => false,
  );
}

const noopSubscribe = () => () => {};

/** The FAQ id in the URL hash (`#faq-<id>`), if it names one of these questions. */
function idFromHash(faqs: readonly Faq[]): string | undefined {
  const hash = decodeURIComponent(window.location.hash.slice(1));
  return faqs.find((faq) => faqAnchor(faq.id) === hash)?.id;
}

/** Points the URL at a question without scrolling or adding history entries. */
function writeHash(id: string) {
  const url = new URL(window.location.href);
  url.hash = faqAnchor(id);
  window.history.replaceState(window.history.state, "", url);
}

/**
 * The FAQ, after the "workspace" pattern of the Sparkdesign template (docs/08):
 * - wide screens: the questions as a vertical list on the left (Radix Tabs: one Tab stop,
 *   ↑/↓/Home/End move between questions, roving focus) and the chosen answer in a panel;
 * - small screens, and the static HTML: an accordion (Radix Accordion).
 * Every answer is always in the DOM (closed ones `hidden`). `#faq-<id>` opens a question.
 */
export function FaqWorkspace({
  faqs,
  prices = {},
  listLabel,
}: {
  faqs: readonly Faq[];
  /** US dollar prices referenced by `{price:…}` in the answers. */
  prices?: Record<string, number>;
  /** Accessible name of the question list (wide layout). */
  listLabel: string;
}) {
  const wide = useWide();
  // The question named in the URL (#faq-<id>) is open by default. Unknown on the server.
  const linked = useSyncExternalStore(
    noopSubscribe,
    () => idFromHash(faqs) ?? null,
    () => null,
  );
  const [picked, setPicked] = useState<string | null>(null);
  const [openState, setOpenState] = useState<string[] | null>(null);
  const selected = picked ?? linked ?? faqs[0]?.id ?? "";
  const open = openState ?? (linked ? [linked] : []);

  // Later hash changes (a link to a question on the same page) open that question too.
  const scrollTo = useRef<string | null>(null);
  useEffect(() => {
    const onHash = () => {
      const id = idFromHash(faqs);
      if (!id) return;
      scrollTo.current = id;
      setPicked(id);
      setOpenState((list) => {
        const base = list ?? [];
        return base.includes(id) ? base : [...base, id];
      });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [faqs]);

  // Bring a linked question into view once its layout is in place. (On small screens the
  // browser already scrolled to it in the static accordion; the wide list replaces it.)
  const scrolledToLinked = useRef(false);
  useEffect(() => {
    let id = scrollTo.current;
    scrollTo.current = null;
    if (!id && linked && wide && !scrolledToLinked.current) id = linked;
    if (!id) return;
    scrolledToLinked.current = true;
    const item = document.getElementById(faqAnchor(id));
    // Wide: show the whole list with the chosen question; small: the question itself.
    const target = wide ? (item?.closest("[data-faq-root]") ?? item) : item;
    target?.scrollIntoView({ block: "start" });
  }, [wide, linked, selected, openState]);

  if (wide) {
    return (
      <Tabs.Root
        value={selected}
        onValueChange={(id) => {
          setPicked(id);
          writeHash(id);
        }}
        orientation="vertical"
        data-faq-root=""
        className="grid grid-cols-faq items-start gap-10"
      >
        <Tabs.List aria-label={listLabel} className="border-l border-line">
          {faqs.map((faq) => (
            <div key={faq.id} id={faqAnchor(faq.id)}>
              <Tabs.Trigger
                value={faq.id}
                className="-ml-px block w-full border-l-2 border-transparent py-3.5 pr-4 pl-5 text-left font-display text-base text-muted transition-colors duration-fast hover:text-heading data-[state=active]:border-accent data-[state=active]:bg-surface-tint data-[state=active]:text-heading"
              >
                {faq.question}
              </Tabs.Trigger>
            </div>
          ))}
        </Tabs.List>
        {faqs.map((faq) => (
          <Tabs.Content
            key={faq.id}
            value={faq.id}
            forceMount
            className="sticky top-24 rounded-md border border-line bg-surface p-8 shadow-sm data-[state=active]:animate-rise data-[state=inactive]:hidden"
          >
            <h3 className="text-h3">{faq.question}</h3>
            <p className="mt-4 max-w-prose text-ink">
              <Answer text={faq.answer} prices={prices} />
            </p>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    );
  }

  return (
    <Accordion.Root
      type="multiple"
      value={open}
      onValueChange={(next) => {
        const added = next.find((id) => !open.includes(id));
        setOpenState(next);
        if (added) {
          setPicked(added);
          writeHash(added);
        }
      }}
      className="divide-y divide-line border-y border-line"
    >
      {faqs.map((faq) => (
        <Accordion.Item key={faq.id} value={faq.id} id={faqAnchor(faq.id)}>
          <Accordion.Header asChild>
            <h3 className="font-sans">
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 rounded-sm py-5 text-left font-display text-base text-heading hover:text-primary-hover">
                {faq.question}
                <Plus
                  aria-hidden="true"
                  className="size-5 shrink-0 text-primary transition-transform duration-base group-data-[state=open]:rotate-45"
                />
              </Accordion.Trigger>
            </h3>
          </Accordion.Header>
          {/* forceMount keeps answers in the static HTML (indexable, find-in-page); closed ones are `hidden`. */}
          <Accordion.Content
            forceMount
            className="overflow-hidden text-muted data-[state=closed]:hidden data-[state=open]:animate-expand"
          >
            <p className="max-w-prose pb-5">
              <Answer text={faq.answer} prices={prices} />
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
