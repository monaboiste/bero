# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and
sharp-edge notes that should travel with the code.

Add durable project-specific notes here as they are discovered through real work.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project. Do not repeat what the
codebase already shows; point to the authoritative file or command instead. Prefer rewriting or pruning existing entries
over appending new ones. When updating this file, preserve this bar for all agents and keep entries concise.

## Project

BERO is a static-first, multilingual portfolio website focused on SEO, performance, and content managed through Sanity.

Stack: Astro, TypeScript, React islands, Tailwind, Sanity. npm-workspaces monorepo.

## Setup

```sh
fnm use
npm install
````

Copy `apps/web/.env.example` to `apps/web/.env`. Use `USE_MOCK_DATA=true` when Sanity access is unavailable.

## Commands

Run from repository root:

* `npm run dev`
* `npm run build`
* `npm run check`
* `npm run lint`
* `npm run test:unit`
* `npm run test:e2e`

## Architecture

* `apps/web` is the deployable frontend.
* `apps/studio` contains Sanity schemas and authoring UI.
* Shared code belongs in `packages/*`.
* `packages/*` must never depend on `apps/*`.

Content access goes through `PortfolioService`:

* `packages/sanity` provides the CMS implementation.
* `packages/fixture` provides mock data.

## i18n

Supported languages are defined in `packages/locales`. Keep translations and localized routes synchronized.

## Verification

Run only relevant checks:

* Type changes → `npm run check`
* Lint/format → `npm run lint`
* Logic changes → `npm run test:unit`
* UI/routing/localization → `npm run test:e2e`
