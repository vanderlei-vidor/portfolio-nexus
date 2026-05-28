export default function CinematicHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030303] px-6">

      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_40%)]" />

      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.jpg')]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center">

        {/* Badge */}
        <div className="mb-8 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
            Case Study // Music Player
          </span>
        </div>

        {/* Headline */}
        <h1 className="max-w-5xl text-6xl font-bold tracking-[-0.08em] text-white md:text-8xl lg:text-[10rem] leading-[0.9]">
          Engineered
          <br />
          for immersive
          <br />
          listening.
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-xl text-sm font-light leading-relaxed text-zinc-500 md:text-base">
          A premium local-first music experience crafted with cinematic motion,
          high-performance rendering and immersive interface design.
        </p>

        {/* Scroll Indicator */}
        <div className="mt-20 flex flex-col items-center gap-3">
          <div className="h-16 w-[1px] bg-gradient-to-b from-white/40 to-transparent" />

          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
            Scroll
          </span>
        </div>

      </div>
    </section>
  );
}