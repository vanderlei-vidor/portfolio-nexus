"use client";

import { useEffect } from "react";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { EnergyOrb } from "../../components/EnergyOrb";
import { DeviceMockup } from "../../components/DeviceMockup";
import { englishTutorContent } from "../../content";
import { initImmersiveAnimation } from "./ImmersiveExperienceSection.animation";
import styles from "./ImmersiveExperienceSection.module.css";

export function ImmersiveExperienceSection() {
  const { locale } = useLanguage();
  const content = englishTutorContent[locale].immersive;

  useEffect(() => {
    const timer = setTimeout(() => {
      initImmersiveAnimation();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <div className={`${styles.orbWrapper} immersive-orb`} aria-hidden="true">
        <EnergyOrb size={220} />
      </div>

      <div className={styles.container}>
        <div className={`${styles.content} immersive-content`}>
          <span className={`${styles.eyebrow} immersive-eyebrow`}>
            {content.eyebrow}
          </span>

          <h2 className={`${styles.title} immersive-title`}>
            {content.titleLine1}
            <br />
            {content.titleLine2}
          </h2>

          <p className={`${styles.description} immersive-description`}>
            {content.description}
          </p>
        </div>

        <div className={`${styles.deviceArea} immersive-device`}>
          <DeviceMockup />
        </div>
      </div>
    </section>
  );
}
