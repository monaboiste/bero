# SEO Implementation Plan for studio-bero.com

**Domain:** studio-bero.com
**Stack:** Astro 5 + Sanity CMS + Cloudflare Pages
**Locales:** pl (default), en, de

---

## Current State — What's Already in Place

| Area                          | Status  | Details                                                                 |
| ----------------------------- | ------- | ----------------------------------------------------------------------- |
| Title tags                    | Done    | Per-page, localized titles with brand name                              |
| Meta descriptions             | Done    | Per-page, localized descriptions                                        |
| Open Graph basics             | Partial | `og:title`, `og:description`, `og:type` present                        |
| Twitter Card basics           | Partial | `summary_large_image`, title, description                               |
| Hreflang alternates           | Done    | All 3 locales + `x-default` generated in `SEOHead.astro`               |
| `<html lang>`                 | Done    | Dynamically set per locale (`Layout.astro:21`)                          |
| Semantic HTML                 | Done    | `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`, headings      |
| Homepage h1                   | Done    | Single `<h1>` in Hero section                                          |
| Image alt text                | Done    | Localized alt text on hero/about images, project titles on cards        |
| Image optimization            | Partial | Astro `<Image>` for hero/about (eager/lazy), Sanity CDN WebP 80-85%    |
| Lazy loading                  | Done    | Gallery, cards, map iframe all use `loading="lazy"`                     |
| Font preconnect               | Done    | `preconnect` hints for Google Fonts with `display=swap`                 |
| External link security        | Done    | `rel="noopener noreferrer"` on social links                            |
| SSG                           | Done    | All content pages are pre-rendered static HTML                          |
| Translated URL slugs          | Done    | `/pl/polityka-prywatnosci`, `/en/privacy-policy`, `/de/datenschutzerklarung` |
| Locale prefix on all routes   | Done    | Even default locale gets `/pl/` prefix                                  |
| SEO component tests           | Done    | Unit tests for SEOHead covering title, description, OG, Twitter tags    |

---

## Phase 1 — Critical (High Priority)

### 1.1 Set `site` in Astro config

- **Files:** `astro.config.mjs`
- **What:** Add `site: "https://studio-bero.com"` — required by sitemap, canonical URLs, and OG URL generation.

### 1.2 Add `<link rel="canonical">`

- **Files:** `src/components/seo/SEOHead.astro`
- **What:** Generate canonical URL from `Astro.url` + `Astro.site`. Always render, never conditional. Every page must have a self-referencing canonical URL.

### 1.3 Always render `og:url`

- **Files:** `src/components/seo/SEOHead.astro`
- **What:** Derive from `Astro.url` + `Astro.site` instead of relying on the optional `url` prop. Remove conditional rendering so `og:url` is always present.

### 1.4 Add default OG image fallback

- **Files:** `src/components/seo/SEOHead.astro`
- **What:** When no `image` prop is passed, fall back to `/og-image.png` (absolute URL using `Astro.site`). Always render `og:image` and `twitter:image`.
- **Blocker:** OG image file (1200x630px) to be provided and placed in `public/og-image.png`.

### 1.5 Install `@astrojs/sitemap`

- **Files:** `package.json`, `astro.config.mjs`
- **What:** Add `@astrojs/sitemap` integration with i18n config for all 3 locales. Auto-generates `sitemap-index.xml` with all static paths.

### 1.6 Add `robots.txt`

- **Files:** `public/robots.txt` (new)
- **Content:**
  ```
  User-agent: *
  Allow: /
  Sitemap: https://studio-bero.com/sitemap-index.xml
  ```

### 1.7 Fix `<h1>` on sub-pages

- **Files:** `src/components/ui/SectionHeader.astro`, `src/components/pages/PortfolioPage.astro`, `src/components/pages/PrivacyPolicyPage.astro`
- **What:** Add an `as` prop to `SectionHeader` (default `"h2"`) so sub-pages can pass `as="h1"`. Update `PortfolioPage` and `PrivacyPolicyPage` to use `as="h1"`.

### 1.8 Update SEOHead tests

- **Files:** `src/components/seo/SEOHead.test.ts`
- **What:** Add tests for canonical URL, always-present `og:url`, default `og:image`, robots meta tag.

