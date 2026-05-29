import About from "./About";
import Contact from "./Contact";
import Hero from "./Hero";
import Stack from "./Stack";
import Terminal from "./Terminal";
import Projects from "@/features/projects/components/Projects";
import Cursor from "@/shared/effects/Cursor";
import Loader from "@/shared/effects/Loader";
import ScrollReveal from "@/shared/effects/ScrollReveal";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Loader />
      <ScrollReveal />

      <Hero />
      <Projects />
      <About />
      <Stack />
      <Terminal />
      <Contact />

      <Cursor />
    </main>
  );
}
