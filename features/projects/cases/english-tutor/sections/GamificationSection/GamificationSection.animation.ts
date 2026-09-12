import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function initGamificationAnimation(container: HTMLElement | null) {
  if (!container) return;

  const progressFill = container.querySelector(".progress-fill");

  if (prefersReducedMotion()) {
    gsap.set(progressFill, { width: "68%" });
    return;
  }

  const ctx = gsap.context(() => {
    gsap.fromTo(
      progressFill,
      { width: "0%" },
      {
        width: "68%",
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );
  }, container);

  return () => ctx.revert();
}
