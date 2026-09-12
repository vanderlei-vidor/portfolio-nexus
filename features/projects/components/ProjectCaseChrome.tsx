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
        className="premium-button premium-button--primary fixed left-4 top-4 z-[70] -translate-y-20 px-4 py-2 text-sm font-semibold focus:translate-y-0"
      >
        {t("projects.skipToContent")}
      </a>

      <nav
        className="fixed left-3 top-3 z-50 flex items-center gap-2 sm:left-6 sm:top-6"
        aria-label={`${title} ${t("projects.caseStudy")}`}
      >
        <Link
          href="/#selected-projects"
          className="premium-button premium-button--ghost px-4 text-xs font-bold uppercase tracking-wider"
          aria-label={t("projects.backToProjects")}
        >
          <ArrowLeft size={15} aria-hidden="true" />
          <span className="hidden sm:inline">{t("projects.backToProjects")}</span>
        </Link>

        <Link
          href="/contact"
          className="premium-button premium-button--primary hidden px-4 text-xs font-bold uppercase tracking-wider sm:inline-flex"
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
