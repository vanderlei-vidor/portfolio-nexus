"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { englishTutorContent } from "../../content";
import styles from "./ImpactResultsSection.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const localeMap = {
  en: "en-US",
  pt: "pt-BR",
  es: "es-ES",
} as const;

export function ImpactResultsSection() {
  const xpRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLanguage();
  const content = englishTutorContent[locale].impact;
  const numberFormatter = useMemo(() => new Intl.NumberFormat(localeMap[locale]), [locale]);

  useEffect(() => {
    const xpElement = xpRef.current;
    const sectionElement = sectionRef.current;

    if (!xpElement || !sectionElement) return;

    const xp = { value: 0 };

    const ctx = gsap.context(() => {
      gsap.to(xp, {
        value: 5308,
        duration: 2.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionElement,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          xpElement.textContent = numberFormatter.format(Math.floor(xp.value));
        },
      });
    }, sectionElement);

    return () => ctx.revert();
  }, [numberFormatter]);

  return (
    <section ref={sectionRef} className={`${styles.section} impact-section`} aria-labelledby="english-tutor-impact-title">
      <div className={styles.header}>
        <span className={styles.eyebrow}>{content.eyebrow}</span>
        <h2 id="english-tutor-impact-title" className={styles.title}>
          {content.titleLine1}
          <br />
          {content.titleLine2}
        </h2>
      </div>

      <div className={styles.metricsWall} aria-label={content.eyebrow}>
        <div className={styles.metricPrimary}>
          <span ref={xpRef} className="xp-impact">
            {content.metrics[0].value}
          </span>
          <p>{content.metrics[0].label}</p>
        </div>

        {content.metrics.slice(1).map((metric) => (
          <div key={metric.label} className={styles.metric}>
            <span>{metric.value}</span>
            <p>{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ImpactResultsSection;
