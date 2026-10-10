// components/Projects.tsx
"use client";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { projectsCardList } from "@/features/projects/projects-meta";
import { useTranslation } from "@/shared/i18n/useTranslation";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import { tokens } from "@/shared/design-system/tokens";

export default function Projects() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.12 },
        },
      };
  const itemVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: tokens.motion.standard,
        },
      };

  return (
    <section id="selected-projects" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.h2
        initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={shouldReduceMotion ? tokens.motion.reduced : { duration: 0.6, ease: tokens.motion.standard.ease }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-4xl font-bold mb-16 tracking-tight"
      >
        {t("projects.title")}
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-10"
      >
        {projectsCardList.map((project) => (
          <motion.div key={project.slug} variants={itemVariants}>
            <ProjectCard
              title={project.title}
              desc={t(`projects.items.${project.slug}.cardDescription`)}
              slug={project.slug}
              imageUrl={project.imageUrl}
              ctaLabel={t("projects.exploreCase")}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
