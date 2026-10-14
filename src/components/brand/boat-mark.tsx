import type { SVGProps } from "react";

/**
 * The slow boat from the original Nagi of Mekong logo, redrawn as clean line art:
 * long roof, row of window posts, two small front windows, hull rising to the bow.
 * Strokes use `currentColor`; set the colour with a text-* token.
 *
 * Pass `title` to expose it as an image with alt text; without it, it is decorative.
 */
export function BoatMark({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  const labelled = Boolean(title);
  return (
    <svg
      viewBox="0 0 400 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={labelled ? "img" : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
      {...props}
    >
      {labelled ? <title>{title}</title> : null}
      {/* Roof */}
      <path d="M44 12 L372 9 L394 17 L386 22 L52 22 Z" />
      {/* Cabin: back wall, window band, front cabin */}
      <path d="M54 22 V44 M60 22 V44 M60 27 H306 M306 22 V43" />
      {/* Window posts */}
      <path d="M80 27 V44 M96 27 V44 M112 27 V44 M128 27 V44 M146 27 V44 M164 27 V44 M182 27 V44 M200 27 V44 M218 27 V44 M236 27 V44 M254 27 V44 M272 27 V44 M290 27 V44" />
      {/* Two small front windows */}
      <path d="M334 29 h6 v9 h-6 Z M346 29 h6 v9 h-6 Z" />
      {/* Hull: stern deck, gunwale rising to the bow, keel line */}
      <path d="M8 36 L56 45 H300 C 336 43 366 33 392 20" />
      <path d="M8 36 C 26 50 54 57 112 58 H296 C 338 56 372 42 392 20" />
    </svg>
  );
}
