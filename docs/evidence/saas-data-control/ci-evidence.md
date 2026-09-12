# SaaS Data Control CI Evidence

## Estado

Planned / Pending CI logs.

## Objetivo

Definir quais evidências de CI precisam ser anexadas antes de publicar números de testes, cobertura ou integração com banco real.

## Pipeline Esperado

| Etapa | Finalidade | Evidência pendente |
|---|---|---|
| Backend unit tests | validar services, regras e utilitários | log de execução |
| Backend integration tests | validar repositories, autenticação e autorização com banco real | log de CI/Testcontainers |
| Security negative tests | provar bloqueio de acesso cruzado | relatório de testes |
| Coverage | sustentar qualquer claim de cobertura | relatório JaCoCo ou equivalente |
| Frontend build/test | validar superfície Vite/SASS quando aplicável | log de build/test |
| Docker/Testcontainers | provar ambiente reproduzível | log com containers iniciados |

## Claims Permitidos Agora

- O case usa CI como critério de maturidade técnica.
- Testcontainers pode ser citado como estratégia de teste se confirmado pelo README/código do projeto original.
- PostgreSQL real deve ser a referência para claims de integração de dados.

## Claims Não Permitidos Ainda

- 104 testes automatizados;
- 100% de cobertura dos serviços críticos;
- CI verde recorrente;
- testes com PostgreSQL real executados;
- Testcontainers comprovado em pipeline;
- qualidade de release garantida.

## Evidências Necessárias

- log de CI com data;
- comando de execução local equivalente;
- versão do Java/Spring Boot;
- serviço de banco usado no teste;
- relatório de cobertura, se cobertura for mencionada;
- lista de suítes executadas;
- commit ou tag do projeto original.

## Critério Para Números Públicos

Números como quantidade de testes ou percentual de cobertura só podem aparecer no portfolio quando estiverem ligados a um artefato reproduzível. Sem artefato, ficam como `Target` ou devem ser removidos da narrativa pública.