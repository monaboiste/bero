import { renderAstroComponent } from "@test/helpers.ts";
import { describe, expect, test } from "vitest";
import type { GalleryImage } from "./GridGallery.astro";
import GridGallery from "./GridGallery.astro";

const sampleImages: GalleryImage[] = [
  {
    thumbnail: "/img/photo1.jpg",
    url: "/img/photo1-full.jpg",
    alt: "Photo 1",
    title: "First title",
    description: "First photo",
    date: "2025-01-15",
    tags: [],
  },
  {
    thumbnail: "/img/photo2.jpg",
    url: "/img/photo2-full.jpg",
    alt: "Photo 2",
    title: "Second title",
    description: "Second photo",
    date: "2025-02-20",
    tags: [],
  },
  {
    thumbnail: "/img/photo3.jpg",
    url: "/img/photo3-full.jpg",
    alt: "Photo 3",
    title: "Third title",
    description: "Third photo",
    date: "2025-03-10",
    tags: [],
  },
];

describe("GridGallery", () => {
  test("renders gallery container", async () => {
    const result = await renderAstroComponent(GridGallery, {
      props: { images: sampleImages },
    });

    const gallery = result.querySelector('[data-testid="gallery"]');

    expect(gallery).not.toBeNull();
  });

  test("renders correct number of tiles", async () => {
    const result = await renderAstroComponent(GridGallery, {
      props: { images: sampleImages },
    });

    const tiles = result.querySelectorAll('[data-testid="gallery-tile"]');

    expect(tiles.length).toBe(3);
  });

  test("each tile has an image with correct alt", async () => {
    const result = await renderAstroComponent(GridGallery, {
      props: { images: sampleImages },
    });

    const images = result.querySelectorAll('[data-testid="gallery-tile"] img');

    expect(images.length).toBe(3);
    expect(images[0].getAttribute("alt")).toBe("Photo 1");
    expect(images[1].getAttribute("alt")).toBe("Photo 2");
    expect(images[2].getAttribute("alt")).toBe("Photo 3");
  });

  test("displays caption for each tile", async () => {
    const result = await renderAstroComponent(GridGallery, {
      props: { images: sampleImages },
    });

    const captions = result.querySelectorAll(
      '[data-testid="gallery-tile-caption"]'
    );

    expect(captions.length).toBe(3);
    expect(captions[0].textContent?.trim()).toBe("First title");
    expect(captions[1].textContent?.trim()).toBe("Second title");
    expect(captions[2].textContent?.trim()).toBe("Third title");
  });

  test("every tile has a hidden glightbox-desc element", async () => {
    const result = await renderAstroComponent(GridGallery, {
      props: { images: sampleImages },
    });

    const tiles = result.querySelectorAll('[data-testid="gallery-tile"]');

    for (const tile of tiles) {
      const desc = tile.querySelector(".glightbox-desc");
      expect(desc).not.toBeNull();
      expect(desc?.classList.contains("hidden")).toBe(true);
    }
  });

  test("landscape tile has landscape class", async () => {
    const images: GalleryImage[] = [
      {
        thumbnail: "/img/photo1.jpg",
        url: "/img/photo1-full.jpg",
        alt: "Landscape",
        title: "Wide shot",
        description: "A wide photo",
        tags: [],
        orientation: "landscape",
      },
    ];

    const result = await renderAstroComponent(GridGallery, {
      props: { images },
    });

    const tile = result.querySelector('[data-testid="gallery-tile"]');

    expect(tile?.classList.contains("gallery-tile--landscape")).toBe(true);
  });

  test("portrait tile does not have landscape class", async () => {
    const images: GalleryImage[] = [
      {
        thumbnail: "/img/photo1.jpg",
        url: "/img/photo1-full.jpg",
        alt: "Portrait",
        title: "Tall shot",
        description: "A tall photo",
        tags: [],
        orientation: "portrait",
      },
    ];

    const result = await renderAstroComponent(GridGallery, {
      props: { images },
    });

    const tile = result.querySelector('[data-testid="gallery-tile"]');

    expect(tile?.classList.contains("gallery-tile--landscape")).toBe(false);
  });

  test("tile without orientation does not have landscape class", async () => {
    const result = await renderAstroComponent(GridGallery, {
      props: { images: sampleImages },
    });

    const tiles = result.querySelectorAll('[data-testid="gallery-tile"]');

    for (const tile of tiles) {
      expect(tile.classList.contains("gallery-tile--landscape")).toBe(false);
    }
  });

  test("applies custom class", async () => {
    const result = await renderAstroComponent(GridGallery, {
      props: { images: sampleImages, class: "my-custom-class" },
    });

    const gallery = result.querySelector('[data-testid="gallery"]');

    expect(gallery?.classList.contains("my-custom-class")).toBe(true);
  });

  test("tiles have glightbox attributes", async () => {
    const result = await renderAstroComponent(GridGallery, {
      props: { images: sampleImages },
    });

    const tiles = result.querySelectorAll('[data-testid="gallery-tile"]');

    for (const tile of tiles) {
      expect(tile.classList.contains("glightbox")).toBe(true);
      expect(tile.getAttribute("data-gallery")).toBe("gallery");
      expect(tile.getAttribute("href")).toBeTruthy();
    }
  });

  test("tiles have data-type image for glightbox to display images", async () => {
    const result = await renderAstroComponent(GridGallery, {
      props: { images: sampleImages },
    });

    const tiles = result.querySelectorAll('[data-testid="gallery-tile"]');

    for (const tile of tiles) {
      expect(tile.getAttribute("data-type")).toBe("image");
    }
  });

  test("glightbox-desc contains description text", async () => {
    const result = await renderAstroComponent(GridGallery, {
      props: { images: sampleImages },
    });

    const tiles = result.querySelectorAll('[data-testid="gallery-tile"]');
    const desc0 = tiles[0].querySelector(".glightbox-desc");

    expect(desc0).not.toBeNull();
    expect(desc0?.classList.contains("hidden")).toBe(true);
    expect(
      desc0?.querySelector(".lightbox-desc-text")?.textContent?.trim()
    ).toBe("First photo");
  });

  test("caption is rendered as a hover overlay", async () => {
    const result = await renderAstroComponent(GridGallery, {
      props: { images: sampleImages },
    });

    const caption = result.querySelector(
      '[data-testid="gallery-tile-caption"]'
    );

    expect(caption?.classList.contains("absolute")).toBe(true);
    expect(caption?.classList.contains("translate-y-full")).toBe(true);
    expect(caption?.classList.contains("group-hover:translate-y-0")).toBe(true);
  });

  test("lightbox desc shows title and date badge when provided", async () => {
    const images: GalleryImage[] = [
      {
        thumbnail: "/img/p.jpg",
        url: "",
        alt: "Project",
        title: "Fotel klubowy",
        description: "Opis projektu",
        date: "2025-01-15",
        tags: [],
      },
    ];

    const result = await renderAstroComponent(GridGallery, {
      props: { images },
    });

    const tile = result.querySelector('[data-testid="gallery-tile"]');
    const desc = tile?.querySelector(".glightbox-desc");
    const title = desc?.querySelector(".lightbox-desc-title");
    const date = desc?.querySelector(".lightbox-desc-date");
    const text = desc?.querySelector(".lightbox-desc-text");

    expect(title?.textContent?.trim()).toBe("Fotel klubowy");
    expect(date?.textContent?.trim()).toBe("2025-01");
    expect(text?.textContent?.trim()).toBe("Opis projektu");
  });

  test("caption shows title when title is provided", async () => {
    const images: GalleryImage[] = [
      {
        thumbnail: "/img/p.jpg",
        url: "",
        alt: "Project",
        title: "Fotel klubowy",
        description: "Opis projektu",
        tags: [],
      },
    ];

    const result = await renderAstroComponent(GridGallery, {
      props: { images },
    });

    const caption = result.querySelector(
      '[data-testid="gallery-tile-caption"] p'
    );

    expect(caption?.textContent?.trim()).toBe("Fotel klubowy");
  });
});
