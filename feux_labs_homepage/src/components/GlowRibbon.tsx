import "./GlowRibbon.css";

// A fan of thin parallel curves sweeping from lower-left to upper-right,
// converging near the origin and spreading out toward the end. Each line
// cycles through the brand palette, the whole ribbon slowly swirls
// (rotate + scale) and drifts through a hue-rotate cycle, and a handful of
// the brightest lines carry a glowing dot that travels the full curve on a
// loop (pure SMIL, no client JS). Deterministic pseudo-randomness
// (Math.sin, not Math.random) so server and client render identically.
const LINE_COUNT = 46;
const VB_W = 1000;
const VB_H = 620;
const PALETTE = ["#0F2247", "#C81E3A", "#2C5590", "#5B8DEF"];

function buildLine(i: number, n: number) {
  const t = (i - (n - 1) / 2) / ((n - 1) / 2); // -1 .. 1, 0 = center line
  const wobble = Math.sin(i * 12.9898) * 5;

  const spreadStart = t * 6;
  const spreadMid = t * 65 + wobble;
  const spreadEnd = t * 190 + wobble * 1.4;

  const p0: [number, number] = [-60, 640 + spreadStart];
  const p1: [number, number] = [260, 610 + spreadStart * 1.3];
  const p2: [number, number] = [560, 260 + spreadMid];
  const p3: [number, number] = [760, 190 + spreadMid * 1.05];
  const p4: [number, number] = [970, 70 + spreadEnd * 0.75];
  const p5: [number, number] = [1340, -40 + spreadEnd];

  const d = `M ${p0[0]} ${p0[1]} C ${p1[0]} ${p1[1]}, ${p2[0]} ${p2[1]}, ${p3[0]} ${p3[1]} S ${p4[0]} ${p4[1]}, ${p5[0]} ${p5[1]}`;

  const dist = Math.abs(t);
  const opacity = 0.08 + (1 - dist) * 0.55;
  const width = 0.5 + (1 - dist) * 1.1;
  const color = PALETTE[i % PALETTE.length];

  return { d, opacity, width, color };
}

const LINES = Array.from({ length: LINE_COUNT }, (_, i) => buildLine(i, LINE_COUNT));

// A handful of near-center lines get a traveling spark.
const SPARK_INDICES = [14, 18, 21, 24, 27, 31];
const SPARK_DURS = ["4.5s", "6s", "3.8s", "7.2s", "5.3s", "4.9s"];
const SPARK_DELAYS = ["0s", "-1.5s", "-3s", "-0.7s", "-4.4s", "-2.2s"];

export default function GlowRibbon() {
  return (
    <svg className="ribbon-bg" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <filter id="ribbon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
        <filter id="ribbon-spark-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      <g className="ribbon-swirl">
        <g fill="none" filter="url(#ribbon-glow)">
          {LINES.map((l, i) => (
            <path key={i} d={l.d} stroke={l.color} strokeWidth={l.width} opacity={l.opacity} />
          ))}
        </g>

        {SPARK_INDICES.map((idx, k) => (
          <circle key={idx} r="3.5" fill={LINES[idx].color} filter="url(#ribbon-spark-glow)">
            <animateMotion dur={SPARK_DURS[k]} begin={SPARK_DELAYS[k]} repeatCount="indefinite" path={LINES[idx].d} rotate="auto" />
          </circle>
        ))}
      </g>
    </svg>
  );
}
