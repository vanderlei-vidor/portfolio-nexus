"use client";

import { ArrowRight, Check, Network, Scale, Target } from "lucide-react";
import { caseStudyTechnicalProofs } from "../case-study-technical-proofs";
import type { ProjectSlug } from "../registry";
import { useTranslation } from "@/shared/i18n/useTranslation";

interface CaseStudyTechnicalProofProps {
  slug: ProjectSlug;
}

export default function CaseStudyTechnicalProof({ slug }: CaseStudyTechnicalProofProps) {
  const { locale } = useTranslation();
  const content = caseStudyTechnicalProofs[locale][slug];

  return (
    <section
      id={`${slug}-technical-proof`}
      data-case-study-technical-proof={slug}
      aria-labelledby={`${slug}-technical-proof-title`}
      className="relative isolate overflow-hidden border-y border-white/10 bg-[#05070b] px-5 py-20 text-white sm:px-8 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(59,130,246,0.08),transparent_38%,rgba(124,58,237,0.07))]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl">
        <header className="max-w-4xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
            {content.eyebrow}
          </p>
          <h2
            id={`${slug}-technical-proof-title`}
            className="mt-4 text-balance text-[clamp(2.25rem,5vw,4.75rem)] font-black leading-[0.96] tracking-[-0.045em]"
          >
            {content.title}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400 md:text-lg">{content.intro}</p>
        </header>

        <div className="mt-14 border-t border-white/10 pt-10">
          <div className="flex max-w-3xl items-start gap-4">
            <Network className="mt-1 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
            <div>
              <h3 className="text-xl font-bold tracking-tight md:text-2xl">{content.architectureLabel}</h3>
              <p className="mt-2 text-sm leading-7 text-zinc-400">{content.architectureDescription}</p>
            </div>
          </div>

          <ol className="mt-8 grid gap-3 md:grid-cols-4">
            {content.stages.map((stage, index) => (
              <li
                key={stage.title}
                className="premium-surface relative rounded-2xl p-5 md:min-h-52"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-cyan-300">0{index + 1}</span>
                  {index < content.stages.length - 1 ? (
                    <ArrowRight className="h-4 w-4 text-zinc-600" aria-hidden="true" />
                  ) : (
                    <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                  )}
                </div>
                <h4 className="mt-8 text-base font-bold text-zinc-100">{stage.title}</h4>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{stage.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 border-t border-white/10 pt-10">
          <div className="flex items-center gap-4">
            <Scale className="h-5 w-5 text-violet-300" aria-hidden="true" />
            <h3 className="text-xl font-bold tracking-tight md:text-2xl">{content.tradeOffsLabel}</h3>
          </div>

          <div className="mt-8 grid gap-3 lg:grid-cols-3">
            {content.tradeOffs.map((tradeOff, index) => (
              <article key={tradeOff.decision} className="premium-surface rounded-2xl p-6">
                <span className="font-mono text-xs font-semibold text-violet-300">0{index + 1}</span>
                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-zinc-500">{content.decisionLabel}</dt>
                    <dd className="mt-2 text-sm font-semibold leading-6 text-zinc-100">{tradeOff.decision}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-emerald-400/80">{content.benefitLabel}</dt>
                    <dd className="mt-2 text-sm leading-6 text-zinc-400">{tradeOff.benefit}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-amber-300/80">{content.costLabel}</dt>
                    <dd className="mt-2 text-sm leading-6 text-zinc-400">{tradeOff.cost}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-[0.36fr_0.64fr]">
          <div>
            <div className="flex items-center gap-4">
              <Target className="h-5 w-5 text-amber-300" aria-hidden="true" />
              <h3 className="text-xl font-bold tracking-tight md:text-2xl">{content.nextStepsLabel}</h3>
            </div>
            <p className="mt-4 text-sm leading-7 text-zinc-400">{content.nextStepsDescription}</p>
          </div>

          <ol className="grid gap-3">
            {content.nextSteps.map((step, index) => (
              <li key={step.title} className="premium-surface grid gap-4 rounded-2xl p-5 sm:grid-cols-[auto_1fr] sm:p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/[0.06] font-mono text-xs font-semibold text-amber-200">
                  {index + 1}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-zinc-100 sm:text-base">{step.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
