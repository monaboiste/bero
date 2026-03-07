# CMS Implementation Plan: Sanity.io Integration

**Project:** Upholstery Services Marketing Website (BERO)
**Stack:** Astro 5.x + Sanity CMS + Cloudflare Pages
**Status:** Migrating from Decap CMS to Sanity.io

---

# 1. Context & Motivation

## Why migrate from Decap CMS?

Decap CMS has authorization issues when integrated with Cloudflare Pages. The GitHub OAuth backend does not work reliably in the Cloudflare Pages environment, making the editorial workflow unreliable.

## Why Sanity.io?

- Hosted backend — no auth infrastructure to maintain
- Real-time editing with Sanity Studio
- Powerful GROQ query language
- Built-in image CDN with on-the-fly transformations
- First-class i18n support via plugins
- Generous free tier (sufficient for this project)
- Full compatibility with Cloudflare Pages (API-based, no auth proxy needed)

---

# 2. Current Architecture Assessment

## Existing data flow (Decap CMS / feat-cms branch)

```
content.config.ts (Zod schema)
  → src/content/portfolio/*.md (Markdown files)
    → getCollection("portfolio") (Astro Content Collections)
      → src/lib/content.ts (helper functions)
        → Components (pages)
```

## Key files involved

| File | Role |
|---|---|
| `src/content.config.ts` | Zod schema for portfolio entries |
| `src/content/portfolio/*.md` | 3 Markdown content files |
| `src/lib/content.ts` | `getPortfolioEntries()`, `getLatestPortfolioEntries()` |
| `src/lib/tags.ts` | Tag definitions (armchairs, sofas, chairs, restoration, custom) |
| `public/admin/config.yml` | Decap CMS configuration (to be removed) |
| `src/pages/admin.html` | Decap CMS admin UI (to be removed) |

## Integration-friendly aspects

1. **Abstracted data layer** — Components consume data through helper functions in `src/lib/content.ts`, not directly from `getCollection()`. This means only the helper implementations need to change.
2. **Clear schema** — The Zod schema in `content.config.ts` maps directly to a Sanity document schema.
3. **Static prerendering** — All pages use `export const prerender = true`. Sanity data will be fetched at build time, same as current Markdown files.
4. **Minimal CMS surface** — Only portfolio content is managed by the CMS. Hero, About, Contact, and Footer sections remain hardcoded.

---

# 3. Target Architecture

## New data flow

```
Sanity Studio (schema + editing UI)
  → Sanity Content Lake (hosted)
    → @sanity/client + GROQ queries (build-time fetch)
      → src/lib/content.ts (helper functions — updated implementation)
        → Components (pages, unchanged)
```

## Architecture diagram

```
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  Sanity Studio   │────▶│  Sanity Content   │────▶│   Astro Build    │
│  (studio/)       │     │  Lake (hosted)    │     │   (src/)         │
│                  │     │                   │     │                  │
│  - Schema        │     │  - Documents      │     │  - Fetches via   │
│  - Editing UI    │     │  - Images (CDN)   │     │    GROQ at build │
│  - i18n plugin   │     │  - Assets         │     │  - Static HTML   │
└─────────────────┘     └──────────────────┘     └──────────────────┘
                                                          │
                                                          ▼
                                                 ┌──────────────────┐
                                                 │ Cloudflare Pages  │
                                                 │ (static deploy)   │
                                                 └──────────────────┘
```

## Rebuild trigger

```
Sanity webhook (on publish) → Cloudflare Pages Deploy Hook → rebuild
```

---

# 4. Scope

## In scope

- Portfolio content (projects/realizations) managed in Sanity
- Image hosting via Sanity CDN
- i18n-ready schema (document-level internationalization)
- Sanity Studio as a separate directory (`studio/`)

## Out of scope (for now)

- Hero, About, Contact, Footer sections — remain hardcoded
- Full i18n routing in Astro (separate effort)
- Preview/draft mode
- n8n translation automation

---

# 5. Sanity Schema Design

## Portfolio document

