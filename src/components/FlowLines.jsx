// Ambient decorative graphic spanning the full hero: a double-helix
// pair as the clear focal shape, with a wider spread of looser ambient
// drift lines filling out the whole canvas, plus a traveling glow pulse
// along every strand. Purely visual — aria-hidden, no interaction.
//
// Tunable bits, all in one place:
//   - WIDTH/HEIGHT: the viewBox (aspect ratio of the artwork)
//   - TEXT_ZONES: measured foreground text regions (see comment below)
//     that every strand (and its glow) gets dimmed under, via an SVG
//     mask, rather than routed around -- with this many strands
//     spanning the full hero there's no single "safe" band left.
//   - HELIX: the two focal strands.
//   - AMBIENT: the looser background strands, spread across the full
//     vertical range. All strands (helix + ambient) are now a single
//     color, var(--accent) -- the same blue as the "Shashidharan" text
//     in the hero -- varying only in opacity/width for depth.
//   - pulseDur/pulseBegin on every strand: duration and stagger for its
//     traveling glow dot (see the <animateMotion>/<mpath> block below).
//   - the <style> block: dash pattern/duration for the two animated
//     helix strands, plus the reduced-motion override for both the dash
//     animation and the glow pulses.

const WIDTH = 680;
const HEIGHT = 320;

// Catmull-Rom-through-points → cubic bezier path. Smoothly interpolates
// a curve through every waypoint (unlike a single C command, which only
// bends once), which is what gives each strand its multi-bend, organic
// quality instead of a single clean arc.
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

function sineY({ centerY, amplitude, period, phase }, x) {
  return centerY + amplitude * Math.sin((x / period) * Math.PI * 2 + phase);
}

// Sample a sine drift into waypoints, then hand them to smoothPath.
function wavePoints(strand, steps = 13) {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const x = (WIDTH / steps) * i;
    pts.push([Math.round(x * 10) / 10, Math.round(sineY(strand, x) * 10) / 10]);
  }
  return pts;
}

// Foreground text zones, measured via getBoundingClientRect() at a
// 1400px-wide reference viewport (percentages of .hero's own box, which
// is what makes them portable to any viewport width/height given
// preserveAspectRatio="none" below maps this viewBox onto that same
// box):
//   headline cluster (kicker+h1+lead+meta): x 11.4-60.0%, y 12.0-43.2%
//   intro paragraph (.hero-summary):        x 11.4-60.0%, y 45.7-58.3%
//   "what I'm building" bullet list:        x 11.4-60.0%, y 61.3-85.6%
//   CTA button + social links:              x 11.4-60.0%, y 87.7-95.9%
// The profile photo and stats card are NOT in this list: they're
// opaque, sitting in the z-index:1 layer above this graphic, so
// anything behind them is already fully hidden structurally -- no mask
// needed there. Same for the skill-pills row below: it's a separate
// section outside .hero entirely, and .hero's own overflow:hidden means
// this graphic physically cannot reach it.
const TEXT_ZONES = [
  { x: 0.114, y: 0.12, w: 0.486, h: 0.312 }, // headline cluster
  { x: 0.114, y: 0.457, w: 0.486, h: 0.126 }, // intro paragraph
  { x: 0.114, y: 0.613, w: 0.486, h: 0.243 }, // bullet list
  { x: 0.114, y: 0.877, w: 0.486, h: 0.082 }, // CTA + links
].map((z) => ({
  x: z.x * WIDTH,
  y: z.y * HEIGHT,
  w: z.w * WIDTH,
  h: z.h * HEIGHT,
}));

// The helix: two strands, identical amplitude/period, opposite phase —
// same wave, mirrored — so they cross at every half-period, evenly
// spaced, which is what actually reads as a twisting helix rather than
// "two wavy lines." Sits in the vertical band below the stats card
// (which ends around viewBox y=226) so its most prominent stretch is
// over fully open canvas, not just under the text-zone mask.
const HELIX_CENTER_Y = 255;
const HELIX_AMPLITUDE = 34;
const HELIX_PERIOD = 160;

// The flowing dash animation lives HERE, on the helix strands
// themselves -- not on the ambient lines -- because the whole point is
// for the focal shape to visibly move. dash > gap on both, so the
// curve still reads as a mostly-continuous line while the animated
// offset makes that texture visibly travel.
const helixA = {
  id: 'helix-a',
  centerY: HELIX_CENTER_Y,
  amplitude: HELIX_AMPLITUDE,
  period: HELIX_PERIOD,
  phase: 0,
  width: 1.3,
  opacity: 0.62,
  color: 'var(--accent)',
  dashClass: 'flow-dash-a',
  pulseDur: 16,
  pulseBegin: 0.3,
};
const helixB = {
  id: 'helix-b',
  centerY: HELIX_CENTER_Y,
  amplitude: HELIX_AMPLITUDE,
  period: HELIX_PERIOD,
  phase: Math.PI,
  width: 1.0,
  opacity: 0.48,
  color: 'var(--accent)',
  dashClass: 'flow-dash-b',
  pulseDur: 20,
  pulseBegin: 2.1,
};

