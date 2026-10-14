import localFont from "next/font/local";

/* Self-hosted variable fonts (no third-party requests). Latin subset only. */
export const fraunces = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-opsz-italic.woff2",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const figtree = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2",
      style: "normal",
      weight: "300 900",
    },
  ],
  variable: "--font-figtree",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
