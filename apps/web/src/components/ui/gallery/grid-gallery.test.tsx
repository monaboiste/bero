import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { GridGallery } from "./grid-gallery";
import type { GalleryTileData } from "./types";

const sampleImages: GalleryTileData[] = [
  {
    thumbnail: {
      src: "/img/photo1.jpg",
      alt: "Photo 1",
      width: 800,
      height: 600,
    },
    url: "/img/photo1-full.jpg",
    title: "First title",
    tags: [],
  },
  {
    thumbnail: {
      src: "/img/photo2.jpg",
      alt: "Photo 2",
      width: 800,
      height: 600,
    },
    url: "/img/photo2-full.jpg",
    title: "Second title",
    tags: [],
  },
  {
    thumbnail: {
      src: "/img/photo3.jpg",
      alt: "Photo 3",
      width: 800,
      height: 600,
    },
    url: "/img/photo3-full.jpg",
    title: "Third title",
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

  test("landscape tile has landscape class", () => {
    const images: GalleryTileData[] = [
      {
        thumbnail: {
          src: "/img/photo1.jpg",
          alt: "Landscape",
          width: 800,
          height: 600,
        },
        url: "/img/photo1-full.jpg",
        title: "Wide shot",
        tags: [],
        orientation: "landscape",
      },
    ];

    render(<GridGallery images={images} />);

    const tile = screen.getByTestId("gallery-tile");
    expect(tile).toHaveClass("gallery-tile--landscape");
  });

  test("portrait tile does not have landscape class", () => {
    const images: GalleryTileData[] = [
      {
        thumbnail: {
          src: "/img/photo1.jpg",
          alt: "Portrait",
          width: 800,
          height: 1067,
        },
        url: "/img/photo1-full.jpg",
        title: "Tall shot",
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
    const images: GalleryTileData[] = [
      {
        thumbnail: {
          src: "/img/p1.jpg",
          alt: "Project A image 1",
          width: 800,
          height: 600,
        },
        url: "/img/p1-full.jpg",
        title: "Project A",
        tags: [],
        gallery: "project-a",
      },
      {
        thumbnail: {
          src: "/img/p2.jpg",
          alt: "Project A image 2",
          width: 800,
          height: 600,
        },
        url: "/img/p2-full.jpg",
        title: "Project A",
        tags: [],
        gallery: "project-a",
      },
      {
        thumbnail: {
          src: "/img/p3.jpg",
          alt: "Project B image 1",
          width: 800,
          height: 600,
        },
        url: "/img/p3-full.jpg",
        title: "Project B",
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

  test("caption is rendered as a hover overlay", () => {
    render(<GridGallery images={sampleImages} />);

    const caption = screen.getAllByTestId("gallery-tile-caption")[0];
    expect(caption).toHaveClass("absolute");
    expect(caption).toHaveClass("translate-y-full");
    expect(caption).toHaveClass("group-hover:translate-y-0");
  });

  test("image has width and height attributes", () => {
    render(<GridGallery images={sampleImages} />);

    const img = screen.getByAltText("Photo 1");
    expect(img).toHaveAttribute("width", "800");
    expect(img).toHaveAttribute("height", "600");
  });
});
