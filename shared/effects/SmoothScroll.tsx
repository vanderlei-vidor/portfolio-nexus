
"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<LenisRef>(null);
    const pathname = usePathname();

    const scrollToHash = useCallback((hash: string) => {
        if (!hash) {
            return false;
        }

        try {
            const selector = decodeURIComponent(hash);
            const target = document.querySelector(selector);

            if (!target) {
                return false;
            }

            lenisRef.current?.lenis?.scrollTo(target as HTMLElement, {
                immediate: true,
                force: true,
            });

            if (!lenisRef.current?.lenis) {
                target.scrollIntoView({ block: "start" });
            }

            ScrollTrigger.refresh();
            return true;
        } catch {
            return false;
        }
    }, []);

    useEffect(() => {
        window.history.scrollRestoration = "manual";

        // Sincroniza o ticker do GSAP com o do Lenis para animações frame-perfect
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
            ScrollTrigger.update();
        }
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        // Ajuste AAA: Força o ScrollTrigger a recalcular as posições no primeiro boot
        // Isso evita que elementos com 'pin' ou parallax "saltem" na tela
        ScrollTrigger.refresh();

        return () => {
            gsap.ticker.remove(update);
        };
    }, []);

    useEffect(() => {
        const resetFrame = requestAnimationFrame(() => {
            const didScrollToHash = scrollToHash(window.location.hash);

            if (!didScrollToHash) {
                lenisRef.current?.lenis?.scrollTo(0, { immediate: true, force: true });
                window.scrollTo(0, 0);
            }

            ScrollTrigger.refresh();
        });

        return () => cancelAnimationFrame(resetFrame);
    }, [pathname, scrollToHash]);

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
                lerp: 0.05,     // Diminuir o lerp (ex: 0.05) deixa o scroll mais "pesado" e suave
                duration: 2.0, // Aumentar a duração (ex: 2.0) torna a frenagem mais longa
                smoothWheel: true,
                syncTouch: false, // Desativa a sincronização em dispositivos touch para usar o scroll nativo (Mobile)
            }}
        >
            {children}
        </ReactLenis>
    );
}
