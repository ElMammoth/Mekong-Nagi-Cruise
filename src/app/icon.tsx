import { ImageResponse } from "next/og";
import { BoatMark } from "@/components/brand/boat-mark";
import { token } from "@/lib/tokens";

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: the boat mark in white on flag blue (colours from the token layer). */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: token("color-primary"),
        borderRadius: token("radius-md"),
      }}
    >
      <BoatMark width={56} height={10} stroke={token("color-on-primary")} strokeWidth={10} />
    </div>,
    size,
  );
}
