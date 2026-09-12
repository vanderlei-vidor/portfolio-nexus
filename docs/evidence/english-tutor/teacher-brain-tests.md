# English Tutor Teacher Brain Tests

## Estado

Planned / Pending source evidence.

## Objetivo

Definir a matriz de testes necessária para comprovar que o Teacher Brain orienta decisões pedagógicas antes da geração textual do LLM.

Este arquivo não afirma que os testes já existem no projeto original. Ele define quais provas precisam ser anexadas para transformar a arquitetura descrita em evidência verificável.

## Responsabilidades Esperadas

| Responsabilidade | O que validar | Evidência esperada |
|---|---|---|
| Progressão CEFR | nível atual influencia dificuldade, vocabulário e tipo de feedback | teste de regra/progressão |
| Sinais gramaticais | erro recorrente altera o próximo movimento pedagógico | teste com fixture de erros |
| Memória de vocabulário | palavras já praticadas afetam revisão e repetição | teste de contexto salvo |
| Cenários | missão ou situação altera vocabulário e intenção da resposta | teste por cenário |
| Correção | feedback segue regra pedagógica antes da frase final | teste de decisão, não julgamento absoluto |
| Handoff ao LLM | prompt ou payload recebe intenção pedagógica estruturada | snapshot ou log sanitizado |

## Casos de Teste Recomendados

- aluno A1 recebe explicação mais simples que aluno B2 no mesmo erro;
- erro recorrente muda a prioridade da próxima correção;
- vocabulário já aprendido aparece como revisão, não como novidade;
- missão por cenário altera o tipo de pergunta sugerida;
- Teacher Brain escolhe entre conversar, corrigir, explicar ou propor missão;
- LLM recebe uma intenção pedagógica estruturada em vez de decidir sozinho;
- saída do LLM é tratada como texto gerado, não como fonte única de verdade pedagógica.

## Claims Permitidos Agora

- O case descreve uma separação entre decisão pedagógica e geração textual.
- O Teacher Brain pode ser apresentado como camada determinística planejada/desenhada.
- A arquitetura reduz dependência do LLM para decisões de ensino.

## Claims Não Permitidos Ainda

- Teacher Brain comprovado por testes;
- correção gramatical perfeita;
- zero alucinações;
- progressão CEFR validada por avaliação formal;
- adaptação pedagógica garantida para qualquer estudante;
- ausência de erro em feedback gerado por LLM.

## Critério Para Verificação

A claim do Teacher Brain só deve mudar para `Verified` quando houver:

- regras ou módulo real identificado no projeto original;
- testes automatizados ou fixtures pedagógicas;
- entradas e saídas esperadas documentadas;
- pelo menos um caso por CEFR, erro recorrente, vocabulário e cenário;
- registro de como a decisão pedagógica é enviada ao LLM.