---

## Phase 2 — Important (Medium Priority)

### 2.1 Add `og:locale`, `og:locale:alternate`, `og:site_name`

- **Files:** `src/components/seo/SEOHead.astro`
- **What:** Map locales to OG format (`pl` -> `pl_PL`, `en` -> `en_US`, `de` -> `de_DE`). Add `og:site_name` from `t("seo.title")`.

### 2.2 Add `<meta name="robots">`

- **Files:** `src/components/seo/SEOHead.astro`
- **What:** New `robots` prop (default `"index, follow"`). Set `noindex, follow` on the 404 page. Optionally set `noindex` on privacy policy page.

### 2.3 Fix `x-default` hreflang

- **Files:** `src/components/seo/SEOHead.astro`
- **What:** Change `x-default` to point to `/` (SSR language dispatcher) instead of bare path without locale prefix, which may not resolve to a valid page.

### 2.4 Add JSON-LD structured data

- **Files:** New `src/components/seo/JsonLd.astro`, modify `src/layouts/Layout.astro`
- **Schemas to add:**
  - **`Organization`** on all pages — name, logo URL, social profiles
  - **`LocalBusiness`** on homepage — name, address, phone, services, opening hours, geo coordinates
  - **`WebSite`** on homepage — name, URL
  - **`BreadcrumbList`** on sub-pages — e.g., Home > Portfolio
- **Blocker:** Business info (address, phone, opening hours, geo coordinates) to be provided.

### 2.5 Localized 404 page

- **Files:** `src/pages/404.astro`
- **What:** The 404 page is currently always in Polish regardless of user language. Detect locale from `document.location.pathname` client-side and swap content. Cloudflare serves a single `/404.html`, so client-side detection is the practical approach.

### 2.6 Cloudflare Web Analytics

- **Files:** `src/layouts/Layout.astro`
- **What:** Add the Cloudflare analytics beacon `<script>` before `</body>`.
- **Blocker:** Cloudflare site token (from Cloudflare dashboard > Web Analytics).

---

## Phase 3 — Nice to Have (Lower Priority)

### 3.1 Self-host fonts

- **Files:** `src/layouts/Layout.astro`, `src/styles/`
- **What:** Download Montserrat + Comforter Brush, serve from `public/fonts/`. Eliminates Google Fonts as a render-blocking external resource. Improves Core Web Vitals (LCP, FCP).

### 3.2 Add `width`/`height` to Sanity images

- **Files:** `src/components/ui/Card.astro`, `src/components/ui/gallery/GridGallery.astro`
- **What:** Add explicit dimensions to prevent CLS. Or switch to Astro's `<Image>` component with remote image support.

### 3.3 Favicon variants

- **Files:** `public/`, `src/layouts/Layout.astro`
- **What:** Add `apple-touch-icon.png` (180x180), `favicon-32x32.png`, `favicon-16x16.png`. Add corresponding `<link>` tags in `Layout.astro`.

### 3.4 Web app manifest

- **Files:** `public/site.webmanifest` (new), `src/layouts/Layout.astro`
- **What:** Add basic manifest with app name, icons, theme color. Link in `<head>`.

### 3.5 Mark 404 SVG `aria-hidden`

- **Files:** `src/pages/404.astro`
- **What:** Add `aria-hidden="true"` to the decorative SVG illustration.

---

## Dependencies / Blockers

Items that require external input before implementation:

| # | Item                                      | Status  |
| - | ----------------------------------------- | ------- |
| 1 | OG image file (1200x630px)                | Pending |
| 2 | Business info for JSON-LD (address, phone, hours, geo) | Pending |
| 3 | Cloudflare Web Analytics token            | Pending |
| 4 | Google Search Console verification code   | Pending |

All code will be set up with clear placeholders/TODOs where these values are needed.

---

## Estimated Changes

- **~6 files modified:** SEOHead, Layout, astro.config, SectionHeader, PortfolioPage, PrivacyPolicyPage
- **~3 new files:** `robots.txt`, `JsonLd.astro`, `site.webmanifest`
- **~1 new dependency:** `@astrojs/sitemap`
- **Test updates** for SEOHead component
