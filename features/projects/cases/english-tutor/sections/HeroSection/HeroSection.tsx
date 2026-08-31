"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { EnergyOrb } from "../../components/EnergyOrb";
import { englishTutorContent } from "../../content";
import { initHeroAnimation } from "./HeroSection.animation";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const mouseLightRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const { locale } = useLanguage();
  const content = englishTutorContent[locale].hero;

  useEffect(() => {
    const timer = setTimeout(() => {
      initHeroAnimation();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (frameRef.current !== null) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const pointerX = event.clientX;
    const pointerY = event.clientY;

    frameRef.current = requestAnimationFrame(() => {
      const x = ((pointerX - rect.left) / rect.width - 0.5) * 2;
      const y = ((pointerY - rect.top) / rect.height - 0.5) * 2;
      const lightX = ((pointerX - rect.left) / rect.width) * 100;
      const lightY = ((pointerY - rect.top) / rect.height) * 100;

      if (mouseLightRef.current) {
        mouseLightRef.current.style.left = `${lightX}%`;
        mouseLightRef.current.style.top = `${lightY}%`;
      }

      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${x * 12}px, ${y * 12}px) rotateY(${x * 6}deg) rotateX(${y * -6}deg)`;
      }

      if (contentRef.current) {
        contentRef.current.style.transform = `translate(${x * 6}px, ${y * 6}px)`;
      }

      frameRef.current = null;
    });
  };

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section
      className={`${styles.hero} hero-section`}
      onMouseMove={handleMouseMove}
      aria-labelledby="english-tutor-hero-title"
    >
      <div className={`${styles.backgroundGlow} hero-atmosphere`} aria-hidden="true" />
      <div ref={mouseLightRef} className={styles.mouseLight} aria-hidden="true" />

      <div className={`${styles.heroOrbWrapper} hero-orb-wrapper`}>
        <div ref={orbRef} className={`${styles.orbContainer} hero-orb`}>
          <EnergyOrb size={520} />
        </div>
      </div>

      <div ref={contentRef} className={`${styles.content} hero-content`}>
        <span className={`${styles.eyebrow} ${styles.fadeIn} hero-eyebrow`}>
          {content.eyebrow}
        </span>

        <h1 id="english-tutor-hero-title" className={styles.title}>
          <span className={`${styles.line1} hero-line`}>{content.titleLine1}</span>
          <span className={`${styles.line2} hero-line`}>{content.titleLine2}</span>
          <span className={`${styles.line3} hero-line`}>{content.titleLine3}</span>
        </h1>

        <p className={`${styles.subtitle} ${styles.subtitleReveal} hero-subtitle`}>
          {content.subtitle}
        </p>
      </div>

      <div className={`${styles.scrollIndicator} hero-scroll`}>
        {content.scroll}
      </div>
    </section>
  );
}

export default HeroSection;
