// components/Grain.tsx
export default function Grain() {
  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none opacity-40 mix-blend-multiply"
      style={{
        background: `
          radial-gradient(circle at 50% 50%, transparent 20%, rgba(0, 0, 0, 0.4) 100%),
          linear-gradient(rgba(255, 255, 255, 0.005) 50%, rgba(0, 0, 0, 0.01) 50%)
        `,
        backgroundSize: "100% 100%, 100% 4px", // O segundo gradiente cria linhas de scan horizontais bem sutis
      }}
    />
  );
}