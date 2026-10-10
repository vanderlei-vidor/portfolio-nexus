# Portfolio Nexus — Production-Grade Roadmap v2.1

> **Objetivo interno:** elevar o Portfolio Nexus a um padrão de execução comparável a produtos digitais de alto nível, com foco em engenharia, clareza narrativa, acessibilidade, performance, confiabilidade técnica e conversão profissional.
>
> **Regra principal:** nenhuma afirmação pública deve exceder o que pode ser demonstrado por código, teste, profiling, benchmark, documentação ou comportamento observável do produto.
>
> **Regra de posicionamento:** o termo AAA pode continuar sendo usado internamente como meta de qualidade, mas não deve aparecer como autoavaliação pública.
>
> **Status atual (2026-10-10):** Sprint 4 — Case Study Proof concluída. Sprint 5 — Motion & Premium UI Polish é a fase ativa.

---

## 1. Norte do produto

O Portfolio Nexus não é apenas uma vitrine visual. Ele deve funcionar como uma demonstração prática de capacidade em:

- Engenharia de software;
- Arquitetura;
- Produto;
- Performance;
- Acessibilidade;
- Comunicação técnica;
- Qualidade de entrega;
- Decisão baseada em evidência.

A experiência final deve transmitir seis qualidades:

1. **Clareza** — o visitante entende rapidamente quem é Vanderlei, o que ele constrói e por que cada projeto é relevante.
2. **Credibilidade** — claims, métricas e descrições são tecnicamente defensáveis.
3. **Consistência** — design, motion, i18n, arquitetura e narrativa seguem padrões unificados.
4. **Performance** — efeitos visuais nunca comprometem responsividade, estabilidade ou acessibilidade.
5. **Evidência** — afirmações importantes possuem mecanismo de comprovação.
6. **Conversão** — recrutadores, clientes e tech leads conseguem chegar rapidamente a Projects, Resume, GitHub, LinkedIn e Contact.

---

## 2. Estado atual consolidado

### 2.1 Estado consolidado após a Sprint 4

| Área | Estado | Leitura |
| :--- | :--- | :--- |
| **Higiene técnica** | Fechada | Registry, fallback, metadata, foco, seleção, interações e lifecycle principal revisados. |
| **Narrativa dos cases** | Fechada | Quatro cases migrados para Problem → Decision → Solution → Evidence → Result. |
| **Engineering Evidence** | Fechada | Sprint 2 concluída com o conjunto mínimo de evidências dos quatro projetos. |
| **Microinterações** | Parcial | Padrões globais aplicados; falta fechamento de componentes internos. |
| **Performance / homologação** | P0 fechada | LCP reduzido de 8.6 s para 1.20 s no cenário controlado da Sprint 1; homologação final permanece no Release Gate. |
| **Hiring / conversion UX** | Fechada | Sprint 3 concluída com Hero, CTAs, perfis profissionais, Resume localizado e contato direto sem backend. |
| **Case Study Proof** | Fechada | Sprint 4 concluída com TL;DR, fluxos de arquitetura, trade-offs e próximos passos localizados nos quatro cases. |
| **Release production gate** | Parcial | Pipeline definido, mas precisa fechar 100% antes do release final. |

### 2.2 Baseline original de performance

Medição local em build de produção:

- **Performance:** 75
- **Accessibility:** 96
- **Best Practices:** 96
- **SEO:** 100
- **LCP:** 8.6 s
- **CLS:** 0.008
- **TBT:** 50 ms

#### Leitura histórica
- Accessibility, Best Practices e SEO já estão em bom nível.
- CLS e TBT não indicam, neste baseline, um problema estrutural grave.
- LCP era o principal gargalo técnico deste baseline.
- A correção e a nova medição estão registradas na Sprint 1 e em `docs/evidence/portfolio-nexus/lighthouse-sprint1-final.report.json`.

---

## 3. Ordem oficial de prioridade

A partir da versão 2.1, a execução deve seguir esta ordem:

