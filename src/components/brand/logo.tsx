import type { SVGProps } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { logo } from "./logo-data.generated";

/*
 * The Nagi of Mekong mark, inline. Its only source is src/brand/logo.svg (one path, drawn in
 * currentColor); `npm run brand` turns it into logo-data.generated.ts and the favicons.
 * No ids or classes inside, so it can appear several times on a page.
 *
 * - color: "primary" (flag blue, on white or light surfaces, 14.6:1) or "inverse" (white, on
 *   blue surfaces, 14.6:1). Both pass WCAG AA by a wide margin.
 * - size: a height token (h-logo-*); the width follows the mark's aspect ratio, never stretched.
 *   At h-logo-sm (28 px) the mark is about 105 px wide and its window posts stay distinct.
 * - Labelled (role="img", "Nagi of Mekong") unless `decorative`.
 */

const colors = {
  primary: "text-primary",
  inverse: "text-on-primary",
  /** Decorative uses that take their colour from the surrounding illustration. */
  inherit: "",
} as const;

const sizes = {
  sm: "h-logo-sm",
  md: "h-logo",
  lg: "h-logo-lg",
  /** Navbar: smaller on phones. */
  header: "h-logo-sm sm:h-logo",
  /** Sized by the caller (illustrations: width/height attributes or a width token). */
  none: "",
} as const;

type LogoProps = Omit<SVGProps<SVGSVGElement>, "color"> & {
  color?: keyof typeof colors;
  size?: keyof typeof sizes;
  /** Purely visual (next to text that already names the brand, or illustrations). */
  decorative?: boolean;
  title?: string;
};

export function Logo({
  color = "primary",
  size = "md",
  decorative = false,
  title = site.name,
  className,
  ...props
}: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={logo.viewBox}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : title}
      aria-hidden={decorative ? true : undefined}
      focusable="false"
      shapeRendering="geometricPrecision"
      className={cn(
        size !== "none" && "block w-auto shrink-0",
        sizes[size],
        colors[color],
        className,
      )}
      {...props}
    >
      {decorative ? null : <title>{title}</title>}
      <path
        d={logo.d}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={logo.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