// DNA-style "rungs": short strokes connecting the two helix strands at
// evenly spaced x positions (not just at their crossing points, where
// a rung would have zero length) — the varying rung length as it
// shrinks toward each crossing and widens at each maximum spread is
// what sells the twisting-ladder read.
const RUNG_COUNT = 9;
const rungs = Array.from({ length: RUNG_COUNT + 1 }, (_, i) => {
  const x = (WIDTH / RUNG_COUNT) * i;
  return { x, y1: sineY(helixA, x), y2: sineY(helixB, x) };
});

// Looser ambient strands, spread across the FULL vertical range of the
// canvas (not confined to one band) -- legibility is the mask's job
// now, not positional avoidance. Well below the helix's opacity/weight
// so it reads clearly as background atmosphere rather than competing
// with the helix as a second subject. Same var(--accent) color as the
// helix now -- only opacity/width vary, for depth.
// pulseDur/pulseBegin are hand-varied (not a single formula) so the
// glow pulses launch at different, non-repeating-looking moments —
// closer to a heartbeat/circulation rhythm than a synchronized wave.
const AMBIENT = [
  { id: 'a1', centerY: 26, amplitude: 13, period: 260, phase: 0.2, width: 0.65, opacity: 0.18, color: 'var(--accent)', pulseDur: 14, pulseBegin: 0.8 },
  { id: 'a2', centerY: 62, amplitude: 17, period: 300, phase: 1.4, width: 0.7, opacity: 0.16, color: 'var(--accent)', pulseDur: 17, pulseBegin: 3.5 },
  { id: 'a3', centerY: 96, amplitude: 12, period: 230, phase: 2.6, width: 0.75, opacity: 0.2, color: 'var(--accent)', pulseDur: 22, pulseBegin: 1.2 },
  { id: 'a4', centerY: 132, amplitude: 19, period: 310, phase: 0.8, width: 0.7, opacity: 0.17, color: 'var(--accent)', pulseDur: 15, pulseBegin: 5.0 },
  { id: 'a5', centerY: 168, amplitude: 22, period: 280, phase: 2.0, width: 0.85, opacity: 0.18, color: 'var(--accent)', pulseDur: 19, pulseBegin: 0.1 },
  { id: 'a6', centerY: 186, amplitude: 15, period: 270, phase: 3.4, width: 0.7, opacity: 0.19, color: 'var(--accent)', pulseDur: 13, pulseBegin: 2.8 },
  { id: 'a7', centerY: 210, amplitude: 15, period: 240, phase: 0.5, width: 0.7, opacity: 0.22, color: 'var(--accent)', pulseDur: 21, pulseBegin: 4.4 },
  { id: 'a8', centerY: 225, amplitude: 20, period: 300, phase: 2.4, width: 0.75, opacity: 0.2, color: 'var(--accent)', pulseDur: 16, pulseBegin: 1.9 },
  { id: 'a9', centerY: 295, amplitude: 22, period: 270, phase: 1.1, width: 0.7, opacity: 0.24, color: 'var(--accent)', pulseDur: 18, pulseBegin: 3.0 },
  { id: 'a10', centerY: 312, amplitude: 8, period: 220, phase: 3.0, width: 0.85, opacity: 0.2, color: 'var(--accent)', pulseDur: 14, pulseBegin: 6.0 },
  { id: 'a11', centerY: 46, amplitude: 9, period: 340, phase: 1.9, width: 0.65, opacity: 0.15, color: 'var(--accent)', pulseDur: 20, pulseBegin: 0.6 },
];

const ALL_STRANDS = [...AMBIENT, helixA, helixB];

