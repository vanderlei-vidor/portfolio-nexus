"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FutureVision.css";

gsap.registerPlugin(ScrollTrigger);

const orbitItems = [
  "Artificial Intelligence",
  "Cloud Systems",
  "Automation",
  "Mobile Experiences",
  "Design Systems",
  "Data Platforms",
  "Product Innovation",
];

const futureStars = Array.from({ length: 60 }, (_, index) => {
  const seed = index + 1;

  return {
    left: `${((Math.sin(seed * 9.137) * 37191.91) % 1 + 1) % 1 * 100}%`,
    top: `${((Math.sin(seed * 41.711) * 15487.37) % 1 + 1) % 1 * 100}%`,
    animationDelay: `${(((Math.sin(seed * 17.13) * 711.7) % 1 + 1) % 1 * 4).toFixed(2)}s`,
  };
});

export default function FutureVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const orbGlowRef = useRef<HTMLDivElement>(null);
  const orbLightRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ===== ORB GROWING WITH SCROLL =====
      gsap.to(orbRef.current, {
        scale: 3,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // ===== ORB GLOW EXPANDING =====
      gsap.to(orbGlowRef.current, {
        scale: 5,
        opacity: 0.8,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // ===== LIGHT ILLUMINATING SCREEN =====
      gsap.to(orbLightRef.current, {
        opacity: 0.6,
        scale: 2,
        scrollTrigger: {
          trigger: section,
          start: "top 20%",
          end: "center center",
          scrub: 1,
        },
      });

      // ===== MANIFESTO LINE BY LINE =====
      const manifestoLines = manifestoRef.current?.querySelectorAll("p, strong");
      if (manifestoLines) {
        gsap.from(manifestoLines, {
          y: 60,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: "top 80%",
            end: "top 40%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // ===== PARALLAX STARS =====
      gsap.to(".future-stars", {
        y: -200,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // ===== PARALLAX NEBULA =====
      gsap.to(".future-background", {
        y: -100,
        scale: 1.2,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // ===== ORBITS PARALLAX =====
      gsap.to(".future-orbit", {
        y: -150,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // ===== TITLE FADE OUT =====
      gsap.to(".future-title", {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "top 20%",
          end: "top top",
          scrub: 1,
        },
      });

      // ===== DESCRIPTION FADE OUT =====
      gsap.to(".future-description", {
        y: -80,
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "top 15%",
          end: "top -5%",
          scrub: 1,
        },
      });

    }, section);

    return () => ctx.revert();
  }, []);

  // ===== MOUSE TRACKING FOR ORBITAL WORDS =====
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      mouseRef.current.x = (e.clientX - centerX) / centerX;
      mouseRef.current.y = (e.clientY - centerY) / centerY;

      // Move orbital words based on mouse
      const orbitWords = document.querySelectorAll(".future-orbit span");
      orbitWords.forEach((word, index) => {
        const depth = (index % 3 + 1) * 15;
        const x = mouseRef.current.x * depth;
        const y = mouseRef.current.y * depth;
        
        gsap.to(word, {
          x: x,
          y: y,
          duration: 0.8,
          ease: "power2.out",
        });
      });

      // Subtle orb movement
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          x: mouseRef.current.x * 20,
          y: mouseRef.current.y * 20,
          duration: 1,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="future-vision" ref={sectionRef}>
      {/* Background layers */}
      <div className="future-background" />
      <div className="future-nebula future-nebula-1" />
      <div className="future-nebula future-nebula-2" />
      <div className="future-nebula future-nebula-3" />

      {/* Stars */}
      <div className="future-stars">
        {futureStars.map((star, index) => (
          <span
            key={index}
            className="future-star"
            style={star}
          />
        ))}
      </div>

      {/* Light from orb */}
      <div className="future-orb-light" ref={orbLightRef} />

      <div className="future-container">
        {/* Header */}
        <span className="future-label">
          <span className="future-label-dot" />
          THE FUTURE
          <span className="future-label-version">v3.0</span>
        </span>

        <h2 className="future-title">
          THIS IS ONLY
          <br />
          <span className="future-title-gradient">THE BEGINNING.</span>
        </h2>

        <p className="future-description">
          Building products. Connecting systems. Designing experiences.
          <br />
          Creating the future — one line of code at a time.
        </p>

        {/* Orbital System */}
        <div className="future-system" ref={systemRef}>
          {/* Orbital rings */}
          <div className="future-orbit orbit-1">
            <span>{orbitItems[0]}</span>
            <span>{orbitItems[1]}</span>
          </div>

          <div className="future-orbit orbit-2">
            <span>{orbitItems[2]}</span>
            <span>{orbitItems[3]}</span>
          </div>

          <div className="future-orbit orbit-3">
            <span>{orbitItems[4]}</span>
            <span>{orbitItems[5]}</span>
          </div>

          {/* Core NEXUS */}
          <div className="future-core" ref={orbRef}>
            {/* Multiple glow layers */}
            <div className="future-core-glow" ref={orbGlowRef} />
            <div className="future-core-glow-inner" />

            {/* Rings */}
            <div className="future-core-ring" />
            <div className="future-core-ring future-core-ring-2" />
            <div className="future-core-ring future-core-ring-3" />

            {/* Radar sweep */}
            <div className="future-core-radar" />

            {/* Circular text */}
            <svg className="future-core-text" viewBox="0 0 200 200">
              <defs>
                <path
                  id="circlePath"
                  d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                />
              </defs>
              <text>
                <textPath href="#circlePath">
                  FUTURE VISION • NEXUS CORE • INFINITE POSSIBILITIES •
                </textPath>
              </text>
            </svg>

            {/* Core content */}
            <div className="future-core-content">
              <div className="future-core-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                  <line x1="12" y1="2" x2="12" y2="6" />
                  <line x1="12" y1="18" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="6" y2="12" />
                  <line x1="18" y1="12" x2="22" y2="12" />
                </svg>
              </div>
              <span className="future-core-label">NEXUS</span>
              <span className="future-core-status">
                <span className="status-dot" />
                CORE ONLINE
              </span>
            </div>
          </div>
        </div>

        {/* Manifesto */}
        <div className="future-manifesto" ref={manifestoRef}>
          <p>The journey started with experiences.</p>
          <p>It evolved through intelligence.</p>
          <p>It scaled through systems.</p>
          <p>Now it moves toward ecosystems.</p>
          <strong>The next chapter is already being written.</strong>
        </div>

        {/* Status */}
        <div className="future-status">
          <span className="status-pulse" />
          Future In Progress
        </div>
      </div>
    </section>
  );
}
