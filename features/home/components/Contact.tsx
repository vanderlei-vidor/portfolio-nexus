// components/Contact.tsx - VERSÃO AAA (CONSTRASTE AJUSTADO)
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <section className="relative py-40 px-6 overflow-hidden">
      {/* Background glows - 🔥 Leve aumento na opacidade para realçar o fundo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/15 blur-[200px] -z-10" />
      <div className="absolute left-1/4 top-1/3 w-[400px] h-[400px] bg-purple-500/10 blur-[150px] -z-10" />

      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          {/* 🔥 Alterado de zinc-500 para zinc-400 (Mais legível) */}
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-[0.3em]">
            Get In Touch
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-12 tracking-tighter text-white leading-[0.9]"
        >
          Let&apos;s build something
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            exceptional.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          /* 🔥 Subimos a opacidade de 0.6 para 0.85 e trocamos a cor base de zinc-400 para zinc-300 */
          whileInView={{ opacity: 0.85 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-xl text-zinc-300 mb-16 max-w-2xl mx-auto font-light"
        >
          Available for new projects and strategic collaborations.
          Let&apos;s create something memorable together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-500 transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(59,130,246,0.4)]"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
          </Link>

          <a
            href="mailto:vanderleividor1@gmail.com"
            /* 🔥 Subimos a borda base para white/20 para dar presença ao botão secundário */
            className="inline-flex items-center gap-3 px-10 py-5 border border-white/20 rounded-full font-bold text-white hover:border-white/50 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
          >
            <span>Email Me</span>
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center gap-8"
        >
          {/* 🔥 Alterado de text-zinc-500 para text-zinc-400 com hover ativo em white */}
          <a
            href="https://github.com/vanderlei-vidor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors text-sm font-mono uppercase tracking-widest border-b border-transparent hover:border-white/30 pb-1"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/vanderlei-vidor-979593410"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors text-sm font-mono uppercase tracking-widest border-b border-transparent hover:border-white/30 pb-1"
          >
            LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}
