# Accessibility and Motion Evidence

## Escopo

Este documento registra evidências de acessibilidade e motion já implementadas no Portfolio Nexus.

## Evidências Atuais

### Focus Visible

`styles/globals.css` define foco visível global para elementos interativos:

- `a`
- `button`
- `input`
- `textarea`
- `select`
- `summary`
- elementos com `tabindex`

Isso permite que navegação por teclado tenha sinal visual consistente.

### Selection Contrast

`styles/globals.css` também define contraste explícito para `::selection`.

### Reduced Motion

Evidências no código:

- `styles/globals.css` possui regra global para `prefers-reduced-motion: reduce`.
- `shared/hooks/useReducedMotion.ts` encapsula a preferência do sistema.
- `shared/hooks/__tests__/useReducedMotion.test.ts` cobre os estados principais do hook.
- `shared/effects/PageTransition.tsx` simplifica transição quando reduced motion está ativo.
- Seções críticas do English Tutor verificam `prefers-reduced-motion` antes de executar animações mais fortes.

## Claims Permitidos

- O projeto possui suporte a foco visível global.
- O projeto possui tratamento para `prefers-reduced-motion` em efeitos globais e em pontos críticos revisados.
- Há teste unitário para o hook `useReducedMotion`.

## Limites

- Ainda falta auditoria completa por teclado em todas as páginas longas.
- Lighthouse Accessibility foi anexado como evidência local em 2026-09-12 com score 96.
- Ainda falta revisar todos os efeitos GSAP restantes com a mesma profundidade aplicada ao English Tutor.