"use client";

import manifest from "../content/photos.generated.json";

type Manifest = Record<string, { widths: number[] }>;

/**
 * next/image loader for the static export: maps each requested width to the closest
 * pre-generated WebP (see scripts/build-photos.mjs). `src` is "/images/<file>".
 */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const name = src.replace(/^\/images\//, "");
  const widths = (manifest as Manifest)[name]?.widths ?? [];
  const best = widths.find((w) => w >= width) ?? widths.at(-1);
  return best ? `/images/${name}-${best}.webp` : src;
}
