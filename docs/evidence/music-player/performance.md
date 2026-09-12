# Music Player Performance Evidence

## Estado

Planned / Pending measurement.

## Objetivo

Definir quais evidências de performance precisam existir antes de publicar qualquer claim técnico forte sobre o Music Player.

Este arquivo não registra resultado de benchmark ainda. Ele registra a régua de prova que será usada quando o código-fonte, build reproduzível ou relatórios do projeto original forem anexados.

## Escopo de Medição

Fluxos que devem ser medidos:

| Fluxo | O que observar | Evidência esperada |
|---|---|---|
| Home / Library | tempo até lista utilizável, custo de leitura local e renderização inicial | profiling, logs ou trace |
| Player | estabilidade da tela ativa, troca de faixa, atualização de progresso e artwork | trace, gravação ou teste automatizado |
| Queue | reorder, skip, restauração e sincronização de estado | teste funcional e profiling |
| Scan / Import | custo de varredura local, parsing de metadados e atualização de biblioteca | benchmark controlado |
| Background / Resume | retorno ao app, widget/notification e restauração de sessão | teste em dispositivo ou emulador |

## Métricas Que Podem Ser Coletadas

- cold start até primeira tela útil;
- tempo de carregamento de biblioteca local;
- tempo de abertura da tela Player;
- estabilidade de frame em transições principais;
- custo de scan/importação por volume de arquivos;
- consumo aproximado de memória em biblioteca pequena, média e grande;
- comportamento de foreground/background/resume;
- impacto de artwork, thumbnails e metadados na renderização.

## Claims Permitidos Agora

- O case trata performance como disciplina de release.
- O case exige profiling antes de publicar números.
- O case separa performance percebida, renderização, biblioteca local e caminho de áudio.

## Claims Não Permitidos Ainda

- cold start abaixo de um valor específico;
- FPS fixo ou animação sempre estável;
- biblioteca grande carregando instantaneamente;
- consumo de memória otimizado sem medição;
- bateria otimizada sem medição;
- áudio bit-perfect, gapless ou baixa latência como garantia universal.

## Evidências Pendentes

- relatório de profiling do app Flutter;
- benchmark de cold start;
- benchmark de biblioteca local com massa de dados controlada;
- medição de tela Player durante troca de faixas;
- medição de scan/importação;
- comparação antes/depois após otimizações relevantes.

## Critério Para Virar Claim Público

Um número só pode sair deste arquivo para a narrativa pública quando tiver:

- data da execução;
- versão ou commit do projeto auditado;
- dispositivo, emulador ou ambiente descrito;
- comando, ferramenta ou procedimento reproduzível;
- artefato anexado, como trace, log, screenshot, relatório ou teste automatizado.