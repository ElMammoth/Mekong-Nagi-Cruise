/**
 * Shared helpers for the browser checks: serve ./out on a free port and launch Chromium.
 * Point CHROMIUM_PATH at a Chrome or Chromium binary if none of the defaults exist.
 */
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";

const ROOT = join(process.cwd(), "out");
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

export async function serveOut() {
  if (!existsSync(ROOT)) {
    console.error("No ./out folder. Run `npm run build` first.");
    process.exit(1);
  }
  const server = createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
    let file = normalize(join(ROOT, url));
    if (!file.startsWith(ROOT)) return res.writeHead(403).end();
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
    if (!existsSync(file)) file = join(ROOT, "404.html");
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
    res.end(readFileSync(file));
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return { base: `http://127.0.0.1:${server.address().port}`, close: () => server.close() };
}

export function launchBrowser() {
  const executablePath =
    process.env.CHROMIUM_PATH ??
    [
      "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
      "/opt/pw-browsers/chromium",
      "C:/Program Files/Google/Chrome/Application/chrome.exe",
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    ].find((p) => existsSync(p));
  return chromium.launch({ executablePath });
}
