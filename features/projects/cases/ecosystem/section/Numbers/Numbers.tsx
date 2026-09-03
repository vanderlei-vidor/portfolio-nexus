"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { ecosystemContent } from "../../content";
import "./Numbers.css";

gsap.registerPlugin(ScrollTrigger);

const localeMap = { en: "en-US", pt: "pt-BR", es: "es-ES" } as const;

export default function Numbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { locale } = useLanguage();
  const content = ecosystemContent[locale].numbers;
  const formatter = useMemo(() => new Intl.NumberFormat(localeMap[locale]), [locale]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".numbers__label", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: ".numbers__label", start: "top 85%" } });
      gsap.fromTo(".numbers__title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power4.out", scrollTrigger: { trigger: ".numbers__title", start: "top 80%" } });
      gsap.fromTo(".numbers__description", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: ".numbers__description", start: "top 80%" } });

      const cards = gsap.utils.toArray<HTMLElement>(".numbers-card");
      cards.forEach((card) => {
        const valueEl = card.querySelector(".numbers-card__value-num");
        if (!(valueEl instanceof HTMLElement)) return;

        const targetValue = parseInt(valueEl.dataset.target ?? "0", 10);
        const counter = { val: 0 };
        const cardTl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" } });

        cardTl.fromTo(card, { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" })
          .to(counter, { val: targetValue, duration: 2, ease: "power4.out", onUpdate: () => { valueEl.innerText = formatter.format(Math.floor(counter.val)); } }, "-=0.6")
          .to(card, { "--connect-progress": "100%", duration: 1, ease: "power2.inOut" }, "-=1.8")
          .to(card, { "--glow-opacity": 0.15, duration: 1.5 }, "-=1.5");
      });

      gsap.fromTo(".numbers__manifesto", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".numbers__manifesto", start: "top 80%" } });
      gsap.to(".bg-giant-num", { yPercent: -20, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } });
    }, section);

    return () => ctx.revert();
  }, [formatter]);

  return (
    <section className="numbers" ref={sectionRef} aria-labelledby="portfolio-nexus-numbers-title">
      <div className="numbers__background" aria-hidden="true" />
      <div className="numbers__ambient-glow" aria-hidden="true" />
      <div className="numbers__giant-overlay" aria-hidden="true"><div className="bg-giant-num num-1">01</div><div className="bg-giant-num num-2">150</div><div className="bg-giant-num num-3">30</div></div>

      <div className="numbers__container">
        <span className="numbers__label">{content.label}</span>
        <h2 id="portfolio-nexus-numbers-title" className="numbers__title">{content.titleLine1}<br /><span className="title-gradient">{content.titleLine2}</span></h2>
        <p className="numbers__description">{content.description}</p>
        <div className="numbers__grid" ref={gridRef}>{content.stats.map((stat) => <article key={stat.label} className="numbers-card"><div className="card-laser-line" aria-hidden="true" /><span className="numbers-card__value"><span className="numbers-card__value-num" data-target={stat.value}>0</span><span className="numbers-card__value-suffix">{stat.suffix}</span></span><h3>{stat.label}</h3><p>{stat.description}</p></article>)}</div>
        <div className="numbers__manifesto">{content.manifestoLine1}<strong>{content.manifestoLine2}</strong></div>
      </div>
    </section>
  );
}
