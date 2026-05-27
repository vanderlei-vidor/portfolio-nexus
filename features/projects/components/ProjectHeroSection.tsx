// components/ProjectHeroSection.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectHeroSectionProps {
    slug: string;
    formattedTitle: string;
}

export default function ProjectHeroSection({ slug, formattedTitle }: ProjectHeroSectionProps) {
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".hero-background", {
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                },
                scale: 1.05,
                opacity: 0.6,
                ease: "none",
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative h-[80vh] flex items-end px-6 pb-12 overflow-hidden hero-section">
            <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.4 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-0 grayscale hover:grayscale-0 transition-all duration-1000 hero-background"
            >
                <Image
                    src={`/textures/${slug}.jpg`}
                    alt={formattedTitle}
                    fill
                    priority
                    className="object-cover"
                />
            </motion.div>

            <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

            <div className="relative z-20 max-w-6xl mx-auto w-full">
                <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xs font-mono text-accent uppercase tracking-[0.3em] block mb-4"
                >
                    Case Study // {slug}
                </motion.span>

                <motion.h1
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8, ease: "circOut" }}
                    className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none"
                >
                    {formattedTitle}
                </motion.h1>
            </div>
        </section>
    );
}