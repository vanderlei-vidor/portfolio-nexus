"use client";

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { ecosystemContent } from "../../content";
import "./DigitalGap.css";

gsap.registerPlugin(ScrollTrigger);

const nodePositions = [
  { x: 15, y: 20 }, { x: 85, y: 25 },
  { x: 10, y: 50 }, { x: 90, y: 55 },
  { x: 20, y: 80 }, { x: 80, y: 75 },
  { x: 50, y: 15 }, { x: 50, y: 85 },
];

const connections = [
  [0, 1], [1, 3], [2, 4], [3, 5], [0, 2],
  [4, 5], [6, 0], [6, 1], [7, 4], [7, 5],
];

export default function DigitalGap() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const constellationRef = useRef<SVGSVGElement>(null);
  const fragmentsRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const convergencePointRef = useRef<HTMLDivElement>(null);
  const { locale } = useLanguage();
  const content = ecosystemContent[locale].digitalGap;

  useEffect(() => {
    const section = sectionRef.current;
    const pinContainer = pinContainerRef.current;
    if (!section || !pinContainer) return;

    const isMobileDevice = window.innerWidth < 1024;

    const ctx = gsap.context(() => {
      const fragmentElements = fragmentsRef.current?.querySelectorAll(".digital-gap__fragment");
      const wordElements = manifestoRef.current?.querySelectorAll(".manifesto-word span");
      const nodes = constellationRef.current?.querySelectorAll(".constellation-node-group");
      const lines = constellationRef.current?.querySelectorAll(".constellation-line");

      gsap.set(convergencePointRef.current, { xPercent: -50, yPercent: -50, scale: 0 });

      if (lines) {
        lines.forEach((line) => {
          const length = (line as SVGLineElement).getTotalLength?.() || 200;
          gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        });
      }

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => isMobileDevice ? "+=160%" : "+=250%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      masterTl.addLabel("start")
        .fromTo(".digital-gap__title-line span", { yPercent: 100 }, { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.1 })
        .fromTo(".digital-gap__description", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");

      if (fragmentElements && nodes) {
        masterTl.addLabel("appear")
          .fromTo(fragmentElements, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, stagger: 0.06, duration: 1, ease: "power3.out" }, "-=0.4")
          .fromTo(nodes, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.04, duration: 0.8, ease: "back.out(1.2)" }, "<");
      }

      if (lines) {
        masterTl.addLabel("connecting").to(lines, {
          strokeDashoffset: (_i, target) => ((target as SVGLineElement).getTotalLength?.() || 200) * 0.4,
          duration: 1.2,
          ease: "power2.inOut",
        });
      }

      if (fragmentElements && lines) {
        const factor = isMobileDevice ? 20 : 60;
        masterTl.addLabel("chaos")
          .to(lines, { strokeDashoffset: (_i, target) => (target as SVGLineElement).getTotalLength?.() || 200, duration: 0.6, ease: "power4.in" })
          .to(fragmentElements, {
            x: (index) => (index % 2 === 0 ? -factor : factor) * (1 + Math.random() * 0.3),
            y: () => isMobileDevice ? -15 : -40 - Math.random() * 40,
            rotation: (index) => (index % 2 === 0 ? -4 : 4),
            opacity: 0.1,
            filter: "blur(4px)",
            duration: 1.5,
            ease: "power2.inOut",
          }, "<")
          .to([".digital-gap__title", ".digital-gap__description", ".digital-gap__fragments"], { opacity: 0, y: -30, duration: 1, ease: "power2.in" }, "-=0.5");
      }

      if (wordElements) {
        masterTl.addLabel("manifesto")
          .fromTo(wordElements, { yPercent: 100 }, { yPercent: 0, duration: 0.8, ease: "power4.out", stagger: 0.08 })
          .to(".digital-gap__divider", { height: isMobileDevice ? 60 : 160, opacity: 1, duration: 0.8 }, "-=0.2");
      }

      if (lines && nodes) {
        masterTl.addLabel("convergence")
          .to(lines, { attr: { x1: "50%", y1: "50%", x2: "50%", y2: "50%" }, opacity: 0, duration: 1.5, ease: "power3.inOut" })
          .to(nodes, { attr: { cx: "50%", cy: "50%" }, scale: 0, opacity: 0, duration: 1.5, ease: "power3.inOut" }, "<")
          .to(manifestoRef.current, { opacity: 0, scale: 0.95, y: -15, duration: 0.8 }, "-=0.5");
      }

      masterTl.addLabel("nexus").fromTo(convergencePointRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.2)" });

      gsap.to(convergencePointRef.current, {
        boxShadow: "0 0 40px rgba(96, 165, 250, 0.5), 0 0 90px rgba(167, 139, 250, 0.3)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="digital-gap" ref={sectionRef} aria-labelledby="portfolio-nexus-gap-title">
      <div className="digital-gap__pin-container" ref={pinContainerRef}>
        <div className="digital-gap__background" aria-hidden="true" />
        <div className="digital-gap__grid" aria-hidden="true" />

        <div className="digital-gap__container">
          <span className="digital-gap__label"><span className="label-dot" aria-hidden="true" />{content.label}<span className="label-version">v1.0</span></span>

          <h2 id="portfolio-nexus-gap-title" className="digital-gap__title">
            <div className="digital-gap__title-line"><span>{content.titleLine1}</span></div>
            <div className="digital-gap__title-line"><span className="title-gradient">{content.titleLine2}</span></div>
          </h2>

          <p className="digital-gap__description">{content.description}</p>

          <div className="digital-gap__fragments" ref={fragmentsRef}>
            {content.fragments.map((fragment, index) => (
              <div key={fragment} className="digital-gap__fragment">
                <span className="fragment-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="fragment-text">{fragment}</span>
                <span className="fragment-status">{content.fragmentStatus}</span>
              </div>
            ))}
          </div>

          <div className="digital-gap__divider" aria-hidden="true" />

          <div className="digital-gap__manifesto" ref={manifestoRef}>
            {content.manifestoWords.map((word, index) => (
              <span key={`${word}-${index}`} className="manifesto-word"><span>{word}</span></span>
            ))}
          </div>
        </div>

        <svg className="digital-gap__constellation" ref={constellationRef} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {connections.map(([from, to], index) => (
            <line key={index} className="constellation-line" x1={`${nodePositions[from].x}%`} y1={`${nodePositions[from].y}%`} x2={`${nodePositions[to].x}%`} y2={`${nodePositions[to].y}%`} stroke="rgba(96, 165, 250, 0.25)" strokeWidth="0.4" />
          ))}
          {nodePositions.map((pos, index) => (
            <g key={index} className="constellation-node-group" style={{ transformOrigin: `${pos.x}% ${pos.y}%` }}>
              <circle cx={`${pos.x}%`} cy={`${pos.y}%`} r="0.8" fill="#60a5fa" />
              <circle cx={`${pos.x}%`} cy={`${pos.y}%`} r="2.2" fill="rgba(96, 165, 250, 0.2)" />
            </g>
          ))}
        </svg>

        <div className="convergence-point" ref={convergencePointRef}>
          <div className="convergence-glow" aria-hidden="true" />
          <div className="convergence-core"><span className="convergence-label">{content.convergenceLabel}</span><ArrowDown className="convergence-arrow" size={18} aria-hidden="true" /></div>
        </div>
      </div>
    </section>
  );
}
