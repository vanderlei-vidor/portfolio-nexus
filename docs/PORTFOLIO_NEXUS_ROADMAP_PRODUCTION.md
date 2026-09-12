# Portfolio Nexus — Production-Grade Roadmap

> **Objetivo interno:** elevar o Portfolio Nexus a um padrão de execução comparável a produtos digitais de alto nível, com foco em engenharia, clareza narrativa, acessibilidade, performance e confiabilidade técnica.
>
> **Regra principal:** nenhuma afirmação pública deve exceder o que pode ser demonstrado por código, teste, profiling, benchmark, documentação ou comportamento observável do produto.

---

## 1. Princípios do projeto

O Portfolio Nexus não deve ser tratado apenas como uma vitrine visual. Ele deve funcionar como uma demonstração prática de capacidade de engenharia, produto e comunicação técnica.

A experiência final deve transmitir cinco qualidades:

1. **Clareza:** o visitante entende rapidamente o problema, a decisão técnica e o resultado de cada projeto.
2. **Credibilidade:** métricas, claims e descrições são tecnicamente defensáveis.
3. **Consistência:** design, motion, i18n e arquitetura seguem padrões unificados.
4. **Performance:** efeitos visuais nunca comprometem responsividade, estabilidade ou acessibilidade.
5. **Evidência:** toda afirmação importante possui um mecanismo de comprovação.

> O termo **AAA** pode continuar sendo usado internamente como meta de qualidade, mas não deve aparecer como autoavaliação pública do portfólio.

---

## 2. Estrutura narrativa oficial dos cases

Todos os estudos de caso devem seguir a mesma arquitetura narrativa:

### Problema

- Qual era o problema real?
- Por que ele é tecnicamente relevante?
- Que limitações existiam?

### Decisão de engenharia

- Qual decisão principal foi tomada?
- Quais alternativas foram consideradas?
- Que trade-offs existiram?

### Solução

- Como a arquitetura foi organizada?
- Quais tecnologias foram usadas e por quê?
- Quais mecanismos de segurança, desempenho ou confiabilidade foram aplicados?

### Evidência

- Testes automatizados.
- Benchmarks.
- Profiling.
- Screenshots técnicos.
- Diagramas de arquitetura.
- Logs ou métricas reproduzíveis.
- Comportamento verificável no produto.

### Resultado

Separar sempre:

- **Resultado técnico:** melhoria mensurável na implementação.
- **Resultado para o usuário:** benefício percebido na experiência.
- **Resultado de engenharia:** redução de risco, aumento de manutenibilidade ou ganho arquitetural.

---

## 3. Política de confiabilidade de claims

Nenhum claim deve ser publicado como fato sem evidência correspondente.

### Classificação obrigatória

| Estado | Significado | Pode aparecer como fato público? |
|---|---|---:|
| **Verified** | Comprovado por teste, benchmark, profiling ou documentação verificável | Sim |
| **Observed** | Comportamento observado, mas sem benchmark formal | Sim, com linguagem moderada |
| **Designed** | Capacidade prevista pela arquitetura, mas ainda não validada integralmente | Somente como capacidade planejada/preparada |
| **Target** | Meta de qualidade ou performance | Não como resultado já alcançado |

### Linguagem recomendada

Evitar:

- “zero bugs”
- “zero alucinações”
- “privacidade absoluta”
- “zero distorção”
- “120 FPS” sem profiling
- “cold start < 1.8s” sem benchmark reproduzível
- “100% seguro”

Preferir:

- “arquitetura projetada para...”
- “validado por...”
- “mitiga...”
- “reduz a dependência de...”
- “mantém isolamento de...”
- “perfilado em...”
- “meta de...”

---

## 4. Narrativa técnica revisada dos projetos

### 4.1 Music Player Premium

**Domínio e stack**  
Flutter, Dart, SQLite e integrações nativas de áudio.

**Problema**  
Players locais podem ocultar detalhes importantes do pipeline de áudio, incluindo resampling, roteamento incorreto e comportamento inconsistente com DACs externos.

**Decisão de engenharia**  
Priorizar uma arquitetura **local-first**, com controle explícito do pipeline de reprodução e tratamento cuidadoso do ciclo de vida assíncrono.

**Solução**

