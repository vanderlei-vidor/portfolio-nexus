"use client";

import { EnergyOrb } from "../../components/EnergyOrb";

import styles from "./ImmersiveExperienceSection.module.css";
import { useEffect } from "react";
import { initImmersiveAnimation } from "./ImmersiveExperienceSection.animation";
import { DeviceMockup } from "../../components/DeviceMockup";

export function ImmersiveExperienceSection() {



    useEffect(() => {
        const timer = setTimeout(() => {
            initImmersiveAnimation();
        }, 50);

        return () => clearTimeout(timer);
    }, []);
    return (
        <section className={styles.section}>
            {/* Atmosfera */}
            <div className={styles.backgroundGlow} />

            {/* Orb Secundária */}
            <div className={`${styles.orbWrapper} immersive-orb`}>
                <EnergyOrb size={220} />
            </div>

            <div className={styles.container}>
                {/* Conteúdo */}
                <div className={`${styles.content} immersive-content`}>
                    <span className={`${styles.eyebrow} immersive-eyebrow`}>
                        IMMERSIVE LEARNING
                    </span>

                    <h2 className={`${styles.title} immersive-title`}>
                        Learning Through
                        <br />
                        Real Conversation.
                    </h2>

                    <p className={`${styles.description} immersive-description`}>
                        Every interaction is personalized,
                        context-aware and designed to evolve
                        alongside the learner&apos;s progress.
                    </p>
                </div>

                {/* Device Area */}
                <div className={`${styles.deviceArea} immersive-device`}>
                    <DeviceMockup />
                </div>
            </div>
        </section>
    );
}
