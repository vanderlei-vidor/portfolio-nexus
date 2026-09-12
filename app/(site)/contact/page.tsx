import type { Metadata } from "next";
import ContactPage from "@/features/home/components/contact_page";

const description =
  "Start a focused conversation with Vanderlei Vidor about product design, web systems, portfolio experiences or application engineering.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  openGraph: {
    title: "Contact | Portfolio Nexus",
    description,
  },
  twitter: {
    title: "Contact | Portfolio Nexus",
    description,
  },
};

export default function Page() {
  return <ContactPage />;
}
