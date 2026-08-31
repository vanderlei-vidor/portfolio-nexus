"use client";

import { useLanguage } from "@/shared/i18n/LanguageContext";
import { englishTutorContent } from "../../content";
import styles from "./AdaptiveIntelligenceSection.module.css";

export function AdaptiveIntelligenceSection() {
  const { locale } = useLanguage();
  const content = englishTutorContent[locale].adaptive;

  return (
    <section className={styles.section} aria-labelledby="english-tutor-adaptive-title">
      <div className={styles.header}>
        <span className={styles.eyebrow}>{content.eyebrow}</span>
        <h2 id="english-tutor-adaptive-title" className={styles.title}>
          {content.titleLine1}
          <br />
          {content.titleLine2}
        </h2>
        <p className={styles.subtitle}>{content.subtitle}</p>
      </div>

      <div className={styles.flowContainer}>
        <div className={styles.userNode}>{content.user}</div>

        <div className={styles.inputGrid}>
          {content.metrics.map((metric, index) => (
            <div key={metric.label} className={styles.metricCard}>
              <p>{metric.label}</p>
              <span className={index === 2 ? styles.weakness : undefined}>{metric.value}</span>
            </div>
          ))}
        </div>

        <div className={styles.connectionLine} aria-hidden="true" />

        <div className={styles.engineNode}>
          <div className={styles.engineHalo} aria-hidden="true" />
          <div className={styles.engineRing} aria-hidden="true" />
          <div className={styles.engineOrb} aria-hidden="true">
            <div className={styles.engineOrbCore} />
          </div>

          <div className={styles.dataFlow} aria-hidden="true">
            <span className={styles.flow1} />
            <span className={styles.flow2} />
            <span className={styles.flow3} />
          </div>
        </div>

        <span className={styles.engineLabel}>{content.engine}</span>

        <div className={styles.connectionLine} aria-hidden="true" />

        <div className={styles.outputGrid}>
          {content.outputs.map((output) => (
            <div key={output} className={styles.outputCard}>
              {output}
            </div>
          ))}
        </div>

        <div className={styles.finalNode}>{content.finalNode}</div>
      </div>
    </section>
  );
}

export default AdaptiveIntelligenceSection;
