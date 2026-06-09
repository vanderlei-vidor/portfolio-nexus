export default function CinematicHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030303] px-4 sm:px-6">

      {/* Ambient Background - ⚡ Atualizado para usar a classe nativa do Tailwind v4 */}
      <div className="absolute inset-0 bg-radial from-blue-500/18 via-transparent to-transparent to-40% [radial-gradient-position:top]" />

      <div 
        className="absolute inset-0 opacity-[0.03] bg-cover bg-center" 
        style={{
          backgroundImage: "url('/textures/noise-webp.webp')"
        }} 
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center w-full">

        {/* Badge */}
        <div className="mb-8 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
            Case Study // Music Player
          </span>
        </div>

        {/* 🔥 HEADLINE AAA: Tipografia fluida matemática com clamp() e quebras seguras */}
        <h1 
          className="max-w-5xl font-bold text-white leading-[0.95] md:leading-[0.9] tracking-tighter wrap-break-word"
          style={{
            fontSize: "clamp(2.25rem, 8vw + 0.5rem, 9.5rem)" 
            // 💡 Explicação: Mínimo de 36px em telas minúsculas, escala dinamicamente com a largura da tela (8vw) e trava no teto de 152px em telas gigantes!
          }}
        >
          Engineered
          <br />
          for immersive
          <br />
          listening.
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-xl text-xs sm:text-sm md:text-base font-light leading-relaxed text-zinc-500">
          A premium local-first music experience crafted with cinematic motion,
          high-performance rendering and immersive interface design.
        </p>

        {/* Scroll Indicator */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center gap-3">
          {/* ⚡ Atualizado de bg-linear-to-b para a consistência global do Tailwind v4 */}
          <div className="h-16 w-px bg-linear-to-b from-white/40 to-transparent" />

          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
            Scroll
          </span>
        </div>

      </div>
    </section>
  );
}