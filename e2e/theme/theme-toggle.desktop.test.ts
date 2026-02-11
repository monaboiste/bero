import { expect, test } from "@playwright/test";

test.describe("Desktop theme toggle @desktop", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("desktop theme toggle button is visible @desktop", async ({ page }) => {
    const toggle = page.getByTestId("theme-toggle");

    await expect(toggle).toBeVisible();
  });

  test("moon icon is visible in light mode @desktop", async ({ page }) => {
    const toggle = page.getByTestId("theme-toggle");
    const moonIcon = toggle.getByTestId("icon-moon");

    await expect(moonIcon).toBeVisible();
  });

  test("sun icon is visible in dark mode @desktop", async ({ page }) => {
    const toggle = page.getByTestId("theme-toggle");

    await toggle.click();

    const sunIcon = toggle.getByTestId("icon-sun");

    await expect(sunIcon).toBeVisible();
  });

  test("moon icon is hidden in dark mode @desktop", async ({ page }) => {
    const toggle = page.getByTestId("theme-toggle");

    await toggle.click();

    const moonIcon = toggle.getByTestId("icon-moon");

    await expect(moonIcon).toBeHidden();
  });

  test("sun icon is hidden in light mode @desktop", async ({ page }) => {
    const toggle = page.getByTestId("theme-toggle");
    const sunIcon = toggle.getByTestId("icon-sun");

    await expect(sunIcon).toBeHidden();
  });
});
