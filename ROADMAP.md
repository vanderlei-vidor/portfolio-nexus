# 🗺️ Roadmap de Evolução — Portfolio Nexus

> Documento estratégico de evolução técnica e visão de produto para o **Portfolio Nexus**, mantido sob a perspectiva de Arquitetura de Software e Gestão de Produto (Product Ownership).

---

## 🎯 Visão do Produto
Transformar o **Portfolio Nexus** de um portfólio de alta performance visual em um **Ecossistema de Experiência Digital & Showcase Interativo de Nível AAA**, combinando engenharia de software de ponta, inteligência artificial integrada, observabilidade em tempo real e design cinemático.

---

## ⚡ Fase 1: Finalização da Release v1.0 & Estabilização (Curto Prazo — 1 a 2 Semanas)
> **Foco:** Baixo esforço, altíssimo impacto na confiabilidade, SEO e preparação produtiva.

### 🛠️ Refatoração Técnica & Higiene de Código
- [x] **Limpeza de Arquivos Fantasma:** Preencher ou remover diretórios vazios em `shared/ui`, `shared/providers` e `shared/motion`.
- [x] **Correção de Metadata em Client Components:** Separar a declaração de Metadata do arquivo `contact_page.tsx` (removendo a exportação ignorada no escopo `"use client"`).
- [x] **Tratamento de Erros Nativo:** Criar componentes `app/error.tsx`, `app/global-error.tsx` e `app/not-found.tsx` customizados com estética Glassmorphism.

### ✉️ Funcionalidades Críticas
- [x] **Hub de Contato Direto (Zero Custo):** Gerador inteligente de `mailto:` pré-formatado com assunto/mensagem e cópia em 1-clique (sem dependência de APIs de e-mail pagas).
- [x] **Acessibilidade (a11y) & Reduced Motion:** Suporte global à media query `prefers-reduced-motion` no CSS, hook `useReducedMotion`, desativação de cursor customizado, smooth scroll nativo e congelamento de esteiras infinitas GSAP.
- [x] **Otimização de Assets Remanescentes:** Padronização da propriedade `quality={75}` e tamanhos responsivos `sizes` em `ProjectCard.tsx` e `ProjectHeroSection.tsx`.

---

## 🚀 Fase 2: Robustez, Qualidade & Observabilidade (Médio Prazo — 1 a 2 Meses)
> **Foco:** Transformar a aplicação em um sistema tolerante a falhas com testes automatizados e métricas reais de usuário.

### 🧪 Suíte de Testes & CI/CD
- [x] **Testes Unitários & Componentes:** Configurados **Vitest**, **React Testing Library** e **jsdom** com suítes ativas para `useReducedMotion` e `DirectContactForm` (comando `npm run test`).
- [ ] **Testes End-to-End (E2E):** Implementar testes críticos com **Playwright** cobrindo a jornada de navegação principal, troca de rotas e envio do formulário de contato.
- [ ] **Pipeline de CI/CD:** Github Actions para validação automatizada de `eslint`, `tsc --noEmit`, `vitest` e `playwright` em todo Pull Request.

### 📊 Observabilidade & Analytics Avançado
- [ ] **Monitoramento de Erros:** Integração com **Sentry** para captura silenciosa de exceções de runtime no cliente e servidor.
- [ ] **Product Analytics & Heatmaps:** Configuração do **PostHog** para análise de retenção, tempo de permanência em cada case e mapa de calor do cursor.

### 🌍 Internacionalização (i18n)
- [x] **Suporte Multi-idioma:** Dicionários de tradução nativos em `messages/en.json` e `messages/pt.json`, contexto reativo `LanguageContext`, hook `useTranslation` e Seletor de Idioma Glassmorphism (`LanguageSwitcher`).

---

## 🔮 Fase 3: Inovação "Nível AAA" & Recursos Avançados (Longo Prazo — 3 a 6 Meses)
> **Foco:** Diferenciação de mercado, inteligência artificial e interatividade imersiva de última geração.

### 🤖 Nexus AI Assistant (Agente Conversacional Incorporado)
- [ ] **Assistente de Portfólio com RAG:** Agente de IA interativo no terminal ([Terminal.tsx](file:///c:/Users/bibij/Portfolio%20Nexus/features/home/components/Terminal.tsx)) alimentado por LLM e RAG (Retrieval-Augmented Generation) treinado no currículo, arquitetura do projeto e cases do autor.
- [ ] **Comando por Voz / Áudio:** Integração com Web Speech API ou OpenAI Whisper para navegação viva hands-free pelo site.

### 🎨 Playground 3D Interativo & Design System Vivo
- [ ] **Interactive WebGL Lab:** Adicionar um módulo / laboratório 3D em Three.js/React Three Fiber onde recrutadores e clientes possam interagir com shader materiais e física em tempo real.
- [ ] **Interactive Case Sandbox:** Permitir que o visitante teste protótipos funcionais embrotados diretamente na página dos cases (ex: simulador interativo de player de áudio ou painel SaaS).

### 🔒 CMS Headless & Automações
- [ ] **Integração com CMS Headless:** Conectar o registro de cases ([registry.ts](file:///c:/Users/bibij/Portfolio%20Nexus/features/projects/registry.ts)) a um CMS headless (ex: Sanity ou Payload CMS) para publicação contínua de novos projetos sem necessidade de novo deploy de código.

---

## 📌 Matriz de Priorização (Impacto vs. Esforço)

| Recurso / Tarefa | Impacto | Esforço | Prioridade | Fase |
| :--- | :---: | :---: | :---: | :---: |
| Server Action de E-mail (Resend + Zod) | 🔴 Alto | 🟢 Baixo | **P0** | Fase 1 |
| Tratamento de Erros (`error.tsx`, `not-found.tsx`) | 🔴 Alto | 🟢 Baixo | **P0** | Fase 1 |
| Limpeza de Pastas Fantasma em `shared/` | 🟡 Médio | 🟢 Baixo | **P1** | Fase 1 |
| Suporte `prefers-reduced-motion` | 🟡 Médio | 🟢 Baixo | **P1** | Fase 1 |
| Suíte de Testes (Vitest + Playwright) | 🔴 Alto | 🟡 Médio | **P1** | Fase 2 |
| Observabilidade (Sentry + PostHog) | 🔴 Alto | 🟢 Baixo | **P1** | Fase 2 |
| Internacionalização (i18n pt-BR / en-US) | 🔴 Alto | 🟡 Médio | **P2** | Fase 2 |
| Nexus AI Agent (RAG no Terminal) | 🟣 Extraordinário | 🔴 Alto | **P2** | Fase 3 |
| CMS Headless (Sanity / Payload) | 🟡 Médio | 🔴 Alto | **P3** | Fase 3 |
