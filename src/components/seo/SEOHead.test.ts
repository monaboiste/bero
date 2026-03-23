import { renderAstroComponent } from "@test/helpers.ts";
import { describe, expect, test } from "vitest";
import SEOHead from "./SEOHead.astro";

describe("SEOHead", () => {
  test("renders default title", async () => {
    const result = await renderAstroComponent(SEOHead);

    const title = result.querySelector("title");

    expect(title?.textContent).toBe("Studio Tapicerskie BERO");
  });

  test("renders custom title when provided", async () => {
    const result = await renderAstroComponent(SEOHead, {
      props: { title: "Custom Title" },
    });

    const title = result.querySelector("title");

    expect(title?.textContent).toBe("Custom Title");
  });

  test("renders meta description with default value", async () => {
    const result = await renderAstroComponent(SEOHead);

    const description = result.querySelector('meta[name="description"]');

    expect(description?.getAttribute("content")).toBe(
      "Profesjonalne tapicerstwo – renowacja mebli i realizacje na zamówienie. Ponad 20 lat doświadczenia i najwyższa jakość wykonania."
    );
  });

  test("renders Open Graph tags", async () => {
    const result = await renderAstroComponent(SEOHead, {
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
    const result = await renderAstroComponent(SEOHead, {
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
    const result = await renderAstroComponent(SEOHead);

    const canonical = result.querySelector('link[rel="canonical"]');
    const ogUrl = result.querySelector('meta[property="og:url"]');

    expect(canonical?.getAttribute("href")).toBeTruthy();
    expect(ogUrl?.getAttribute("content")).toBeTruthy();
    expect(canonical?.getAttribute("href")).toBe(
      ogUrl?.getAttribute("content")
    );
  });

  test("conditionally renders og:image and twitter:image", async () => {
    const withoutImage = await renderAstroComponent(SEOHead);
    const withImage = await renderAstroComponent(SEOHead, {
      props: { image: "https://example.com/image.jpg" },
    });

    const ogImageWithout = withoutImage.querySelector(
      'meta[property="og:image"]'
    );
    const twitterImageWithout = withoutImage.querySelector(
      'meta[name="twitter:image"]'
    );

    const ogImageWith = withImage.querySelector('meta[property="og:image"]');
    const twitterImageWith = withImage.querySelector(
      'meta[name="twitter:image"]'
    );

    expect(ogImageWithout).toBeNull();
    expect(twitterImageWithout).toBeNull();
    expect(ogImageWith?.getAttribute("content")).toBe(
      "https://example.com/image.jpg"
    );
    expect(twitterImageWith?.getAttribute("content")).toBe(
      "https://example.com/image.jpg"
    );
  });
});
