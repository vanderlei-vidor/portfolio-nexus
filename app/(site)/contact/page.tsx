import type { Metadata } from "next";
import ContactPage from "@/features/home/components/contact_page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Vamos construir o próximo ecossistema digital premium juntos. Entre em contato para parcerias e projetos.",
  openGraph: {
    title: "Contact | Portfolio Nexus",
    description: "Vamos construir o próximo ecossistema digital premium juntos. Entre em contato para parcerias e projetos.",
  },
};

export default function Page() {
  return <ContactPage />;
}
