// components/Magnetic.tsx
"use client";
import React, { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from './MagneticContext'; // Importa o hook do contexto

interface MagneticProps {
    children: ReactNode;
    strength?: number; // Quão forte é a atração magnética. Aumentado o default para 0.4 para mais impacto.
}

export default function Magnetic({ children, strength = 0.4 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { setMagneticOffset } = useMagnetic();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (ref.current) {
            const { clientX, clientY } = e;
            const { width, height, left, top } = ref.current.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            // Calcula o "puxão" magnético
            const magneticX = x * strength;
            const magneticY = y * strength;

            setMagneticOffset({ x: magneticX, y: magneticY });
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        setMagneticOffset({ x: 0, y: 0 });
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            // Opcional: Adiciona um efeito de escala sutil ao próprio botão quando hover
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {children}
        </motion.div>
    );
}