"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { GitBranch, LinkIcon, Mail, ArrowLeft, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const email = "vanderleividor1@gmail.com";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-item",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main 
      ref={containerRef} 
      className="relative min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center px-6"
    >
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Botão Voltar */}
        <Link href="/" className="contact-item inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        <header className="contact-item mb-16">
          <h1 className="text-6xl font-bold tracking-tighter mb-4">Get in touch.</h1>
          <p className="text-zinc-400 text-lg">Disponível para novos projetos e colaborações estratégicas.</p>
        </header>

        <div className="grid gap-6">
          
          {/* Email Card */}
          <div className="contact-item group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">Email</p>
                  <p className="text-xl font-medium">{email}</p>
                </div>
              </div>
              <button 
                onClick={copyEmail}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
              >
                {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/in/vanderlei-vidor-979593410" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-item group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all flex items-center gap-4"
            >
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                <LinkIcon size={24} />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">Professional</p>
                <p className="text-xl font-medium">LinkedIn</p>
              </div>
            </a>

            {/* GitHub */}
            <a 
              href="https://github.com/vanderlei-vidor" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-item group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all flex items-center gap-4"
            >
              <div className="p-3 rounded-xl bg-zinc-500/10 text-zinc-400 group-hover:scale-110 transition-transform">
                <GitBranch className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">Code</p>
                <p className="text-xl font-medium">GitHub</p>
              </div>
            </a>
          </div>

        </div>

        <footer className="contact-item mt-24 pt-8 border-t border-white/5 text-center">
          <p className="text-zinc-600 text-sm font-mono">© 2026 • Localizado no Brasil</p>
        </footer>
      </div>
    </main>
  );
}