import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Text } from "./text";

describe("Text", () => {
  test("renders children", () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  test("renders as p by default", () => {
    render(<Text data-testid="text">Content</Text>);

    const el = screen.getByTestId("text");
    expect(el.tagName).toBe("P");
  });

  test("renders as custom element", () => {
    render(
      <Text as="span" data-testid="text">
        Content
      </Text>
    );

    const el = screen.getByTestId("text");
    expect(el.tagName).toBe("SPAN");
  });

  test("applies body variant by default", () => {
    render(<Text data-testid="text">Content</Text>);

    const el = screen.getByTestId("text");
    expect(el).toHaveClass("text-base", "leading-relaxed");
  });

  test("applies lead variant", () => {
    render(
      <Text data-testid="text" variant="lead">
        Content
      </Text>
    );

    const el = screen.getByTestId("text");
    expect(el).toHaveClass("text-lg", "leading-relaxed");
  });

  test("applies muted variant", () => {
    render(
      <Text data-testid="text" variant="muted">
        Content
      </Text>
    );

    const el = screen.getByTestId("text");
    expect(el).toHaveClass("text-muted-foreground");
  });

  test("applies caption variant", () => {
    render(
      <Text data-testid="text" variant="caption">
        Content
      </Text>
    );

    const el = screen.getByTestId("text");
    expect(el).toHaveClass("text-muted-foreground", "text-sm");
  });

  test("applies custom className", () => {
    render(
      <Text className="mt-4" data-testid="text">
        Content
      </Text>
    );

    const el = screen.getByTestId("text");
    expect(el).toHaveClass("mt-4");
  });
});
