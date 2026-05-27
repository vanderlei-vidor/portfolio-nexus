// components/Projects.tsx
"use client";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // A mágica do Nível Apple está aqui
    },
  },
};

export default function Projects() {
  return (
    <section id="selected-projects" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl font-bold mb-16 tracking-tight"
      >
        Selected Projects
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-10"
      >
        <ProjectCard title="Project One" desc="High performance web app" slug="project-one" />
        <ProjectCard title="Project Two" desc="SaaS Data Control" slug="project-two" />
        <ProjectCard title="Project Three" desc="Modern UI system" slug="project-three" />
        <ProjectCard title="Project Four" desc="Scalable backend" slug="project-four" />
      </motion.div>
    </section>
  );
}