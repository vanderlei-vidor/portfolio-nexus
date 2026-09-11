# ADR 0005: Suíte de Testes Automatizados com Vitest, React Testing Library e jsdom

- **Status:** Aceito
- **Data:** 2026-07-22
- **Decisores:** Vanderlei Vidor

## 1. Contexto
Para garantir que futuras refatorações visuais ou acréscimos de recursos não introduzam regressões funcionais, fazia-se imperativo implementar uma suíte de testes automatizados com execução rápida e suporte nativo a ESM (ECMAScript Modules) e TypeScript.

A escolha tradicional no ecossistema React (Jest + Babel/ts-jest) apresentava atritos históricos com projetos Next.js modernos que utilizam ESM puro, além de tempo de inicialização lento.

## 2. Decisão
Adotar **Vitest** em conjunto com **React Testing Library** e **jsdom**:
- **Velocidade Extrema:** O Vitest compartilha o pipeline de transformação de módulos do Vite/ESM, iniciando testes em milissegundos.
- **Configuração Simples com Aliases:** O arquivo `vitest.config.ts` mapeia o alias `@/` diretamente para a raiz do repositório, garantindo compatibilidade total com os imports do Next.js.
- **Ambiente de Teste Isolado (`test/setup.ts`):** Mocks universais para APIs do navegador indisponíveis em ambiente Node/jsdom, incluindo `window.matchMedia` e `navigator.clipboard`.
- **Cobertura de Casos Críticos:** Testes focados em comportamento do usuário:
  - Detecção e chaveamento de `prefers-reduced-motion` no hook `useReducedMotion`.
  - Construção correta de URLs `mailto:`, cópia para clipboard e reatividade do `DirectContactForm`.
  - Mecanismo de tradução e persistência no `LanguageContext`.

## 3. Consequências

### Positivas
- **Execução em Menos de 2 Segundos:** Todos os testes unitários e de integração de componentes executam de forma ultrarrápida no comando `npm run test`.
- **Zero Configuração de Babel:** Elimina dependências legadas de compilação.
- **Confiança na Entrega:** Proteção contínua contra regressões em refatorações de código.

### Negativas / Trade-offs
- O ambiente `jsdom` simula o DOM do navegador, mas não renderiza pixels reais nem executa aceleração WebGL de shaders de Three.js, os quais demandam testes End-to-End separados via Playwright.
