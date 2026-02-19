import { renderAstroComponent } from "@test/helpers.ts";
import { describe, expect, test } from "vitest";
import type { GalleryImage } from "./MasonryGallery.astro";
import MasonryGallery from "./MasonryGallery.astro";

const sampleImages: GalleryImage[] = [
  { src: "/img/photo1.jpg", alt: "Photo 1", description: "First photo" },
  { src: "/img/photo2.jpg", alt: "Photo 2", description: "Second photo" },
  { src: "/img/photo3.jpg", alt: "Photo 3" },
];

describe("MasonryGallery", () => {
  test("renders gallery container", async () => {
    const result = await renderAstroComponent(MasonryGallery, {
      props: { images: sampleImages },
    });

    const gallery = result.querySelector('[data-testid="masonry-gallery"]');

    expect(gallery).not.toBeNull();
  });

  test("renders correct number of tiles", async () => {
    const result = await renderAstroComponent(MasonryGallery, {
      props: { images: sampleImages },
    });

    const tiles = result.querySelectorAll('[data-testid="masonry-tile"]');

    expect(tiles.length).toBe(3);
  });

  test("each tile has an image with correct src and alt", async () => {
    const result = await renderAstroComponent(MasonryGallery, {
      props: { images: sampleImages },
    });

    const images = result.querySelectorAll('[data-testid="masonry-tile"] img');

    expect(images.length).toBe(3);
    expect(images[0].getAttribute("src")).toBe("/img/photo1.jpg");
    expect(images[0].getAttribute("alt")).toBe("Photo 1");
    expect(images[1].getAttribute("src")).toBe("/img/photo2.jpg");
    expect(images[2].getAttribute("src")).toBe("/img/photo3.jpg");
  });

  test("displays description when provided", async () => {
    const result = await renderAstroComponent(MasonryGallery, {
      props: { images: sampleImages },
    });

    const captions = result.querySelectorAll(
      '[data-testid="masonry-tile-caption"]'
    );

    expect(captions.length).toBe(2);
    expect(captions[0].textContent?.trim()).toBe("First photo");
    expect(captions[1].textContent?.trim()).toBe("Second photo");
  });

  test("hides description when not provided", async () => {
    const imagesWithoutDesc: GalleryImage[] = [
      { src: "/img/photo1.jpg", alt: "Photo 1" },
    ];

    const result = await renderAstroComponent(MasonryGallery, {
      props: { images: imagesWithoutDesc },
    });

    const captions = result.querySelectorAll(
      '[data-testid="masonry-tile-caption"]'
    );

    expect(captions.length).toBe(0);
  });

  test("uses default 2 columns", async () => {
    const result = await renderAstroComponent(MasonryGallery, {
      props: { images: sampleImages },
    });

    const gallery = result.querySelector('[data-testid="masonry-gallery"]');

    expect(gallery?.getAttribute("style")).toContain("--masonry-columns: 2");
  });

  test("accepts custom column count", async () => {
    const result = await renderAstroComponent(MasonryGallery, {
      props: { images: sampleImages, columns: 3 },
    });

    const gallery = result.querySelector('[data-testid="masonry-gallery"]');

    expect(gallery?.getAttribute("style")).toContain("--masonry-columns: 3");
  });

  test("applies custom class", async () => {
    const result = await renderAstroComponent(MasonryGallery, {
      props: { images: sampleImages, class: "my-custom-class" },
    });

    const gallery = result.querySelector('[data-testid="masonry-gallery"]');

    expect(gallery?.classList.contains("my-custom-class")).toBe(true);
  });

  test("tiles have glightbox attributes", async () => {
    const result = await renderAstroComponent(MasonryGallery, {
      props: { images: sampleImages },
    });

    const tiles = result.querySelectorAll('[data-testid="masonry-tile"]');

    for (const tile of tiles) {
      expect(tile.classList.contains("glightbox")).toBe(true);
      expect(tile.getAttribute("data-gallery")).toBe("masonry-gallery");
      expect(tile.getAttribute("href")).toBeTruthy();
    }
  });

  test("tiles have data-type image for glightbox to display images", async () => {
    const result = await renderAstroComponent(MasonryGallery, {
      props: { images: sampleImages },
    });

    const tiles = result.querySelectorAll('[data-testid="masonry-tile"]');

    for (const tile of tiles) {
      expect(tile.getAttribute("data-type")).toBe("image");
    }
  });

  test("tile description is passed to glightbox data attribute", async () => {
    const result = await renderAstroComponent(MasonryGallery, {
      props: { images: sampleImages },
    });

    const tiles = result.querySelectorAll('[data-testid="masonry-tile"]');

    expect(tiles[0].getAttribute("data-description")).toBe("First photo");
    expect(tiles[2].hasAttribute("data-description")).toBe(false);
  });

  test("caption is rendered as a hover overlay", async () => {
    const result = await renderAstroComponent(MasonryGallery, {
      props: { images: sampleImages },
    });

    const caption = result.querySelector(
      '[data-testid="masonry-tile-caption"]'
    );

    expect(caption?.classList.contains("absolute")).toBe(true);
    expect(caption?.classList.contains("translate-y-full")).toBe(true);
    expect(caption?.classList.contains("group-hover:translate-y-0")).toBe(true);
  });

  test("accepts date prop without error", async () => {
    const result = await renderAstroComponent(MasonryGallery, {
      props: { images: sampleImages, date: "2025-01-15" },
    });

    const gallery = result.querySelector('[data-testid="masonry-gallery"]');

    expect(gallery).not.toBeNull();
  });
});
