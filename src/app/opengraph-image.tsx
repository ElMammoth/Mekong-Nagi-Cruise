import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { BoatMark } from "@/components/brand/boat-mark";
import { site } from "@/content/site";
import { getMessages } from "@/i18n/index";
import { fromPriceText } from "@/lib/metadata";
import { token } from "@/lib/tokens";

export const dynamic = "force-static";
const m = getMessages("en");
export const alt = m.meta.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (file: string) =>
  readFileSync(path.join(process.cwd(), "node_modules/@fontsource", file));

/**
 * Social card, built from the same tokens and fonts as the site. One card (in English) for
 * every language: the two brand fonts don't cover Chinese or Thai.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: token("color-canvas"),
        color: token("color-heading"),
        fontFamily: "Source Sans 3",
        borderTop: `16px solid ${token("color-primary")}`,
      }}
    >
      <BoatMark width={300} height={48} stroke={token("color-primary")} strokeWidth={4} />
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontFamily: "Poppins", fontSize: 68, lineHeight: 1.08, maxWidth: 1000 }}>
          {m.home.title}
        </div>
        <div style={{ fontSize: 34, color: token("color-muted") }}>
          {`${site.name} · ${m.home.offerName} · ${m.common.from} ${fromPriceText("en", "downstream")}`}
        </div>
      </div>
      <div style={{ display: "flex", height: 8, width: 160, background: token("color-accent") }} />
    </div>,
    {
      ...size,
      fonts: [
        { name: "Poppins", data: font("poppins/files/poppins-latin-700-normal.woff"), weight: 700 },
        {
          name: "Source Sans 3",
          data: font("source-sans-3/files/source-sans-3-latin-400-normal.woff"),
          weight: 400,
        },
      ],
    },
  );
}
