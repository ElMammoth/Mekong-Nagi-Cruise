import type { SVGProps } from "react";

/** The long Mekong slow boat, reduced to a few lines. Inherits `currentColor`. */
export function BoatMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 24" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M3 14.5h52.5c2.4 0 4.6-1 6-2.9l.5-.6-1.6 5.6A4 4 0 0 1 56.6 19.5H9.4a5 5 0 0 1-4.3-2.4L3 14.5Z"
        fill="currentColor"
      />
      <path
        d="M9 7.2c10-1.4 30-1.6 43 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10 7.4v7M17 7v7.5M24 6.8v7.7M31 6.7v7.8M38 6.7v7.8M45 6.9v7.6M51.5 7.2v7.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
