"use client";
import React, { createContext, useContext, ReactNode } from 'react';
import { useMotionValue, MotionValue } from 'framer-motion';

interface MagneticContextType {
    // Trocamos o estado bruto por MotionValues estáveis
    magneticX: MotionValue<number>;
    magneticY: MotionValue<number>;
}

const MagneticContext = createContext<MagneticContextType | undefined>(undefined);

export const MagneticProvider = ({ children }: { children: ReactNode }) => {
    // MotionValues NÃO disparam re-renderizações no componente quando mudam de valor!
    const magneticX = useMotionValue(0);
    const magneticY = useMotionValue(0);

    return (
        <MagneticContext.Provider value={{ magneticX, magneticY }}>
            {children}
        </MagneticContext.Provider>
    );
};

export const useMagnetic = () => {
    const context = useContext(MagneticContext);
    if (context === undefined) {
        throw new Error('useMagnetic must be used within a MagneticProvider');
    }
    return context;
};