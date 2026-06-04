"use client";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";

export default function Terminal() {
  const [output, setOutput] = useState<string[]>([
    "SECURE CONNECTION ESTABLISHED...",
    "INITIALIZING PORTFOLIO_OS V2.0.4...",
    "Welcome, guest. Type 'help' to begin.",
  ]);
  const [inputValue, setInputValue] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Animação de entrada do Terminal (GSAP)
  useLayoutEffect(() => {
    gsap.fromTo(terminalRef.current, 
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power4.out", delay: 0.5 }
    );
  }, []);

  // Auto-scroll para o final
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let responses: string[] = [`> ${cmd}`];

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

    // Efeito de "Streaming" - adiciona as linhas com um micro-delay
    responses.forEach((line, index) => {
      setTimeout(() => {
        setOutput(prev => [...prev, line]);
      }, index * 50); // Delay entre linhas para parecer processamento
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      handleCommand(inputValue);
      setInputValue("");
    }
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto mb-10 text-center">
        <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.5em] block mb-2">
          Kernel Terminal Access
        </span>
        <div className="h-[1px] w-12 bg-zinc-800 mx-auto" />
      </div>

      <div
        ref={terminalRef}
        className="relative max-w-4xl mx-auto bg-black/40 backdrop-blur-md rounded-lg border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* CRT Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          </div>
          <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
            vvidor — main_shell
          </span>
          <div className="w-10" />
        </div>

        {/* Output */}
        <div
          ref={outputRef}
          className="p-8 h-[380px] overflow-y-auto font-mono text-[13px] leading-relaxed scrollbar-hide"
        >
          {output.map((line, i) => (
            <div
              key={i}
              className={`mb-1.5 transition-all duration-300 ${
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
            <span className="text-emerald-500 mr-2 opacity-50">$</span>
            <input
              ref={inputRef}
              type="text"
              className="bg-transparent outline-none flex-1 text-white caret-emerald-500"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoFocus
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        input::placeholder { color: #27272a; }
      `}</style>
    </section>
  );
}