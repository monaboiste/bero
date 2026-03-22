import { expect, test } from "@playwright/test";

test.describe("Projects portfolio", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pl/portfolio");
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

  test("tag filter is visible with All active by default", async ({ page }) => {
    const filter = page.getByTestId("tag-filter");
    await expect(filter).toBeVisible();

    const allBtn = page.getByTestId("tag-filter-all");
    await expect(allBtn).toBeVisible();
    await expect(allBtn).toHaveAttribute("aria-pressed", "true");

    for (const tag of [
      "armchairs",
      "sofas",
      "chairs",
      "restoration",
      "automotive",
    ]) {
      await expect(page.getByTestId(`tag-filter-${tag}`)).toBeVisible();
    }
  });

  test("clicking a tag shows only matching tiles", async ({ page }) => {
    const allTilesBefore = await page.getByTestId("gallery-tile").count();

    await page.getByTestId("tag-filter-armchairs").click();

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
      expect(tags).toContain("armchairs");
    }
  });

  test("clicking All resets filter", async ({ page }) => {
    await page.getByTestId("tag-filter-restoration").click();
    await expect(
      page.locator('[data-testid="gallery-tile"].hidden').first()
    ).toBeAttached();

    await page.getByTestId("tag-filter-all").click();

    await expect(
      page.locator('[data-testid="gallery-tile"].hidden')
    ).toHaveCount(0);
  });

  test("tag filter updates URL query param", async ({ page }) => {
    await page.getByTestId("tag-filter-sofas").click();
    await expect(page).toHaveURL(/\?tag=sofas/);

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
    await page.goto("/pl/portfolio?tag=chairs");

    const chairsBtn = page.getByTestId("tag-filter-chairs");
    await expect(chairsBtn).toHaveAttribute("aria-pressed", "true");

    await expect(
      page.locator('[data-testid="gallery-tile"].hidden').first()
    ).toBeAttached();

    const visibleTiles = page.locator(
      '[data-testid="gallery-tile"]:not(.hidden)'
    );
    expect(await visibleTiles.count()).toBeGreaterThan(0);

    for (const tile of await visibleTiles.all()) {
      const tags = await tile.getAttribute("data-tags");
      expect(tags).toContain("chairs");
    }
  });

  test("multi-image projects produce more gallery tiles than projects", async ({
    page,
  }) => {
    const tiles = page.getByTestId("gallery-tile");
    const tileCount = await tiles.count();

    expect(tileCount).toBeGreaterThan(10);
  });

  test("tiles from same multi-image project share the same tags", async ({
    page,
  }) => {
    const projectTitle = "Renowacja fotela klubowego";

    const matchingTiles = page.locator(
      `[data-testid="gallery-tile"]:has([data-testid="gallery-tile-caption"] p:text-is("${projectTitle}"))`
    );
    const count = await matchingTiles.count();
    expect(count).toBeGreaterThan(1);

    const firstTags = await matchingTiles.first().getAttribute("data-tags");
    expect(firstTags).toBeTruthy();
    for (const tile of await matchingTiles.all()) {
      await expect(tile).toHaveAttribute("data-tags", String(firstTags));
    }
  });

  test("each tile from a multi-image project has a unique image src", async ({
    page,
  }) => {
    const projectTitle = "Renowacja fotela klubowego";

    const matchingImages = page.locator(
      `[data-testid="gallery-tile"]:has([data-testid="gallery-tile-caption"] p:text-is("${projectTitle}")) img`
    );
    const count = await matchingImages.count();
    expect(count).toBeGreaterThan(1);

    const srcs = new Set<string>();
    for (const img of await matchingImages.all()) {
      const src = await img.getAttribute("src");
      expect(src).toBeTruthy();
      srcs.add(String(src));
    }
    expect(srcs.size).toBe(count);
  });
});
