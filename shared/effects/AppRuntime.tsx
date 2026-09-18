"use client";

import { useEffect, useState, type ReactNode } from "react";
import { MagneticProvider } from "@/shared/effects/magnetic/MagneticContext";
import { MouseProvider } from "@/shared/context/MouseContext";
import Cursor from "@/shared/effects/Cursor";
import PageTransition from "@/shared/effects/PageTransition";
import SmoothScroll from "@/shared/effects/SmoothScroll";
import { LanguageProvider } from "@/shared/i18n/LanguageContext";
import LanguageSwitcher from "@/shared/ui/LanguageSwitcher";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function AppRuntime({ children }: { children: ReactNode }) {
    const [enableEnhancedEffects, setEnableEnhancedEffects] = useState(false);

    useEffect(() => {
        const enable = () => setEnableEnhancedEffects(true);

        if (typeof window !== "undefined" && "requestIdleCallback" in window) {
            const idleId = window.requestIdleCallback(enable);
            return () => window.cancelIdleCallback(idleId);
        }

        const timeoutId = globalThis.setTimeout(enable, 350);
        return () => globalThis.clearTimeout(timeoutId);
    }, []);

    const content = (
        <>
            <div className="fixed right-3 top-3 z-50 sm:right-6 sm:top-6">
                <LanguageSwitcher />
            </div>
            {children}
            <SpeedInsights />
        </>
    );

    return (
        <LanguageProvider>
            <MouseProvider>
                <MagneticProvider>
                    {enableEnhancedEffects ? (
                        <SmoothScroll>
                            <PageTransition>
                                <Cursor />
                                {content}
                            </PageTransition>
                        </SmoothScroll>
                    ) : (
                        <PageTransition>
                            {content}
                        </PageTransition>
                    )}
                </MagneticProvider>
            </MouseProvider>
        </LanguageProvider>
    );
}
