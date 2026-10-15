"use client";

/*
 * TextLoop — adapted from React Bits (https://www.reactbits.dev/text-animations/text-loop,
 * registry item TextLoop-TS-TW). Copyright (c) 2026 David Haz, used under the MIT + Commons
 * Clause licence in ./REACT-BITS-LICENSE.md. Path shapes, measuring and the GSAP
 * tween are the original implementation. Changes for this site:
 *  - colours and font come from design tokens (Tailwind classes), not props with hex values;
 *  - the view box height is a prop, so the loop can run as a slim band;
 *  - GSAP is loaded lazily, only when the animation will actually run;
 *  - accessibility: the SVG is hidden from assistive tech and the full text is exposed once
 *    as visually hidden text; a pause/play button satisfies WCAG 2.2.2; the loop also
 *    pauses on hover and keyboard focus, and never starts under prefers-reduced-motion.
 */

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/cn";

export type TextLoopShape = "wave" | "circle" | "infinity" | "arch" | "line";
export type TextLoopDirection = "forward" | "reverse";

export interface TextLoopProps {
  text: string;
  shape?: TextLoopShape;
  path?: string;
  speed?: number;
  direction?: TextLoopDirection;
  separator?: string;
  curviness?: number;
  /** Font size in view-box units (the SVG scales with its width). */
  fontSize?: number;
  letterSpacing?: number;
  uppercase?: boolean;
  ribbon?: boolean;
  ribbonWidth?: number;
  /** View box height in units; width is fixed at 1200. */
  viewHeight?: number;
  pauseOnHover?: boolean;
  /** Token classes for the text fill and ribbon stroke, e.g. "fill-on-primary". */
  textClassName?: string;
  ribbonClassName?: string;
  /** Sizing for the SVG itself; with `fit="slice"` a fixed height keeps text legible on phones. */
  svgClassName?: string;
  fit?: "meet" | "slice";
  className?: string;
}

interface Metrics {
  length: number;
  reps: number;
}

const VIEW_W = 1200;
const EDGE_PAD = 6;

