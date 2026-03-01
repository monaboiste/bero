import { expect, test } from "@playwright/test";

test.describe("Projects gallery", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
  });

  test("renders project tiles with images", async ({ page }) => {
    const tiles = page.getByTestId("masonry-tile");
    await expect(tiles.first()).toBeAttached();

    const images = page.locator('[data-testid="masonry-tile"] img');
    await expect(images.first()).toBeAttached();

    for (const img of await images.all()) {
      await expect(img).toHaveAttribute("src", /.+/);
    }
  });

  test("every tile has a description caption", async ({ page }) => {
    const captions = page.getByTestId("masonry-tile-caption");
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
    const allTilesBefore = await page.getByTestId("masonry-tile").count();

    await page.getByTestId("tag-filter-fotele").click();

    await expect(
      page.locator('[data-testid="masonry-tile"].hidden').first()
    ).toBeAttached();

    const visibleTiles = page.locator(
      '[data-testid="masonry-tile"]:not(.hidden)'
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
      page.locator('[data-testid="masonry-tile"].hidden').first()
    ).toBeAttached();

    await page.getByTestId("tag-filter-all").click();

    await expect(
      page.locator('[data-testid="masonry-tile"].hidden')
    ).toHaveCount(0);
  });

  test("tag filter updates URL query param", async ({ page }) => {
    await page.getByTestId("tag-filter-sofy").click();
    await expect(page).toHaveURL(/\?tag=Sofy/);

    await page.getByTestId("tag-filter-all").click();
    await expect(page).not.toHaveURL(/tag=/);
  });

  test("URL with ?tag= pre-filters tiles on load", async ({ page }) => {
    await page.goto("/projects?tag=Krzesla");

    const krzeslaBtn = page.getByTestId("tag-filter-krzesla");
    await expect(krzeslaBtn).toHaveAttribute("aria-pressed", "true");

    await expect(
      page.locator('[data-testid="masonry-tile"].hidden').first()
    ).toBeAttached();

    const visibleTiles = page.locator(
      '[data-testid="masonry-tile"]:not(.hidden)'
    );
    expect(await visibleTiles.count()).toBeGreaterThan(0);

    for (const tile of await visibleTiles.all()) {
      const tags = await tile.getAttribute("data-tags");
      expect(tags).toContain("Krzesla");
    }
  });
});
