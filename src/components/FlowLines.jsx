import { useEffect, useState } from 'react';

// Ambient decorative graphic spanning the full hero: a double-helix
// pair as the clear focal shape, with a wider spread of looser ambient
// drift lines filling out the whole canvas, plus a traveling glow pulse
// along every strand. Purely visual — aria-hidden, no interaction.
//
// Renders one of two independent configs, chosen at the same 920px
// breakpoint .hero-grid itself stacks at (see useIsMobile below):
//   - DESKTOP: strands flow left-to-right (y varies with x) across a
//     wide, short canvas -- matches the two-column hero layout, where
//     the graphic mostly lives in the open space right of the text.
//   - MOBILE: strands flow top-to-bottom (x varies with y) down a
//     narrow, tall canvas instead. Reusing the desktop's horizontal
//     waves here (just stretched via preserveAspectRatio="none") was
//     tried first and looked broken -- a 680x320 wave design squeezed
//     ~5x taller and ~2x narrower turns into sharp, ugly zigzags. On
//     mobile .hero-grid stacks to one column and text runs nearly
//     edge-to-edge for most of the height, so there's no side column
//     to live in either way -- vertical flow plus the same text-mask
//     legibility approach fits that shape far better.
// Both configs share the same rendering logic and helper functions
// below; only the per-strand geometry and orientation differ.

function useIsMobile(breakpointPx = 920) {
  const query = `(max-width: ${breakpointPx}px)`;
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);
  return isMobile;
}

// Catmull-Rom-through-points → cubic bezier path. Smoothly interpolates
// a curve through every waypoint (unlike a single C command, which only
// bends once), which is what gives each strand its multi-bend, organic
// quality instead of a single clean arc -- and, deliberately, no
// straight-line segments of any kind (no rungs, no straight ties)
// anywhere in this graphic.
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

function sineOffset({ center, amplitude, period, phase }, t) {
  return center + amplitude * Math.sin((t / period) * Math.PI * 2 + phase);
}

// Horizontal flow: sample x from 0..length, y wobbles.
function wavePointsHorizontal(strand, length, steps = 13) {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const x = (length / steps) * i;
    const y = sineOffset({ center: strand.centerY, ...strand }, x);
    pts.push([Math.round(x * 10) / 10, Math.round(y * 10) / 10]);
  }
  return pts;
}

// Vertical flow: sample y from 0..length, x wobbles.
function wavePointsVertical(strand, length, steps = 13) {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const y = (length / steps) * i;
    const x = sineOffset({ center: strand.centerX, ...strand }, y);
    pts.push([Math.round(x * 10) / 10, Math.round(y * 10) / 10]);
  }
  return pts;
}

// Same blue as the "Shashidharan" text in the hero (var(--accent):
// #3d5a80 light theme, #7ba3cc dark theme).
const GLOW_COLOR = 'var(--accent)';

// ---------------------------------------------------------------------
// DESKTOP config
// ---------------------------------------------------------------------

const D_WIDTH = 680;
const D_HEIGHT = 320;

// Foreground text zones, measured via getBoundingClientRect() at a
// 1400px-wide reference viewport (percentages of .hero's own box, which
// is what makes them portable to any viewport width/height given
// preserveAspectRatio="none" maps this viewBox onto that same box):
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
const D_TEXT_ZONES = [
  { x: 0.114, y: 0.12, w: 0.486, h: 0.312 }, // headline cluster
  { x: 0.114, y: 0.457, w: 0.486, h: 0.126 }, // intro paragraph
  { x: 0.114, y: 0.613, w: 0.486, h: 0.243 }, // bullet list
  { x: 0.114, y: 0.877, w: 0.486, h: 0.082 }, // CTA + links
];

// The helix: two strands, identical amplitude/period, opposite phase —
// same wave, mirrored — so they cross at every half-period, evenly
// spaced, which is what actually reads as a twisting helix rather than
// "two wavy lines." Sits in the vertical band below the stats card
// (which ends around viewBox y=226) so its most prominent stretch is
// over fully open canvas, not just under the text-zone mask.
const D_HELIX_A = {
  id: 'helix-a',
  centerY: 255,
  amplitude: 34,
  period: 160,
  phase: 0,
  width: 1.3,
  opacity: 0.62,
  dashClass: 'flow-dash-a',
  pulseDur: 16,
  pulseBegin: 0.3,
};
const D_HELIX_B = {
  id: 'helix-b',
  centerY: 255,
  amplitude: 34,
  period: 160,
  phase: Math.PI,
  width: 1.0,
  opacity: 0.48,
  dashClass: 'flow-dash-b',
  pulseDur: 20,
  pulseBegin: 2.1,
};

