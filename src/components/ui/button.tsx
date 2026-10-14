import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/**
 * `cta`: the main booking action, in flag red — used sparingly, once per view.
 * `primary`: other primary actions, flag blue. `secondary`: outlined. `onDark`: on blue surfaces.
 */
type Variant = "cta" | "primary" | "secondary" | "ghost" | "onDark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-display text-center leading-tight transition-colors duration-fast ease-standard disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0";

const variants: Record<Variant, string> = {
  cta: "bg-accent text-on-accent hover:bg-accent-hover",
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
  secondary:
    "border border-control bg-surface text-primary hover:border-primary hover:bg-surface-subtle",
  ghost: "text-primary underline-offset-4 hover:underline",
  onDark: "inverse bg-surface text-primary hover:bg-surface-tint",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
};

interface StyleProps {
  variant?: Variant;
  size?: Size;
}

export function buttonClasses({ variant = "primary", size = "md" }: StyleProps = {}) {
  return cn(base, variants[variant], sizes[size]);
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & StyleProps) {
  return (
    <button type={type} className={cn(buttonClasses({ variant, size }), className)} {...props} />
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & StyleProps) {
  return <Link className={cn(buttonClasses({ variant, size }), className)} {...props} />;
}

/** For external destinations (WhatsApp, mailto, tel). */
export function ButtonAnchor({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"a"> & StyleProps) {
  return <a className={cn(buttonClasses({ variant, size }), className)} {...props} />;
}
