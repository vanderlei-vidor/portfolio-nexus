import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function initHeroAnimation() {
  if (prefersReducedMotion()) {
    gsap.set([".hero-atmosphere", ".hero-orb", ".hero-eyebrow", ".hero-line", ".hero-subtitle", ".hero-scroll"], {
      clearProps: "transform",
      opacity: 1,
    });
    return;
  }

  const introTl = gsap.timeline();

  introTl.fromTo(
    ".hero-atmosphere",
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
  );

  introTl.fromTo(
    ".hero-orb",
    { scale: 0.5, opacity: 0, y: 80 },
    { scale: 1, opacity: 1, y: 0, duration: 1, ease: "power4.out" },
    "-=0.8"
  );

  introTl.fromTo(
    ".hero-eyebrow",
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.45 },
    "-=0.35"
  );

  introTl.fromTo(
    ".hero-line",
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: "power3.out" },
    "-=0.3"
  );

  introTl.fromTo(
    ".hero-subtitle",
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.55 },
    "-=0.15"
  );

  introTl.fromTo(
    ".hero-scroll",
    { opacity: 0 },
    { opacity: 1, duration: 0.55 },
    "-=0.15"
  );

  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });

  scrollTl.to(".hero-content", { y: -120, opacity: 0 }, 0);
  scrollTl.to(".hero-orb-wrapper", { scale: 0.82, y: -120, x: -120 }, 0);
  scrollTl.to(".hero-atmosphere", { opacity: 0.25 }, 0);
}
