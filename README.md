# BERO

Portfolio website for an upholstery business. Static-first, multilingual, CMS-driven.

**Stack:** Astro, TypeScript, Tailwind CSS v4, Sanity.io, Cloudflare Pages

## Monorepo

npm workspaces. All commands run from the repo root.

- `apps/web` - the Astro frontend, deployed as a Cloudflare Worker
- `apps/studio` - Sanity Studio, including the content schema, deployed to Sanity
- `packages/` - shared functionality consumed by the apps

## Prerequisites

- Node.js 24.14.0 (see `.nvmrc`)
- npm

## Getting Started

```sh
nvm use
npm install
cp apps/web/.env.example apps/web/.env
```

### Environment Variables

| Variable                   | Required | Description                                                |
|----------------------------|----------|------------------------------------------------------------|
| `SANITY_STUDIO_PROJECT_ID` | Yes      | Sanity project ID                                          |
| `SANITY_STUDIO_DATASET`    | Yes      | Sanity dataset name (e.g. `production`)                    |
| `USE_MOCK_DATA`            | No       | Set to `true` to use static fixture data instead of Sanity |

To develop without Sanity access, set `USE_MOCK_DATA=true` in `apps/web/.env`. This loads
10 mock projects with placeholder images - enough to test all UI features.

## Scripts

| Script              | Description                          |
|---------------------|--------------------------------------|
| `npm run dev`       | Start dev server at localhost:4321   |
| `npm run build`     | Production build to `apps/web/dist/` |
| `npm run test:unit` | Run unit tests (Vitest)              |
| `npm run test:e2e`  | Run E2E tests (Playwright)           |

## Testing

### Unit Tests (Vitest)

Tests are co-located with components. Dual configuration:

- **React components** (`*.test.tsx`) -- `@testing-library/react` + Happy DOM
- **Astro components** (`*.test.ts`) -- Astro Container API + Happy DOM

```sh
npm run test:unit          # run both
npm run test:unit:react    # React tests only
npm run test:unit:astro    # Astro tests only
```

### E2E Tests (Playwright)

Tests live in `apps/web/e2e/`, organized by feature. Two projects: `chromium` (desktop)
and `mobile` (iPhone 12). E2E runs use `USE_MOCK_DATA=true` automatically.

```sh
npm run test:e2e
npm run test:e2e:ui    # interactive mode
```
