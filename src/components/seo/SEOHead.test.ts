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
      "Profesjonalne uslugi tapicerskie - renowacja mebli, tapicerowanie na zamowienie. Ponad 20 lat doswiadczenia."
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

  test("conditionally renders og:url only when provided", async () => {
    const withoutUrl = await renderAstroComponent(SEOHead);
    const withUrl = await renderAstroComponent(SEOHead, {
      props: { url: "https://example.com" },
    });

    const ogUrlWithout = withoutUrl.querySelector('meta[property="og:url"]');
    const ogUrlWith = withUrl.querySelector('meta[property="og:url"]');

    expect(ogUrlWithout).toBeNull();
    expect(ogUrlWith?.getAttribute("content")).toBe("https://example.com");
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
