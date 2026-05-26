import { renderAstroComponent } from "@test/helpers.ts";
import { describe, expect, test, vi } from "vitest";
import SeoHead from "./seo/seo-head.astro";

vi.stubEnv("SITE", "https://unit.vitest");

describe("SeoHead", () => {
  test("renders default title", async () => {
    const result = await renderAstroComponent(SeoHead);

    const title = result.querySelector("title");

    expect(title?.textContent).toBe("Studio Tapicerskie BERO");
  });

  test("renders custom title when provided", async () => {
    const result = await renderAstroComponent(SeoHead, {
      props: { title: "Custom Title" },
    });

    const title = result.querySelector("title");

    expect(title?.textContent).toBe("Custom Title");
  });

  test("renders meta description with default value", async () => {
    const result = await renderAstroComponent(SeoHead);

    const description = result.querySelector('meta[name="description"]');

    expect(description?.getAttribute("content")).toBe(
      "Profesjonalne tapicerstwo – renowacja mebli i realizacje na zamówienie. Ponad 20 lat doświadczenia i najwyższa jakość wykonania."
    );
  });

  test("renders Open Graph tags", async () => {
    const result = await renderAstroComponent(SeoHead, {
      props: {
        title: "Test Title",
        description: "Test Description",
      },
    });

    const ogTitle = result.querySelector('meta[property="og:title"]');
    const ogDescription = result.querySelector(
      'meta[property="og:description"]'
    );
    const ogType = result.querySelector('meta[property="og:type"]');

    expect(ogTitle?.getAttribute("content")).toBe("Test Title");
    expect(ogDescription?.getAttribute("content")).toBe("Test Description");
    expect(ogType?.getAttribute("content")).toBe("website");
  });

  test("renders Twitter Card tags", async () => {
    const result = await renderAstroComponent(SeoHead, {
      props: {
        title: "Test Title",
        description: "Test Description",
      },
    });

    const twitterCard = result.querySelector('meta[name="twitter:card"]');
    const twitterTitle = result.querySelector('meta[name="twitter:title"]');
    const twitterDescription = result.querySelector(
      'meta[name="twitter:description"]'
    );

    expect(twitterCard?.getAttribute("content")).toBe("summary_large_image");
    expect(twitterTitle?.getAttribute("content")).toBe("Test Title");
    expect(twitterDescription?.getAttribute("content")).toBe(
      "Test Description"
    );
  });

  test("always renders canonical link and og:url", async () => {
    const result = await renderAstroComponent(SeoHead);

    const canonical = result.querySelector('link[rel="canonical"]');
    const ogUrl = result.querySelector('meta[property="og:url"]');

    expect(canonical?.getAttribute("href")).toBeTruthy();
    expect(ogUrl?.getAttribute("content")).toBeTruthy();
    expect(canonical?.getAttribute("href")).toBe(
      ogUrl?.getAttribute("content")
    );
  });

  test("renders default og:image and twitter:image when no image prop provided", async () => {
    const result = await renderAstroComponent(SeoHead);

    const ogImage = result.querySelector('meta[property="og:image"]');
    const twitterImage = result.querySelector('meta[name="twitter:image"]');

    expect(ogImage).not.toBeNull();
    expect(twitterImage).not.toBeNull();
    expect(ogImage?.getAttribute("content")).toContain("/seo-image.png");
    expect(twitterImage?.getAttribute("content")).toContain("/seo-image.png");
  });

  test("renders custom og:image and twitter:image when image prop provided", async () => {
    const result = await renderAstroComponent(SeoHead, {
      props: { image: "https://example.com/image.jpg" },
    });

    const ogImage = result.querySelector('meta[property="og:image"]');
    const twitterImage = result.querySelector('meta[name="twitter:image"]');

    expect(ogImage?.getAttribute("content")).toBe(
      "https://example.com/image.jpg"
    );
    expect(twitterImage?.getAttribute("content")).toBe(
      "https://example.com/image.jpg"
    );
  });

  test('renders default robots meta tag with "index, follow"', async () => {
    const result = await renderAstroComponent(SeoHead);

    const robots = result.querySelector('meta[name="robots"]');

    expect(robots?.getAttribute("content")).toBe("index, follow");
  });

  test("renders custom robots value when provided", async () => {
    const result = await renderAstroComponent(SeoHead, {
      props: { robots: "noindex, follow" },
    });

    const robots = result.querySelector('meta[name="robots"]');

    expect(robots?.getAttribute("content")).toBe("noindex, follow");
  });

  test("renders og:locale with default locale pl_PL", async () => {
    const result = await renderAstroComponent(SeoHead);

    const ogLocale = result.querySelector('meta[property="og:locale"]');

    expect(ogLocale?.getAttribute("content")).toBe("pl_PL");
  });

  test("renders og:locale:alternate tags for non-current locales", async () => {
    const result = await renderAstroComponent(SeoHead);

    const alternates = result.querySelectorAll(
      'meta[property="og:locale:alternate"]'
    );
    const values = Array.from(alternates).map((el) =>
      el.getAttribute("content")
    );

    expect(values).toContain("en_US");
    expect(values).toContain("de_DE");
    expect(values).not.toContain("pl_PL");
  });

  test("renders og:site_name from translations", async () => {
    const result = await renderAstroComponent(SeoHead);

    const ogSiteName = result.querySelector('meta[property="og:site_name"]');

    expect(ogSiteName?.getAttribute("content")).toBe("Studio Tapicerskie BERO");
  });
});
