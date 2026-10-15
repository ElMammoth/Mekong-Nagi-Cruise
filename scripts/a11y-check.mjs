#!/usr/bin/env node
/**
 * Accessibility + responsive check for the static export.
 *
 *   npm run build && npm run test:a11y            # axe-core (WCAG 2.x A/AA) on every page, every language
 *   ONLY=/fr/ npm run test:a11y                   # only paths starting with /fr/
 *   SCREENSHOTS=1 npm run test:a11y               # also save full-page screenshots to ./screenshots
 *
 * Uses playwright-core. Point CHROMIUM_PATH at a Chromium/Chrome binary if it is not found.
 */
import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";
import { AxeBuilder } from "@axe-core/playwright";

const ROOT = join(process.cwd(), "out");
if (!existsSync(ROOT)) {
  console.error("No ./out folder. Run `npm run build` first.");
  process.exit(1);
}
/** Every exported page (index.html), in every language. */
function routes(dir = ROOT) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (entry === "_next" || entry === "_not-found") return [];
    if (statSync(path).isDirectory()) return routes(path);
    return entry === "index.html" ? [dir.slice(ROOT.length).replace(/\\/g, "/") + "/"] : [];
  });
}
const ROUTES = routes()
  .filter((r) => r.startsWith(process.env.ONLY ?? "/"))
  .sort();
const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
];
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

const server = createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
  let file = normalize(join(ROOT, url));
  if (!file.startsWith(ROOT)) return res.writeHead(403).end();
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) file = join(ROOT, "404.html");
  res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((resolve) => server.listen(0, resolve));
const base = `http://127.0.0.1:${server.address().port}`;

const executablePath =
  process.env.CHROMIUM_PATH ??
  ["/opt/pw-browsers/chromium-1194/chrome-linux/chrome", "/opt/pw-browsers/chromium"].find((p) =>
    existsSync(p),
  );
const browser = await chromium.launch({ executablePath });
const screenshots = Boolean(process.env.SCREENSHOTS);
if (screenshots) mkdirSync("screenshots", { recursive: true });

let failures = 0;
for (const viewport of VIEWPORTS) {
  const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
  for (const route of ROUTES) {
    const page = await context.newPage();
    await page.goto(base + route, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    const label = `${viewport.name.padEnd(7)} ${route}`;
    if (violations.length || overflow > 0) {
      failures += violations.length + (overflow > 0 ? 1 : 0);
      console.log(`✗ ${label}`);
      if (overflow > 0) console.log(`    horizontal overflow: ${overflow}px`);
      for (const v of violations) {
        console.log(`    [${v.impact}] ${v.id}: ${v.help}`);
        for (const node of v.nodes.slice(0, 3)) console.log(`      ${node.target.join(" ")}`);
      }
    } else {
      console.log(`✓ ${label}`);
    }
    if (screenshots) {
      const name = `${viewport.name}${route.replace(/\//g, "_") || "_"}.png`.replace(
        "_.png",
        ".png",
      );
      await page.screenshot({ path: join("screenshots", name), fullPage: true });
    }
    await page.close();
  }
  await context.close();
}

await browser.close();
server.close();
console.log(failures ? `\n${failures} issue(s) found.` : "\nNo accessibility violations found.");
process.exit(failures ? 1 : 0);
