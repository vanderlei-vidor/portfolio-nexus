"use client";

import { useRef } from "react";
import { CircleDot, Diamond, Music, Sparkles } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { ecosystemContent } from "../../content";
import "./Evolution.css";

gsap.registerPlugin(ScrollTrigger);

const milestoneIcons = [Music, CircleDot, Diamond, Sparkles] as const;

export default function Evolution() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const { locale } = useLanguage();
  const content = ecosystemContent[locale].evolution;

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({ isDesktop: "(min-width: 769px)", isMobile: "(max-width: 768px)" }, (context) => {
      const { isDesktop } = context.conditions ?? { isDesktop: true };
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top center+=100", end: "bottom center+=100", scrub: 1 } });

      tl.to(progressRef.current, { height: "100%", ease: "none" }, 0);

      const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
      items.forEach((item) => {
        const dot = item.querySelector(".timeline-dot");
        const card = item.querySelector(".timeline-card");
        const isLeft = item.classList.contains("timeline-left");
        const startX = isDesktop ? (isLeft ? -50 : 50) : 0;
        const startY = isDesktop ? 0 : 30;

        tl.to(dot, { backgroundColor: "rgba(96, 165, 250, 0.25)", borderColor: "#60a5fa", boxShadow: "0 0 20px rgba(96, 165, 250, 0.6)", scale: 1.1, duration: 0.2 }, ">-0.1");
        tl.fromTo(card, { opacity: 0, x: startX, y: startY, scale: 0.95 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }, "<");
      });

      tl.fromTo(orbRef.current, { scale: 0.8, boxShadow: "0 0 0px rgba(96, 165, 250, 0)" }, { scale: isDesktop ? 1.25 : 1.1, borderColor: "#60a5fa", boxShadow: "0 0 50px rgba(96, 165, 250, 0.5), inset 0 0 30px rgba(96, 165, 250, 0.3)", duration: 0.5, ease: "back.out(2)" }, ">");
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="evolution" aria-labelledby="portfolio-nexus-evolution-title">
      <div className="evolution-container">
        <span className="evolution-label">{content.label}</span>
        <h2 id="portfolio-nexus-evolution-title" className="evolution-title">{content.titleLine1}<br />{content.titleLine2}</h2>
        <p className="evolution-description">{content.description}</p>

        <div className="timeline">
          <div className="timeline-line" aria-hidden="true" />
          <div ref={progressRef} className="timeline-progress" aria-hidden="true" />

          {content.milestones.map((item, index) => {
            const Icon = milestoneIcons[index];
            return (
              <div key={item.title} className={`timeline-item ${index % 2 === 0 ? "timeline-left" : "timeline-right"}`}>
                <div className="timeline-dot" aria-hidden="true"><Icon size={18} /></div>
                <article className="timeline-card"><span className="timeline-year">{item.year}</span><h3>{item.title}</h3><p>{item.description}</p></article>
              </div>
            );
          })}
        </div>

        <div className="evolution-final">
          <div ref={orbRef} className="evolution-orb"><div className="evolution-orb-glow" aria-hidden="true" /><span>NEXUS</span></div>
          <div className="evolution-manifesto">{content.manifesto.map((line) => <span key={line}>{line}<br /></span>)}</div>
        </div>
      </div>
    </section>
  );
}
