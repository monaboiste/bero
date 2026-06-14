import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Surface } from "./surface";

describe("Surface", () => {
  test("renders children", () => {
    render(<Surface>Hello</Surface>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  test("renders as div by default", () => {
    render(<Surface data-testid="surface">Content</Surface>);

    const el = screen.getByTestId("surface");
    expect(el.tagName).toBe("DIV");
  });

  test("renders as custom element", () => {
    render(
      <Surface as="article" data-testid="surface">
        Content
      </Surface>
    );

    const el = screen.getByTestId("surface");
    expect(el.tagName).toBe("ARTICLE");
  });

  test("applies card variant by default", () => {
    render(<Surface data-testid="surface">Content</Surface>);

    const el = screen.getByTestId("surface");
    expect(el).toHaveClass("border", "border-border", "bg-card");
  });

  test("applies muted variant", () => {
    render(
      <Surface data-testid="surface" variant="muted">
        Content
      </Surface>
    );

    const el = screen.getByTestId("surface");
    expect(el).toHaveClass("bg-muted");
  });

  test("applies elevated variant", () => {
    render(
      <Surface data-testid="surface" variant="elevated">
        Content
      </Surface>
    );

    const el = screen.getByTestId("surface");
    expect(el).toHaveClass("bg-card", "shadow-lg");
  });

  test("applies hover classes when hover is true", () => {
    render(
      <Surface data-testid="surface" hover>
        Content
      </Surface>
    );

    const el = screen.getByTestId("surface");
    expect(el).toHaveClass("transition-all", "duration-300");
    expect(el).toHaveClass("hover:border-accent", "hover:shadow-lg");
  });

  test("does not apply hover classes by default", () => {
    render(<Surface data-testid="surface">Content</Surface>);

    const el = screen.getByTestId("surface");
    expect(el.className).not.toMatch(/hover:/);
  });

  test("applies default medium padding", () => {
    render(<Surface data-testid="surface">Content</Surface>);

    const el = screen.getByTestId("surface");
    expect(el).toHaveClass("p-6");
  });

  test("applies different padding sizes", () => {
    const { rerender } = render(
      <Surface data-testid="surface" padding="none">
        Content
      </Surface>
    );
    expect(screen.getByTestId("surface").className).not.toMatch(/p-\d/);

    rerender(
      <Surface data-testid="surface" padding="sm">
        Content
      </Surface>
    );
    expect(screen.getByTestId("surface")).toHaveClass("p-4");

    rerender(
      <Surface data-testid="surface" padding="lg">
        Content
      </Surface>
    );
    expect(screen.getByTestId("surface")).toHaveClass("p-8");
  });

  test("applies default medium rounded", () => {
    render(<Surface data-testid="surface">Content</Surface>);

    const el = screen.getByTestId("surface");
    expect(el).toHaveClass("rounded-lg");
  });

  test("applies different rounded sizes", () => {
    const { rerender } = render(
      <Surface data-testid="surface" rounded="sm">
        Content
      </Surface>
    );
    expect(screen.getByTestId("surface")).toHaveClass("rounded");

    rerender(
      <Surface data-testid="surface" rounded="lg">
        Content
      </Surface>
    );
    expect(screen.getByTestId("surface")).toHaveClass("rounded-xl");
  });

  test("applies custom className", () => {
    render(
      <Surface className="h-full" data-testid="surface">
        Content
      </Surface>
    );

    const el = screen.getByTestId("surface");
    expect(el).toHaveClass("h-full");
  });
});
