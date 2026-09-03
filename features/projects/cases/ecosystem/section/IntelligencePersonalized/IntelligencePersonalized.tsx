"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { ecosystemContent } from "../../content";
import "./IntelligencePersonalized.css";

gsap.registerPlugin(ScrollTrigger);

export default function IntelligencePersonalized() {
  const sectionRef = useRef<HTMLElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const { locale } = useLanguage();
  const content = ecosystemContent[locale].intelligence;

  useEffect(() => {
    const section = sectionRef.current;
    const system = systemRef.current;
    const svg = svgRef.current;
    if (!section || !system || !svg) return;

    const ctx = gsap.context(() => {
      const nodes = system.querySelectorAll(".neural-node, .insight-pill, .neural-core");
      const lines = svg.querySelectorAll<SVGGeometryElement>(".neural-line");
      const pulses = svg.querySelectorAll<SVGGeometryElement>(".neural-pulse");

      gsap.set([nodes, lines, pulses], { opacity: 0 });
      gsap.set(lines, { strokeDashoffset: (_index, target: SVGGeometryElement) => target.getTotalLength() || 1000 });

      const awakeTimeline = gsap.timeline({
        scrollTrigger: { trigger: system, start: "top 75%", end: "bottom 60%", toggleActions: "play none none reverse" },
      });

      awakeTimeline.to(".neural-core", { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" })
        .to(lines, { opacity: 0.3, strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut", stagger: 0.05 }, "-=0.4")
        .to(".neural-node", { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.6, ease: "power3.out" }, "-=0.8")
        .to(".insight-pill", { opacity: 1, scale: 1, stagger: 0.06, duration: 0.5 }, "-=0.4")
        .to(pulses, { opacity: 0.8, duration: 0.3, onComplete: () => startSynapticPulses(pulses) }, "-=0.2");

      function startSynapticPulses(pulseElements: NodeListOf<SVGGeometryElement>) {
        pulseElements.forEach((pulse) => {
          const length = pulse.getTotalLength() || 1000;
          gsap.set(pulse, { strokeDasharray: `${length / 4} ${length}` });
          gsap.fromTo(pulse, { strokeDashoffset: length }, { strokeDashoffset: -length, duration: 2 + Math.random() * 2, repeat: -1, ease: "none", delay: Math.random() * 1.5 });
        });
      }

      const xTo = gsap.quickTo(orbRef.current, "x", { duration: 1.5, ease: "power2.out" });
      const yTo = gsap.quickTo(orbRef.current, "y", { duration: 1.5, ease: "power2.out" });
      const handleMouseMove = (event: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        xTo(event.clientX - rect.left);
        yTo(event.clientY - rect.top);
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="intelligence" ref={sectionRef} aria-labelledby="portfolio-nexus-intelligence-title">
      <div className="intelligence__background" aria-hidden="true" />
      <div className="intelligence__mouse-orb" ref={orbRef} aria-hidden="true" />

      <div className="intelligence__container">
        <span className="intelligence__label">{content.label}</span>

        <h2 id="portfolio-nexus-intelligence-title" className="intelligence__title">
          {content.titleLine1}
          <br />
          <span className="title-gradient">{content.titleLine2}</span>
        </h2>

        <p className="intelligence__description">{content.description}</p>

        <div className="neural-system" ref={systemRef}>
          <svg className="neural-network-svg" ref={svgRef} viewBox="0 0 1000 800" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" /><stop offset="100%" stopColor="#60a5fa" stopOpacity="0.4" /></linearGradient>
              <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c084fc" /><stop offset="50%" stopColor="#60a5fa" /><stop offset="100%" stopColor="transparent" /></linearGradient>
            </defs>
            {["M 500 400 L 500 80", "M 500 400 L 850 240", "M 500 400 L 850 560", "M 500 400 L 500 720", "M 500 400 L 150 400", "M 500 80 L 220 180", "M 500 80 L 780 180", "M 150 400 L 220 180", "M 150 400 L 220 620", "M 850 240 L 780 180", "M 850 560 L 780 620", "M 500 720 L 220 620", "M 500 720 L 780 620"].map((path) => <path key={path} className="neural-line" d={path} stroke="url(#neuralGrad)" strokeWidth="1.5" fill="none" />)}
            {["M 500 400 L 500 80", "M 500 400 L 850 240", "M 500 400 L 850 560", "M 500 400 L 500 720", "M 500 400 L 150 400"].map((path) => <path key={`pulse-${path}`} className="neural-pulse" d={path} stroke="url(#pulseGrad)" strokeWidth="2.5" fill="none" />)}
          </svg>

          <div className="neural-core"><div className="neural-core__glow" aria-hidden="true" /><div className="neural-core__particles" aria-hidden="true"><span className="particle" /><span className="particle" /><span className="particle" /></div><span>AI</span></div>

          {content.skills.map((skill, index) => <div key={skill} className={`neural-node neural-node--${index + 1}`}><span className="node-radar" aria-hidden="true" />{skill}</div>)}
          {content.insights.map((item, index) => <div key={item} className={`insight-pill insight-pill--${index + 1}`}>{item}</div>)}
        </div>

        <div className="intelligence__manifesto">
          {content.manifestoLine1}
          <br />
          <strong>{content.manifestoLine2}</strong>
        </div>
      </div>
    </section>
  );
}
