"use client";

/*
 * Curved Input, adapted from React Bits (reactbits.dev/components/curved-input, by David Haz,
 * MIT + Commons Clause: see REACT-BITS-LICENSE.md next to this file). The arc geometry,
 * caret placement and arc scrolling are React Bits' code. What changed:
 *  - It is a field inside our own <form> (not a form itself), with a real <input> and a real
 *    submit <button> laid over the drawing. Labels, validation, autofill and keyboard use
 *    stay native, and the button keeps a ≥ 44 px tap target.
 *  - Colours come from the design tokens (CSS variables), not hex props. Fonts are ours:
 *    Source Sans 3 Regular for the text, Poppins Bold for the button. No extra weights.
 *  - Visible focus: a ring drawn around the band (or the button) in the focus-ring colour,
 *    offset like the site's outline.
 *  - Its height is fixed before it measures, and it renders a plain straight field until
 *    then (and without JavaScript), so nothing shifts.
 *  - The caret doesn't blink for visitors who prefer reduced motion.
 */

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type SyntheticEvent,
} from "react";
import { cn } from "@/lib/cn";

const DEG = 180 / Math.PI;
const round2 = (n: number): number => Math.round(n * 100) / 100;

interface Geometry {
  straight: boolean;
  W: number;
  T: number;
  svgH: number;
  R?: number;
  dir?: number;
  uPerLen: number;
  point: (u: number, v: number) => [number, number];
  angleAt: (u: number) => number;
  uFromPoint: (x: number, y?: number) => number;
}

// Maps the flat coordinate space (u: 0..W along the bar, v: offset from the centreline,
// positive down) onto a circular arc with the given sagitta (`bend`, in px). Positive bend
// arches up, negative sags down, 0 is flat. (React Bits)
const buildGeometry = (width: number, bend: number, thickness: number, pad: number): Geometry => {
  const W = width;
  const T = thickness;
  const s = Math.max(-W * 0.35, Math.min(bend, W * 0.35));
  const a = Math.abs(s);
  const dir = s >= 0 ? 1 : -1;
  const svgH = T + a + pad * 2;

  if (a < 0.75) {
    const midY = pad + T / 2;
    return {
      straight: true,
      W,
      T,
      svgH,
      uPerLen: 1,
      point: (u, v) => [u, midY + v],
      angleAt: () => 0,
      uFromPoint: (x) => x,
    };
  }

  const R = (W * W * 0.25 + a * a) / (2 * a);
  const cx = W / 2;
  const apexY = pad + T / 2 + (dir > 0 ? 0 : a);
  const cy = apexY + dir * R;
  const phi = Math.asin(Math.min(1, W / (2 * R)));

  return {
    straight: false,
    W,
    T,
    svgH,
    R,
    dir,
    uPerLen: W / (2 * R * phi),
    point: (u, v) => {
      const th = ((u - cx) / cx) * phi;
      const rho = R - dir * v;
      return [cx + rho * Math.sin(th), cy - dir * rho * Math.cos(th)];
    },
    angleAt: (u) => dir * ((u - cx) / cx) * phi * DEG,
    uFromPoint: (x, y = 0) => {
      const th = Math.atan2(x - cx, dir * (cy - y));
      return cx + (th / phi) * cx;
    },
  };
};

const fmtPoint = (g: Geometry, u: number, v: number): string => {
  const [x, y] = g.point(u, v);
  return `${round2(x)} ${round2(y)}`;
};

// Segment along a constant-v edge, as a circular arc (or a line when flat). (React Bits)
const edgeSeg = (g: Geometry, uTo: number, v: number, ltr: boolean): string => {
  if (g.straight) return `L ${fmtPoint(g, uTo, v)}`;
  const rho = round2(g.R! - g.dir! * v);
  const sweep = ltr === g.dir! > 0 ? 1 : 0;
  return `A ${rho} ${rho} 0 0 ${sweep} ${fmtPoint(g, uTo, v)}`;
};

