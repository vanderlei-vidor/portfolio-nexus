import Image from "next/image"; // 1. Importando o componente de alta performance
import "./Hero.css";

export function Hero() {
  return (
    <section className="task-manager-hero">
      {/* Glow cinematográfico no fundo */}
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />

      <div className="container">
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-badge">
              <span className="hero-badge-dot" />
              Enterprise Productivity Platform
            </span>

            <h1 className="hero-title">
              Gestor de Tarefas
              <span className="hero-title-accent"> Pro</span>
            </h1>

            <p className="hero-description">
              Plataforma corporativa desenvolvida para
              gerenciamento de tarefas, produtividade
              e acompanhamento operacional em escala empresarial.
            </p>

            <div className="hero-stack">
              {["Java 17", "Spring Boot 3", "PostgreSQL"].map((tech, i) => (
                <span key={tech} style={{ animationDelay: `${0.8 + i * 0.1}s` }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="hero-image-glow" />
            <div className="hero-image">
              
              {/* --- IMPLEMENTAÇÃO DO NEXT/IMAGE TURBINADO --- */}
              <Image
                src="/projects/saas-data-control/textures/hero-dashboard.webp"
                alt="Task Manager Dashboard"
                
                // Dimensões ideais para um mockup de dashboard/SaaS (proporção widescreen)
                width={1200}
                height={750}
                
                // CRUCIAL: Diz ao Next.js para pré-carregar essa imagem imediatamente no HTML,
                // destruindo qualquer delay de carregamento e melhorando o LCP ao máximo!
                priority
                
                // Mantém a compatibilidade com as classes do seu Hero.css
                className="hero-dashboard-img" 
              />

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}