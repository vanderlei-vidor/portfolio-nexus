"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 🚀 Mecanismo robusto e performático para verificar hidratação sem causar renders em cascata
const emptySubscribe = () => () => { };
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

interface Particle {
  id: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
}

export default function DeviceReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const [isBooting, setIsBooting] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);

  const isMounted = useIsMounted();

  // 🚀 Lazy Initial State: Executa o Math.random() apenas UMA vez na inicialização no cliente,
  // mantendo o render 100% puro e seguro para o compilador.
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = deviceRef.current?.getBoundingClientRect();
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => {
          setIsBooting(true);

          gsap.to({}, {
            duration: 3,
            onUpdate: function () {
              setBootProgress(Math.round(this.progress() * 100));
            },
            onComplete: () => {
              setIsBooting(false);
            }
          });

          gsap.fromTo(
            ".boot-text",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, delay: 0.5 }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 py-32">

      {/* Ambient Glow */}
      <div className="absolute left-1/2 top-1/2 h-200 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/5 blur-[200px]" />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0c_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0c_1px,transparent_1px)] bg-size-[80px_80px] opacity-20" />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.1) 0px,
            rgba(255, 255, 255, 0.1) 1px,
            transparent 1px,
            transparent 2px
          )`
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 lg:grid-cols-2">

        {/* Left Content */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <span className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-blue-400">
            Product Experience
          </span>

          <h2 className="max-w-xl text-5xl font-bold tracking-[-0.06em] text-white md:text-7xl leading-[0.95]">
            Built to feel
            <br />
            <span className="bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              alive.
            </span>
          </h2>

          <p className="mt-8 max-w-md text-sm leading-relaxed text-zinc-500 md:text-base">
            Designed as a premium music ecosystem focused on music from devices, with immersive interactions, fluid rendering, and cinematic interface movements.
          </p>
        </motion.div>

        {/* Device Showcase */}
        <div className="relative flex items-center justify-center perspective-[2000px]">

          {/* Background Reflection */}
          <div className="absolute h-150 w-150 rounded-full bg-linear-to-br from-blue-500/20 via-purple-500/10 to-cyan-500/10 blur-[150px] animate-pulse duration-4000" />

          {/* Device Container */}
          <motion.div
            ref={deviceRef}
            className="relative w-65 transform-gpu transition-transform duration-700 hover:rotate-0"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
            initial={{ rotate: -8, opacity: 0, scale: 0.9 }}
            whileInView={{ rotate: -8, opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div className="overflow-hidden rounded-[3rem] border border-white/10 bg-zinc-950 p-0.5 shadow-[0_40px_120px_rgba(0,0,0,0.9)]">

              {/* TELA ABSTRATA DO TEASER */}
              <div className="relative aspect-394/839 w-full rounded-[2.8rem] bg-zinc-900 overflow-hidden flex flex-col justify-between p-6">

                {/* Efeito de Vidro/Brilho interno */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-tr from-blue-600/20 via-transparent to-purple-600/20"
                  animate={{
                    opacity: isBooting ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: isBooting ? 1 : 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Top Bar */}
                <motion.div
                  className="w-full flex justify-between items-center z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="h-2 w-8 rounded-full bg-white/20" />
                  <div className="h-3 w-3 rounded-full bg-white/20" />
                </motion.div>

                {/* Centro da Tela: Boot Sequence */}
                <div className="flex flex-col items-center gap-6 z-10 justify-center flex-1">

                  {/* Logo/Ícone pulsante */}
                  <motion.div
                    className="relative flex items-center justify-center"
                    animate={{
                      scale: isBooting ? [1, 1.2, 1] : [1, 1.05, 1],
                    }}
                    transition={{
                      duration: isBooting ? 0.5 : 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.div
                      className="absolute h-16 w-16 rounded-full bg-blue-500/30 blur-md"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-400 to-indigo-600 flex items-center justify-center border border-white/20 shadow-lg shadow-blue-500/20">
                      <motion.div
                        className="h-3 w-3 rounded-full bg-white"
                        animate={{
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Boot Text */}
                  <div className="flex flex-col items-center gap-2">
                    <motion.span
                      className="boot-text font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase"
                    >
                      {isBooting ? "Initializing" : "Ecosystem_Standby"}
                    </motion.span>

                    {isBooting && (
                      <motion.div
                        className="w-32 h-1 bg-white/10 rounded-full overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.div
                          className="h-full bg-linear-to-r from-blue-400 to-purple-500"
                          initial={{ width: "0%" }}
                          animate={{ width: `${bootProgress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </motion.div>
                    )}

                    <motion.span
                      className="boot-text font-mono text-[8px] text-zinc-600 tracking-widest"
                    >
                      {isBooting ? `Loading... ${bootProgress}%` : "Ready to explore"}
                    </motion.span>
                  </div>
                </div>

                {/* Base da Tela */}
                <motion.div
                  className="w-full flex flex-col gap-2 z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="h-1 w-full rounded-full bg-white/10" />
                  <div className="h-1 w-2/3 rounded-full bg-white/10" />
                </motion.div>

                {/* Glass Reflection */}
                <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/4 to-white/0 pointer-events-none" />

                {isBooting && (
                  <motion.div
                    className="absolute inset-0 bg-blue-500/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                )}
              </div>
            </div>

            {/* 🚀 Partículas renderizadas com segurança apenas após a montagem real do lado do cliente */}
            <div className="absolute inset-0 pointer-events-none">
              {isMounted && particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute h-1 w-1 rounded-full bg-blue-400/40"
                  style={{
                    left: particle.left,
                    top: particle.top,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay,
                  }}
                />
              ))}
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}