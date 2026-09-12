# SaaS Data Control Claims

Este arquivo detalha os claims públicos permitidos para o case SaaS Data Control / Task Manager Pro.

| Claim | Estado | Evidência atual | Uso público |
|---|---|---|---|
| Stack Java, Spring Boot, PostgreSQL, Vite, SASS, Docker e Testcontainers | Designed | Roadmap e README fornecido como base | Pode aparecer como stack se confirmado no projeto original. |
| Backend como fronteira de autorização | Designed | Conteúdo do case e roadmap | Pode aparecer como decisão de engenharia. |
| Isolamento por usuário/tenant | Designed / Target | `data-isolation.md` define estratégia e testes pendentes | Usar como arquitetura planejada até anexar testes negativos. |
| Mitigação de IDOR | Target | `security-tests.md` exige testes negativos | Não publicar como comprovado sem execução. |
| JWT access tokens e refresh tokens | Designed | Conteúdo do case e roadmap | Pode aparecer como modelo de sessão. |
| Refresh token rotation | Designed / Target | Teste de rotação ainda pendente | Usar linguagem moderada até confirmar código/teste. |
| PostgreSQL real em integração | Target | `ci-evidence.md` define evidência esperada | Não publicar como executado sem logs. |
| Testcontainers no CI | Target | CI/logs pendentes | Pode aparecer como plano de validação, não como prova. |
| 104 testes automatizados | Target | Relatório de execução pendente | Não publicar número sem prova. |
| 100% de cobertura dos serviços críticos | Target | Relatório de cobertura pendente | Não publicar. |

## Linguagem Recomendada

Usar:

- "plataforma SaaS orientada a autorização contextual no backend";
- "isolamento de dados por usuário/tenant como decisão arquitetural";
- "sessões modeladas com JWT e refresh tokens";
- "PostgreSQL como base relacional para tarefas, usuários, tokens e relatórios";
- "testes negativos e CI como evidências necessárias antes de claims fortes".

Evitar:

- "segurança garantida";
- "IDOR eliminado";
- "isolamento multi-tenant comprovado";
- "104 testes automatizados";
- "100% de cobertura";
- "CI com Testcontainers comprovado" sem log anexado.