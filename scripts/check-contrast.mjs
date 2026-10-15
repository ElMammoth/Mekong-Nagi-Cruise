#!/usr/bin/env node
/**
 * WCAG 2.2 contrast check for every colour pairing the UI uses, read straight from the
 * token layer (src/app/globals.css). Text needs 4.5:1; large text and UI parts need 3:1.
 *
 *   npm run test:contrast
 */
import { readFileSync } from "node:fs";

const css = readFileSync("src/app/globals.css", "utf8");
const color = (name) => {
  const m = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`No hex token --color-${name}`);
  return m[1];
};
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// [foreground, background, minimum, where it's used]
const TEXT = 4.5;
const UI = 3;
const PAIRS = [
  ["ink", "canvas", TEXT, "body text"],
  ["ink", "surface-subtle", TEXT, "body text on alternate bands"],
  ["ink", "surface-tint", TEXT, "text in chips, notes, selected options"],
  ["heading", "canvas", TEXT, "headings, labels"],
  ["heading", "surface-subtle", TEXT, "headings on alternate bands"],
  ["heading", "surface-tint", TEXT, "labels on tinted surfaces"],
  ["muted", "canvas", TEXT, "secondary text"],
  ["muted", "surface-subtle", TEXT, "secondary text on alternate bands"],
  ["muted", "surface-tint", TEXT, "placeholder copy, chips"],
  ["primary", "canvas", TEXT, "links, secondary buttons"],
  ["primary", "surface-subtle", TEXT, "links on alternate bands"],
  ["primary", "surface-tint", TEXT, "day chips, step numbers"],
  ["on-primary", "primary", TEXT, "primary buttons, blue surfaces"],
  ["on-primary", "primary-hover", TEXT, "hovered buttons, icon tiles on blue"],
  ["on-primary-muted", "primary", TEXT, "secondary text on blue"],
  ["on-accent", "accent", TEXT, "main CTA"],
  ["on-accent", "accent-hover", TEXT, "main CTA hovered"],
  ["accent", "canvas", TEXT, "current nav item, errors, stars"],
  ["accent", "surface-subtle", TEXT, "accents on alternate bands"],
  ["accent", "accent-soft", TEXT, "seasonal badge"],
  ["control", "canvas", UI, "form control borders"],
  ["focus", "canvas", UI, "focus ring"],
  ["focus", "surface-subtle", UI, "focus ring on alternate bands"],
  ["focus-inverse", "primary", UI, "focus ring on blue"],
  ["accent", "canvas", UI, "star rating graphics"],
  ["success", "canvas", TEXT, "included check marks (text-level, stricter than UI)"],
  ["on-success", "success", UI, "tick inside the check mark"],
];

let failed = 0;
const rows = PAIRS.map(([fg, bg, min, use]) => {
  const r = ratio(color(fg), color(bg));
  const ok = r >= min;
  if (!ok) failed++;
  return `${ok ? "✓" : "✗"} ${fg.padEnd(17)} on ${bg.padEnd(15)} ${r.toFixed(2).padStart(5)}:1 (≥ ${min})  ${use}`;
});
console.log(rows.join("\n"));
if (failed) {
  console.log(`\n${failed} pairing(s) below WCAG AA.`);
  process.exit(1);
}
console.log(`\nAll ${PAIRS.length} pairings meet WCAG AA.`);
