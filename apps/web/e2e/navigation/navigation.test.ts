import { expect, test } from "@playwright/test";

test.describe("Hero CTA navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("primary CTA scrolls to contact section", async ({ page }) => {
    const ctaPrimary = page.getByTestId("hero-cta-primary");
    await ctaPrimary.click();

    const contactSection = page.getByTestId("contact");

    await expect(contactSection).toBeInViewport({ ratio: 0.2 });
  });

  test("secondary CTA scrolls to projects section", async ({ page }) => {
    const ctaSecondary = page.getByTestId("hero-cta-secondary");
    await ctaSecondary.click();

    const projectsSection = page.getByTestId("projects");

    await expect(projectsSection).toBeInViewport({ ratio: 0.2 });
  });
});
