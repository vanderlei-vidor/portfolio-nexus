# SaaS Data Control (Task Manager Pro) Evidence

Este diretório reúne as evidências técnicas de arquitetura backend, isolamento multi-tenant, segurança e performance do case **SaaS Data Control / Task Manager Pro**.

O objetivo é sustentar a narrativa de engenharia de software corporativa (Java 17, Spring Boot 3, Spring Security 6 e PostgreSQL) com rigor técnico e transparência sobre limites operacionais.

---

## Índice de Evidências

| Área | Arquivo | Estado | Descrição |
| :--- | :--- | :--- | :--- |
| **Arquitetura** | [`architecture.md`](./architecture.md) | **Verified** | Arquitetura em camadas, Spring Security 6, JWT + Refresh Token e PostgreSQL. |
| **Trade-offs** | [`trade-offs.md`](./trade-offs.md) | **Verified** | Decisões técnicas: Banco compartilhado vs Banco isolado, JWT stateless vs Sessão em memória. |
| **Testes & Segurança** | [`tests.md`](./tests.md) | **Verified** | Padrão de testes negativos contra vulnerabilidades IDOR e integração com Testcontainers. |
| **Performance** | [`performance.md`](./performance.md) | **Verified** | Otimização de consultas, índices compostos, pool HikariCP e prevenção de N+1 queries. |
| **Isolamento de Dados** | [`data-isolation.md`](./data-isolation.md) | **Designed / Verified** | Modelo formal de isolamento de dados com `tenant_id` compulsório. |
| **CI & Integração** | [`ci-evidence.md`](./ci-evidence.md) | **Planned / Documented** | Roteiro de CI com execução de contêineres efêmeros do PostgreSQL. |
| **Claims Aprovados** | [`claims.md`](./claims.md) | **Active** | Matriz de afirmações técnicas públicas classificadas por estado (Verified, Observed, Designed, Target). |

---

## Resumo dos Claims Verificados

- [x] Backend corporativo construído com **Java 17**, **Spring Boot 3** e **PostgreSQL**.
- [x] O backend atua como a fronteira real de segurança (zero confiança na interface do cliente).
- [x] Prevenção de vulnerabilidades de IDOR via escopo obrigatório de `tenant_id` e `user_id` em queries JPA.
- [x] Sessões seguras baseadas em tokens JWT de vida curta acompanhados de rotação de Refresh Tokens.
- [x] Estratégia de testes de integração baseada em banco de dados real via Testcontainers.