1. Baseline e limpeza do roadmap (Sprint 0)
2. Performance P0 — LCP (Sprint 1)
3. Engineering Evidence (Sprint 2)
4. Hiring / Conversion UX (Sprint 3)
5. Case Study Proof (Sprint 4)
6. Motion, Tokens & UI Polish (Sprint 5)
7. QA, responsividade, acessibilidade e i18n (Sprint 6)
8. Production Release Gate (Sprint 7)
9. Publicação somente de métricas verificadas

> **Aviso:** Nenhuma nova tecnologia visual deve ser adicionada antes de fechar os itens P0 e P1.

---

## 4. Classificação de prioridade

### P0 — Bloqueia percepção de qualidade
- LCP elevado;
- Erro de build;
- Erro de runtime;
- Falha crítica de navegação;
- Conteúdo incorreto ou claim não comprovado;
- Problema grave de acessibilidade;
- CTA ou formulário de contato quebrado;
- Regressão mobile severa.

### P1 — Necessário para release profissional
- Engineering Evidence estruturada;
- Resume / Contact / GitHub / LinkedIn claramente acessíveis;
- TL;DR dos cases;
- Paridade PT / EN / ES;
- Navegação completa por teclado;
- Testes E2E críticos;
- Cross-browser básico;
- Lighthouse em build real de produção.

### P2 — Refinamento
- Microinterações adicionais;
- Shaders;
- WebGL adicional;
- Glassmorphism extra;
- Efeitos visuais experimentais;
- Animações decorativas.

> **Regra:** P2 nunca deve atrasar P0 ou P1.

---

## 5. Política oficial de claims

Nenhum claim deve ser publicado como fato sem evidência correspondente.

### 5.1 Estados

| Estado | Significado | Uso público |
| :--- | :--- | :--- |
| **Verified** | Comprovado por teste, benchmark, profiling, CI ou documentação reproduzível. | Sim |
| **Observed** | Comportamento observado sem benchmark formal. | Sim, com linguagem moderada |
| **Designed** | Capacidade prevista pela arquitetura, ainda não validada integralmente. | Apenas como intenção/capacidade |
| **Target** | Meta futura. | Não apresentar como resultado |

### 5.2 Linguagem a evitar
- “zero bugs”
- “zero alucinações”
- “privacidade absoluta”
- “zero distorção”
- “100% seguro”
- “120 FPS” sem profiling
- “cold start < X” sem benchmark reproduzível
- “production-ready” sem critérios explícitos
- “enterprise-grade” sem evidência compatível

### 5.3 Linguagem preferida
- “arquitetura projetada para...”
- “validado por...”
- “observado em...”
- “mitiga...”
- “reduz a dependência de...”
- “mantém isolamento de...”
- “perfilado em...”
- “testado com...”
- “meta de...”

---

## 6. Evidence IDs

Cada claim técnico relevante deve possuir rastreabilidade interna.

### Formato

```text
CLAIM-<PROJETO>-<NNN>

Status:
Verified | Observed | Designed | Target

Claim:
Descrição interna do que está sendo afirmado.

Evidence:
- arquivo
- teste
- CI
- benchmark
- log
- trace

Public wording:
Texto aprovado para o portfólio.

Last verified:
YYYY-MM-DD
```

### Exemplo

```text
CLAIM-PORTFOLIO-001

Status:
Verified

Claim:
14 rotas são geradas estaticamente pelo build atual.

Evidence:
- build-output.md
- CI run
- registro do Next.js build

Public wording:
"14 statically generated routes"

Last verified:
2026-09-XX
```

---

## 7. Camadas de evidência

A evidência deve existir em três níveis:

```text
RAW EVIDENCE
    ↓
INTERNAL ENGINEERING EVIDENCE
    ↓
APPROVED PUBLIC EVIDENCE
    ↓
PORTFOLIO CASE STUDY
```

### 1. Raw Evidence
- Logs;
- Playwright traces;
- Lighthouse JSON;
- Screenshots técnicas;
- Output de testes;
- Coverage;
- Benchmark;
- Profiling;
- CI run.

### 2. Internal Engineering Evidence
Localizado em `docs/evidence/<project>/`.

### 3. Approved Public Evidence
Claims autorizados para aparecer no portfólio.

