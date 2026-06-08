import styles from "./FutureVisionOrb.module.css";

export function FutureVisionOrb() {
    return (
        <div className={styles.wrapper}>
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
