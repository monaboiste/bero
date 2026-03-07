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

- Secure access via Sanity.io
- Add/edit/delete projects
- Manage translations
- Update legal content
- No-code editing for non-technical users

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
| CMS        | **Sanity.io**        | Free tier, no-code editing                          |
| Hosting    | **Cloudflare Pages** | Free, global CDN                                    |
| Forms      | **Web3Forms**        | Serverless, spam filtering (CF Functions as backup) |

---

## 8. Non-Functional Requirements

| Aspect      | Requirement                                         |
| ----------- | --------------------------------------------------- |
| Performance | Lighthouse 90+, .webp/.avif images, lazy loading    |
| SEO         | Semantic HTML, meta tags, Open Graph, sitemap       |
| Security    | HTTPS enforced, no tracking cookies without consent |
| Cost        | **0 USD/month** (excluding domain)                  |

---

## 9. Deployment

- **Platform:** Cloudflare Pages
- **Method:** Auto-deploy from Git
- **Features:** Preview builds for PRs, global CDN

---

## 10. Image Optimization

| Feature    | Implementation                  |
| ---------- | ------------------------------- |
| CDN        | Sanity.io Image CDN (free tier) |
| Formats    | Auto-conversion to WebP/AVIF    |
| Responsive | Dynamic srcset via URL params   |
| Loading    | Native lazy loading             |

**URL Example:** `image.sanity.io/.../image.jpg?w=800&fm=webp&q=80`

---

## 11. Future Considerations

### Technical

| Topic                | Notes                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| Analytics            | Cloudflare Web Analytics - free, privacy-first, GDPR compliant, no cookies |
| Backup Strategy      | Sanity CLI export for periodic backups (post-MVP)                          |
| Content Versioning   | Sanity built-in history - configure rollback UI if needed                  |
| Interaction Tracking | Custom events for clicks, time-on-element (evaluate after launch)          |

### Features

| Feature             | Description                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Before/After Slider | Image comparison slider for project transformations (e.g. `img-comparison-slider`)                                                    |
| FAQ Section         | Common questions with Schema.org markup for SEO (delivery, timeline, fabric samples)                                                  |
| Testimonials        | Customer reviews with optional project photos (requires GDPR consent)                                                                 |
| Quote Request Form  | Extend contact form with optional fields: inquiry type, furniture photos (max 3-5), furniture type. Conditional UI based on selection |