### 4. Portfolio Case Study
Somente a informação necessária para convencer e informar o visitante. O case não deve virar um dump de documentação interna.

---

## 8. Narrativa oficial dos cases

Todos os cases devem seguir a mesma arquitetura de comunicação.

### 8.1 TL;DR obrigatório
No topo de cada case:
- **ROLE**
- **STACK**
- **CHALLENGE**
- **KEY DECISION**
- **EVIDENCE**
- **RESULT**
- **STATUS**

> **Objetivo:** permitir leitura e retenção em 20–30 segundos por recrutadores e líderes.

### 8.2 Estrutura longa

- **Contexto:** Breve descrição do produto e do cenário.
- **Problema:** Qual era o problema real? Por que era tecnicamente relevante? Quais restrições existiam?
- **Decisão de engenharia:** Qual decisão principal foi tomada? Quais alternativas foram consideradas? Quais trade-offs existiram?
- **Solução:** Como a arquitetura foi organizada? Quais tecnologias foram usadas e por quê? Quais mecanismos de segurança, desempenho ou confiabilidade foram aplicados?
- **Evidência:** Testes, benchmarks, profiling, diagramas, CI, logs, screenshots técnicas, comportamento reproduzível.
- **Resultado:** Separar sempre:
  - Resultado técnico;
  - Resultado para o usuário;
  - Resultado de engenharia.
- **Trade-offs e próximos passos:** O que ainda pode evoluir?

---

## 9. Sprint 0 — Roadmap Cleanup & Baseline

**Objetivo:** eliminar contradições internas e estabelecer uma única fonte de verdade.

### Tarefas
- [x] Remover duplicações do roadmap anterior.
- [x] Remover tarefas marcadas como concluídas que ainda aparecem em “próximos passos”.
- [x] Consolidar status de cada sprint.
- [x] Registrar data do baseline atual.
- [ ] Confirmar stack pública de cada projeto.
- [ ] Confirmar números atualmente publicados.
- [x] Rodar pipeline local completo (2026-10-10: lint, TypeScript, 8/8 testes unitários, build de 14 páginas e 6/6 fluxos E2E aprovados).

### Pipeline
```bash
npm run lint
npx tsc --noEmit
npm run test
npm run build
npm run test:e2e
```

### Critérios de aceite
- Roadmap não possui contradições.
- Todos os estados refletem o repositório atual.
- Pipeline executado e registrado.
- Nenhuma métrica pública sem origem rastreável.

---

## 10. Sprint 1 — Performance P0: LCP

**Objetivo:** reduzir o principal gargalo de performance antes de adicionar novos efeitos visuais.

### Baseline & Evolução
- **Baseline Original:** Performance: 75 | LCP: 8.6 s | CLS: 0.008 | TBT: 50 ms
- **Sprint 1 Final (Evidence: `docs/evidence/portfolio-nexus/lighthouse-sprint1-final.report.json`):**
  - **Métricas Reais Observadas no Browser:** LCP Real: **1.20 s** | FCP Real: **1.20 s** | Speed Index: **1.23 s** | CLS: **0.000** | TBT: **80 ms** | Load: **243 ms**
  - **Auditoria de Conformidade:** Accessibility: **100** | SEO: **100** | Best Practices: **96** | Agentic Browsing: **100**

### Etapa 1 — Identificar o LCP real
- [x] Registrar qual elemento é o LCP (`h1#home-hero-title` e subtítulo `p.text-sm` do Hero);
- [x] Registrar resource timing;
- [x] Mapear causa raiz de re-renderização pós-hidratação (script `localeInitializer` no `<head>` provocava troca assíncrona de idioma e repintura do DOM).

### Etapa 2 — Investigar cadeia crítica
- [x] Auditar árvore de renderização do `AppRuntime.tsx` (eliminada desmontagem global da página por alternância de wrappers);
- [x] Auditar animações CSS do Hero (eliminada propriedade inline `style={{ opacity: 0 }}` que ocultava o LCP na pintura inicial);
- [x] Auditar dependências cruzadas da Home com os cases de estudo no `registry.ts`;
- [x] Auditar peso de imagens nos cards dos projetos (`english-tutor-screen.webp` possuía 229 KB).

