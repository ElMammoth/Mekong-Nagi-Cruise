#!/usr/bin/env node
/**
 * Consent and TikTok loading check on the static export (run after `npm run build`).
 *
 *   npm run test:embeds
 *
 * For each page with videos:
 * 1. First visit: the consent banner shows (and is not in the static HTML). Scrolling the
 *    whole page requests nothing from TikTok and sets no cookie at all.
 * 2. "Reject all": the banner closes; scrolling still requests nothing from TikTok; each
 *    video is a link card (no iframe).
 * 3. "Accept all": at the top of the page still nothing from TikTok (the videos are far
 *    below); scrolled to the videos, TikTok's official player loads (player/v1 iframes).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { serveOut, launchBrowser } from "./serve-out.mjs";

const PAGES = ["/", "/cruises/downstream/", "/fr/", "/de/kreuzfahrten/houay-xai-luang-prabang/"];
const isTikTok = (url) =>
  /(^|\.)(tiktok|tiktokcdn|tiktokv|ttwstatic|byteoversea|ibytedtos)\.(com|us)$/.test(
    new URL(url).hostname,
  );

const { base, close } = await serveOut();
const browser = await launchBrowser();
let failures = 0;
const fail = (msg) => {
  failures++;
  console.log(`  ✗ ${msg}`);
};
const ok = (msg) => console.log(`  ✓ ${msg}`);

async function scrollThrough(page) {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
  });
  await page.waitForTimeout(1500);
}

async function visit(path) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const requests = [];
  page.on("request", (r) => isTikTok(r.url()) && requests.push(r.url()));
  await page.goto(base + path, { waitUntil: "networkidle" });
  return { context, page, requests };
}

for (const path of PAGES) {
  console.log(path);
  const html = readFileSync(join("out", path, "index.html"), "utf8");
  if (html.includes('role="dialog"')) fail("the consent banner is in the static HTML");

  // 1 · First visit, no choice
  {
    const { context, page, requests } = await visit(path);
    const banner = page.getByRole("dialog");
    if (!(await banner.isVisible())) fail("consent banner not shown on first visit");
    else ok("consent banner shown on first visit");
    await scrollThrough(page);
    const cookies = await context.cookies();
    if (requests.length)
      fail(`before consent: ${requests.length} TikTok request(s), e.g. ${requests[0]}`);
    else ok("before consent, whole page scrolled: no TikTok request");
    if (cookies.length)
      fail(
        `before consent: cookies set: ${cookies.map((c) => `${c.domain} ${c.name}`).join(", ")}`,
      );
    else ok("before consent: no cookie set");
    await context.close();
  }

  // 2 · Reject all
  {
    const { context, page, requests } = await visit(path);
    await page.getByRole("dialog").getByRole("button").first().click(); // "Reject all" comes first
    if (await page.getByRole("dialog").count()) fail("banner still open after Reject all");
    await scrollThrough(page);
    const frames = await page.locator('iframe[src*="tiktok.com"]').count();
    const cards = await page.locator('li[class*="snap-start"] a[href*="tiktok.com/@"]').count();
    if (requests.length || frames)
      fail(`after Reject all: ${requests.length} request(s), ${frames} player(s)`);
    else ok(`after Reject all: no TikTok request, ${cards} link cards`);
    await context.close();
  }

  // 3 · Accept all
  {
    const { context, page, requests } = await visit(path);
    await page.getByRole("dialog").getByRole("button").nth(1).click(); // "Accept all"
    await page.waitForTimeout(1500);
    const rowTop = await page.evaluate(
      () =>
        document
          .querySelector('[aria-labelledby="tiktok-title"], [aria-labelledby="trip-tiktok-title"]')
          ?.getBoundingClientRect().top ?? -1,
    );
    if (requests.length && rowTop > 900 + 600)
      fail(
        `accepted, videos ${Math.round(rowTop)}px down: ${requests.length} request(s) at the top`,
      );
    else
      ok(
        `accepted, videos ${Math.round(rowTop)}px down: ${requests.length} TikTok request(s) before scrolling`,
      );
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto";
      document
        .querySelector('[aria-labelledby$="tiktok-title"] ul')
        ?.scrollIntoView({ block: "center" });
    });
    await page.waitForTimeout(4000);
    // Headless browsers get 403s from TikTok, so the players then fall back to link cards;
    // what matters here is that the official player was requested only now.
    const players = new Set(
      requests.filter((u) => u.includes("/player/v1/")).map((u) => u.split("?")[0]),
    );
    if (!players.size) fail("accepted and scrolled to the videos: no TikTok player requested");
    else ok(`accepted and scrolled to the videos: ${players.size} official player(s) requested`);
    await context.close();
  }
}

await browser.close();
close();
console.log(
  failures ? `\n${failures} problem(s).` : "\nNothing from TikTok, and no cookie, before consent.",
);
process.exit(failures ? 1 : 0);
