"use client";

import dynamic from 'next/dynamic';

// ✅ A importação com ssr: false fica segura aqui dentro do ambiente de Cliente
const TerminalComponent = dynamic(() => import('./Terminal'), {
  ssr: false,
  loading: () => <div className="h-96 bg-black/10 animate-pulse rounded-lg m-6" />
});

export default function TerminalWrapper() {
  return <TerminalComponent />;
}