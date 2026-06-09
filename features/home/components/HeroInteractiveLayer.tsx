"use client";

import { motion, useSpring, useTransform, useScroll } from "framer-motion";
import { useMagnetic } from "@/shared/effects/magnetic/MagneticContext";
import { useMouse } from "@/shared/context/MouseContext"; // 🚀 Consome o mesmo contexto

export default function HeroInteractiveLayer() {
  const { mouseX, mouseY } = useMouse();
  const { magneticX, magneticY } = useMagnetic();

  // Mantém o Parallax de Scroll acelerado por hardware
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, 200]);

  const springConfig = { damping: 50, stiffness: 200, mass: 0.2 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const lightX = useTransform([springX, magneticX], ([sX, mX]) => (sX as number) + (mX as number));
  const lightY = useTransform([springY, magneticY], ([sY, mY]) => (sY as number) + (mY as number));

  return (
    <motion.div
      className="absolute inset-0 -z-10 pointer-events-none will-change-transform"
      style={{ y: parallaxY }}
    >
      <motion.div
        className="absolute w-200 h-200 rounded-full bg-[radial-gradient(circle,rgba(var(--color-accent-rgb),0.15)_0%,transparent_70%)] pointer-events-none will-change-transform"
        style={{
          x: lightX,
          y: lightY,
          left: -400,
          top: -400,
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}