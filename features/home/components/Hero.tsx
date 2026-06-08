// components/Hero.tsx
"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link"; // Import Link
import { useEffect } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import Magnetic from "@/shared/effects/magnetic/Magnetic";
import { useMagnetic } from "@/shared/effects/magnetic/MagneticContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MotionLink = motion.create(Link);

// Registra o plugin do GSAP fora do componente para evitar recarregamentos duplicados
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const lenis = useLenis();
  const { magneticOffset } = useMagnetic(); // Consome o deslocamento magnético

  const scrollToProjects = () => {
    lenis?.scrollTo("#selected-projects", {
      duration: 2.5, // Tempo em segundos. Aumente para ficar ainda mais devagar.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de desaceleração suave
    });
  };

  // Estados para a posição do mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Configuração de mola para suavizar o movimento
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Criamos MotionValues que somam a posição do mouse com o "puxão" magnético
  const lightX = useTransform(springX, (val) => val + magneticOffset.x);
  const lightY = useTransform(springY, (val) => val + magneticOffset.y);

  // Essa função vai monitorar o springX e o springY e gerar o texto do CSS injetando os valores na hora certa
  const backgroundGradient = useTransform(
    [lightX, lightY],
    ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, rgba(var(--color-accent-rgb), 0.25) 0%, transparent 70%)`
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (document.querySelector(".hero-bg")) {
        gsap.to(".hero-bg", {
          y: "20%",
          opacity: 0.5,
          scrollTrigger: {
            trigger: "section",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="
    min-h-screen
    flex
    flex-col
    justify-center
    items-center
    text-center
    px-[clamp(1.25rem,4vw,6rem)]
    relative
    overflow-hidden
    bg-black
  "
    >
      <motion.div
        className="hero-bg absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: backgroundGradient,
          x: magneticOffset.x * 1.0, // Movimento mais pronunciado do plano de fundo
          y: magneticOffset.y * 1.0
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="uppercase
  tracking-[0.4em]
  text-zinc-500
  font-medium
  mb-[clamp(1.5rem,3vw,3rem)]
  text-[clamp(0.65rem,1vw,0.8rem)]"
      >
        DIGITAL EXPERIENCES
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="
    font-black
    leading-[0.82]
    tracking-[-0.06em]
    text-white
    text-[clamp(3rem,11vw,8rem)]
    max-w-[10ch]
  "
      >
        CRAFTING
        <br />
        THE FUTURE.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className=" mt-[clamp(1.5rem,4vw,3rem)]
  opacity-40
  font-light
  leading-relaxed
  max-w-[40ch]
  text-[clamp(1rem,2vw,1.4rem)]"
      >
        Smooth. Elegant. Cinematic.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="
  mt-[clamp(2rem,6vw,5rem)]
  flex
  flex-col
  sm:flex-row
  items-center
  gap-[clamp(1rem,2vw,2rem)]
  w-full
  sm:w-auto
"
      >
        <Magnetic strength={0.2}>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#f0f0f0" }} // Levemente fora do branco para um feedback sutil
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={scrollToProjects}
            className="w-full
  sm:w-auto
  px-[clamp(1.5rem,3vw,3rem)]
  py-[clamp(0.9rem,2vw,1.25rem)]
  bg-white
  text-black
  rounded-full
  font-bold
  text-[clamp(0.85rem,1vw,1rem)]"
          >
            Explore Work
          </motion.button>
        </Magnetic>
        <Magnetic strength={0.2}>
          <MotionLink
            href="/process"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="inline-flex
  justify-center
  w-full
  sm:w-auto
  px-[clamp(1.5rem,3vw,3rem)]
  py-[clamp(0.9rem,2vw,1.25rem)]
  border
  border-white/10
  rounded-full
  font-bold
  text-[clamp(0.85rem,1vw,1rem)]"
          >
            The Process
          </MotionLink>
        </Magnetic>
      </motion.div>
    </section>
  );
}
