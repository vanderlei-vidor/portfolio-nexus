"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { ecosystemContent } from "../../content";
import "./EngineeringDNA.css";

gsap.registerPlugin(ScrollTrigger);

const layerGlows = ["blue", "purple", "cyan", "teal", "white"] as const;

export default function EngineeringDNA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { locale } = useLanguage();
  const content = ecosystemContent[locale].engineering;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bootTl = gsap.timeline();

      bootTl
        .from(".engineering-dna__label", { opacity: 0, y: 30, duration: 0.6 })
        .from(".engineering-dna__title", { opacity: 0, y: 60, duration: 1 }, "-=0.3")
        .from(".system-boot", { opacity: 0, y: 20, duration: 0.5 }, "-=0.5")
        .from(".engineering-dna__description", { opacity: 0, y: 30, duration: 0.8 }, "-=0.4")
        .from(".nexus-core", { scale: 0, opacity: 0, duration: 1.4, ease: "back.out(2)" }, "-=0.4");

      gsap.to(".nexus-core__ring", { rotate: 360, duration: 20, repeat: -1, ease: "none" });
      gsap.to(".nexus-core__ring--delay", { rotate: -360, duration: 15, repeat: -1, ease: "none" });
      gsap.to(".nexus-core__energy", { scale: 1.2, opacity: 0.6, repeat: -1, yoyo: true, duration: 2, ease: "power1.inOut" });
      gsap.to(".engineering-dna__line-fill", { height: "100%", ease: "none", scrollTrigger: { trigger: ".engineering-dna__layers", start: "top center", end: "bottom center", scrub: true } });
      gsap.to(".engineering-dna__line-particle", { y: () => document.querySelector(".engineering-dna__layers")?.scrollHeight || 1000, repeat: -1, duration: 4, ease: "none" });

      gsap.utils.toArray<HTMLElement>(".dna-layer").forEach((layer) => {
        gsap.from(layer, { opacity: 0, y: 120, scale: 0.9, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: layer, start: "top 80%", toggleClass: { targets: layer, className: "active" } } });
      });

      gsap.utils.toArray<HTMLElement>(".dna-layer").forEach((layer) => {
        const chips = layer.querySelectorAll(".dna-layer__chip");
        gsap.from(chips, { opacity: 0, y: 25, scale: 0.7, stagger: 0.08, duration: 0.5, ease: "back.out(2)", scrollTrigger: { trigger: layer, start: "top 75%" } });
      });

      gsap.utils.toArray<HTMLElement>(".energy-node").forEach((node) => {
        gsap.to(node, { scale: 1.6, opacity: 0.4, repeat: -1, yoyo: true, duration: 1.2, ease: "power1.inOut" });
      });

      gsap.from(".engineering-dna__manifesto", { opacity: 0, y: 80, duration: 1.2, scrollTrigger: { trigger: ".engineering-dna__manifesto", start: "top 85%" } });
      gsap.to(".engineering-dna__glow--1", { yPercent: 25, ease: "none", scrollTrigger: { trigger: ".engineering-dna", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.to(".engineering-dna__glow--2", { yPercent: -25, ease: "none", scrollTrigger: { trigger: ".engineering-dna", start: "top bottom", end: "bottom top", scrub: true } });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="engineering-dna" aria-labelledby="portfolio-nexus-engineering-title">
      <div className="engineering-dna__background" aria-hidden="true" />
      <div className="engineering-dna__grid" aria-hidden="true" />
      <div className="engineering-dna__glow engineering-dna__glow--1" aria-hidden="true" />
      <div className="engineering-dna__glow engineering-dna__glow--2" aria-hidden="true" />

      <div className="engineering-dna__container">
        <span className="engineering-dna__label">{content.label}</span>
        <h2 id="portfolio-nexus-engineering-title" className="engineering-dna__title">{content.titleLine1}<br />{content.titleLine2}</h2>
        <div className="system-boot">{content.boot}</div>
        <p className="engineering-dna__description">{content.description}</p>

        <div className="nexus-core" aria-hidden="true"><div className="nexus-core__ring" /><div className="nexus-core__ring nexus-core__ring--delay" /><div className="nexus-core__pulse" /><div className="nexus-core__energy" /><div className="nexus-core__inner"><span>NEXUS</span></div></div>

        <div className="engineering-dna__layers">
          <div className="engineering-dna__line" aria-hidden="true"><div className="engineering-dna__line-fill" /><div className="engineering-dna__line-particle" /></div>
          {content.layers.map((layer, index) => (
            <article key={layer.title} className={`dna-layer dna-layer--${layerGlows[index]}`}>
              <div className="energy-node" aria-hidden="true" />
              <div className="dna-layer__header"><div className="dna-layer__status" aria-hidden="true" /><h3>{layer.title}</h3></div>
              <div className="dna-layer__techs">{layer.technologies.map((tech) => <span key={tech} className="dna-layer__chip">{tech}</span>)}</div>
            </article>
          ))}
        </div>

        <div className="engineering-dna__manifesto"><span>{content.manifestoLine1}</span><span>{content.manifestoLine2}</span></div>
      </div>
    </section>
  );
}
