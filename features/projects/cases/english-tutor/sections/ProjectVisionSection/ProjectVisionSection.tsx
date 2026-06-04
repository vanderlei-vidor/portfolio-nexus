"use client";

import { useState } from "react"; // 1. Importando o estado
import { EnergyOrb } from "../../components/EnergyOrb";
import { FutureVisionOrb } from "../../components/FutureVisionOrb/FutureVisionOrb";

import styles from "./ProjectVisionSection.module.css";

export function ProjectVisionSection() {
  // 2. Estado para controlar o Modal de Vídeo
  const [isVideoOpen, setIsVideoOpen] = useState(false);

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

      {/* --- 3. SEÇÃO DE BOTÕES (CTA) --- */}
      <div className="mt-24 flex flex-col items-center gap-8 px-4">
        <div className="flex flex-wrap items-center justify-center gap-4">
          
          {/* Botão Principal: Contato */}
          <button 
            onClick={() => window.open("mailto:vanderleividor1@gmail.com", "_blank")}
            className="rounded-full bg-white px-10 py-4 text-sm font-bold text-black transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl"
          >
            Start a Project
          </button>

          {/* Botão: Abrir Vídeo Demo */}
          <button 
            onClick={() => setIsVideoOpen(true)}
            className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-medium text-white backdrop-blur-md transition-all duration-500 hover:bg-white/10 hover:border-white/20"
          >
            Watch Demo
          </button>

          {/* Botão: Link do Código */}
          <button 
            onClick={() => window.open("https://github.com/vanderlei-vidor", "_blank")}
            className="px-6 py-4 text-sm font-mono text-zinc-500 hover:text-white transition-colors"
          >
            &lt;Source /&gt;
          </button>
        </div>
      </div>

      {/* --- 4. MODAL DE VÍDEO CINEMATOGRÁFICO --- */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-10 animate-in fade-in duration-500"
          onClick={() => setIsVideoOpen(false)} // Fecha ao clicar fora
        >
          <div 
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()} // Impede fechar ao clicar no vídeo
          >
            {/* Botão de fechar */}
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-50 px-4 py-2 rounded-full bg-black/50 text-white text-[10px] font-mono border border-white/10 hover:bg-white hover:text-black transition-all"
            >
              CLOSE (ESC)
            </button>

            {/* O vídeo que você vai gravar */}
            <video 
              src="/videos/demo-tutor.mp4" // Ajuste o caminho para o seu arquivo
              controls 
              autoPlay 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default ProjectVisionSection;