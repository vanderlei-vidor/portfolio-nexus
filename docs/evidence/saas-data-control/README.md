# SaaS Data Control Evidence

Este diretório reúne a camada de evidência do case SaaS Data Control / Task Manager Pro.

O objetivo é sustentar a narrativa de engenharia sem transformar arquitetura planejada em prova executada. O case pode falar de backend responsável por autorização, sessões seguras, persistência relacional, relatórios e isolamento de dados. Números de testes, cobertura, segurança e CI só devem ser publicados quando houver relatório, log ou execução reproduzível anexada.

## Evidence Index

| Área | Arquivo | Estado |
|---|---|---|
| Segurança e autorização | `security-tests.md` | Planned / Pending source evidence |
| Isolamento de dados | `data-isolation.md` | Designed / Pending negative tests |
| CI e integração | `ci-evidence.md` | Planned / Pending CI logs |
| Claims aprovados | `claims.md` | Active |

## Claims Públicos Permitidos

- Plataforma SaaS construída em torno de autenticação, autorização contextual e persistência relacional.
- Backend tratado como fronteira real de segurança, não apenas como suporte da interface.
- Isolamento de dados por usuário/tenant apresentado como decisão arquitetural.
- JWT e refresh tokens apresentados como modelo de sessão, com rotação tratada como mecanismo a confirmar por evidência do projeto original.
- PostgreSQL e Testcontainers apresentados como direção de validação quando houver CI/logs anexados.

## Claims Ainda Não Permitidos

- 104 testes automatizados sem relatório de execução anexado.
- 100% de cobertura dos serviços críticos sem relatório de cobertura.
- Segurança garantida ou sistema invulnerável.
- IDOR completamente eliminado sem testes negativos anexados.
- Isolamento multi-tenant comprovado sem teste cruzado entre usuários/tenants.
- Refresh token rotation comprovada sem teste ou código-fonte correspondente.

## Próximo Fechamento Técnico

1. Anexar README técnico ou acesso ao repositório original do Task Manager Pro.
2. Confirmar stack real: Java, Spring Boot, PostgreSQL, Vite, SASS, Docker e Testcontainers.
3. Mapear endpoints, services, repositories e entidades de usuário/tenant.
4. Anexar testes negativos de acesso cruzado.
5. Anexar logs de CI com testes de integração sobre PostgreSQL real ou Testcontainers.