# Project Organization

Este documento descreve como o Portfolio Nexus organiza rotas, cases, assets e conteúdo público.

## Estrutura Principal

- `app/`: rotas do Next.js App Router. As páginas devem permanecer finas e delegar composição para `features/`.
- `features/home/`: composição da home, contato e seções específicas da página inicial.
- `features/process/`: experiência da rota de processo.
- `features/projects/`: listagem, registry e estudos de caso.
- `features/projects/cases/`: implementação visual e narrativa de cada case.
- `shared/`: providers, hooks, helpers e efeitos reutilizáveis.
- `messages/`: conteúdo público em PT, EN e ES.
- `public/`: imagens, vídeos e assets estáticos.
- `docs/`: documentação interna de arquitetura, decisões, roadmap e evidências.

## Registry de Projetos

O arquivo `features/projects/registry.ts` é a fonte de verdade para os cases publicados.

Cada entrada deve declarar:

- `slug`: identificador público da rota.
- `title`: nome exibido no case.
- `cardDescription`: descrição curta para cards/listagens.
- `description`: resumo técnico usado em metadata e narrativa.
- `imageUrl`: imagem pública do projeto.
- `loadComponent`: import dinâmico do case.

Exemplo conceitual:

```ts
"music-player": {
  slug: "music-player",
  title: "Music Player",
  cardDescription: "Local-first audio player",
  description: "...",
  imageUrl: withBasePath("/projects/music-player/textures/card_home.webp"),
  loadComponent: async () => (await import("./cases/music-player")).default,
}
```

## Convenções de Slug

- Slugs públicos devem ser estáveis.
- Mudanças de slug exigem entrada em `legacyProjectSlugMap`.
- A rota `app/(site)/projects/[slug]/page.tsx` deve continuar usando `projectsRegistry`, `getCanonicalProjectSlug`, `getProjectBySlug` e `generateStaticParams`.
- Novos cases devem ser adicionados ao registry antes de aparecerem em listagens.

## Static Export e GitHub Pages

O projeto usa `output: "export"` no `next.config.ts` para gerar a pasta `out`.

Como o repositório GitHub Pages é publicado em subdiretório, assets públicos precisam respeitar `basePath` quando usados diretamente em `src`, arrays de imagens ou `backgroundImage`.

Use `withBasePath()` para caminhos públicos que não são automaticamente tratados pelo roteador do Next.

Exemplo:

```ts
import { withBasePath } from "@/shared/lib/public-path";

const image = withBasePath("/projects/music-player/textures/card_home.webp");
```

Links criados com `next/link` podem continuar usando rotas internas como `/contact` ou `/projects/music-player`, pois o `basePath` é aplicado pelo Next.

## Organização de Um Case

Cada case deve ter um ponto de entrada claro em `features/projects/cases/[slug]/index.ts` e renderizar a experiência principal.

Estrutura recomendada:

```text
features/projects/cases/[slug]/
├── index.ts
├── content.ts
├── components/
├── sections/
└── data.ts
```

Nem todo case precisa ter exatamente os mesmos arquivos, mas a leitura deve ser previsível.

## Conteúdo e i18n

- Textos globais e navegação vivem em `messages/pt.json`, `messages/en.json` e `messages/es.json`.
- Conteúdo específico de case pode viver no próprio módulo quando a estrutura visual exige dados ricos.
- As três línguas devem manter o mesmo significado, mesmo quando a redação muda para soar natural.
- Não misturar idiomas em metadata pública.

## Claims e Evidências

Antes de publicar claims técnicos fortes, registre a classificação em `docs/CLAIMS_REGISTER.md`.

Regras:

- números só entram como resultado quando houver evidência rastreável;
- claims absolutos devem ser evitados;
- capacidades planejadas devem ser descritas como arquitetura ou meta;
- claims públicos devem apontar para teste, build, E2E, profiling, README técnico ou comportamento observável.

## Adicionando Um Novo Projeto

1. Criar a pasta do case em `features/projects/cases/[slug]`.
2. Criar/exportar o componente principal pelo `index.ts`.
3. Registrar o case em `features/projects/registry.ts`.
4. Adicionar assets em `public/projects/[slug]/`.
5. Usar `withBasePath()` para assets públicos usados fora do roteamento automático.
6. Adicionar/atualizar textos em `messages/` quando o conteúdo for global.
7. Classificar claims em `docs/CLAIMS_REGISTER.md`.
8. Rodar `npm run lint`, `npx tsc --noEmit`, `npm run test`, `npm run build` e `npm run test:e2e` quando a alteração afetar fluxo público.