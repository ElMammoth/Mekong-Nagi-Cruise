#!/usr/bin/env node
/**
 * Currency conversion check (run after `npm run build`):
 *  1. the cached rates in src/data/rates.json equal Frankfurter's published ECB rates for
 *     that same date (re-fetched now);
 *  2. every "(about ฿…)" amount in the built HTML equals US dollars × the THB rate, rounded
 *     to the nearest 10 baht, as src/lib/currency.ts promises.
 *
 *   npm run test:rates
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const stored = JSON.parse(readFileSync("src/data/rates.json", "utf8"));
let failures = 0;
const fail = (msg) => {
  failures++;
  console.log(`✗ ${msg}`);
};

if (!stored.rates) {
  console.log("No cached rates: the site shows US dollars only. Nothing to check.");
  process.exit(0);
}

const codes = Object.keys(stored.rates);
try {
  const res = await fetch(
    `https://api.frankfurter.dev/v1/${stored.date}?base=USD&symbols=${codes.join(",")}`,
    { signal: AbortSignal.timeout(10_000) },
  );
  const source = await res.json();
  for (const code of codes) {
    if (source.rates[code] !== stored.rates[code]) {
      fail(`${code}: cached ${stored.rates[code]} ≠ source ${source.rates[code]} (${source.date})`);
    }
  }
  if (!failures)
    console.log(`✓ ${codes.length} cached rates match Frankfurter/ECB for ${stored.date}.`);
} catch (error) {
  console.log(`⚠ Could not reach Frankfurter (${error.message}); skipping the source comparison.`);
}

const thb = stored.rates.THB;
const expected = (usd) => Math.round((usd * thb) / 10) * 10;
let checked = 0;
function* html(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) yield* html(p);
    else if (e === "index.html") yield p;
  }
}
for (const file of html("out")) {
  const text = readFileSync(file, "utf8")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;| | /g, " ");
  // "US$160 (about ฿5,370)" in en/zh/th, "160 $US (env. 5 370 ฿)" in fr, etc.
  for (const m of text.matchAll(
    /(?:US\$\s?([\d.,  ]+)|([\d.,  ]+)\s?(?:US\$|\$US))\s*\(\D{0,12}?(?:฿\s?([\d.,  ]+)|([\d.,  ]+)\s?฿)\)/g,
  )) {
    const num = (s) => Number(String(s).replace(/[^\d]/g, ""));
    const usd = num(m[1] ?? m[2]);
    const baht = num(m[3] ?? m[4]);
    checked++;
    if (baht !== expected(usd)) fail(`${file}: US$${usd} → ฿${baht}, expected ฿${expected(usd)}`);
  }
}
console.log(
  checked
    ? `✓ ${checked} USD → THB pairs in the HTML use ${thb} THB/USD (rates of ${stored.date}).`
    : "✗ No USD → THB pairs found in out/.",
);
if (!checked) failures++;
process.exit(failures ? 1 : 0);
