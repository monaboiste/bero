import { renderAstroComponent } from "@test/helpers.ts";
import { describe, expect, test, vi } from "vitest";

vi.mock("@lib/content/content", () => ({
  getLatestPortfolioEntries: vi.fn().mockResolvedValue([
    {
      title: "Renowacja fotela klubowego",
      slug: "renowacja-fotela-klubowego",
      excerpt: "Kompleksowa odnowa klasycznego fotela klubowego",
      description: "Długi opis renowacji fotela klubowego",
      featuredImageUrl: "/img/mock1.jpg",
      featuredImageFullUrl: "/img/mock1-full.jpg",
      date: "2026-02-12",
      highlight: true,
      tags: ["armchairs", "restoration"],
    },
    {
      title: "Nowoczesny fotel tapicerowany",
      slug: "nowoczesny-fotel-tapicerowany",
      excerpt: "Stworzenie eleganckiego fotela",
      description: "Długi opis nowoczesnego fotela",
      featuredImageUrl: "/img/mock2.jpg",
      featuredImageFullUrl: "/img/mock2-full.jpg",
      date: "2026-01-06",
      highlight: false,
      tags: ["armchairs"],
    },
    {
      title: "Zestaw mebli tapicerowanych",
      slug: "zestaw-mebli-tapicerowanych",
      excerpt: "Kompleksowa tapicerka zestawu salonowego",
      description: "Długi opis zestawu mebli",
      featuredImageUrl: "/img/mock3.jpg",
      featuredImageFullUrl: "/img/mock3-full.jpg",
      date: "2025-12-01",
      highlight: false,
      tags: ["sofas"],
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
