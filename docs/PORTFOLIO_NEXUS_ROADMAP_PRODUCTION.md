Portfolio Nexus — Production-Grade Roadmap v2.1

Objetivo interno: elevar o Portfolio Nexus a um padrão de execução comparável a produtos digitais de alto nível, com foco em engenharia, clareza narrativa, acessibilidade, performance, confiabilidade técnica e conversão profissional.

Regra principal: nenhuma afirmação pública deve exceder o que pode ser demonstrado por código, teste, profiling, benchmark, documentação ou comportamento observável do produto.

Regra de posicionamento: o termo AAA pode continuar sendo usado internamente como meta de qualidade, mas não deve aparecer como autoavaliação pública.

1. Norte do produto

O Portfolio Nexus não é apenas uma vitrine visual.

Ele deve funcionar como uma demonstração prática de capacidade em:

engenharia de software;

arquitetura;

produto;

performance;

acessibilidade;

comunicação técnica;

qualidade de entrega;

decisão baseada em evidência.

A experiência final deve transmitir seis qualidades:

Clareza — o visitante entende rapidamente quem é Vanderlei, o que ele constrói e por que cada projeto é relevante.

Credibilidade — claims, métricas e descrições são tecnicamente defensáveis.

Consistência — design, motion, i18n, arquitetura e narrativa seguem padrões unificados.

Performance — efeitos visuais nunca comprometem responsividade, estabilidade ou acessibilidade.

Evidência — afirmações importantes possuem mecanismo de comprovação.

Conversão — recrutadores, clientes e tech leads conseguem chegar rapidamente a Projects, Resume, GitHub, LinkedIn e Contact.

2. Estado atual consolidado

2.1 Baseline herdado do roadmap anterior

Área

Estado

Leitura

Higiene técnica

Fechada

Registry, fallback, metadata, foco, seleção, interações e lifecycle principal revisados

Narrativa dos cases

Fechada

Quatro cases migrados para Problem → Decision → Solution → Evidence → Result

Engineering Evidence

Em andamento

Estrutura criada; faltam provas reais em alguns projetos

Microinterações

Parcial

Padrões globais aplicados; falta fechamento de componentes internos

Performance / homologação

Parcial

English Tutor otimizado; Lighthouse baseline criado; LCP continua crítico

Hiring / conversion UX

Novo

Precisa virar uma frente formal do roadmap

Release production gate

Parcial

Pipeline definido, mas precisa fechar 100% antes do release final

2.2 Baseline de performance registrado

Medição local em build de produção:

Performance: 75

Accessibility: 96

Best Practices: 96

SEO: 100

LCP: 8.6 s

CLS: 0.008

TBT: 50 ms

Leitura

Accessibility, Best Practices e SEO já estão em bom nível.

CLS e TBT não indicam, neste baseline, um problema estrutural grave.

LCP é o principal gargalo técnico atual.

Nenhum claim público de “alta performance” deve ser usado até a nova medição comprovar melhora.

3. Ordem oficial de prioridade

A partir da versão 2.1, a execução deve seguir esta ordem:

Baseline e limpeza do roadmap

Performance P0 — LCP

Engineering Evidence

Hiring / Conversion UX

Case Study Proof

Motion e UI polish

QA, responsividade, acessibilidade e i18n

Release Gate

Publicação somente de métricas verificadas

Nenhuma nova tecnologia visual deve ser adicionada antes de fechar os itens P0 e P1.

4. Classificação de prioridade

P0 — bloqueia percepção de qualidade

LCP elevado.

Erro de build.

Erro de runtime.

Falha crítica de navegação.

Conteúdo incorreto ou claim não comprovado.

Problema grave de acessibilidade.

CTA ou contato quebrado.

Regressão mobile severa.

P1 — necessário para release profissional

Engineering Evidence.

Resume / Contact / GitHub / LinkedIn claramente acessíveis.

TL;DR dos cases.

Paridade PT/EN/ES.

Navegação por teclado.

Testes E2E críticos.

Cross-browser básico.

