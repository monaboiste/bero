import { renderAstroComponent } from "@test/helpers.ts";
import { describe, expect, test } from "vitest";
import Layout from "./Layout.astro";

describe("Layout", () => {
  test("renders document structure", async () => {
    const result = await renderAstroComponent(Layout, {
      slots: { default: "<p>Test content</p>" },
    });

    const viewport = result.querySelector('meta[name="viewport"]');

    expect(viewport).not.toBeNull();
  });

  test("contains viewport meta tag", async () => {
    const result = await renderAstroComponent(Layout, {
      slots: { default: "<p>Test content</p>" },
    });

    const viewport = result.querySelector('meta[name="viewport"]');

    expect(viewport).not.toBeNull();
    expect(viewport?.getAttribute("content")).toContain("width=device-width");
  });

  test("loads Google Fonts", async () => {
    const result = await renderAstroComponent(Layout, {
      slots: { default: "<p>Test content</p>" },
    });

    const fontLinks = result.querySelectorAll('link[rel="stylesheet"]');
    const googleFontLink = Array.from(fontLinks).find((link) =>
      link.getAttribute("href")?.includes("fonts.googleapis.com")
    );

    expect(googleFontLink).not.toBeNull();
    expect(googleFontLink?.getAttribute("href")).toContain("Montserrat");
    expect(googleFontLink?.getAttribute("href")).toContain("Comforter+Brush");
  });

  test("contains dark mode script with localStorage check", async () => {
    const result = await renderAstroComponent(Layout, {
      slots: { default: "<p>Test content</p>" },
    });

    const script = result.querySelector("script");
    const scriptContent = script?.textContent;

    expect(scriptContent).toContain('localStorage.getItem("theme")');
  });

  test("passes props to SEOHead component", async () => {
    const result = await renderAstroComponent(Layout, {
      props: { title: "Custom Title" },
      slots: { default: "<p>Test content</p>" },
    });

    const title = result.querySelector("title");

    expect(title?.textContent).toBe("Custom Title");
  });

  test("renders slot content in body", async () => {
    const result = await renderAstroComponent(Layout, {
      slots: { default: '<p id="test-content">Test paragraph</p>' },
    });

    const testContent = result.querySelector("#test-content");

    expect(testContent).not.toBeNull();
    expect(testContent?.textContent).toBe("Test paragraph");
  });
});
