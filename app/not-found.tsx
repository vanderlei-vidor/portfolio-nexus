"use client";

import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { useTranslation } from "@/shared/i18n/useTranslation";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#030303] px-6 text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-160 w-160 -translate-x-1/2 -translate-y-1/2 bg-blue-500/10 blur-[180px]" />
      <div className="pointer-events-none absolute left-1/3 top-1/3 -z-10 h-96 w-96 bg-purple-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-lg text-center">
        <div className="mb-8 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/3 p-4 shadow-2xl backdrop-blur-md">
          <Compass className="h-10 w-10 animate-pulse text-blue-400" aria-hidden="true" />
        </div>

        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-blue-400">
          {t("notFound.badge")}
        </p>

        <h1 className="mb-4 text-4xl font-bold tracking-tighter text-white sm:text-6xl">
          {t("notFound.title")}
        </h1>

        <p className="mx-auto mb-10 max-w-md text-base font-light leading-relaxed text-zinc-400">
          {t("notFound.description")}
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-black shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:text-white hover:shadow-[0_0_50px_rgba(59,130,246,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>{t("notFound.returnHome")}</span>
        </Link>
      </div>
    </main>
  );
}
