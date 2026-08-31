"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import { useTranslation } from "@/shared/i18n/useTranslation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();

  useEffect(() => {
    console.error("Uncaught Route Error:", error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#030303] px-6 text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-160 w-160 -translate-x-1/2 -translate-y-1/2 bg-red-500/10 blur-[180px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-lg text-center">
        <div className="mb-8 inline-flex items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 p-4 backdrop-blur-md">
          <AlertTriangle className="h-10 w-10 text-red-400" aria-hidden="true" />
        </div>

        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-red-400">
          {t("error.badge")}
        </p>

        <h1 className="mb-4 text-4xl font-bold tracking-tighter text-white sm:text-5xl">
          {t("error.title")}
        </h1>

        <p className="mx-auto mb-10 max-w-md text-base font-light leading-relaxed text-zinc-400">
          {t("error.description")}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            <span>{t("error.tryAgain")}</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{t("error.backHome")}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
