// app/template.tsx
"use client";

export default function Template({ children }: { children: React.ReactNode }) {
  // Agora a animação é controlada globalmente pelo PageTransition no layout.tsx
  // para permitir o efeito de crossfade (exit animation) que o template.tsx sozinho não consegue fazer.
  return <>{children}</>;
}