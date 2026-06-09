// app/process/page.tsx
import type { Metadata } from "next";
import ProcessExperience from "@/features/process/components/ProcessExperience"; // Certifique-se de apontar o caminho correto para onde salvou o componente acima!

// ✅ OS METADATOS VIVEM NO SERVER SIDE PERFEITAMENTE
export const metadata: Metadata = {
  title: "Our Process",
  description: "Conheça o fluxo de engenharia e design de alta performance por trás de cada aplicação desenvolvida.",
  openGraph: {
    title: "Our Process | Portfolio Nexus",
    description: "Conheça o fluxo de engenharia e design de alta performance por trás de cada aplicação desenvolvida.",
  }
};

export default function ProcessPage() {
  return <ProcessExperience />;
}