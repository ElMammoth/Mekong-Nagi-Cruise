import type { ReactNode } from "react";
import { JsonLd } from "@/components/layout/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Faq } from "@/content/types";
import { getI18n } from "@/i18n/server";
import { faqPrices, plainFaqs } from "@/lib/faq";
import { faqJsonLd } from "@/lib/structured-data";
import { FaqWorkspace } from "./faq-workspace";

/**
 * An FAQ block: heading, the questions (workspace pattern, see FaqWorkspace) and the
 * FAQPage structured data. The visible answers and the JSON-LD are rendered here from the
 * same `faqs` array (getFaqs: typed, translated), so they can never drift apart.
 */
export function FaqSection({
  id,
  eyebrow,
  title,
  faqs,
  action,
}: {
  id: string;
  eyebrow: string;
  title: string;
  faqs: readonly Faq[];
  /** Shown beside the heading, e.g. a link to every question. */
  action?: ReactNode;
}) {
  const { locale, m } = getI18n();
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} />
        {action}
      </div>
      <div data-reveal className="mt-10">
        <FaqWorkspace faqs={faqs} prices={faqPrices()} listLabel={m.faqPage.listLabel} />
      </div>
      <JsonLd data={faqJsonLd(locale, plainFaqs(locale, faqs))} />
    </>
  );
}
