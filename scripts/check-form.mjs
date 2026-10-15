#!/usr/bin/env node
/**
 * Booking form alignment check (run after `npm run build`), in English and Spanish (the
 * longest labels), at mobile and desktop widths, before and after a failed submit:
 * every text control has the same height, controls in a row share their top edge, the
 * columns share their left edges and widths, and the error doesn't move the fields.
 * Screenshots of the "Your details" step go to ./screenshots/form-*.png.
 *
 *   npm run test:form
 */
import { mkdirSync } from "node:fs";
import { serveOut, launchBrowser } from "./serve-out.mjs";

const PAGES = [
  ["en", "/cruises/downstream/"],
  ["es", "/es/cruceros/houay-xai-luang-prabang/"],
  ["de", "/de/kreuzfahrten/houay-xai-luang-prabang/"],
];
const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
];

const { base, close } = await serveOut();
const browser = await launchBrowser();
mkdirSync("screenshots", { recursive: true });
let failures = 0;

function measure() {
  const fieldset = [...document.querySelectorAll("#book fieldset")].at(-1);
  const controls = [...fieldset.querySelectorAll("input:not([type=checkbox]), textarea")].map(
    (el) => {
      const r = el.getBoundingClientRect();
      return {
        name: el.name,
        top: Math.round(r.top + scrollY),
        left: Math.round(r.left),
        width: Math.round(r.width),
        height: Math.round(r.height),
      };
    },
  );
  return { controls, box: fieldset.getBoundingClientRect().toJSON() };
}

for (const viewport of VIEWPORTS) {
  const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
  for (const [lang, path] of PAGES) {
    const page = await context.newPage();
    await page.goto(base + path, { waitUntil: "networkidle" });
    const fieldset = page.locator("#book fieldset").last();
    await fieldset.scrollIntoViewIfNeeded();
    const before = await page.evaluate(measure);
    await fieldset.screenshot({ path: `screenshots/form-${lang}-${viewport.name}.png` });

    // Failed submit: empty name, broken email.
    await page.fill("#book input[name=email]", "not-an-email");
    await page.locator("#book button[type=submit][value=whatsapp]").click();
    await page.waitForTimeout(300);
    await fieldset.scrollIntoViewIfNeeded();
    const after = await page.evaluate(measure);
    await fieldset.screenshot({ path: `screenshots/form-${lang}-${viewport.name}-errors.png` });

    const problems = [];
    const single = before.controls.filter((c) => c.name !== "message");
    const heights = new Set(single.map((c) => c.height));
    if (heights.size !== 1) problems.push(`input heights differ: ${[...heights]}`);
    if (viewport.name === "desktop") {
      // name|email, phone|diet: same top per row, same width, two shared left edges
      const [name, email, phone, diet] = ["name", "email", "phone", "diet"].map((n) =>
        single.find((c) => c.name === n),
      );
      if (name.top !== email.top || phone.top !== diet.top)
        problems.push("controls in a row don't share their top edge");
      if (name.width !== email.width || phone.width !== diet.width)
        problems.push("columns differ in width");
      if (name.left !== phone.left || email.left !== diet.left)
        problems.push("columns don't share left edges");
    } else {
      const lefts = new Set(before.controls.map((c) => c.left));
      if (lefts.size !== 1) problems.push(`left edges differ: ${[...lefts]}`);
    }
    const moved = before.controls.filter(
      (c, i) => c.top - before.controls[0].top !== after.controls[i].top - after.controls[0].top,
    );
    if (moved.length)
      problems.push(
        `errors moved: ${moved.map((c) => `${c.name} ${c.top - before.controls[0].top}→${after.controls[before.controls.indexOf(c)].top - after.controls[0].top}`).join(", ")}`,
      );

    const label = `${viewport.name.padEnd(7)} ${lang} ${path}`;
    if (problems.length) {
      failures += problems.length;
      console.log(`✗ ${label}\n    ${problems.join("\n    ")}`);
    } else {
      console.log(`✓ ${label}  (controls ${[...heights][0]}px high)`);
    }
    await page.close();
  }
  await context.close();
}

await browser.close();
close();
console.log(
  failures ? `\n${failures} alignment problem(s).` : "\nForm fields aligned in every case.",
);
process.exit(failures ? 1 : 0);
