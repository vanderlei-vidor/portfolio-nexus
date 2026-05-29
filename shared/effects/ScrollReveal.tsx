// components/ScrollReveal.tsx
"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollReveal() {
    useEffect(() => {
        const elements = document.querySelectorAll(".reveal");
        elements.forEach((el) => {
            gsap.from(el, {
                opacity: 0,
                y: 40,
                duration: 1.5, // Mais lento = mais premium
                ease: "power4.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            });
        });
    }, []);

    return null;
}