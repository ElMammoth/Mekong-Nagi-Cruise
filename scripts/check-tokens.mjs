#!/usr/bin/env node
/**
 * Guards the single token layer: components may only use design values through tokens.
 * Fails on arbitrary Tailwind values, hex/rgb colours, off-scale radii, weights, italics
 * and raw durations in src/**\/*.tsx. Variant selectors (data-[…], aria-[…], [&…]) are fine.
 *
 *   npm run test:tokens
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(process.cwd(), "src");
const RULES = [
  {
    name: "arbitrary value",
    // utility-[value] that is not a variant selector like data-[x]: / aria-[x]: / [&…]:
    re: /(?<![\w-])(?!(?:group-|peer-)?(?:data|aria|supports|has|not|in|nth)-\[)[a-z][\w-]*-\[(?!&)[^\]]+\](?!:)/g,
  },
  { name: "arbitrary property", re: /(?<![\w:-])\[(?!&)[a-z-]+:[^\]]+\]/g },
  { name: "hex colour", re: /#[0-9a-fA-F]{3,8}\b(?![\w-])/g },
  { name: "rgb/hsl colour", re: /\b(?:rgb|rgba|hsl|hsla|oklch)\(/g },
  { name: "off-scale radius", re: /\brounded(?:-[trbl]{1,2})?-(?:full|lg|xl|2xl|3xl|4xl)\b/g },
  {
    name: "extra font weight",
    re: /\bfont-(?:thin|extralight|light|normal|medium|semibold|extrabold|black)\b/g,
  },
  { name: "italic", re: /\bitalic\b/g },
  { name: "raw duration", re: /\bduration-\d+\b/g },
  {
    name: "raw colour utility",
    re: /\b(?:text|bg|border|fill|stroke)-(?:white|black|gray|slate|zinc|red|blue|green)(?:-\d+)?\b/g,
  },
];
// Files whose only "values" are third-party artwork or generated-image geometry.
const ALLOW = [/reviews[\\/]platform-logo\.tsx$/];

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (path.endsWith(".tsx")) yield path;
  }
}

let problems = 0;
for (const file of walk(ROOT)) {
  if (ALLOW.some((re) => re.test(file))) continue;
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) return;
    for (const rule of RULES) {
      for (const match of line.matchAll(rule.re)) {
        problems++;
        console.log(`${file.replace(process.cwd() + "/", "")}:${i + 1}  ${rule.name}: ${match[0]}`);
      }
    }
  });
}

if (problems) {
  console.log(`\n${problems} hard-coded design value(s). Use a token from src/app/globals.css.`);
  process.exit(1);
}
console.log("No hard-coded design values in components.");
