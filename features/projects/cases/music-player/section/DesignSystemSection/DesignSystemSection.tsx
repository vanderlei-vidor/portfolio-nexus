export default function DesignSystemSection() {

  const tokens = [
    {
      title: "Typography",
      value: "Display / Editorial",
      desc: "Large-scale cinematic typography engineered for immersive hierarchy."
    },

    {
      title: "Motion",
      value: "Cubic Bézier Motion",
      desc: "Smooth interaction curves inspired by premium operating systems."
    },

    {
      title: "Spacing",
      value: "8pt Adaptive Grid",
      desc: "Consistent spacing rhythm optimized across responsive breakpoints."
    },

    {
      title: "Elevation",
      value: "Volumetric Depth",
      desc: "Layered blur, glow and surface hierarchy for physical interface feel."
    }
  ];

  return (
    <section className="relative overflow-hidden bg-[#030303] px-6 py-40">

      {/* ATMOSPHERIC GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d0d0d_1px,transparent_1px),linear-gradient(to_bottom,#0d0d0d_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />

      {/* FILM GRAIN */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light" style={{ backgroundImage: "url('/textures/noise-webp.webp')" }} />

      {/* AMBIENT LIGHT */}
      <div className="absolute left-1/2 top-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[240px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-32 flex flex-col items-center text-center">

          <div className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-violet-300">
              Design System
            </span>
          </div>

          <h2 className="max-w-5xl text-6xl font-bold leading-[0.9] tracking-[-0.08em] text-white md:text-8xl lg:text-[9rem]">
            Consistency
            <br />
            at scale.
          </h2>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base">
            A cohesive interface system designed with adaptive spacing,
            cinematic motion and scalable visual hierarchy across platforms.
          </p>

        </div>

        {/* TOKEN GRID */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

          {tokens.map((token) => (
            <div
              key={token.title}
              className="
                group
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-white/10
                bg-white/[0.03]
                p-10
                backdrop-blur-xl
                transition-all
                duration-500
                hover:border-violet-400/30
              "
            >

              {/* HOVER LIGHT */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.15),transparent_60%)]" />

              {/* CONTENT */}
              <div className="relative z-10">

                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-violet-300">
                  {token.title}
                </span>

                <h3 className="mt-6 text-3xl font-bold tracking-[-0.05em] text-white">
                  {token.value}
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-500">
                  {token.desc}
                </p>

              </div>

            </div>
          ))}

        </div>

        {/* TYPOGRAPHY SHOWCASE */}
        <div className="mt-40 border-t border-white/10 pt-24">

          <div className="flex flex-col gap-10">

            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
              Typography Scale
            </span>

            <div className="flex flex-col gap-4">

              <h1 className="text-7xl font-bold tracking-[-0.08em] text-white md:text-[10rem] leading-none">
                Display
              </h1>

              <h2 className="text-5xl font-semibold tracking-[-0.06em] text-zinc-300 md:text-7xl">
                Cinematic hierarchy
              </h2>

              <p className="max-w-2xl text-base leading-relaxed text-zinc-500">
                Carefully balanced typography system designed for readability,
                rhythm and immersive visual composition.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}