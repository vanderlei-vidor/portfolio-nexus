# Changelog

Todas as mudanças relevantes do Portfolio Nexus devem ser registradas aqui.

Formato baseado em [Keep a Changelog](https://keepachangelog.com/) e organizado para acompanhar a preparação do site para produção.

## [Unreleased] - Launch Readiness

### Added

- Criada rota pública `/contact` como URL canônica da página de contato.
- Mantida rota legada `/contact_page` com redirect permanente para `/contact`.
- Adicionado `generateStaticParams` em `/projects/[slug]` para pré-gerar os quatro cases:
  - `/projects/music-player`
  - `/projects/saas-data-control`
  - `/projects/english-tutor`
  - `/projects/portfolio-nexus`
- Adicionado suporte a anchors/hash no `SmoothScroll`, preservando links como `/#selected-projects`.
- Adicionados tokens globais de tema em `styles/globals.css` para cor, tipografia fluida e espaçamentos fluidos.
- Criada geração dinâmica de sitemap nativo via `app/sitemap.ts` cobrindo rotas estáticas principais e slugs automáticos de projetos premium.
- Criado gerenciamento automatizado de rastreamento via `app/robots.ts`, vinculando o mapa do site e isolando pastas internas do Next.js.

### Changed

- **[Performance P1]** Transformada a `HomePage.tsx` novamente em Server Component, removendo o escopo `"use client"` do topo da árvore e evitando que toda a estrutura da página principal participasse desnecessariamente da hidratação inicial.
- **[Performance P1]** Separada a estrutura estática do `Hero.tsx` de seus efeitos de animação interativos. O texto principal e os botões de ação agora são renderizados imediatamente sem o Framer Motion, enquanto os efeitos pesados de iluminação de fundo, rastreamento de mouse e efeito `Magnetic` são carregados de forma assíncrona pós-interação ou via `requestIdleCallback`.
- **[Performance P0]** Removido o Loader artificial de 1.400 ms, eliminando o gargalo direto que atrasava o LCP (Largest Contentful Paint).
- **[Performance P0]** Desabilitada a animação inicial global de opacidade no `PageTransition.tsx` para destravar a primeira pintura útil (FCP) do navegador.
- **[Performance P0]** Modificada a estratégia de renderização dos componentes abaixo da dobra (`Stack`, `Terminal`, `Contact` e `Cursor`), passando a carregá-los dinamicamente via `dynamic()` apenas quando estiverem próximos da viewport (Lazy Loading real).
- Home consolidada em `app/page.tsx`, removendo duplicidade com `app/(site)/page.tsx`.
- Links internos de contato atualizados para apontar para `/contact`.
- Hero da home ajustado com tipografia fluida usando `clamp()` para melhorar responsividade mobile.
- Hero passou a usar o token global `--color-accent-rgb` no glow/radial gradient.
- Scroll global agora volta ao topo apenas quando a navegação não possui hash.
- Refatoração em massa de (77 mudanças) para a sintaxe moderna do Tailwind v4.
- Refatoração em massa de gradientes (12 mudanças) para a sintaxe moderna do Tailwind v4 (`bg-linear-to-*` substituindo `bg-gradient-to-*`), incluindo a seção de contato da Home.
- Implementada a arquitetura Metadata API completa do Next.js, centralizando tags de Open Graph, Twitter Cards e template de sufixos de títulos (`%s | Portfolio Nexus`) no `app/layout.tsx`.
- Refatoradas as rotas `/process` e `/contact` dividindo a responsabilidade em Server Components (para SEO puro nativo) e Client Components isolados (para as interações pesadas de animação em GSAP e Framer Motion), evitando quebras de build.
- Desativar ou adaptar cursor customizado em dispositivos touch/mobile.

### Fixed

- **[Performance P1]** Removido o listener duplicado do evento global `mousemove` que era escutado e processado de forma concorrente e separada entre os componentes `Hero.tsx` e `Cursor.tsx`.
- **[Performance P0]** Removida a animação de opacidade inicial no texto principal do Hero (“Smooth. Elegant. Cinematic.”), garantindo que o elemento crítico de LCP seja renderizado imediatamente no HTML antes da hidratação do Framer Motion.
- Removidos estados e ícones do `lucide-react` importados mas não utilizados em `DashboardAnalytics.tsx` para zerar avisos do ESLint (`@typescript-eslint/no-unused-vars`).
- Corrigido aviso de performance do Next.js nos cards de projetos adicionando a propriedade `sizes` no componente centralizado `ProjectCard.tsx`, habilitando o srcset dinâmico correto para mobile/desktop.
- Limpos blocos de estilo vazios e regras inválidas no arquivo de estilos globais para evitar warnings de compilação CSS no Tailwind v4.
- Corrigidos disparos duplicados e oscilações visuais na seção de contato da Home otimizando o comportamento do viewport no Framer Motion para acionar as animações apenas uma vez (`once: true`).

### Verified

- **[Métricas] Validada a performance via Lighthouse local, atingindo score de 100 no Desktop e saltando de 68 para 93 no ambiente Mobile (TBT reduzido drasticamente para 290 ms e LCP para 2,1 s).**
- `npm run dev` rodando sem nenhum aviso (*warning*) ativo no terminal de desenvolvimento.
- `npm run build` passou após os ajustes de rota, SSG e smooth scroll.
- `npx eslint shared/effects/SmoothScroll.tsx` passou após a correção de anchors.
- Smoke test anterior confirmou `/contact` com `200` e `/contact_page` com redirect `308`.
- Build passou mostrando `/projects/[slug]` como SSG usando `generateStaticParams`.
- Geração local de `/robots.txt` e `/sitemap.xml` validados com sucesso no ambiente local.

### Pending Before Launch

#### ⚡ Otimização de Performance (Foco em TBT e Core Web Vitals)
- **[P1]** Configurar as esteiras infinitas com animações em loop do GSAP no componente `Stack.tsx` para inicializarem apenas quando entrarem de fato na viewport (ScrollTrigger lazy load).
- **[P1]** Refatorar a animação de caracteres em `About.tsx` para remover a sobrecarga de criação dinâmica de mais de 100 elementos `<span>` individuais no DOM.
- **[P1]** Remover completamente a biblioteca e chamadas redundantes do `ScrollReveal` na Home devido à ausência de elementos `.reveal`.
- **[P2]** Cessar a execução global e contínua do ticker do `ScrollTrigger.update()` em todos os frames em `SmoothScroll.tsx` quando a tela estiver estática.
- **[P2]** Isolar o carregamento estrutural do `SmoothScroll`, instâncias do GSAP e efeitos de proximidade `Magnetic` apenas nas sub-rotas que utilizam os recursos, removendo a injeção global do `layout.tsx`.
- **[P2]** Implementar suporte a acessibilidade e otimização de renderização com a media query `prefers-reduced-motion` para atenuar ou desligar cálculos complexos de CPU.
- **[P2]** Injetar a propriedade de renderização avançada `content-visibility: auto` nas seções abaixo da dobra (`About`, `Stack`, `Terminal`, `Contact`) para aliviar os passos iniciais de Layout e Paint do navegador.
- **[P3]** Realizar a compressão agressiva do asset `english-tutor-screen.webp` (atualmente pesando ~235 KB).
- **[P3]** Limitar o parâmetro `quality` de renderização de imagens do Next.js para o range ideal de `70–75` dentro de `ProjectCard.tsx`.

#### 📋 Ajustes de Layout & SEO Geral
- Revisar `metadataBase` em `app/layout.tsx` e substituir `https://portfolio-nexus-six.vercel.app/` pelo domínio real definitivo.
- Validar visualmente desktop e mobile:
  - primeira dobra da home;
  - cards de projetos;
  - página `/contact`;
  - heroes dos cases;
  - scroll/anchors;
  - elementos animados com GSAP, Framer Motion e Lenis.
- Corrigir overflow/tipografia mobile nos heroes dos cases, especialmente Music Player.
- Trocar usos críticos de restantes de `<img>` por `next/image` quando apropriado.
- Otimizar assets públicos e remover duplicações de imagens/texturas remanescentes.
- Revisar arquivos novos/deletados no Git antes do primeiro deploy.
- Atualizar README com instruções reais do projeto, substituindo o boilerplate do Next.js.
- Rodar Lighthouse em produção ou preview da Vercel.

### Recommended Deployment Flow

1. Executar a esteira ordenada de refatoração para TBT remanescente (Expurgar ScrollReveal ➔ Pausar loops da Stack ➔ Otimizar animação de strings do About ➔ Ajustar Providers globais e tickers GSAP ➔ Comprimir assets/imagens).
2. Rodar `npm run build` final de validação produtiva.
3. Fazer revisão manual criteriosa em mobile e desktop.
4. Fazer commit limpo de todas as mudanças de launch readiness.
5. Publicar preview na Vercel.
6. Conferir rotas principais:
   - `/`
   - `/contact`
   - `/process`
   - `/projects/music-player`
   - `/projects/saas-data-control`
   - `/projects/english-tutor`
   - `/projects/portfolio-nexus`
7. Configurar domínio customizado.
8. Rodar Lighthouse oficial e ajustar pontos micro-críticos remanescentes.

## Release Template

Use este modelo quando fechar uma versão publicada.

```md
## [x.y.z] - YYYY-MM-DD

### Added

- ...

### Changed

- ...

### Fixed

- ...

### Removed

- ...

### Verified

- ...