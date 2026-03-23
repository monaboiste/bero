import { renderAstroComponent, renderAstroDocument } from "@test/helpers.ts";
import { describe, expect, test } from "vitest";
import Layout from "./Layout.astro";

describe("Layout", () => {
  test("renders document structure", async () => {
    const result = await renderAstroComponent(Layout);

    const viewport = result.querySelector('meta[name="viewport"]');

    expect(viewport).not.toBeNull();
  });

  test("contains viewport meta tag", async () => {
    const result = await renderAstroComponent(Layout);

    const viewport = result.querySelector('meta[name="viewport"]');

    expect(viewport).not.toBeNull();
    expect(viewport?.getAttribute("content")).toContain("width=device-width");
  });

  test("loads Google Fonts", async () => {
    const result = await renderAstroComponent(Layout);

    const fontLinks = result.querySelectorAll('link[rel="stylesheet"]');
    const googleFontLink = Array.from(fontLinks).find((link) =>
      link.getAttribute("href")?.includes("fonts.googleapis.com")
    );

    expect(googleFontLink).not.toBeNull();
    expect(googleFontLink?.getAttribute("href")).toContain("Montserrat");
    expect(googleFontLink?.getAttribute("href")).toContain("Comforter+Brush");
  });

  test("contains dark mode script with localStorage check", async () => {
    const result = await renderAstroComponent(Layout);

    const script = result.querySelector("script:not([type])");
    const scriptContent = script?.textContent;

    expect(scriptContent).toContain('localStorage.getItem("theme")');
  });

  test("passes props to SEOHead component", async () => {
    const result = await renderAstroComponent(Layout, {
      props: { title: "Custom Title" },
    });

    const title = result.querySelector("title");

    expect(title?.textContent).toBe("Custom Title");
  });

  test("renders slot content in body", async () => {
    const result = await renderAstroComponent(Layout, {
      slots: { default: '<p id="test-content">Test paragraph</p>' },
    });

    const main = result.querySelector("main");
    const testContent = main?.querySelector("#test-content");

    expect(testContent).not.toBeNull();
    expect(testContent?.textContent).toBe("Test paragraph");
  });

  test("body has sticky footer flex layout classes", async () => {
    const doc = await renderAstroDocument(Layout);

    const body = doc.querySelector("body");

    expect(body?.classList.contains("min-h-screen")).toBe(true);
    expect(body?.classList.contains("flex")).toBe(true);
    expect(body?.classList.contains("flex-col")).toBe(true);
  });

  test("main element has flex-1 class", async () => {
    const result = await renderAstroComponent(Layout);

    const main = result.querySelector("main");

    expect(main).not.toBeNull();
    expect(main?.className).toContain("flex-1");
  });

  test("applies mainClass prop to main element", async () => {
    const result = await renderAstroComponent(Layout, {
      props: { mainClass: "bg-secondary pt-36 pb-20" },
    });

    const main = result.querySelector("main");

    expect(main?.className).toContain("flex-1");
    expect(main?.className).toContain("bg-secondary");
    expect(main?.className).toContain("pt-36");
    expect(main?.className).toContain("pb-20");
  });

  test("renders navigation, main, and footer in correct order", async () => {
    const result = await renderAstroComponent(Layout);

    const nav = result.querySelector("nav");
    const main = result.querySelector("main");
    const footer = result.querySelector("footer");

    expect(nav).not.toBeNull();
    expect(main).not.toBeNull();
    expect(footer).not.toBeNull();

    const position = (el: Element | null) => {
      if (!el) {
        return -1;
      }
      return Array.from(result.querySelectorAll("*")).indexOf(el);
    };

    expect(position(nav)).toBeLessThan(position(main));
    expect(position(main)).toBeLessThan(position(footer));
  });
});