### Etapa 3 — Corrigir
- [x] Separar metadados leves dos cards (`features/projects/projects-meta.ts`) desacoplando a Home dos módulos de carregamento dos 4 cases;
- [x] Otimizar imagens dos cards para miniaturas WebP de alta fidelidade (English Tutor: 229 KB -> 21.4 KB, Music Player: 80 KB -> 28.5 KB);
- [x] Manter seções secundárias (`About`, `Stack`, `Terminal`, `Contact`) carregadas sob demanda;
- [x] Preservar textos do Hero e font-display swap garantindo pintura imediata no primeiro frame.

### Etapa 4 — Medir novamente
- [x] Comparativo registrado e arquivado em `docs/evidence/portfolio-nexus/lighthouse-sprint1-final.report.json`;
- [x] Pipeline local completo executado com sucesso (Lint 0 erros, TypeScript 0 erros, Vitest 8/8, Playwright E2E 3/3).

### Metas
- **Meta inicial:** Performance >= 90 (mobile), Accessibility >= 95, Best Practices >= 95, SEO >= 95, LCP substancialmente menor.
- **Meta aspiracional:** Performance >= 95 em cenário controlado e reproduzível (não perseguir 100 como KPI isolado).

---

## 11. Sprint 2 — Engineering Evidence

**Objetivo:** transformar afirmações em provas técnicas rastreáveis.

### Estrutura
```text
docs/
└── evidence/
    ├── portfolio-nexus/
    ├── music-player/
    ├── saas-data-control/
    └── english-tutor/
```

### Arquivos mínimos por projeto
- `README.md`
- `claims.md`
- `architecture.md`
- `trade-offs.md`
- `tests.md`
- `performance.md`

### Portfolio Nexus
- [x] Lint, TypeScript, Vitest e E2E registrados (`tests.md` e `validation.md`).
- [x] Lighthouse baseline e medição final pós-LCP registrados (`lighthouse.md`).
- [x] LCP corrigido de 8.6s para 1.20s real com nova auditoria arquivada.
- [x] Build output e 14 rotas estáticas atuais registrados (`static-export.md`).
- [x] Accessibility audit registrada com 100/100 (`accessibility.md`).
- [x] Criados `architecture.md` e `trade-offs.md`.

### Music Player
- [x] Plano de lifecycle e performance criados (`lifecycle-tests.md` e `performance.md`).
- [x] Documentada prevenção de chamadas pós-dispose e cancelamento de streams (`tests.md`).
- [x] Claims de gapless e bit-perfect rebaixados para condicionados à plataforma e hardware (`trade-offs.md` e `claims.md`).
- [x] Criados `architecture.md`, `trade-offs.md` e `tests.md`.

### SaaS Data Control / Task Manager Pro
- [x] Matriz de segurança e plano de CI criados (`security-tests.md` e `ci-evidence.md`).
- [x] Padrão de testes negativos de acesso cruzado (IDOR) e isolamento de tenant documentados (`tests.md` e `data-isolation.md`).
- [x] Arquitetura de sessão segura com rotação de Refresh Token documentada (`architecture.md`).
- [x] Criados `architecture.md`, `trade-offs.md`, `tests.md` e `performance.md`.

### English Tutor
- [x] Matriz Teacher Brain criada, modelo de privacidade e performance registrados (`privacy-model.md` e `performance.md`).
- [x] Arquitetura determinística "Rules Before Generation" documentada (`architecture.md`).
- [x] Mitigação de alucinações via regras e isolamento de dados Zero-Egress documentados (`trade-offs.md` e `tests.md`).
- [x] Criados `architecture.md`, `trade-offs.md` e `tests.md`.

### Critérios de aceite
- [x] Cada projeto possui conjunto completo de 6 arquivos mínimos de evidência (`README.md`, `claims.md`, `architecture.md`, `trade-offs.md`, `tests.md`, `performance.md`).
- [x] Toda métrica pública é rastreável a artefatos e testes.
- [x] Claims não comprovados formalmente rebaixados para Observed, Designed ou Target.
- [x] Nenhum case depende de linguagem promocional vaga.

