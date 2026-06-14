import { expect, test } from "@playwright/test";

test.describe("Footer link navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("footer section is visible after scrolling to bottom", async ({
    page,
  }) => {
    const footer = page.getByTestId("footer");

    await footer.scrollIntoViewIfNeeded();

    await expect(footer).toBeInViewport();
  });

  test("footer quick links section is visible", async ({ page }) => {
    const quickLinks = page.getByTestId("footer-quick-links");

    await quickLinks.scrollIntoViewIfNeeded();

    await expect(quickLinks).toBeVisible();
  });

  test("full sequential navigation through all footer links", async ({
    page,
  }) => {
    const sections = [
      { link: "footer-link-projects", section: "projects" },
      { link: "footer-link-about", section: "about" },
      { link: "footer-link-contact", section: "contact" },
      { link: "footer-link-home", section: "hero" },
    ];

    for (const { link, section } of sections) {
      await test.step(`Footer link navigates to ${section}`, async () => {
        const footer = page.getByTestId("footer");
        await footer.scrollIntoViewIfNeeded();

        await page.getByTestId(link).click();

        await expect(page.getByTestId(section)).toBeInViewport({ ratio: 0.2 });
      });
    }
  });
});
