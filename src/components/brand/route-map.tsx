import { BoatMark } from "./boat-mark";

/**
 * Illustrated route from the original logo: Houay Xai → Pak Beng → Luang Prabang.
 * The river draws itself once on load (skipped when the visitor prefers reduced motion).
 */
export function RouteMap({ className }: { className?: string }) {
  return (
    <figure className={className}>
      <svg
        viewBox="0 0 640 420"
        role="img"
        aria-labelledby="route-map-title"
        className="h-auto w-full overflow-visible"
      >
        <title id="route-map-title">
          Route map: the Mekong from Houay Xai, overnight in Pak Beng, to Luang Prabang
        </title>

        {/* Hills */}
        <g aria-hidden="true">
          <defs>
            <linearGradient id="hill-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="hill-mask">
              <rect x="0" y="40" width="640" height="230" fill="url(#hill-fade)" />
            </mask>
          </defs>
          <g mask="url(#hill-mask)">
            <path
              d="M230 200 L320 96 L384 150 L452 72 L548 160 L640 108 V280 H230Z"
              className="fill-surface-tint"
            />
            <path
              d="M290 230 L366 156 L428 206 L500 134 L584 210 L640 176 V290 H290Z"
              className="fill-line"
            />
          </g>
          <circle
            cx="566"
            cy="58"
            r="26"
            className="fill-surface stroke-line-strong"
            strokeWidth="2"
          />
        </g>

        {/* River: wide soft bank + the drawn line */}
        <path
          d="M70 60 C110 100 50 140 100 175 S150 250 130 280 S220 340 300 330 C360 322 400 300 450 305 S540 300 570 240"
          className="stroke-surface-tint"
          strokeWidth="26"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M70 60 C110 100 50 140 100 175 S150 250 130 280 S220 340 300 330 C360 322 400 300 450 305 S540 300 570 240"
          pathLength={1}
          strokeDasharray="1"
          className="animate-draw stroke-primary"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Boat on day two */}
        <g transform="translate(362 290) rotate(-6)" className="text-heading" aria-hidden="true">
          <BoatMark width="100" height="16" strokeWidth="5" />
        </g>

        {/* Stops */}
        <g className="font-display" aria-hidden="true">
          <Stop x={70} y={60} label="Houay Xai" sub="Day 1 · board" dx={22} dy={8} />
          <Stop x={300} y={330} label="Pak Beng" sub="Overnight" dx={-48} dy={54} />
          <Stop x={570} y={240} label="Luang Prabang" sub="Day 2 · arrive" dx={-196} dy={-44} />
        </g>
      </svg>
    </figure>
  );
}

function Stop({
  x,
  y,
  label,
  sub,
  dx,
  dy,
}: {
  x: number;
  y: number;
  label: string;
  sub: string;
  dx: number;
  dy: number;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" className="fill-surface stroke-accent" strokeWidth="3" />
      <circle cx={x} cy={y} r="4" className="fill-accent" />
      <text x={x + dx} y={y + dy} className="fill-heading stroke-canvas stroke-8 text-3xl halo">
        {label}
      </text>
      <text
        x={x + dx}
        y={y + dy + 24}
        className="fill-muted stroke-canvas stroke-6 font-sans text-base tracking-eyebrow uppercase halo"
      >
        {sub}
      </text>
    </g>
  );
}
