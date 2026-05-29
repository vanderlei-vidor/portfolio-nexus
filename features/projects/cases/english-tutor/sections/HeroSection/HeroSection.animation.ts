import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initHeroAnimation() {
    // 1️⃣ TIMELINE DE INTRODUÇÃO (Roda assim que a página carrega)
    const introTl = gsap.timeline();

    introTl.fromTo(
        ".hero-atmosphere",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: "power3.out" }
    );

    introTl.fromTo(
        ".hero-orb",
        { scale: 0.5, opacity: 0, y: 80 },
        { scale: 1, opacity: 1, y: 0, duration: 1.4, ease: "power4.out" },
        "-=1.2"
    );

    introTl.fromTo(
        ".hero-eyebrow",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=.5"
    );

    introTl.fromTo(
        ".hero-line",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.18, ease: "power3.out" },
        "-=.4" // 💡 Ajustado o tempo para colar com a animação anterior
    );

    introTl.fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=.2"
    );

    introTl.fromTo(
        ".hero-scroll",
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=.2"
    );

    // 2️⃣ TIMELINE DE SCROLL (Atua conforme o usuário rola a página)
    const scrollTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-section", // Target correto do container principal
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
        },
    });

    scrollTl.to(".hero-content", {
        y: -120,
        opacity: 0,
    }, 0);

    // 💡 Corrigido para .hero-orb para bater com seu HTML
    scrollTl.to(".hero-orb-wrapper", {
        scale: 0.82,
        y: -120,
        x: -120,
    }, 0);

    scrollTl.to(".hero-atmosphere", {
        opacity: 0.25,
    }, 0);
}