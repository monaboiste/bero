# E2E Testing Guidelines (Playwright)

## Stack

* **Playwright** – browser automation for end-to-end tests
* **Vitest** – organize and run tests
* **Headless browsers** – Chromium, Firefox, WebKit

## Writing Tests

* Place tests in `e2e/` folder
* Group tests by feature e.g. `navigation/`
* Use tags for platform specific tests, e.g. `@mobile`
* Platform specific tests should have `.platform.test.ts` extension
* Use `describe` to group flows, `test` for individual scenarios
* Prefer realistic user flows (clicks, typing, navigation)
* Use selectors via `data-testid` when possible (signal if there isn't any `data-testd` attribute and add it if necessary).

```ts
import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("navigates to contact form and submits", async ({ page }) => {
    await page.goto("/");
    await page.click('[data-testid="contact-link"]');
    await page.fill('[data-testid="contact-name"]', "John Doe");
    await page.click('[data-testid="contact-submit"]');

    await expect(page.locator('[data-testid="contact-success"]')).toBeVisible();
  });
});
```

## Best Practices

* Test **user interactions**, not internal state
* Prefer **idempotent tests** (can run repeatedly without side effects)
* Mock external APIs if needed, but test real backend flows when possible
* Keep **selectors stable** (`data-testid`)
* Avoid testing styling or media queries unless visual regression is needed
* Group tests logically: navigation, forms, auth, critical flows

## What Not to Test in E2E

| Feature                 | Reason                                      |
| ----------------------- | ------------------------------------------- |
| Unit-level logic        | Already covered by unit tests               |
| HTML structure details  | Already covered by unit tests               |
| Pure CSS responsiveness | Use visual regression / Storybook snapshots |
