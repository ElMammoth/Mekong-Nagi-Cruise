/**
 * Resizes the photos in `photos/` into responsive WebP files in `public/images/` and
 * writes `src/content/photos.generated.json` (sizes + a tiny blur preview for each photo).
 * Runs automatically before `npm run dev` and `npm run build`.
 *
 *   photos/nagi-of-mekong-boat-at-the-pier.jpg
 *   → public/images/nagi-of-mekong-boat-at-the-pier-{480,768,1080,1440,1920}.webp
 */
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "photos");
const OUT = path.join(ROOT, "public", "images");
const MANIFEST = path.join(ROOT, "src", "content", "photos.generated.json");
const WIDTHS = [480, 768, 1080, 1440, 1920];
const INPUT = /\.(jpe?g|png|webp|avif|tiff?)$/i;
const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

async function exists(file) {
  try {
    return await stat(file);
  } catch {
    return null;
  }
}

async function main() {
  const files = (await exists(SRC)) ? (await readdir(SRC)).filter((f) => INPUT.test(f)) : [];
  await mkdir(OUT, { recursive: true });
  const manifest = {};

  for (const file of files.sort()) {
    const name = file.replace(INPUT, "");
    if (!NAME.test(name)) {
      console.warn(`photos: skipped "${file}" (use lowercase words joined by hyphens)`);
      continue;
    }
    const input = path.join(SRC, file);
    const source = await stat(input);
    const { info } = await sharp(input).rotate().toBuffer({ resolveWithObject: true });
    const widths = WIDTHS.filter((w) => w <= info.width);
    if (widths.length === 0) widths.push(info.width);

    for (const width of widths) {
      const output = path.join(OUT, `${name}-${width}.webp`);
      const current = await exists(output);
      if (current && current.mtimeMs >= source.mtimeMs) continue;
      await sharp(input).rotate().resize({ width }).webp({ quality: 72 }).toFile(output);
    }

    const blur = await sharp(input).rotate().resize(16).webp({ quality: 40 }).toBuffer();
    manifest[name] = {
      width: info.width,
      height: info.height,
      widths,
      blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    };
    console.log(`photos: ${name} (${widths.join(", ")})`);
  }

  const next = `${JSON.stringify(manifest, null, 2)}\n`;
  const previous = (await exists(MANIFEST)) ? await readFile(MANIFEST, "utf8") : "";
  if (next !== previous) await writeFile(MANIFEST, next);
  if (files.length === 0) console.log("photos: none yet, placeholders will be shown");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
