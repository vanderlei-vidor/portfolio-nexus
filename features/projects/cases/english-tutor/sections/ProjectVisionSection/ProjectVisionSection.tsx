"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
// Ícones premium para os controles do showcase
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { FutureVisionOrb } from "../../components/FutureVisionOrb/FutureVisionOrb";

import styles from "./ProjectVisionSection.module.css";
import router from "next/router";
import { useRouter } from "next/navigation";

// Dados estruturados dos slides do English Tutor AI
const demoSlides = [
  {
    src: "/projects/english-tutor/textures/slide1-dashboard.webp",
    title: "AI Conversation Interface",
    description: "Immersive chat interface designed for real-time natural language processing and voice interaction.",
  },
  {
    src: "/projects/english-tutor/textures/slide2-corrections.webp",
    title: "Real-Time Grammar Feedback",
    description: "Proprietary pipeline that intercepts, analyzes, and fixes mistakes on the fly with context-aware suggestions.",
  },
  {
    src: "/projects/english-tutor/textures/slide3-metrics.webp",
    title: "Fluency Analytics",
    description: "Deep insights into vocabulary growth, pronunciation accuracy, and operational metrics.",
  },
];

export function ProjectVisionSection() {
  // Controle do Modal de Apresentação e estados do Slide
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const SLIDE_DURATION = 4000; // Tempo de cada slide (4 segundos)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

  // Lógica do Timer Automatizado (Autoplay dos slides)
  useEffect(() => {
    if (isDemoOpen && isPlaying) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, SLIDE_DURATION);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isDemoOpen, isPlaying, currentSlide]);

  // Funções de Navegação dos Slides
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === demoSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? demoSlides.length - 1 : prev - 1));
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>PROJECT VISION</span>
        <h2 className={styles.title}>
          The Future
          <br />
          Of Language Learning.
        </h2>
        <p className={styles.subtitle}>
          An AI companion that remembers, adapts and grows with every learner.
        </p>
      </div>

      <div className={styles.orbWrapper}>
        <FutureVisionOrb />
      </div>

      <div className={styles.pillars}>
        <div className={styles.pillar}>
          <span className={styles.icon}>🧠</span>
          <h3>AI Memory</h3>
          <p>Learning experiences that remember every interaction.</p>
        </div>

        <div className={styles.pillar}>
          <span className={styles.icon}>⚡</span>
          <h3>Adaptive Learning</h3>
          <p>Lessons that evolve according to performance and goals.</p>
        </div>

        <div className={styles.pillar}>
          <span className={styles.icon}>🌍</span>
          <h3>Human Connection</h3>
          <p>Technology designed to make learning natural and engaging.</p>
        </div>
      </div>

      <div className={styles.finalQuote}>
        <p>Learning is no longer static.</p>
        <span>It evolves with you.</span>
      </div>

      {/* --- SEÇÃO DE BOTÕES DE ALTA FIDELIDADE (CTA) --- */}
      <div className="mt-24 flex flex-col items-center gap-8 px-4">
        <div className="flex flex-wrap items-center justify-center gap-4">

          {/* Botão Principal: Disparador de Contato */}
          <button
            onClick={() => router.push("/contact")} // 3. Troca o mailto pela rota interna
            className="group relative px-12 py-5 bg-white text-black rounded-full font-bold text-sm overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            <span className="relative z-10">Start a Project</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>



          {/* Botão Interativo: Abre o Módulo de Slides Premium */}
          <button
            onClick={() => {
              setCurrentSlide(0);
              setIsPlaying(true);
              setIsDemoOpen(true);
            }}
            className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-medium text-white backdrop-blur-md transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95"
          >
            Watch Showcase
          </button>

          {/* Botão Secundário: Repositório do Código */}
          <button
            onClick={() => window.open("https://github.com/vanderlei-vidor", "_blank")}
            className="px-6 py-4 text-sm font-mono text-zinc-500 hover:text-white transition-colors"
          >
            &lt;Source /&gt;
          </button>
        </div>
      </div>

      <button
        onClick={() => window.location.href = "/"}
        className="mt-16 text-zinc-700 hover:text-zinc-400 text-xs font-mono transition-colors tracking-tighter"
      >
        [ Back to Home ]
      </button>

      {/* --- MODAL INTERATIVO ESTILIZADO AAA (FUSÃO CONCLUÍDA) --- */}
      {isDemoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-10 animate-in fade-in duration-500"
          onClick={() => setIsDemoOpen(false)} // Fecha o modal clicando no backdrop escuro
        >
          <div
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] bg-zinc-950 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()} // Evita o fechamento ao interagir com os controles
          >

            {/* BARRA DE PROGRESSO LINEAR SUPERIOR */}
            {isPlaying && (
              <div
                key={currentSlide} // Elemento crucial: Reinicia o CSS Keyframe ao mudar o index
                className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-violet-500 to-fuchsia-500 z-50 origin-left"
                style={{
                  animation: `progressLinear ${SLIDE_DURATION}ms linear forwards`,
                }}
              />
            )}

            {/* HEADER DO CONTEXTO DE ENGENHARIA */}
            <div className="w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/80 via-black/40 to-transparent z-40 absolute top-0 left-0">
              <span className="font-mono text-[9px] text-zinc-400 tracking-[0.4em] uppercase flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                Showcase_Module // Slide_0{currentSlide + 1}_of_0{demoSlides.length}
              </span>
              <button
                onClick={() => setIsDemoOpen(false)}
                className="px-4 py-1.5 rounded-full bg-white/5 text-zinc-400 text-[10px] font-mono border border-white/5 hover:bg-white hover:text-black transition-all"
              >
                EXIT (ESC)
              </button>
            </div>

            {/* CONTAINER CENTRAL DA IMAGEM OPTIMIZADA */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={demoSlides[currentSlide].src}
                alt={demoSlides[currentSlide].title}
                fill
                priority // Carregamento com prioridade máxima dentro do viewport do modal
                className="object-cover animate-in fade-in zoom-in-95 duration-500"
              />
              {/* Overlay de gradiente para garantir contraste e leitura perfeita do texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 pointer-events-none" />
            </div>

            {/* CONTAINER INFERIOR (Textos e Painel de Controle) */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black via-black/90 to-transparent z-40 flex flex-col md:flex-row md:items-end justify-between gap-6">

              {/* Identificadores do Slide Ativo */}
              <div className="max-w-2xl">
                <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl animate-in slide-in-from-bottom-2 duration-500">
                  {demoSlides[currentSlide].title}
                </h3>
                <p className="mt-2 text-xs md:text-sm text-zinc-400 font-light leading-relaxed animate-in slide-in-from-bottom-3 duration-500">
                  {demoSlides[currentSlide].description}
                </p>
              </div>

              {/* DOCK DE COMANDOS PREMIUM */}
              <div className="flex items-center gap-4 self-center md:self-end bg-white/[0.03] border border-white/5 backdrop-blur-md px-4 py-2.5 rounded-full">

                <button
                  onClick={prevSlide}
                  className="p-1 text-zinc-400 hover:text-white transition-colors"
                  title="Previous Slide"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-full bg-white text-black hover:scale-105 active:scale-95 transition-all"
                  title={isPlaying ? "Pause Autoplay" : "Play Autoplay"}
                >
                  {isPlaying ? <Pause size={14} fill="black" /> : <Play size={14} fill="black" />}
                </button>

                <button
                  onClick={nextSlide}
                  className="p-1 text-zinc-400 hover:text-white transition-colors"
                  title="Next Slide"
                >
                  <ChevronRight size={18} />
                </button>

                <div className="h-4 w-[1px] bg-white/10 mx-1" />

                {/* Dots Indicadores (Bullets) */}
                <div className="flex gap-1.5">
                  {demoSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? "w-4 bg-violet-500" : "w-1.5 bg-zinc-600 hover:bg-zinc-400"
                        }`}
                    />
                  ))}
                </div>

              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}

export default ProjectVisionSection;