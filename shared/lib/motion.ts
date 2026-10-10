export const reducedMotionMediaQuery = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(reducedMotionMediaQuery).matches;
}
