"use client";

import { Fragment } from "react";
import { Accordion } from "radix-ui";
import { Plus } from "lucide-react";
import { DualPrice } from "@/components/currency/price";
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

export function FaqList({
  faqs,
  prices = {},
}: {
  faqs: readonly Faq[];
  /** US dollar prices referenced by `{price:…}` in the answers. */
  prices?: Record<string, number>;
}) {
  return (
    <Accordion.Root type="multiple" className="divide-y divide-line border-y border-line">
      {faqs.map((faq) => (
        <Accordion.Item key={faq.question} value={faq.question}>
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
