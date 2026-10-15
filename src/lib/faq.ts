import { getFaqs } from "@/content/localized";
import { getTripData } from "@/content/trips";
import type { Faq } from "@/content/types";
import { localeInfo, type Locale } from "@/i18n/config";
import { fmt, getMessages } from "@/i18n/index";
import { priceParts } from "./currency";
import { availableOptions } from "./departures";

/** `{price:option-id}` in an FAQ answer refers to a downstream price option. */
export const FAQ_PRICE = /\{price:([\w-]+)\}/g;

/** US dollar price of every bookable downstream option, by id (for FAQ answers). */
export function faqPrices(): Record<string, number> {
  return Object.fromEntries(
    availableOptions(getTripData("downstream")?.options ?? []).map((o) => [o.id, o.usd]),
  );
}

/** FAQs as plain text, prices written out in US dollars with the baht equivalent (JSON-LD). */
export function plainFaqs(locale: Locale, faqs: readonly Faq[] = getFaqs(locale)): Faq[] {
  const prices = faqPrices();
  const { intl } = localeInfo[locale];
  const approx = getMessages(locale).currency.approx;
  return faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer.replace(FAQ_PRICE, (match, id: string) => {
      const usd = prices[id];
      if (usd === undefined) return match;
      const p = priceParts(usd, "USD", intl);
      return p.secondary ? `${p.main} (${fmt(approx, { amount: p.secondary })})` : p.main;
    }),
  }));
}
