import localFont from "next/font/local";

/*
 * Two fonts, one weight each, self-hosted (no third-party request).
 * `display: swap` keeps text visible while loading; next/font preloads the files and
 * generates size-adjusted fallbacks, so the swap causes no layout shift.
 */
export const poppins = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/poppins/files/poppins-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

export const sourceSans = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-source-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});
