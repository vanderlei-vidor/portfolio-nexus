# Architecture

This project uses the Next.js App Router for route ownership and a feature-driven structure for product code.

## Top-level layout

- `app/`: routing only. Keep pages thin and delegate UI/business behavior to features.
- `features/`: user-facing modules grouped by domain.
- `shared/`: reusable primitives, providers, and cross-feature effects.
- `styles/`: global CSS.
- `public/`: static assets served from `/`.
 - [app/](app/): routing only. Keep pages thin and delegate UI/business behavior to features.
 - [features/](features/): user-facing modules grouped by domain.
 - [shared/](shared/): reusable primitives, providers, and cross-feature effects.
 - [styles/](styles/): global CSS.
 - [public/](public/): static assets served from `/`.

## Feature modules

- `features/home`: home page composition and home-only sections.
- `features/projects`: project listing, project detail UI, project registry, and case-study modules.
- `features/projects/cases`: one folder per project case. Each case exposes an `index.ts` entry point and keeps its own layout, data, and case-only components colocated.
- `features/process`: process route experience.
 - [features/home](features/home): home page composition and home-only sections.
 - [features/projects](features/projects): project listing, project detail UI, project registry, and case-study modules.
 - [features/projects/cases](features/projects/cases): one folder per project case. Each case exposes an [index.ts](features/projects/cases/index.ts) entry point and keeps its own layout, data, and case-only components colocated.
 - [features/process](features/process): process route experience.

## Rules of thumb

- New routes go in `app/`, but route files should import a feature entry component.
- New project case studies go in `features/projects/cases/[slug]` and are registered in `features/projects/registry.ts`.
 - New project case studies go in [features/projects/cases/[slug]](features/projects/cases/%5Bslug%5D) and are registered in [features/projects/registry.ts](features/projects/registry.ts).
- Code used by only one domain stays inside that feature.
- Code shared by multiple domains goes in `shared/`.
- Keep Next.js special files (`page`, `layout`, `template`, `loading`, `error`, `route`) inside `app/`.
 - Keep Next.js special files (`page`, `layout`, `template`, `loading`, `error`, `route`) inside [app/](app/).
- Keep generated folders like `.next/` out of architecture decisions.
