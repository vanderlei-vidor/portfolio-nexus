// components/Projects.tsx
"use client";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { projectsList } from "@/features/projects/registry";

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
        {projectsList.map((project) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            desc={project.cardDescription}
            slug={project.slug}
            imageUrl={project.imageUrl}
          />
        ))}
      </motion.div>
    </section>
  );
}
