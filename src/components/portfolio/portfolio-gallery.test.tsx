import type { GalleryImage } from "@components/ui/gallery/types";
import type { TagItem } from "@components/ui/tag-filter";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { PortfolioGallery } from "./portfolio-gallery";

const testTags: TagItem[] = [
  { key: "armchairs", label: "Fotele" },
  { key: "sofas", label: "Sofy" },
  { key: "chairs", label: "Krzesła" },
];

const testImages: GalleryImage[] = [
  {
    thumbnail: {
      src: "/img/1.jpg",
      alt: "Armchair 1",
      width: 800,
      height: 600,
    },
    url: "/img/1-full.jpg",
    title: "Fotel klubowy",
    description: "Desc 1",
    date: "2025-01-15",
    tags: ["armchairs", "restoration"],
  },
  {
    thumbnail: { src: "/img/2.jpg", alt: "Sofa 1", width: 800, height: 600 },
    url: "/img/2-full.jpg",
    title: "Sofa nowoczesna",
    description: "Desc 2",
    date: "2025-02-20",
    tags: ["sofas"],
  },
  {
    thumbnail: { src: "/img/3.jpg", alt: "Chair 1", width: 800, height: 1067 },
    url: "/img/3-full.jpg",
    title: "Krzesło dębowe",
    description: "Desc 3",
    date: "2025-03-10",
    tags: ["chairs"],
  },
  {
    thumbnail: {
      src: "/img/4.jpg",
      alt: "Armchair 2",
      width: 800,
      height: 600,
    },
    url: "/img/4-full.jpg",
    title: "Fotel tapicerowany",
    description: "Desc 4",
    date: "2025-04-05",
    tags: ["armchairs"],
  },
];

beforeEach(() => {
  vi.spyOn(window.history, "pushState").mockImplementation(
    // biome-ignore lint/suspicious/noEmptyBlockStatements: intentional no-op mock
    () => {}
  );
  Object.defineProperty(window, "location", {
    value: { href: "http://localhost/pl/portfolio", search: "" },
    writable: true,
  });
});

describe("PortfolioGallery", () => {
  test("renders section header with translated title", () => {
    render(<PortfolioGallery images={testImages} lang="pl" tags={testTags} />);

    expect(screen.getByText("Wszystkie realizacje")).toBeInTheDocument();
  });

  test("renders section header with translated subtitle", () => {
    render(<PortfolioGallery images={testImages} lang="pl" tags={testTags} />);

    expect(
      screen.getByText("Galeria naszych realizacji tapicerskich")
    ).toBeInTheDocument();
  });

  test("renders tag filter with all tags", () => {
    render(<PortfolioGallery images={testImages} lang="pl" tags={testTags} />);

    expect(screen.getByTestId("tag-filter")).toBeInTheDocument();
    expect(screen.getByTestId("tag-filter-all")).toBeInTheDocument();
    expect(screen.getByTestId("tag-filter-armchairs")).toBeInTheDocument();
    expect(screen.getByTestId("tag-filter-sofas")).toBeInTheDocument();
    expect(screen.getByTestId("tag-filter-chairs")).toBeInTheDocument();
  });

  test("renders all gallery tiles when no filter active", () => {
    render(<PortfolioGallery images={testImages} lang="pl" tags={testTags} />);

    const tiles = screen.getAllByTestId("gallery-tile");
    expect(tiles).toHaveLength(4);
  });

  test("filters tiles when tag is selected", async () => {
    const user = userEvent.setup();
    render(<PortfolioGallery images={testImages} lang="pl" tags={testTags} />);

    await user.click(screen.getByTestId("tag-filter-armchairs"));

    const tiles = screen.getAllByTestId("gallery-tile");
    expect(tiles).toHaveLength(2);
    expect(screen.getByAltText("Armchair 1")).toBeInTheDocument();
    expect(screen.getByAltText("Armchair 2")).toBeInTheDocument();
  });

  test("shows all tiles when All is clicked after filtering", async () => {
    const user = userEvent.setup();
    render(<PortfolioGallery images={testImages} lang="pl" tags={testTags} />);

    await user.click(screen.getByTestId("tag-filter-sofas"));
    expect(screen.getAllByTestId("gallery-tile")).toHaveLength(1);

    await user.click(screen.getByTestId("tag-filter-all"));
    expect(screen.getAllByTestId("gallery-tile")).toHaveLength(4);
  });

  test("applies initial tag from URL on mount", () => {
    Object.defineProperty(window, "location", {
      value: {
        href: "http://localhost/pl/portfolio?tag=chairs",
        search: "?tag=chairs",
      },
      writable: true,
    });

    render(<PortfolioGallery images={testImages} lang="pl" tags={testTags} />);

    const tiles = screen.getAllByTestId("gallery-tile");
    expect(tiles).toHaveLength(1);
    expect(screen.getByAltText("Chair 1")).toBeInTheDocument();
  });

  test("updates URL when tag changes", async () => {
    const user = userEvent.setup();
    render(<PortfolioGallery images={testImages} lang="pl" tags={testTags} />);

    await user.click(screen.getByTestId("tag-filter-sofas"));

    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      "",
      expect.stringContaining("tag=sofas")
    );
  });

  test("removes tag param from URL when All is clicked", async () => {
    const user = userEvent.setup();
    render(<PortfolioGallery images={testImages} lang="pl" tags={testTags} />);

    await user.click(screen.getByTestId("tag-filter-armchairs"));
    await user.click(screen.getByTestId("tag-filter-all"));

    const lastCall = vi.mocked(window.history.pushState).mock.calls.at(-1);
    const url = lastCall?.[2] as string;
    expect(url).not.toContain("tag=");
  });

  test("responds to popstate event", () => {
    render(<PortfolioGallery images={testImages} lang="pl" tags={testTags} />);

    expect(screen.getAllByTestId("gallery-tile")).toHaveLength(4);

    // Simulate browser back with ?tag=chairs
    Object.defineProperty(window, "location", {
      value: {
        href: "http://localhost/pl/portfolio?tag=chairs",
        search: "?tag=chairs",
      },
      writable: true,
    });
    act(() => {
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(screen.getAllByTestId("gallery-tile")).toHaveLength(1);
    expect(screen.getByAltText("Chair 1")).toBeInTheDocument();
  });

  test("all tag button has aria-pressed true by default", () => {
    render(<PortfolioGallery images={testImages} lang="pl" tags={testTags} />);

    expect(screen.getByTestId("tag-filter-all")).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  test("active tag button has aria-pressed true", async () => {
    const user = userEvent.setup();
    render(<PortfolioGallery images={testImages} lang="pl" tags={testTags} />);

    await user.click(screen.getByTestId("tag-filter-armchairs"));

    expect(screen.getByTestId("tag-filter-armchairs")).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByTestId("tag-filter-all")).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });
});
