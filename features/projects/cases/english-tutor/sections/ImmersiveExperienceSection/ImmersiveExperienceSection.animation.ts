import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initImmersiveAnimation() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".immersive-content",
      start: "top 80%",
      end: "top 30%",
      scrub: 1,
    },
  });

  tl.fromTo(
    ".immersive-orb",
    {
      scale: 0.7,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
    },
    0
  );

  tl.fromTo(
    ".immersive-device",
    {
      y: 120,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
    },
    0
  );

  tl.fromTo(
    ".immersive-eyebrow",
    {
      y: 20,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
    },
    0.2
  );

  tl.fromTo(
    ".immersive-title",
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
    },
    0.3
  );

  tl.fromTo(
    ".immersive-description",
    {
      y: 30,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
    },
    0.5
  );
}