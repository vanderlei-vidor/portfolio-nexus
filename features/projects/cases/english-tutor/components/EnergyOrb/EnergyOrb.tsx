"use client";

import clsx from "clsx";

import styles from "./EnergyOrb.module.css";
import type { EnergyOrbProps } from "./EnergyOrb.types";

export function EnergyOrb({
    size = 320,
    animated = true,
    particles = true,
    rings = true,
    caption = false,
    className,
}: EnergyOrbProps) {
    return (
        <div
            className={clsx(styles.wrapper, !animated && styles.static, className)}
            style={{
                width: size,
                height: size,
            }}
        >
            <div className={styles.auraFar} />
            <div className={styles.nebula} />
            <div className={styles.glowPurple} />
            <div className={styles.glowBlue} />
            <div className={styles.glowWhite} />

            <div
                className={clsx(
                    styles.orb,
                    animated && styles.animate
                )}
            >
                <div className={styles.core} />
            </div>

            {particles && (
                <>
                    <span className={`${styles.particle} ${styles.p1}`} />
                    <span className={`${styles.particle} ${styles.p2}`} />
                    <span className={`${styles.particle} ${styles.p3}`} />
                    <span className={`${styles.particle} ${styles.p4}`} />
                </>
            )}

            {rings && (
                <div className={styles.rings} aria-hidden="true">
                    <span className={`${styles.ring} ${styles.ring1}`}>
                        <i />
                    </span>
                    <span className={`${styles.ring} ${styles.ring2}`}>
                        <i />
                    </span>
                    <span className={`${styles.ring} ${styles.ring3}`}>
                        <i />
                    </span>
                    <span className={`${styles.ring} ${styles.ring4}`}>
                        <i />
                    </span>
                    <span className={`${styles.ring} ${styles.ring5}`}>
                        <i />
                    </span>
                </div>
            )}

            {caption && (
                <div className={styles.caption}>
                    <h3>ENERGY RINGS</h3>
                    <ul>
                        <li>movement — movimento</li>
                        <li>depth — profundidade</li>
                        <li>scale — escala</li>
                        <li>intelligence — sensação de inteligência</li>
                        <li>advanced tech — sensação de tecnologia avançada</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
