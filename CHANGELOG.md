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

### Changed

- Home consolidada em `app/page.tsx`, removendo duplicidade com `app/(site)/page.tsx`.
- Links internos de contato atualizados para apontar para `/contact`.
- Hero da home ajustado com tipografia fluida usando `clamp()` para melhorar responsividade mobile.
- Hero passou a usar o token global `--color-accent-rgb` no glow/radial gradient.
- Scroll global agora volta ao topo apenas quando a navegação não possui hash.

### Verified

- `npm run build` passou após os ajustes de rota, SSG e smooth scroll.
- `npx eslint shared/effects/SmoothScroll.tsx` passou após a correção de anchors.
- Smoke test anterior confirmou `/contact` com `200` e `/contact_page` com redirect `308`.
- Build passou mostrando `/projects/[slug]` como SSG usando `generateStaticParams`.

### Pending Before Launch

- Corrigir erros pendentes de `npm run lint` no projeto inteiro.
- Revisar `metadataBase` em `app/layout.tsx` e substituir `https://seusite.com` pelo domínio real.
- Criar `app/robots.ts` e `app/sitemap.ts`.
- Revisar SEO por página, especialmente titles, descriptions e Open Graph.
- Validar visualmente desktop e mobile:
  - primeira dobra da home;
  - cards de projetos;
  - página `/contact`;
  - heroes dos cases;
  - scroll/anchors;
  - elementos animados com GSAP, Framer Motion e Lenis.
- Corrigir overflow/tipografia mobile nos heroes dos cases, especialmente Music Player.
- Desativar ou adaptar cursor customizado em dispositivos touch/mobile.
- Revisar contraste da página de contato, principalmente cards e textos secundários.
- Trocar usos críticos de `<img>` por `next/image` quando apropriado.
- Otimizar assets públicos e remover duplicações de imagens/texturas.
- Revisar arquivos novos/deletados no Git antes do primeiro deploy.
- Atualizar README com instruções reais do projeto, substituindo o boilerplate do Next.js.
- Rodar Lighthouse em produção ou preview da Vercel.

### Recommended Deployment Flow

1. Corrigir lint e pendências visuais críticas.
2. Rodar `npm run build`.
3. Fazer revisão manual em mobile e desktop.
4. Fazer commit limpo das mudanças de launch readiness.
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
8. Rodar Lighthouse e ajustar pontos críticos.

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
```
