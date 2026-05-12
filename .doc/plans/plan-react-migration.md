# Plan: Astro to React Component Migration

## Overview

Migrate all 39 Astro components to React, incrementally (one by one). Use Tailwind for styling, `motion/react` for
animations, `lucide-react` for icons, and `@testing-library/react` for unit tests. All interactive components are fully
custom (no headless UI library). Layout/SEO/Page wrappers stay in Astro; sections and UI components become React.

---

## Architecture Decisions

| Decision                       | Choice                                                                                                       |
|--------------------------------|--------------------------------------------------------------------------------------------------------------|
| Layout, SEOHead, JsonLd, pages | **Stay as Astro** (zero-JS SSR wrappers)                                                                     |
| UI components + sections       | **Migrate to React**                                                                                         |
| Hydration                      | **`client:visible`** (lazy hydration for sections below fold), `client:load` for Navigation                  |
| Animations                     | **`motion/react`** (`<motion.div>`, `useInView`)                                                             |
| Icons                          | **`lucide-react`** (replaces `@lucide/astro`)                                                                |
| Component library              | **Custom components** (fully custom with manual a11y; may adopt Base UI in the future)                       |
| Testing                        | **`@testing-library/react`** + Vitest (React components), keep AstroContainer for remaining Astro components |
| Build mode                     | **SSG** (static site generation)                                                                             |
| Images                         | Pass optimized image URLs from Astro pages as props (Astro handles optimization at build time)               |

---

## Component Library Rationale

**All custom components** — no external headless UI library for now.

- All interactive components (LanguageSelector, MobileMenu, ThemeToggle) are built from scratch with
  manual a11y attributes (`aria-expanded`, `aria-haspopup`, `role`, keyboard handlers).
- A custom `useFocusTrap` hook handles focus trapping for the MobileMenu.
- This approach keeps dependencies minimal and avoids coupling to any specific library API.
- **Future consideration:** Base UI (the successor to MUI Base / unstyled) is being evaluated as a
  potential headless primitive library. It's CSS-engine-agnostic and would work with both Tailwind
  and StyleX if we adopt it later.

---

## New Dependencies

### Production

```
lucide-react
```

### Development

```
@testing-library/react
@testing-library/jest-dom
@testing-library/user-event
@vitejs/plugin-react (already present via @astrojs/react)
vite-tsconfig-paths
```

Already installed: `react`, `react-dom`, `motion`, `@astrojs/react`, `@types/react`, `@types/react-dom`

---

## Test Configuration

Due to React 19's module resolution requirements, tests are split into two configs:

- **`vitest.config.ts`** — Astro component tests (`.test.ts` files), uses `getViteConfig` from Astro
- **`vitest.config.react.ts`** — React component tests (`.test.tsx` files), uses `@vitejs/plugin-react` +
  `vite-tsconfig-paths`

Scripts:

- `npm run test:unit` — runs both Astro and React tests sequentially
- `npm run test:unit:astro` — Astro tests only
- `npm run test:unit:react` — React tests only

---

## Component Organization (Target Structure)

