"use client";

import { Accordion } from "radix-ui";
import { Plus } from "lucide-react";
import type { Faq } from "@/content/types";

export function FaqList({ faqs }: { faqs: readonly Faq[] }) {
  return (
    <Accordion.Root type="multiple" className="divide-y divide-silt border-y border-silt">
      {faqs.map((faq) => (
        <Accordion.Item key={faq.question} value={faq.question}>
          <Accordion.Header asChild>
            <h3 className="font-sans">
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-semibold text-maroon hover:text-lantern">
                {faq.question}
                <Plus
                  aria-hidden="true"
                  className="size-5 shrink-0 text-lantern transition-transform duration-300 group-data-[state=open]:rotate-45"
                />
              </Accordion.Trigger>
            </h3>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden text-muted data-[state=closed]:animate-[collapse_0.25s_ease] data-[state=open]:animate-[expand_0.3s_ease]">
            <p className="max-w-prose pb-5">{faq.answer}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
