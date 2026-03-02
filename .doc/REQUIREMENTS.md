# Upholstery Portfolio Web Application

## 1. Overview

Portfolio website for an upholstery business serving as a marketing platform and digital business card.

**Key Goals:**

- Zero hosting costs (excluding domain)
- SEO excellence (Lighthouse 90+)
- Full GDPR/RODO compliance
- Robust spam protection

---

## 2. Pages & Features

| Page               | Content                                                |
| ------------------ | ------------------------------------------------------ |
| **Home**           | Company intro, featured projects, CTA to contact       |
| **Projects**       | Gallery with title, description, images, optional date |
| **About**          | Company story, experience, services                    |
| **Contact**        | GDPR-compliant form with spam protection               |
| **Privacy Policy** | Data controller info, user rights, retention policy    |

---

## 3. Multilingual Support (i18n)

- **Primary:** Polish (PL)
- **Secondary:** English (EN)
- **Future:** German (DE)
- **Routing:** `/pl`, `/en`, `/de`
- Language switcher in UI

---

## 4. Contact Form

### Fields

- Name, Email, Message (required)
- Consent checkbox (unchecked by default, mandatory)

### GDPR Requirements

- Data minimization (only essential fields)
- Clear information clause with data controller details
- Link to Privacy Policy
- Submission blocked without consent

### Spam Protection (Multi-layered)

1. **Cloudflare Turnstile** - invisible CAPTCHA alternative
2. **Honeypot** - hidden field to trap bots
3. **Provider AI filtering** - server-side spam detection
4. **Rate limiting** - prevent mail bombing

---

## 5. Admin Panel (CMS)

- **Initial phase:** Decap CMS (git-based, `/admin` route)
- Add/edit/delete projects
- Manage translations
- Update legal content
- No-code editing for non-technical users
- Content stored as Markdown files in repository
- **Future:** switchable to API-based headless CMS (e.g. Sanity) via ContentProvider abstraction

---

## 6. Theming

- Light/Dark mode with OS sync
- CSS Variables for customization
- Mobile-first responsive design

---

## 7. Technology Stack

| Layer      | Technology           | Purpose                                             |
| ---------- | -------------------- | --------------------------------------------------- |
| Framework  | **Astro**            | SSG, SEO, performance                               |
| Language   | **TypeScript**       | Type safety                                         |
| Styling    | **Tailwind CSS**     | Rapid styling, theming                              |
| Components | **DaisyUI**          | Tailwind-based component library                    |
| CMS        | **Decap CMS**        | Git-based, no-code editing, `/admin` route          |
| Hosting    | **Cloudflare Pages** | Free, global CDN                                    |
| Forms      | **Web3Forms**        | Serverless, spam filtering (CF Functions as backup) |

---

## 8. Content Architecture

### Content Model

Each project (realization) has the following fields:

- `title` – project title
- `description` – short description
- `date` – publication date
- `images` – array of image paths
- `slug` – URL-friendly identifier
- `language` – `pl | en | de`

### Folder Structure

```
src/
  content/
    realizations/
      pl/
      en/
      de/
```

Each language version is a separate Markdown file, e.g.:

```
src/content/realizations/pl/sofa-renovation.md
src/content/realizations/en/sofa-renovation.md
src/content/realizations/de/sofa-renovation.md
```

### ContentProvider Abstraction

To avoid vendor lock-in, content access is routed through a `ContentProvider` interface:

```ts
interface ContentProvider {
  getAllRealizations(lang: string): Promise<Realization[]>
  getRealizationBySlug(slug: string, lang: string): Promise<Realization>
}
```

- **Default:** `AstroContentProvider` – reads from Astro collections, fully static
- **Future:** `ApiContentProvider` – fetches from headless CMS (e.g. Sanity), switchable via config

---

## 9. Non-Functional Requirements

| Aspect      | Requirement                                         |
| ----------- | --------------------------------------------------- |
| Performance | Lighthouse 90+, .webp/.avif images, lazy loading    |
| SEO         | Semantic HTML, meta tags, Open Graph, sitemap       |
| Security    | HTTPS enforced, no tracking cookies without consent |
| Cost        | **0 USD/month** (excluding domain)                  |

---

## 10. Deployment

- **Platform:** Cloudflare Pages
- **Method:** Auto-deploy from Git (content commits trigger rebuild)
- **Features:** Preview builds for PRs, global CDN

---

## 11. Image Optimization

| Feature    | Implementation                         |
| ---------- | -------------------------------------- |
| Storage    | In-repository (initial phase)          |
| Formats    | Build-time conversion to WebP/AVIF     |
| Responsive | srcset via Astro image optimization    |
| Loading    | Native lazy loading                    |

**Scalability path:** If repository grows too large, images move to object storage (S3 / Cloudflare R2). Markdown frontmatter references CDN URLs. No changes to components required.

---

## 12. Deployment Phases

| Phase | Scope |
| ----- | ----- |
| **Phase 1 – MVP** | Astro collections, Decap CMS, manual translations, images in repo, static hosting |
| **Phase 2 – Optimization** | CDN-based image storage, gallery pagination improvements, SEO refinement |
| **Phase 3 – Automation** | n8n translation pipeline (PL → EN/DE via DeepL or OpenAI), `needsReview` flag, editor review in Decap |
| **Phase 4 – Scaling** | Switch ContentProvider to API-based headless CMS, preview environment |

---

## 13. Future Considerations

### Technical

| Topic                | Notes                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| Analytics            | Cloudflare Web Analytics - free, privacy-first, GDPR compliant, no cookies |
| Backup Strategy      | Git repository serves as content backup; additional export scripts post-MVP |
| Content Versioning   | Git history provides full content audit trail                              |
| Interaction Tracking | Custom events for clicks, time-on-element (evaluate after launch)          |

### Features

| Feature             | Description                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Before/After Slider | Image comparison slider for project transformations (e.g. `img-comparison-slider`)                                                    |
| FAQ Section         | Common questions with Schema.org markup for SEO (delivery, timeline, fabric samples)                                                  |
| Testimonials        | Customer reviews with optional project photos (requires GDPR consent)                                                                 |
| Quote Request Form  | Extend contact form with optional fields: inquiry type, furniture photos (max 3-5), furniture type. Conditional UI based on selection |
