"use client";

import styles from "./AdaptiveIntelligenceSection.module.css";

export function AdaptiveIntelligenceSection() {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <span className={styles.eyebrow}>ADAPTIVE INTELLIGENCE</span>
                <h2 className={styles.title}>
                    Every Lesson
                    <br />
                    Adapts To You.
                </h2>
                <p className={styles.subtitle}>
                    The AI continuously analyzes performance, identifies weaknesses and creates a
                    personalized learning journey in real time.
                </p>
            </div>

            <div className={styles.flowContainer}>
                {/* BLOCO 1: ENTRADA DE DADOS */}
                <div className={styles.userNode}>YOU</div>

                <div className={styles.inputGrid}>
                    <div className={styles.metricCard}>
                        <p>Pronunciation</p>
                        <span>72%</span>
                    </div>
                    <div className={styles.metricCard}>
                        <p>Vocabulary</p>
                        <span>A2</span>
                    </div>
                    <div className={styles.metricCard}>
                        <p>Grammar</p>
                        <span className={styles.weakness}>Weakness</span>
                    </div>
                </div>

                {/* Conexão entrando no motor */}
                <div className={styles.connectionLine} />

                {/* BLOCO 2: O MOTOR DE IA CENTRAL */}
                <div className={styles.engineNode}>
                    <div className={styles.engineHalo} />
                    <div className={styles.engineRing} />
                    <div className={styles.engineOrb}>
                        <div className={styles.engineOrbCore} />
                    </div>

                    {/* Partículas de dados fluindo verticalmente através do motor */}
                    <div className={styles.dataFlow}>
                        <span className={styles.flow1}></span>
                        <span className={styles.flow2}></span>
                        <span className={styles.flow3}></span>
                    </div>

                </div>

                <span className={styles.engineLabel}>AI ENGINE</span>

                {/* Conexão saindo do motor */}
                <div className={styles.connectionLine} />

                {/* BLOCO 3: SAÍDA PERSONALIZADA */}
                <div className={styles.outputGrid}>
                    <div className={styles.outputCard}>Lessons</div>
                    <div className={styles.outputCard}>Feedback</div>
                    <div className={styles.outputCard}>Challenges</div>
                </div>

                <div className={styles.finalNode}>Personalized Growth</div>
            </div>
        </section>
    );
}

export default AdaptiveIntelligenceSection;