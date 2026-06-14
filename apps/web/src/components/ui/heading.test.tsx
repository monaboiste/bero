import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Heading } from "./heading";

describe("Heading", () => {
  test("renders children", () => {
    render(<Heading>Hello World</Heading>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  test("renders as h2 by default", () => {
    render(<Heading data-testid="heading">Title</Heading>);

    const el = screen.getByTestId("heading");
    expect(el.tagName).toBe("H2");
  });

  test("renders as custom heading level", () => {
    render(
      <Heading as="h1" data-testid="heading">
        Title
      </Heading>
    );

    const el = screen.getByTestId("heading");
    expect(el.tagName).toBe("H1");
  });

  test("applies 4xl size by default", () => {
    render(<Heading data-testid="heading">Title</Heading>);

    const el = screen.getByTestId("heading");
    expect(el).toHaveClass("text-4xl");
  });

  test("applies xl size", () => {
    render(
      <Heading data-testid="heading" size="xl">
        Title
      </Heading>
    );

    const el = screen.getByTestId("heading");
    expect(el).toHaveClass("text-xl");
  });

  test("applies 3xl size", () => {
    render(
      <Heading data-testid="heading" size="3xl">
        Title
      </Heading>
    );

    const el = screen.getByTestId("heading");
    expect(el).toHaveClass("text-3xl");
  });

  test("applies 5xl size with responsive classes", () => {
    render(
      <Heading data-testid="heading" size="5xl">
        Title
      </Heading>
    );

    const el = screen.getByTestId("heading");
    expect(el).toHaveClass("text-5xl");
  });

  test("applies custom className", () => {
    render(
      <Heading className="mb-4 text-center" data-testid="heading">
        Title
      </Heading>
    );

    const el = screen.getByTestId("heading");
    expect(el).toHaveClass("text-center", "mb-4");
  });
});
