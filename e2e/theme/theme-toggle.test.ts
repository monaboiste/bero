import { expect, test } from "@playwright/test";

test.describe("Theme toggle", () => {
  const visibleToggle = (page: import("@playwright/test").Page) =>
    page.locator("[data-testid$='theme-toggle']:visible");

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page loads in light mode by default", async ({ page }) => {
    const isDark = await page
      .locator("html")
      .evaluate((el) => el.classList.contains("dark"));

    expect(isDark).toBe(false);
  });

  test("clicking toggle switches to dark mode", async ({ page }) => {
    await visibleToggle(page).click();

    const isDark = await page
      .locator("html")
      .evaluate((el) => el.classList.contains("dark"));

    expect(isDark).toBe(true);
  });

  test("clicking toggle twice returns to light mode", async ({ page }) => {
    const toggle = visibleToggle(page);

    await toggle.click();
    await toggle.click();

    const isDark = await page
      .locator("html")
      .evaluate((el) => el.classList.contains("dark"));

    expect(isDark).toBe(false);
  });

  test("switching to dark mode saves preference in localStorage", async ({
    page,
  }) => {
    await visibleToggle(page).click();

    const theme = await page.evaluate(() => localStorage.getItem("theme"));

    expect(theme).toBe("dark");
  });

  test("switching back to light mode saves preference in localStorage", async ({
    page,
  }) => {
    const toggle = visibleToggle(page);

    await toggle.click();
    await toggle.click();

    const theme = await page.evaluate(() => localStorage.getItem("theme"));

    expect(theme).toBe("light");
  });

  test("dark mode persists after page reload", async ({ page }) => {
    await visibleToggle(page).click();

    await page.reload();

    const isDark = await page
      .locator("html")
      .evaluate((el) => el.classList.contains("dark"));

    expect(isDark).toBe(true);
  });

  test("light mode persists after page reload", async ({ page }) => {
    const toggle = visibleToggle(page);

    await toggle.click();
    await toggle.click();

    await page.reload();

    const isDark = await page
      .locator("html")
      .evaluate((el) => el.classList.contains("dark"));

    expect(isDark).toBe(false);
  });
});
