"use client";

import { Accordion } from "radix-ui";
import { Plus } from "lucide-react";
import type { Faq } from "@/content/types";

export function FaqList({ faqs }: { faqs: readonly Faq[] }) {
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
            <p className="max-w-prose pb-5">{faq.answer}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
