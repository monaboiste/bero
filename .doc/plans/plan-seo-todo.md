# SEO Implementation Plan for studio-bero.com

**Domain:** studio-bero.com
**Stack:** Astro 5 + Sanity CMS + Cloudflare Pages
**Locales:** pl (default), en, de

---

## Important (Medium Priority)

- **Files:** `src/components/seo/SEOHead.astro`
- **What:** Map locales to OG format (`pl` -> `pl_PL`, `en` -> `en_US`, `de` -> `de_DE`). Add `og:site_name` from
  `t("seo.title")`.

### 1.1 Localized 404 page

- **Files:** `src/pages/404.astro`
- **What:** The 404 page is currently always in Polish regardless of user language. Detect locale from
  `document.location.pathname` client-side and swap content. Cloudflare serves a single `/404.html`, so client-side
  detection is the practical approach.

### 1.2 Cloudflare Web Analytics

- **Files:** `src/layouts/Layout.astro`
- **What:** Add the Cloudflare analytics beacon `<script>` before `</body>`.
- **Blocker:** Cloudflare site token (from Cloudflare dashboard > Web Analytics).

---

## Nice to Have (Lower Priority)

### 2.1 Self-host fonts

- **Files:** `src/layouts/Layout.astro`, `src/styles/`
- **What:** Download Montserrat + Comforter Brush, serve from `public/fonts/`. Eliminates Google Fonts as a
  render-blocking external resource. Improves Core Web Vitals (LCP, FCP).

### 2.2 Add `width`/`height` to Sanity images

- **Files:** `src/components/ui/Card.astro`, `src/components/ui/gallery/GridGallery.astro`
- **What:** Add explicit dimensions to prevent CLS. Or switch to Astro's `<Image>` component with remote image support.

### 2.3 Favicon variants

- **Files:** `public/`, `src/layouts/Layout.astro`
- **What:** Add `apple-touch-icon.png` (180x180), `favicon-32x32.png`, `favicon-16x16.png`. Add corresponding `<link>`
  tags in `Layout.astro`.