- Reprodução local-first.
- Arquitetura preparada para fluxo de áudio de alta fidelidade.
- Suporte a reprodução gapless quando suportado pelo pipeline utilizado.
- Detecção e integração com dispositivos de áudio externos conforme capacidades da plataforma.
- Cancelamento e descarte seguro de listeners, streams e callbacks assíncronos.

**Evidência necessária antes de publicar claims de performance**

- Profiling de frame rendering.
- Benchmark documentado de cold start.
- Verificação do comportamento com DAC USB.
- Testes de lifecycle cobrindo callbacks após `dispose`.
- Teste ou documentação específica antes de usar o termo `bit-perfect` como resultado garantido.

**Resultado público recomendado**  
Player de áudio local-first com foco em alta fidelidade, reprodução contínua, integração com hardware externo e arquitetura resiliente a problemas de lifecycle.

---

### 4.2 SaaS Data Control / Task Manager Pro

**Domínio e stack**  
Java 17, Spring Boot 3.4, PostgreSQL, Vite, SASS, Docker e Testcontainers.

**Problema**  
Aplicações CRUD multiusuário podem sofrer vazamento horizontal de dados quando a autorização é tratada apenas na camada de interface ou por identificadores previsíveis.

**Decisão de engenharia**  
Aplicar isolamento de dados por usuário/tenant diretamente na camada de acesso a dados e cobrir fluxos críticos com testes de integração usando banco real.

**Solução**

- Consultas com escopo de usuário/tenant, como `findByIdAndUsuarioId`.
- Mitigação de IDOR por autorização contextual no backend.
- Rotação de refresh tokens.
- Expurgo programado de tokens expirados.
- Geração modular de relatórios.
- Testes com PostgreSQL real via Testcontainers.

**Evidência recomendada**

- Contagem real e atualizada de testes no pipeline.
- Relatório de cobertura dos serviços críticos.
- Testes negativos demonstrando bloqueio de acesso cruzado entre usuários/tenants.
- Execução CI reproduzível com Testcontainers.

**Resultado público recomendado**  
Plataforma SaaS com isolamento de dados aplicado no backend, autenticação com rotação de tokens e testes de integração sobre PostgreSQL real.

> Se os “104 testes automatizados” e a “cobertura de 100% dos serviços críticos” estiverem comprovados no CI, esses números podem ser exibidos como **Verified Evidence**.

---

### 4.3 English Tutor / AI Polyglot Tutor

**Domínio e stack**  
Flutter, FastAPI, Python 3.11, PostgreSQL, LM Studio e Qwen 2.5 local.

**Problema**  
Chatbots genéricos podem produzir respostas linguisticamente plausíveis sem seguir uma estratégia pedagógica consistente.

**Decisão de engenharia**  
Separar a decisão pedagógica da geração textual: regras e progressão são determinadas por uma camada autoritativa antes da resposta do modelo.

**Solução**

- `Teacher Brain` determinístico para decisões pedagógicas.
- `Pedagogical Card` com tradução e explicação comparativa.
- Persistência de progresso e nível CEFR.
- Execução local do modelo quando configurada dessa forma.
- Suporte multilíngue conforme idiomas efetivamente implementados.
- Interface de voz com feedback visual quando disponível.

**Claims a evitar**

- “sem alucinações gramaticais”
- “privacidade absoluta”

**Resultado público recomendado**  
Tutor de idiomas com arquitetura híbrida que reduz a dependência do LLM para decisões pedagógicas, mantendo regras, progressão e contexto sob controle da aplicação.

**Evidência recomendada**

- Testes do `Teacher Brain`.
- Casos de validação pedagógica.
- Fluxo documentado de dados enviados ou não enviados ao modelo.
- Matriz real de idiomas suportados.

---

### 4.4 Portfolio Nexus

**Domínio e stack**  
Next.js 16, React 19, TypeScript, Tailwind CSS v4, GSAP, Lenis e integrações 3D quando necessárias.

**Problema**  
Portfólios técnicos frequentemente apresentam projetos como cards isolados, sem narrativa, consistência arquitetural ou evidência de decisões de engenharia.

**Decisão de engenharia**  
Construir uma plataforma unificada de cases, com registro modular de projetos, i18n, SSG e motion controlado por acessibilidade.

**Solução**

