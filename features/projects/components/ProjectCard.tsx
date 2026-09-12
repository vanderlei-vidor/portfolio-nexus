"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  desc: string;
  slug: string;
  imageUrl: string;
  ctaLabel: string;
}

export default function ProjectCard({ title, desc, slug, imageUrl, ctaLabel }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Link href={`/projects/${slug}`} aria-label={`${ctaLabel}: ${title}`} className="premium-card-link group block focus-visible:outline-none">
      <motion.article
        whileHover={shouldReduceMotion ? undefined : { y: -3 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="premium-card rounded-2xl"
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover grayscale transition-[filter,transform] duration-500 group-hover:grayscale-0 motion-safe:group-hover:scale-[1.025]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/15 to-transparent opacity-70" aria-hidden="true" />
        </div>

        <div className="relative z-10 p-6">
          <h3 className="text-2xl font-bold tracking-tight text-white">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{desc}</p>

          <div className="mt-6 flex items-center gap-2 text-zinc-400 transition-colors duration-300 group-hover:text-white">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em]">{ctaLabel}</span>
            <ArrowUpRight size={15} className="transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
