import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const dynamic = "force-static";
export const alt = "Nagi of Mekong: slow-boat cruises from Houay Xai to Luang Prabang";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
        background: "#f6eee3",
        color: "#5b1e22",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: "#e2412b",
            display: "flex",
          }}
        />
        <div style={{ fontSize: 40, fontStyle: "italic", fontWeight: 700 }}>{site.name}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 700, maxWidth: 980 }}>
          Cruise the majestic Mekong in comfort and safety
        </div>
        <div style={{ fontSize: 32, color: "#6b5a55" }}>
          Houay Xai → Pak Beng → Luang Prabang · 2 days · from US$140
        </div>
      </div>
      <div style={{ display: "flex", height: 10, background: "#173f3b", borderRadius: 5 }} />
    </div>,
    size,
  );
}
