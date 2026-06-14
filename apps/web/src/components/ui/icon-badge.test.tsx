import { render, screen } from "@testing-library/react";
import { LuHeart, LuStar, LuWrench } from "react-icons/lu";
import { describe, expect, test } from "vitest";
import { IconBadge } from "./icon-badge";

describe("IconBadge", () => {
  test("renders with default md size", () => {
    render(<IconBadge data-testid="badge" icon={LuHeart} />);

    const badge = screen.getByTestId("badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("h-12", "w-12");
    expect(badge).toHaveAttribute("data-icon-size", "h-6 w-6");
  });

  test("renders sm size", () => {
    render(<IconBadge data-testid="badge" icon={LuStar} size="sm" />);

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("h-10", "w-10");
    expect(badge).toHaveAttribute("data-icon-size", "h-5 w-5");
  });

  test("renders lg size", () => {
    render(<IconBadge data-testid="badge" icon={LuWrench} size="lg" />);

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("h-16", "w-16");
    expect(badge).toHaveAttribute("data-icon-size", "h-8 w-8");
  });

  test("renders the icon component", () => {
    render(<IconBadge data-testid="badge" icon={LuHeart} />);

    const badge = screen.getByTestId("badge");
    const svg = badge.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(<IconBadge className="mt-4" data-testid="badge" icon={LuHeart} />);

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("mt-4");
  });

  test("has accent background styling", () => {
    render(<IconBadge data-testid="badge" icon={LuHeart} />);

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("bg-accent/10", "rounded-full");
  });
});