- Registro modular de projetos.
- Conteúdo estruturado por case.
- i18n em PT, EN e ES.
- Geração estática quando compatível com a rota.
- Transições de página discretas.
- Suporte a `prefers-reduced-motion`.
- Design system unificado.

**Resultado público recomendado**  
Ecossistema de estudos de caso com arquitetura modular, conteúdo multilíngue, geração estática e motion acessível.

> Quantidades como “14/14 páginas estáticas” devem ser exibidas somente se confirmadas pelo build atual.

---

## 5. Roadmap de execução

## Sprint 1 — Higiene técnica e confiabilidade estrutural

**Objetivo:** eliminar inconsistências arquiteturais e bugs que comprometem a percepção de qualidade.

### Tarefas

- [x] Corrigir metadados e OpenGraph para linguagem consistente.
- [x] Remover importações hardcoded de cases no `ProjectDetailPage.tsx`.
- [x] Resolver carregamento através de `projectsRegistry`.
- [x] Garantir fallback para projeto inexistente.
- [x] Revisar `focus-visible` usando tokens do design system.
- [x] Revisar contraste de `::selection`.
- [x] Padronizar comportamento de botões e links interativos.
- [x] Garantir que lifecycle de animações/listeners seja corretamente finalizado.

### Critérios de aceite

- [x] Nenhuma rota de projeto depende de import manual específico.
- [x] Nenhum texto de metadata mistura idiomas.
- [x] Navegação por teclado possui foco visível consistente.
- [x] `npm run lint` sem erros.
- [x] `npx tsc --noEmit` sem erros.

---

## Sprint 2 — Cases e conteúdo técnico

**Objetivo:** transformar cada projeto em uma narrativa de engenharia confiável.

### Tarefas

- [x] Reescrever `cardDescription` e `description` em PT/EN/ES.
- [ ] Migrar todos os cases para o formato:
  - [x] Portfolio Nexus
  - [x] Music Player
  - [x] SaaS Data Control
  - [x] English Tutor
  - Problema
  - Decisão de engenharia
  - Solução
  - Evidência
  - Resultado
- [x] Remover claims absolutos ou não verificáveis.
- [x] Criar documentação padrão para novos cases.
- [x] Documentar convenções do `projectsRegistry`.

### Critérios de aceite

- [x] Todo claim técnico importante está classificado como `Verified`, `Observed`, `Designed` ou `Target`.
- [x] Nenhum número aparece como resultado sem fonte verificável.
- [x] Conteúdo PT/EN/ES possui equivalência semântica.
- [x] Não existem placeholders genéricos em produção.

---

## Sprint 2.5 — Engineering Evidence

**Objetivo:** transformar afirmações em provas técnicas.

### Criar para cada projeto

- [ ] `docs/evidence/<project>/README.md`
  - [x] Portfolio Nexus
- [ ] Evidências de testes.
  - [x] Portfolio Nexus: lint, TypeScript, Vitest e E2E registrados.
- [ ] Evidências de performance quando houver claim de performance.
  - [x] Portfolio Nexus: Lighthouse local registrado.
  - [ ] Portfolio Nexus: corrigir LCP e repetir Lighthouse para meta de Performance.
- [ ] Diagrama arquitetural simples.
- [ ] Lista de decisões e trade-offs.
- [ ] Lista de claims aprovados para publicação.
  - [x] Portfolio Nexus

### Estrutura sugerida

```text
docs/
└── evidence/
    ├── music-player/
    │   ├── README.md
    │   ├── performance.md
    │   └── lifecycle-tests.md
    ├── saas-data-control/
    │   ├── README.md
    │   ├── security-tests.md
    │   └── ci-evidence.md
    ├── english-tutor/
    │   ├── README.md
    │   ├── teacher-brain-tests.md
    │   └── privacy-model.md
    └── portfolio-nexus/
        ├── README.md
        ├── lighthouse.md
        └── accessibility.md
```

### Critérios de aceite

- [ ] Cada projeto possui pelo menos uma evidência verificável ligada ao principal diferencial técnico.
- [ ] Métricas públicas podem ser reproduzidas ou rastreadas.
- [ ] Claims não comprovados foram convertidos em linguagem de arquitetura ou metas.

---

## Sprint 3 — Microinterações e design premium

**Objetivo:** aumentar percepção de refinamento sem sacrificar performance.

