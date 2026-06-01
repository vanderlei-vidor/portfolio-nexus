"use client";

import { EnergyOrb } from "../../components/EnergyOrb";
import { FutureVisionOrb } from "../../components/FutureVisionOrb/FutureVisionOrb";

import styles from "./ProjectVisionSection.module.css";

export function ProjectVisionSection() {
  return (
    <section className={styles.section}>

      <div className={styles.header}>

        <span className={styles.eyebrow}>
          PROJECT VISION
        </span>

        <h2 className={styles.title}>
          The Future
          <br />
          Of Language Learning.
        </h2>

        <p className={styles.subtitle}>
          An AI companion that remembers,
          adapts and grows with every learner.
        </p>

      </div>

      <div className={styles.orbWrapper}>
        <FutureVisionOrb />
      </div>

      <div className={styles.pillars}>

        <div className={styles.pillar}>
          <span className={styles.icon}>
            🧠
          </span>

          <h3>AI Memory</h3>

          <p>
            Learning experiences that remember
            every interaction.
          </p>
        </div>

        <div className={styles.pillar}>
          <span className={styles.icon}>
            ⚡
          </span>

          <h3>Adaptive Learning</h3>

          <p>
            Lessons that evolve according
            to performance and goals.
          </p>
        </div>

        <div className={styles.pillar}>
          <span className={styles.icon}>
            🌍
          </span>

          <h3>Human Connection</h3>

          <p>
            Technology designed to make learning
            natural and engaging.
          </p>
        </div>

      </div>

      <div className={styles.finalQuote}>

        <p>
          Learning is no longer static.
        </p>

        <span>
          It evolves with you.
        </span>

      </div>

    </section>
  );
}

export default ProjectVisionSection;