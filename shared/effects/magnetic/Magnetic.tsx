"use client";
import React, { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from './MagneticContext';

interface MagneticProps {
    children: ReactNode;
    strength?: number;
}

export default function Magnetic({ children, strength = 0.4 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { magneticX, magneticY } = useMagnetic(); // Consome os MotionValues nativos
    const [isHovered, setIsHovered] = useState(false);
    
    // Armazena as dimensões do botão em um Ref para não causar reflow no mousemove
    const rectRef = useRef<{ width: number; height: number; left: number; top: number } | null>(null);

    // ✅ OTIMIZAÇÃO: Mede o botão UMA ÚNICA VEZ ao entrar com o mouse
    const handleMouseEnter = () => {
        if (ref.current) {
            rectRef.current = ref.current.getBoundingClientRect();
        }
        setIsHovered(true);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (rectRef.current) {
            const { clientX, clientY } = e;
            const { width, height, left, top } = rectRef.current;
            
            // Cálculos matemáticos limpos na memória, sem consultar o DOM
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            // Seta o valor direto na thread do Framer Motion (Zero re-renders no React)
            magneticX.set(x * strength);
            magneticY.set(y * strength);
        }
    };

    const handleMouseLeave = () => {
        magneticX.set(0);
        magneticY.set(0);
        rectRef.current = null; // Limpa o cache
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {children}
        </motion.div>
    );
}