```ts
// studio/schemas/portfolio.ts
export default defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Fotele', value: 'armchairs' },
          { title: 'Sofy', value: 'sofas' },
          { title: 'Krzesla', value: 'chairs' },
          { title: 'Renowacja', value: 'restoration' },
          { title: 'Projekt indywidualny', value: 'custom' },
        ],
      },
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'Polski', value: 'pl' },
          { title: 'English', value: 'en' },
          { title: 'Deutsch', value: 'de' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Date (newest)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'featuredImage',
      language: 'language',
    },
    prepare({ title, date, media, language }) {
      return {
        title: `[${language?.toUpperCase()}] ${title}`,
        subtitle: date ? new Date(date).toLocaleDateString() : '',
        media,
      }
    },
  },
})
```

## i18n strategy: Document-level internationalization

Use the `@sanity/document-internationalization` plugin. Each portfolio entry exists as a separate document per language, linked by a shared translation reference.

Benefits:
- Clean GROQ filtering by language: `*[_type == "portfolio" && language == $lang]`
- Each language version can have different images if needed
- Simple mental model for editors
- Compatible with Astro's future i18n routing (`/pl/...`, `/en/...`, `/de/...`)

---

# 6. Implementation Plan

## Step 1: Install Sanity dependencies in Astro project

```bash
npm install @sanity/client @sanity/image-url
```

New files:
- `src/lib/sanity.ts` — Sanity client configuration + image URL builder

## Step 2: Create Sanity client configuration

```ts
// src/lib/sanity.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET || 'production',
  apiVersion: '2026-03-07',
  useCdn: true, // CDN for build-time fetches
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}
```

Environment variables (`.env`):
```
SANITY_PROJECT_ID=<project-id>
SANITY_DATASET=production
```

## Step 3: Update data helpers in `src/lib/content.ts`

Replace `getCollection("portfolio")` calls with Sanity GROQ queries. Keep the same function signatures so components remain unchanged.

```ts
// src/lib/content.ts — new implementation
import { sanityClient, urlFor } from './sanity'

const PORTFOLIO_QUERY = `*[_type == "portfolio" && language == "pl"] | order(date desc) {
  title,
  "slug": slug.current,
  date,
  highlight,
  featuredImage,
  excerpt,
  description,
  tags
}`

export async function getPortfolioEntries() {
  const entries = await sanityClient.fetch(PORTFOLIO_QUERY)
  return entries.map(mapSanityEntry)
}

export async function getLatestPortfolioEntries(count: number) {
  const query = `*[_type == "portfolio" && language == "pl"] | order(date desc) [0...${count}] {
    title,
    "slug": slug.current,
    date,
    highlight,
    featuredImage,
    excerpt,
    description,
    tags
  }`
  const entries = await sanityClient.fetch(query)
  return entries.map(mapSanityEntry)
}
```

The `mapSanityEntry` function will transform Sanity response shape into the existing type expected by components.

## Step 4: Update image handling in components

Replace Astro `<Image>` with standard `<img>` using Sanity CDN URLs.

Before:
```astro
<Image src={entry.data.featured_image} alt={entry.data.title} />
```

After:
```astro
<img src={urlFor(entry.featuredImage).width(800).format('webp').url()} alt={entry.title} />
```

Sanity image CDN provides:
- Automatic format conversion (WebP, AVIF)
- Resize on the fly
- Crop with hotspot data
- Global CDN delivery

## Step 5: Set up Sanity Studio (separate directory)

```bash
npm create sanity@latest -- --project-id <id> --dataset production --output-path studio
```

This creates a `studio/` directory with:
- `sanity.config.ts` — Studio configuration
- `schemas/` — Document schemas (portfolio.ts)
- `package.json` — Studio dependencies

Studio can be:
- Run locally: `npm run dev` (inside `studio/`)
- Deployed to `<project>.sanity.studio` for free

## Step 6: Configure rebuild webhook

1. In Sanity: Project Settings > API > Webhooks > Add webhook
   - URL: Cloudflare Pages deploy hook URL
   - Trigger on: Create, Update, Delete
   - Filter: `_type == "portfolio"`

2. In Cloudflare: Pages project > Settings > Builds & Deployments > Deploy hooks
   - Create a hook, copy URL to Sanity webhook config

## Step 7: Remove Decap CMS

Files to delete:
- `public/admin/config.yml`
- `src/pages/admin.html`
- `src/content/portfolio/*.md` (after migrating content to Sanity)
- `src/content.config.ts` (Astro Content Collections schema)
- `src/assets/cms/*.jpg` (after uploading to Sanity)

