# Music Player Claims

Este arquivo detalha os claims públicos permitidos para o case Music Player enquanto as evidências técnicas completas ainda não foram anexadas.

| Claim | Estado | Evidência atual | Uso público |
|---|---|---|---|
| Player Flutter com direção local-first | Designed | Conteúdo do case e roadmap | Pode aparecer como direção arquitetural. |
| Biblioteca, playlists, favoritos, recentes e fila como centro da experiência | Designed | Conteúdo visível do case | Pode aparecer como proposta de produto. |
| Persistência local com SQLite | Designed | Conteúdo do case e roadmap | Pode aparecer como decisão técnica se confirmado pelo README/código do projeto original. |
| Separação por responsabilidades: UI, fila, sessão de áudio, armazenamento, capas, widgets e importação | Designed | Conteúdo do case | Pode aparecer como arquitetura planejada/desenhada. |
| Background audio e controles nativos | Designed | Conteúdo do case | Usar como prioridade de arquitetura, não garantia universal. |
| Gapless/crossfade | Target | Dependente de plataforma/pipeline | Publicar apenas como capacidade condicionada ou plano de validação. |
| Integração com DAC/dispositivos externos | Target | Verificação específica pendente | Não publicar como garantia. |
| Bit-perfect | Target | Evidência pendente | Não publicar como resultado. |
| Cold start, FPS, memória ou bateria | Target | Benchmark/profiling pendente | Não publicar números. |
| Lifecycle resiliente | Designed / Target | Roadmap exige testes de dispose, listeners e callbacks | Usar linguagem moderada até anexar testes. |

## Linguagem Recomendada

Usar:

- "player local-first orientado a biblioteca pessoal";
- "arquitetura pensada para estado de reprodução, fila e persistência local";
- "controles nativos e background audio tratados como superfícies críticas";
- "gapless e DAC externo tratados como validações de plataforma";
- "performance medida antes de virar claim público".

Evitar:

- "bit-perfect garantido";
- "zero latência";
- "gapless perfeito em qualquer dispositivo";
- "compatibilidade garantida com DAC USB";
- "performance AAA comprovada";
- "lifecycle sem vazamentos".