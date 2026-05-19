# Plan: Astro to React Component Migration

## Overview

Migrate all 39 Astro components to React, incrementally (one by one). Use Tailwind for styling, `motion/react` for
animations, `react-icons` for icons (unified library: `react-icons/lu` for Lucide, `react-icons/si` for Simple Icons),
and `@testing-library/react` for unit tests. All interactive components are fully custom (no headless UI library).
Layout/SEO/Page wrappers stay in Astro; sections and UI components become React.

---

## Architecture Decisions

| Decision                       | Choice                                                                                                       |
|--------------------------------|--------------------------------------------------------------------------------------------------------------|
| Layout, SEOHead, JsonLd, pages | **Stay as Astro** (zero-JS SSR wrappers)                                                                     |
| UI components + sections       | **Migrate to React**                                                                                         |
| Hydration                      | **`client:visible`** (lazy hydration for sections below fold), `client:load` for Navigation                  |
| Animations                     | **`motion/react`** (`<motion.div>`, `useInView`)                                                             |
| Icons                          | **`react-icons`** (`react-icons/lu` for Lucide, `react-icons/si` for Simple Icons) — unified icon library  |
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
react-icons
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
│   ├── button.tsx              # CTA button (link-style and submit)
│   ├── card.tsx                # Image card with hover effects
│   ├── icon-badge.tsx          # Rounded icon container
│   ├── logo.tsx                # Company logo component
│   ├── section-header.tsx      # Section title + decoration
│   ├── social-links.tsx        # Social media links
│   ├── tag-filter.tsx          # Tag filter buttons (interactive)
│   ├── theme-toggle.tsx        # Dark/light toggle (interactive)
│   ├── language-selector.tsx   # Language switcher (interactive, custom dropdown)
│   ├── navigation/
│   │   ├── types.ts            # Shared NavItem interface
│   │   ├── navigation.tsx      # Main nav bar (interactive)
│   │   ├── nav-links.tsx       # Reusable link list
│   │   ├── mobile-menu.tsx     # Mobile menu panel (interactive, custom + focus trap)
│   │   └── mobile-menu-button.tsx
│   ├── footer/
│   │   ├── footer.tsx          # Site footer
│   │   └── footer-links.tsx    # Footer link section
│   ├── form/
│   │   ├── form-field.tsx
│   │   └── form-status.tsx
│   └── gallery/
│       └── GridGallery.tsx     # Gallery with GLightbox (interactive)
├── hooks/
│   ├── use-focus-trap.ts       # Focus trap hook for MobileMenu
│   └── use-theme.ts            # Theme toggle hook (classList + localStorage)
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

- Accepts `icon` (`IconType` from `react-icons`), `size` (sm/md/lg)
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
- Uses `IconType` from `react-icons` for icons (works with any react-icons set)
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

### Phase 2: Interactive UI Components ✅ COMPLETED

#### 2.0 — `hooks/use-focus-trap.ts` ✅

- Custom hook that traps focus within a container element when active
- Handles Tab / Shift+Tab cycling, restores focus on deactivation
- Supports `onEscape` callback
- 6 tests passing

#### 2.1 — `hooks/use-theme.ts` ✅

- Custom hook: reads/writes `dark` class on `document.documentElement` + `localStorage`
- Returns `{ isDark, toggle }`
- 4 tests passing

#### 2.2 — `ui/theme-toggle.tsx` ✅

- Uses custom `useTheme` hook
- Uses `LuSun`/`LuMoon` from `react-icons/lu`
- Accepts `lang`, `id?`, `className?`
- 6 tests passing

#### 2.3 — `ui/language-selector.tsx` ✅

- Custom dropdown: `useState` for open/close, positioned div overlay
- Keyboard navigation (ArrowUp/Down, Escape, Enter), `aria-expanded`/`aria-haspopup`
- Inline buttons mode for mobile
- Uses `window.location.pathname` to compute `basePath` at runtime
- Accepts `lang`, `variant` (dropdown/inline)
- 12 tests passing

#### 2.4 — `ui/tag-filter.tsx` ✅

- Accepts `tags`, `activeTag`, `onTagChange`, `allLabel?`
- Fully controlled component, uses `aria-pressed`
- Tailwind styling (replaces CSS variables from Astro version)
- 6 tests passing

#### 2.5 — `ui/navigation/nav-links.tsx` ✅

- Shared `NavItem` type in `navigation/types.ts`
- Row or column direction, highlight variant with icon
- `onLinkClick` callback for MobileMenu close-on-navigate
- 7 tests passing

#### 2.6 — `ui/navigation/mobile-menu-button.tsx` ✅

- Shows `LuMenu`/`LuX` based on `isOpen` prop
- `aria-expanded`, `aria-label` from i18n
- 5 tests passing

#### 2.7 — `ui/navigation/mobile-menu.tsx` ✅

