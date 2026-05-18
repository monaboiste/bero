import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LuCamera } from "react-icons/lu";
import { describe, expect, test, vi } from "vitest";
import { NavLinks } from "./nav-links";
import type { NavItem } from "./types";

const mockItems: NavItem[] = [
  { label: "Home", href: "/pl/#home" },
  { label: "Projects", href: "/pl/#projects" },
  { label: "About", href: "/pl/#about" },
  { label: "Contact", href: "/pl/#contact" },
  {
    label: "Gallery",
    href: "/pl/portfolio",
    highlight: true,
    testId: "gallery",
    icon: LuCamera,
    iconClass: "h-5 w-5 text-accent",
  },
];

describe("NavLinks", () => {
  test("renders all navigation links", () => {
    render(<NavLinks items={mockItems} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Gallery")).toBeInTheDocument();
  });

  test("row direction applies correct flex classes", () => {
    render(<NavLinks data-testid="nav" direction="row" items={mockItems} />);

    const container = screen.getByTestId("nav");
    expect(container).toHaveClass("flex", "items-center", "space-x-8");
  });

  test("column direction applies correct flex classes", () => {
    render(<NavLinks data-testid="nav" direction="column" items={mockItems} />);

    const container = screen.getByTestId("nav");
    expect(container).toHaveClass("flex", "flex-col", "space-y-4");
  });

  test("highlight items render with icon and special styling", () => {
    render(<NavLinks items={mockItems} />);

    const galleryLink = screen.getByTestId("nav-link-gallery");
    expect(galleryLink).toHaveClass("inline-flex", "items-center");
    expect(galleryLink.querySelector("svg")).toBeInTheDocument();
  });

  test("derives correct data-testid from href", () => {
    render(<NavLinks items={mockItems} />);

    expect(screen.getByTestId("nav-link-home")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-projects")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-about")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-contact")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-gallery")).toBeInTheDocument();
  });

  test("calls onLinkClick when a link is clicked", async () => {
    const user = userEvent.setup();
    const onLinkClick = vi.fn();
    render(<NavLinks items={mockItems} onLinkClick={onLinkClick} />);

    await user.click(screen.getByText("Home"));
    expect(onLinkClick).toHaveBeenCalledOnce();
  });

  test("applies custom className", () => {
    render(
      <NavLinks
        className="hidden lg:flex"
        data-testid="nav"
        items={mockItems}
      />
    );

    const container = screen.getByTestId("nav");
    expect(container).toHaveClass("hidden", "lg:flex");
  });
});