```txt
src/components/
├── ui/                          # Generic, reusable React components
│   ├── Button.tsx              # CTA button (link-style and submit)
│   ├── Card.tsx                # Image card with hover effects
│   ├── IconBadge.tsx           # Rounded icon container
│   ├── Logo.tsx                # Company logo component
│   ├── SectionHeader.tsx       # Section title + decoration
│   ├── SocialLinks.tsx         # Social media links
│   ├── TagFilter.tsx           # Tag filter buttons (interactive)
│   ├── ThemeToggle.tsx         # Dark/light toggle (interactive)
│   ├── LanguageSelector.tsx    # Language switcher (interactive, custom dropdown)
│   ├── navigation/
│   │   ├── Navigation.tsx      # Main nav bar (interactive)
│   │   ├── NavLinks.tsx        # Reusable link list
│   │   ├── MobileMenu.tsx      # Mobile menu panel (interactive, custom + focus trap)
│   │   └── MobileMenuButton.tsx
│   ├── footer/
│   │   ├── Footer.tsx          # Site footer
│   │   └── FooterLinks.tsx     # Footer link section
│   ├── form/
│   │   ├── FormField.tsx
│   │   └── FormStatus.tsx
│   └── gallery/
│       └── GridGallery.tsx     # Gallery with GLightbox (interactive)
├── hooks/
│   ├── useFocusTrap.ts         # Focus trap hook for MobileMenu
│   └── useTheme.ts            # Theme toggle hook (classList + localStorage)
├── hero/
│   └── Hero.tsx                # Hero section
├── about/
│   ├── About.tsx               # About section orchestrator
│   ├── StorySection.tsx
│   ├── AboutStats.tsx
│   ├── StatCard.tsx
│   ├── AboutServices.tsx
│   └── ServiceCard.tsx
├── projects/
│   ├── Projects.tsx
│   └── ProjectCard.tsx
├── contact/
│   ├── Contact.tsx
│   ├── ContactInfo.tsx
│   ├── ContactForm.tsx         # Interactive form with state
│   └── MapEmbed.tsx
├── pages/
│   ├── PortfolioPage.tsx       # Portfolio page content
│   └── PrivacyPolicyPage.tsx   # Privacy policy content
├── seo/                         # STAYS ASTRO (no change)
│   ├── SEOHead.astro
│   └── JsonLd.astro
```

---

## Migration Order (Incremental, Bottom-Up)

### Phase 1: Setup & UI Primitives ✅ COMPLETED

#### 1.0 — Install Dependencies & Configure Testing ✅

- Installed production and dev dependencies
- Created dual vitest config (`vitest.config.ts` for Astro, `vitest.config.react.ts` for React)
- Created `src/test/setup-react.ts` with `@testing-library/jest-dom` matchers

#### 1.1 — `ui/IconBadge.tsx` ✅

- Accepts `icon` (Lucide icon component), `size` (sm/md/lg)
- Pure presentational, no interactivity
- 6 tests passing

#### 1.2 — `ui/form/FormField.tsx` ✅

- Accepts `label`, `name`, `type` (text/email/textarea), `required`, `rows`
- Controlled or uncontrolled (accepts `value`/`onChange` optionally)
- 11 tests passing

#### 1.3 — `ui/form/FormStatus.tsx` ✅

- Accepts `variant` (success/error), `visible`, `children`
- Uses `role="alert"` for errors, `role="status"` for success
- 8 tests passing

#### 1.4 — `ui/SocialLinks.tsx` ✅

- Accepts `links` array with `{ href, icon, label }`
- Uses generic `ComponentType<SVGProps>` for icons (works with lucide-react and custom SVGs)
- 9 tests passing

#### 1.5 — `ui/Card.tsx` ✅

- Accepts `image: { src, alt }`, `date?`, `children`
- Preserves hover effects via Tailwind
- 8 tests passing

#### 1.6 — `ui/SectionHeader.tsx` ✅

- Accepts `title`, `subtitle?`, `as?` (heading tag)
- Uses `motion/react` for scroll-triggered animation (`useInView`)
- 9 tests passing

#### 1.7 — `ui/Logo.tsx` ✅

- Accepts `variant`, `size`, `lang`, `svgComponent?`
- Uses `useTranslations` and `useTranslatedPath` internally
- 11 tests passing

#### 1.8 — `ui/Button.tsx` ✅

- Accepts `href?`, `variant` (primary/secondary/ghost), `children`, `type?`, `disabled`
- Renders `<a>` for links, `<button>` for actions
- 12 tests passing

---

### Phase 2: Interactive UI Components

#### 2.0 — `hooks/useFocusTrap.ts`

- Custom hook that traps focus within a container element when active
- Handles Tab / Shift+Tab cycling, restores focus on deactivation
- ~25 lines, no external deps
- Test: focus cycles within trap, Escape callback

