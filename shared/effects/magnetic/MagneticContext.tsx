// app/contexts/MagneticContext.tsx
"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface MagneticContextType {
    magneticOffset: { x: number; y: number };
    setMagneticOffset: (offset: { x: number; y: number }) => void;
}

const MagneticContext = createContext<MagneticContextType | undefined>(undefined);

export const MagneticProvider = ({ children }: { children: ReactNode }) => {
    const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

    return (
        <MagneticContext.Provider value={{ magneticOffset, setMagneticOffset }}>
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