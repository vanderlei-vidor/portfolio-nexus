import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-160 bg-blue-500/10 blur-[180px] pointer-events-none -z-10" />
      <div className="absolute left-1/3 top-1/3 w-96 h-96 bg-purple-500/10 blur-[150px] pointer-events-none -z-10" />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="relative z-10 max-w-lg text-center">
        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/3 border border-white/10 mb-8 backdrop-blur-md shadow-2xl">
          <Compass className="w-10 h-10 text-blue-400 animate-pulse" />
        </div>

        <p className="font-mono text-xs text-blue-400 uppercase tracking-[0.3em] mb-3">
          404 — Page Not Found
        </p>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter mb-4 text-white">
          Lost in orbit.
        </h1>

        <p className="text-zinc-400 text-base font-light mb-10 max-w-md mx-auto leading-relaxed">
          The page or signal you are looking for has been moved, renamed, or does not exist in this universe.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(59,130,246,0.4)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Nexus Home</span>
        </Link>
      </div>
    </main>
  );
}
