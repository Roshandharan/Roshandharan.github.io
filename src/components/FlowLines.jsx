// Ambient decorative graphic for the hero: loose, drifting tendril-like
// strands (smoke / a soft double-helix drift) rather than a geometric
// diagram. Purely visual — aria-hidden, no interaction.
//
// Tunable bits, all in one place:
//   - WIDTH/HEIGHT: the viewBox (aspect ratio of the artwork)
//   - STRANDS: one entry per tendril — centerY/amplitude/period/phase
//     shape its sine-wave drift, width/opacity/color its look. Two
//     strands sharing a centerY with opposite phase (see t3/t4 below)
//     read as a gentle twist around each other, double-helix style,
//     without literally drawing helix rungs.
//   - the <style> block: dash pattern, duration and animation-delay for
//     the two animated strands (`.flow-dash-a` slower, `.flow-dash-b`
//     a little faster) — both slow and staggered so they drift rather
//     than march in lockstep.

const WIDTH = 680;
const HEIGHT = 320;

// Catmull-Rom-through-points → cubic bezier path. Smoothly interpolates
// a curve through every waypoint (unlike a single C command, which only
// bends once), which is what gives each strand its multi-bend, organic
// "drifting" quality instead of a single clean arc.
function smoothPath(points) {
  if (points.length < 2) return '';
  let d = `M ${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return d;
}

// Sample a gentle sine drift into waypoints, then hand them to
// smoothPath — this is what makes each strand its own independent wavy
// path instead of every strand radiating from one shared point.
// (steps bumped from 7 to 9 to keep the larger-amplitude curves below
// smooth rather than under-sampled/faceted-looking.)
function wavePoints({ centerY, amplitude, period, phase, steps = 9 }) {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const x = (WIDTH / steps) * i;
    const y = centerY + amplitude * Math.sin((x / period) * Math.PI * 2 + phase);
    pts.push([Math.round(x * 10) / 10, Math.round(y * 10) / 10]);
  }
  return pts;
}

// centerY values keep the same overall envelope verified against the
// profile photo before (topmost excursion stays at viewBox y=198,
// i.e. the same ~135px clearance below the photo at typical hero
// heights) -- amplitude got much bigger per-strand for a more dramatic
// sweep, so centerY values were redistributed to still fit inside that
// envelope rather than just scaling in place. FlowLines fills its
// container edge-to-edge (see preserveAspectRatio below), and the
// container covers the full hero, so this margin is what actually
// keeps the strands clear of the photo, proportionally, regardless of
// the hero's real pixel height at any given viewport width.
const STRANDS = [
  { id: 't1', centerY: 234, amplitude: 36, period: 260, phase: 0.4, width: 1.15, opacity: 0.38, color: 'var(--border-strong)' },
  { id: 't2', centerY: 258, amplitude: 40, period: 310, phase: 1.7, width: 1.35, opacity: 0.42, color: 'var(--border-strong)' },
  // t3/t4 share a centerY with opposite phase -> they weave across one
  // another for part of their length, reading as a loose double-helix
  // twist rather than two parallel lines.
  {
    id: 't3',
    centerY: 272,
    amplitude: 34,
    period: 240,
    phase: 0,
    width: 1.75,
    opacity: 0.6,
    color: 'var(--accent)',
    dashClass: 'flow-dash-a',
  },
  {
    id: 't4',
    centerY: 272,
    amplitude: 34,
    period: 240,
    phase: Math.PI,
    width: 1.2,
    opacity: 0.48,
    color: 'var(--accent)',
    dashClass: 'flow-dash-b',
  },
  { id: 't5', centerY: 290, amplitude: 26, period: 280, phase: 2.3, width: 1.0, opacity: 0.36, color: 'var(--border-strong)' },
  { id: 't6', centerY: 306, amplitude: 13, period: 250, phase: 0.9, width: 1.4, opacity: 0.4, color: 'var(--border-strong)' },
];

export default function FlowLines({ className }) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      width="100%"
      height="100%"
      // "none" stretches to fill the container exactly rather than
      // uniformly-scaling-and-cropping ("slice"/"meet"). This is an
      // abstract background graphic, not something needing strict
      // aspect preservation -- and "slice" previously cropped
      // unpredictably depending on the container's exact aspect ratio,
      // at one point clipping half the strands out of view entirely.
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <style>{`
        .flow-dash-a, .flow-dash-b {
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        .flow-dash-a {
          stroke-dasharray: 4 15;
          animation-name: flow-dash-move;
          animation-duration: 13s;
          animation-delay: -4s;
        }
        .flow-dash-b {
          stroke-dasharray: 3 11;
          animation-name: flow-dash-move;
          animation-duration: 9s;
          animation-delay: -1.5s;
        }
        @keyframes flow-dash-move {
          to { stroke-dashoffset: -190; }
        }
        @media (prefers-reduced-motion: reduce) {
          .flow-dash-a, .flow-dash-b {
            animation: none;
          }
        }
      `}</style>

      {STRANDS.map((s) => (
        <path
          key={s.id}
          d={smoothPath(wavePoints(s))}
          fill="none"
          stroke={s.color}
          strokeWidth={s.width}
          strokeOpacity={s.opacity}
          strokeLinecap="round"
          className={s.dashClass}
        />
      ))}
    </svg>
  );
}