- Uses `useFocusTrap` hook when open
- Composes NavLinks (column) + LanguageSelector (inline)
- Calls `onClose` on link click and Escape
- 6 tests passing

#### 2.8 — `ui/navigation/navigation.tsx` ✅

- Orchestrates all nav sub-components
- Manages mobile open state via `useState`
- ThemeToggle rendered separately (clean composition, not bundled in MobileMenuButton)
- 8 tests passing

#### 2.9 — `ui/footer/footer-links.tsx` ✅

- Link list section with title
- `getTestId()` helper strips locale prefix from href
- 4 tests passing

#### 2.10 — `ui/footer/footer.tsx` ✅

- Full footer composition with i18n + BUSINESS constants
- Uses `SiFacebook`, `SiInstagram` from `react-icons/si`
- Uses `LuPhone`, `LuMail` from `react-icons/lu`
- 9 tests passing

#### Icon Library Migration (included in Phase 2) ✅

- Replaced `lucide-react` with `react-icons` (unified library)
- Updated `icon-badge.tsx`: `LucideIcon` → `IconType` from `react-icons`
- Updated `social-links.tsx`: `ComponentType<SVGProps>` → `IconType` from `react-icons`
- All Phase 1 tests updated and passing with new imports

---

### Phase 3: Section Components ✅ COMPLETED

Each section receives `lang: Lang` as prop and internally calls `getTranslations(lang)`.

#### 3.1 — `hero/Hero.tsx` ✅

- Full-screen hero with background image, animated title, dual CTAs
- Uses `motion/react` for mount entrance animations (no `useInView` — always above fold)
- Image passed as `{ src, srcSet, sizes }` from Astro page via `getImage()`
- Uses `getRichText(lang)` for `<accent>` tag in title
- Uses `Button` component (primary + secondary variants)
- `LuArrowRight` icon from `react-icons/lu`
- Hydrated with `client:load` (above fold, critical for LCP)
- 9 tests passing

#### 3.2 — About section ✅

- `about/ServiceCard.tsx` — decoration bar with `motion.div` scaleX animation (`useInView`) — 6 tests
- `about/StatCard.tsx` — counter animation using `useMotionValue` + `useSpring` (React-idiomatic), fade-up entrance — 6 tests
- `about/AboutServices.tsx` — spring stagger animation using `variants` pattern — 5 tests
- `about/AboutStats.tsx` — 4-column grid of StatCard components — 5 tests
- `about/StorySection.tsx` — dual slide animations + signature scale (`useInView`) — 7 tests
- `about/About.tsx` — orchestrator with `LuClock`/`LuAward`/`LuUsers`/`LuHeart` icons — 9 tests

#### 3.3 — Projects section ✅

- `projects/ProjectCard.tsx` — wraps existing `Card` React component — 6 tests
- `projects/Projects.tsx` — stagger animation via `variants`, `Button` for CTA — 8 tests
- Data passed as props (fetched at build time in Astro page)

#### 3.4 — Contact section ✅

- `contact/MapEmbed.tsx` — iframe embed with scale-in animation (`useInView`) — 7 tests
- `contact/ContactInfo.tsx` — stagger slide-in via `variants` pattern, uses `IconBadge` — 6 tests
- `contact/Contact.tsx` — orchestrator with `LuMapPin`/`LuPhone`/`LuMail` icons — 8 tests
- **ContactForm removed** — not planned for use; removed from migration scope entirely

#### Page Integration ✅

- Updated `src/pages/[locale]/index.astro` to use React components with hydration directives
- Hero: `client:load` | Projects, About, Contact: `client:visible`
- Image optimization via Astro's `getImage()` in frontmatter, passed as props
- Fixed `vitest.config.ts` to properly separate Astro (`.test.ts`) from React (`.test.tsx`) tests

#### Animation Patterns (React-idiomatic) ✅

- **Counter animation**: `useMotionValue` + `useSpring` + `spring.on("change")` for StatCard
- **Stagger animations**: `variants` pattern with `containerVariants`/`itemVariants`
- **Scroll-triggered**: `useInView` hook + declarative `animate` prop
- **Mount entrance (Hero)**: Direct `initial`/`animate` without `useInView` (always in viewport)

---

### Phase 4: Page Components & Gallery

#### 4.1 — `ui/gallery/grid-gallery.tsx`

- GLightbox integration via `useEffect`
- Custom pointer-event swipe navigation
- Mobile description toggle
- Scroll-triggered tile animations

---

### Phase 5: Integration & Cleanup

- Update Astro pages to import React components with `client:visible` / `client:load`
- Remove old `.astro` component files (once React equivalents are verified)
- Update test configuration
- Run E2E tests to verify no regressions
- Remove `@lucide/astro` and `simple-icons-astro` from dependencies (React uses `react-icons` instead)

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
