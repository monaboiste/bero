import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { GridGallery } from "./grid-gallery";
import type { GalleryImage } from "./types";

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
  test("renders gallery container", () => {
    render(<GridGallery images={sampleImages} />);

    const gallery = screen.getByTestId("gallery");
    expect(gallery).toBeInTheDocument();
  });

  test("renders correct number of tiles", () => {
    render(<GridGallery images={sampleImages} />);

    const tiles = screen.getAllByTestId("gallery-tile");
    expect(tiles).toHaveLength(3);
  });

  test("each tile has an image with correct alt", () => {
    render(<GridGallery images={sampleImages} />);

    expect(screen.getByAltText("Photo 1")).toBeInTheDocument();
    expect(screen.getByAltText("Photo 2")).toBeInTheDocument();
    expect(screen.getByAltText("Photo 3")).toBeInTheDocument();
  });

  test("displays caption for each tile", () => {
    render(<GridGallery images={sampleImages} />);

    const captions = screen.getAllByTestId("gallery-tile-caption");
    expect(captions).toHaveLength(3);
    expect(captions[0]).toHaveTextContent("First title");
    expect(captions[1]).toHaveTextContent("Second title");
    expect(captions[2]).toHaveTextContent("Third title");
  });

  test("every tile has a hidden glightbox-desc element", () => {
    render(<GridGallery images={sampleImages} />);

    const tiles = screen.getAllByTestId("gallery-tile");
    for (const tile of tiles) {
      const desc = tile.querySelector(".glightbox-desc");
      expect(desc).not.toBeNull();
      expect(desc).toHaveClass("hidden");
    }
  });

  test("landscape tile has landscape class", () => {
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

    render(<GridGallery images={images} />);

    const tile = screen.getByTestId("gallery-tile");
    expect(tile).toHaveClass("gallery-tile--landscape");
  });

  test("portrait tile does not have landscape class", () => {
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

    render(<GridGallery images={images} />);

    const tile = screen.getByTestId("gallery-tile");
    expect(tile).not.toHaveClass("gallery-tile--landscape");
  });

  test("tile without orientation does not have landscape class", () => {
    render(<GridGallery images={sampleImages} />);

    const tiles = screen.getAllByTestId("gallery-tile");
    for (const tile of tiles) {
      expect(tile).not.toHaveClass("gallery-tile--landscape");
    }
  });

  test("applies custom class", () => {
    render(<GridGallery className="my-custom-class" images={sampleImages} />);

    const gallery = screen.getByTestId("gallery");
    expect(gallery).toHaveClass("my-custom-class");
  });

  test("tiles have glightbox attributes", () => {
    render(<GridGallery images={sampleImages} />);

    const tiles = screen.getAllByTestId("gallery-tile");
    for (const tile of tiles) {
      expect(tile).toHaveClass("glightbox");
      expect(tile).toHaveAttribute("data-gallery", "gallery");
      expect(tile).toHaveAttribute("href");
    }
  });

  test("tiles use custom gallery name when provided", () => {
    const images: GalleryImage[] = [
      {
        thumbnail: "/img/p1.jpg",
        url: "/img/p1-full.jpg",
        alt: "Project A image 1",
        title: "Project A",
        description: "Desc A",
        tags: [],
        gallery: "project-a",
      },
      {
        thumbnail: "/img/p2.jpg",
        url: "/img/p2-full.jpg",
        alt: "Project A image 2",
        title: "Project A",
        description: "Desc A",
        tags: [],
        gallery: "project-a",
      },
      {
        thumbnail: "/img/p3.jpg",
        url: "/img/p3-full.jpg",
        alt: "Project B image 1",
        title: "Project B",
        description: "Desc B",
        tags: [],
        gallery: "project-b",
      },
    ];

    render(<GridGallery images={images} />);

    const tiles = screen.getAllByTestId("gallery-tile");
    expect(tiles[0]).toHaveAttribute("data-gallery", "project-a");
    expect(tiles[1]).toHaveAttribute("data-gallery", "project-a");
    expect(tiles[2]).toHaveAttribute("data-gallery", "project-b");
  });

  test("tiles have data-type image for glightbox to display images", () => {
    render(<GridGallery images={sampleImages} />);

    const tiles = screen.getAllByTestId("gallery-tile");
    for (const tile of tiles) {
      expect(tile).toHaveAttribute("data-type", "image");
    }
  });

  test("glightbox-desc contains description text", () => {
    render(<GridGallery images={sampleImages} />);

    const tiles = screen.getAllByTestId("gallery-tile");
    const desc = tiles[0].querySelector(".glightbox-desc");

    expect(desc).not.toBeNull();
    expect(desc).toHaveClass("hidden");
    expect(
      desc?.querySelector(".lightbox-desc-text")?.textContent?.trim()
    ).toBe("First photo");
  });

  test("caption is rendered as a hover overlay", () => {
    render(<GridGallery images={sampleImages} />);

    const caption = screen.getAllByTestId("gallery-tile-caption")[0];
    expect(caption).toHaveClass("absolute");
    expect(caption).toHaveClass("translate-y-full");
    expect(caption).toHaveClass("group-hover:translate-y-0");
  });

  test("lightbox desc shows title and date badge when provided", () => {
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

    render(<GridGallery images={images} />);

    const tile = screen.getByTestId("gallery-tile");
    const desc = tile.querySelector(".glightbox-desc");
    const title = desc?.querySelector(".lightbox-desc-title");
    const date = desc?.querySelector(".lightbox-desc-date");
    const text = desc?.querySelector(".lightbox-desc-text");

    expect(title?.textContent?.trim()).toBe("Fotel klubowy");
    expect(date?.textContent?.trim()).toBe("2025-01");
    expect(text?.textContent?.trim()).toBe("Opis projektu");
  });
});
