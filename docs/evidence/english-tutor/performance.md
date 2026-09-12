# English Tutor Portfolio Performance Evidence

## Estado

Observed / Portfolio case only.

## Objetivo

Registrar a evidência local já existente sobre a abertura do case English Tutor dentro do Portfolio Nexus, separando essa medição da performance do aplicativo original.

## Evidência Observada

O componente `ProjectExperience-english-tutor.tsx` carrega o hero diretamente e adia as seções abaixo da primeira dobra usando `next/dynamic` e `requestIdleCallback` quando disponível.

A medição inicial registrada no roadmap indica que, após adiar as seções abaixo da dobra, a rota `/projects/english-tutor` manteve o hero visível rapidamente e reduziu a carga inicial observada aos 300ms de aproximadamente 409 nós de DOM / 41 scripts para 142 nós de DOM / 32 scripts.

## Escopo Da Claim

Esta evidência vale para o case dentro do Portfolio Nexus. Ela não comprova performance do app Flutter/FastAPI original.

## Claims Permitidos Agora

- O case do portfolio teve carregamento abaixo da dobra adiado.
- A primeira dobra foi priorizada para reduzir peso inicial percebido.
- Há uma medição local inicial registrada no roadmap.

## Claims Não Permitidos Ainda

- performance do app original comprovada;
- Lighthouse específico do English Tutor aprovado;
- tempo de carregamento garantido;
- ausência de travamento em qualquer dispositivo;
- otimização completa de todas as animações;
- profiling formal concluído.

## Próximas Evidências

- Playwright trace ou Chrome DevTools profiling da rota `/projects/english-tutor`;
- Lighthouse específico da rota em build de produção;
- comparação antes/depois anexada como artefato;
- auditoria de imagens e animações abaixo da dobra.