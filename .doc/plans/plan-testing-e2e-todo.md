# E2E - TODO Tests

## Overview

This document describes the end-to-end test plan for the BERO Upholstery Studio website. The tests focus on key user journeys and interactions between components.

---

# 1. Language Selector Tests

## 1.1 Open and Close Language Dropdown (Desktop)

**User Story**: As a user, I want to select the interface language from a dropdown menu.

**Components**: `LanguageSelector.astro` (dropdown variant)

**Test Steps**:

1. Load the page in a desktop viewport
2. Verify that the language dropdown is hidden
3. Click the button with the Globe icon and the text “PL”
4. Verify that the dropdown opens and displays language options
5. Click outside the dropdown
6. Verify that the dropdown closes

**Expected Result**: The dropdown opens and closes on click, and closes when clicking outside.

---

## 1.2 Select Language from List (Mobile Inline)

**User Story**: As a mobile user, I want to select the language using inline buttons in the mobile menu.

**Components**: `LanguageSelector.astro` (inline variant) inside `MobileMenu.astro`

**Test Steps**:

1. Set the viewport to mobile
2. Open the mobile menu
3. Locate the inline language selector (PL, EN, DE buttons)
4. Verify which language is active (has the `bg-accent` class)
5. Click on an inactive language (e.g., EN)
6. Verify that:

   * The `#current-lang` text changes to “EN”
   * The EN button now has the `bg-accent` class

**Expected Result**: Selecting a language updates the UI (full i18n not yet implemented — testing state change only).

---

# 2. Project Gallery Tests

## 2.1 Scroll Reveal Animation

**User Story**: As a user, I want projects to appear with animation while scrolling.

**Components**: `Projects.astro` → `ProjectCard.astro` (Intersection Observer)

**Test Steps**:

1. Load the page
2. Verify that project cards have the `project-card` class and opacity: 0
3. Scroll to the `#projects` section
4. Verify that cards gain the `is-visible` class and become visible (opacity: 1)
5. Verify that the `fadeInUp` animation is applied with a delay

**Expected Result**: Project cards appear with animation when entering the viewport.

---

## 2.2 “View All Projects” Button

**User Story**: As a user, I want to view the full portfolio gallery.

**Components**: `Projects.astro` → “View All” button

**Test Steps**:

1. Scroll to the `#projects` section
2. Identify the “View all projects” button
3. Click the button
4. Verify behavior (currently no action; future redirect to `/portfolio`)

**Expected Result**: The button is visible and clickable.

---

# 3. Responsiveness Tests

## 3.1 Desktop → Mobile Transition

**User Story**: As a user, I want the website to adapt to my device size.

**Components**: All components

**Test Steps**:

1. Load the page on desktop (1920x1080)
2. Verify that:

   * Desktop navigation is visible
   * Mobile menu button is hidden
   * Projects grid has 3 columns
   * Services grid has 4 columns
3. Change viewport to tablet (768x1024)
4. Verify that:

   * Projects grid has 2 columns
   * Services grid has 2 columns
5. Change viewport to mobile (375x667)
6. Verify that:

   * Desktop navigation is hidden
   * Mobile menu button is visible
   * Projects grid has 1 column
   * Services grid has 1 column

**Expected Result**: Layout adapts according to Tailwind breakpoints.

---

# 4. Footer and Social Links Tests

## 4.1 Clicking Social Media Links

**User Story**: As a user, I want to navigate to the company’s social media profiles.

**Components**: `SocialLinks.astro` → `Footer.astro`

**Test Steps**:

1. Scroll to the footer
2. Locate the Social Links section
3. Verify links have `target="_blank"` and `rel="noopener noreferrer"`
4. Open the Facebook link in a new tab
5. Verify the correct URL

**Expected Result**: Links open in a new tab with proper security attributes.

---

# 5. Accessibility (A11y) Tests

## 5.1 Keyboard Navigation

**User Story**: As a keyboard-only user, I want to navigate the entire website.

**Components**: All interactive elements

**Expected Result**: Full keyboard navigation, visible focus states, working interactions.

---

## 5.2 ARIA Labels and Semantic HTML

**User Story**: As a screen reader user, I want the page to be properly described.

**Expected Result**: No critical accessibility issues, Lighthouse score >90.

---

# 6. Performance Tests

## 6.1 Image Lazy Loading

**User Story**: As a user, I want the website to load quickly and efficiently.

**Expected Result**: Lazy loading works; offscreen images do not block initial load.

---

# 7. Complete User Journey

## 7.1 Happy Path: From Entry to Form Submission

**User Story**: As a potential customer, I want to explore the offer and send an inquiry.

**Expected Result**: User smoothly navigates through the entire website and successfully submits the form.
