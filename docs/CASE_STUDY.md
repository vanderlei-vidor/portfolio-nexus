# Case Study Template

Use este template para criar ou revisar qualquer case publicado no Portfolio Nexus.

A regra central é simples: a narrativa pode ser forte, mas nenhum claim deve prometer mais do que o projeto consegue demonstrar por código, teste, profiling, documentação ou comportamento observável.

## Metadados

- Nome do projeto:
- Slug:
- Stack principal:
- Status do case: Draft | Ready for review | Published
- Fonte de evidência principal:

## 1. Contexto

Explique o produto em poucas linhas.

Inclua:

- que tipo de sistema é;
- para quem ele foi pensado;
- qual restrição técnica ou de produto torna o projeto interessante.

Evite transformar esta seção em marketing. O leitor precisa entender o cenário antes da solução.

## 2. Problema

Descreva o problema real que orientou o projeto.

Boas perguntas:

- Que risco, fricção ou limitação existia?
- Por que esse problema importa tecnicamente?
- O que uma implementação simples demais deixaria vulnerável, lento, confuso ou difícil de manter?

## 3. Restrições

Liste as condições que limitaram ou guiaram a solução.

Exemplos:

- plataforma alvo;
- dependências externas;
- requisitos de privacidade;
- custo de performance;
- necessidade de funcionamento local;
- complexidade de manutenção;
- compatibilidade com static export.

## 4. Decisão de Engenharia

Explique a decisão principal tomada para resolver o problema.

Inclua:

- a escolha técnica;
- o motivo da escolha;
- o que foi priorizado;
- o que foi deixado de fora ou adiado.

## 5. Alternativas Consideradas

Liste alternativas reais ou plausíveis e por que não foram escolhidas.

Formato sugerido:

| Alternativa | Vantagem | Trade-off |
|---|---|---|
| | | |

## 6. Solução

Descreva como o sistema foi organizado.

Inclua somente capacidades reais ou planejadas de forma explícita.

Separe quando fizer sentido:

- arquitetura;
- fluxo de dados;
- estados principais;
- camadas de UI;
- integrações;
- segurança;
- performance;
- acessibilidade.

## 7. Evidências

Toda afirmação forte precisa apontar para uma evidência.

| Claim | Estado | Evidência | Observação |
|---|---|---|---|
| | Verified | | |
| | Observed | | |
| | Designed | | |
| | Target | | |

Classificação:

- `Verified`: comprovado por teste, build, E2E, benchmark, profiling ou documentação rastreável.
- `Observed`: observado no produto, mas ainda sem medição formal.
- `Designed`: previsto pela arquitetura, mas ainda não validado integralmente.
- `Target`: meta futura, não deve aparecer como resultado alcançado.

## 8. Resultado

Separe resultado técnico, resultado para usuário e resultado de engenharia.

### Resultado Técnico

O que a implementação melhora de forma concreta?

### Resultado Para o Usuário

O que fica mais claro, rápido, confiável ou agradável para quem usa?

### Resultado de Engenharia

Que risco foi reduzido? Que parte ficou mais modular, testável ou manutenível?

## 9. Trade-offs e Próximos Passos

Nenhum case precisa fingir que está finalizado em tudo.

Inclua:

- limitações conhecidas;
- validações pendentes;
- melhorias futuras;
- evidências ainda necessárias.

## Checklist Antes de Publicar

- [ ] O case segue Contexto, Problema, Decisão, Solução, Evidência e Resultado.
- [ ] Nenhuma métrica aparece sem fonte rastreável.
- [ ] Claims absolutos foram removidos ou moderados.
- [ ] PT, EN e ES mantêm equivalência semântica.
- [ ] Assets públicos usam caminhos compatíveis com `basePath` quando necessário.
- [ ] Motion não essencial respeita `prefers-reduced-motion`.
- [ ] Links, botões e navegação por teclado continuam acessíveis.