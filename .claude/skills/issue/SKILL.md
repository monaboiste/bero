---
name: project-issue-generator
description: >
  This skill generates well-structured GitHub issues with proper Type and Area labels,
  clear titles, and concise descriptions. It ensures each issue explains the value
  of solving the problem and promotes consistent labeling without introducing unnecessary new labels.
compatibility: opencode
metadata:
  audience: maintainers
  workflow: github
---

#

## What I do

- Generate GitHub issue text with structured **Type** and **Area** labels.
- Suggest clear **Title** and **Description** for each issue.
- Always include a short explanation of **what value solving this brings** (business, UX, technical, or maintainability
  impact).
- Distinguish between `feature`, `enhancement`, `refactor`, `bug`, and `chore`.
- Recommend appropriate existing `area:` labels (e.g., `area:ui`, `area:cms`, `area:i18n`, `area:build`,
  `area:architecture`).
- Avoid introducing new labels unless truly necessary; prefer reusing existing project labels and only suggest additions
  when justified.

## When to use me

- When creating a new GitHub issue and you want it to be well-structured and properly labeled.
- When deciding whether a change is a `feature`, `enhancement`, or `refactor`.
- When you want each issue to clearly communicate its **impact and value**.
- When maintaining a clean, minimal, and consistent labeling system.

## Example

**Type:** `feature`  
**Area:** `area:ui`  

**Title:** Implement projects gallery page with lightbox  

**Description:**  
Create a dedicated subpage showcasing completed projects in a gallery layout.  
Include lightbox functionality to display images with descriptions.  

**Value:**  
Improves portfolio presentation, increases user engagement, and makes project examples easier to explore.
