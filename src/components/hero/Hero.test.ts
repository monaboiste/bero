import { renderAstroComponent } from "@test/helpers.ts";
import { describe, expect, test, vi } from "vitest";

vi.mock("motion", () => ({
  animate: vi.fn(),
}));

import Hero from "./Hero.astro";

describe("Hero", () => {
  test("renders section with id home", async () => {
    const result = await renderAstroComponent(Hero);

    const section = result.querySelector('[id="home"]');

    expect(section).not.toBeNull();
    expect(section?.getAttribute("data-testid")).toBe("hero");
  });

  test("displays main title", async () => {
    const result = await renderAstroComponent(Hero);

    const title = result.querySelector('[data-testid="hero-title"]');

    expect(title?.textContent).toContain("Tradycja spotyka nowoczesność");
  });

  test("displays description text", async () => {
    const result = await renderAstroComponent(Hero);

    const description = result.textContent;

    expect(description).toContain("Przywracamy życie Twoim ulubionym meblom");
  });

  test("renders CTA button linking to contact section", async () => {
    const result = await renderAstroComponent(Hero);

    const ctaButton = result.querySelector('[data-testid="hero-cta-primary"]');

    expect(ctaButton).not.toBeNull();
    expect(ctaButton?.getAttribute("href")).toBe("/#contact");
    expect(ctaButton?.textContent).toContain("Skontaktuj się z nami");
  });

  test("renders secondary link to projects section", async () => {
    const result = await renderAstroComponent(Hero);

    const projectsLink = result.querySelector(
      '[data-testid="hero-cta-secondary"]'
    );

    expect(projectsLink).not.toBeNull();
    expect(projectsLink?.getAttribute("href")).toBe("/#projects");
    expect(projectsLink?.textContent).toContain("Nasze realizacje");
  });

  test("renders hero background image", async () => {
    const result = await renderAstroComponent(Hero);

    const image = result.querySelector("img");

    expect(image).not.toBeNull();
    expect(image?.getAttribute("width")).toBe("1920");
    expect(image?.getAttribute("height")).toBe("1080");
  });
});
