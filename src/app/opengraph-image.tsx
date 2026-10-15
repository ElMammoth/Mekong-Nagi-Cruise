import { ImageResponse } from "next/og";
import { logo } from "@/components/brand/logo-data.generated";
import { getMessages } from "@/i18n/index";
import { token } from "@/lib/tokens";

export const dynamic = "force-static";
const m = getMessages("en");
export const alt = m.meta.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social card (Open Graph and Twitter): the logo, centred on white. */
export default function OpengraphImage() {
  const width = 760;
  const height = Math.round((width / logo.width) * logo.height);
  const blue = token("color-primary");
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: token("color-canvas"),
      }}
    >
      <svg width={width} height={height} viewBox={logo.viewBox}>
        <path
          d={logo.d}
          fill={blue}
          stroke={blue}
          strokeWidth={logo.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>,
    size,
  );
}
