import { describe, expect, test } from "vitest";
import { renderAstroComponent } from "../../test/helpers.ts";
import About from "./About.astro";

describe("About", () => {
  test("renders section with id about", async () => {
    const result = await renderAstroComponent(About);

    const section = result.querySelector('[id="about"]');

    expect(section).not.toBeNull();
    expect(section?.getAttribute("data-testid")).toBe("about");
  });

  test("displays O Nas header", async () => {
    const result = await renderAstroComponent(About);

    const heading = result.querySelector("h2");

    expect(heading?.textContent?.trim()).toContain("O Nas");
  });

  test("displays company story text", async () => {
    const result = await renderAstroComponent(About);

    const storySection = result.querySelector('[data-testid="about-story"]');

    expect(storySection?.textContent).toContain(
      "Studio Tapicerskie BERO to rodzinna firma z ponad 20-letnim doswiadczeniem"
    );
  });

  test("displays mission text", async () => {
    const result = await renderAstroComponent(About);

    const storySection = result.querySelector('[data-testid="about-story"]');

    expect(storySection?.textContent).toContain(
      "Nasza misja jest przywracanie piekna i funkcjonalnosci ulubionym meblom"
    );
  });

  test("renders craftsman image", async () => {
    const result = await renderAstroComponent(About);

    const image = result.querySelector('img[alt="Craftsman working"]');

    expect(image).not.toBeNull();
  });

  test("renders 4 stat cards with correct target values", async () => {
    const result = await renderAstroComponent(About);
    const statsSection = result.querySelector('[data-testid="about-stats"]');

    const counterElements = statsSection?.querySelectorAll(
      '[data-animate="stat-card-value"]'
    );

    const targets = Array.from(counterElements || []).map((el) =>
      el.getAttribute("data-target")
    );

    expect(targets).toContain("20");
    expect(targets).toContain("500");
    expect(targets).toContain("100");

    expect(statsSection?.textContent).toContain("∞");
  });

  test("renders 4 service cards", async () => {
    const result = await renderAstroComponent(About);

    const servicesSection = result.querySelector(
      '[data-testid="about-services"]'
    );
    const serviceCards = servicesSection?.querySelectorAll(
      '[data-testid="service-card"]'
    );

    expect(serviceCards?.length).toBe(4);

    const servicesText = servicesSection?.textContent;
    expect(servicesText).toContain("Renowacja mebli");
    expect(servicesText).toContain("Wymiana tapicerki");
    expect(servicesText).toContain("Naprawa konstrukcji");
    expect(servicesText).toContain("Tapicerstwo samochodowe");
  });

  test("displays Nasze Uslugi header", async () => {
    const result = await renderAstroComponent(About);

    const servicesSection = result.querySelector(
      '[data-testid="about-services"]'
    );
    const servicesHeader = servicesSection?.querySelector("h3");

    expect(servicesHeader?.textContent).toContain("Nasze Uslugi");
  });
});