// Same blue as the "Shashidharan" text in the hero (var(--accent):
// #3d5a80 light theme, #7ba3cc dark theme). Now that the glow renders
// at full, undimmed opacity (see the inner <g opacity="0.4"> below,
// which used to be a blanket opacity on the whole SVG including this
// dot), this reads clearly rather than washing out.
const GLOW_COLOR = 'var(--accent)';

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
      // aspect preservation -- and it's what makes the TEXT_ZONES
      // percentages above line up correctly regardless of the hero's
      // actual pixel dimensions at a given viewport width.
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Softens the mask zones' edges so strands fade out gradually
            approaching a text block instead of hitting a hard cutoff. */}
        <filter id="flowZoneSoften" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <mask id="flowTextMask" maskUnits="userSpaceOnUse" x="0" y="0" width={WIDTH} height={HEIGHT}>
          {/* White = fully visible everywhere by default... */}
          <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="#fff" />
          {/* ...dark gray = dropped to ~16% opacity under measured text
              zones, blurred so the drop-off is a soft gradient. */}
          {TEXT_ZONES.map((z, i) => (
            <rect
              key={i}
              x={z.x}
              y={z.y}
              width={z.w}
              height={z.h}
              fill="#282828"
              filter="url(#flowZoneSoften)"
            />
          ))}
        </mask>
        {/* Glow: two blur radii (a wide soft halo + a tighter inner
            glow) merged underneath the sharp original -- this is what
            actually reads as "glowing" rather than just a faint blur.
            The color is whatever the circle's fill is (GLOW_COLOR
            below), so the halo itself is unmistakably blue, not just
            the core. Sized down to match the smaller dot. */}
        <filter id="flowGlowBlur" x="-600%" y="-600%" width="1300%" height="1300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.6" result="outerGlow" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="innerGlow" />
          <feMerge>
            <feMergeNode in="outerGlow" />
            <feMergeNode in="innerGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <style>{`
        .flow-dash-a, .flow-dash-b {
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        /* dash > gap on both: the stroke stays mostly "on" along its
           length, so it still reads as a coherent curve, while the
           animated offset makes that dash texture visibly travel.
           Each animation's target dashoffset is an exact multiple of
           its own dash+gap sum (38 and 29) so the loop has no visible
           seam/jump when it restarts. */
        .flow-dash-a {
          stroke-dasharray: 26 12;
          animation-name: flow-dash-move-a;
          animation-duration: 6s;
          animation-delay: -2s;
        }
        .flow-dash-b {
          stroke-dasharray: 20 9;
          animation-name: flow-dash-move-b;
          animation-duration: 4.5s;
          animation-delay: -1s;
        }
        @keyframes flow-dash-move-a {
          to { stroke-dashoffset: -190; }
        }
        @keyframes flow-dash-move-b {
          to { stroke-dashoffset: -145; }
        }
        @media (prefers-reduced-motion: reduce) {
          .flow-dash-a, .flow-dash-b {
            animation: none;
          }
          /* The base strand lines stay visible -- only the traveling
             glow dots (and their SMIL <animateMotion>) are hidden. */
          .flow-glow {
            display: none;
          }
        }
      `}</style>

      <g mask="url(#flowTextMask)">
        {/* This inner group carries the ambient opacity (moved in from
            .hero-flow's CSS opacity, which used to apply to the WHOLE
            svg -- including the glow dots below, crushing them to
            ~0.4x their already-low alpha and making them all but
            invisible regardless of color). Only the static line
            strokes should read as faint background; the glow needs
            its full, undimmed opacity to actually pop. */}
        <g opacity="0.4">
          {AMBIENT.map((s) => (
            <path
              key={s.id}
              id={`flow-path-${s.id}`}
              d={smoothPath(wavePoints(s))}
              fill="none"
              stroke={s.color}
              strokeWidth={s.width}
              strokeOpacity={s.opacity}
              strokeLinecap="round"
            />
          ))}

          {rungs.map((r, i) => (
            <line
              key={`rung-${i}`}
              x1={r.x}
              y1={r.y1}
              x2={r.x}
              y2={r.y2}
              stroke="var(--accent)"
              strokeWidth="1"
              strokeOpacity="0.18"
              strokeLinecap="round"
            />
          ))}

          {[helixA, helixB].map((s) => (
            <path
              key={s.id}
              id={`flow-path-${s.id}`}
              d={smoothPath(wavePoints(s))}
              fill="none"
              stroke={s.color}
              strokeWidth={s.width}
              strokeOpacity={s.opacity}
              strokeLinecap="round"
              className={s.dashClass}
            />
          ))}
        </g>

        {/* Traveling glow pulse per strand: a small blurred dot whose
            <animateMotion> follows that exact strand's path via <mpath>,
            so it precisely traces the curve instead of moving in a
            straight line. Staggered pulseBegin times + varied pulseDur
            per strand (see ALL_STRANDS above) keep the pulses reading
            as intermittent/asynchronous rather than one synchronized
            wave. The base stroke drawn above is unaffected -- this is a
            purely additive highlight on top of it.

            calcMode="linear" + keyPoints/keyTimes="0;1" forces truly
            constant speed along the path's actual arc length. Without
            this, the dot visibly sped up and slowed down as it moved --
            each path is built from bezier segments spaced evenly in x
            (see wavePoints), but a segment crossing a steep part of the
            sine wave covers more arc length than one crossing a flat
            part, so without an explicit distance-based pacing the dot
            "raced" through the flatter stretches. keyPoints are
            fractions of total path length by spec, so pairing them
            linearly with keyTimes is the standard fix for even, gliding
            motion regardless of how the underlying curve bends. */}
        {ALL_STRANDS.map((s) => (
          <circle key={`glow-${s.id}`} r="1.4" fill={GLOW_COLOR} opacity="1" filter="url(#flowGlowBlur)" className="flow-glow">
            <animateMotion
              dur={`${s.pulseDur}s`}
              begin={`${s.pulseBegin}s`}
              repeatCount="indefinite"
              calcMode="linear"
              keyPoints="0;1"
              keyTimes="0;1"
            >
              <mpath href={`#flow-path-${s.id}`} xlinkHref={`#flow-path-${s.id}`} />
            </animateMotion>
          </circle>
        ))}
      </g>
    </svg>
  );
}
