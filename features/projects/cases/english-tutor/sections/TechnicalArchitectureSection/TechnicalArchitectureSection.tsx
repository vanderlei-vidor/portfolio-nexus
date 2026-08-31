"use client";

import { useLanguage } from "@/shared/i18n/LanguageContext";
import { englishTutorContent } from "../../content";
import styles from "./TechnicalArchitectureSection.module.css";

export function TechnicalArchitectureSection() {
  const { locale } = useLanguage();
  const content = englishTutorContent[locale].architecture;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>{content.eyebrow}</span>

        <h2 className={styles.title}>
          {content.titleLine1}
          <br />
          {content.titleLine2}
        </h2>

        <p className={styles.subtitle}>{content.subtitle}</p>
      </div>

      <div className={styles.architectureFlow}>
        <div className={`${styles.node} ${styles.userNode}`}>{content.user}</div>

        <div className={styles.connection} aria-hidden="true" />

        <div className={`${styles.node} ${styles.conversationNode}`}>{content.conversation}</div>

        <div className={styles.connection} aria-hidden="true" />

        <div className={`${styles.node} ${styles.memoryNode}`}>
          <h4>{content.memoryLayer}</h4>

          <div className={styles.memoryTags}>
            {content.memoryTags.map((tag, index) => (
              <span
                key={tag}
                className={`${styles.memoryTag} ${styles[`memory${index + 1}` as keyof typeof styles]}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.connection} aria-hidden="true" />

        <div className={styles.aiCore}>
          <div className={styles.aiHalo} aria-hidden="true" />
          <div className={styles.aiRing} aria-hidden="true" />

          <div className={styles.aiOrb} aria-hidden="true">
            <div className={styles.aiOrbCore} />
          </div>

          <span className={styles.aiLabel}>{content.aiCore}</span>
        </div>

        <div className={styles.connection} aria-hidden="true" />

        <div className={`${styles.node} ${styles.feedbackNode}`}>{content.feedbackEngine}</div>

        <div className={styles.connection} aria-hidden="true" />

        <div className={`${styles.node} ${styles.progressNode}`}>{content.progressSystem}</div>
      </div>
    </section>
  );
}

export default TechnicalArchitectureSection;
