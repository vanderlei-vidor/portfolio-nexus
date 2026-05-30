"use client";

import { EnergyOrb } from "../../components/EnergyOrb";
import styles from "./HeroSection.module.css";
import { useState, useEffect } from "react"; // 💡 Juntei os imports do React aqui
import { initHeroAnimation } from "./HeroSection.animation";

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  // 🛠️ 1. Incorporando o useEffect para iniciar a animação do Hero
  useEffect(() => {
    const timer = setTimeout(() => {
      initHeroAnimation();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`${styles.hero} hero-section`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const x =
          ((e.clientX - rect.left) / rect.width - 0.5) * 2;

        const y =
          ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        setMousePosition({ x, y });
      }}
    >
      {/* 🛠️ 2. Atmosfera com a classe hero-atmosphere */}
      <div className={`${styles.backgroundGlow} hero-atmosphere`} />

      <div
        className={styles.mouseLight}
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
        }}
      />

      {/* 🛠️ 3. Orb Container com a classe hero-orb */}


      <div
        className={`${styles.heroOrbWrapper} hero-orb-wrapper`}
      >
        <div
          className={`${styles.orbContainer} hero-orb`}
          style={{
            transform: `
        translate(
          ${mousePosition.x * 12}px,
          ${mousePosition.y * 12}px
        )
        rotateY(${mousePosition.x * 6}deg)
        rotateX(${mousePosition.y * -6}deg)
      `,
          }}
        >
          <EnergyOrb size={520} />
        </div>
      </div>

      {/* Conteúdo */}
      <div
        className={`${styles.content} hero-content`}
        style={{
          transform: `
          translate(
            ${mousePosition.x * 6}px,
            ${mousePosition.y * 6}px
          )
        `,
        }}
      >
        {/* 🛠️ 4. Eyebrow com a classe hero-eyebrow */}
        <span className={`${styles.eyebrow} ${styles.fadeIn} hero-eyebrow`}>
          AI LANGUAGE IMMERSION
        </span>

        <h1 className={styles.title}>
          {/* 🛠️ 5. Linhas do título com a classe hero-line */}
          <span className={`${styles.line1} hero-line`}>
            The AI Tutor
          </span>

          <span className={`${styles.line2} hero-line`}>
            That Evolves
          </span>

          <span className={`${styles.line3} hero-line`}>
            With You.
          </span>
        </h1>

        {/* 🛠️ 6. Subtitle com a classe hero-subtitle */}
        <p className={`${styles.subtitle} ${styles.subtitleReveal} hero-subtitle`}>
          An immersive language learning experience powered by adaptive
          artificial intelligence.
        </p>
      </div>

      {/* 🛠️ 7. Scroll Indicator com a classe hero-scroll */}
      <div className={`${styles.scrollIndicator} hero-scroll`}>
        SCROLL TO EXPLORE
      </div>
    </section>


  );
}

export default HeroSection;