// components/ProjectCard.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  desc: string;
  slug: string;
  imageUrl: string;
}

export default function ProjectCard({ title, desc, slug, imageUrl }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`}>
      <motion.div
        whileHover={{ y: -5, scale: 1.01 }} // Movimento vertical sutil em vez de escala agressiva
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl overflow-hidden border border-white/[0.05] bg-zinc-900/20 backdrop-blur-xl hover:border-white/20 transition-colors duration-500 group"
      >
        <div className="h-48 relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
          <p className="opacity-50 text-sm mt-3 leading-relaxed">{desc}</p>

          <div className="mt-4 flex gap-3">
            <span className="text-accent text-xs uppercase tracking-widest font-bold opacity-70 transition group-hover:opacity-100">Live Demo</span>
            <span className="text-white/40 text-xs uppercase tracking-widest font-bold transition group-hover:text-white">Source Code</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
