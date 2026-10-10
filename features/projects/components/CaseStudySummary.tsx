"use client";

import { ArrowDownRight, CheckCircle2, CircleDotDashed } from "lucide-react";
import { caseStudySummaries } from "../case-study-summaries";
import type { ProjectSlug } from "../registry";
import { useTranslation } from "@/shared/i18n/useTranslation";

interface CaseStudySummaryProps {
  slug: ProjectSlug;
}

export default function CaseStudySummary({ slug }: CaseStudySummaryProps) {
  const { locale, t } = useTranslation();
  const summary = caseStudySummaries[locale][slug];
  const isVerified = summary.statusTone === "verified";

  const details = [
    { label: t("caseSummary.keyDecision"), value: summary.keyDecision, span: "md:col-span-6" },
    { label: t("caseSummary.evidence"), value: summary.evidence, span: "md:col-span-6" },
    { label: t("caseSummary.result"), value: summary.result, span: "md:col-span-12" },
  ];

  return (
    <section
      id={`${slug}-summary`}
      data-case-study-summary={slug}
      aria-labelledby={`${slug}-summary-title`}
      className="relative isolate overflow-hidden border-y border-white/10 bg-[#07090f] px-5 py-16 text-white sm:px-8 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(59,130,246,0.14),transparent_34%),radial-gradient(circle_at_85%_75%,rgba(124,58,237,0.12),transparent_30%)]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl">
        <header className="grid gap-6 border-b border-white/10 pb-9 md:grid-cols-[minmax(0,0.7fr)_minmax(18rem,0.3fr)] md:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-blue-300">
              {t("caseSummary.eyebrow")}
            </p>
            <h2
              id={`${slug}-summary-title`}
              className="mt-4 max-w-3xl text-balance text-[clamp(2rem,5vw,4.5rem)] font-black leading-[0.96] tracking-[-0.045em]"
            >
              {t("caseSummary.title")}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-zinc-400 md:justify-self-end md:text-base">
            {t("caseSummary.intro")}
          </p>
        </header>

        <dl className="mt-8 grid gap-3 md:grid-cols-12">
          <div className="premium-surface rounded-2xl p-5 md:col-span-4 sm:p-6">
            <dt className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              {t("caseSummary.role")}
            </dt>
            <dd className="mt-3 text-sm leading-7 text-zinc-300 sm:text-[0.95rem]">{summary.role}</dd>
          </div>

          <div className="premium-surface rounded-2xl p-5 md:col-span-8 sm:p-6">
            <dt className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              {t("caseSummary.stack")}
            </dt>
            <dd className="mt-4">
              <ul className="flex flex-wrap gap-2" aria-label={t("caseSummary.stack")}>
                {summary.stack.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-full border border-blue-300/15 bg-blue-300/[0.06] px-3 py-1.5 font-mono text-xs text-blue-100"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </dd>
          </div>

          <div className="premium-surface rounded-2xl p-5 md:col-span-8 sm:p-6">
            <dt className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              {t("caseSummary.challenge")}
            </dt>
            <dd className="mt-3 text-sm leading-7 text-zinc-300 sm:text-[0.95rem]">{summary.challenge}</dd>
          </div>

          <div className="premium-surface rounded-2xl p-5 md:col-span-4 sm:p-6">
            <dt className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              {t("caseSummary.status")}
            </dt>
            <dd className={`mt-4 flex items-start gap-2.5 text-sm font-semibold leading-6 ${isVerified ? "text-emerald-300" : "text-amber-200"}`}>
              {isVerified ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <CircleDotDashed className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              <span>{summary.status}</span>
            </dd>
          </div>

          {details.map((detail) => (
            <div
              key={detail.label}
              className={`premium-surface rounded-2xl p-5 sm:p-6 ${detail.span}`}
            >
              <dt className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                {detail.label}
              </dt>
              <dd className="mt-3 text-sm leading-7 text-zinc-300 sm:text-[0.95rem]">{detail.value}</dd>
            </div>
          ))}
        </dl>

        <a
          href={`#${slug}-technical-proof`}
          className="premium-button premium-button--ghost mt-8 px-5 py-2.5 text-sm font-semibold"
        >
          {t("caseSummary.technicalProofCta")}
          <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
