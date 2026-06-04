"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  hue: number;
};

const createParticle = (width: number, height: number, index: number): Particle => {
  const lane = index * 97.31;

  return {
    x: (Math.sin(lane) * 0.5 + 0.5) * width,
    y: (Math.cos(lane * 1.37) * 0.5 + 0.5) * height,
    vx: Math.sin(lane * 0.73) * 0.18,
    vy: -0.18 - (index % 7) * 0.035,
    size: 0.8 + (index % 5) * 0.35,
    alpha: 0.18 + (index % 6) * 0.045,
    hue: index % 3 === 0 ? 190 : index % 3 === 1 ? 160 : 220,
  };
};

export default function EcosystemCinematicDirector() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const transitionLayer = transitionRef.current;
    const root = canvas?.closest<HTMLElement>(".ecosystem");

    if (!canvas || !transitionLayer || !root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    let rafId = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let pointerRaf = 0;

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 768 ? 34 : 76;
      particles = Array.from({ length: count }, (_, index) => createParticle(width, height, index));
    };

    const draw = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.y < -12) particle.y = height + 12;
        if (particle.x < -12) particle.x = width + 12;
        if (particle.x > width + 12) particle.x = -12;

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 8
        );

        gradient.addColorStop(0, `hsla(${particle.hue}, 95%, 72%, ${particle.alpha})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 95%, 72%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 8, 0, Math.PI * 2);
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    };

    const updateLight = (event: PointerEvent) => {
      if (pointerRaf) return;

      pointerRaf = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth) * 100;
        const y = (event.clientY / window.innerHeight) * 100;

        root.style.setProperty("--ecosystem-light-x", `${x.toFixed(2)}%`);
        root.style.setProperty("--ecosystem-light-y", `${y.toFixed(2)}%`);
        pointerRaf = 0;
      });
    };

    const gsapContext = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(":scope > section"));

      sections.forEach((section, index) => {
        section.dataset.ecosystemScene = String(index + 1);

        gsap.fromTo(
          section,
          { autoAlpha: 0.58, y: 72, filter: "blur(14px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              end: "top 28%",
              scrub: 0.85,
            },
          }
        );

        ScrollTrigger.create({
          trigger: section,
          start: "top 58%",
          end: "bottom 42%",
          onEnter: () => root.style.setProperty("--ecosystem-scene", String(index + 1)),
          onEnterBack: () => root.style.setProperty("--ecosystem-scene", String(index + 1)),
        });

        if (!reduceMotion) {
          gsap.to(section, {
            "--scene-depth": index % 2 === 0 ? "34px" : "-24px",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      const parallaxTargets = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll(
          [
            ".ecosystem-container",
            ".connected-worlds__container",
            ".ecosystem-map",
            ".control-console",
            ".engineering-dna__stage",
            ".future-vision__orb",
            ".final-cta__content",
          ].join(",")
        )
      );

      parallaxTargets.forEach((target, index) => {
        gsap.to(target, {
          yPercent: index % 2 === 0 ? -6 : -3,
          ease: "none",
          scrollTrigger: {
            trigger: target,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.15,
          },
        });
      });

      gsap.to(transitionLayer, {
        opacity: 0.72,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, root);

    setCanvasSize();

    if (!reduceMotion) {
      draw();
      window.addEventListener("pointermove", updateLight, { passive: true });
    }

    window.addEventListener("resize", setCanvasSize, { passive: true });
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(pointerRaf);
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("pointermove", updateLight);
      gsapContext.revert();
    };
  }, []);

  return (
    <div className="ecosystem-cinematic-director" aria-hidden="true">
      <canvas ref={canvasRef} className="ecosystem-cinematic-director__particles" />
      <div ref={transitionRef} className="ecosystem-cinematic-director__transition" />
      <div className="ecosystem-cinematic-director__light" />
      <div className="ecosystem-cinematic-director__vignette" />
    </div>
  );
}
