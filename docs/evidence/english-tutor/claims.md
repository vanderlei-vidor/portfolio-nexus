# English Tutor Claims

Este arquivo detalha os claims públicos permitidos para o case English Tutor / AI Polyglot Tutor.

| Claim | Estado | Evidência atual | Uso público |
|---|---|---|---|
| Arquitetura separa decisão pedagógica da geração textual | Designed | Conteúdo do case e roadmap | Pode aparecer como decisão de engenharia. |
| Teacher Brain determinístico guia regras/progressão antes do LLM | Designed / Target | `teacher-brain-tests.md` define testes pendentes | Pode aparecer como arquitetura desenhada, não como prova validada. |
| Memória estruturada para vocabulário, erros, CEFR, cenários e progresso | Designed | Conteúdo do case e roadmap | Pode aparecer como modelo de contexto. |
| CEFR como modelo de progresso | Designed / Target | Testes de progressão pendentes | Usar como direção pedagógica até haver validação. |
| Uso local de LLM | Designed / Conditional | `privacy-model.md` exige configuração real do runtime | Usar apenas "quando configurado dessa forma". |
| Reduz dependência do LLM para decisões pedagógicas | Designed | Arquitetura descrita no case | Pode aparecer como mitigação arquitetural. |
| Zero alucinações gramaticais | Target | Testes pedagógicos pendentes | Não publicar. |
| Privacidade absoluta | Target | Matriz real de fluxo de dados pendente | Não publicar. |
| Performance percebida do case no portfolio | Observed | `performance.md` e roadmap | Pode aparecer como otimização do portfolio, não do app original. |

## Linguagem Recomendada

Usar:

- "tutor guiado por regras pedagógicas antes da geração textual";
- "Teacher Brain como camada determinística de decisão";
- "LLM local quando configurado dessa forma";
- "memória estruturada para progresso, vocabulário e erros recorrentes";
- "reduz dependência do LLM para decisões pedagógicas";
- "privacidade tratada como modelo de fluxo de dados a ser evidenciado".

Evitar:

- "zero alucinações";
- "sem alucinações gramaticais";
- "privacidade absoluta";
- "nenhum dado sai do dispositivo";
- "correção perfeita";
- "CEFR validado formalmente";
- "LLM sempre local".