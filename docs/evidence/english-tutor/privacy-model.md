# English Tutor Privacy Model

## Estado

Designed / Pending data-flow evidence.

## Objetivo

Documentar a régua mínima de privacidade e fluxo de dados para o English Tutor sem prometer privacidade absoluta.

O roadmap cita execução local do modelo quando configurada dessa forma, com LM Studio e Qwen 2.5 local. Isso deve ser tratado como modo/configuração, não como garantia universal para qualquer instalação.

## Fluxos De Dados A Mapear

| Dado | Possível origem | Possível destino | Evidência pendente |
|---|---|---|---|
| Mensagens do estudante | app Flutter | backend FastAPI, banco, LLM | diagrama real de fluxo |
| Correções e feedback | Teacher Brain / LLM | app, histórico, progresso | payload ou log sanitizado |
| Vocabulário | prática do estudante | memória estruturada | modelo de dados |
| Erros recorrentes | correções anteriores | memória, regras pedagógicas | entidade/tabela ou fixture |
| CEFR/progresso | avaliação ou uso | banco, Teacher Brain | regra de atualização |
| Voz/áudio | interface de voz | transcrição, backend ou dispositivo | política e implementação real |
| Prompt para LLM | backend/app | runtime local ou remoto | exemplo sanitizado |

## Perguntas Que Precisam De Resposta

- O LLM roda sempre localmente ou apenas em configuração local?
- Existe algum fallback remoto?
- Quais dados são persistidos em PostgreSQL?
- Quais dados entram no prompt do modelo?
- Há retenção de histórico de conversa?
- Voz é processada localmente, enviada ao backend ou a serviço externo?
- Existe modo offline real?
- O usuário pode apagar progresso, histórico e memória?

## Claims Permitidos Agora

- O projeto pode mencionar LLM local quando configurado dessa forma.
- A arquitetura pode ser descrita como orientada a manter pedagogia e memória sob controle da aplicação.
- Privacidade pode ser tratada como requisito de design e evidência pendente.

## Claims Não Permitidos Ainda

- privacidade absoluta;
- nenhum dado sai do dispositivo;
- execução sempre local;
- anonimização garantida;
- conformidade legal específica;
- ausência total de retenção;
- voz processada localmente sem implementação confirmada.

## Critério Para Promover Claim

Qualquer claim de privacidade precisa estar ligado a:

- diagrama real de fluxo de dados;
- configuração do runtime do LLM;
- lista de dados persistidos;
- política de retenção ou exclusão;
- evidência de que não há fallback remoto quando essa claim for feita;
- commit, README ou configuração do projeto original.