#### 2.1 — `ui/ThemeToggle.tsx`

- Uses custom `useTheme` hook (reads/writes classList + localStorage)
- Uses lucide-react `Sun`/`Moon` icons
- Test: toggles theme on click

#### 2.2 — `ui/LanguageSelector.tsx`

- Custom dropdown: `useState` for open/close, positioned div overlay
- Keyboard navigation (ArrowUp/Down, Escape, Enter), `aria-expanded`/`aria-haspopup`
- Inline buttons mode for mobile
- Accepts `lang`, `variant` (dropdown/inline)
- Test: shows current language, opens menu, keyboard nav works

#### 2.3 — `ui/TagFilter.tsx`

- Accepts `tags`, `activeTag`, `onTagChange`
- Test: highlights active tag, calls callback

#### 2.4 — `ui/navigation/NavLinks.tsx`

- Static link list, row or column direction
- Test: renders all nav items

#### 2.5 — `ui/navigation/MobileMenuButton.tsx`

- Triggers mobile menu open state
- Test: renders button, calls toggle

#### 2.6 — `ui/navigation/MobileMenu.tsx`

- Custom slide-in panel with CSS transitions (transform + opacity)
- Uses `useFocusTrap` hook when open
- Sets `aria-hidden` on main content when open
- Test: opens/closes, renders nav links, focus trapped

#### 2.7 — `ui/navigation/Navigation.tsx`

- Orchestrates all nav sub-components
- Manages mobile open state via `useState`
- Test: renders logo, nav links, controls

#### 2.8 — `ui/footer/FooterLinks.tsx`

- Link list section with title
- Test: renders title and links

#### 2.9 — `ui/footer/Footer.tsx`

- Full footer composition
- Test: renders about text, social links, link sections, copyright

---

### Phase 3: Section Components

Each section receives `lang: Lang` as prop and internally calls `useTranslations(lang)`.

#### 3.1 — `hero/Hero.tsx`

- Full-screen hero with background image, animated title, dual CTAs
- Uses motion/react for entrance animations
- Image URL passed as prop from Astro page

#### 3.2 — About section

- `about/ServiceCard.tsx` — service card with spring animation
- `about/StatCard.tsx` — stat card with counter animation
- `about/AboutServices.tsx` — services grid
- `about/AboutStats.tsx` — stats grid
- `about/StorySection.tsx` — two-column story
- `about/About.tsx` — orchestrator

#### 3.3 — Projects section

- `projects/ProjectCard.tsx` — uses Card component
- `projects/Projects.tsx` — projects grid + CTA

#### 3.4 — Contact section

- `contact/MapEmbed.tsx` — iframe embed
- `contact/ContactInfo.tsx` — info list with stagger animation
- `contact/ContactForm.tsx` — form with state, validation, honeypot
- `contact/Contact.tsx` — orchestrator

---

### Phase 4: Page Components & Gallery

#### 4.1 — `ui/gallery/GridGallery.tsx`

- GLightbox integration via `useEffect`
- Custom pointer-event swipe navigation
- Mobile description toggle
- Scroll-triggered tile animations

#### 4.2 — `pages/PortfolioPage.tsx`

- Gallery page with tag filtering
- Orchestrates TagFilter + GridGallery

#### 4.3 — `pages/PrivacyPolicyPage.tsx`

- Static translated content page

---

### Phase 5: Integration & Cleanup

- Update Astro pages to import React components with `client:visible` / `client:load`
- Remove old `.astro` component files (once React equivalents are verified)
- Update test configuration
- Run E2E tests to verify no regressions
- Remove `@lucide/astro` and `simple-icons-astro` from dependencies

---

## Key Patterns

### i18n in React Components

```tsx
// i18n functions are pure (not React hooks) — they work in React directly
interface HeroProps {
  lang: Lang;
}

export function Hero({lang}: HeroProps) {
  const t = useTranslations(lang);
  const tp = useTranslatedPath(lang);
  // ...
}
```

