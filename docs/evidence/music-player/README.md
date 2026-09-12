# Music Player Evidence

Este diretório reúne a camada de evidência do case Music Player.

O objetivo é manter a narrativa pública forte sem transformar intenção arquitetural em promessa técnica não provada. O case pode falar de direção local-first, separação de responsabilidades, persistência local, controles nativos e disciplina de release. Claims de performance, caminho de áudio, gapless, DAC externo ou bit-perfect só devem avançar quando houver medição reproduzível ou teste específico anexado.

## Evidence Index

| Área | Arquivo | Estado |
|---|---|---|
| Performance | `performance.md` | Planned / Pending measurement |
| Lifecycle | `lifecycle-tests.md` | Planned / Pending source evidence |
| Claims aprovados | `claims.md` | Active |

## Claims Públicos Permitidos

- Player Flutter com direção local-first.
- Experiência pensada para bibliotecas pessoais, playlists, favoritos, recentes e estado de fila.
- Arquitetura organizada por responsabilidades: UI, fila, sessão de áudio, persistência, capas, widgets e importação.
- Persistência local com SQLite como direção técnica do case.
- Gapless, crossfade, DAC externo e bit-perfect tratados como capacidades condicionadas a validação de plataforma.
- Performance apresentada como plano de evidência, não como resultado publicado.

## Claims Ainda Não Permitidos

- Bit-perfect garantido.
- Latência zero, reprodução sem falhas ou ausência total de jitter.
- Gapless garantido em todas as plataformas e formatos.
- Compatibilidade garantida com DAC USB ou hardware externo específico.
- Cold start, FPS, consumo de memória ou bateria sem benchmark anexado.
- Lifecycle totalmente coberto sem testes de callbacks, streams, timers e dispose.

## Próximo Fechamento Técnico

1. Anexar README técnico ou fonte do repositório original do Music Player.
2. Mapear módulos reais de playback, fila, persistência, sessão de áudio e UI.
3. Rodar profiling em fluxos Home, Player, Queue e Scan.
4. Criar testes de lifecycle para listeners, streams, timers, widgets e callbacks pós-dispose.
5. Atualizar este diretório com evidências reais antes de promover qualquer claim de performance.