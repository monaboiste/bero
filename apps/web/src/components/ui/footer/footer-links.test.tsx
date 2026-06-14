import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { FooterLinks } from "./footer-links";

const mockLinks = [
  { label: "Home", href: "/pl/#home" },
  { label: "Projects", href: "/pl/#projects" },
  { label: "Gallery", href: "/pl/portfolio", testId: "gallery" },
];

describe("FooterLinks", () => {
  test("renders section title", () => {
    render(<FooterLinks links={mockLinks} title="Quick Links" />);

    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(screen.getByText("Quick Links").tagName).toBe("H3");
  });

  test("renders all links with correct hrefs", () => {
    render(<FooterLinks links={mockLinks} title="Quick Links" />);

    const homeLink = screen.getByText("Home");
    expect(homeLink).toHaveAttribute("href", "/pl/#home");

    const projectsLink = screen.getByText("Projects");
    expect(projectsLink).toHaveAttribute("href", "/pl/#projects");

    const galleryLink = screen.getByText("Gallery");
    expect(galleryLink).toHaveAttribute("href", "/pl/portfolio");
  });

  test("derives correct data-testid from link href", () => {
    render(<FooterLinks links={mockLinks} title="Quick Links" />);

    expect(screen.getByTestId("footer-link-home")).toBeInTheDocument();
    expect(screen.getByTestId("footer-link-projects")).toBeInTheDocument();
    expect(screen.getByTestId("footer-link-gallery")).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(
      <FooterLinks
        className="mt-6"
        data-testid="links-section"
        links={mockLinks}
        title="Quick Links"
      />
    );

    const container = screen.getByTestId("links-section");
    expect(container).toHaveClass("mt-6");
  });
});
