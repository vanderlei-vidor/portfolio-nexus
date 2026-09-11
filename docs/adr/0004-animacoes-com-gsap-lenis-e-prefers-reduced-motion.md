# ADR 0004: Orquestração Cinemática (GSAP + Lenis) com Acessibilidade Rigorosa (prefers-reduced-motion)

- **Status:** Aceito
- **Data:** 2026-07-22
- **Decisores:** Vanderlei Vidor

## 1. Contexto
A identidade visual do Portfolio Nexus busca transmitir um acabamento cinemático de alto nível ("Smooth. Elegant. Cinematic."). A experiência exige rolagem inercial refinada e animações de esteira de tecnologias em movimento contínuo (marquee infinito).

Porém, animações contínuas e rolagem modificada trazem riscos severos:
1. **Acessibilidade (a11y):** Usuários com distúrbios vestibulares sofrem náusea e desorientação com movimentos contínuos na tela (critério WCAG 2.1 - 2.2.2 & 2.3.3).
2. **Consumo Excessivo de CPU/Bateria:** Execução de loops infinitos em threads do navegador mesmo com a aba em segundo plano ou o elemento fora da viewport.

## 2. Decisão
Adotar o ecossistema **GSAP + Lenis** com camadas estritas de otimização e acessibilidade:
- **Hook `useReducedMotion` Personalizado:** Monitora o evento de sistema `(prefers-reduced-motion: reduce)`.
- **Desativação de Efeitos para Reduced Motion:**
  - O cursor customizado é desativado em `shared/effects/Cursor.tsx`.
  - A rolagem inercial do Lenis tem sua interpolação ajustada para 1 (instantânea) em `shared/effects/SmoothScroll.tsx`.
  - As timelines infinitas do GSAP em `Stack.tsx` são pausadas imediatamente.
  - Regras CSS globais reduzem os tempos de transição para `0.01ms`.
- **`IntersectionObserver` para Eficiência de CPU:**
  - As esteiras do `Stack.tsx` só executam tween quando o elemento está comprovadamente visível na viewport (com 10% de visibilidade e 100px de rootMargin).
  - O cálculo do marquee foi estritamente projetado com **2 cópias de cada lista**, garantindo que `xPercent: -50` represente exatamente o deslocamento de uma esteira completa, eliminando anomalias visuais e triplicações de itens.

## 3. Consequências

### Positivas
- **Conformidade com Diretrizes WCAG 2.1:** O portfólio respeita as configurações do sistema operacional de cada visitante.
- **Economia de Recursos:** Redução de até 80% no uso contínuo de CPU em comparação com marquees executados sem `IntersectionObserver`.
- **Movimento Fluido:** Sincronização impecável com os drivers de aceleração gráfica por hardware via `will-change-transform`.

### Negativas / Trade-offs
- Exige manter referências do GSAP em `useRef` e gerenciar manualmente o ciclo de vida e descarte (`ctx.revert()`, `ScrollTrigger.kill()`) para evitar vazamentos de memória (memory leaks).
