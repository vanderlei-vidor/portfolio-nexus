"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { ecosystemContent } from "../../content";
import "./DesignPhilosophy.css";

gsap.registerPlugin(ScrollTrigger);

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
  const { locale } = useLanguage();
  const content = ecosystemContent[locale].design;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let rafId = 0;

    const handleMouseMove = (event: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        section.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
        section.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
        rafId = 0;
      });
    };

    section.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => { cancelAnimationFrame(rafId); section.removeEventListener("mousemove", handleMouseMove); };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".philosophy-card", { y: 80, opacity: 0, stagger: 0.15, duration: 1, ease: "power3.out", scrollTrigger: { trigger: gridRef.current, start: "top 80%", toggleActions: "play none none reverse" } });
      gsap.to(".connection-path", { strokeDashoffset: 0, duration: 2, ease: "power2.inOut", scrollTrigger: { trigger: gridRef.current, start: "top 70%", end: "bottom 70%", scrub: 1 } });
      gsap.utils.toArray<HTMLElement>(".giant-number").forEach((num, index) => gsap.to(num, { y: index % 2 === 0 ? -80 : 80, scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 } }));
      gsap.to(".constellation-layer", { y: -100, scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 } });
      const manifestoLines = manifestoRef.current?.querySelectorAll(".manifesto-line");
      if (manifestoLines) gsap.from(manifestoLines, { y: 40, opacity: 0, stagger: 0.2, duration: 1, ease: "power3.out", scrollTrigger: { trigger: manifestoRef.current, start: "top 85%", toggleActions: "play none none reverse" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="design-philosophy" ref={sectionRef} aria-labelledby="portfolio-nexus-design-title">
      <div className="design-philosophy__bg-gradient" aria-hidden="true" />
      <div className="constellation-layer" aria-hidden="true">{constellationStars.map((star, index) => <span key={index} className="constellation-star" style={star} />)}</div>
      <div className="giant-number gn-1" aria-hidden="true">01</div><div className="giant-number gn-2" aria-hidden="true">03</div><div className="giant-number gn-3" aria-hidden="true">05</div>
      <svg className="connection-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path className="connection-path" d="M 50,0 L 50,20 L 20,20 L 20,40 L 80,40 L 80,60 L 30,60 L 30,80 L 70,80 L 70,100" fill="none" stroke="url(#lineGradient)" strokeWidth="0.3" strokeDasharray="100" strokeDashoffset="100" strokeLinecap="round" /><defs><linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="transparent" /><stop offset="20%" stopColor="#60a5fa" /><stop offset="50%" stopColor="#a78bfa" /><stop offset="80%" stopColor="#60a5fa" /><stop offset="100%" stopColor="transparent" /></linearGradient></defs></svg>

      <div className="design-philosophy__container">
        <span className="design-philosophy__label"><span className="label-dot" aria-hidden="true" />{content.label}</span>
        <h2 id="portfolio-nexus-design-title" className="design-philosophy__title">{content.titleLine1}<br /><span className="title-gradient">{content.titleLine2}</span></h2>
        <p className="design-philosophy__description">{content.descriptionLine1}<br />{content.descriptionLine2}</p>
        <div className="design-philosophy__grid" ref={gridRef}>{content.principles.map((principle, index) => <article key={principle.title} className="philosophy-card" style={{ "--card-index": index } as CSSProperties}><div className="card-glow" aria-hidden="true" /><span className="philosophy-card__number">{String(index + 1).padStart(2, "0")}</span><h3>{principle.title}</h3><p>{principle.description}</p></article>)}</div>
        <div className="design-philosophy__manifesto" ref={manifestoRef}><span className="manifesto-line">{content.manifestoLine1}</span><strong className="manifesto-line manifesto-strong">{content.manifestoLine2}</strong></div>
      </div>
    </section>
  );
}
