import type { Metadata } from "next";
import ProcessExperience from "@/features/process/components/ProcessExperience";

const description =
  "A clear delivery process for turning product ideas into polished digital experiences through discovery, design, engineering and quality review.";

export const metadata: Metadata = {
  title: "Process",
  description,
  openGraph: {
    title: "Process | Portfolio Nexus",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Process | Portfolio Nexus",
    description,
  },
};

export default function ProcessPage() {
  return <ProcessExperience />;
}