Lighthouse em build real.

P2 — refinamento

Microinterações adicionais.

Shaders.

WebGL adicional.

Glassmorphism extra.

Efeitos visuais experimentais.

Animações decorativas.

P2 nunca deve atrasar P0 ou P1.

5. Política oficial de claims

Nenhum claim deve ser publicado como fato sem evidência correspondente.

5.1 Estados

Estado

Significado

Uso público

Verified

Comprovado por teste, benchmark, profiling, CI ou documentação reproduzível

Sim

Observed

Comportamento observado sem benchmark formal

Sim, com linguagem moderada

Designed

Capacidade prevista pela arquitetura, ainda não validada integralmente

Apenas como intenção/capacidade

Target

Meta futura

Não apresentar como resultado

5.2 Linguagem a evitar

“zero bugs”

“zero alucinações”

“privacidade absoluta”

“zero distorção”

“100% seguro”

“120 FPS” sem profiling

“cold start < X” sem benchmark reproduzível

“production-ready” sem critérios explícitos

“enterprise-grade” sem evidência compatível

5.3 Linguagem preferida

“arquitetura projetada para...”

“validado por...”

“observado em...”

“mitiga...”

“reduz a dependência de...”

“mantém isolamento de...”

“perfilado em...”

“testado com...”

“meta de...”

6. Evidence IDs

Cada claim técnico relevante deve possuir rastreabilidade interna.

Formato

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

Exemplo

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

7. Camadas de evidência

A evidência deve existir em três níveis.

RAW EVIDENCE
    ↓
INTERNAL ENGINEERING EVIDENCE
    ↓
APPROVED PUBLIC EVIDENCE
    ↓
PORTFOLIO CASE STUDY

Raw Evidence

logs;

Playwright traces;

Lighthouse JSON;

screenshots técnicas;

output de testes;

coverage;

benchmark;

profiling;

CI run.

Internal Engineering Evidence

docs/evidence/<project>/

Approved Public Evidence

Claims autorizados para aparecer no portfólio.

Portfolio Case Study

Somente a informação necessária para convencer e informar o visitante.

O case não deve virar um dump de documentação interna.

8. Narrativa oficial dos cases

Todos os cases devem seguir a mesma arquitetura.

8.1 TL;DR obrigatório

No topo de cada case:

ROLE
STACK
CHALLENGE
KEY DECISION
EVIDENCE
RESULT
STATUS

Objetivo: permitir leitura em 20–30 segundos.

8.2 Estrutura longa

Contexto

Breve descrição do produto e do cenário.

Problema

Qual era o problema real?

Por que era tecnicamente relevante?

Quais restrições existiam?

Decisão de engenharia

Qual decisão principal foi tomada?

Quais alternativas foram consideradas?

Quais trade-offs existiram?

Solução

Como a arquitetura foi organizada?

Quais tecnologias foram usadas e por quê?

Quais mecanismos de segurança, desempenho ou confiabilidade foram aplicados?

Evidência

testes;

benchmarks;

profiling;

diagramas;

CI;

logs;

screenshots técnicas;

comportamento reproduzível.

Resultado

Separar:

Resultado técnico

Resultado para o usuário

Resultado de engenharia

Trade-offs e próximos passos

O que ainda pode evoluir?

9. Sprint 0 — Roadmap Cleanup & Baseline

Objetivo: eliminar contradições internas e estabelecer uma única fonte de verdade.

Tarefas

Remover duplicações do roadmap anterior.

Remover tarefas marcadas como concluídas que ainda aparecem em “próximos passos”.

Consolidar status de cada sprint.

Registrar data do baseline atual.

Confirmar stack pública de cada projeto.

Confirmar números atualmente publicados.

Rodar pipeline local completo.

Pipeline

npm run lint
npx tsc --noEmit
npm run test
npm run build
npm run test:e2e

Critérios de aceite

Roadmap não possui contradições.

Todos os estados refletem o repositório atual.

Pipeline executado e registrado.

Nenhuma métrica pública sem origem rastreável.

