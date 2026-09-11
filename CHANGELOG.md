# Changelog

Todas as mudanças relevantes do **Portfolio Nexus** são registradas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/), e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## [Unreleased] - Rumo ao Nível AAA

### Added
- **Architecture Decision Records (`docs/adr/`)**: Documentação arquitetural formal com Contexto, Decisão e Consequências:
  - `ADR-0001`: Next.js App Router com Estratégia SSG-First e Turbopack.
  - `ADR-0002`: Hub de Contato Direto Client-Side (Zero Custo / Mailto) vs. API Serverless Paga.
  - `ADR-0003`: Sistema i18n Reativo Multilíngue com Preservação de SSG e Resolução de Hydration.
  - `ADR-0004`: Orquestração Cinemática (GSAP + Lenis) com Acessibilidade Rigorosa (`prefers-reduced-motion`).
  - `ADR-0005`: Suíte de Testes Automatizados com Vitest, React Testing Library e jsdom.
- **Internacionalização Tríplice Completa (EN / PT / ES)**: Suporte dinâmico a 3 idiomas nos dicionários JSON (`en.json`, `pt.json`, `es.json`), com chaveamento persistente no `localStorage` e detecção de idioma padrão via `navigator.language`.
- **Componente `LanguageSwitcher` com Separadores Visuais**: Seletor estético Glassmorphism (`EN | PT | ES`) com divisores visuais elegantes, suporte total a teclado e atributos `aria-pressed`, `aria-label` e `lang`.
- **Testes End-to-End com Playwright (`e2e/core-journeys.spec.ts`)**: Suíte completa de testes de jornada de usuário em navegador Chromium headless real (chaveamento dos 3 idiomas, preenchimento e validação de `mailto:`, e navegação direta para case study).
- **Pipeline de CI/CD Integrada com E2E (`.github/workflows/ci.yml`)**: Workflow completo com jobs paralelos de validação, build estático e execução automatizada de Playwright no GitHub Actions.
- **SEO Estruturado com Schema.org JSON-LD**: Injeção de metadados semânticos `Person` (com LinkedIn oficial), `WebSite` e `SoftwareApplication` para Google Rich Snippets.
- **Suíte de Testes Automatizados**: Vitest integrado com React Testing Library e jsdom (`npm run test`) validando `useReducedMotion`, `DirectContactForm` e o ecossistema `i18n`.

### Fixed
- **Bug de Renderização no Marquee da Stack**: Corrigida a duplicação/triplicação visual na esteira de tecnologias em `Stack.tsx`. A lista foi calibrada para 2 cópias por esteira com deslocamento `xPercent: -50`, sincronizando perfeitamente o loop contínuo do GSAP sem itens repetidos em excesso.
- **Rótulos e Placeholders Desalinhados**: Substituição do texto estático solto "Author" / "Autor" na seção `About.tsx` pelo nome oficial do desenvolvedor (**Vanderlei Vidor**) em todos os dicionários de idioma.
- **Eliminação de Hydration Mismatch**: Refatorada a inicialização do `LanguageContext.tsx` utilizando sincronização diferida via `requestAnimationFrame` pós-hidratação, garantindo paridade exata entre a renderização inicial do servidor (SSR/SSG) e o cliente.

---

## [0.2.0] - 2026-07-22

### Added
- **Hub de Contato Direto Zero Custo (`DirectContactForm.tsx`)**: Gerador de mensagem formatada para cliente de e-mail local (`mailto:`) e botão de cópia rápida para Webmail (Gmail/Outlook Web).
- **Acessibilidade Completa & Reduced Motion**:
  - Criação do hook `useReducedMotion.ts` para capturar preferências do sistema operacional.
  - Pausa de animações de loop infinito no GSAP e desaceleração do Lenis Smooth Scroll quando `prefers-reduced-motion` estiver ativo.
  - Regra global CSS em `globals.css` reduzindo durações de transição para `0.01ms`.
  - Desativação do cursor personalizado em dispositivos com restrição de movimento ou touch.
- **Tratamento de Erros e Rotas Inexistentes**:
  - Criação de `app/not-found.tsx` com interface Glassmorphic personalizada (404).
  - Criação de `app/error.tsx` para recuperação de falhas no cliente sem quebra de página inteira.
  - Criação de `app/global-error.tsx` para interceptação de exceções críticas no layout raiz.
- **Higiene e Barrel Exports**: Adicionados exports formais em `shared/ui/index.ts`, `shared/providers/index.ts` e `shared/motion/index.ts`.

### Changed
- **Otimização de Assets e Imagens**: Padronizado o atributo `quality={75}` e configurado `sizes="100vw"` em `ProjectCard.tsx` e `ProjectHeroSection.tsx` para redução de payload e prevenção de layout shift.
- **Metadata API Centralizada**: Configuração completa de OpenGraph e Twitter Cards em `app/layout.tsx`.

---

## [0.1.0] - 2026-07-20

### Added
- Inicialização do projeto **Portfolio Nexus** com Next.js 16 (App Router), React 19 e Tailwind CSS v4.
- Criação das seções fundamentais: Hero, About, Selected Projects, Stack, Terminal e Contact.
- Estudo de cases detalhados em `/projects/[slug]` com geração estática de rotas (`generateStaticParams`).
- Geração automática de `sitemap.xml` e `robots.txt` orientada a SEO técnico.