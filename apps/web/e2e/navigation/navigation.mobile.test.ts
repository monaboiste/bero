import { expect, test } from "@playwright/test";

test.describe("Mobile menu navigation @mobile", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("mobile menu is hidden by default @mobile", async ({ page }) => {
    const mobileMenu = page.getByTestId("mobile-menu");

    await expect(mobileMenu).toBeHidden();
  });

  test("hamburger button opens mobile menu @mobile", async ({ page }) => {
    await page.getByTestId("mobile-menu-button").click();

    const mobileMenu = page.getByTestId("mobile-menu");

    await expect(mobileMenu).toBeVisible();
  });

  test("hamburger button toggles menu open and closed @mobile", async ({
    page,
  }) => {
    const menuButton = page.getByTestId("mobile-menu-button");
    const mobileMenu = page.getByTestId("mobile-menu");

    await menuButton.click();
    await expect(mobileMenu).toBeVisible();

    await menuButton.click();
    await expect(mobileMenu).toBeHidden();
  });

  test("clicking a link in mobile menu scrolls to section and closes menu @mobile", async ({
    page,
  }) => {
    const menuButton = page.getByTestId("mobile-menu-button");
    const mobileMenu = page.getByTestId("mobile-menu");

    await menuButton.click();
    await expect(mobileMenu).toBeVisible();

    await mobileMenu.getByTestId("nav-link-projects").click();

    await expect(mobileMenu).toBeHidden();
    await expect(page.getByTestId("projects")).toBeInViewport();
  });

  test("navigates to all sections via mobile menu @mobile", async ({
    page,
  }) => {
    const sections = [
      { link: "nav-link-projects", section: "projects" },
      { link: "nav-link-about", section: "about" },
      { link: "nav-link-contact", section: "contact" },
      { link: "nav-link-home", section: "hero" },
    ];

    for (const { link, section } of sections) {
      const menuButton = page.getByTestId("mobile-menu-button");
      const mobileMenu = page.getByTestId("mobile-menu");

      await menuButton.click();
      await expect(mobileMenu).toBeVisible();

      await mobileMenu.getByTestId(link).click();

      await expect(mobileMenu).toBeHidden();
      await expect(page.getByTestId(section)).toBeInViewport();
    }
  });

  test("desktop navigation links are hidden on mobile @mobile", async ({
    page,
  }) => {
    const desktopNav = page.getByTestId("nav-links-desktop");

    await expect(desktopNav).toBeHidden();
  });

  test("mobile menu button is visible on mobile @mobile", async ({ page }) => {
    const menuButton = page.getByTestId("mobile-menu-button");

    await expect(menuButton).toBeVisible();
  });
});