Dependencies to remove:
- `decap-server` from devDependencies

Scripts to remove:
- `dev:cms` from package.json

Environment variables to remove:
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`

## Step 8: Migrate existing content

Manually recreate the 3 existing portfolio entries in Sanity Studio:
1. Zestaw mebli tapicerowanych
2. Nowoczesny fotel tapicerowany
3. Renowacja fotela klubowego

Upload the 3 images from `src/assets/cms/` to Sanity.

---

# 7. Type Safety

Astro Content Collections provide automatic TypeScript types. With Sanity, types must be handled differently.

Options:
- **Option A:** Define types manually in `src/lib/types.ts` (simple, sufficient for small schema)
- **Option B:** Use `sanity-typegen` to auto-generate types from Sanity schema (better for larger projects)

Recommendation: Start with **Option A** (manual types), migrate to **Option B** when more content types are added.

```ts
// src/lib/types.ts
export interface PortfolioEntry {
  title: string
  slug: string
  date: string
  highlight: boolean
  featuredImage: SanityImageSource
  excerpt: string
  description: string
  tags: string[]
}
```

---

# 8. File Changes Summary

| File | Action | Description |
|---|---|---|
| `src/lib/sanity.ts` | **Create** | Sanity client + image URL builder |
| `src/lib/content.ts` | **Rewrite** | Replace `getCollection()` with GROQ queries |
| `src/lib/types.ts` | **Create** | TypeScript types for Sanity documents |
| `src/lib/tags.ts` | **Keep** | Tag definitions remain unchanged |
| Components using images | **Update** | Switch from `<Image>` to Sanity CDN URLs |
| `src/content.config.ts` | **Delete** | No longer needed |
| `src/content/portfolio/` | **Delete** | Content lives in Sanity now |
| `src/assets/cms/` | **Delete** | Images hosted on Sanity CDN |
| `public/admin/config.yml` | **Delete** | Decap CMS config |
| `src/pages/admin.html` | **Delete** | Decap CMS admin page |
| `studio/` | **Create** | Sanity Studio (separate directory) |
| `.env` | **Update** | Replace GitHub OAuth vars with Sanity project vars |
| `package.json` | **Update** | Add `@sanity/client`, `@sanity/image-url`; remove `decap-server` |

---

# 9. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Sanity API downtime during build | Low | High (build fails) | Sanity has 99.9% uptime SLA; builds can be retried |
| Image CDN latency | Low | Medium | Sanity CDN is global; comparable to Cloudflare |
| Type safety regression | Medium | Low | Manual types initially; add `sanity-typegen` later |
| Content migration errors | Low | Low | Only 3 entries to migrate; manual verification |
| Free tier limits exceeded | Low | Medium | Free plan: 100K API requests/month, 500K assets — sufficient for static builds |

---

# 10. Future Improvements

## Phase 2: Full i18n

- Install `@sanity/document-internationalization` in Studio
- Add language switcher in Sanity Studio
- Implement Astro i18n routing (`/pl/`, `/en/`, `/de/`)
- Filter content by `language` parameter in GROQ queries

## Phase 3: Additional content types

When needed, add Sanity schemas for:
- Hero section content
- About section (services, stats, story)
- Contact information
- Footer links
- SEO metadata

## Phase 4: Translation automation

- n8n webhook on new PL document → translate via DeepL/OpenAI → create EN/DE versions in Sanity
- Mark auto-translated documents with `needsReview: true` flag

## Phase 5: Preview mode

- Sanity provides real-time preview via `@sanity/preview-kit`
- Can be integrated with Astro SSR routes for draft content viewing
- Requires a non-prerendered route (compatible with Cloudflare Workers)

---

# 11. Estimated Effort

| Task | Time estimate |
|---|---|
| Install dependencies + Sanity client setup | 30 min |
| Create Sanity Studio + portfolio schema | 1 hour |
| Rewrite `src/lib/content.ts` + types | 1 hour |
| Update image handling in components | 30 min |
| Migrate 3 portfolio entries to Sanity | 30 min |
| Remove Decap CMS files + cleanup | 15 min |
| Configure webhook for auto-rebuild | 15 min |
| Testing + verification | 30 min |
| **Total** | **~4-5 hours** |
