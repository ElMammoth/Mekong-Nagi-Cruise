#!/usr/bin/env node
/**
 * Daily exchange rates for the currency selector, fetched at build time (never by
 * visitors' browsers): Frankfurter (https://frankfurter.dev), which republishes the
 * European Central Bank reference rates every working day, THB included.
 *
 *   npm run rates
 *
 * Writes src/data/rates.json (committed, so it doubles as the cache). If the source is down
 * or returns something unexpected, the last successful file is kept, with its own date,
 * and the build carries on. With no rates at all the site simply shows US dollars.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FILE = join(process.cwd(), "src/data/rates.json");
// Keep in sync with `currencies` in src/lib/currency.ts (USD is the base).
const SYMBOLS = ["EUR", "GBP", "AUD", "NZD", "CAD", "CHF", "THB", "CNY"];
const URL_ = `https://api.frankfurter.dev/v1/latest?base=USD&symbols=${SYMBOLS.join(",")}`;

function previous() {
  try {
    return existsSync(FILE) ? JSON.parse(readFileSync(FILE, "utf8")) : null;
  } catch {
    return null;
  }
}

async function fetchRates() {
  const res = await fetch(URL_, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.base !== "USD" || !/^\d{4}-\d{2}-\d{2}$/.test(data.date ?? "")) {
    throw new Error("unexpected response");
  }
  for (const code of SYMBOLS) {
    const rate = data.rates?.[code];
    if (typeof rate !== "number" || !(rate > 0)) throw new Error(`missing rate for ${code}`);
  }
  return data;
}

try {
  const data = await fetchRates();
  const rates = Object.fromEntries(SYMBOLS.map((code) => [code, data.rates[code]]));
  const old = previous();
  if (old?.date === data.date && JSON.stringify(old.rates) === JSON.stringify(rates)) {
    console.log(`Exchange rates unchanged (${data.date}).`);
  } else {
    const out = {
      base: "USD",
      date: data.date,
      source: "European Central Bank reference rates via Frankfurter",
      sourceUrl: "https://frankfurter.dev",
      rates,
    };
    writeFileSync(FILE, `${JSON.stringify(out, null, 2)}\n`);
    console.log(`Exchange rates updated: ${data.date}.`);
  }
} catch (error) {
  const old = previous();
  if (old?.rates) {
    console.warn(
      `⚠ Exchange rates not refreshed (${error.message}); keeping rates of ${old.date}.`,
    );
  } else {
    writeFileSync(FILE, `${JSON.stringify({ base: "USD", date: null, rates: null }, null, 2)}\n`);
    console.warn(`⚠ No exchange rates (${error.message}); the site will show US dollars only.`);
  }
}
