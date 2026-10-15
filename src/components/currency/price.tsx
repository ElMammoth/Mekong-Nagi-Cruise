"use client";

import { useI18n } from "@/i18n/client";
import { fmt } from "@/i18n/format";
import { cn } from "@/lib/cn";
import { formatIsoDate } from "@/lib/departures";
import { BASE_CURRENCY, priceParts, rates } from "@/lib/currency";
import { useCurrency } from "./currency-provider";

/*
 * Prices. Authored in US dollars; shown in the visitor's currency after hydration.
 * The static HTML always holds the US dollar amount (and its baht equivalent), so search
 * engines and visitors without JavaScript get the real, chargeable price.
 */

function useParts(usd: number) {
  const { intl, m } = useI18n();
  const [currency] = useCurrency();
  const parts = priceParts(usd, currency, intl);
  const approx = (text: string) => fmt(m.currency.approx, { amount: text });
  return { parts, approx, intl, m };
}

const ratesTitle = (intl: string, template: string) =>
  rates.date ? fmt(template, { date: formatIsoDate(rates.date, intl) }) : undefined;

/** One amount: "US$140", or "about €125" when another currency is selected. */
export function Price({ usd, className }: { usd: number; className?: string }) {
  const { parts, approx, intl, m } = useParts(usd);
  return (
    <span
      className={cn("whitespace-nowrap", className)}
      title={parts.approximate ? ratesTitle(intl, m.currency.ratesTitle) : undefined}
    >
      {parts.approximate ? approx(parts.main) : parts.main}
    </span>
  );
}

/**
 * Two amounts, never the same currency twice:
 * "US$160 (about ฿5,370)" · "about ฿5,370 (US$160)" · "about €143 (US$160)".
 */
export function DualPrice({
  usd,
  className,
  mainClassName,
  secondaryClassName,
}: {
  usd: number;
  className?: string;
  mainClassName?: string;
  secondaryClassName?: string;
}) {
  const { parts, approx, intl, m } = useParts(usd);
  const title = ratesTitle(intl, m.currency.ratesTitle);
  return (
    <span className={className}>
      <span
        className={cn("whitespace-nowrap", mainClassName)}
        title={parts.approximate ? title : undefined}
      >
        {parts.approximate ? approx(parts.main) : parts.main}
      </span>
      {parts.secondary ? (
        <>
          {" "}
          <span
            className={cn("whitespace-nowrap", secondaryClassName)}
            title={parts.secondaryApproximate ? title : undefined}
          >
            ({parts.secondaryApproximate ? approx(parts.secondary) : parts.secondary})
          </span>
        </>
      ) : null}
    </span>
  );
}

/** Plain-text pair for places that can't hold markup (select options, aria labels). */
export function useDualPriceText() {
  const { intl, m } = useI18n();
  const [currency] = useCurrency();
  return (usd: number) => {
    const p = priceParts(usd, currency, intl);
    const main = p.approximate ? fmt(m.currency.approx, { amount: p.main }) : p.main;
    if (!p.secondary) return main;
    const second = p.secondaryApproximate
      ? fmt(m.currency.approx, { amount: p.secondary })
      : p.secondary;
    return `${main} (${second})`;
  };
}

/**
 * The honesty line under a block of prices. Always one short paragraph (US dollars or not),
 * so switching currency doesn't move the layout.
 */
export function CurrencyNote({ className }: { className?: string }) {
  const { intl, m } = useI18n();
  const [currency] = useCurrency();
  const converted = currency !== BASE_CURRENCY && rates.rates?.[currency];
  const date = rates.date ? formatIsoDate(rates.date, intl) : null;
  return (
    <p className={cn("text-sm text-muted", className)}>
      {converted ? fmt(m.currency.note, { currency }) : m.currency.noteUsd}{" "}
      {date ? fmt(m.currency.rates, { date }) : m.currency.noRates}
    </p>
  );
}
