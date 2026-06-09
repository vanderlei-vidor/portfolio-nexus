"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useMagnetic } from "@/shared/effects/magnetic/MagneticContext";
import { useMouse } from "@/shared/context/MouseContext"; // 🚀 Consome o novo contexto

export default function Cursor() {
  const { mouseX, mouseY } = useMouse();
  const { magneticX, magneticY } = useMagnetic();
  const [isMobile, setIsMobile] = useState(true);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.1 };

  // 🔥 Mapeamento reativo puro: junta o mouse global com o offset magnético instantaneamente
  const rawX = useTransform([mouseX, magneticX], ([x, mx]) => (x as number) - 12 + (mx as number));
  const rawY = useTransform([mouseY, magneticY], ([y, my]) => (y as number) - 12 + (my as number));

  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  useEffect(() => {
    const checkDevice = () => {
      const hasTouch = window.matchMedia("(pointer: coarse)").matches ||
        ("ontouchstart" in window) ||
        navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;

      setIsMobile(hasTouch || isSmallScreen);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice, { passive: true });

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none mix-blend-difference z-9999"
      style={{ x: springX, y: springY }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
    />
  );
}