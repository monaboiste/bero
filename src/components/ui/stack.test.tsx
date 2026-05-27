import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Stack } from "./stack";

describe("Stack", () => {
  test("renders children", () => {
    render(
      <Stack>
        <span>Item 1</span>
        <span>Item 2</span>
      </Stack>
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  test("renders as column by default", () => {
    render(<Stack data-testid="stack">Content</Stack>);

    const el = screen.getByTestId("stack");
    expect(el).toHaveClass("flex", "flex-col");
  });

  test("renders as row when direction is row", () => {
    render(
      <Stack data-testid="stack" direction="row">
        Content
      </Stack>
    );

    const el = screen.getByTestId("stack");
    expect(el).toHaveClass("flex", "flex-row");
  });

  test("applies default medium gap", () => {
    render(<Stack data-testid="stack">Content</Stack>);

    const el = screen.getByTestId("stack");
    expect(el).toHaveClass("gap-4");
  });

  test("applies different gap sizes", () => {
    const { rerender } = render(
      <Stack data-testid="stack" gap="xs">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("gap-1");

    rerender(
      <Stack data-testid="stack" gap="sm">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("gap-2");

    rerender(
      <Stack data-testid="stack" gap="lg">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("gap-6");

    rerender(
      <Stack data-testid="stack" gap="xl">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("gap-8");

    rerender(
      <Stack data-testid="stack" gap="2xl">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("gap-12");
  });

  test("applies align prop", () => {
    render(
      <Stack align="center" data-testid="stack">
        Content
      </Stack>
    );

    const el = screen.getByTestId("stack");
    expect(el).toHaveClass("items-center");
  });

  test("applies justify prop", () => {
    render(
      <Stack data-testid="stack" justify="between">
        Content
      </Stack>
    );

    const el = screen.getByTestId("stack");
    expect(el).toHaveClass("justify-between");
  });

  test("applies wrap", () => {
    render(
      <Stack data-testid="stack" wrap>
        Content
      </Stack>
    );

    const el = screen.getByTestId("stack");
    expect(el).toHaveClass("flex-wrap");
  });

  test("renders as custom element", () => {
    render(
      <Stack as="ul" data-testid="stack">
        <li>Item</li>
      </Stack>
    );

    const el = screen.getByTestId("stack");
    expect(el.tagName).toBe("UL");
  });

  test("applies custom className", () => {
    render(
      <Stack className="mt-8" data-testid="stack">
        Content
      </Stack>
    );

    const el = screen.getByTestId("stack");
    expect(el).toHaveClass("mt-8");
  });

  test("does not apply align class when not set", () => {
    render(<Stack data-testid="stack">Content</Stack>);

    const el = screen.getByTestId("stack");
    expect(el.className).not.toMatch(/items-/);
  });

  test("applies no gap with none value", () => {
    render(
      <Stack data-testid="stack" gap="none">
        Content
      </Stack>
    );

    const el = screen.getByTestId("stack");
    expect(el.className).not.toMatch(/gap-/);
  });
});
