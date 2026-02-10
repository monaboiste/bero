# Unit Testing Guidelines

## Stack

* **Vitest** – test runner
* **Astro Container API** – render `.astro` components in isolation, returns raw HTML
* **Happy DOM** – lightweight DOM simulation

## Writing Tests

* Place tests next to the component: `MyComponent.test.ts`
* Group with `describe`
* Use helper from `test/helpers.ts` to render components

```ts
import { describe, expect, test } from "vitest";
import { renderAstroComponent } from "../test/helpers.ts";
import MyComponent from "./MyComponent.astro";

describe("MyComponent", () => {
  test("renders section with id 'home'", async () => {
    const result = await renderAstroComponent(MyComponent);

    const section = result.querySelector('[id="home"]');
    expect(section).not.toBeNull();
    expect(section?.getAttribute("data-testid")).toBe("my-component");
  });
});
```

## Notes

* **No `@testing-library` needed** – components render to static HTML, no interactivity
* `<script>` blocks are **not executed** in Container API – test via e2e

## What Not to Test in Unit Tests

| Feature                        | Reason                             |
| ------------------------------ | ---------------------------------- |
| Dark mode toggle               | Requires JS → e2e                  |
| Mobile menu open/close         | Requires JS → e2e                  |
| Contact form submission        | Requires JS & events → e2e         |
| Scroll animations              | Requires JS → e2e                  |
| Language dropdown              | Requires JS → e2e                  |
| Responsiveness (media queries) | Better via e2e / visual regression |
| Inner components in isolation  | Covered by parent components       |
| Full page (`index.astro`)      | Section integration → e2e          |
