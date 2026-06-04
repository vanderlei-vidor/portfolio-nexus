"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./DesignPhilosophy.css";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    title: "Motion",
    description: "Movement guides attention and creates natural digital experiences.",
  },
  {
    title: "Clarity",
    description: "Complex systems should feel intuitive, simple and effortless.",
  },
  {
    title: "Performance",
    description: "Speed is not a feature. It is part of the experience.",
  },
  {
    title: "Details",
    description: "Small interactions create memorable moments.",
  },
  {
    title: "Craftsmanship",
    description: "Every pixel deserves intention, precision and care.",
  },
];

const constellationStars = Array.from({ length: 30 }, (_, index) => {
  const seed = index + 1;

  return {
    left: `${((Math.sin(seed * 12.9898) * 43758.5453) % 1 + 1) % 1 * 100}%`,
    top: `${((Math.sin(seed * 78.233) * 24634.6345) % 1 + 1) % 1 * 100}%`,
    animationDelay: `${(((Math.sin(seed * 37.719) * 991.17) % 1 + 1) % 1 * 5).toFixed(2)}s`,
  };
});

export default function DesignPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);

  // Mouse tracking para o efeito de "Spotlight"
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      section.style.setProperty("--mouse-x", `${x}px`);
      section.style.setProperty("--mouse-y", `${y}px`);
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Cards aparecendo um por um (Stagger)
      gsap.from(".philosophy-card", {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // 2. Linha luminosa desenhando no scroll
      gsap.to(".connection-path", {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 1,
        },
      });

      // 3. Números gigantes com Parallax
      gsap.utils.toArray<HTMLElement>(".giant-number").forEach((num, i) => {
        gsap.to(num, {
          y: (i % 2 === 0 ? -80 : 80), // Direções opostas para profundidade
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // 4. Constelações com Parallax suave
      gsap.to(".constellation-layer", {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // 5. Manifesto aparecendo linha por linha
      const manifestoLines = manifestoRef.current?.querySelectorAll(".manifesto-line");
      if (manifestoLines) {
        gsap.from(manifestoLines, {
          y: 40,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="design-philosophy" ref={sectionRef}>
      {/* Background Layers */}
      <div className="design-philosophy__bg-gradient" />
      <div className="constellation-layer">
        {constellationStars.map((star, i) => (
          <span
            key={i}
            className="constellation-star"
            style={star}
          />
        ))}
      </div>

      {/* Números Gigantes em Background (Parallax) */}
      <div className="giant-number gn-1">01</div>
      <div className="giant-number gn-2">03</div>
      <div className="giant-number gn-3">05</div>

      {/* SVG Linha Luminosa Conectando os Princípios */}
      <svg className="connection-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          className="connection-path"
          d="M 50,0 L 50,20 L 20,20 L 20,40 L 80,40 L 80,60 L 30,60 L 30,80 L 70,80 L 70,100"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="0.3"
          strokeDasharray="100"
          strokeDashoffset="100"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="80%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      <div className="design-philosophy__container">
        <span className="design-philosophy__label">
          <span className="label-dot" />
          DESIGN PHILOSOPHY
        </span>

        <h2 className="design-philosophy__title">
          Crafted
          <br />
          <span className="title-gradient">With Purpose.</span>
        </h2>

        <p className="design-philosophy__description">
          Every interaction, animation and detail exists for a reason.
          <br />
          Design is not decoration. It is how products communicate, guide and inspire.
        </p>

        <div className="design-philosophy__grid" ref={gridRef}>
          {principles.map((principle, index) => (
            <article
              key={principle.title}
              className="philosophy-card"
              style={{ "--card-index": index } as React.CSSProperties}
            >
              <div className="card-glow" />
              <span className="philosophy-card__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>

        <div className="design-philosophy__manifesto" ref={manifestoRef}>
          <span className="manifesto-line">Beautiful products are not created by accident.</span>
          <strong className="manifesto-line manifesto-strong">
            They are crafted with purpose.
          </strong>
        </div>
      </div>
    </section>
  );
}
