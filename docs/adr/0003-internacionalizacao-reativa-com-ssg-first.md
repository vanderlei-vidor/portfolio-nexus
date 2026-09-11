# ADR 0003: Sistema i18n Reativo Multilíngue com Preservação de SSG e Resolução de Hydration

- **Status:** Aceito
- **Data:** 2026-09-07
- **Decisores:** Vanderlei Vidor

## 1. Contexto
Para atingir alcance internacional com foco nos mercados dos EUA, América Latina e Brasil, o portfólio exige suporte nativo a múltiplos idiomas:
- Inglês (`en`)
- Português (`pt`)
- Espanhol (`es`)

O principal desafio técnico consistia em oferecer internacionalização dinâmica sem comprometer a geração 100% estática (SSG) das páginas do Next.js e sem causar os famigerados erros de **Hydration Mismatch** no React 19 (diferença entre o texto renderizado no servidor versus cliente).

## 2. Decisão
Implementar um ecossistema de internacionalização desacoplado composto por:
1. **Dicionários JSON Estruturados:** Arquivos estáticos tipados em `messages/en.json`, `messages/pt.json` e `messages/es.json`.
2. **`LanguageContext` com Inicialização Determinística:**
   - O estado inicial no servidor e na primeira passagem do cliente é fixado de forma determinística (`en`), garantindo correspondência idêntica na árvore DOM gerada pelo SSR.
   - A sincronização com a preferência gravada no `localStorage` ou detecção via `navigator.language` é executada de forma diferida pós-montagem usando `requestAnimationFrame`, eliminando qualquer aviso de hidratação ou chamadas síncronas de `setState` dentro de efeitos.
3. **Componente de Chaveamento `LanguageSwitcher`:**
   - Botão discreto em estilo Glassmorphism com estados de acessibilidade (`aria-pressed`, `lang`, `aria-label`) e separadores visuais refinados.
4. **Fallback Transparente:**
   - Se uma chave de tradução estiver ausente no idioma ativo, a função `t(keyPath)` busca automaticamente o valor correspondente no dicionário em inglês antes de retornar a própria chave.

## 3. Consequências

### Positivas
- **Preservação Integral de SSG:** Não há dependência de middlewares pesados de sub-rotas (`/en/`, `/pt/`), preservando o modelo de 14 páginas estáticas compiladas em segundos.
- **Transição em Tempo Real:** Troca instantânea de idioma em todos os componentes reativos sem recarregar a página e com zero perda de estado de navegação.
- **Acessibilidade Aprimorada:** Atualização dinâmica do atributo `document.documentElement.lang` conforme o idioma selecionado.

### Negativas / Trade-offs
- Se o usuário selecionar um idioma alternativo, os textos dos Client Components atualizam suavemente logo após a renderização inicial, gerando uma breve transição visual em vez de uma renderização já no idioma alternativo vinda do servidor.
