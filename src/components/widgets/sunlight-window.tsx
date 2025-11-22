"use client";

import { useEffect, useState } from "react";
import styles from "./sunlight.module.css";

export function SunlightWindow() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // On mobile, only show the background color (no expensive effects)
  if (isMobile) {
    return <div className={styles["sunlight-background"]} />;
  }

  return (
    <>
      <div className={styles["sunlight-background"]} />

      {/* Shadows and Blur - Layered behind content */}
      <div className={styles["sunlight-shadows"]}>
        <div className={styles.perspective}>
          <div className={styles.leaves}>
            <svg style={{ width: 0, height: 0, position: "absolute" }}>
              <defs>
                <filter id="wind" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence type="fractalNoise" numOctaves="2" seed="1">
                    <animate
                      attributeName="baseFrequency"
                      dur="16s"
                      keyTimes="0;0.33;0.66;1"
                      values="0.005 0.003;0.01 0.009;0.008 0.004;0.005 0.003"
                      repeatCount="indefinite"
                    />
                  </feTurbulence>
                  <feDisplacementMap in="SourceGraphic">
                    <animate
                      attributeName="scale"
                      dur="20s"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="45;55;75;55;45"
                      repeatCount="indefinite"
                    />
                  </feDisplacementMap>
                </filter>
              </defs>
            </svg>
          </div>
          <div className={styles.blinds}>
            <div className={styles.shutters}>
              {Array.from({ length: 23 }).map((_, i) => (
                <div key={i} className={styles.shutter} />
              ))}
            </div>
            <div className={styles.vertical}>
              <div className={styles.bar} />
              <div className={styles.bar} />
            </div>
          </div>
        </div>
        <div className={styles["progressive-blur"]}>
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>

      {/* Glow Overlay - Layered on top of content */}
      <div className={styles["sunlight-overlay"]}>
        <div className={styles.glow} />
        <div className={styles["glow-bounce"]} />
      </div>
    </>
  );
}
