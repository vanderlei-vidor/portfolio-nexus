// app/contact/page.tsx (ContactPage) - CONSTRASTE ATUALIZADO
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GitBranch, LinkIcon, Mail, ArrowLeft, Copy, Check } from "lucide-react";
import Link from "next/link";
import DirectContactForm from "./DirectContactForm";

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
          stagger: 0.15,
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
      className="relative min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center px-6 py-16 md:py-24"
    >
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[60px_60px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-linear-to-b from-blue-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl">
        {/* Botão Voltar */}
        <Link href="/" className="contact-item inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group text-sm font-mono uppercase tracking-wider">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        <header className="contact-item mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter mb-4 text-white">Get in touch.</h1>
          <p className="text-zinc-300 text-lg font-light">Available for new projects, engineering leadership & strategic collaborations.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Coluna Principal: Direct Message Generator */}
          <div className="lg:col-span-7">
            <DirectContactForm />
          </div>

          {/* Coluna Secundária: Direct Channels & Links */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card */}
            <div className="contact-item group relative p-6 rounded-2xl border border-white/10 bg-white/3 hover:bg-white/6 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-center justify-between flex-wrap gap-4 sm:flex-nowrap">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-0.5">Email Directly</p>
                    <p className="text-base sm:text-lg font-medium text-zinc-100 selection:bg-blue-500">{email}</p>
                  </div>
                </div>
                <button 
                  onClick={copyEmail}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-zinc-300 hover:text-white border border-white/5 ml-auto sm:ml-0"
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* LinkedIn */}
              <a 
                href="https://linkedin.com/in/vanderlei-vidor-979593410" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-item group p-6 rounded-2xl border border-white/10 bg-white/3 hover:bg-white/6 hover:border-blue-500/30 transition-all duration-300 flex items-center gap-4"
              >
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                  <LinkIcon size={22} />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-0.5">Professional Network</p>
                  <p className="text-lg font-medium text-zinc-100">LinkedIn Profile</p>
                </div>
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/vanderlei-vidor" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-item group p-6 rounded-2xl border border-white/10 bg-white/3 hover:bg-white/6 hover:border-zinc-500/30 transition-all duration-300 flex items-center gap-4"
              >
                <div className="p-3 rounded-xl bg-zinc-500/10 text-zinc-300 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  <GitBranch size={22} />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-0.5">Source Code & Work</p>
                  <p className="text-lg font-medium text-zinc-100">GitHub Profile</p>
                </div>
              </a>
            </div>

          </div>

        </div>

        {/* Footer */}
        <footer className="contact-item mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-zinc-500 text-sm font-mono">
            <span>© 2026</span> • <span>Portfolio Nexus</span> • <span>All rights reserved</span> 
          </p>
        </footer>
      </div>
    </main>
  );
}