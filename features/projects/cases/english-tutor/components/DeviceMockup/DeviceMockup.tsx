"use client";

import { useLanguage } from "@/shared/i18n/LanguageContext";
import { englishTutorContent } from "../../content";
import styles from "./DeviceMockup.module.css";

export function DeviceMockup() {
  const { locale } = useLanguage();
  const content = englishTutorContent[locale].mockup;

  return (
    <div className={styles.device} aria-label={content.appName}>
      <div className={styles.reflection} aria-hidden="true" />
      <div className={styles.notch} aria-hidden="true" />

      <div className={styles.screen}>
        <header className={styles.header}>
          <span>{content.appName}</span>
          <span className={styles.xp}>{content.xp}</span>
        </header>

        <div className={styles.progressArea}>
          <div className={styles.progressTop}>
            <span>{content.league}</span>
            <span>27%</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: "27%" }} />
          </div>
        </div>

        <div className={styles.aiCoreSection}>
          <div className={styles.floatingXp}>+50 XP</div>
          <div className={styles.aiHalo} aria-hidden="true" />
          <div className={styles.aiNebula} aria-hidden="true" />
          <div className={styles.aiCoreGlowOuter} aria-hidden="true" />
          <div className={styles.aiCore} aria-hidden="true">
            <div className={styles.aiCoreInner} />
            <div className={styles.aiCoreGlowInner} />
          </div>

          <div className={styles.aiParticles} aria-hidden="true">
            <span className={styles.aiParticle1} />
            <span className={styles.aiParticle2} />
            <span className={styles.aiParticle3} />
            <span className={styles.aiParticle4} />
            <span className={styles.aiParticle5} />
            <span className={styles.aiParticle6} />
            <span className={styles.aiParticle7} />
            <span className={styles.aiParticle8} />
            <span className={styles.aiParticle9} />
            <span className={styles.aiParticle10} />
            <span className={styles.aiParticle11} />
            <span className={styles.aiParticle12} />
            <span className={styles.aiParticle13} />
            <span className={styles.aiParticle14} />
            <span className={styles.aiParticle15} />
            <span className={styles.aiParticle16} />
          </div>
        </div>

        <div className={styles.statusWrapper}>
          <div className={styles.voiceWave} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <span className={styles.statusDot} aria-hidden="true" />
        </div>

        <span className={styles.aiStatus}>
          {content.listening}
          <span className={styles.dots} aria-hidden="true">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </span>

        <div className={`${styles.chatArea} chat-area`}>
          <div className={`${styles.userBubble} ${styles.message1}`}>{content.userMessage1}</div>
          <div className={`${styles.aiBubble} ${styles.message2}`}>
            {content.aiMessage1}
            <br />
            {content.aiMessage2}
            <br />
            <strong>&quot;{content.aiSuggestion}&quot;</strong>
          </div>
          <div className={`${styles.userBubble} ${styles.message3}`}>{content.userMessage2}</div>
        </div>

        <div className={styles.inputBar}>
          <button type="button" className={styles.micButton} aria-label={content.micLabel}>
            🎤
          </button>

          <div className={styles.inputField}>{content.input}</div>

          <button type="button" className={styles.sendButton} aria-label={content.sendLabel}>
            ➜
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeviceMockup;
