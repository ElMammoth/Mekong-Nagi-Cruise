#!/usr/bin/env node
/**
 * Creator name and caption of each TikTok video in src/content/tiktok.ts, from TikTok's
 * official oEmbed endpoint (https://www.tiktok.com/oembed?url=…), fetched at build time.
 *
 *   npm run tiktok
 *
 * Writes src/content/tiktok.generated.json (committed, so it doubles as the cache):
 * { [videoId]: { authorName, authorUrl, caption, fetchedAt } }. Only these public text
 * fields are kept: no thumbnail (TikTok's links expire) and nothing is downloaded.
 * On any failure (403, timeout…) the previous entry is kept; nothing is bypassed.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const OUT = join(ROOT, "src/content/tiktok.generated.json");
const source = readFileSync(join(ROOT, "src/content/tiktok.ts"), "utf8");
const urls = [
  ...source.matchAll(/url: "(https:\/\/www\.tiktok\.com\/@[^"/]+\/video\/(\d+))"/g),
].map(([, url, id]) => ({ url, id }));

const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
const next = {};
const today = new Date().toISOString().slice(0, 10);
let fetched = 0;

for (const { url, id } of urls) {
  try {
    const res = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`, {
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (typeof data.title !== "string" || typeof data.author_name !== "string") {
      throw new Error("unexpected response");
    }
    next[id] = {
      authorName: data.author_name,
      authorUrl: data.author_url,
      // Verbatim. TikTok pads some captions with trailing spaces: only those are trimmed.
      caption: data.title.trimEnd(),
      fetchedAt: today,
    };
    fetched++;
  } catch (error) {
    if (previous[id]) next[id] = previous[id];
    console.warn(`⚠ TikTok ${id}: ${error.message}${previous[id] ? " (kept the last copy)" : ""}`);
  }
}

// Keep the file stable when nothing changed, so builds don't create noise in git.
const same = (a, b) =>
  a && b && a.authorName === b.authorName && a.caption === b.caption && a.authorUrl === b.authorUrl;
for (const id of Object.keys(next)) {
  if (same(next[id], previous[id])) next[id].fetchedAt = previous[id].fetchedAt;
}
writeFileSync(OUT, `${JSON.stringify(next, null, 2)}\n`);
console.log(`TikTok captions: ${fetched}/${urls.length} fetched from oEmbed.`);
