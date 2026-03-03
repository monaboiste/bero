import { renderAstroComponent } from "@test/helpers.ts";
import { describe, expect, test, vi } from "vitest";

vi.mock("../../lib/content", () => ({
  getLatestPortfolioEntries: vi.fn().mockResolvedValue([
    {
      id: "1",
      data: {
        title: "Renowacja fotela klubowego",
        excerpt: "Kompleksowa odnowa klasycznego fotela klubowego",
        featured_image: {
          src: "/img/mock1.jpg",
          width: 800,
          height: 600,
          format: "jpg",
        },
        date: new Date("2026-02-12"),
        highlight: true,
        tags: ["Fotele", "Renowacja"],
        description: "Pelny opis",
      },
    },
    {
      id: "2",
      data: {
        title: "Nowoczesny fotel tapicerowany",
        excerpt: "Stworzenie eleganckiego fotela",
        featured_image: {
          src: "/img/mock2.jpg",
          width: 800,
          height: 600,
          format: "jpg",
        },
        date: new Date("2026-01-06"),
        highlight: false,
        tags: ["Fotele"],
        description: "Pelny opis 2",
      },
    },
    {
      id: "3",
      data: {
        title: "Zestaw mebli tapicerowanych",
        excerpt: "Kompleksowa tapicerka zestawu salonowego",
        featured_image: {
          src: "/img/mock3.jpg",
          width: 800,
          height: 600,
          format: "jpg",
        },
        date: new Date("2025-12-01"),
        highlight: false,
        tags: ["Sofy"],
        description: "Pelny opis 3",
      },
    },
  ]),
}));

const Projects = (await import("./Projects.astro")).default;

describe("Projects", () => {
  test("renders section with id projects", async () => {
    const result = await renderAstroComponent(Projects);

    const section = result.querySelector('[id="projects"]');

    expect(section).not.toBeNull();
    expect(section?.getAttribute("data-testid")).toBe("projects");
  });

  test("displays Nasze Realizacje header", async () => {
    const result = await renderAstroComponent(Projects);

    const heading = result.querySelector("h2");

    expect(heading?.textContent?.trim()).toContain("Nasze Realizacje");
  });

  test("renders 3 project cards", async () => {
    const result = await renderAstroComponent(Projects);

    const projectsGrid = result.querySelector('[data-testid="projects-grid"]');
    const projectCards = projectsGrid?.querySelectorAll(
      '[data-testid="project-card"]'
    );

    expect(projectCards?.length).toBe(3);
  });

  test("each card has correct titles", async () => {
    const result = await renderAstroComponent(Projects);

    const projectsText = result.textContent;

    expect(projectsText).toContain("Renowacja fotela klubowego");
    expect(projectsText).toContain("Nowoczesny fotel tapicerowany");
    expect(projectsText).toContain("Zestaw mebli tapicerowanych");
  });

  test("each card has an image", async () => {
    const result = await renderAstroComponent(Projects);

    const projectsGrid = result.querySelector('[data-testid="projects-grid"]');
    const images = projectsGrid?.querySelectorAll("img");

    expect(images?.length).toBe(3);
  });

  test("renders view all button", async () => {
    const result = await renderAstroComponent(Projects);

    const viewAllButton = result.querySelector(
      '[data-testid="projects-view-all"]'
    );

    expect(viewAllButton).not.toBeNull();
    expect(viewAllButton?.textContent).toContain("Zobacz wszystkie realizacje");
  });
});
