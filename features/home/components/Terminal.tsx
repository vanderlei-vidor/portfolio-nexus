"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import gsap from "gsap";

const Terminal = memo(function Terminal() {
  const [output, setOutput] = useState<string[]>([
    "SECURE CONNECTION ESTABLISHED...",
    "INITIALIZING PORTFOLIO_OS V2.0.4...",
    "Welcome, guest. Type 'help' to begin.",
  ]);
  const [isVisible, setIsVisible] = useState(false);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  // ✅ OTIMIZAÇÃO 1: IntersectionObserver One-Shot (Roda apenas uma vez e desliga)
  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Desconecta permanentemente após ativar
        }
      },
      { threshold: 0.15 } // Dispara um pouco antes para o usuário não ver o delay inteiro
    );

    observer.observe(currentSection);
    return () => observer.disconnect();
  }, []); // ⚡ Sem dependências: evita loops de re-assinatura

  // ✅ OTIMIZAÇÃO 2: Execução limpa da animação GSAP
  useEffect(() => {
    if (!isVisible || !terminalRef.current) return;

    const timeoutId = setTimeout(() => {
      animationRef.current = gsap.fromTo(
        terminalRef.current,
        { opacity: 0, y: 25, scale: 0.98 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.6, 
          ease: "power2.out",
        }
      );
    }, 800); // Reduzido ligeiramente para balancear a percepção de fluidez

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) animationRef.current.kill();
    };
  }, [isVisible]);

  // ✅ OTIMIZAÇÃO 3: Auto-scroll acoplado ao ciclo de render macro
  useEffect(() => {
    if (!outputRef.current) return;
    requestAnimationFrame(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    });
  }, [output]);

  // Handle de comandos padrão
  const handleCommand = useCallback((cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    const responses: string[] = [`> ${cmd}`];

    switch (cleanCmd) {
      case "projects":
        responses.push(
          "📂 DEPLOYED SYSTEMS:",
          "  • Music Player [Multi-platform / Offline Experience]",
          "  • English Tutor [AI-Driven / Gamified Learning]",
          "  • SaaS Data Control [Native Data Platform]",
          "  • Portfolio Nexus [Premium Ecosystem]"
        );
        break;
      
      case "about":
        responses.push(
          "💻 SYSTEM PROFILE: Lead Frontend Engineer",
          "-------------------------------------------",
          "🚀 CORE CAPABILITIES:",
          "  • Architecture: Multi-platform ecosystems (Web, Mobile, Desktop)",
          "  • Intelligence: AI-integrated interfaces & Gamified logic",
          "  • Efficiency: High-concurrency multitasking architectures",
          "  • Motion: Cinematic UX (GSAP/Framer) & Math-based physics",
          "  • Performance: Next.js 15 / Edge Runtime / Zero-latency focus",
          "-------------------------------------------",
          "Status: Ready for high-impact deployment."
        );
        break;

      case "contact":
        responses.push(
          "📧 COMMS CHANNELS:",
          "  • Email: vanderleividor1@gmail.com",
          "  • LinkedIn: /in/vanderlei-vidor",
          "  • GitHub: /vanderlei-vidor"
        );
        break;

      case "help":
        responses.push(
          "📜 AVAILABLE COMMANDS:",
          "  • projects, about, contact, clear, help"
        );
        break;

      case "clear":
        setOutput([]);
        return;

      default:
        responses.push(`❌ ERROR: Unknown command '${cmd}'`, "Type 'help' for assistance.");
    }

    setOutput(prev => [...prev, ...responses]);
  }, []);

  // ✅ OTIMIZAÇÃO 4: Input Não-Controlado (Performance extrema ao digitar)
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.currentTarget;
      const value = target.value.trim();
      if (value) {
        handleCommand(value);
        target.value = ""; // Limpa o input nativamente sem disparar re-render no componente
      }
    }
  }, [handleCommand]);

  const handleTerminalClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden"
      aria-label="Interactive terminal"
    >
      {/* Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-blue-500/5 blur-[120px] pointer-events-none will-change-transform"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto mb-10 text-center">
        <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.5em] block mb-2">
          Kernel Terminal Access
        </span>
        <div className="h-px w-12 bg-zinc-800 mx-auto" />
      </div>

      <div
        ref={terminalRef}
        onClick={handleTerminalClick}
        className="relative max-w-4xl mx-auto bg-black/44 backdrop-blur-md rounded-lg border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden cursor-text transition-opacity duration-300"
        style={{ 
          willChange: isVisible ? 'transform, opacity' : 'auto',
          opacity: isVisible ? 1 : 0 // Evita flashes visíveis antes do GSAP assumir
        }}
      >
        {/* CRT Scanline Effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03] z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%]"
          aria-hidden="true"
        />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/5">
          <div className="flex gap-1.5" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          </div>
          <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
            main_shell
          </span>
          <div className="w-10" aria-hidden="true" />
        </div>

        {/* Output - ✅ OTIMIZAÇÃO 5: Removido style-jsx, injetado seletores arbitrários do Tailwind para esconder a scrollbar */}
        <div
          ref={outputRef}
          className="p-8 h-96 overflow-y-auto font-mono text-[13px] leading-relaxed [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
          role="log"
          aria-live="polite"
          aria-label="Terminal output"
        >
          {output.map((line, i) => (
            <div
              key={i}
              className={`mb-1.5 ${
                line.startsWith(">") ? "text-white font-bold" : 
                line.includes("ERROR") ? "text-red-500/90" : 
                line.includes("---") ? "opacity-20" : "text-emerald-500/80"
              }`}
            >
              {line}
            </div>
          ))}
          
          {/* Active Input Line */}
          <div className="flex items-center mt-4">
            <span className="text-emerald-500 mr-2 opacity-50" aria-hidden="true">$</span>
            <input
              ref={inputRef}
              type="text"
              className="bg-transparent outline-none flex-1 text-white caret-emerald-500 placeholder:text-zinc-800"
              spellCheck={false}
              aria-label="Terminal command input"
              placeholder="Type a command..."
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </section>
  );
});

export default Terminal;