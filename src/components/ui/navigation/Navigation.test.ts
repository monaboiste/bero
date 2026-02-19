import { describe, expect, test } from "vitest";
import { renderAstroComponent } from "../../../test/helpers.ts";
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

    const logoLink = result.querySelector('a[href="#home"]');

    expect(logoLink).not.toBeNull();

    const logo = logoLink?.querySelector("img");
    expect(logo).not.toBeNull();
  });

  test("renders 4 navigation links for desktop", async () => {
    const result = await renderAstroComponent(Navigation);

    const desktopNav = result.querySelector(
      '[data-testid="nav-links-desktop"]'
    );
    const links = desktopNav?.querySelectorAll("a");

    expect(links?.length).toBe(4);
  });

  test("links point to correct anchors", async () => {
    const result = await renderAstroComponent(Navigation);

    const homeLink = result.querySelector('a[href="#home"]');
    const projectsLink = result.querySelector('a[href="#projects"]');
    const aboutLink = result.querySelector('a[href="#about"]');
    const contactLink = result.querySelector('a[href="#contact"]');

    expect(homeLink).not.toBeNull();
    expect(projectsLink).not.toBeNull();
    expect(aboutLink).not.toBeNull();
    expect(contactLink).not.toBeNull();
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
