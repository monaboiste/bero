import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Logo } from "./logo";

describe("Logo", () => {
  test("renders link to home section", () => {
    render(<Logo lang="pl" />);

    const link = screen.getByTestId("logo");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/pl/#home");
  });

  test("displays company name BERO", () => {
    render(<Logo lang="pl" />);

    expect(screen.getByText("BERO")).toBeInTheDocument();
  });

  test("displays translated logo text", () => {
    render(<Logo lang="pl" />);

    expect(screen.getByText("studio")).toBeInTheDocument();
    expect(screen.getByText("tapicerskie")).toBeInTheDocument();
  });

  test("renders SVG component when provided", () => {
    const MockSvg = ({ className }: { className?: string }) => (
      <svg aria-hidden="true" className={className} data-testid="logo-svg">
        <rect />
      </svg>
    );

    render(<Logo lang="pl" svgComponent={MockSvg} />);

    expect(screen.getByTestId("logo-svg")).toBeInTheDocument();
  });

  test("applies md size classes by default", () => {
    render(<Logo lang="pl" />);

    const link = screen.getByTestId("logo");
    expect(link).toHaveClass("gap-1");
  });

  test("applies sm size classes", () => {
    render(<Logo lang="pl" size="sm" />);

    const link = screen.getByTestId("logo");
    expect(link).toHaveClass("gap-0.5");
  });

  test("applies lg size classes", () => {
    render(<Logo lang="pl" size="lg" />);

    const link = screen.getByTestId("logo");
    expect(link).toHaveClass("gap-2");
  });

  test("applies light variant by default", () => {
    const { container } = render(<Logo lang="pl" />);

    const primarySpan = container.querySelector(".text-foreground");
    expect(primarySpan).toBeInTheDocument();
  });

  test("applies dark variant", () => {
    const { container } = render(<Logo lang="pl" variant="dark" />);

    const primarySpan = container.querySelector(".text-background");
    expect(primarySpan).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(<Logo className="my-custom" lang="pl" />);

    const link = screen.getByTestId("logo");
    expect(link).toHaveClass("my-custom");
  });

  test("generates correct link for English locale", () => {
    render(<Logo lang="en" />);

    const link = screen.getByTestId("logo");
    expect(link).toHaveAttribute("href", "/en/#home");
  });
});
