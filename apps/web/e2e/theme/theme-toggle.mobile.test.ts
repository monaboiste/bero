import { expect, test } from "@playwright/test";

test.describe("Mobile theme toggle @mobile", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("mobile theme toggle button is visible @mobile", async ({ page }) => {
    const toggle = page.getByTestId("mobile-theme-toggle");

    await expect(toggle).toBeVisible();
  });

  test("desktop theme toggle is hidden on mobile @mobile", async ({ page }) => {
    const desktopToggle = page.getByTestId("theme-toggle");

    await expect(desktopToggle).toBeHidden();
  });

  test("mobile toggle switches to dark mode @mobile", async ({ page }) => {
    await page.getByTestId("mobile-theme-toggle").click();

    const isDark = await page
      .locator("html")
      .evaluate((el) => el.classList.contains("dark"));

    expect(isDark).toBe(true);
  });

  test("mobile toggle stores theme in localStorage @mobile", async ({
    page,
  }) => {
    await page.getByTestId("mobile-theme-toggle").click();

    const theme = await page.evaluate(() => localStorage.getItem("theme"));

    expect(theme).toBe("dark");
  });

  test("theme set via mobile toggle persists after reload @mobile", async ({
    page,
  }) => {
    await page.getByTestId("mobile-theme-toggle").click();

    await page.reload();

    const isDark = await page
      .locator("html")
      .evaluate((el) => el.classList.contains("dark"));

    expect(isDark).toBe(true);
  });
});
