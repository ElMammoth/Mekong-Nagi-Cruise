import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "start" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
}

export function Eyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={cn(
        "mb-3 text-sm font-semibold tracking-[0.14em] uppercase",
        tone === "dark" ? "text-gold" : "text-lantern",
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "start",
  tone = "light",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <Heading
        id={id}
        className={cn(Heading === "h1" ? "text-h1" : "text-h2", tone === "dark" && "text-sand")}
      >
        {title}
      </Heading>
      {intro ? (
        <div className={cn("mt-4 text-lead", tone === "dark" ? "text-river-mist" : "text-muted")}>
          {intro}
        </div>
      ) : null}
    </div>
  );
}
