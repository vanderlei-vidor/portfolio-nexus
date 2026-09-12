# Claims Register

Este registro controla quais afirmações técnicas podem aparecer publicamente no Portfolio Nexus.

Estados permitidos:

- `Verified`: comprovado por teste, build, E2E, benchmark, profiling ou documentação rastreável.
- `Observed`: observado no produto, mas ainda sem medição formal.
- `Designed`: previsto pela arquitetura, mas ainda não validado integralmente.
- `Target`: meta futura, não deve aparecer como resultado alcançado.

## Portfolio Nexus

| Claim | Estado | Evidência atual | Uso público recomendado |
|---|---|---|---|
| Usa Next.js 16, React 19 e TypeScript | Verified | `package.json` | Pode aparecer como stack. |
| Gera rotas estáticas para home, contato, processo, sitemap, robots e quatro projects | Verified | `npm run build` com 14 páginas geradas | Pode aparecer como SSG/static export. |
| Publicação preparada para GitHub Pages em subdiretório | Verified | `next.config.ts`, `.github/workflows/ci.yml`, `scripts/serve-static.mjs` e E2E com `/portfolio-aaa` | Pode aparecer como pipeline/deploy estático. |
| Possui i18n em PT, EN e ES | Verified | `messages/pt.json`, `messages/en.json`, `messages/es.json` e seletor de idioma testado por E2E | Pode aparecer como portfolio multilíngue. |
| Respeita `prefers-reduced-motion` em efeitos críticos | Verified | `styles/globals.css`, `PageTransition`, animações do English Tutor e auditoria local | Pode aparecer como motion acessível. |
| English Tutor teve carga inicial adiada nas seções abaixo da dobra | Verified | `ProjectExperience-english-tutor.tsx` e medição registrada no roadmap | Pode aparecer como otimização de performance percebida. |
| Lighthouse com Performance >= 95 | Target | Ainda pendente de execução formal | Não publicar como resultado. |

## Music Player

| Claim | Estado | Evidência atual | Uso público recomendado |
|---|---|---|---|
| Projeto descrito como player local-first | Designed | Conteúdo do case e README fornecido como base | Pode aparecer como orientação arquitetural. |
| Foco em alta fidelidade e controle do pipeline de áudio | Designed | Conteúdo do case e roadmap | Usar linguagem de arquitetura/foco, não garantia absoluta. |
| Reprodução gapless | Designed | Roadmap indica dependência do pipeline/plataforma | Publicar como suporte preparado ou capacidade condicionada. |
| Integração com DAC/dispositivos externos | Target | Roadmap e `docs/evidence/music-player/performance.md` pedem verificação específica | Não publicar como garantia sem evidência de teste. |
| Bit-perfect garantido | Target | `docs/evidence/music-player/claims.md` mantém como evidência pendente | Não publicar como resultado. |
| Cold start ou FPS específicos | Target | `docs/evidence/music-player/performance.md` define a evidência pendente | Não publicar números. |

## SaaS Data Control

| Claim | Estado | Evidência atual | Uso público recomendado |
|---|---|---|---|
| Stack Java, Spring Boot, PostgreSQL, Vite, SASS, Docker e Testcontainers | Designed | README fornecido como base e roadmap | Pode aparecer como stack se refletir o repositório do projeto. |
| Isolamento de dados por usuário/tenant no backend | Designed | Roadmap cita estratégia como `findByIdAndUsuarioId` | Pode aparecer como decisão arquitetural. |
| Mitigação de IDOR por autorização contextual | Designed | Roadmap técnico | Usar como mitigação projetada até haver teste negativo anexado. |
| Refresh token rotation e expurgo de tokens expirados | Designed | Roadmap técnico | Pode aparecer como mecanismo implementado se confirmado no repositório do projeto. |
| 104 testes automatizados | Target | Pendente de CI/evidência atualizada do projeto | Não publicar número sem prova. |
| 100% de cobertura dos serviços críticos | Target | Pendente de relatório de cobertura | Não publicar. |

## English Tutor

| Claim | Estado | Evidência atual | Uso público recomendado |
|---|---|---|---|
| Arquitetura separa decisão pedagógica da geração textual | Designed | Conteúdo do case e roadmap | Pode aparecer como decisão de engenharia. |
| Teacher Brain determinístico guia regras/progressão antes do LLM | Designed | Conteúdo do case e roadmap | Pode aparecer como arquitetura. |
| Uso local de LLM quando configurado dessa forma | Designed | Roadmap cita LM Studio/Qwen local | Usar linguagem condicional. |
| Reduz dependência do LLM para decisões pedagógicas | Designed | Arquitetura descrita no roadmap | Pode aparecer como mitigação arquitetural. |
| Zero alucinações gramaticais | Target | Pendente de testes pedagógicos | Não publicar. |
| Privacidade absoluta | Target | Pendente de matriz real de fluxo de dados | Não publicar. |

## Regras de Redação Pública

Preferir:

- arquitetura projetada para;
- validado por;
- mitigação de;
- reduz dependência de;
- preparado para;
- observado em build local;
- medido em cenário controlado.

Evitar:

- zero bugs;
- zero alucinações;
- 100% seguro;
- privacidade absoluta;
- performance garantida;
- números sem fonte;
- claims de hardware sem teste correspondente.