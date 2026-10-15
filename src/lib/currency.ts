import ratesFile from "@/data/rates.json";

/**
 * Currencies offered in the selector. Prices are authored and charged in US dollars;
 * everything else is an approximate conversion with the daily ECB rates fetched at build
 * time (scripts/fetch-rates.mjs → src/data/rates.json).
 * USD: base · EUR, GBP, CHF: European visitors · AUD, NZD, CAD: large backpacker markets ·
 * THB: the departure country · CNY: Chinese visitors.
 */
export const currencies = ["USD", "EUR", "GBP", "AUD", "NZD", "CAD", "CHF", "THB", "CNY"] as const;
export type CurrencyCode = (typeof currencies)[number];
export const BASE_CURRENCY: CurrencyCode = "USD";
/** The second currency shown next to US dollar prices: "US$160 (about ฿5,370)". */
export const SECONDARY_CURRENCY: CurrencyCode = "THB";
/** localStorage key that remembers the visitor's currency (kept across pages and languages). */
export const CURRENCY_STORAGE_KEY = "nagi.currency";

export interface Rates {
  base: "USD";
  /** ISO date of the ECB reference rates, or null when none could ever be fetched. */
  date: string | null;
  rates: Partial<Record<CurrencyCode, number>> | null;
}

export const rates = ratesFile as Rates;

export function isCurrency(value: unknown): value is CurrencyCode {
  return typeof value === "string" && (currencies as readonly string[]).includes(value);
}

/** Currencies that can actually be shown (USD always; others only with a rate). */
export function availableCurrencies(r: Rates = rates): CurrencyCode[] {
  return currencies.filter((c) => c === BASE_CURRENCY || typeof r.rates?.[c] === "number");
}

/** Currencies whose amounts are rounded to tens when converted (large units). */
const ROUND_TO_TEN: ReadonlySet<string> = new Set(["THB", "JPY"]);

/**
 * Converts a US dollar amount. Returns null when there's no rate (callers fall back to USD).
 * Conversions are rounded to whole units, and to tens for baht and yen: they are guidance,
 * not quotes.
 */
export function convert(usd: number, to: CurrencyCode, r: Rates = rates): number | null {
  if (to === BASE_CURRENCY) return usd;
  const rate = r.rates?.[to];
  if (typeof rate !== "number") return null;
  const raw = usd * rate;
  return ROUND_TO_TEN.has(to) ? Math.round(raw / 10) * 10 : Math.round(raw);
}

const cache = new Map<string, Intl.NumberFormat>();

/** "US$160" (en-GB), "160 $US" (fr), "฿5,370"… in the page's locale, no decimals. */
export function formatCurrency(amount: number, code: CurrencyCode, intlLocale: string): string {
  const key = `${intlLocale}|${code}`;
  let formatter = cache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(intlLocale, {
      style: "currency",
      currency: code,
      // "฿" rather than "THB"; every other currency keeps its unambiguous symbol (US$, A$…).
      currencyDisplay: code === "THB" ? "narrowSymbol" : "symbol",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    cache.set(key, formatter);
  }
  // Some locales write US dollars as a bare "$" (e.g. German): always say whose dollar.
  return formatter
    .formatToParts(amount)
    .map((p) => (p.type === "currency" && code === "USD" && p.value === "$" ? "US$" : p.value))
    .join("");
}

/** The symbol of a currency as written in a locale, e.g. "US$", "€", "฿". */
export function currencySymbol(code: CurrencyCode, intlLocale: string): string {
  const parts = new Intl.NumberFormat(intlLocale, {
    style: "currency",
    currency: code,
    currencyDisplay: code === "THB" ? "narrowSymbol" : "symbol",
  }).formatToParts(0);
  const symbol = parts.find((p) => p.type === "currency")?.value ?? code;
  return code === "USD" && symbol === "$" ? "US$" : symbol;
}

/** "US dollar", "euro"… in the page's language. */
export function currencyName(code: CurrencyCode, intlLocale: string): string {
  try {
    return new Intl.DisplayNames([intlLocale], { type: "currency" }).of(code) ?? code;
  } catch {
    return code;
  }
}

export interface PriceParts {
  /** The amount shown first (in the selected currency when possible). */
  main: string;
  /** True when `main` is a conversion (labelled "about…"). */
  approximate: boolean;
  /** The companion amount: baht next to dollars, dollars next to anything else. */
  secondary?: string;
  secondaryApproximate: boolean;
  /** The currency actually used for `main` (USD when the selected one has no rate). */
  shown: CurrencyCode;
}

/**
 * The pair shown for a price. Never shows the same currency twice:
 *  - USD selected:  US$160  (about ฿5,370)
 *  - THB selected:  about ฿5,370  (US$160)
 *  - EUR selected:  about €143  (US$160)
 */
export function priceParts(
  usd: number,
  selected: CurrencyCode,
  intlLocale: string,
  r: Rates = rates,
): PriceParts {
  const converted = convert(usd, selected, r);
  const shown = converted === null ? BASE_CURRENCY : selected;
  const usdText = formatCurrency(usd, BASE_CURRENCY, intlLocale);
  if (shown === BASE_CURRENCY) {
    const thb = convert(usd, SECONDARY_CURRENCY, r);
    return {
      main: usdText,
      approximate: false,
      secondary: thb === null ? undefined : formatCurrency(thb, SECONDARY_CURRENCY, intlLocale),
      secondaryApproximate: true,
      shown,
    };
  }
  return {
    main: formatCurrency(converted!, shown, intlLocale),
    approximate: true,
    secondary: usdText,
    secondaryApproximate: false,
    shown,
  };
}

/** Lowest per-person US dollar price across options ("From US$…"). */
export function fromPriceUsd(options: readonly { usd: number }[]): number | undefined {
  return options.length ? Math.min(...options.map((o) => o.usd)) : undefined;
}

/**
 * Indicative total in US dollars: per-person price × travellers, plus the single
 * supplement when one person travels alone and the option has one.
 */
export function estimateTotalUsd(
  option: { usd: number; singleSupplementUsd?: number },
  travellers: number,
): number | undefined {
  if (travellers < 1) return undefined;
  const supplement = travellers === 1 ? (option.singleSupplementUsd ?? 0) : 0;
  return option.usd * travellers + supplement;
}