const buildPath = (
  shape: TextLoopShape,
  curviness: number,
  ribbonWidth: number,
  viewH: number,
): string => {
  const CX = VIEW_W / 2;
  const CY = viewH / 2;
  const c = Math.max(0, curviness);
  const room = Math.max(20, CY - Math.max(0, ribbonWidth) / 2 - EDGE_PAD);

  switch (shape) {
    case "circle": {
      const r = Math.min(90 + c * 0.95, room);
      return `M ${CX - r} ${CY} A ${r} ${r} 0 1 1 ${CX + r} ${CY} A ${r} ${r} 0 1 1 ${CX - r} ${CY} Z`;
    }
    case "infinity": {
      const r = 150 + c * 1.4;
      const h = Math.min(60 + c * 0.95, room);
      return [
        `M ${CX} ${CY}`,
        `C ${CX + r * 0.55} ${CY - h} ${CX + r} ${CY - h} ${CX + r} ${CY}`,
        `C ${CX + r} ${CY + h} ${CX + r * 0.55} ${CY + h} ${CX} ${CY}`,
        `C ${CX - r * 0.55} ${CY - h} ${CX - r} ${CY - h} ${CX - r} ${CY}`,
        `C ${CX - r} ${CY + h} ${CX - r * 0.55} ${CY + h} ${CX} ${CY}`,
        "Z",
      ].join(" ");
    }
    case "arch": {
      const rise = Math.min(120 + c * 1.1, room * 2);
      return `M 120 ${CY + rise / 2} Q ${CX} ${CY - rise * 1.5} ${VIEW_W - 120} ${CY + rise / 2}`;
    }
    case "line":
      return `M -320 ${CY} L ${VIEW_W + 320} ${CY}`;
    case "wave":
    default: {
      const a = Math.min(c * 2.2, room * 2);
      return `M -320 ${CY} Q -160 ${CY - a} 0 ${CY} T 320 ${CY} T 640 ${CY} T 960 ${CY} T 1280 ${CY} T ${VIEW_W + 320} ${CY}`;
    }
  }
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function TextLoop({
  text,
  shape = "wave",
  path,
  speed = 90,
  direction = "forward",
  separator = "·",
  curviness = 90,
  fontSize = 46,
  letterSpacing = 2,
  uppercase = true,
  ribbon = true,
  ribbonWidth = 86,
  viewHeight = 520,
  pauseOnHover = true,
  textClassName = "fill-on-primary",
  ribbonClassName = "stroke-primary",
  svgClassName = "h-auto w-full",
  fit = "meet",
  className,
}: TextLoopProps) {
  const { m } = useI18n();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const measureRef = useRef<SVGTextElement | null>(null);
  const headRef = useRef<SVGTextPathElement | null>(null);
  const tailRef = useRef<SVGTextPathElement | null>(null);

  const [metrics, setMetrics] = useState<Metrics>({ length: 0, reps: 1 });
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const rawId = useId();
  const pathId = `text-loop-${rawId.replace(/:/g, "")}`;

  const d = useMemo(
    () => path || buildPath(shape, curviness, ribbonWidth, viewHeight),
    [path, shape, curviness, ribbonWidth, viewHeight],
  );

  const unit = useMemo(() => {
    const base = uppercase ? String(text).toLocaleUpperCase() : String(text);
    const gap = separator ? ` ${separator} ` : "   ";
    return `${base}${gap}`;
  }, [text, separator, uppercase]);

  const textStyle = useMemo(
    () => ({ fontSize: `${fontSize}px`, letterSpacing: `${letterSpacing}px` }),
    [fontSize, letterSpacing],
  );

  useLayoutEffect(() => {
    const pathEl = pathRef.current;
    const measureEl = measureRef.current;
    if (!pathEl || !measureEl) return undefined;

    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      let length = 0;
      let unitWidth = 0;
      try {
        length = pathEl.getTotalLength();
        unitWidth = measureEl.getComputedTextLength();
      } catch {
        return;
      }
      if (!length) return;

      const reps = unitWidth > 0 ? Math.max(1, Math.round(length / unitWidth)) : 1;
      setMetrics((prev) =>
        prev.length === length && prev.reps === reps ? prev : { length, reps },
      );
    };

    measure();
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      cancelled = true;
    };
  }, [d, unit, fontSize, letterSpacing]);

  useEffect(() => {
    const { length } = metrics;
    const head = headRef.current;
    const tail = tailRef.current;
    if (!head || !tail || !length) return undefined;

    const apply = (offset: number) => {
      const partner = offset >= 0 ? offset - length : offset + length;
      head.setAttribute("startOffset", String(offset));
      tail.setAttribute("startOffset", String(partner));
    };

    apply(0);

    if (reducedMotion || paused || speed <= 0) return undefined;

    let disposed = false;
    let cleanup = () => {};

    import("gsap").then(({ gsap }) => {
      if (disposed) return;
      const state = { offset: 0 };
      const tween = gsap.to(state, {
        offset: direction === "reverse" ? -length : length,
        duration: length / speed,
        ease: "none",
        repeat: -1,
        onUpdate: () => apply(state.offset),
      });

      const root = rootRef.current;
      const pause = () => tween.pause();
      const resume = () => tween.resume();

      if (pauseOnHover && root) {
        root.addEventListener("pointerenter", pause);
        root.addEventListener("pointerleave", resume);
        root.addEventListener("focusin", pause);
        root.addEventListener("focusout", resume);
      }

      cleanup = () => {
        tween.kill();
        if (pauseOnHover && root) {
          root.removeEventListener("pointerenter", pause);
          root.removeEventListener("pointerleave", resume);
          root.removeEventListener("focusin", pause);
          root.removeEventListener("focusout", resume);
        }
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [metrics, speed, direction, pauseOnHover, reducedMotion, paused]);

  const loopText = unit.repeat(metrics.reps);
  const fitLength = metrics.length || undefined;

  return (
    <div ref={rootRef} className={cn("relative w-full overflow-hidden", className)}>
      {/* What the loop says, once, for assistive technology. */}
      <p className="sr-only">{text}</p>
      <svg
        className={cn("block font-display", svgClassName)}
        viewBox={`0 0 ${VIEW_W} ${viewHeight}`}
        preserveAspectRatio={`xMidYMid ${fit}`}
        aria-hidden="true"
        focusable="false"
      >
        <path
          ref={pathRef}
          id={pathId}
          d={d}
          fill="none"
          className={ribbon ? ribbonClassName : undefined}
          strokeWidth={ribbon ? ribbonWidth : 0}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text ref={measureRef} className="pointer-events-none invisible" style={textStyle}>
          {unit}
        </text>

        <text
          className={cn("select-none", textClassName)}
          style={textStyle}
          dominantBaseline="central"
          textLength={fitLength}
          lengthAdjust="spacing"
        >
          <textPath ref={headRef} href={`#${pathId}`} startOffset={0}>
            {loopText}
          </textPath>
        </text>

        <text
          className={cn("select-none", textClassName)}
          style={textStyle}
          dominantBaseline="central"
          textLength={fitLength}
          lengthAdjust="spacing"
        >
          <textPath ref={tailRef} href={`#${pathId}`} startOffset={0}>
            {loopText}
          </textPath>
        </text>
      </svg>

      {reducedMotion ? null : (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="absolute right-2 bottom-2 inline-flex size-9 items-center justify-center rounded-sm border border-line bg-surface text-primary shadow-sm transition-colors duration-fast hover:bg-surface-tint"
        >
          {paused ? (
            <Play aria-hidden="true" className="size-4" />
          ) : (
            <Pause aria-hidden="true" className="size-4" />
          )}
          <span className="sr-only">{m.common.pauseMotion}</span>
        </button>
      )}
    </div>
  );
}
