# BERO

Portfolio website for an upholstery business. Static-first, multilingual, CMS-driven.

**Stack:** Astro, TypeScript, Tailwind CSS v4, Sanity.io, Cloudflare Pages

## Prerequisites

- Node.js 24.14.0 (see `.nvmrc`)
- npm

## Getting Started

```sh
nvm use
npm install
cp .env.example .env
```

### Environment Variables

| Variable                   | Required | Description                                                |
|----------------------------|----------|------------------------------------------------------------|
| `SANITY_STUDIO_PROJECT_ID` | Yes      | Sanity project ID                                          |
| `SANITY_STUDIO_DATASET`    | Yes      | Sanity dataset name (e.g. `production`)                    |
| `USE_MOCK_DATA`            | No       | Set to `true` to use static fixture data instead of Sanity |

To develop without Sanity access, set `USE_MOCK_DATA=true` in `.env`. This loads
10 mock projects with placeholder images -- enough to test all UI features.

### Run

```sh
npm run dev        # http://localhost:4321
```

## Scripts

| Script                 | Description                                   |
|------------------------|-----------------------------------------------|
| `npm run dev`          | Start dev server                              |
| `npm run build`        | Production build to `./dist/`                 |
| `npm run preview`      | Build + local Cloudflare preview via Wrangler |
| `npm run check`        | Astro TypeScript type checking                |
| `npm run clean`        | Remove `dist/` and `.astro/`                  |
| `npm run lint:app`     | Lint with Biome/Ultracite                     |
| `npm run lint:app:fix` | Auto-fix application source code lint issues  |
| `npm run lint:doc`     | Lint Markdown documents                       |
| `npm run lint:doc:fix` | Auto-fix documentation lint issues            |
| `npm run test:unit`    | Run unit tests (Vitest)                       |
| `npm run test:e2e`     | Run E2E tests (Playwright)                    |
| `npm run test:e2e:ui`  | Run E2E tests with Playwright UI              |

## Project Structure

```txt
src/
  assets/          Static images (hero, logo, 404)
  components/
    about/         About section (stats, services, story)
    contact/       Contact section (info, map)
    hero/          Hero section
    hooks/         Custom React hooks (useTheme, useFocusTrap)
    portfolio/     Portfolio gallery page content
    projects/      Projects section (cards, listing)
    ui/            Shared UI: navigation, footer, gallery, form, buttons, theme toggle
  i18n/            Translations (pl, en, de), locale utils, routing, breadcrumbs
  layouts/         Root layout + SEO components (SEOHead, JsonLd)
  lib/content/     Data layer: Sanity client, mock fixtures, business constants
  pages/           Astro file-based routing (SSR redirect, prerendered pages)
  styles/          Tailwind v4 theme (CSS custom properties, light/dark tokens)
  test/            Test setup and helpers
  views/           Astro view wrappers for sub-pages (portfolio, privacy policy)
e2e/               Playwright E2E tests
studio-bero/       Sanity Studio (separate sub-project)
public/            Static assets (favicon, robots.txt, manifest, OG image)
```

## Architecture

### Rendering

Hybrid mode via `@astrojs/cloudflare`. Most pages are **prerendered (SSG)** at
build time. The root `/` is **SSR** -- it detects the visitor's preferred locale
and 302-redirects to `/{locale}/`.

### i18n

Three locales: `pl` (default), `en`, `de`. All routes are prefix-based:

```text
/pl/                       /en/                       /de/
/pl/portfolio              /en/portfolio              /de/portfolio
/pl/polityka-prywatnosci   /en/privacy-policy         /de/datenschutzerklarung
```

Custom implementation -- no third-party i18n routing library. Translation files
are flat JSON (87 keys each). Route slugs are translated per locale in
`routes.ts`. Compile-time checks enforce key parity across all languages.

### Content Layer

`createPortfolioApi(lang)` returns either a Sanity-backed or mock-data-backed
API, toggled by `USE_MOCK_DATA`. Sanity images are served via Sanity Image CDN
(WebP, quality 80-85, responsive sizes).

### Styling

Tailwind CSS v4 with CSS-based configuration (no `tailwind.config.*`). All
design tokens (colours, fonts, radii) defined as CSS custom properties in
`global.css`. Dark mode via `.dark` class with OS preference sync.

## Sanity Studio

The CMS lives in `studio-bero/` as a separate project.

### Setup

```sh
cd studio-bero
npm install
cp .env.example .env
```

| Variable                   | Required | Description                    |
|----------------------------|----------|--------------------------------|
| `SANITY_STUDIO_PROJECT_ID` | Yes      | Sanity project ID              |
| `SANITY_STUDIO_DATASET`    | Yes      | Sanity dataset name            |
| `SANITY_STUDIO_APP_ID`     | No       | Sanity app ID (for deployment) |

### Scripts

| Script           | Description                   |
|------------------|-------------------------------|
| `npm run dev`    | Start Studio locally          |
| `npm run deploy` | Deploy Studio to Sanity cloud |
| `npm run lint`   | Lint with Biome               |

### Schema

- **portfolio** -- Document type with localized title, slug,
  excerpt, description, date, images (with hotspot), and tags
- **localizedSlug** -- Object type generating one slug field
  per language, auto-derived from title

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

Tests live in `e2e/`, organized by feature. Two projects: `chromium` (desktop)
and `mobile` (iPhone 12). Tags `@desktop` / `@mobile` for platform-specific
tests. E2E runs use `USE_MOCK_DATA=true` automatically.

```sh
npm run test:e2e
npm run test:e2e:ui    # interactive mode
```

## Deployment

Hosted on **Cloudflare Pages** with auto-deploy from Git. Configuration in `wrangler.jsonc`.

- Build output: `./dist/`
- Compatibility flags: `nodejs_compat`, `global_fetch_strictly_public`
- Preview builds available for PRs via Cloudflare dashboard

To preview locally with the Cloudflare runtime:

```sh
npm run preview
```

## Linting and Git Hooks

**Linter:** Biome via Ultracite (`biome.json` extends `ultracite/core` + `ultracite/astro`).

**Pre-commit hook:** Husky runs `lint-staged` on staged
`*.{js,ts,jsx,tsx,astro}` files, auto-fixing lint issues before commit.

```sh
npm run lint       # check
npm run lint:fix   # auto-fix
```
