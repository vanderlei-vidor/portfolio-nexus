"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception silently or send to telemetries
    console.error("Uncaught Route Error:", error);
  }, [error]);

  return (
    <main className="relative min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-160 bg-red-500/10 blur-[180px] pointer-events-none -z-10" />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="relative z-10 max-w-lg text-center">
        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-red-500/10 border border-red-500/20 mb-8 backdrop-blur-md">
          <AlertTriangle className="w-10 h-10 text-red-400" />
        </div>

        <p className="font-mono text-xs text-red-400 uppercase tracking-[0.3em] mb-3">
          Runtime Exception Intercepted
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-4 text-white">
          Something went wrong.
        </h1>

        <p className="text-zinc-400 text-base font-light mb-10 max-w-md mx-auto leading-relaxed">
          An unexpected error occurred while rendering this view. You can try recovering or return to the main interface.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 rounded-full font-semibold text-white hover:border-white/50 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
