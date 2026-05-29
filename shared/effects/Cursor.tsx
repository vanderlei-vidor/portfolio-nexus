// components/Cursor.tsx
"use client";
import { useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useMagnetic } from "@/shared/effects/magnetic/MagneticContext";

export default function Cursor() {
    const { magneticOffset } = useMagnetic(); // Consome o offset magnético

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    // Configuração de mola para física natural, agora influenciada pelo magneticOffset
    const springConfig = { damping: 25, stiffness: 150, mass: 0.1 }; // Ajustado massa para mais responsividade
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            // Aplica o offset magnético à posição do cursor
            cursorX.set(e.clientX - 12 + magneticOffset.x);
            cursorY.set(e.clientY - 12 + magneticOffset.y);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY, magneticOffset]); // Adiciona magneticOffset como dependência

    return (
        <motion.div
            className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none mix-blend-difference z-50"
            style={{ x: springX, y: springY }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
        />
    );
}
