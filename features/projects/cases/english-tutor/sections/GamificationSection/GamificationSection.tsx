"use client";

import { useEffect, useRef } from "react";
import { initGamificationAnimation } from "./GamificationSection.animation";
import styles from "./GamificationSection.module.css";

export function GamificationSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cleanup = initGamificationAnimation(sectionRef.current);
        return () => cleanup?.();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`${styles.section} gamification-section`}
        >
            {/* Linha de energia decorativa no topo da seção */}
            <div className={styles.connectionTop} />

            <div className={styles.content}>
                <span className={styles.eyebrow}>GAMIFICATION ENGINE</span>

                <h2 className={styles.title}>
                    Every Conversation
                    <br />
                    Moves You Forward
                </h2>

                <p className={styles.subtitle}>
                    Learning becomes measurable through XP, leagues, streaks and achievements.
                </p>

                <div className={styles.xpArea}>
                    {/* 🔥 INJETADO: O anel decorativo rodando em volta do painel de XP */}
                    <div className={styles.engineRing} />

                    <span className={`${styles.xpValue} xp-counter`}>0 XP</span>

                    <div className={styles.leagueBadge}>
                        🔥 Bronze League
                    </div>

                    <div className={styles.progressTrack}>
                        <div className={`${styles.progressFill} progress-fill`} />
                    </div>

                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>🔥 17 Day Streak</div>
                        <div className={styles.statCard}>🎯 96% Pronunciation</div>
                        <div className={styles.statCard}>📚 250 Words Learned</div>
                        <div className={styles.statCard}>🏆 Top 3 Rank</div>
                    </div>
                </div>
            </div>

            {/* Linha de energia decorativa na base da seção */}
            <div className={styles.connectionBottom} />
        </section>
    );
}

export default GamificationSection;