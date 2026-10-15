#!/usr/bin/env node
/**
 * hreflang reciprocity check on the static export (run after `npm run build`).
 *
 *   npm run test:i18n
 *
 * For every page in out/: a self-referencing canonical, an hreflang link for every language
 * plus x-default, every alternate exists and links back to this page with the same set,
 * <html lang> matches the page's own hreflang, and sitemap.xml lists the same alternates.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "out");
const SITE = "https://nagiofmekong.com";
if (!existsSync(OUT)) {
  console.error("No ./out folder. Run `npm run build` first.");
  process.exit(1);
}

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      if (entry === "_next") continue;
      yield* htmlFiles(path);
    } else if (entry === "index.html") yield path;
  }
}

const decode = (s) => s.replace(/&amp;/g, "&");
const pages = new Map(); // url → { lang, canonical, alternates: Map(hreflang → url), robots }
for (const file of htmlFiles(OUT)) {
  const html = readFileSync(file, "utf8");
  const url = `${SITE}${file.slice(OUT.length).replace(/index\.html$/, "")}`.replace(/\\/g, "/");
  const lang = html.match(/<html[^>]*\blang="([^"]+)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const alternates = new Map(
    [...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)].map((m) => [
      m[1],
      decode(m[2]),
    ]),
  );
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  pages.set(url, { lang, canonical, alternates, noindex });
}

const problems = [];
const indexable = [...pages].filter(([, p]) => !p.noindex);
const expected = new Set(indexable[0]?.[1].alternates.keys() ?? []);
if (!expected.has("x-default")) problems.push("no x-default on the first page");

for (const [url, page] of indexable) {
  if (page.canonical !== url) problems.push(`${url}: canonical is ${page.canonical}`);
  const keys = [...page.alternates.keys()];
  if (keys.length !== expected.size || keys.some((k) => !expected.has(k))) {
    problems.push(`${url}: hreflang set ${keys} ≠ ${[...expected]}`);
  }
  if (page.alternates.get(page.lang) !== url) {
    problems.push(`${url}: <html lang="${page.lang}"> has no self hreflang`);
  }
  for (const [hreflang, target] of page.alternates) {
    const other = pages.get(target);
    if (!other) {
      problems.push(`${url}: ${hreflang} → ${target} does not exist`);
      continue;
    }
    for (const [k, v] of page.alternates) {
      if (other.alternates.get(k) !== v) {
        problems.push(`${url}: not reciprocal with ${target} for ${k}`);
        break;
      }
    }
  }
}

// Sitemap: every indexable page, with the same alternates as its <head>.
const sitemap = readFileSync(join(OUT, "sitemap.xml"), "utf8");
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
  loc: m[1].match(/<loc>([^<]+)<\/loc>/)[1],
  alternates: new Map(
    [...m[1].matchAll(/hreflang="([^"]+)"\s+href="([^"]+)"/g)].map((x) => [x[1], decode(x[2])]),
  ),
}));
const inSitemap = new Set(entries.map((e) => e.loc));
for (const [url] of indexable) {
  if (!inSitemap.has(url)) problems.push(`sitemap: missing ${url}`);
}
for (const entry of entries) {
  const page = pages.get(entry.loc);
  if (!page) {
    problems.push(`sitemap: ${entry.loc} has no page`);
    continue;
  }
  for (const [k, v] of page.alternates) {
    if (entry.alternates.get(k) !== v) problems.push(`sitemap: ${entry.loc} ${k} differs`);
  }
}

console.log(
  `${indexable.length} pages × ${expected.size} hreflang links (incl. x-default), ${entries.length} sitemap entries.`,
);
if (problems.length) {
  for (const p of problems.slice(0, 40)) console.log(`✗ ${p}`);
  console.log(`\n${problems.length} problem(s).`);
  process.exit(1);
}
console.log("✓ Every hreflang annotation is reciprocal, canonical and in the sitemap.");
