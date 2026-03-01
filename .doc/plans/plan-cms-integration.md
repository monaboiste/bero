# CMS Implementation Plan

**Project:** Upholstery Services Marketing Website
**Stack:** Astro + Decap CMS (initial)
**Future-proofing:** Headless CMS abstraction ready (e.g., Sanity or other API-based CMS)

---

# 1. Goals & Architecture Principles

## Objectives

* Enable non-technical content editing
* Focus on gallery-based content (image-heavy realizations)
* Support PL / EN / DE
* Keep infrastructure simple and low-cost
* Avoid vendor lock-in
* Allow future migration to another headless CMS

---

## Architectural Principles

1. **Git-based CMS for initial phase**

   * Use **Decap CMS**
   * Content stored in repository
   * Static generation via Astro

2. **Stable abstraction layer**

   * Introduce a `ContentProvider` abstraction
   * Default implementation: Astro collections
   * Future implementations: API-based providers (e.g., Sanity)

3. **Separation of concerns**

   * CMS = content management
   * Astro = rendering layer
   * ContentProvider = integration boundary

---

# 2. Content Architecture

## Folder Structure

```
src/
  content/
    realizations/
      pl/
      en/
      de/
```

Each realization is a separate Markdown file per language.

Example:

```
src/content/realizations/pl/sofa-renovation.md
src/content/realizations/en/sofa-renovation.md
src/content/realizations/de/sofa-renovation.md
```

---

## Content Model (Astro Collection)

Basic schema:

* title
* description
* date
* images (array)
* slug
* language (pl | en | de)

Astro collections serve as the default content provider implementation.

---

# 3. Content Provider Abstraction

To avoid lock-in:

## Interface (Conceptual)

```
interface ContentProvider {
  getAllRealizations(lang: string): Promise<Realization[]>
  getRealizationBySlug(slug: string, lang: string): Promise<Realization>
}
```

## Default Implementation

* `AstroContentProvider`
* Reads from Astro collections
* No runtime API dependency
* Fully static generation

## Future Implementation

* `ApiContentProvider`
* Fetches from headless CMS (e.g., Sanity)
* Switchable via configuration
* No changes required in page components

This ensures migration cost is minimal and isolated.

---

# 4. Publishing Flow (Decap Phase)

## Authoring Flow

1. Editor logs into `/admin`
2. Creates new realization
3. Uploads images
4. Publishes entry
5. Decap commits Markdown file to repository

---

## Deployment Flow

1. Git commit triggers CI
2. CI runs:

   * Install
   * Astro build
3. Static site deployed (Netlify / Vercel / other)

---

## Runtime Flow

1. User visits site
2. Static HTML is served from CDN
3. Images loaded lazily
4. No backend required

---

# 5. Image Strategy

## Initial Phase

* Images stored in repository
* Optimized during build
* Lazy-loaded in frontend
* Pagination for gallery

## Scalability Consideration

If repository grows too large:

* Move images to object storage:

  * Amazon S3
  * Cloudflare (R2)
* Keep Markdown in repo
* Reference CDN URLs in frontmatter

This avoids repository bloat.

---

# 6. Internationalization (I18n)

## Strategy

Use separate files per language.

### URL structure:

```
/pl/realizacje/...
/en/projects/...
/de/projekte/...
```

## Benefits

* Clean SEO structure
* Separate meta tags per language
* Easy hreflang configuration
* Compatible with static generation

## Translation Workflow (Manual Phase)

1. Create PL version
2. Duplicate for EN and DE
3. Translate manually
4. Publish

Manual translation ensures quality for service-based business content.

---

# 7. Future Improvements

## 7.1 Translation Automation with n8n

Use **n8n** for semi-automated translation.

---

### Proposed Automation Flow

1. New PL Markdown committed

2. GitHub webhook triggers n8n

3. n8n:

   * Parses frontmatter + body
   * Sends content to translation API:

     * DeepL
     * or OpenAI
   * Generates EN and DE versions
   * Commits translated files
   * Marks entry as `needsReview: true`

4. Editor reviews translations in Decap

5. Publishes after verification

---

### Why Review Is Critical

* Service terminology may be misinterpreted
* Marketing tone must remain professional
* SEO keywords must be validated

Automation assists — it does not replace review.

---

## 7.2 Migration to API-Based Headless CMS

If content complexity increases:

* Many content types
* Dynamic landing pages
* Advanced editorial workflows
* Instant content updates without deploy

Possible migration target:

* Sanity

Because of the ContentProvider abstraction:

* Only provider implementation changes
* Page components remain untouched
* Routing and rendering logic stays stable

---

# 8. Risk Assessment

| Risk                       | Mitigation                            |
| -------------------------- | ------------------------------------- |
| Repository grows too large | Move images to CDN                    |
| Translation inconsistency  | Review workflow                       |
| CMS migration required     | ContentProvider abstraction           |
| Build times increase       | Pagination + incremental improvements |

---

# 9. Phase Plan

## Phase 1 – Minimal Viable CMS

* Astro collections
* Decap CMS
* Manual translations
* Images in repo
* Static hosting

## Phase 2 – Optimization

* CDN-based image storage
* Gallery pagination improvements
* SEO refinement

## Phase 3 – Automation

* n8n translation pipeline
* Translation review flag
* Optional AI tone refinement

## Phase 4 – Scaling (If Needed)

* Switch ContentProvider
* Integrate API-based headless CMS
* Introduce preview environment

---

# Final Recommendation

Start simple.

* Decap is sufficient.
* The architecture remains clean.
* Migration path is controlled.
* Infrastructure complexity stays minimal.

You are optimizing for clarity and maintainability first — not theoretical scalability.

