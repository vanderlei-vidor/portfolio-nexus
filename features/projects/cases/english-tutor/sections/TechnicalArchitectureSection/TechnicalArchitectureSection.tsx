"use client";

import styles from "./TechnicalArchitectureSection.module.css";

export function TechnicalArchitectureSection() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>
          TECHNICAL ARCHITECTURE
        </span>

        <h2 className={styles.title}>
          The Intelligence
          <br />
          Behind Every Lesson.
        </h2>

        <p className={styles.subtitle}>
          A modular architecture designed to analyze,
          adapt and continuously improve the learning experience.
        </p>
      </div>

      <div className={styles.architectureFlow}>

        {/* USER */}
        <div className={`${styles.node} ${styles.userNode}`}>
          USER
        </div>

        <div className={styles.connection} />

        {/* CONVERSATION */}
        <div className={`${styles.node} ${styles.conversationNode}`}>
          Conversation Engine
        </div>

        <div className={styles.connection} />

        {/* MEMORY */}
        <div className={`${styles.node} ${styles.memoryNode}`}>
          <h4>Memory Layer</h4>

          <div className={styles.memoryTags}>

            <span className={`${styles.memoryTag} ${styles.memory1}`}>
              Vocabulary
            </span>

            <span className={`${styles.memoryTag} ${styles.memory2}`}>
              Mistakes
            </span>

            <span className={`${styles.memoryTag} ${styles.memory3}`}>
              Confidence
            </span>

            <span className={`${styles.memoryTag} ${styles.memory4}`}>
              Goals
            </span>

            <span className={`${styles.memoryTag} ${styles.memory5}`}>
              Pronunciation
            </span>

          </div>
        </div>

        <div className={styles.connection} />

        {/* AI CORE */}
        <div className={styles.aiCore}>

          <div className={styles.aiHalo} />

          <div className={styles.aiRing} />

          <div className={styles.aiOrb}>
            <div className={styles.aiOrbCore} />
          </div>

          <span className={styles.aiLabel}>
            Adaptive AI
          </span>

        </div>

        <div className={styles.connection} />

        {/* FEEDBACK */}
        <div className={`${styles.node} ${styles.feedbackNode}`}>
          Feedback Engine
        </div>

        <div className={styles.connection} />

        {/* PROGRESS */}
        <div className={`${styles.node} ${styles.progressNode}`}>
          Progress System
        </div>

      </div>
    </section>
  );
}

export default TechnicalArchitectureSection;