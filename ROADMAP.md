# 🗺️ Roadmap de Engenharia — Portfolio Nexus (Rumo ao Nível AAA)

> Documento estratégico de evolução de produto e maturidade de engenharia de software para o **Portfolio Nexus**, projetado para estabelecer o projeto como uma referência global em estética, performance, observabilidade e código limpo.

---

## 🎯 Definição de "Nível AAA" no Contexto do Projeto
1. **Performance Absoluta:** 100/100 em todas as métricas do Google Lighthouse (Performance, Accessibility, Best Practices e SEO), com Core Web Vitals zerados em TBT e LCP < 1.2s.
2. **Confiança e Confiabilidade Técnica:** 100% de automação de testes com CI/CD inquebrável, bloqueando qualquer regressão de build ou lint.
3. **Observabilidade em Produção:** Telemetria de erros (Sentry) e análise de comportamento anônimo (PostHog/Speed Insights) com monitoramento ativo.
4. **Documentação de Arquitetura de Classe Mundial:** ADRs estruturadas, cobertura completa de decisões técnicas e design system componentizado.
5. **Diferenciação Tecnológica:** Interatividade 3D com Three.js/R3F e inteligência artificial contextual (RAG) integrada.

---

## ✅ Fase 1: Fundação, Higiene Técnica & UX (Concluída)
- [x] **Arquitetura Server/Client Component estrita:** Next.js App Router com separação limpa de responsabilidades e SSG integral (14/14 páginas estáticas).
- [x] **Tratamento de Erros e Resiliência:** Páginas de erro e fallback nativas (`app/not-found.tsx`, `app/error.tsx`, `app/global-error.tsx`).
- [x] **Acessibilidade Completa (a11y):** Suporte nativo à media query `prefers-reduced-motion` no CSS, GSAP, Lenis Smooth Scroll e desacoplamento de cursor customizado.
- [x] **Otimização de Assets e Mídia:** Padronização de imagens em WebP, `quality={75}` e `sizes` responsivos no `ProjectCard` e `ProjectHeroSection`.
- [x] **Hub de Contato Direto Zero Custo:** `DirectContactForm` baseado no padrão RFC 6068 (`mailto:`) com botão de cópia de e-mail formatado em 1-clique.
- [x] **Suíte de Testes Automatizados:** Configuração de Vitest, React Testing Library e jsdom com cobertura de hooks (`useReducedMotion`) e componentes críticos.
- [x] **Internacionalização Tríplice (EN / PT / ES):** Dicionários JSON modulares, contexto reativo, persistência e resolução de erro de hidratação.
- [x] **Correção de Bugs Visuais:** Correção do loop da esteira de tecnologias (`Stack.tsx`) e padronização do nome do autor no `About.tsx`.
- [x] **Architecture Decision Records (ADRs):** Estruturação de `docs/adr/` com registro de decisões técnicas e trade-offs de engenharia.

---

## 🚀 Fase 2: Robustez, CI/CD & Observabilidade (Médio Prazo)
> **Foco:** Transformar o repositório em um padrão corporativo sênior de entrega contínua e qualidade garantida.

### 1. Automação de CI/CD (GitHub Actions)
- [x] **Workflow de Pull Request & Push (`.github/workflows/ci.yml`):**
  - Validação estrita de ESLint 9 (`npm run lint`).
  - Verificação de tipos estritos do TypeScript (`npx tsc --noEmit`).
  - Execução automatizada da suíte de testes unitários (`npm run test`).
  - Validação de build estático de produção (`npm run build`).
- [ ] **Badges de Status no Repositório:** Badge de aprovação de build e testes diretamente na documentação.

