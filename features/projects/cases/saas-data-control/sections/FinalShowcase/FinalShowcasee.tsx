"use client";

import React from "react";
import "./FinalShowcasee.css";
import { Terminal, Cpu, HardDrive, ArrowRight } from "lucide-react";

export function FinalShowcasee() {
  return (
    <section className="finalShowcase">
      <div className="showcaseGlow" />

      <div className="container">
        <div className="cardContainer">

          {/* Header interno do Card */}
          <div className="cardHeader">
            <span className="badge">
              <span className="badgeDot" />
              Production Ready
            </span>
            <h2 className="title">
              Pronto para Escalar no Cenário <span className="titleAccent">Enterprise</span>
            </h2>
            <p className="description">
              O saas_data_control consolida arquitetura limpa, performance robusta em Java e uma experiência de usuário impecável sob alta demanda corporativa.
            </p>
          </div>

          {/* Grid de Console / Performance Física */}
          <div className="consoleGrid">

            <div className="consoleCard">
              <div className="iconWrapper">
                <Cpu size={20} />
              </div>
              <div className="consoleStats">
                <span className="statValue">&lt; 45ms</span>
                <span className="statLabel">Tempo de Resposta (API)</span>
              </div>
            </div>

            <div className="consoleCard">
              <div className="iconWrapper">
                <HardDrive size={20} />
              </div>
              <div className="consoleStats">
                <span className="statValue">100% ACID</span>
                <span className="statLabel">Persistência Relacional</span>
              </div>
            </div>

            <div className="consoleCard">
              <div className="iconWrapper">
                <Terminal size={20} />
              </div>
              <div className="consoleStats">
                <span className="statValue">Zero Leak</span>
                <span className="statLabel">Gerenciamento de Memória</span>
              </div>
            </div>

          </div>

          {/* CTA de Fechamento Cinematográfico */}
          <div className="ctaWrapper">
            <div className="divider" />
            <div className="ctaContent">
              <div className="ctaText">
                <h3>Gostou da Engenharia do Projeto?</h3>
                <p>Vamos construir a próxima solução de alta escalabilidade juntos.</p>
              </div>
              <a href="/contact_page" className="ctaButton">
                Entrar em Contato
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FinalShowcasee;