import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 💡 Passamos o elemento pai (container) para isolar os seletores dentro do ecossistema React
export function initGamificationAnimation(container: HTMLElement | null) {
    if (!container) return;

    // Cria um contexto do GSAP para limpar tudo se o componente desmontar
    const ctx = gsap.context(() => {
        const counter = { value: 0 };
        const xpElement = container.querySelector(".xp-counter");

        // 1. Animação do Contador Numérico de XP
        gsap.to(counter, {
            value: 5308,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: container,
                start: "top 75%",
                toggleActions: "play none none none", // Evita bugs ao re-scrollar
            },
            onUpdate: () => {
                if (xpElement) {
                    xpElement.textContent = `${Math.floor(counter.value)} XP`;
                }
            },
        });

        // 2. Animação do Enchimento da Barra
        gsap.fromTo(
            container.querySelector(".progress-fill"),
            { width: "0%" },
            {
                width: "68%",
                duration: 2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: container,
                    start: "top 75%",
                    toggleActions: "play none none none", // 🔥 ADICIONADO: Garante consistência no scroll
                },
            }
        );
    }, container);

    return () => ctx.revert(); // Retorna a função de limpeza (cleanup)
}