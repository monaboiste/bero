import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Grid } from "./grid";

describe("Grid", () => {
  test("renders children", () => {
    render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  test("applies grid class", () => {
    render(<Grid data-testid="grid">Content</Grid>);

    const el = screen.getByTestId("grid");
    expect(el).toHaveClass("grid");
  });

  test("applies default large gap", () => {
    render(<Grid data-testid="grid">Content</Grid>);

    const el = screen.getByTestId("grid");
    expect(el).toHaveClass("gap-8");
  });

  test("applies different gap sizes", () => {
    const { rerender } = render(
      <Grid data-testid="grid" gap="sm">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("gap-4");

    rerender(
      <Grid data-testid="grid" gap="md">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("gap-6");

    rerender(
      <Grid data-testid="grid" gap="xl">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("gap-12");
  });

  test("applies responsive column classes", () => {
    render(
      <Grid cols={{ sm: 2, md: 3, lg: 4 }} data-testid="grid">
        Content
      </Grid>
    );

    const el = screen.getByTestId("grid");
    expect(el).toHaveClass("grid-cols-2", "md:grid-cols-3", "lg:grid-cols-4");
  });

  test("applies only specified breakpoint columns", () => {
    render(
      <Grid cols={{ md: 2 }} data-testid="grid">
        Content
      </Grid>
    );

    const el = screen.getByTestId("grid");
    expect(el).toHaveClass("md:grid-cols-2");
    expect(el.className).not.toMatch(/grid-cols-(?!\d)/);
  });

  test("renders as custom element", () => {
    render(
      <Grid as="ul" data-testid="grid">
        <li>Item</li>
      </Grid>
    );

    const el = screen.getByTestId("grid");
    expect(el.tagName).toBe("UL");
  });

  test("applies custom className", () => {
    render(
      <Grid className="mt-8" data-testid="grid">
        Content
      </Grid>
    );

    const el = screen.getByTestId("grid");
    expect(el).toHaveClass("mt-8");
  });

  test("renders as div by default", () => {
    render(<Grid data-testid="grid">Content</Grid>);

    const el = screen.getByTestId("grid");
    expect(el.tagName).toBe("DIV");
  });
});
