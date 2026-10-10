# Portfolio Nexus Validation Evidence

## Escopo

Este arquivo registra comandos usados para validar o Portfolio Nexus em ambiente local.

## Última Execução Local

Data local: 2026-10-10

| Comando | Estado | Observação |
|---|---|---|
| `npx tsc --noEmit` | Passed | Tipagem TypeScript validada. |
| `npm run lint` | Passed | ESLint sem erros. |
| `npm run test` | Passed | 3 arquivos de teste, 8 testes passando. |
| `npm run build` | Passed | Next gerou 14 páginas estáticas. |
| `npm run test:e2e` | Passed | 6 fluxos E2E passando em Chromium no mesmo modo usado pelo CI do GitHub Pages. |

## Evidência de Build

O build de produção reportou 14 rotas geradas:

- `/`
- `/_not-found`
- `/contact`
- `/contact_page`
- `/icon-12o0cb.ico`
- `/icon-12o0cb.png`
- `/process`
- `/projects/music-player`
- `/projects/saas-data-control`
- `/projects/english-tutor`
- `/projects/portfolio-nexus`
- `/robots.txt`
- `/sitemap.xml`

A rota `/projects/[slug]` usa SSG com `generateStaticParams`.

## Evidência de Testes

Testes unitários atuais:

- `shared/hooks/__tests__/useReducedMotion.test.ts`
- `shared/i18n/__tests__/useTranslation.test.tsx`
- `features/home/components/__tests__/DirectContactForm.test.tsx`

Fluxos E2E atuais:

- troca entre EN, PT e ES;
- atualização do link `mailto` no formulário de contato;
- navegação da home para o case Music Player;
- presença dos sete campos do TL;DR nos quatro cases publicados;
- conexão dos quatro cases com fluxo de arquitetura, trade-offs e próximos passos;
- preview, download localizado e feedback visual do Resume.

## Limites

- O baseline inicial do Lighthouse ficou abaixo da meta; a correção de LCP e a medição final da Sprint 1 estão registradas em `lighthouse-sprint1-final.report.json`.
- E2E cobre os fluxos críticos de idioma, contato, Resume, navegação inicial, TL;DR e Technical Proof dos quatro cases, mas ainda não cobre todas as interações internas nem todos os browsers do Release Gate.
- Performance do English Tutor possui medição inicial registrada no roadmap, mas ainda precisa de trace/profiling formal.
