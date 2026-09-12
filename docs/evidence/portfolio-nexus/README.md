# Portfolio Nexus Evidence

Este diretório reúne evidências técnicas do próprio Portfolio Nexus.

A intenção não é transformar documentação em marketing. A intenção é manter claims públicos ligados a artefatos verificáveis: código, build, testes, E2E, configuração de deploy, acessibilidade e decisões de arquitetura.

## Evidence Index

| Área | Arquivo | Estado |
|---|---|---|
| Validação local | `validation.md` | Verified |
| Static export e GitHub Pages | `static-export.md` | Verified |
| Acessibilidade e motion | `accessibility.md` | Verified / Partial |
| Claims aprovados | `claims.md` | Active |
| Lighthouse | `lighthouse.md` | Pending |

## Claims Públicos Permitidos

- Portfolio construído com Next.js 16, React 19 e TypeScript.
- Cases resolvidos por registry modular.
- Páginas de projeto geradas estaticamente via `generateStaticParams`.
- Conteúdo público com suporte a PT, EN e ES.
- Static export preparado para GitHub Pages em subdiretório.
- E2E cobre troca de idioma, contato e navegação para case.
- Motion crítico respeita `prefers-reduced-motion` em pontos já revisados.

## Claims Ainda Não Permitidos

- Lighthouse >= 95 como resultado alcançado.
- Performance mobile AAA sem relatório reproduzível.
- Acessibilidade perfeita ou 100% garantida.
- Ausência total de layout shift sem auditoria formal.

## Última Referência de Fechamento

- Sprint 2 commit: `2c6232a docs: close sprint 2 case narratives`
- Próxima camada: Sprint 2.5, evidências por projeto.