"use client";

import { useEffect, useState } from "react";
import styles from "./FutureVisionOrb.module.css";

export function FutureVisionOrb() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Trigger animation after mount for entrance effect
        setIsLoaded(true);
    }, []);

    return (
        <div
            className={styles.wrapper}
            style={{
                animation: isLoaded ? undefined : "none",
                opacity: isLoaded ? 1 : 0.8,
            }}
        >
            {/* HALO - Atmospherique glow backdrop */}
            <div className={styles.halo} />

            {/* RINGS - Rotating orbital conductors */}
            <div className={styles.ring} />
            <div className={styles.ring2} />

            {/* SATELLITES - Dynamic orbital bodies */}
            <span className={styles.satellite1} />
            <span className={styles.satellite2} />
            <span className={styles.satellite3} />
            <span className={styles.satellite4} />

            {/* MAIN ORB - The grand finale centerpiece */}
            <div className={styles.orb}>
                {/* CORE - Pulsating energy nucleus */}
                <div className={styles.core} />
            </div>
        </div>
    );
}

export default FutureVisionOrb;