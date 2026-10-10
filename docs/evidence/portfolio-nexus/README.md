# Portfolio Nexus Evidence

Este diretório reúne as evidências técnicas de arquitetura, testes, performance e decisões de engenharia do próprio **Portfolio Nexus**.

A intenção é manter cada afirmação pública estritamente ligada a artefatos verificáveis: código-fonte, suíte de testes, relatórios do Lighthouse, medições reais de navegador e decisões de design.

---

## Índice de Evidências

| Área | Arquivo | Estado | Descrição |
| :--- | :--- | :--- | :--- |
| **Arquitetura** | [`architecture.md`](./architecture.md) | **Verified** | Arquitetura SSG Next.js 16, isolamento de metadados, pipeline de renderização e acessibilidade. |
| **Trade-offs** | [`trade-offs.md`](./trade-offs.md) | **Verified** | Decisões técnicas conscientes: SSG vs SSR, Lenis/Motion vs Nativo, Mailto vs Backend. |
| **Testes** | [`tests.md`](./tests.md) | **Verified** | Matriz de testes: 8 testes unitários (Vitest) e 3 jornadas completas E2E (Playwright). |
| **Performance** | [`lighthouse.md`](./lighthouse.md) | **Verified** | Auditoria Lighthouse Sprint 1: LCP real 1.20s, CLS 0.000, A11y 100, SEO 100. |
| **Claims Aprovados** | [`claims.md`](./claims.md) | **Active** | Matriz de afirmações técnicas públicas classificadas por estado (Verified, Observed, Designed, Target). |
| **Static Export** | [`static-export.md`](./static-export.md) | **Verified** | Configuração de build para GitHub Pages / Vercel com caminhos relativos seguros. |
| **Acessibilidade** | [`accessibility.md`](./accessibility.md) | **Verified** | Conformidade WCAG 2.1 AA, prefers-reduced-motion e navegação por teclado. |

---

## Resumo dos Claims Verificados

- [x] Construído com **Next.js 16.2**, **React 19** e **TypeScript**.
- [x] Estudo de casos desacoplados por camada de metadados leves (`projects-meta.ts`).
- [x] 14 páginas estáticas geradas via SSG puro (`generateStaticParams`).
- [x] Paridade multilíngue completa com suporte a **EN**, **PT** e **ES**.
- [x] LCP Real no navegador medido em **1.20 segundos** com **0.000 CLS**.
- [x] Suíte de testes automatizada com 100% de aprovação (Vitest + Playwright).