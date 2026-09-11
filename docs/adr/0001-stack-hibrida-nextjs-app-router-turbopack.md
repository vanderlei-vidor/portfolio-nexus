# ADR 0001: Adoção de Next.js App Router com Estratégia SSG-First e Turbopack

- **Status:** Aceito
- **Data:** 2026-07-20
- **Decisores:** Vanderlei Vidor

## 1. Contexto
O Portfolio Nexus foi concebido para ser uma vitrine de alta fidelidade visual, desempenho de carregamento instantâneo e excelente indexação por mecanismos de busca (SEO). A escolha da stack base precisava atender aos seguintes pilares fundamentais:
1. **Core Web Vitals Impecáveis:** LCP (Largest Contentful Paint) < 1.5s e TBT (Total Blocking Time) próximo de zero.
2. **SEO Nativo:** Meta tags dinâmicas, Open Graph e suporte nativo a robots/sitemap sem dependência de pré-renderização externa.
3. **Escalabilidade e Manutenibilidade:** Suporte robusto a TypeScript e separação clara entre Server Components e Client Components.

## 2. Decisão
Adotar o **Next.js 16+ (App Router)** com empacotamento via **Turbopack** e estratégia estrita de **SSG-First (Static Site Generation)**:
- **Server Components por padrão:** Rotas críticas (`app/page.tsx`, `app/(site)/process/page.tsx`, `app/(site)/contact/page.tsx`) funcionam como Server Components para emitir HTML pré-renderizado sem bundle JavaScript desnecessário.
- **`generateStaticParams` para rotas dinâmicas:** Todos os cases em `/projects/[slug]` são pré-compilados como páginas estáticas no momento do build.
- **Isolamento de Client Components:** Componentes com interatividade pesada ou animações (`HeroInteractiveLayer`, `Stack`, `DirectContactForm`, `Terminal`) são encapsulados com a diretiva `"use client"` e carregados sob demanda via `dynamic()`.

## 3. Consequências

### Positivas
- **100% de Páginas Estáticas Geradas:** 14/14 rotas entregues diretamente a partir de CDN/Edge com latência milissegundos e custo de hospedagem mínimo na Vercel.
- **Score Lighthouse 100/100:** Ausência de processamento de SSR em tempo real no servidor para servir as rotas principais.
- **Type-Safety Total:** Integração nativa com TypeScript 5 e `Metadata API` tipada do Next.js.

### Negativas / Trade-offs
- **Complexidade de Hidratação:** Exige cuidado rigoroso na conciliação de estados do cliente com a renderização inicial do servidor (SSR/SSG), demandando padrões de sincronização diferida.
- **Regras Estritas de Componentização:** Separação obrigatória de metadados em Server Components e lógica de UI interativa em Client Components.
