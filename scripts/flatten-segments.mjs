#!/usr/bin/env node
/**
 * Runs after `next build` (npm "postbuild"). Fixes the prefetch files of the static export
 * when the site is built on Windows.
 *
 * When a link scrolls into view, the router prefetches one small file per route segment,
 * named by flattening the segment path with dots:
 *
 *   /cruises/downstream/__next.!KGVuKQ.cruises.$d$slug.__PAGE__.txt
 *
 * Next 16's export builds that name with `path.relative()` and only replaces "/" by ".",
 * so on Windows the backslashes survive and become folders:
 *
 *   out/cruises/downstream/__next.!KGVuKQ/cruises/$d$slug/__PAGE__.txt
 *
 * Every prefetch of a nested segment then 404s (console errors, lower Lighthouse score).
 * This moves each such file to the flat name the router asks for. Builds on Linux/macOS
 * (Netlify, Cloudflare Pages, CI) already have flat names, so there it does nothing.
 *
 *   node scripts/flatten-segments.mjs
 */
import { readdirSync, renameSync, rmSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = join(process.cwd(), "out");
let moved = 0;

function filesUnder(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? filesUnder(path) : [path];
  });
}

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = join(dir, entry.name);
    if (!entry.name.startsWith("__next.")) {
      walk(path);
      continue;
    }
    for (const file of filesUnder(path)) {
      const flatName = entry.name + "." + relative(path, file).split(sep).join(".");
      renameSync(file, join(dir, flatName));
      moved++;
    }
    rmSync(path, { recursive: true });
  }
}

if (!statSync(ROOT, { throwIfNoEntry: false })?.isDirectory()) {
  console.error("No ./out folder. Run `npm run build` first.");
  process.exit(1);
}
walk(ROOT);
if (moved) console.log(`Flattened ${moved} prefetch segment files in out/.`);
