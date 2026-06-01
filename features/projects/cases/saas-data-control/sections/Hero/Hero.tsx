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
              <img
                src="/projects/saas-data-control/textures/hero-dashboard.png"
                alt="Task Manager Dashboard"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}