// Looser ambient strands, spread across the FULL vertical range of the
// canvas (not confined to one band) -- legibility is the mask's job,
// not positional avoidance. Well below the helix's opacity/weight so it
// reads clearly as background atmosphere rather than competing with the
// helix as a second subject. pulseDur/pulseBegin are hand-varied (not a
// single formula) so the glow pulses launch at different, non-repeating
// moments -- closer to a heartbeat than a synchronized wave.
const D_AMBIENT = [
  { id: 'a1', centerY: 26, amplitude: 13, period: 260, phase: 0.2, width: 0.65, opacity: 0.18, pulseDur: 14, pulseBegin: 0.8 },
  { id: 'a2', centerY: 62, amplitude: 17, period: 300, phase: 1.4, width: 0.7, opacity: 0.16, pulseDur: 17, pulseBegin: 3.5 },
  { id: 'a3', centerY: 96, amplitude: 12, period: 230, phase: 2.6, width: 0.75, opacity: 0.2, pulseDur: 22, pulseBegin: 1.2 },
  { id: 'a4', centerY: 132, amplitude: 19, period: 310, phase: 0.8, width: 0.7, opacity: 0.17, pulseDur: 15, pulseBegin: 5.0 },
  { id: 'a5', centerY: 168, amplitude: 22, period: 280, phase: 2.0, width: 0.85, opacity: 0.18, pulseDur: 19, pulseBegin: 0.1 },
  { id: 'a6', centerY: 186, amplitude: 15, period: 270, phase: 3.4, width: 0.7, opacity: 0.19, pulseDur: 13, pulseBegin: 2.8 },
  { id: 'a7', centerY: 210, amplitude: 15, period: 240, phase: 0.5, width: 0.7, opacity: 0.22, pulseDur: 21, pulseBegin: 4.4 },
  { id: 'a8', centerY: 225, amplitude: 20, period: 300, phase: 2.4, width: 0.75, opacity: 0.2, pulseDur: 16, pulseBegin: 1.9 },
  { id: 'a9', centerY: 295, amplitude: 22, period: 270, phase: 1.1, width: 0.7, opacity: 0.24, pulseDur: 18, pulseBegin: 3.0 },
  { id: 'a10', centerY: 312, amplitude: 8, period: 220, phase: 3.0, width: 0.85, opacity: 0.2, pulseDur: 14, pulseBegin: 6.0 },
  { id: 'a11', centerY: 46, amplitude: 9, period: 340, phase: 1.9, width: 0.65, opacity: 0.15, pulseDur: 20, pulseBegin: 0.6 },
];

// ---------------------------------------------------------------------
// MOBILE config -- same visual language, vertical orientation, fewer
// strands (smaller screen, and fewer simultaneous SMIL animations is
// friendlier to phone battery/perf).
// ---------------------------------------------------------------------

const M_WIDTH = 340;
const M_HEIGHT = 1500;

// Measured via getBoundingClientRect() at a 390px-wide reference
// viewport, once .hero-grid has stacked to one column: text now runs
// nearly edge-to-edge (left/right ~5.6%/94.4%) for almost the entire
// height, with the photo/stats card (opaque, no mask needed, same
// reasoning as desktop) below the text rather than beside it.
const M_TEXT_ZONES = [
  { x: 0.056, y: 0.062, w: 0.888, h: 0.158 }, // headline cluster
  { x: 0.056, y: 0.233, w: 0.888, h: 0.129 }, // intro paragraph
  { x: 0.056, y: 0.378, w: 0.888, h: 0.194 }, // bullet list
  { x: 0.056, y: 0.583, w: 0.888, h: 0.041 }, // CTA + links
];

const M_HELIX_A = {
  id: 'helix-a',
  centerX: 170,
  amplitude: 65,
  period: 280,
  phase: 0,
  width: 2.2,
  opacity: 0.62,
  dashClass: 'flow-dash-a-mobile',
  pulseDur: 16,
  pulseBegin: 0.3,
};
const M_HELIX_B = {
  id: 'helix-b',
  centerX: 170,
  amplitude: 65,
  period: 280,
  phase: Math.PI,
  width: 1.7,
  opacity: 0.48,
  dashClass: 'flow-dash-b-mobile',
  pulseDur: 20,
  pulseBegin: 2.1,
};

const M_AMBIENT = [
  { id: 'm1', centerX: 45, amplitude: 25, period: 380, phase: 0.3, width: 1.3, opacity: 0.2, pulseDur: 15, pulseBegin: 1.0 },
  { id: 'm2', centerX: 100, amplitude: 30, period: 340, phase: 1.8, width: 1.3, opacity: 0.18, pulseDur: 19, pulseBegin: 4.0 },
  { id: 'm3', centerX: 235, amplitude: 28, period: 400, phase: 2.6, width: 1.3, opacity: 0.22, pulseDur: 13, pulseBegin: 2.0 },
  { id: 'm4', centerX: 295, amplitude: 20, period: 360, phase: 1.0, width: 1.3, opacity: 0.19, pulseDur: 21, pulseBegin: 6.0 },
  { id: 'm5', centerX: 170, amplitude: 45, period: 460, phase: 3.2, width: 1.4, opacity: 0.2, pulseDur: 17, pulseBegin: 0.5 },
];

