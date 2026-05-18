import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Navigation } from "./navigation";

describe("Navigation", () => {
  test("renders nav element with data-testid", () => {
    render(<Navigation lang="pl" />);

    const nav = screen.getByTestId("navigation");
    expect(nav.tagName).toBe("NAV");
  });

  test("contains Logo", () => {
    render(<Navigation lang="pl" />);

    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  test("renders desktop nav links", () => {
    render(<Navigation lang="pl" />);

    const desktopNav = screen.getByTestId("nav-links-desktop");
    expect(desktopNav).toBeInTheDocument();

    // Should have 5 links (home, projects, about, contact, gallery)
    const links = desktopNav.querySelectorAll("a");
    expect(links.length).toBe(5);
  });

  test("renders theme toggle", () => {
    render(<Navigation lang="pl" />);

    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
  });

  test("renders language selector", () => {
    render(<Navigation lang="pl" />);

    expect(screen.getByTestId("language-selector")).toBeInTheDocument();
  });

  test("renders mobile menu button", () => {
    render(<Navigation lang="pl" />);

    expect(screen.getByTestId("mobile-menu-button")).toBeInTheDocument();
  });

  test("renders mobile menu", () => {
    render(<Navigation lang="pl" />);

    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
  });

  test("navigation links point to correct paths", () => {
    render(<Navigation lang="pl" />);

    const desktopNav = screen.getByTestId("nav-links-desktop");
    const homeLink = desktopNav.querySelector('[data-testid="nav-link-home"]');
    const projectsLink = desktopNav.querySelector(
      '[data-testid="nav-link-projects"]'
    );
    const aboutLink = desktopNav.querySelector(
      '[data-testid="nav-link-about"]'
    );
    const contactLink = desktopNav.querySelector(
      '[data-testid="nav-link-contact"]'
    );

    expect(homeLink).toHaveAttribute("href", "/pl/#home");
    expect(projectsLink).toHaveAttribute("href", "/pl/#projects");
    expect(aboutLink).toHaveAttribute("href", "/pl/#about");
    expect(contactLink).toHaveAttribute("href", "/pl/#contact");
  });
});
