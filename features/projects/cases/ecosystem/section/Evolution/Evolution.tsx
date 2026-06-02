"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Evolution.css";

// Garante o registro do plugin (boa prática para evitar problemas em produção)
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
    const sectionRef = useRef(null);
    const progressRef = useRef(null);
    const orbRef = useRef(null);

    useGSAP(() => {
        // Timeline mestre acoplada ao scroll da seção inteira
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top center+=100", // Começa um pouco antes do meio da tela
                end: "bottom center+=100", // Termina quando o final da seção passa pelo meio
                scrub: 1, // Suaviza o movimento em 1 segundo (efeito amanteigado)
            }
        });

        // 1. Animação da Linha Energética (Preenchimento)
        tl.to(progressRef.current, {
            height: "100%",
            ease: "none"
        }, 0);

        // 2. Animação Progressiva dos Itens da Timeline (Cards e Ícones)
        const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
        items.forEach((item: HTMLElement) => {
            const dot = item.querySelector(".timeline-dot");
            const card = item.querySelector(".timeline-card");
            const isLeft = item.classList.contains("timeline-left");

            // Ativa o brilho do ícone/dot quando a energia passa por ele
            tl.to(dot, {
                backgroundColor: "rgba(96, 165, 250, 0.25)",
                borderColor: "#60a5fa",
                boxShadow: "0 0 20px rgba(96, 165, 250, 0.6)",
                scale: 1.1,
                duration: 0.2
            }, ">-0.1"); // Inicia um pouquinho antes da barra terminar de passar

            // Faz o card surgir vindo do lado correto (efeito de conexão)
            tl.fromTo(card,
                {
                    opacity: 0,
                    x: isLeft ? -50 : 50,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out"
                },
                "<" // Começa exatamente junto com a ativação do dot
            );
        });

        // 3. Upgrade do Orb Final (Crescendo e brilhando com energia acumulada)
        tl.fromTo(orbRef.current,
            {
                scale: 0.8,
                boxShadow: "0 0 0px rgba(96, 165, 250, 0)"
            },
            {
                scale: 1.25,
                borderColor: "#60a5fa",
                boxShadow: "0 0 50px rgba(96, 165, 250, 0.5), inset 0 0 30px rgba(96, 165, 250, 0.3)",
                duration: 0.5,
                ease: "back.out(2)"
            },
            ">" // Entra logo após o último card se consolidar
        );

    }, { scope: sectionRef }); // Escopo para evitar conflito com outros seletores do app

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
                    {/* Linha de fundo apagada */}
                    <div className="timeline-line" />

                    {/* 🔥 Linha energética que o GSAP vai preencher */}
                    <div ref={progressRef} className="timeline-progress" />

                    {milestones.map((item, index) => (
                        <div
                            key={item.title}
                            className={`timeline-item ${index % 2 === 0 ? "timeline-left" : "timeline-right"
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
                    {/* 🔥 O Orb agora tem a Ref para expandir no final do scroll */}
                    <div ref={orbRef} className="evolution-orb">
                        <div className="evolution-orb-glow" />
                        <span>NEXUS</span>
                    </div>

                    <p className="evolution-manifesto">
                        From Experiences
                        <br />
                        To Intelligence
                        <br />
                        To Systems
                        <br />
                        To Ecosystems
                    </p>
                </div>
            </div>
        </section>
    );
}