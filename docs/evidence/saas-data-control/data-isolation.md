# SaaS Data Control Data Isolation

## Estado

Designed / Pending negative tests.

## Objetivo

Registrar a estratégia de isolamento de dados descrita para o SaaS Data Control e deixar claro quais evidências ainda faltam antes de publicar isso como resultado comprovado.

## Estratégia Descrita

O roadmap descreve isolamento aplicado no backend, com acesso a dados condicionado ao usuário ou tenant autenticado. A estratégia citada usa consultas com escopo contextual, como `findByIdAndUsuarioId`, para evitar que um identificador previsível seja suficiente para acessar recurso de outra conta.

## Fronteiras Que Precisam Estar No Backend

| Camada | Responsabilidade esperada | Evidência pendente |
|---|---|---|
| Controller | receber identidade autenticada e não confiar apenas em IDs vindos da UI | teste de API |
| Service | aplicar regra de propriedade/tenant antes de alterar estado | teste unitário ou integrado |
| Repository | buscar recurso já filtrado por usuário/tenant | revisão de código ou teste integrado |
| Reports | agregar apenas dados permitidos ao contexto autenticado | teste negativo de relatório |
| Tokens | vincular sessão ao usuário correto e invalidar refresh antigo | teste de sessão |

## Cenários De Prova

- usuário A tenta ler tarefa do usuário B;
- usuário A tenta editar tarefa do usuário B;
- usuário A tenta excluir tarefa do usuário B;
- tenant A tenta listar relatório com dados do tenant B;
- token válido de um usuário tenta operar recurso de outro usuário;
- refresh token antigo tenta gerar nova sessão após rotação.

## Claims Permitidos Agora

- Isolamento de dados por usuário/tenant é uma decisão arquitetural do case.
- O backend é tratado como fronteira de autorização.
- A mitigação de IDOR depende de consultas contextualizadas e testes negativos.

## Claims Não Permitidos Ainda

- isolamento multi-tenant comprovado;
- nenhum vazamento horizontal possível;
- IDOR eliminado em todos os endpoints;
- relatórios totalmente isolados;
- autorização completa sem lacunas.

## Critério Para Promover Claim

A claim só deve virar `Verified` quando houver pelo menos um teste negativo executado por tipo de recurso público do case: tarefas, relatórios, sessão/token e qualquer recurso administrativo ou compartilhado.