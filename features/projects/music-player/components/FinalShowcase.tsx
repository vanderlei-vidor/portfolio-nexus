export default function FinalShowcase() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-40">

      {/* ATMOSPHERIC BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.10),transparent_60%)]" />

      {/* FILM GRAIN */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light bg-[url('/textures/noise.jpg')]" />

      {/* AMBIENT GLOW */}
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[220px]" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center">

        {/* DEVICE */}
        <div className="relative mb-24">

          {/* DEVICE GLOW */}
          <div className="absolute inset-0 -z-10 rounded-full bg-violet-500/20 blur-[180px]" />

          {/* DEVICE */}
          <div className="relative w-[320px] animate-[float_6s_ease-in-out_infinite]">

            <div className="overflow-hidden rounded-[3rem] border border-white/10 bg-zinc-950 p-[2px] shadow-[0_40px_120px_rgba(0,0,0,0.9)]">

              <img
                src="/projects/music-player/textures/tela_player.webp"
                alt="Music Player"
                className="block w-full rounded-[2.8rem]"
              />

              {/* GLASS REFLECTION */}
              <div className="absolute inset-0 rounded-[2.8rem] bg-gradient-to-tr from-white/0 via-white/[0.05] to-white/0" />

            </div>

          </div>

        </div>

        {/* FINAL MESSAGE */}
        <div className="flex flex-col items-center">

          <span className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
            Final Showcase
          </span>

          <h2 className="max-w-5xl text-6xl font-bold leading-[0.9] tracking-[-0.08em] text-white md:text-8xl lg:text-[10rem]">
            Built for
            <br />
            people who
            <br />
            truly listen.
          </h2>

          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base">
            A cinematic local-first music experience engineered with immersive
            motion, scalable architecture and product-grade performance.
          </p>

        </div>

        {/* CTA */}
        <div className="mt-24 flex flex-wrap items-center justify-center gap-4">

          <button className="
            rounded-full
            border
            border-white/10
            bg-white
            px-8
            py-4
            text-sm
            font-medium
            text-black
            transition-all
            duration-500
            hover:scale-105
          ">
            Live Experience
          </button>

          <button className="
            rounded-full
            border
            border-white/10
            bg-white/5
            px-8
            py-4
            text-sm
            font-medium
            text-white
            backdrop-blur-md
            transition-all
            duration-500
            hover:bg-white/10
          ">
            View Source
          </button>

        </div>

      </div>

    </section>
  );
}