10. Sprint 1 — Performance P0: LCP

Objetivo: reduzir o principal gargalo de performance antes de adicionar novos efeitos.

Baseline

Performance: 75

LCP: 8.6 s

CLS: 0.008

TBT: 50 ms

Etapa 1 — identificar o LCP real

Registrar qual elemento é o LCP.

Registrar resource timing.

Verificar se é:

imagem;

fonte;

hero;

background;

componente 3D;

CSS;

hidratação;

animação;

overlay;

loader;

recurso externo.

Etapa 2 — investigar cadeia crítica

Verificar preload.

Verificar priority em imagem crítica.

Verificar fetchPriority.

Auditar next/image.

Auditar fontes.

Auditar CSS crítico.

Auditar imports do hero.

Auditar dynamic imports.

Auditar código 3D.

Auditar animações que atrasam visibilidade.

Verificar se o LCP está visualmente pronto mas oculto por motion.

Etapa 3 — corrigir

Aplicar somente mudanças sustentadas por profiling.

Preferências:

SSR/SSG para conteúdo crítico;

imagem crítica priorizada;

fontes com estratégia adequada;

conteúdo above-the-fold mínimo;

adiar código visual não essencial;

dynamic import abaixo da dobra;

transformar animações de entrada em transform + opacity;

evitar blur caro no carregamento inicial.

Etapa 4 — medir novamente

Registrar:

Before:
Performance:
LCP:
CLS:
TBT:

After:
Performance:
LCP:
CLS:
TBT:

Environment:
Device profile:
Browser:
Build:
Date:

Meta inicial

Performance >= 90 mobile

Accessibility >= 95

Best Practices >= 95

SEO >= 95

LCP dentro de faixa significativamente melhor que o baseline

Meta aspiracional

Performance >= 95 em cenário controlado e reproduzível.

Não perseguir 100 como KPI isolado.

11. Sprint 2 — Engineering Evidence

Objetivo: transformar afirmações em provas técnicas.

Estrutura

docs/
└── evidence/
    ├── portfolio-nexus/
    ├── music-player/
    ├── saas-data-control/
    └── english-tutor/

Arquivos mínimos por projeto

README.md
claims.md
architecture.md
trade-offs.md
tests.md
performance.md

Arquivos adicionais conforme necessidade:

security.md
privacy-model.md
lifecycle.md
ci-evidence.md
data-isolation.md
teacher-brain-tests.md
accessibility.md

Portfolio Nexus

Lint registrado.

TypeScript registrado.

Vitest registrado.

E2E registrado.

Lighthouse baseline registrado.

Corrigir LCP.

Repetir Lighthouse.

Registrar build output.

Registrar rotas estáticas atuais.

Registrar accessibility audit.

Criar architecture.md.

Criar trade-offs.md.

Music Player

Plano de lifecycle criado.

Plano de performance criado.

Executar testes reais de lifecycle.

Registrar callbacks após dispose.

Registrar cold start.

Fazer profiling de frame rendering.

Testar integração com DAC USB quando disponível.

Validar claims de gapless.

Não publicar bit-perfect como resultado sem evidência específica.

Criar architecture.md.

Criar trade-offs.md.

SaaS Data Control / Task Manager Pro

Matriz de segurança criada.

Plano de CI criado.

Executar testes negativos de acesso cruzado.

Registrar isolamento de tenant/usuário.

Registrar coverage atual.

Registrar contagem atual de testes.

Registrar CI real.

Registrar PostgreSQL/Testcontainers.

Validar refresh-token rotation.

Validar expurgo de tokens expirados.

Criar architecture.md.

Criar trade-offs.md.

English Tutor

Matriz Teacher Brain criada.

Privacy model iniciado.

Performance do case registrada.

Executar testes do Teacher Brain.

Criar matriz real de idiomas.

Documentar fluxo de dados.

Registrar o que sai ou não do dispositivo.

Validar feedback de voz disponível.

Registrar profiling da rota.

Criar architecture.md.

Criar trade-offs.md.

