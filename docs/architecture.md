# Architecture

This project uses the Next.js App Router for route ownership and a feature-driven structure for product code.

## Top-level layout

- `app/`: routing only. Keep pages thin and delegate UI/business behavior to features.
- `features/`: user-facing modules grouped by domain.
- `shared/`: reusable primitives, providers, and cross-feature effects.
- `styles/`: global CSS.
- `public/`: static assets served from `/`.

## Feature modules

- `features/home`: home page composition and home-only sections.
- `features/projects`: project listing, project detail UI, and project helpers.
- `features/process`: process route experience.

## Rules of thumb

- New routes go in `app/`, but route files should import a feature entry component.
- Code used by only one domain stays inside that feature.
- Code shared by multiple domains goes in `shared/`.
- Keep Next.js special files (`page`, `layout`, `template`, `loading`, `error`, `route`) inside `app/`.
- Keep generated folders like `.next/` out of architecture decisions.
