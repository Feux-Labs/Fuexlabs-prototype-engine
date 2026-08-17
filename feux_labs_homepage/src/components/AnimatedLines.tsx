import "./AnimatedLines.css";

// A handful of long, softly-curved strokes that continuously flow through the
// hero, in the brand's navy/red/blue tones. Pure CSS (stroke-dashoffset +
// drift keyframes) — no animation library, cheap to render, works the same
// server-rendered as it does client-side.
const PATHS = [
  { d: "M -100 120 C 200 40, 500 220, 900 90 S 1400 40, 1700 140", color: "var(--primary)", width: 1.5, dur: "22s", opacity: 0.55, delay: "0s" },
  { d: "M -100 260 C 250 340, 480 120, 820 260 S 1300 340, 1700 220", color: "var(--accent)", width: 1.5, dur: "26s", opacity: 0.4, delay: "-6s" },
  { d: "M -100 40 C 220 160, 560 -20, 950 160 S 1450 260, 1700 60", color: "var(--blue-accent)", width: 1, dur: "30s", opacity: 0.45, delay: "-14s" },
  { d: "M -100 340 C 300 260, 620 380, 980 200 S 1500 100, 1700 320", color: "var(--primary)", width: 1, dur: "34s", opacity: 0.3, delay: "-20s" },
];

export default function AnimatedLines() {
  return (
    <svg
      className="lines-bg"
      viewBox="0 0 1600 380"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {PATHS.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill="none"
          stroke={p.color}
          strokeWidth={p.width}
          strokeLinecap="round"
          className="lines-bg-path"
          style={{
            opacity: p.opacity,
            animationDuration: p.dur,
            animationDelay: p.delay,
          }}
        />
      ))}
    </svg>
  );
}
