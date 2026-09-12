# SaaS Data Control Security Tests

## Estado

Planned / Pending source evidence.

## Objetivo

Definir a matriz de segurança que precisa ser comprovada antes de publicar claims fortes sobre isolamento, autorização e mitigação de IDOR.

Este arquivo não afirma que os testes já foram executados. Ele documenta quais provas precisam existir para transformar a narrativa de segurança em evidência verificável.

## Superfícies Críticas

| Superfície | Risco | Evidência esperada |
|---|---|---|
| Autenticação | sessão inválida ou expirada acessando recurso protegido | teste de API com token ausente/expirado |
| Autorização por recurso | usuário acessando tarefa de outro usuário | teste negativo de IDOR |
| Escopo por tenant | tenant A lendo ou alterando dados do tenant B | teste cruzado entre tenants |
| Repository queries | busca por ID sem escopo de usuário/tenant | teste ou revisão de métodos como `findByIdAndUsuarioId` |
| Refresh tokens | reutilização indevida ou token antigo aceito após rotação | teste de rotação/revogação |
| Reports | relatório agregando dados fora do escopo permitido | teste de relatório por usuário/tenant |
| Admin/roles | permissões excessivas em endpoints sensíveis | teste de matriz de papéis |

## Testes Negativos Recomendados

- buscar tarefa de outro usuário por ID conhecido;
- editar tarefa pertencente a outro usuário;
- excluir recurso fora do próprio escopo;
- listar relatórios contendo dados de outro usuário/tenant;
- reutilizar refresh token antigo depois da rotação;
- acessar endpoint protegido sem token;
- acessar endpoint protegido com token expirado;
- validar que a UI não é a única barreira de autorização.

## Claims Permitidos Agora

- O case trata autorização contextual no backend como decisão arquitetural.
- O roadmap exige testes negativos antes de publicar mitigação de IDOR como evidência comprovada.
- O case pode falar de modelo de sessão com JWT e refresh tokens em linguagem moderada.

## Claims Não Permitidos Ainda

- IDOR eliminado;
- segurança garantida;
- isolamento completo comprovado;
- refresh token rotation comprovada;
- autorização 100% coberta por testes;
- ausência de vazamento horizontal sem teste cruzado anexado.

## Critério Para Verificação

Uma claim de segurança só deve mudar para `Verified` quando houver:

- teste automatizado, log de CI ou relatório de execução;
- commit/versão do projeto original;
- massa de dados ou fixture descrevendo usuários/tenants distintos;
- resultado de sucesso e, quando aplicável, falha esperada para acesso indevido;
- vínculo claro entre endpoint, service/repository e regra de autorização.