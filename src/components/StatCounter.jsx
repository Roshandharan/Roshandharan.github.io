import { useEffect, useRef, useState } from 'react';

const DURATION = 900;

/**
 * Animated stat counter, ported from main.js's `.num[data-count]` handling:
 * counts up from 0 with a cubic ease-out the first time it scrolls into
 * view, respects prefers-reduced-motion (snaps straight to the target),
 * and only fires once.
 */
export default function StatCounter({ target, label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;

    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let rafId;
    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (prefersReducedMotion) {
            setDisplay(target);
          } else {
            const start = performance.now();
            const step = (now) => {
              const progress = Math.min((now - start) / DURATION, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(Math.round(eased * target));
              if (progress < 1) rafId = requestAnimationFrame(step);
            };
            rafId = requestAnimationFrame(step);
          }
          obs.unobserve(el);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target]);

  return (
    <div className="stat">
      <div className="num" data-count={target} ref={ref}>
        {display}
      </div>
      <div className="label">{label}</div>
    </div>
  );
}
