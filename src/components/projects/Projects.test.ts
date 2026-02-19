import { renderAstroComponent } from "@test/helpers.ts";
import { describe, expect, test } from "vitest";
import Projects from "./Projects.astro";

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
