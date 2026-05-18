import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { MobileMenu } from "./mobile-menu";
import type { NavItem } from "./types";

const mockItems: NavItem[] = [
  { label: "Home", href: "/pl/#home" },
  { label: "Projects", href: "/pl/#projects" },
  { label: "About", href: "/pl/#about" },
  { label: "Contact", href: "/pl/#contact" },
];

describe("MobileMenu", () => {
  test("is hidden when isOpen is false", () => {
    render(
      <MobileMenu
        isOpen={false}
        items={mockItems}
        lang="pl"
        onClose={vi.fn()}
      />
    );

    const menu = screen.getByTestId("mobile-menu");
    expect(menu).toHaveClass("hidden");
    expect(menu).toHaveAttribute("aria-hidden", "true");
  });

  test("is visible when isOpen is true", () => {
    render(
      <MobileMenu isOpen={true} items={mockItems} lang="pl" onClose={vi.fn()} />
    );

    const menu = screen.getByTestId("mobile-menu");
    expect(menu).not.toHaveClass("hidden");
    expect(menu).toHaveAttribute("aria-hidden", "false");
  });

  test("renders navigation links", () => {
    render(
      <MobileMenu isOpen={true} items={mockItems} lang="pl" onClose={vi.fn()} />
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  test("renders inline language selector", () => {
    render(
      <MobileMenu isOpen={true} items={mockItems} lang="pl" onClose={vi.fn()} />
    );

    expect(screen.getByTestId("mobile-language-selector")).toBeInTheDocument();
    expect(screen.getByText("PL")).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();
    expect(screen.getByText("DE")).toBeInTheDocument();
  });

  test("calls onClose when a link is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <MobileMenu isOpen={true} items={mockItems} lang="pl" onClose={onClose} />
    );

    await user.click(screen.getByText("Home"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  test("calls onClose on Escape key", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <MobileMenu isOpen={true} items={mockItems} lang="pl" onClose={onClose} />
    );

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();
  });
});