Critérios de aceite

Cada projeto possui pelo menos uma evidência verificável ligada ao seu principal diferencial.

Toda métrica pública pode ser rastreada.

Claims não comprovados foram rebaixados para Observed, Designed ou Target.

Nenhum case depende de linguagem promocional vaga.

12. Sprint 3 — Hiring / Conversion UX

Objetivo: transformar qualidade técnica em clareza de contratação.

12.1 Hero

O visitante deve entender em poucos segundos:

quem é Vanderlei;

qual é sua função;

o que ele constrói;

como acessar os projetos;

como entrar em contato.

Estrutura recomendada

VANDERLEI VIDOR
Full Stack / Product Engineer

Product. Engineering. Experience.

Short positioning sentence.

[Explore Case Studies]
[Contact Me]

Tarefas

Nome visível na primeira viewport.

Função profissional visível na primeira viewport.

CTA principal para projetos.

CTA secundário para contato.

Link de Resume.

GitHub claramente acessível.

LinkedIn claramente acessível.

Email/Contact acessível.

Availability apresentada de forma objetiva.

Não esconder links profissionais somente no footer.

12.2 Navegação

Navegação recomendada:

Projects
Process
About
Resume
Contact

GitHub e LinkedIn podem existir como ações complementares.

12.3 Resume

Resume em PDF atualizado.

Resume em inglês.

Link funcional.

Nome profissional consistente.

Stack coerente com os cases.

Sem claims não verificáveis.

12.4 Contact

Formulário funcional.

Estado de loading.

Estado de sucesso.

Estado de erro.

Proteção básica contra spam.

Acessibilidade.

Fallback por email.

CTA claro em mobile.

Critérios de aceite

Um visitante entende nome + função + proposta de valor em até uma primeira leitura rápida.

Projects e Contact estão acessíveis sem procurar.

Resume, GitHub e LinkedIn não estão escondidos.

Nenhuma animação impede CTA.

13. Sprint 4 — Case Study Proof

Objetivo: tornar cada case convincente para leitura rápida e leitura técnica profunda.

Tarefas gerais

TL;DR no topo de todos os cases.

Role.

Stack.

Challenge.

Key Decision.

Evidence.

Result.

Status.

Architecture diagram quando fizer sentido.

Trade-offs explícitos.

Próximos passos.

Links para GitHub somente quando úteis.

Evitar wall of text.

Regra de leitura

Cada case deve funcionar em três níveis:

20 segundos

TL;DR.

2 minutos

Problema → Decisão → Solução → Evidência → Resultado.

10+ minutos

Arquitetura, trade-offs, segurança, testes e evidências.

14. Sprint 5 — Motion & Premium UI Polish

Objetivo: aumentar refinamento sem sacrificar performance, acessibilidade ou compreensão.

Regra de motion

Motion possui três níveis:

Funcional

hover;

focus;

active;

feedback.

Orientação

page transition;

progress;

reveal discreto.

Storytelling

hero;

momentos especiais dos cases.

Motion decorativo não é prioridade.

Project Cards

Escalas agressivas reduzidas.

Easing consistente.

Elevação/borda sutil.

CTA discreto.

Revisar comportamento mobile/touch.

Validar ausência de jank.

Botões e links

Classes globais reutilizáveis.

Conflitos de active/motion reduzidos.

Revisar todos os botões internos dos cases.

Garantir feedback consistente em keyboard/touch/mouse.

Hero

Preferir transform + opacity.

Blur somente com profiling favorável.

Não atrasar LCP por efeito de entrada.

Não ocultar conteúdo principal aguardando animação.

Page transition

Padrão:

const transition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: {
    duration: 0.32,
    ease: [0.22, 1, 0.36, 1],
  },
};

Reduced motion:

const reducedTransition = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
  transition: { duration: 0 },
};

Critérios de aceite

Nenhuma animação é necessária para compreender conteúdo.

prefers-reduced-motion funciona.

Não há layout shift causado por motion.

Não há jank perceptível em hardware intermediário.

