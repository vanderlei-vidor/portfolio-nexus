"use client";

import styles from "./DeviceMockup.module.css";

export function DeviceMockup() {
    return (
        <div className={styles.device}>
            <div className={styles.reflection} />
            <div className={styles.notch} />

            <div className={styles.screen}>

                {/* Header */}
                <header className={styles.header}>
                    <span>English AI</span>
                    <span className={styles.xp}>⭐ XP 5308</span>
                </header>



                {/* Progresso */}
                <div className={styles.progressArea}>
                    <div className={styles.progressTop}>
                        <span>🔥 Bronze League</span>
                        <span>27%</span>
                    </div>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: "27%" }} />
                    </div>
                </div>

                {/* 🔮 ÁREA DO ORB EXCLUSIVA DO CELULAR (IDÊNTICA AO VÍDEO) */}
                <div className={styles.aiCoreSection}>
                    <div className={styles.floatingXp}>
                        +50 XP
                    </div>
                    <div className={styles.aiHalo} />
                    <div className={styles.aiNebula} />
                    <div className={styles.aiCoreGlowOuter} />
                    <div className={styles.aiCore}>
                        <div className={styles.aiCoreInner} />
                        <div className={styles.aiCoreGlowInner} />
                    </div>

                    {/* Partículas flutuantes internas da tela */}
                    <div className={styles.aiParticles}>
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
                    <div className={styles.voiceWave}>

                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />

                    </div>

                    <span className={styles.statusDot} />

                </div>
                <span className={styles.aiStatus}>
                    AI is listening

                    <span className={styles.dots}>
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </span>

                </span>

                {/* Chat */}
                <div className={`${styles.chatArea} chat-area`}>


                    <div
                        className={`${styles.userBubble} ${styles.message1}`}
                    >
                        Hi, how are you?
                    </div>
                    <div
                        className={`${styles.aiBubble} ${styles.message2}`}
                    >
                        Great start!
                        <br />
                        A more natural version:
                        <br />
                        <strong>
                            &quot;How are you doing today?&quot;
                        </strong>
                    </div>
                    <div
                        className={`${styles.userBubble} ${styles.message3}`}
                    >
                        I am good.
                    </div>
                </div>
                <div className={styles.inputBar}>

                    <button className={styles.micButton}>
                        🎤
                    </button>

                    <div className={styles.inputField}>
                        Type or speak...
                    </div>

                    <button className={styles.sendButton}>
                        ➜
                    </button>

                </div>

            </div>
        </div>
    );
}

export default DeviceMockup;
