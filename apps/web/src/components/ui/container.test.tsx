import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Container } from "./container";

describe("Container", () => {
  test("renders children", () => {
    render(<Container>Hello</Container>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  test("applies default max-width and padding classes", () => {
    render(<Container data-testid="container">Content</Container>);

    const el = screen.getByTestId("container");
    expect(el).toHaveClass("mx-auto", "max-w-7xl", "px-4");
  });

  test("renders as div by default", () => {
    render(<Container data-testid="container">Content</Container>);

    const el = screen.getByTestId("container");
    expect(el.tagName).toBe("DIV");
  });

  test("renders as custom element", () => {
    render(
      <Container as="nav" data-testid="container">
        Nav
      </Container>
    );

    const el = screen.getByTestId("container");
    expect(el.tagName).toBe("NAV");
  });

  test("applies custom className", () => {
    render(
      <Container className="mt-8" data-testid="container">
        Content
      </Container>
    );

    const el = screen.getByTestId("container");
    expect(el).toHaveClass("mt-8");
  });
});
