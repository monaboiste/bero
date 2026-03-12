import { expect, test } from "@playwright/test";

test.describe("Projects gallery", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/portfolio");
  });

  test("renders project tiles with images", async ({ page }) => {
    const tiles = page.getByTestId("gallery-tile");
    await expect(tiles.first()).toBeAttached();

    const images = page.locator('[data-testid="gallery-tile"] img');
    await expect(images.first()).toBeAttached();

    for (const img of await images.all()) {
      await expect(img).toHaveAttribute("src", /.+/);
    }
  });

  test("every tile has a description caption", async ({ page }) => {
    const captions = page.getByTestId("gallery-tile-caption");
    await expect(captions.first()).toBeAttached();

    for (const caption of await captions.all()) {
      await expect(caption).not.toBeEmpty();
    }
  });

  test("tag filter is visible with Wszystkie active by default", async ({
    page,
  }) => {
    const filter = page.getByTestId("tag-filter");
    await expect(filter).toBeVisible();

    const allBtn = page.getByTestId("tag-filter-all");
    await expect(allBtn).toBeVisible();
    await expect(allBtn).toHaveAttribute("aria-pressed", "true");

    for (const tag of [
      "fotele",
      "sofy",
      "krzesla",
      "renowacja",
      "projekt-indywidualny",
    ]) {
      await expect(page.getByTestId(`tag-filter-${tag}`)).toBeVisible();
    }
  });

  test("clicking a tag shows only matching tiles", async ({ page }) => {
    const allTilesBefore = await page.getByTestId("gallery-tile").count();

    await page.getByTestId("tag-filter-fotele").click();

    await expect(
      page.locator('[data-testid="gallery-tile"].hidden').first()
    ).toBeAttached();

    const visibleTiles = page.locator(
      '[data-testid="gallery-tile"]:not(.hidden)'
    );
    const visibleCount = await visibleTiles.count();
    expect(visibleCount).toBeGreaterThan(0);
    expect(visibleCount).toBeLessThan(allTilesBefore);

    for (const tile of await visibleTiles.all()) {
      const tags = await tile.getAttribute("data-tags");
      expect(tags).toContain("Fotele");
    }
  });

  test("clicking Wszystkie resets filter", async ({ page }) => {
    await page.getByTestId("tag-filter-renowacja").click();
    await expect(
      page.locator('[data-testid="gallery-tile"].hidden').first()
    ).toBeAttached();

    await page.getByTestId("tag-filter-all").click();

    await expect(
      page.locator('[data-testid="gallery-tile"].hidden')
    ).toHaveCount(0);
  });

  test("tag filter updates URL query param", async ({ page }) => {
    await page.getByTestId("tag-filter-sofy").click();
    await expect(page).toHaveURL(/\?tag=Sofy/);

    await page.getByTestId("tag-filter-all").click();
    await expect(page).not.toHaveURL(/tag=/);
  });

  test("tapping image in mobile lightbox toggles description @mobile", async ({
    page,
  }) => {
    const firstTile = page.getByTestId("gallery-tile").first();
    await firstTile.click();

    const desc = page.locator(".gslide.current .gslide-description");
    await expect(desc).toBeAttached();
    await expect(desc).not.toHaveClass(/gslide-desc-visible/);
    await expect(desc).toHaveCSS("opacity", "0");

    const image = page.locator(".gslide.current .gslide-image img");
    await image.tap();
    await expect(desc).toHaveClass(/gslide-desc-visible/);
    await expect(desc).toHaveCSS("opacity", "1");

    await image.tap();
    await expect(desc).not.toHaveClass(/gslide-desc-visible/);
    await expect(desc).toHaveCSS("opacity", "0");

    await page.locator(".gclose").click();
  });

  test("URL with ?tag= pre-filters tiles on load", async ({ page }) => {
    await page.goto("/portfolio?tag=Krzesla");

    const krzeslaBtn = page.getByTestId("tag-filter-krzesla");
    await expect(krzeslaBtn).toHaveAttribute("aria-pressed", "true");

    await expect(
      page.locator('[data-testid="gallery-tile"].hidden').first()
    ).toBeAttached();

    const visibleTiles = page.locator(
      '[data-testid="gallery-tile"]:not(.hidden)'
    );
    expect(await visibleTiles.count()).toBeGreaterThan(0);

    for (const tile of await visibleTiles.all()) {
      const tags = await tile.getAttribute("data-tags");
      expect(tags).toContain("Krzesla");
    }
  });
});
