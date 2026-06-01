"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ImpactResultsSection.module.css";

// Garante o registro do plugin fora do componente
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ImpactResultsSection() {
  const xpRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const xpElement = xpRef.current;
    const sectionElement = sectionRef.current;

    if (!xpElement || !sectionElement) return;

    const xp = { value: 0 };

    // Cria a animação do contador atrelada ao ScrollTrigger
    const ctx = gsap.context(() => {
      gsap.to(xp, {
        value: 5308,
        duration: 2.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionElement,
          start: "top 75%",
          toggleActions: "play none none none", // Roda apenas uma vez ao entrar
        },
        onUpdate: () => {
          if (xpElement) {
            xpElement.textContent = Math.floor(xp.value).toLocaleString("en-US"); // Formata bonito ex: 5,308
          }
        },
      });
    });

    // Limpeza automática ao desmontar o componente (Evita estouro de memória)
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.section} impact-section`}>
      
      <div className={styles.header}>
        <span className={styles.eyebrow}>IMPACT & RESULTS</span>
        <h2 className={styles.title}>
          Learning That
          <br />
          Creates Results.
        </h2>
      </div>

      <div className={styles.metricsWall}>
        
        {/* CARD PRINCIPAL COM ANIMACAO GSAP (Contador) */}
        <div className={styles.metricPrimary}>
          <span ref={xpRef} className="xp-impact">0</span>
          <p>XP Earned</p>
        </div>

        {/* METRICAS SECUNDARIAS EM CSS */}
        <div className={styles.metric}>
          <span>96%</span>
          <p>Pronunciation Accuracy</p>
        </div>

        <div className={styles.metric}>
          <span>250+</span>
          <p>Words Learned</p>
        </div>

        <div className={styles.metric}>
          <span>17</span>
          <p>Day Streak</p>
        </div>

        <div className={styles.metric}>
          <span>89%</span>
          <p>Retention Rate</p>
        </div>

      </div>

    </section>
  );
}

export default ImpactResultsSection;