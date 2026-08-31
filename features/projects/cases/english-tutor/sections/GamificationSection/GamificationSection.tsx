"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { englishTutorContent } from "../../content";
import { initGamificationAnimation } from "./GamificationSection.animation";
import styles from "./GamificationSection.module.css";

export function GamificationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { locale } = useLanguage();
  const content = englishTutorContent[locale].gamification;

  useEffect(() => {
    const cleanup = initGamificationAnimation(sectionRef.current);
    return () => cleanup?.();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.section} gamification-section`}>
      <div className={styles.connectionTop} aria-hidden="true" />

      <div className={styles.content}>
        <span className={styles.eyebrow}>{content.eyebrow}</span>

        <h2 className={styles.title}>
          {content.titleLine1}
          <br />
          {content.titleLine2}
        </h2>

        <p className={styles.subtitle}>{content.subtitle}</p>

        <div className={styles.xpArea}>
          <div className={styles.engineRing} aria-hidden="true" />

          <span className={`${styles.xpValue} xp-counter`}>{content.xp}</span>

          <div className={styles.leagueBadge}>{content.league}</div>

          <div className={styles.progressTrack}>
            <div className={`${styles.progressFill} progress-fill`} />
          </div>

          <div className={styles.statsGrid}>
            {content.stats.map((stat) => (
              <div key={stat} className={styles.statCard}>
                {stat}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.connectionBottom} aria-hidden="true" />
    </section>
  );
}

export default GamificationSection;
