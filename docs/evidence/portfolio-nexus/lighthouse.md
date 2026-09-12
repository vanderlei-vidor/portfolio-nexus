# Lighthouse Evidence

## Estado

Measured.

## Objetivo

Anexar uma execução reproduzível de Lighthouse em build de produção e separar resultado medido de meta de qualidade.

## Execução Registrada

- Data: 2026-09-12
- URL auditada: `http://127.0.0.1:3022/portfolio-aaa/`
- Build: `GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/portfolio-aaa npm run build`
- Servidor local: `NEXT_PUBLIC_BASE_PATH=/portfolio-aaa node scripts/serve-static.mjs out 3022`
- Comando:

```bash
npx -y lighthouse "http://127.0.0.1:3022/portfolio-aaa/" --output=json --output=html --output-path="docs/evidence/portfolio-nexus/lighthouse-home" --chrome-flags="--headless=new --no-sandbox --disable-gpu" --quiet
```

## Artefatos

- `lighthouse-home.report.html`
- `lighthouse-home.report.json`

## Resultado

| Categoria | Score |
|---|---:|
| Performance | 75 |
| Accessibility | 96 |
| Best Practices | 96 |
| SEO | 100 |

## Métricas Observadas

- Largest Contentful Paint: 8.6 s
- Cumulative Layout Shift: 0.008
- Total Blocking Time: 50 ms

## Métricas Alvo Iniciais

- Performance: >= 90 mobile
- Accessibility: >= 95
- Best Practices: >= 95
- SEO: >= 95

## Leitura

Accessibility, Best Practices e SEO atingiram as metas iniciais nesta execução local. Performance ainda ficou abaixo da meta por causa do LCP alto e deve entrar como follow-up técnico antes de qualquer claim público de performance AAA.