# Portfolio Nexus Validation Evidence

## Escopo

Este arquivo registra comandos usados para validar o Portfolio Nexus em ambiente local.

## Última Execução Local

Data local: 2026-09-12

| Comando | Estado | Observação |
|---|---|---|
| `npx tsc --noEmit` | Passed | Tipagem TypeScript validada. |
| `npm run lint` | Passed | ESLint sem erros. |
| `npm run test` | Passed | 3 arquivos de teste, 8 testes passando. |
| `npm run build` com `GITHUB_PAGES=true` e `NEXT_PUBLIC_BASE_PATH=/portfolio-aaa` | Passed | Next gerou 14 rotas estáticas. |
| `npm run test:e2e` com `E2E_STATIC_EXPORT=true` e `NEXT_PUBLIC_BASE_PATH=/portfolio-aaa` | Passed | 3 fluxos E2E passando contra `out`. |

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
- navegação da home para o case Music Player.

## Limites

- Lighthouse foi anexado como evidência formal local em 2026-09-12; Performance ficou abaixo da meta e virou follow-up.
- E2E cobre fluxos críticos iniciais, mas ainda não cobre todos os cases individualmente.
- Performance do English Tutor possui medição inicial registrada no roadmap, mas ainda precisa de trace/profiling formal.