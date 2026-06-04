"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Numbers.css";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 4, suffix: "", label: "Products", description: "Connected through a unified ecosystem." },
  { value: 150, suffix: "+", label: "Components", description: "Crafted to build scalable experiences." },
  { value: 100, suffix: "+", label: "Animations", description: "Designed to enhance interaction and storytelling." },
  { value: 30, suffix: "+", label: "Features", description: "Across productivity, learning and entertainment." },
  { value: 10, suffix: "+", label: "Technologies", description: "Working together across the stack." },
  { value: 1, suffix: "", label: "Ecosystem", description: "One vision connecting everything." },
];

export default function Numbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. REVELAÇÃO DO HEADER (Label, Título e Descrição)
      gsap.fromTo(".numbers__label", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: ".numbers__label", start: "top 85%" } }
      );

      gsap.fromTo(".numbers__title", 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power4.out", scrollTrigger: { trigger: ".numbers__title", start: "top 80%" } }
      );

      gsap.fromTo(".numbers__description", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: ".numbers__description", start: "top 80%" } }
      );

      // 2. ORCHESTRATION DOS CARDS (Stagger + Linhas + Glow)
      const cards = gsap.utils.toArray<HTMLElement>(".numbers-card");
      
      cards.forEach((card) => {
        const valueEl = card.querySelector(".numbers-card__value-num");
        if (!(valueEl instanceof HTMLElement)) return;

        const targetValue = parseInt(valueEl.dataset.target ?? "0", 10);
        
        // Objeto virtual para rodar o contador numérico nativo
        const counter = { val: 0 };

        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        });

        cardTl.fromTo(card,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
        )
        // O Count-up mágico rodando liso aqui
        .to(counter, {
          val: targetValue,
          duration: 2,
          ease: "power4.out",
          onUpdate: () => {
            valueEl.innerText = String(Math.floor(counter.val));
          }
        }, "-=0.6")
        // Acendimento da linha conectora do card
        .to(card, { "--connect-progress": "100%", duration: 1, ease: "power2.inOut" }, "-=1.8")
        // Glow progressivo de fundo do card
        .to(card, { "--glow-opacity": 0.15, duration: 1.5 }, "-=1.5");
      });

      // 3. ANIMAÇÃO DO TEXTO DO MANIFESTO FINAL
      gsap.fromTo(".numbers__manifesto",
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".numbers__manifesto",
            start: "top 80%",
          }
        }
      );

      // 4. PARALAX DE NÚMEROS GIGANTES NO BACKGROUND
      gsap.to(".bg-giant-num", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="numbers" ref={sectionRef}>
      {/* Background Cinematográfico de Alta Profundidade */}
      <div className="numbers__background" />
      <div className="numbers__ambient-glow" />
      
      {/* Números gigantes flutuando em paralax */}
      <div className="numbers__giant-overlay">
        <div className="bg-giant-num num-1">01</div>
        <div className="bg-giant-num num-2">150</div>
        <div className="bg-giant-num num-3">30</div>
      </div>

      <div className="numbers__container">
        <span className="numbers__label">BY THE NUMBERS</span>

        <h2 className="numbers__title">
          Impact.
          <br />
          <span className="title-gradient">At Scale.</span>
        </h2>

        <p className="numbers__description">
          Behind every experience lies a growing ecosystem of products, systems,
          interactions and ideas.
        </p>

        <div className="numbers__grid" ref={gridRef}>
          {stats.map((stat) => (
            <article key={stat.label} className="numbers-card">
              {/* Luzes de efeito interno */}
              <div className="card-laser-line" />
              
              <span className="numbers-card__value">
                <span className="numbers-card__value-num" data-target={stat.value}>0</span>
                <span className="numbers-card__value-suffix">{stat.suffix}</span>
              </span>

              <h3>{stat.label}</h3>
              <p>{stat.description}</p>
            </article>
          ))}
        </div>

        <div className="numbers__manifesto">
          Every number tells a story.
          <strong>Together they reveal an ecosystem.</strong>
        </div>
      </div>
    </section>
  );
}