export default function FlowLines({ className }) {
  const isMobile = useIsMobile();

  const WIDTH = isMobile ? M_WIDTH : D_WIDTH;
  const HEIGHT = isMobile ? M_HEIGHT : D_HEIGHT;
  const TEXT_ZONES = (isMobile ? M_TEXT_ZONES : D_TEXT_ZONES).map((z) => ({
    x: z.x * WIDTH,
    y: z.y * HEIGHT,
    w: z.w * WIDTH,
    h: z.h * HEIGHT,
  }));
  const helixA = isMobile ? M_HELIX_A : D_HELIX_A;
  const helixB = isMobile ? M_HELIX_B : D_HELIX_B;
  const ambient = isMobile ? M_AMBIENT : D_AMBIENT;
  const allStrands = [...ambient, helixA, helixB];
  const wavePoints = isMobile ? wavePointsVertical : wavePointsHorizontal;
  // Mask-zone blur: mobile's zones are far taller (in viewBox units)
  // than they are wide relative to desktop's, so a single symmetric
  // blur radius either over-softens the width or under-softens the
  // height. feGaussianBlur takes independent x/y deviations.
  const zoneBlur = isMobile ? '14 55' : '16';

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
          <feGaussianBlur stdDeviation={zoneBlur} />
        </filter>
        <mask id="flowTextMask" maskUnits="userSpaceOnUse" x="0" y="0" width={WIDTH} height={HEIGHT}>
          {/* White = fully visible everywhere by default... */}
          <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="#fff" />
          {/* ...dark gray = dropped to ~16% opacity under measured text
              zones, blurred so the drop-off is a soft gradient. */}
          {TEXT_ZONES.map((z, i) => (
            <rect key={i} x={z.x} y={z.y} width={z.w} height={z.h} fill="#282828" filter="url(#flowZoneSoften)" />
          ))}
        </mask>
        {/* Glow: two blur radii (a wide soft halo + a tighter inner
            glow) merged underneath the sharp original -- this is what
            actually reads as "glowing" rather than just a faint blur. */}
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
        .flow-dash-a, .flow-dash-b, .flow-dash-a-mobile, .flow-dash-b-mobile {
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        /* dash > gap on all four: the stroke stays mostly "on" along
           its length, so it still reads as a coherent curve, while the
           animated offset makes that dash texture visibly travel. Each
           animation's target dashoffset is an exact multiple of its
           own dash+gap sum so the loop has no visible seam/jump when
           it restarts. Mobile's dasharray/offsets are the desktop
           values scaled by M_HEIGHT/D_HEIGHT (~4.7x), since the helix
           path length there is height- rather than width-driven. */
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
        .flow-dash-a-mobile {
          stroke-dasharray: 120 55;
          animation-name: flow-dash-move-a-mobile;
          animation-duration: 6s;
          animation-delay: -2s;
        }
        .flow-dash-b-mobile {
          stroke-dasharray: 95 42;
          animation-name: flow-dash-move-b-mobile;
          animation-duration: 4.5s;
          animation-delay: -1s;
        }
        @keyframes flow-dash-move-a-mobile {
          to { stroke-dashoffset: -875; }
        }
        @keyframes flow-dash-move-b-mobile {
          to { stroke-dashoffset: -685; }
        }
        @media (prefers-reduced-motion: reduce) {
          .flow-dash-a, .flow-dash-b, .flow-dash-a-mobile, .flow-dash-b-mobile {
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
        {/* This inner group carries the ambient opacity. It used to
            live as a blanket opacity on the whole SVG, which also
            crushed the glow dots below to ~0.4x their already-low
            alpha, making them all but invisible regardless of color.
            Only the static line strokes should read as faint
            background; the glow needs full, undimmed opacity to pop. */}
        <g opacity="0.4">
          {ambient.map((s) => (
            <path
              key={s.id}
              id={`flow-path-${s.id}`}
              d={smoothPath(wavePoints(s, isMobile ? HEIGHT : WIDTH))}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={s.width}
              strokeOpacity={s.opacity}
              strokeLinecap="round"
            />
          ))}

          {[helixA, helixB].map((s) => (
            <path
              key={s.id}
              id={`flow-path-${s.id}`}
              d={smoothPath(wavePoints(s, isMobile ? HEIGHT : WIDTH))}
              fill="none"
              stroke="var(--accent)"
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
            per strand keep the pulses reading as intermittent/
            asynchronous rather than one synchronized wave. The base
            stroke drawn above is unaffected -- this is a purely
            additive highlight on top of it.

            calcMode="linear" + keyPoints/keyTimes="0;1" forces truly
            constant speed along the path's actual arc length. Without
            this, the dot visibly sped up and slowed down as it moved --
            each path is built from bezier segments spaced evenly along
            one axis (see wavePoints), but a segment crossing a steep
            part of the sine wave covers more arc length than one
            crossing a flat part, so without explicit distance-based
            pacing the dot "raced" through the flatter stretches.
            keyPoints are fractions of total path length by spec, so
            pairing them linearly with keyTimes is the standard fix for
            even, gliding motion regardless of how the curve bends. */}
        {allStrands.map((s) => (
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
