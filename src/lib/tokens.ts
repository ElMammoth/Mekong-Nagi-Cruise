import { readFileSync } from "node:fs";
import path from "node:path";

/*
 * Read design tokens from src/app/globals.css (the single token layer) for the few places
 * that can't use CSS: metadata (theme colour) and generated images (favicon, social card).
 * Server/build time only.
 */
const css = readFileSync(path.join(process.cwd(), "src/app/globals.css"), "utf8");

export function token(name: string): string {
  const match = css.match(new RegExp(`--${name}:\\s*([^;]+);`));
  if (!match?.[1]) throw new Error(`Unknown design token --${name}`);
  return match[1].trim();
}
