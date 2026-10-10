# Music Player Evidence

Este diretório reúne as evidências técnicas de engenharia, arquitetura, testes de ciclo de vida e política de honestidade técnica do case **Music Player**.

O objetivo é demonstrar competência arquitetural mobile profunda (Flutter, áudio nativo, ciclo de vida e persistência local), sem transformar intenções em promessas comerciais não comprovadas.

---

## Índice de Evidências

| Área | Arquivo | Estado | Descrição |
| :--- | :--- | :--- | :--- |
| **Arquitetura** | [`architecture.md`](./architecture.md) | **Verified** | Arquitetura mobile Flutter, sessão de áudio nativa, QueueManager e persistência SQLite. |
| **Trade-offs** | [`trade-offs.md`](./trade-offs.md) | **Verified** | Decisões técnicas e política de claims: Local-First vs Nuvem, SQLite vs NoSQL, limites de gapless/bit-perfect. |
| **Testes** | [`tests.md`](./tests.md) | **Verified** | Estratégia de testes: prevenção de chamadas pós-dispose, cancelamento de streams e recuperação de fila. |
| **Ciclo de Vida** | [`lifecycle-tests.md`](./lifecycle-tests.md) | **Planned / Documented** | Roteiro de testes de lifecycle e cancelamento de subscriptions de hardware. |
| **Performance** | [`performance.md`](./performance.md) | **Observed** | Estratégia de profiling: consumo de memória, renderização de listas longas e áudio background. |
| **Claims Aprovados** | [`claims.md`](./claims.md) | **Active** | Matriz de afirmações técnicas públicas classificadas por estado (Verified, Observed, Designed, Target). |

---

## Resumo dos Claims Verificados

- [x] Arquitetura mobile **Flutter/Dart** com direção **Local-First**.
- [x] Persistência relacional local com **SQLite** (`sqflite`) para filas, playlists e histórico.
- [x] Separação estrita entre camada de UI, controle de sessão de áudio e background handler.
- [x] Reversão determinística de modo aleatório (Shuffle Fisher-Yates preservando a ordem original).
- [x] Honestidade técnica: Gapless e bit-perfect classificados como condicionados a hardware e SO, e não como garantias universais de software.