### 2. Testes End-to-End (E2E) com Playwright
- [ ] **Testes de Fluxos Críticos:**
  - Alternância de idioma (EN -> PT -> ES) verificando a tradução em cascata no DOM.
  - Preenchimento do formulário de contato e verificação da URL `mailto:` gerada.
  - Navegação entre rotas com teste de carregamento dos 4 cases de projeto em `/projects/[slug]`.
  - Comportamento de navegação ao clicar nos links de âncora com rolagem suave (`SmoothScroll`).

### 3. Observabilidade e Telemetria em Produção
- [ ] **Monitoramento de Exceções com Sentry:**
  - Captura silenciosa de falhas no cliente e servidor sem retenção de dados sensíveis (PII-free).
  - Rastreamento de sessões com replay visual de erros.
- [ ] **Real User Monitoring (RUM) & Vitals:**
  - Acompanhamento de métricas reais de visitantes através do `@vercel/speed-insights`.
- [ ] **Product Analytics com PostHog:**
  - Mapa de calor de interação (heatmaps) e análise de funil de visualização de cases de projetos.

---

## 🔮 Fase 3: Engenharia Avançada & Recursos "Nível AAA" (Longo Prazo)
> **Foco:** Diferenciação de mercado, inteligência artificial generativa e imersão interativa de ponta.

### 1. Nexus AI Assistant (Agente Conversacional Incorporado)
- [ ] **Assistente de Portfólio com RAG no Terminal (`Terminal.tsx`):**
  - Agente inteligente alimentado por modelo LLM leve com streaming de respostas em tempo real.
  - Base de conhecimento vetorial (RAG) contendo dados de trajetória profissional, decisões arquiteturais dos cases e competências técnicas do autor.
- [ ] **Modo de Acessibilidade por Voz:**
  - Navegação experimental por comando de voz utilizando a Web Speech API.

### 2. 3D WebGL Shader Lab (Three.js & React Three Fiber)
- [ ] **Módulo Interativo de Shaders:**
  - Demonstração prática de shaders GLSL customizados e física de partículas com Three.js/R3F, renderizados apenas sob demanda com detecção de GPU fraca para preservar a bateria do usuário.
- [ ] **Simulador Interativo nos Cases:**
  - Sandbox acoplada à página do case do Music Player e do SaaS Data Control permitindo que o visitante experimente interfaces funcionais simuladas no navegador.

### 3. Design System Vivo & Documentação Visual
- [ ] **Storybook / Vitest Workspace:**
  - Catálogo isolado de componentes atômicos (`LanguageSwitcher`, `DirectContactForm`, `MarqueeItem`, `ProjectCard`) com documentação de estados e testes visuais de regressão.

---

## 📌 Matriz de Priorização (Impacto vs. Esforço)

| Iniciativa / Entregável | Impacto | Esforço | Prioridade | Fase |
| :--- | :---: | :---: | :---: | :---: |
| ADRs (Architecture Decision Records) | 🔴 Alto | 🟢 Baixo | **P0 (Concluído)** | Fase 1 |
| Internacionalização Tríplice (EN/PT/ES) | 🔴 Alto | 🟢 Baixo | **P0 (Concluído)** | Fase 1 |
| Correção do Bug da Esteira (`Stack.tsx`) | 🔴 Alto | 🟢 Baixo | **P0 (Concluído)** | Fase 1 |
| Pipeline de CI/CD (GitHub Actions) | 🔴 Alto | 🟢 Baixo | **P0** | Fase 2 |
| Testes E2E com Playwright | 🔴 Alto | 🟡 Médio | **P1** | Fase 2 |
| Observabilidade e Telemetria (Sentry) | 🔴 Alto | 🟢 Baixo | **P1** | Fase 2 |
| Nexus AI Assistant com RAG no Terminal | 🟣 Extraordinário | 🔴 Alto | **P2** | Fase 3 |
| WebGL 3D Shader Lab (Three.js) | 🟣 Extraordinário | 🔴 Alto | **P2** | Fase 3 |
| Design System Isolado (Storybook) | 🟡 Médio | 🟡 Médio | **P3** | Fase 3 |