### Animations with motion/react

```tsx
import {motion, useInView} from "motion/react";
import {useRef} from "react";

export function SectionHeader({title}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, {once: true, margin: "-100px"});

  return (
    <motion.div
      ref={ref}
      initial={{opacity: 0, y: -30}}
      animate={isInView ? {opacity: 1, y: 0} : {}}
      transition={{duration: 0.8}}
    >
      <h2>{title}</h2>
    </motion.div>
  );
}
```

### Hydration in Astro Pages

```astro
---
// [locale]/index.astro
import { Hero } from "@components/hero/Hero";
const lang = getLang(Astro.currentLocale);
---
<Layout>
  <Hero client:visible lang={lang} />
  <Projects client:visible lang={lang} projects={projects} />
  <About client:visible lang={lang} />
  <Contact client:visible lang={lang} />
</Layout>
```

### Testing with @testing-library/react

```tsx
import {render, screen} from "@testing-library/react";
import {describe, expect, test} from "vitest";
import {SectionHeader} from "./SectionHeader";

describe("SectionHeader", () => {
  test("renders title", () => {
    render(<SectionHeader title="O nas"/>);
    expect(screen.getByText("O nas")).toBeInTheDocument();
  });
});
```

---

## Special Considerations

| Challenge                         | Solution                                                                     |
|-----------------------------------|------------------------------------------------------------------------------|
| `astro:assets` Image (Hero)       | Pass optimized image URL from Astro page as prop                             |
| GLightbox (GridGallery)           | `useEffect` to initialize on mount; `client:visible` hydration               |
| Theme toggle                      | Custom `useTheme` hook (classList + localStorage)                            |
| Navigation scroll                 | Standard hash links — browser handles anchor scrolling                       |
| SVG imports (Logo)                | Import SVG as React component or inline SVG                                  |
| `data-testid` preservation        | All React components maintain same `data-testid` attrs (E2E tests unchanged) |
| CSS `@media (scripting: enabled)` | Replace with motion/react — React requires JS anyway                         |
| Future StyleX migration           | Custom components with separated style classes; Base UI under consideration  |
| Focus trapping (MobileMenu)       | Custom `useFocusTrap` hook (~25 lines, no external deps)                     |
| Keyboard a11y (LanguageSelector)  | Manual ArrowUp/Down/Escape/Enter handlers + aria attributes                  |

---

## Testing Strategy

| Component type                | Testing approach                                             |
|-------------------------------|--------------------------------------------------------------|
| React components (`.tsx`)     | `@testing-library/react` + Vitest (`vitest.config.react.ts`) |
| Remaining Astro (Layout, SEO) | AstroContainer + happy-dom (`vitest.config.ts`)              |
| i18n utilities                | Pure function tests (unchanged, runs under Astro config)     |
| E2E                           | Playwright (unchanged — `data-testid` attrs preserved)       |

---

## What Stays Unchanged

- `src/layouts/Layout.astro` — Astro (HTML shell, dark mode script, fonts)
- `src/components/seo/SEOHead.astro` — Astro (pure `<head>` meta tags)
- `src/components/seo/JsonLd.astro` — Astro (pure `<script type="application/ld+json">`)
- `src/pages/*.astro` — Astro (file-based routing, pass props to React islands)
- `src/i18n/*` — unchanged (pure functions work in both Astro and React)
- `src/lib/*` — unchanged (data layer)
- `src/styles/global.css` — unchanged (Tailwind v4 theme tokens)
- E2E tests — unchanged (same rendered HTML, same `data-testid`s)

---

## Migration Pattern (Per Component)

1. Create `.tsx` file alongside existing `.astro` file
2. Write tests with `@testing-library/react`
3. Verify tests pass
4. Update Astro page/parent to import React version with `client:*` directive
5. Verify E2E tests still pass
6. Delete old `.astro` file
7. Update old `.test.ts` → `.test.tsx` (if testing logic changed)