// A rectangle bent along the arc: circular top/bottom edges, radial end caps and quadratic
// rounded corners. (React Bits)
const bentRectPath = (
  g: Geometry,
  u0: number,
  u1: number,
  vTop: number,
  vBot: number,
  radius: number,
): string => {
  const rc = Math.max(0, Math.min(radius, (vBot - vTop) / 2, (u1 - u0) / 2));
  return [
    `M ${fmtPoint(g, u0 + rc, vTop)}`,
    edgeSeg(g, u1 - rc, vTop, true),
    `Q ${fmtPoint(g, u1, vTop)} ${fmtPoint(g, u1, vTop + rc)}`,
    `L ${fmtPoint(g, u1, vBot - rc)}`,
    `Q ${fmtPoint(g, u1, vBot)} ${fmtPoint(g, u1 - rc, vBot)}`,
    edgeSeg(g, u0 + rc, vBot, false),
    `Q ${fmtPoint(g, u0, vBot)} ${fmtPoint(g, u0, vBot - rc)}`,
    `L ${fmtPoint(g, u0, vTop + rc)}`,
    `Q ${fmtPoint(g, u0, vTop)} ${fmtPoint(g, u0 + rc, vTop)}`,
    "Z",
  ].join(" ");
};

const bentLinePath = (g: Geometry, u0: number, u1: number, v: number): string =>
  `M ${fmtPoint(g, u0, v)} ${edgeSeg(g, u1, v, true)}`;

/** Axis-aligned box (in px, relative to the svg) around a bent rectangle. */
function bentBox(g: Geometry, u0: number, u1: number, vTop: number, vBot: number) {
  const pts = [u0, (u0 + u1) / 2, u1].flatMap((u) => [g.point(u, vTop), g.point(u, vBot)]);
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const left = Math.min(...xs);
  const top = Math.min(...ys);
  return { left, top, width: Math.max(...xs) - left, height: Math.max(...ys) - top };
}

/** Token colours used inside the drawing. */
const COLOR = {
  fill: "var(--color-surface)",
  stroke: "var(--color-primary)",
  text: "var(--color-heading)",
  placeholder: "var(--color-muted)",
  button: "var(--color-accent)",
  buttonHover: "var(--color-accent-hover)",
  buttonText: "var(--color-on-accent)",
  chip: "var(--color-primary)",
  chipMark: "var(--color-on-primary)",
  ring: "var(--focus-ring, var(--color-focus))",
};

/** Space around the band for the focus ring (px). */
const RING_GAP = 4;

export interface CurvedInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  buttonText: string;
  placeholder?: string;
  type?: "email" | "text";
  autoComplete?: string;
  invalid?: boolean;
  describedBy?: string;
  disabled?: boolean;
  /** Sagitta of the arc in px: negative sags down (React Bits default 28; we use -20). */
  bend?: number;
  height?: number;
  cornerRadius?: number;
  borderWidth?: number;
  fontSize?: number;
  className?: string;
}

