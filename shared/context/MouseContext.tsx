"use client";

import { createContext, useContext, useEffect } from "react";
import { useMotionValue, MotionValue } from "framer-motion";

interface MouseContextType {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

const MouseContext = createContext<MouseContextType | null>(null);

export function MouseProvider({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Otimização: Não ativa o listener se for dispositivo touch/mobile
    const isMobileDevice = () => {
      return (
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 768
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    if (!isMobileDevice()) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <MouseContext.Provider value={{ mouseX, mouseY }}>
      {children}
    </MouseContext.Provider>
  );
}

export function useMouse() {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error("useMouse deve ser usado dentro de um MouseProvider");
  }
  return context;
}