### Regra de motion

Motion deve seguir três níveis:

1. **Funcional:** hover, focus, active, feedback de navegação.
2. **Orientação:** progress bar, page transition, reveals discretos.
3. **Storytelling:** hero e momentos específicos de destaque.

Não usar animação como decoração indiscriminada.

### Project Cards

- [x] Reduzir escalas agressivas (`scale-110` → aproximadamente `scale-105`).
- [ ] Utilizar easing consistente (`cubic-bezier(0.22, 1, 0.36, 1)`).
- [ ] Aplicar elevação e borda sutil no hover.
- [ ] CTA com deslocamento discreto, sem cadeia excessiva de animações.

### Botões e links

- [ ] Centralizar comportamento interativo em componentes compartilhados.
- [ ] Evitar conflito entre CSS `:active` e Framer Motion.
- [ ] Usar `scale(0.98)` apenas quando não gerar layout shift ou conflito de transformação.

### Case studies

- [ ] Adicionar progress bar discreta para leitura longa.
- [ ] Garantir que a barra não afete acessibilidade ou CLS.

### Hero

- [x] Preferir `transform` + `opacity`.
- [ ] Evitar blur animado durante scroll por padrão.
- [ ] Usar blur somente se profiling confirmar custo aceitável em dispositivos reais.

### Critérios de aceite

- [ ] Nenhuma animação é necessária para compreender o conteúdo.
- [ ] `prefers-reduced-motion` desativa ou simplifica motion não essencial.
- [ ] Nenhum efeito gera layout shift perceptível.
- [ ] Interações permanecem responsivas em hardware intermediário.

---

## Sprint 4 — Transições, performance e homologação

**Objetivo:** finalizar navegação, qualidade de produção e validação automatizada.

### Page transition recomendada

Preferir uma transição curta de `opacity + translate`, evitando blur como padrão global.

```tsx
const transition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: {
    duration: 0.32,
    ease: [0.22, 1, 0.36, 1],
  },
};
```

Para `prefers-reduced-motion`:

```tsx
const reducedTransition = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
  transition: { duration: 0 },
};
```

### Scroll de rota

- [ ] Restaurar topo após mudança de rota quando semanticamente adequado.
- [ ] Sincronizar comportamento com Lenis.
- [ ] Não quebrar navegação por histórico ou âncoras.

### Pipeline de validação

```bash
npm run lint
npx tsc --noEmit
npm run test
npm run build
npm run test:e2e
```

### Lighthouse

Lighthouse deve ser tratado como **gate de qualidade**, não como marketing isolado.

Meta inicial:

- Performance: >= 90 mobile
- Accessibility: >= 95
- Best Practices: >= 95
- SEO: >= 95

Execução registrada em 2026-09-12 para `http://127.0.0.1:3022/portfolio-aaa/`:

- Performance: 75
- Accessibility: 96
- Best Practices: 96
- SEO: 100
- LCP: 8.6 s
- CLS: 0.008
- TBT: 50 ms

Leitura: Accessibility, Best Practices e SEO já atingiram a meta inicial nesta medição local. Performance ainda não atingiu a meta por causa do LCP e deve ser tratada como follow-up técnico, não como claim público.

Meta aspiracional:

- Performance >= 95 em cenários controlados e reproduzíveis.

> Não bloquear release por diferenças marginais entre execuções sem investigar variabilidade de ambiente.


### English Tutor: performance percebida na abertura

- [x] Medir o tempo de entrada da rota `/projects/english-tutor` em build de produção.
- [x] Auditar custo inicial de GSAP, ScrollTrigger, slideshow, imagens e efeitos visuais do case.
- [x] Identificar se o engasgo vem de JavaScript inicial, hidratação, imagem pesada, animação de entrada ou transição global.
- [x] Aplicar lazy loading/dynamic import nas seções abaixo da primeira dobra quando fizer sentido.
- [x] Reduzir ou adiar animações não essenciais no carregamento inicial.
- [x] Garantir versão simplificada para `prefers-reduced-motion`.
- [ ] Comparar antes/depois com Playwright trace, Lighthouse ou profiling do Chrome DevTools.
**Nota de medição inicial:** após adiar as seções abaixo da primeira dobra, a rota `/projects/english-tutor` manteve o hero visível rapidamente e reduziu a carga inicial observada aos 300ms de aproximadamente 409 nós de DOM / 41 scripts para 142 nós de DOM / 32 scripts. As seções completas continuam carregando depois do idle do navegador.

