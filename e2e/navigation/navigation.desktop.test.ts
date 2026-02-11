import { expect, test } from "@playwright/test";

test.describe("Desktop navigation between sections @desktop", () => {
  const desktopNav = (page: import("@playwright/test").Page) =>
    page.getByTestId("nav-links-desktop");

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("navigation bar stays fixed at the top @desktop", async ({ page }) => {
    const nav = page.getByTestId("navigation");
    await expect(nav).toBeVisible();

    await desktopNav(page).getByTestId("nav-link-contact").click();
    await expect(page.getByTestId("contact")).toBeInViewport();

    await expect(nav).toBeVisible();
    await expect(nav).toBeInViewport();
  });

  test("navigates back to home section @desktop", async ({ page }) => {
    await desktopNav(page).getByTestId("nav-link-contact").click();
    await expect(page.getByTestId("contact")).toBeInViewport();

    await desktopNav(page).getByTestId("nav-link-home").click();

    await expect(page.getByTestId("hero")).toBeInViewport();
  });

  test("logo click navigates to home section @desktop", async ({ page }) => {
    await desktopNav(page).getByTestId("nav-link-contact").click();
    await expect(page.getByTestId("contact")).toBeInViewport();

    await page.getByTestId("logo").click();

    await expect(page.getByTestId("hero")).toBeInViewport();
  });

  test("full sequential navigation through all sections @desktop", async ({
    page,
  }) => {
    const sections = [
      { link: "nav-link-projects", section: "projects" },
      { link: "nav-link-about", section: "about" },
      { link: "nav-link-contact", section: "contact" },
      { link: "nav-link-home", section: "hero" },
    ];

    for (const { link, section } of sections) {
      await test.step(`Navigating to ${section}`, async () => {
        await desktopNav(page).getByTestId(link).click();

        await expect(page.getByTestId(section)).toBeInViewport();
      });
    }
  });
});