Mobile não recebe efeitos desnecessariamente pesados.

15. Sprint 6 — QA, Accessibility, Responsive & i18n

Objetivo: fechar consistência entre dispositivos, idiomas e formas de navegação.

15.1 Accessibility

Navegação completa por teclado.

Ordem de foco coerente.

focus-visible consistente.

Contraste.

Landmarks semânticos.

Headings em ordem lógica.

aria-label onde necessário.

Controles sem depender exclusivamente de hover.

prefers-reduced-motion.

Conteúdo animado mantém valor semântico real no HTML inicial.

Regra para counters

Não deixar crawlers/leitores de tela enxergarem apenas 0.

Preferir:

<span className="sr-only">14</span>
<span aria-hidden="true">
  <AnimatedCounter from={0} to={14} />
</span>

ou manter o valor final semanticamente presente no SSR/SSG.

15.2 Responsive

Testar pelo menos:

360 px

390 px

430 px

768 px

1024 px

1280 px

1440 px

ultrawide quando possível

Verificar:

Hero.

H1.

Cards.

Menus.

CTA.

Long text.

Diagramas.

Code blocks.

Footer.

Contact.

15.3 Cross-browser

Smoke test:

Chrome.

Edge.

Firefox.

Safari quando disponível.

15.4 i18n

PT completo.

EN completo.

ES completo.

Sem strings hardcoded.

Sem mistura de idiomas.

Metadata por idioma.

OpenGraph por idioma.

Termos técnicos equivalentes.

Slugs/URLs revisados.

Language switch não destrói contexto da rota.

16. Sprint 7 — Production Release Gate

Objetivo: somente publicar quando o produto estiver comprovadamente pronto.

16.1 Pipeline obrigatório

npm run lint
npx tsc --noEmit
npm run test
npm run build
npm run test:e2e

Todos devem passar.

16.2 Performance

Lighthouse executado em build de produção.

LCP revisado.

Imagens otimizadas.

Efeitos caros auditados.

Sem regressão relevante.

Mobile medido.

16.3 Accessibility

Keyboard.

Focus.

Contrast.

Reduced motion.

Sem conteúdo essencial invisível ao HTML semântico.

16.4 Conteúdo

Nome e função consistentes.

Nomes dos projetos consistentes.

“Task Manager Pro / SaaS Data Control” padronizado.

Sem placeholders.

Sem claims absolutos.

Métricas rastreáveis.

Datas revisadas.

Links externos funcionando.

16.5 Hiring UX

Contact.

Resume.

GitHub.

LinkedIn.

Projects.

CTA hero.

CTA mobile.

16.6 SEO / metadata

Title com nome profissional.

Description coerente.

Canonical.

OpenGraph.

Twitter/X card.

Sitemap.

Robots.

Structured data quando aplicável.

Favicons.

Social preview.

16.7 Final smoke test

Home.

Projects.

Todos os cases.

Process.

About.

Resume.

Contact.

404/fallback.

Language switch.

Back/forward browser.

Deep link direto.

17. Post-release validation

Após publicação:

Executar Lighthouse novamente no ambiente real.

Validar links.

Validar analytics sem bloquear performance.

Validar formulário de contato.

Revisar logs.

Testar mobile real.

Confirmar social preview.

Confirmar sitemap/robots.

Confirmar páginas indexáveis.

Registrar release baseline.

18. Arquitetura recomendada

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

Regras

Um projeto novo deve ser registrado sem alterar infraestrutura central.

Cases devem consumir tipos compartilhados.

Strings públicas devem vir do sistema de i18n.

Motion deve respeitar reduced motion por construção.

Tokens visuais devem ser centralizados.

Métricas públicas devem vir de fonte rastreável.

Componentes não devem depender de side effects sem cleanup.

Conteúdo crítico above-the-fold deve evitar dependência de client-side JS desnecessária.

19. Lifecycle e side effects

Todo efeito iniciado deve possuir cleanup correspondente.

Auditar:

GSAP contexts;

ScrollTrigger;

