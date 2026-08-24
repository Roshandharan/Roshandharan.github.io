import { useEffect } from 'react';

/**
 * Reveal-on-scroll, ported from main.js. Elements are visible by default
 * (the .reveal CSS rule has no starting opacity), and only opt into the
 * fade-in effect once we know JS + IntersectionObserver actually work —
 * so a script error or unsupported browser never leaves the page blank.
 *
 * Re-runs whenever `dep` changes (pass the route pathname) since page
 * content swaps in place instead of triggering a full reload like the
 * static site did.
 */
export default function useRevealOnScroll(containerRef, dep) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;

    const items = Array.from(root.querySelectorAll('.reveal'));
    if (!items.length) return undefined;

    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in'));
      return undefined;
    }

    items.forEach((el) => el.classList.add('pre'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add('in');
        }
      },
      { threshold: 0.12 },
    );
    items.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [containerRef, dep]);
}
