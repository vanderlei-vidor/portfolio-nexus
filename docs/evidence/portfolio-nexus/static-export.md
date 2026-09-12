# Static Export and GitHub Pages Evidence

## Objetivo

Garantir que o Portfolio Nexus possa ser publicado como site estático no GitHub Pages, incluindo o subcaminho do repositório.

## Arquivos Relevantes

- `next.config.ts`
- `.github/workflows/ci.yml`
- `playwright.config.ts`
- `scripts/serve-static.mjs`
- `shared/lib/public-path.ts`

## Configuração Verificada

`next.config.ts` define:

- `output: "export"`
- `trailingSlash: true`
- `basePath` derivado de `NEXT_PUBLIC_BASE_PATH` ou do nome do repositório em GitHub Pages
- `images.unoptimized: true`

Essa configuração permite gerar a pasta `out` com HTML, CSS, JavaScript e assets estáticos.

## GitHub Pages

O workflow atual:

1. instala dependências com Node 24;
2. roda lint, type-check e testes unitários;
3. executa `npm run build` com `GITHUB_PAGES=true` e `NEXT_PUBLIC_BASE_PATH=/${{ github.event.repository.name }}`;
4. cria `out/.nojekyll`;
5. faz upload de `out` para E2E;
6. faz upload de `out` como artifact oficial do GitHub Pages;
7. publica com `actions/deploy-pages@v5`.

## E2E Estático

`playwright.config.ts` usa:

- `E2E_STATIC_EXPORT=true` para servir `out`;
- `NEXT_PUBLIC_BASE_PATH` para testar a URL com subcaminho;
- `scripts/serve-static.mjs` para resolver rotas estáticas exportadas.

## Claims Permitidos

- O projeto está preparado para static export.
- O deploy por GitHub Pages está configurado via GitHub Actions.
- O subcaminho do repositório é considerado no build e no E2E estático.

## Limites

- O GitHub Pages precisa estar configurado no repositório com Source = GitHub Actions.
- A publicação real depende de permissões e configuração do repositório remoto.