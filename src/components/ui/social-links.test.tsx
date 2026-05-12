import { render, screen } from "@testing-library/react";
import { Heart, Mail, Star } from "lucide-react";
import { describe, expect, test } from "vitest";
import { SocialLinks } from "./social-links";

const mockLinks = [
  { icon: Heart, href: "https://facebook.com/bero", label: "Facebook" },
  { icon: Mail, href: "https://instagram.com/bero", label: "Instagram" },
];

describe("SocialLinks", () => {
  test("renders correct number of links", () => {
    render(<SocialLinks links={mockLinks} />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
  });

  test("renders links with correct href", () => {
    render(<SocialLinks links={mockLinks} />);

    expect(screen.getByLabelText("Facebook")).toHaveAttribute(
      "href",
      "https://facebook.com/bero"
    );
    expect(screen.getByLabelText("Instagram")).toHaveAttribute(
      "href",
      "https://instagram.com/bero"
    );
  });

  test("renders links with aria-label", () => {
    render(<SocialLinks links={mockLinks} />);

    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
  });

  test("opens links in new tab", () => {
    render(<SocialLinks links={mockLinks} />);

    const links = screen.getAllByRole("link");
    for (const link of links) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  test("renders icons inside links", () => {
    render(<SocialLinks links={mockLinks} />);

    const links = screen.getAllByRole("link");
    for (const link of links) {
      expect(link.querySelector("svg")).toBeInTheDocument();
    }
  });

  test("applies default data-testid", () => {
    render(<SocialLinks links={mockLinks} />);

    expect(screen.getByTestId("footer-social")).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(<SocialLinks className="mt-6" links={mockLinks} />);

    const container = screen.getByTestId("footer-social");
    expect(container).toHaveClass("mt-6");
  });

  test("renders empty when no links provided", () => {
    render(<SocialLinks links={[]} />);

    const container = screen.getByTestId("footer-social");
    expect(container.children).toHaveLength(0);
  });

  test("renders three links", () => {
    const threeLinks = [
      ...mockLinks,
      { icon: Star, href: "https://twitter.com/bero", label: "Twitter" },
    ];
    render(<SocialLinks links={threeLinks} />);

    expect(screen.getAllByRole("link")).toHaveLength(3);
  });
});
