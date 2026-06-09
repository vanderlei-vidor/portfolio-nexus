"use client"; // Só use se esse componente estiver dentro de alguma árvore de contexto que exija, caso contrário pode remover!

import React from "react";
import Link from "next/link";
import { Terminal, Cpu, HardDrive, ArrowRight } from "lucide-react";

export function FinalShowcase() {
  return (
    // .finalShowcase
    <section className="py-35 relative overflow-hidden bg-[#060913]">

      {/* .showcaseGlow */}
      <div
        className="absolute w-150 h-150 bg-[radial-gradient(circle,rgba(37,99,235,0.15),transparent_70%)] -bottom-50 left-1/2 -translate-x-1/2 pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto w-full px-4">
        {/* .cardContainer */}
        <div className="relative z-10 bg-[#0f172a]/60 border border-white/5 rounded-[28px] p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.4)] backdrop-blur-sm">

          {/* .cardHeader */}
          <div className="flex flex-col items-center text-center gap-5 mb-14">
            {/* .badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-[#60a5fa] text-xs font-bold tracking-wider uppercase">
              {/* .badgeDot */}
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shadow-[0_0_12px_#3b82f6]" />
              Production Ready
            </span>
            {/* .title */}
            <h2 className="text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold text-white tracking-tight leading-[1.1] max-w-175">
              Ready to Scale in the <span className="bg-linear-to-br from-[#3b82f6] to-[#a78bfa] bg-clip-text text-transparent">Enterprise</span> Landscape
            </h2>
            {/* .description */}
            <p className="text-lg text-[#94a3b8] max-w-145 leading-[1.7]">
              saas_data_control consolidates clean architecture, robust Java performance, and a flawless user experience under high corporate demands.
            </p>
          </div>

          {/* .consoleGrid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">

            {/* .consoleCard + hovers (usando 'group' para disparar o hover do ícone filho) */}
            <div className="flex items-center gap-5 p-6 bg-[#1e293b]/30 border border-white/3 rounded-2xl transition-all duration-300 ease-in-out hover:border-blue-600/30 hover:bg-[#1e293b]/50 hover:-translate-y-0.5 group">
              {/* .iconWrapper */}
              <div className="w-11 h-11 rounded-xl bg-white/3 border border-white/8 text-[#94a3b8] flex items-center justify-center transition-all duration-300 ease-in-out group-hover:bg-[#2563eb] group-hover:text-white group-hover:border-[#2563eb]">
                <Cpu size={20} />
              </div>
              {/* .consoleStats */}
              <div className="flex flex-col gap-0.5">
                <span className="text-xl font-bold text-white font-mono tracking-tight">&lt; 45ms</span>
                <span className="text-[0.8125rem] text-[#64748b]">Response Time (API)</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex items-center gap-5 p-6 bg-[#1e293b]/30 border border-white/3 rounded-2xl transition-all duration-300 ease-in-out hover:border-blue-600/30 hover:bg-[#1e293b]/50 hover:-translate-y-0.5 group">
              <div className="w-11 h-11 rounded-xl bg-white/3 border border-white/8 text-[#94a3b8] flex items-center justify-center transition-all duration-300 ease-in-out group-hover:bg-[#2563eb] group-hover:text-white group-hover:border-[#2563eb]">
                <HardDrive size={20} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xl font-bold text-white font-mono tracking-tight">100% ACID</span>
                <span className="text-[0.8125rem] text-[#64748b]">Relational Persistence</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex items-center gap-5 p-6 bg-[#1e293b]/30 border border-white/3 rounded-2xl transition-all duration-300 ease-in-out hover:border-blue-600/30 hover:bg-[#1e293b]/50 hover:-translate-y-0.5 group">
              <div className="w-11 h-11 rounded-xl bg-white/3 border border-white/8 text-[#94a3b8] flex items-center justify-center transition-all duration-300 ease-in-out group-hover:bg-[#2563eb] group-hover:text-white group-hover:border-[#2563eb]">
                <Terminal size={20} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xl font-bold text-white font-mono tracking-tight">Zero Leak</span>
                <span className="text-[0.8125rem] text-[#64748b]">Memory Management</span>
              </div>
            </div>

          </div>

          {/* .ctaWrapper */}
          <div className="flex flex-col gap-8">
            {/* .divider */}
            <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

            {/* .ctaContent + Responsividade (centralizado em telas menores, lado a lado em md:) */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:text-left text-center">
              <div className="ctaText">
                <h3 className="text-xl font-bold text-white mb-1">Did you enjoy the Project Engineering?</h3>
                <p className="text-[#64748b] text-[0.9375rem]">Let&apos;s build the next highly scalable solution together.</p>
              </div>
              {/* .ctaButton */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white text-[#060913] rounded-full text-[0.9375rem] font-semibold transition-all duration-300 ease-in-out hover:bg-[#2563eb] hover:text-white hover:shadow-[0_12px_30px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 w-full md:w-auto"
              >
                Contact Us
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FinalShowcase;