---

## 12. Sprint 3 — Hiring / Conversion UX

**Objetivo:** transformar qualidade técnica em clareza imediata de contratação.

**Status:** Concluída em 2026-10-10.

### 12.1 Hero
O visitante deve entender nos primeiros 5 segundos:
- Quem é Vanderlei Vidor;
- Qual é sua função profissional (Full Stack / Product Engineer);
- O que ele constrói;
- Como acessar os projetos;
- Como entrar em contato.

#### Estrutura recomendada
```text
VANDERLEI VIDOR
Full Stack / Product Engineer

Product. Engineering. Experience.
[Explore Case Studies]  [Contact Me]
```

#### Tarefas
- [x] Nome e função visíveis na primeira viewport sem necessidade de scroll.
- [x] CTA principal destacado para projetos.
- [x] CTA secundário direto para contato.
- [x] Links para Resume, GitHub e LinkedIn visíveis e acessíveis (não apenas no footer).
- [x] Availability apresentada de forma objetiva.

### 12.2 Navegação
Navegação principal padronizada:
- `Projects`
- `Process`
- `About`
- `Resume`
- `Contact`

### 12.3 Resume
- [x] Resume em PDF atualizado em inglês, com versões adicionais em português e espanhol.
- [x] Preview e download funcionais, acessíveis e adaptados ao idioma ativo.
- [x] Stack, cargo e títulos alinhados aos cases publicados.

### 12.4 Contact
- [x] Hub de contato client-side gera `mailto:` preenchido a partir de nome, assunto e mensagem.
- [x] Cópia formatada para webmail possui feedback visual e estado acessível no botão.
- [x] A ausência de endpoint público elimina a superfície de abuso de uma API de envio; campos possuem labels e foco visível.
- [x] Fallback direto por link de email disponível no Hero e na página de contato.
- [x] Decisão de arquitetura registrada em `docs/adr/0002-zero-runtime-direct-contact-mailto-vs-api.md`.

### Critérios de aceite
- [x] Visitante compreende proposta de valor, nome e função em leitura rápida.
- [x] Projects e Contact acessíveis sem esforço de busca.
- [x] Resume, GitHub, LinkedIn e email acessíveis na primeira viewport.
- [x] Nenhuma animação ou overlay bloqueia CTAs.
- [x] Fluxos críticos de Contact e Resume cobertos em `e2e/core-journeys.spec.ts`.

### Validação de fechamento
- [x] `npm run lint` — sem erros.
- [x] `npx tsc --noEmit` — sem erros.
- [x] `npm run test` — 3 arquivos e 8/8 testes aprovados.
- [x] `npm run build` — build de produção aprovado com 14 páginas estáticas.
- [x] `npm run test:e2e` — 6/6 fluxos aprovados em Chromium.

---

## 13. Sprint 4 — Case Study Proof

**Objetivo:** tornar cada case convincente tanto para leitura rápida de recrutadores quanto para avaliação técnica profunda.

### Regra de leitura em 3 camadas
1. **20 segundos:** TL;DR no topo (Role, Stack, Challenge, Key Decision, Evidence, Result, Status).
2. **2 minutos:** Narrativa Problema → Decisão → Solução → Evidência → Resultado.
3. **10+ minutos:** Arquitetura detalhada, diagramas, trade-offs, segurança, testes e evidências reproduzíveis.

### Tarefas gerais
- [x] Implementar o bloco TL;DR padronizado no topo dos 4 cases (2026-10-10: Role, Stack, Challenge, Key Decision, Evidence, Result e Status validados via Playwright).
- [x] Adicionar diagramas de arquitetura quando aplicável (2026-10-10: fluxos padronizados de quatro etapas conectados às arquiteturas detalhadas já existentes).
- [x] Deixar trade-offs explícitos e próximos passos técnicos claros (2026-10-10: três decisões e três validações futuras por case, em EN/PT/ES).
- [x] Evitar blocos maciços de texto corrido (2026-10-10: conteúdo dividido em fluxo, cards de decisão e lista priorizada).

### Validação de fechamento

