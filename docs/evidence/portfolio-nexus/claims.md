# Portfolio Nexus Claims

Este arquivo detalha os claims públicos permitidos para o case Portfolio Nexus.

| Claim | Estado | Evidência | Uso público |
|---|---|---|---|
| Usa Next.js 16, React 19 e TypeScript | Verified | `package.json` | Pode aparecer como stack. |
| Usa registry modular para resolver cases | Verified | `features/projects/registry.ts` e `app/(site)/projects/[slug]/page.tsx` | Pode aparecer como decisão de arquitetura. |
| Gera páginas de projeto via SSG | Verified | `generateStaticParams` e build com 14 rotas | Pode aparecer como static generation. |
| Suporta PT, EN e ES | Verified | `messages/` e E2E de troca de idioma | Pode aparecer como i18n. |
| Publicação preparada para GitHub Pages | Verified | `next.config.ts`, `.github/workflows/ci.yml`, `scripts/serve-static.mjs` | Pode aparecer como CI/CD estático. |
| E2E cobre fluxos públicos centrais | Verified | `e2e/core-journeys.spec.ts` | Pode aparecer como cobertura de smoke E2E. |
| Motion respeita reduced motion em pontos críticos | Verified / Partial | `useReducedMotion`, CSS global, PageTransition, English Tutor | Usar linguagem moderada. |
| Lighthouse >= 95 | Target | Pendente | Não publicar como resultado. |

## Linguagem Recomendada

Usar:

- "portfolio multilíngue com geração estática";
- "case system orientado por registry";
- "pipeline com lint, type-check, testes, build e E2E";
- "motion com suporte a reduced motion em efeitos revisados".

Evitar:

- "100% acessível";
- "performance AAA comprovada";
- "zero layout shift";
- "cobertura completa".