export function CurvedInput({
  id,
  name,
  value,
  onChange,
  buttonText,
  placeholder = "",
  type = "email",
  autoComplete = "email",
  invalid = false,
  describedBy,
  disabled = false,
  bend = -20,
  height = 64,
  cornerRadius = 6,
  borderWidth = 1.5,
  fontSize = 17,
  className,
}: CurvedInputProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textRef = useRef<SVGTextElement | null>(null);
  const btnMeasureRef = useRef<SVGTextElement | null>(null);
  const scrollRef = useRef(0);

  const [w, setW] = useState(0);
  const [caretIndex, setCaretIndex] = useState(value.length);
  const [focused, setFocused] = useState(false);
  const [buttonFocus, setButtonFocus] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);
  const [caretU, setCaretU] = useState(0);
  const [scrollLen, setScrollLen] = useState(0);
  const [btnTextW, setBtnTextW] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [, setFontTick] = useState(0);

  const display = value;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const cw = entries[0]?.contentRect?.width ?? el.clientWidth;
      setW(Math.round(cw));
    });
    ro.observe(el);
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    return () => ro.disconnect();
  }, []);

  // Re-measure once webfonts finish loading. (React Bits)
  useEffect(() => {
    let alive = true;
    document.fonts?.ready.then(() => {
      if (alive) setFontTick((t) => t + 1);
    });
    return () => {
      alive = false;
    };
  }, []);

  const pad = Math.ceil(borderWidth / 2) + RING_GAP + 3;
  const reservedHeight = height + Math.abs(bend) + pad * 2;
  const geom = useMemo<Geometry | null>(
    () => (w > 2 ? buildGeometry(w, bend, height, pad) : null),
    [w, bend, height, pad],
  );

  const layout = useMemo(() => {
    if (!geom) return null;
    const T = height;
    const btnInset = Math.max(5, borderWidth + 4);
    const chipH = Math.min(34, Math.max(16, T * 0.34));
    const chipW = chipH * 1.25;
    const iconU = 22 + chipW / 2;
    const textStartU = 22 + chipW + 13;
    const btnW = Math.max(btnTextW + fontSize * 2.7, T * 1.35);
    const btnU1 = geom.W - btnInset;
    const btnU0 = btnU1 - btnW;
    const textEndU = Math.max(textStartU + 20, btnU0 - 14);
    const winLen = (textEndU - textStartU) / geom.uPerLen;
    return { btnInset, chipH, chipW, iconU, textStartU, textEndU, btnU0, btnU1, winLen };
  }, [geom, height, borderWidth, btnTextW, fontSize]);

  // Measure rendered text to keep the caret on the curve and scroll long values along the
  // arc, like a native input would. (React Bits) It runs after every render on purpose: any
  // change of text, caret, width or font can move the caret, and equal values don't re-render.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (btnMeasureRef.current) {
      const bw = btnMeasureRef.current.getComputedTextLength();
      setBtnTextW((prev) => (Math.abs(prev - bw) > 0.5 ? bw : prev));
    }
    if (!geom || !layout) return;
    const textEl = textRef.current;
    const caret = Math.min(caretIndex, display.length);
    let caretLen = 0;
    let totalLen = 0;
    if (textEl && display.length) {
      try {
        totalLen = textEl.getSubStringLength(0, display.length);
        caretLen = caret > 0 ? textEl.getSubStringLength(0, caret) : 0;
      } catch {
        totalLen = 0;
        caretLen = 0;
      }
    }
    let next = scrollRef.current;
    if (caretLen - next > layout.winLen - 2) next = caretLen - layout.winLen + 2;
    if (caretLen - next < 0) next = caretLen;
    if (totalLen - next < layout.winLen) next = Math.max(0, totalLen - layout.winLen);
    next = Math.max(0, next);
    if (Math.abs(next - scrollRef.current) > 0.5) {
      scrollRef.current = next;
      setScrollLen(next);
    }
    setCaretU(layout.textStartU + (caretLen - next) * geom.uPerLen);
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setCaretIndex(e.target.selectionStart ?? e.target.value.length);
  };

  const handleSelect = (e: SyntheticEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    setCaretIndex(target.selectionStart ?? target.value.length);
  };

  // Click on the curve: focus the real input and drop the caret on the character closest
  // to the click, measured in arc length. (React Bits)
  const handleSurfaceClick = (e: ReactMouseEvent<SVGSVGElement>) => {
    const input = inputRef.current;
    if (!input || disabled) return;
    let idx = display.length;
    const svg = svgRef.current;
    const textEl = textRef.current;
    if (svg && geom && layout && textEl && display.length) {
      try {
        const ctm = svg.getScreenCTM();
        if (!ctm) throw new Error("missing screen CTM");
        const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
        const target =
          scrollRef.current + (geom.uFromPoint(pt.x, pt.y) - layout.textStartU) / geom.uPerLen;
        let best = 0;
        let bestDist = Infinity;
        for (let i = 0; i <= display.length; i++) {
          const li = i === 0 ? 0 : textEl.getSubStringLength(0, i);
          const d = Math.abs(li - target);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        }
        idx = best;
      } catch {
        idx = display.length;
      }
    }
    input.focus();
    try {
      input.setSelectionRange(idx, idx);
    } catch {
      /* selection API unavailable for this input type (email) */
    }
    setCaretIndex(idx);
  };

  const curved = Boolean(geom && layout);
  const textFont: CSSProperties = { fontSize: `${fontSize}px` };

  let drawing = null;
  let buttonBox: ReturnType<typeof bentBox> | null = null;
  if (geom && layout) {
    const T = height;
    const vBase = fontSize * 0.34;
    const scrollU = scrollLen * geom.uPerLen;
    const bandPath = bentRectPath(geom, 0, geom.W, -T / 2, T / 2, cornerRadius);
    const ringPath = bentRectPath(
      geom,
      -RING_GAP,
      geom.W + RING_GAP,
      -T / 2 - RING_GAP,
      T / 2 + RING_GAP,
      cornerRadius + RING_GAP,
    );
    const layoutPath = bentLinePath(geom, layout.textStartU - scrollU, geom.W, vBase);
    const clipPath = bentRectPath(
      geom,
      layout.textStartU - 6,
      layout.textEndU + 8,
      -T / 2,
      T / 2,
      0,
    );

    const { chipW, chipH } = layout;
    const ew = chipW * 0.5;
    const eh = chipH * 0.5;
    const sw = Math.max(1.1, chipH * 0.075);
    const [ix, iy] = geom.point(layout.iconU, 0);
    const iconAngle = geom.angleAt(layout.iconU);

    const [caretX, caretY] = geom.point(caretU, 0);
    const caretAngle = geom.angleAt(caretU);
    const caretH = Math.min(T * 0.58, fontSize * 1.45);

    const vTopBtn = -T / 2 + layout.btnInset;
    const vBotBtn = T / 2 - layout.btnInset;
    const btnRadius = Math.min(cornerRadius, (vBotBtn - vTopBtn) / 2);
    const buttonPath = bentRectPath(geom, layout.btnU0, layout.btnU1, vTopBtn, vBotBtn, btnRadius);
    const buttonRing = bentRectPath(
      geom,
      layout.btnU0 - 3,
      layout.btnU1 + 3,
      vTopBtn - 3,
      vBotBtn + 3,
      btnRadius + 3,
    );
    const buttonTextPath = bentLinePath(geom, layout.btnU0, layout.btnU1, vBase);
    buttonBox = bentBox(geom, layout.btnU0, layout.btnU1, vTopBtn, vBotBtn);
    const clipId = `${id}-clip`;
    const layoutPathId = `${id}-text-path`;
    const buttonPathId = `${id}-button-path`;

    drawing = (
      <svg
        ref={svgRef}
        aria-hidden="true"
        className="block h-auto w-full cursor-text overflow-visible select-none"
        width={geom.W}
        height={round2(geom.svgH)}
        viewBox={`0 0 ${geom.W} ${round2(geom.svgH)}`}
        onPointerDown={(e) => e.preventDefault()}
        onClick={handleSurfaceClick}
      >
        <defs>
          <clipPath id={clipId}>
            <path d={clipPath} />
          </clipPath>
        </defs>

        {focused ? (
          <path d={ringPath} fill="none" style={{ stroke: COLOR.ring }} strokeWidth={2} />
        ) : null}
        <path
          d={bandPath}
          style={{ fill: COLOR.fill, stroke: invalid ? COLOR.button : COLOR.stroke }}
          strokeWidth={invalid ? borderWidth + 1 : borderWidth}
        />

        <path id={layoutPathId} d={layoutPath} fill="none" />

        <g transform={`translate(${round2(ix)} ${round2(iy)}) rotate(${round2(iconAngle)})`}>
          <rect
            x={-chipW / 2}
            y={-chipH / 2}
            width={chipW}
            height={chipH}
            rx={chipH * 0.2}
            style={{ fill: COLOR.chip }}
          />
          <rect
            x={-ew / 2}
            y={-eh / 2}
            width={ew}
            height={eh}
            rx={1.4}
            fill="none"
            style={{ stroke: COLOR.chipMark }}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          <path
            d={`M ${round2(-ew / 2)} ${round2(-eh / 2 + sw * 0.4)} L 0 ${round2(eh * 0.14)} L ${round2(ew / 2)} ${round2(-eh / 2 + sw * 0.4)}`}
            fill="none"
            style={{ stroke: COLOR.chipMark }}
            strokeWidth={sw}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>

        <g clipPath={`url(#${clipId})`}>
          <text
            ref={textRef}
            className="font-sans"
            style={{ ...textFont, fill: COLOR.text }}
            xmlSpace="preserve"
          >
            <textPath href={`#${layoutPathId}`}>{display}</textPath>
          </text>
          {!display && placeholder ? (
            <text
              className="font-sans"
              style={{ ...textFont, fill: COLOR.placeholder }}
              xmlSpace="preserve"
            >
              <textPath href={`#${layoutPathId}`}>{placeholder}</textPath>
            </text>
          ) : null}
          {focused ? (
            <g
              key={`${display}-${Math.min(caretIndex, display.length)}`}
              transform={`translate(${round2(caretX)} ${round2(caretY)}) rotate(${round2(caretAngle)})`}
            >
              <line
                y1={-caretH / 2}
                y2={caretH / 2}
                style={{ stroke: COLOR.text }}
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                {reduceMotion ? null : (
                  <animate
                    attributeName="opacity"
                    values="1;0"
                    dur="1.06s"
                    calcMode="discrete"
                    repeatCount="indefinite"
                  />
                )}
              </line>
            </g>
          ) : null}
        </g>

        {buttonFocus ? (
          <path d={buttonRing} fill="none" style={{ stroke: COLOR.stroke }} strokeWidth={2} />
        ) : null}
        <path d={buttonPath} style={{ fill: buttonHover ? COLOR.buttonHover : COLOR.button }} />
        <path id={buttonPathId} d={buttonTextPath} fill="none" />
        <text
          className="font-display font-bold"
          textAnchor="middle"
          style={{ ...textFont, fill: COLOR.buttonText, pointerEvents: "none" }}
        >
          <textPath href={`#${buttonPathId}`} startOffset="50%">
            {buttonText}
          </textPath>
        </text>

        <text
          ref={btnMeasureRef}
          className="font-display font-bold"
          style={textFont}
          x="-9999"
          y="-9999"
          visibility="hidden"
        >
          {buttonText}
        </text>
      </svg>
    );
  }

  return (
    <div
      ref={rootRef}
      className={cn("relative w-full", className)}
      style={{ height: reservedHeight }}
    >
      {drawing}
      {/* Before it measures (and without JavaScript): a plain straight field, same height. */}
      <div
        className={cn(
          "absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center gap-2 rounded-sm border bg-surface p-1.5",
          invalid ? "border-accent" : "border-primary",
          curved && "pointer-events-none border-0 bg-transparent",
        )}
        style={{ height }}
      >
        <input
          ref={inputRef}
          id={id}
          name={name}
          type={type}
          inputMode={type === "email" ? "email" : undefined}
          value={value}
          placeholder={curved ? undefined : placeholder}
          onChange={handleInputChange}
          onSelect={handleSelect}
          onKeyUp={handleSelect}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          autoComplete={autoComplete}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          disabled={disabled}
          className={cn(
            "h-full min-w-0 flex-1 bg-transparent px-3 text-base text-heading placeholder:text-muted focus:outline-none",
            // Curved: the drawing shows the text and the caret; the input still does the work.
            curved && "pointer-events-none text-transparent caret-transparent opacity-0",
          )}
        />
        <button
          type="submit"
          disabled={disabled}
          onFocus={(e) => setButtonFocus(e.currentTarget.matches(":focus-visible"))}
          onBlur={() => setButtonFocus(false)}
          onMouseEnter={() => setButtonHover(true)}
          onMouseLeave={() => setButtonHover(false)}
          className={cn(
            "h-full shrink-0 rounded-sm bg-accent px-5 font-display text-sm text-on-accent hover:bg-accent-hover",
            curved &&
              "pointer-events-auto absolute bg-transparent text-transparent hover:bg-transparent focus-visible:outline-none",
          )}
          style={
            curved && buttonBox
              ? {
                  left: buttonBox.left,
                  top: `calc(${buttonBox.top}px - (${reservedHeight}px - ${height}px) / 2)`,
                  width: buttonBox.width,
                  height: buttonBox.height,
                }
              : undefined
          }
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
