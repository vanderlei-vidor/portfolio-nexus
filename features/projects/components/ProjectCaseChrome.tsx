"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/shared/i18n/useTranslation";

interface ProjectCaseChromeProps {
  slug: string;
  title: string;
  children: ReactNode;
}

export default function ProjectCaseChrome({ slug, title, children }: ProjectCaseChromeProps) {
  const { t } = useTranslation();
  const description = t(`projects.items.${slug}.description`);

  return (
    <main className="relative overflow-hidden bg-[#030303] text-white" aria-labelledby={`${slug}-title`}>
      <a
        href="#project-content"
        className="fixed left-4 top-4 z-[70] -translate-y-20 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-transform focus:translate-y-0"
      >
        {t("projects.skipToContent")}
      </a>

      <nav
        className="fixed left-3 top-3 z-50 flex items-center gap-2 sm:left-6 sm:top-6"
        aria-label={`${title} ${t("projects.caseStudy")}`}
      >
        <Link
          href="/#selected-projects"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-black/70 px-4 text-xs font-bold uppercase tracking-wider text-zinc-200 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label={t("projects.backToProjects")}
        >
          <ArrowLeft size={15} aria-hidden="true" />
          <span className="hidden sm:inline">{t("projects.backToProjects")}</span>
        </Link>

        <Link
          href="/contact"
          className="hidden min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white px-4 text-xs font-bold uppercase tracking-wider text-black shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-colors hover:bg-blue-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:inline-flex"
        >
          <span>{t("contact.startProject")}</span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </nav>

      <header className="sr-only">
        <p>{t("projects.caseStudy")}</p>
        <h1 id={`${slug}-title`}>{title}</h1>
        <p>{description}</p>
      </header>

      <div id="project-content">{children}</div>
    </main>
  );
}
