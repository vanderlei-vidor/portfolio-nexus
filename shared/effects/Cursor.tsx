// components/Cursor.tsx
"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useMagnetic } from "@/shared/effects/magnetic/MagneticContext";

export default function Cursor() {
    const { magneticOffset } = useMagnetic(); // Consome o offset magnético
    const [isMobile, setIsMobile] = useState(true); // Inicializa como true para evitar flash no mobile

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    // Configuração de mola para física natural, agora influenciada pelo magneticOffset
    const springConfig = { damping: 25, stiffness: 150, mass: 0.1 }; // Ajustado massa para mais responsividade
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        // 🚀 Detecta se o dispositivo possui suporte a touch ou tela menor que 768px (Mobile/Tablet)
        const checkDevice = () => {
            const hasTouch = window.matchMedia("(pointer: coarse)").matches ||
                ("ontouchstart" in window) ||
                (navigator.maxTouchPoints > 0);
            const isSmallScreen = window.innerWidth < 768;

            setIsMobile(hasTouch || isSmallScreen);
        };

        // Executa a checagem inicial
        checkDevice();
        window.addEventListener("resize", checkDevice);

        const moveCursor = (e: MouseEvent) => {
            // Aplica o offset magnético à posição do cursor
            cursorX.set(e.clientX - 12 + magneticOffset.x);
            cursorY.set(e.clientY - 12 + magneticOffset.y);
        };

        // Só adiciona o listener de mouse se NÃO for dispositivo móvel
        if (!isMobile) {
            window.addEventListener("mousemove", moveCursor);
        }

        return () => {
            window.removeEventListener("resize", checkDevice);
            window.removeEventListener("mousemove", moveCursor);
        };
    }, [cursorX, cursorY, magneticOffset, isMobile]);

    // 🔥 Se for Mobile/Touch, mata o componente aqui para sumir com a bolinha branca do canto da tela
    if (isMobile) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none mix-blend-difference z-[9999]"
            style={{ x: springX, y: springY }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
        />
    );
}