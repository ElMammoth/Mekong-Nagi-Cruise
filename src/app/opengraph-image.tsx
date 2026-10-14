import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { BoatMark } from "@/components/brand/boat-mark";
import { site } from "@/content/site";
import { token } from "@/lib/tokens";

export const dynamic = "force-static";
export const alt = "Nagi of Mekong: slow-boat cruises from Houay Xai to Luang Prabang";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (file: string) =>
  readFileSync(path.join(process.cwd(), "node_modules/@fontsource", file));

/** Social card, built from the same tokens and fonts as the site. */
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
          Houay Xai to Luang Prabang, in comfort and safety
        </div>
        <div style={{ fontSize: 34, color: token("color-muted") }}>
          {`${site.name} · 2 days on the Mekong · from US$140`}
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