- [x] TL;DR conectado por âncora à prova técnica de cada case.
- [x] Claims não comprovados mantidos como metas de validação.
- [x] Revisão visual aprovada em desktop e mobile.
- [x] ESLint e TypeScript aprovados.
- [x] 8/8 testes unitários aprovados.
- [x] Build estático aprovado com 14 páginas.
- [x] 6/6 jornadas Playwright aprovadas no modo do GitHub Pages.

---

## 14. Sprint 5 — Motion & Premium UI Polish

**Objetivo:** aumentar o refinamento visual sem sacrificar performance, acessibilidade ou clareza.

### Regra de motion em 3 níveis
1. **Funcional:** hover, focus, active, feedback de clique.
2. **Orientação:** transições de página discretas, scroll progress, reveal sutil de seções.
3. **Storytelling:** hero e demonstrações específicas dentro dos cases.
> **Regra:** Motion decorativo sem função nunca é prioridade.

### 14.1 Design Tokens e Identidade Visual (Especificação Oficial)

A identidade visual é centralizada através de design tokens registrados em [`shared/design-system/tokens.ts`](file:///c:/Users/bibij/Portfolio%20Nexus/shared/design-system/tokens.ts) e [`styles/globals.css`](file:///c:/Users/bibij/Portfolio%20Nexus/styles/globals.css):

#### Paleta de Cores e Superfícies
- **Background Base:** `#0b0b0b` (Deep Obsidian / Dark mode puro com color-scheme dark).
- **Foreground Primário:** `#ededed` (Alto contraste para leitura confortável).
- **Foreground Secundário / Muted:** `#a1a1aa` (Zinc-400 para metadados e subtítulos).
- **Accent Primário:** Violet RGB `124, 58, 237` / `#7c3aed`.
- **Accent Glow:** `rgba(124, 58, 237, 0.5)` com dispersão suave de `20px`.
- **Superfície de Cards (`premium-card`):** Fundo `rgba(255, 255, 255, 0.035)`, borda sutil `rgba(255, 255, 255, 0.08)`, backdrop-filter `blur(18px)`.
- **Botão Primário (`premium-button--primary`):** Fundo sólido `#ffffff`, texto `#020617`, borda `rgba(255, 255, 255, 0.72)`.
- **Botão Secundário / Ghost:** Fundo `rgba(255, 255, 255, 0.045)`, texto `#e4e4e7`, borda `rgba(255, 255, 255, 0.14)`.

#### Tipografia
- **Font Sans Primária:** `Geist Sans` (`--font-geist-sans`), com fallback para `system-ui, sans-serif`.
- **Font Mono Técnica:** `Geist Mono` (`--font-geist-mono`), com fallback para `monospace`.
- **Escalas Fluidas:**
  - Hero Display: `clamp(3.5rem, 11vw, 8.5rem)`
  - Texto / Parágrafo: `clamp(1.1rem, 2vw, 1.45rem)`
  - Botão: `clamp(0.85rem, 1vw, 1rem)`
  - Legendas / XS: `clamp(0.75rem, 1vw, 0.85rem)`

#### Espaçamento e Layout Fluido
- Layout Container: `clamp(1.5rem, 6vw, 7.5rem)`
- Gaps de Seção: `clamp(1.5rem, 4vw, 3rem)` (sm) e `clamp(2.5rem, 6vw, 5.5rem)` (md)
- Padding de Botões: `clamp(1.75rem, 3vw, 3.2rem)` (horizontal) e `clamp(0.95rem, 2vw, 1.25rem)` (vertical)

### 14.2 Componentes e Interações
- **Project Cards:** Escalas agressivas eliminadas; easing cúbico suave `[0.22, 1, 0.36, 1]`; elevação sutil; comportamento touch limpo sem jank.
- **Botões e Links:** Reutilização das classes `.premium-button`, `.premium-card` e `.premium-link`; feedback consistente para mouse, teclado e touch.
- **Page Transitions:**

```typescript
export const transition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: {
    duration: 0.32,
    ease: [0.22, 1, 0.36, 1],
  },
};

export const reducedTransition = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
  transition: { duration: 0 },
};
```

### Critérios de aceite
- Nenhuma animação é indispensável para a compreensão do conteúdo.
- `prefers-reduced-motion` respeitado por padrão.
- Zero layout shift (CLS) causado por motion.
- Sem travamentos ou jank perceptíveis em hardware intermediário e mobile.

---

## 15. Sprint 6 — QA, Accessibility, Responsive & i18n

**Objetivo:** garantir consistência entre dispositivos, idiomas e formas de navegação.

### 15.1 Accessibility
- Navegação completa por teclado com ordem de foco coerente e `focus-visible` visível.
- Contraste validado em conformidade WCAG AA+.
- Landmarks semânticos (`<header>`, `<main>`, `<nav>`, `<footer>`) e hierarquia lógica de headings.
- Suporte estrito a `prefers-reduced-motion`.
- **Regra para contadores:** nunca deixar leitores de tela ou crawlers enxergarem 0:

```tsx
<span className="sr-only">14</span>
<span aria-hidden="true">
  <AnimatedCounter from={0} to={14} />
</span>
```

### 15.2 Responsive
Testar rigorosamente nos breakpoints:
- `360 px` (Mobile compacto)
- `390 px` (Mobile moderno padrão)
- `430 px` (Mobile large)
- `768 px` (Tablet portrait)
- `1024 px` (Tablet landscape / Laptop compacto)
- `1280 px` e `1440 px` (Desktop padrão)
- `ultrawide` (Telas panorâmicas)

### 15.3 Cross-browser
Smoke test em Chrome, Edge, Firefox e Safari.

### 15.4 i18n
- Paridade completa entre **PT**, **EN** e **ES**.
- Zero strings hardcoded no código ou misturadas entre páginas.
- Metadata e OpenGraph gerados individualmente por idioma.
- Language switcher preserva a rota ativa sem perder o contexto.

---

## 16. Sprint 7 — Production Release Gate

**Objetivo:** somente publicar quando o produto estiver comprovadamente pronto e validado por pipeline automatizado.

### 16.1 Pipeline obrigatório (todos devem passar)
```bash
npm run lint
npx tsc --noEmit
npm run test
npm run build
npm run test:e2e
```

### 16.2 Performance
- Lighthouse rodado em build de produção local.
- LCP resolvido e medido em mobile.
- Efeitos visuais caros auditados sem regressão.

### 16.3 Conteúdo e Claims
- Nome e cargo profissional padronizados em todas as páginas.
- Títulos de projetos consistentes (ex: *SaaS Data Control / Task Manager Pro*).
- Zero placeholders ou claims absolutos não comprovados.
- Links externos testados e ativos.

### 16.4 SEO & Metadados
- Canonical, OpenGraph, Twitter Cards, Sitemap, Robots e Structured Data (JSON-LD) validados.
- Favicon e preview social testados.

---

## 17. Post-release validation

Após a publicação em produção:
1. Executar Lighthouse diretamente na URL de produção;
2. Validar entrega de formulário de contato e analytics sem impacto de performance;
3. Testar em dispositivos móveis reais (iOS e Android);
4. Confirmar preview em WhatsApp, Twitter/X e LinkedIn;
5. Registrar o baseline oficial da versão de release.

---

## 18. Arquitetura recomendada

```text
src/
├── app/
├── features/
│   └── projects/
│       ├── registry/
│       ├── cases/
│       ├── components/
│       └── types/
├── shared/
│   ├── components/
│   ├── design-system/
│   │   └── tokens.ts
│   ├── effects/
│   ├── hooks/
│   └── seo/
├── messages/
│   ├── pt.json
│   ├── en.json
│   └── es.json
└── docs/
    ├── CASE_STUDY.md
    ├── PROJECT_ORGANIZATION.md
    └── evidence/
```

### Regras arquiteturais
- Novo projeto deve ser registrado sem alterar a infraestrutura central.
- Cases devem consumir tipos compartilhados.
- Strings públicas devem vir do sistema de i18n.
- Tokens visuais devem ser centralizados em `shared/design-system/` e consumidos pelos componentes.
- Motion deve respeitar `reduced-motion` por construção.
- Todo efeito com side effect deve ter cleanup correspondente.

---

## 19. Lifecycle e side effects

Todo efeito iniciado deve possuir cleanup correspondente para evitar memory leaks:

```text
MOUNT
  ↓
START EFFECT (GSAP, listeners, timers, RAF, observers)
  ↓
ROUTE CHANGE / UNMOUNT
  ↓
CLEANUP (kill, removeEventListener, disconnect, cancel)
```

Nenhum efeito visual ou listener deve continuar executando após o componente deixar a tela.

---

## 20. Definition of Done global

Uma alteração só é considerada pronta quando:
- Funciona conforme especificado e possui tipagem válida TypeScript;
- Não introduz erro de lint e não quebra o build;
- Testes unitários e fluxos E2E passam;
- Não degrada acessibilidade e performance;
- Conteúdo PT/EN/ES permanece 100% sincronizado;
- Claims novos possuem classificação formal de evidência;
- Animações respeitam `prefers-reduced-motion`;
- Componentes possuem cleanup de lifecycle;
- Mobile e CTA principal continuam acessíveis e responsivos.

---

## 21. Release blocker checklist

O release **NÃO** deve ser considerado final se houver:
- Erro de build ou de runtime em fluxos principais;
- Link profissional ou formulário de contato quebrado;
- CTA principal ausente na primeira dobra;
- Claim público sem evidência técnica;
- Regressão crítica no mobile;
- Navegação por teclado quebrada ou problema severo de contraste;
- LCP degradado;
- Strings misturadas entre idiomas ou metadata inconsistente.

---

## 22. Métricas que realmente importam

Não otimizar apenas para scores sintéticos. Acompanhar métricas reais:

### Performance
- LCP, CLS, INP e TBT;
- Tamanho de JS inicial e imagens críticas;
- Custo de hidratação e responsividade de transição de rota.

### Produto
- Clareza do hero (identificação em até 5 segundos);
- Tempo até o visitante chegar aos projetos e ao formulário de contato;
- Retenção na leitura do TL;DR;
- Consistência de navegação entre os cases.

### Engenharia
- Build limpo;
- Testes unitários e E2E verdes;
- Pipeline de CI confiável;
- Evidências técnicas verificadas.

---

## 23. Regra de complexidade

Antes de adicionar qualquer biblioteca, shader, animação ou abstração nova, responder:

1. Resolve um problema real?
2. Melhora a percepção do usuário?
3. Pode ser medido?
4. Tem fallback funcional?
5. É acessível?
6. Afeta o bundle size?
7. Afeta a main thread?
8. Possui cleanup completo?
9. Vale o custo contínuo de manutenção?
10. É mais importante que algum P0 ou P1 atualmente aberto?

> Se a resposta não justificar a complexidade, **não adicionar**.

---

## 24. Próxima sequência prática

### Fase ativa
1. **Polish Final & Design Tokens (Sprint 5):** aplicar refinamento visual seguro sobre a base rápida.
2. **QA, Accessibility, Responsive & i18n (Sprint 6):** validar dispositivos, idiomas, teclado e browsers.
3. **Production Release Gate (Sprint 7):** executar e registrar o checklist completo antes do deploy final.

### Pendência documental paralela
- Fechar os dois itens ainda abertos da Sprint 0: confirmar stack pública e confirmar números publicados.

---

## 25. Resultado esperado

Ao final da execução deste roadmap, o Portfolio Nexus demonstrará:

- Capacidade de projetar arquiteturas modulares e escaláveis;
- Explicação madura de decisões de engenharia e trade-offs;
- Implementação rigorosa de lifecycle e cleanup de memória;
- Comunicação técnica transparente sem claims exagerados;
- Performance medida e comprovada antes de ser divulgada;
- Interfaces visualmente premium e contemporâneas sem sacrificar velocidade;
- Acessibilidade e suporte internacional completo (PT/EN/ES);
- Evidências rastreáveis para cada projeto do portfólio;
- Comunicação clara e de alto impacto para recrutadores, clientes e líderes técnicos.

> **O objetivo final não é parecer complexo.**
> É parecer: **confiável, intencional, tecnicamente maduro e pronto para ser avaliado profissionalmente.**
