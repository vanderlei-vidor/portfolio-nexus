"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollReveal() {
    useEffect(() => {
        // ✅ OTIMIZAÇÃO: O gsap.context isola e monitora todas as animações deste efeito
        const ctx = gsap.context(() => {
            const elements = document.querySelectorAll(".reveal");
            
            elements.forEach((el) => {
                gsap.from(el, {
                    opacity: 0,
                    y: 40,
                    duration: 1.5, // Efeito premium lento
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                        // invalidateOnRefresh: true // Recalcula se o layout mudar de tamanho
                    },
                });
            });
        });

        // ✅ CRÍTICO: Limpa TODOS os triggers da memória ao desmontar/mudar de página
        return () => ctx.revert();
    }, []);

    return null;
}