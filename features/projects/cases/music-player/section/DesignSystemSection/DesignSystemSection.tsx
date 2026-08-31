"use client";

import { useLanguage } from "@/shared/i18n/LanguageContext";
import { musicPlayerContent } from "../../content";

export default function DesignSystemSection() {
  const { locale } = useLanguage();
  const content = musicPlayerContent[locale].design;

  return (
    <section className="relative overflow-hidden bg-[#030303] px-6 py-28 sm:py-36 lg:py-40">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d0d0d_1px,transparent_1px),linear-gradient(to_bottom,#0d0d0d_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light" style={{ backgroundImage: "url('/textures/noise-webp.webp')" }} aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[240px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col items-center text-center sm:mb-28 lg:mb-32">
          <div className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-violet-300">
              {content.badge}
            </span>
          </div>

          <h2 className="max-w-5xl text-[clamp(3rem,12vw,9rem)] font-bold leading-[0.9] tracking-[-0.06em] text-white">
            {content.titleLine1}
            <br />
            {content.titleLine2}
          </h2>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {content.tokens.map((token) => (
            <article
              key={token.title}
              className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:border-violet-400/30 sm:rounded-[2rem] sm:p-10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.15),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />

              <div className="relative z-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-violet-300">
                  {token.title}
                </span>

                <h3 className="mt-6 text-2xl font-bold tracking-[-0.04em] text-white sm:text-3xl">
                  {token.value}
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
                  {token.desc}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-28 border-t border-white/10 pt-16 sm:mt-40 sm:pt-24">
          <div className="flex flex-col gap-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
              {content.typographyScale}
            </span>

            <div className="flex flex-col gap-4">
              <h3 className="text-[clamp(4rem,16vw,10rem)] font-bold leading-none tracking-[-0.06em] text-white">
                {content.display}
              </h3>

              <p className="text-[clamp(2rem,7vw,4.5rem)] font-semibold leading-tight tracking-[-0.04em] text-zinc-300">
                {content.cinematicHierarchy}
              </p>

              <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
                {content.typographyDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