timers;

setInterval;

setTimeout;

event listeners;

observers;

RAF;

subscriptions;

async callbacks;

resize listeners;

scroll listeners.

Critério

MOUNT
  ↓
START EFFECT
  ↓
ROUTE CHANGE / UNMOUNT
  ↓
CLEANUP

Nenhum efeito deve continuar executando após o componente responsável deixar a tela.

20. Definition of Done global

Uma alteração só é considerada pronta quando:

Funciona conforme especificado.

Possui tipagem válida.

Não introduz erro de lint.

Não quebra build.

Testes relevantes passam.

Fluxo crítico possui E2E quando aplicável.

Não degrada acessibilidade.

Não degrada performance de forma significativa.

Conteúdo PT/EN/ES permanece sincronizado.

Claims novos possuem classificação de evidência.

Motion respeita prefers-reduced-motion.

Nenhuma métrica é publicada sem validação.

Side effects possuem cleanup.

Mobile foi considerado.

CTA principal continua acessível.

21. Release blocker checklist

O release NÃO deve ser considerado final se houver:

erro de build;

erro de runtime conhecido em fluxo principal;

link profissional quebrado;

Contact quebrado;

CTA principal ausente;

claim público sem evidência;

regressão crítica mobile;

navegação por teclado quebrada;

problema severo de contraste;

LCP significativamente degradado;

strings misturadas entre idiomas;

animação bloqueando conteúdo;

metadata inconsistente.

22. Métricas que realmente importam

Não otimizar somente para scores.

Acompanhar:

Performance

LCP

CLS

INP quando disponível

TBT em auditoria

JS inicial

tamanho de imagens críticas

hydration cost

route transition responsiveness

Produto

clareza do hero;

tempo até chegar aos projetos;

tempo até encontrar Contact;

leitura do TL;DR;

consistência dos cases.

Engenharia

build;

tests;

E2E;

coverage quando relevante;

CI;

evidências verificadas.

23. Regra de complexidade

Antes de adicionar uma biblioteca, efeito ou abstração, responder:

Resolve um problema real?

Melhora percepção do usuário?

Pode ser medido?

Tem fallback?

É acessível?

Afeta bundle?

Afeta main thread?

Possui cleanup?

Vale o custo de manutenção?

É mais importante que algum P0/P1 aberto?

Se a resposta não justificar a complexidade, não adicionar.

24. Próxima sequência prática

Agora

1. Fechar Sprint 0

limpar o roadmap;

rodar pipeline;

registrar baseline.

2. Atacar LCP

descobrir elemento;

medir cadeia crítica;

corrigir;

repetir Lighthouse.

3. Fechar Portfolio Nexus evidence

Por ser o projeto atualmente acessível e mais fácil de validar.

4. Implementar Hiring / Conversion UX

nome;

função;

CTAs;

Resume;

Contact;

GitHub;

LinkedIn.

5. TL;DR dos quatro cases

Criar leitura de 20–30 segundos.

6. Expandir Engineering Evidence

Ordem sugerida:

Portfolio Nexus

Task Manager Pro

Music Player

English Tutor

7. Polish final

Somente após performance e prova.

8. Release Gate

Rodar tudo e publicar somente o que estiver aprovado.

25. Resultado esperado

Ao final deste roadmap, o Portfolio Nexus deve demonstrar não apenas domínio visual, mas capacidade de:

projetar arquiteturas modulares;

explicar decisões e trade-offs;

implementar lifecycle corretamente;

comunicar segurança sem exagero;

medir performance antes de divulgá-la;

validar comportamento com testes;

construir experiências acessíveis;

criar interfaces premium sem sacrificar desempenho;

trabalhar com i18n de forma consistente;

apresentar evidências rastreáveis;

comunicar engenharia de forma clara para recrutadores, clientes e líderes técnicos;

transformar qualidade técnica em oportunidade profissional.

O objetivo final não é parecer complexo.

É parecer:

confiável, intencional, tecnicamente maduro e pronto para ser avaliado profissionalmente.