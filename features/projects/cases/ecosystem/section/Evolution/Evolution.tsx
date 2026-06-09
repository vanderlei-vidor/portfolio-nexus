"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Evolution.css";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
    {
        icon: "🎵",
        title: "Experience",
        year: "2024",
        description: "Creating memorable interfaces. Designing interactions. Building emotional experiences.",
    },
    {
        icon: "◉",
        title: "Intelligence",
        year: "2025",
        description: "Introducing AI. Personalizing learning. Creating adaptive systems.",
    },
    {
        icon: "▣",
        title: "Control",
        year: "2025",
        description: "Scaling complexity. Managing data. Building business platforms.",
    },
    {
        icon: "✦",
        title: "Vision",
        year: "2026",
        description: "Connecting products. Building ecosystems. Designing the future.",
    },
];

export default function Evolution() {
    const sectionRef = useRef<HTMLElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const orbRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // ⚡ Criação do contexto responsivo nativo do GSAP
        const mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 769px)",
            isMobile: "(max-width: 768px)"
        }, (context) => {
            // Captura qual condição de tela está ativa no momento
            const { isDesktop } = context.conditions ?? { isDesktop: true };

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center+=100",
                    end: "bottom center+=100",
                    scrub: 1,
                }
            });

            // 1. Linha Energética preenche igual em ambos
            tl.to(progressRef.current, {
                height: "100%",
                ease: "none"
            }, 0);

            // 2. Animação condicional dos itens baseado no dispositivo
            const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
            items.forEach((item: HTMLElement) => {
                const dot = item.querySelector(".timeline-dot");
                const card = item.querySelector(".timeline-card");
                const isLeft = item.classList.contains("timeline-left");

                tl.to(dot, {
                    backgroundColor: "rgba(96, 165, 250, 0.25)",
                    borderColor: "#60a5fa",
                    boxShadow: "0 0 20px rgba(96, 165, 250, 0.6)",
                    scale: 1.1,
                    duration: 0.2
                }, ">-0.1");

                // ⚡ Configura direções profissionais de entrada
                // Desktop: Alterna esquerda (-50) e direita (50) | Mobile: Todos sobem suavemente (y: 30)
                const startX = isDesktop ? (isLeft ? -50 : 50) : 0;
                const startY = isDesktop ? 0 : 30;

                tl.fromTo(card,
                    {
                        opacity: 0,
                        x: startX,
                        y: startY,
                        scale: 0.95
                    },
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                        duration: 0.4,
                        ease: "power2.out"
                    },
                    "<"
                );
            });

            // 3. Orb Final
            tl.fromTo(orbRef.current,
                {
                    scale: 0.8,
                    boxShadow: "0 0 0px rgba(96, 165, 250, 0)"
                },
                {
                    scale: isDesktop ? 1.25 : 1.1, // Escala um pouco menor no mobile para não estourar a viewport
                    borderColor: "#60a5fa",
                    boxShadow: "0 0 50px rgba(96, 165, 250, 0.5), inset 0 0 30px rgba(96, 165, 250, 0.3)",
                    duration: 0.5,
                    ease: "back.out(2)"
                },
                ">"
            );
        });

        // O matchMedia se limpa sozinho aqui quando o componente desmonta!
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="evolution">
            <div className="evolution-container">
                <span className="evolution-label">EVOLUTION</span>

                <h2 className="evolution-title">
                    From Products.
                    <br />
                    To Ecosystems.
                </h2>

                <p className="evolution-description">
                    Each project expanded the scope, complexity and ambition of the journey.
                    Together they reveal a continuous evolution in product thinking, engineering and digital experiences.
                </p>

                <div className="timeline">
                    <div className="timeline-line" />
                    <div ref={progressRef} className="timeline-progress" />

                    {milestones.map((item, index) => (
                        <div
                            key={item.title}
                            className={`timeline-item ${
                                index % 2 === 0 ? "timeline-left" : "timeline-right"
                            }`}
                        >
                            <div className="timeline-dot">
                                {item.icon}
                            </div>

                            <div className="timeline-card">
                                <span className="timeline-year">{item.year}</span>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="evolution-final">
                    <div ref={orbRef} className="evolution-orb">
                        <div className="evolution-orb-glow" />
                        <span>NEXUS</span>
                    </div>

                    <div className="evolution-manifesto">
                        From Experiences
                        <br />
                        To Intelligence
                        <br />
                        To Systems
                        <br />
                        To Ecosystems
                    </div>
                </div>
            </div>
        </section>
    );
}