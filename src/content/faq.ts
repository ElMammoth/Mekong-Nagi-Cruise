/**
 * Stable, language-independent ids for the FAQ, in the same order as `faq` in every
 * translation file. They become deep links (`/faq/#faq-lao-visa`) and never change when a
 * question is reworded or translated. `npm test` fails if the counts drift apart.
 * To add a question: add its id here and the question + answer to every language file.
 */
export const faqIds = [
  "how-to-book",
  "departure-days",
  "pick-up",
  "lao-visa",
  "food-on-board",
  "cruise-only",
  "cold-season",
  "group-charter",
] as const;

export type FaqId = (typeof faqIds)[number];

/** The element id used for a question's deep link. */
export const faqAnchor = (id: string) => `faq-${id}`;
