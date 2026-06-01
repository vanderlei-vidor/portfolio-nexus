import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initImpactAnimation() {

  const xp = { value: 0 };

  gsap.to(xp, {
    value: 5308,

    duration: 3,

    ease: "power3.out",

    scrollTrigger: {
      trigger: ".impact-section",
      start: "top 75%",
    },

    onUpdate: () => {
      const el =
        document.querySelector(".xp-impact");

      if (!el) return;

      el.textContent =
        Math.floor(xp.value).toString();
    },
  });

}