### Critérios de aceite específicos

- [x] A navegação até o English Tutor não apresenta travamento perceptível antes da primeira renderização útil.
- [x] A primeira dobra carrega antes das seções pesadas serem inicializadas.
- [x] Nenhuma animação abaixo da dobra executa antes de ser necessária.
- [ ] O case mantém impacto visual sem prejudicar responsividade.

---

## 6. Arquitetura de componentes recomendada

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
│   ├── effects/
│   ├── hooks/
│   └── design-system/
├── messages/
│   ├── pt.json
│   ├── en.json
│   └── es.json
└── docs/
    ├── CASE_STUDY.md
    ├── PROJECT_ORGANIZATION.md
    └── evidence/
```

### Regras

- Um novo projeto deve ser registrado sem alterar a infraestrutura central.
- Cases devem consumir tipos compartilhados.
- Strings públicas devem vir do sistema de i18n.
- Componentes de motion devem respeitar reduced motion por construção.
- Tokens visuais devem ser centralizados.

---

## 7. Template oficial de case

```md
# Nome do projeto

## Contexto
Breve descrição do produto e do cenário.

## Problema
Qual problema real precisava ser resolvido?

## Restrições
Quais limitações técnicas, de plataforma, prazo ou arquitetura existiam?

## Decisão de engenharia
Qual foi a decisão principal e por quê?

## Alternativas consideradas
- Alternativa A
- Alternativa B

## Solução
Como o sistema foi implementado?

## Arquitetura
Diagrama e explicação resumida.

## Evidências
- Testes
- Benchmarks
- Profiling
- Segurança
- CI/CD

## Resultado técnico
O que melhorou tecnicamente?

## Resultado para o usuário
Qual benefício surgiu para quem usa o produto?

