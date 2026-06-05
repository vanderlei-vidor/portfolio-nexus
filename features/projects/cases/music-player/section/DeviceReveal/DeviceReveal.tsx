"use client";

import Image from "next/image"; // 1. Importando o componente de alta performance

export default function DeviceReveal() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 py-32">

      {/* Ambient Glow */}
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[180px]" />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0c_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0c_1px,transparent_1px)] bg-[size:80px_80px] opacity-30" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 lg:grid-cols-2">

        {/* Left Content */}
        <div className="flex flex-col">
          <span className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-blue-400">
            Product Experience
          </span>

          <h2 className="max-w-xl text-5xl font-bold tracking-[-0.06em] text-white md:text-7xl leading-[0.95]">
            Built to feel
            <br />
            alive.
          </h2>

          <p className="mt-8 max-w-md text-sm leading-relaxed text-zinc-500 md:text-base">
            Designed as a premium music ecosystem focused on music from devices, with immersive interactions, fluid rendering, and cinematic interface movements.
          </p>
        </div>

        {/* Device Showcase */}
        <div className="relative flex items-center justify-center perspective-[2000px]">

          {/* Background Reflection */}
          <div className="absolute h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px]" />

          {/* Device */}
          <div className="relative w-[240px] rotate-[-8deg] transform-gpu">

            <div className="overflow-hidden rounded-[3rem] border border-white/10 bg-zinc-950 p-[2px] shadow-[0_40px_120px_rgba(0,0,0,0.9)]">

              {/* --- IMPLEMENTAÇÃO DO NEXT/IMAGE --- */}
              <Image
                src="/projects/music-player/textures/tela_player.webp"
                alt="Music Player Interface Architecture"
                
                // Substitua pelos valores reais em pixels do seu arquivo webp (ex: 390x844)
                width={394} 
                height={839}
                
                // Crucial para SEO/Performance se esta seção estiver visível logo no topo da página
                priority 
                
                // Mantém a imagem responsiva respeitando a largura do container pai (w-[240px])
                className="block w-full h-auto rounded-[2.8rem]"
              />

              {/* Glass Reflection */}
              <div className="absolute inset-0 rounded-[2.8rem] bg-gradient-to-tr from-white/0 via-white/[0.05] to-white/0 pointer-events-none" />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}