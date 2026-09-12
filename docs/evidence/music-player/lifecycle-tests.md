# Music Player Lifecycle Tests

## Estado

Planned / Pending source evidence.

## Objetivo

Definir a matriz mínima de lifecycle que precisa ser comprovada antes de tratar o Music Player como resiliente em produção.

O case pode falar que lifecycle é uma preocupação de arquitetura. Ele ainda não deve afirmar cobertura completa sem testes anexados.

## Superfícies Críticas

| Superfície | Risco | Evidência esperada |
|---|---|---|
| Audio session | sessão ativa após pausa, interrupção ou troca de rota | teste funcional ou integração nativa |
| Queue controller | estado divergente após skip, reorder ou restauração | teste unitário/integrado |
| Streams/listeners | callback executando após dispose | teste automatizado com dispose explícito |
| Sleep timer | timer disparando após tela desmontada ou app em background | teste de timer/cancelamento |
| Widgets/notifications | comando externo afetando estado antigo | teste de integração ou procedimento manual registrado |
| Artwork pipeline | carregamento assíncrono alterando UI desmontada | teste de cancelamento/guard de mounted |
| Scan/import | operação longa mantendo referência inválida | teste de cancelamento e retomada |

## Casos de Teste Recomendados

- desmontar a tela Player enquanto uma operação assíncrona ainda está pendente;
- trocar de faixa durante atualização de artwork;
- cancelar sleep timer ao sair da sessão;
- pausar, retomar e avançar faixa via controle nativo;
- simular interrupção de áudio por chamada/notificação;
- restaurar fila após fechamento do app;
- impedir atualização de estado depois de `dispose`;
- validar cleanup de streams, subscriptions, timers e controllers.

## Claims Permitidos Agora

- O case trata queue, widgets, timers e listeners assíncronos como superfícies críticas.
- O roadmap exige testes de lifecycle antes de claims fortes de confiabilidade.
- A narrativa pública pode falar em arquitetura orientada a resiliência, usando linguagem moderada.

## Claims Não Permitidos Ainda

- lifecycle totalmente coberto;
- ausência garantida de callbacks após `dispose`;
- reprodução contínua garantida em qualquer interrupção;
- widgets nativos sempre sincronizados;
- timers e listeners completamente livres de vazamento sem teste anexado.

## Critério De Aceite

A evidência de lifecycle só deve ser marcada como verificada quando existir pelo menos:

- lista dos módulos reais envolvidos;
- testes automatizados ou roteiro manual por superfície crítica;
- resultado de execução com data;
- registro dos casos que falharam ou ficaram fora do escopo;
- vínculo com commit, versão ou artefato do projeto original.