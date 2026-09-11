# Architecture Decision Records (ADRs)

Este diretório contém os **Architecture Decision Records** do **Portfolio Nexus**.

## O que é uma ADR?
Uma ADR é um documento técnico enxuto que captura uma decisão de arquitetura significativa, acompanhada de seu contexto, das opções avaliadas e de suas consequências (positivas, negativas e trade-offs).

## Formato Padrão
Cada ADR segue o formato canônico:
1. **Título e Numeração Sequencial**
2. **Status** (`Proposto`, `Aceito`, `Obsoleto`, `Substituído`)
3. **Data e Decisores**
4. **Contexto & Definição do Problema**
5. **Decisão Tomada**
6. **Consequências & Trade-offs**

## Índice de Decisões

| ID | Título | Status | Data |
| :--- | :--- | :---: | :--- |
| [ADR-0001](./0001-stack-hibrida-nextjs-app-router-turbopack.md) | Adoção de Next.js App Router com Estratégia SSG-First e Turbopack | **Aceito** | 2026-07-20 |
| [ADR-0002](./0002-zero-runtime-direct-contact-mailto-vs-api.md) | Hub de Contato Direto Client-Side (Zero Custo / Mailto) vs. API Serverless Paga | **Aceito** | 2026-07-22 |
| [ADR-0003](./0003-internacionalizacao-reativa-com-ssg-first.md) | Sistema i18n Reativo Multilíngue com Preservação de SSG e Resolução de Hydration | **Aceito** | 2026-09-07 |
| [ADR-0004](./0004-animacoes-com-gsap-lenis-e-prefers-reduced-motion.md) | Orquestração Cinemática (GSAP + Lenis) com Acessibilidade Rigorosa (`prefers-reduced-motion`) | **Aceito** | 2026-07-22 |
| [ADR-0005](./0005-estrategia-de-testes-vitest-vs-jest.md) | Suíte de Testes Automatizados com Vitest, React Testing Library e jsdom | **Aceito** | 2026-07-22 |
