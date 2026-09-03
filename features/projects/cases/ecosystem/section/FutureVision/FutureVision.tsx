"use client";

import { useEffect, useRef } from "react";
import { Orbit } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { ecosystemContent } from "../../content";
import "./FutureVision.css";

gsap.registerPlugin(ScrollTrigger);

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
  const { locale } = useLanguage();
  const content = ecosystemContent[locale].future;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.to(orbRef.current, { scale: 3, scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 1 } });
      gsap.to(orbGlowRef.current, { scale: 5, opacity: 0.8, scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 1 } });
      gsap.to(orbLightRef.current, { opacity: 0.6, scale: 2, scrollTrigger: { trigger: section, start: "top 20%", end: "center center", scrub: 1 } });

      const manifestoLines = manifestoRef.current?.querySelectorAll("p, strong");
      if (manifestoLines) {
        gsap.from(manifestoLines, { y: 60, opacity: 0, stagger: 0.15, duration: 1, ease: "power3.out", scrollTrigger: { trigger: manifestoRef.current, start: "top 80%", end: "top 40%", toggleActions: "play none none reverse" } });
      }

      gsap.to(".future-stars", { y: -200, scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 1 } });
      gsap.to(".future-background", { y: -100, scale: 1.2, scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 1 } });
      gsap.to(".future-orbit", { y: -150, scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 1 } });
      gsap.to(".future-title", { y: -100, opacity: 0, scrollTrigger: { trigger: section, start: "top 20%", end: "top top", scrub: 1 } });
      gsap.to(".future-description", { y: -80, opacity: 0, scrollTrigger: { trigger: section, start: "top 15%", end: "top -5%", scrub: 1 } });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let rafId = 0;
    const handleMouseMove = (event: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const mouseX = (event.clientX - centerX) / centerX;
        const mouseY = (event.clientY - centerY) / centerY;
        document.querySelectorAll(".future-orbit span").forEach((word, index) => {
          const depth = (index % 3 + 1) * 15;
          gsap.to(word, { x: mouseX * depth, y: mouseY * depth, duration: 0.8, ease: "power2.out" });
        });
        if (orbRef.current) gsap.to(orbRef.current, { x: mouseX * 20, y: mouseY * 20, duration: 1, ease: "power2.out" });
        rafId = 0;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("mousemove", handleMouseMove); };
  }, []);

  return (
    <section className="future-vision" ref={sectionRef} aria-labelledby="portfolio-nexus-future-title">
      <div className="future-background" aria-hidden="true" />
      <div className="future-nebula future-nebula-1" aria-hidden="true" />
      <div className="future-nebula future-nebula-2" aria-hidden="true" />
      <div className="future-nebula future-nebula-3" aria-hidden="true" />
      <div className="future-stars" aria-hidden="true">{futureStars.map((star, index) => <span key={index} className="future-star" style={star} />)}</div>
      <div className="future-orb-light" ref={orbLightRef} aria-hidden="true" />

      <div className="future-container">
        <span className="future-label"><span className="future-label-dot" aria-hidden="true" />{content.label}<span className="future-label-version">v3.0</span></span>
        <h2 id="portfolio-nexus-future-title" className="future-title">{content.titleLine1}<br /><span className="future-title-gradient">{content.titleLine2}</span></h2>
        <p className="future-description">{content.descriptionLine1}<br />{content.descriptionLine2}</p>

        <div className="future-system">
          <div className="future-orbit orbit-1"><span>{content.orbitItems[0]}</span><span>{content.orbitItems[1]}</span></div>
          <div className="future-orbit orbit-2"><span>{content.orbitItems[2]}</span><span>{content.orbitItems[3]}</span></div>
          <div className="future-orbit orbit-3"><span>{content.orbitItems[4]}</span><span>{content.orbitItems[5]}</span></div>

          <div className="future-core" ref={orbRef}>
            <div className="future-core-glow" ref={orbGlowRef} aria-hidden="true" /><div className="future-core-glow-inner" aria-hidden="true" />
            <div className="future-core-ring" aria-hidden="true" /><div className="future-core-ring future-core-ring-2" aria-hidden="true" /><div className="future-core-ring future-core-ring-3" aria-hidden="true" />
            <div className="future-core-radar" aria-hidden="true" />
            <svg className="future-core-text" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="futureCirclePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" /></defs><text><textPath href="#futureCirclePath">{content.circularText}</textPath></text></svg>
            <div className="future-core-content"><div className="future-core-icon" aria-hidden="true"><Orbit size={32} strokeWidth={1.5} /></div><span className="future-core-label">NEXUS</span><span className="future-core-status"><span className="status-dot" aria-hidden="true" />{content.coreOnline}</span></div>
          </div>
        </div>

        <div className="future-manifesto" ref={manifestoRef}>{content.manifesto.map((line) => <p key={line}>{line}</p>)}<strong>{content.manifestoStrong}</strong></div>
        <div className="future-status"><span className="status-pulse" aria-hidden="true" />{content.status}</div>
      </div>
    </section>
  );
}
