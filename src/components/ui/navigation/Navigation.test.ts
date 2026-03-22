import { renderAstroComponent } from "@test/helpers.ts";
import { describe, expect, test } from "vitest";
import Navigation from "./Navigation.astro";

describe("Navigation", () => {
  test("renders nav element", async () => {
    const result = await renderAstroComponent(Navigation);

    const nav = result.querySelector("nav");

    expect(nav).not.toBeNull();
    expect(nav?.getAttribute("data-testid")).toBe("navigation");
  });

  test("contains logo linking to home section", async () => {
    const result = await renderAstroComponent(Navigation);

    const logoLink = result.querySelector('a[href="/pl/#home"]');

    expect(logoLink).not.toBeNull();

    const logo = logoLink?.querySelector("svg");
    expect(logo).not.toBeNull();
  });

  test("renders 5 navigation links for desktop", async () => {
    const result = await renderAstroComponent(Navigation);

    const desktopNav = result.querySelector(
      '[data-testid="nav-links-desktop"]'
    );
    const links = desktopNav?.querySelectorAll("a");

    expect(links?.length).toBe(5);
  });

  test("links point to correct anchors", async () => {
    const result = await renderAstroComponent(Navigation);

    const homeLink = result.querySelector('a[href="/pl/#home"]');
    const projectsLink = result.querySelector('a[href="/pl/#projects"]');
    const aboutLink = result.querySelector('a[href="/pl/#about"]');
    const contactLink = result.querySelector('a[href="/pl/#contact"]');
    const galleryLink = result.querySelector('a[href="/pl/portfolio"]');

    expect(homeLink).not.toBeNull();
    expect(projectsLink).not.toBeNull();
    expect(aboutLink).not.toBeNull();
    expect(contactLink).not.toBeNull();
    expect(galleryLink).not.toBeNull();
    expect(galleryLink?.textContent).toContain("Galeria");
  });

  test("contains theme toggle button", async () => {
    const result = await renderAstroComponent(Navigation);

    const themeToggle = result.querySelector('button[id="theme-toggle"]');

    expect(themeToggle).not.toBeNull();
  });

  test("contains mobile menu button", async () => {
    const result = await renderAstroComponent(Navigation);

    const mobileMenuButton = result.querySelector(
      'button[data-testid="mobile-menu-button"]'
    );

    expect(mobileMenuButton).not.toBeNull();
  });

  test("contains mobile menu section", async () => {
    const result = await renderAstroComponent(Navigation);

    const mobileMenu = result.querySelector('[data-testid="mobile-menu"]');

    expect(mobileMenu).not.toBeNull();
  });

  test("contains language selector", async () => {
    const result = await renderAstroComponent(Navigation);

    const languageSelector = result.querySelector(
      '[data-testid="language-selector"]'
    );

    expect(languageSelector).not.toBeNull();
  });
});
