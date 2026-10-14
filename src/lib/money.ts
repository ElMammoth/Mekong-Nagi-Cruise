import type { Currency, Money, PriceOption } from "@/content/types";

const ORDER: Currency[] = ["USD", "EUR", "THB"];

const formatters: Record<Currency, Intl.NumberFormat> = {
  USD: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }),
  EUR: new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }),
  THB: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "THB",
    currencyDisplay: "code",
    maximumFractionDigits: 0,
  }),
};

/** "US$160" style: unambiguous for an international audience. */
export function formatAmount(amount: number, currency: Currency): string {
  const formatted = formatters[currency].format(amount);
  return currency === "USD" ? formatted.replace("$", "US$") : formatted.replace(/ /g, " ");
}

/** Currencies present in a price, in display order. */
export function currencies(money: Money): Currency[] {
  return ORDER.filter((c) => typeof money[c] === "number");
}

/** "US$160 · €150" */
export function formatMoney(money: Money, separator = " · "): string {
  return currencies(money)
    .map((c) => formatAmount(money[c] as number, c))
    .join(separator);
}

/** Lowest US-dollar per-person price across options, used for "From US$…" labels. */
export function fromPriceUSD(options: readonly PriceOption[]): number | undefined {
  const prices = options
    .map((o) => o.perPerson.USD)
    .filter((n): n is number => typeof n === "number");
  return prices.length ? Math.min(...prices) : undefined;
}

/**
 * Indicative total for a request. Per-person price × travellers, plus the single
 * supplement when one person travels alone and the option has one.
 */
export function estimateTotal(
  option: PriceOption,
  travellers: number,
  currency: Currency = "USD",
): number | undefined {
  const base = option.perPerson[currency];
  if (typeof base !== "number" || travellers < 1) return undefined;
  const supplement = travellers === 1 ? (option.singleSupplement?.[currency] ?? 0) : 0;
  return base * travellers + supplement;
}
