"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<LenisRef>(null);
    const refreshFrameRef = useRef<number | null>(null);
    const pathname = usePathname();

    const refreshScrollMeasurements = useCallback(() => {
        if (refreshFrameRef.current !== null) {
            cancelAnimationFrame(refreshFrameRef.current);
        }

        refreshFrameRef.current = requestAnimationFrame(() => {
            refreshFrameRef.current = null;

            // Pins alteram a altura da pagina durante o refresh do ScrollTrigger.
            ScrollTrigger.refresh();
            lenisRef.current?.lenis?.resize();
        });
    }, []);

    const scrollToHash = useCallback((hash: string) => {
        if (!hash) return false;

        try {
            const selector = decodeURIComponent(hash);
            const target = document.querySelector(selector);

            if (!target) return false;

            lenisRef.current?.lenis?.scrollTo(target as HTMLElement, {
                immediate: true,
                force: true,
            });

            if (!lenisRef.current?.lenis) {
                target.scrollIntoView({ block: "start" });
            }

            refreshScrollMeasurements();
            return true;
        } catch {
            return false;
        }
    }, [refreshScrollMeasurements]);

    useEffect(() => {
        window.history.scrollRestoration = "manual";

        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
            ScrollTrigger.update();
        }

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        const handleLoad = () => refreshScrollMeasurements();
        window.addEventListener("load", handleLoad);

        // O ResizeObserver interno do Lenis observa o documentElement, que pode
        // manter a mesma caixa mesmo quando o scrollHeight do body muda.
        const bodyResizeObserver = new ResizeObserver(refreshScrollMeasurements);
        bodyResizeObserver.observe(document.body);

        void document.fonts?.ready.then(refreshScrollMeasurements);
        refreshScrollMeasurements();

        return () => {
            gsap.ticker.remove(update);
            window.removeEventListener("load", handleLoad);
            bodyResizeObserver.disconnect();

            if (refreshFrameRef.current !== null) {
                cancelAnimationFrame(refreshFrameRef.current);
                refreshFrameRef.current = null;
            }
        };
    }, [refreshScrollMeasurements]);

    useEffect(() => {
        const resetFrame = requestAnimationFrame(() => {
            const didScrollToHash = scrollToHash(window.location.hash);

            if (!didScrollToHash) {
                lenisRef.current?.lenis?.scrollTo(0, { immediate: true, force: true });
                window.scrollTo(0, 0);
            }

            // Força o GSAP a esquecer os cálculos da página anterior e mapear a nova
            ScrollTrigger.clearScrollMemory();
            refreshScrollMeasurements();
        });

        return () => cancelAnimationFrame(resetFrame);
    }, [pathname, refreshScrollMeasurements, scrollToHash]);

    useEffect(() => {
        const handleHashChange = () => {
            requestAnimationFrame(() => {
                scrollToHash(window.location.hash);
            });
        };

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, [scrollToHash]);

    return (
        <ReactLenis
            root
            ref={lenisRef}
            autoRaf={false}
            options={{
                // ✅ OTIMIZAÇÃO: Deixamos apenas o lerp para controlar a suavidade de forma limpa
                lerp: 0.07,
                smoothWheel: true,
                syncTouch: false,
            }}
        >
            {children}
        </ReactLenis>
    );
}