## Trade-offs e próximos passos
O que ainda pode evoluir?
```

---

## 8. Definition of Done global

Uma alteração só é considerada pronta quando:

- [ ] Funciona conforme especificado.
- [ ] Possui tipagem válida.
- [ ] Não introduz erro de lint.
- [ ] Não quebra build.
- [ ] Testes relevantes passam.
- [ ] Fluxo crítico possui cobertura E2E quando aplicável.
- [ ] Não degrada acessibilidade.
- [ ] Não degrada performance de forma significativa.
- [ ] Conteúdo público está sincronizado em PT/EN/ES.
- [ ] Claims novos possuem classificação de evidência.
- [ ] Motion respeita `prefers-reduced-motion`.
- [ ] Nenhuma métrica é publicada sem validação correspondente.

---

## 9. Critérios de aceite para release de produção

### Conteúdo

- [ ] 100% dos textos representam capacidades reais.
- [ ] Não existem claims absolutos sem prova.
- [ ] Problema, decisão, solução, evidência e resultado estão claros em todos os cases.

### i18n

- [ ] PT, EN e ES possuem paridade de conteúdo.
- [ ] Não existem strings misturadas.
- [ ] Termos técnicos mantêm significado equivalente entre idiomas.

### Acessibilidade

- [ ] Navegação completa por teclado.
- [ ] `focus-visible` consistente.
- [ ] Contraste adequado.
- [ ] `prefers-reduced-motion` respeitado em toda a aplicação.

### Performance

- [ ] Sem layout shifts perceptíveis introduzidos por motion.
- [ ] Imagens otimizadas.
- [ ] Efeitos caros auditados.
- [x] Lighthouse executado em build de produção.

### Qualidade

- [ ] `npm run lint`
- [ ] `npx tsc --noEmit`
- [ ] `npm run test`
- [ ] `npm run build`
- [ ] `npm run test:e2e`

### Evidência

- [ ] Todo número publicado tem fonte interna rastreável.
- [ ] Todo claim de segurança possui teste ou documentação correspondente.
- [ ] Todo claim de performance possui benchmark/profiling correspondente.

---

---

## 10. Plano de ação atual

Este plano reflete o estado real após as correções de arquitetura, narrativa, contato, performance inicial do English Tutor e acessibilidade/motion.

### Estado atual por sprint

| Sprint | Estado | Leitura prática |
|---|---|---|
| Sprint 1 — Higiene técnica | Fechado | Arquitetura, metadata, registry, fallback, foco, seleção, interações e lifecycle foram revisados e validados. |
| Sprint 2 — Conteúdo técnico | Fechado | Os quatro cases visíveis foram migrados para a estrutura narrativa oficial, com claims moderados e documentação de apoio. |
| Sprint 2.5 — Engineering Evidence | Iniciado | A camada `docs/evidence/portfolio-nexus/` foi criada com validação, static export, acessibilidade, claims e Lighthouse local registrado. |
| Sprint 3 — Microinterações | Parcialmente iniciado | Hover agressivo e reduced motion já foram tratados em pontos críticos. Falta consolidar padrões de botões/links e leitura longa. |
| Sprint 4 — Performance/homologação | Parcialmente iniciado | English Tutor já recebeu defer/lazy loading e medição inicial. Lighthouse local foi registrado; falta profiling formal e correção do LCP. |

### Próxima sequência recomendada

1. **Fechar Sprint 1**
   - Padronizar comportamento de botões e links interativos.
   - Revisar lifecycle dos principais efeitos GSAP, timers, listeners e RAFs.
   - Garantir que todo efeito iniciado tenha cleanup explícito.

2. **Sprint 2 fechada**
   - Ajustar cada case para seguir claramente: Problema, Decisão de engenharia, Solução, Evidência e Resultado.
   - Criar `docs/CASE_STUDY.md` como template oficial.
   - Criar `docs/PROJECT_ORGANIZATION.md` documentando o `projectsRegistry`, slugs, i18n e estrutura de cases.
   - Classificar claims principais como `Verified`, `Observed`, `Designed` ou `Target`.

3. **Preparar Sprint 2.5**
   - Criar a estrutura `docs/evidence/` para os quatro projetos.
   - Para cada projeto, registrar: resumo técnico, evidências disponíveis, evidências pendentes, decisões, trade-offs e claims permitidos.
   - Começar pelo Portfolio Nexus, porque já existem evidências locais: build, lint, TypeScript, testes unitários, E2E, SSG e medição do English Tutor.

4. **Retomar Sprint 3/4 com base em evidência**
   - Fazer profiling formal do English Tutor com Playwright trace ou Chrome DevTools.
   - Usar o Lighthouse já registrado como baseline e corrigir LCP antes de publicar claim de performance.
   - Ajustar animações restantes somente onde houver custo perceptível ou risco de acessibilidade.

### Critério para avançar para evidências

Antes de iniciar documentação profunda de evidências, o projeto deve ter:

- [x] Sprint 1 sem pendências críticas de arquitetura, foco ou lifecycle.
- [x] Sprint 2 com todos os cases seguindo a estrutura narrativa oficial.
- [ ] Pipeline local passando: `npm run lint`, `npx tsc --noEmit`, `npm run test`, `npm run build`, `npm run test:e2e`.
- [x] Lista inicial de claims aprovada por projeto.

### Primeira tarefa recomendada agora

Fechar o item de maior retorno do Sprint 1: **revisar lifecycle de animações/listeners** nos efeitos compartilhados e cases principais. Isso reduz risco de travamento, memória acumulada e inconsistência entre navegações, especialmente nas páginas mais cinematográficas.

## 11. Ordem de implementação recomendada

1. Corrigir arquitetura e inconsistências.
2. Remover claims inseguros ou absolutos.
3. Reescrever narrativa dos cases.
4. Criar camada de evidência.
5. Sincronizar i18n.
6. Refinar microinterações.
7. Implementar transições globais discretas.
8. Executar testes, build, E2E e Lighthouse.
9. Publicar apenas métricas verificadas.

---

## 12. Resultado esperado

Ao final deste roadmap, o Portfolio Nexus deve demonstrar não apenas domínio visual, mas capacidade de:

- projetar arquiteturas modulares;
- explicar decisões e trade-offs;
- implementar segurança e lifecycle corretamente;
- medir performance antes de divulgá-la;
- validar comportamento com testes;
- construir experiências acessíveis;
- comunicar engenharia de forma clara para recrutadores e líderes técnicos.

O objetivo final não é parecer complexo. É parecer **confiável, intencional e tecnicamente maduro**.






