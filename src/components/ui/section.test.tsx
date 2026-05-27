import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Section } from "./section";

describe("Section", () => {
  test("renders children inside a container", () => {
    render(<Section>Hello World</Section>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  test("renders as section element", () => {
    render(<Section data-testid="section">Content</Section>);

    const el = screen.getByTestId("section");
    expect(el.tagName).toBe("SECTION");
  });

  test("applies large spacing by default", () => {
    render(<Section data-testid="section">Content</Section>);

    const el = screen.getByTestId("section");
    expect(el).toHaveClass("py-20");
  });

  test("applies small spacing", () => {
    render(
      <Section data-testid="section" spacing="sm">
        Content
      </Section>
    );

    const el = screen.getByTestId("section");
    expect(el).toHaveClass("py-10");
  });

  test("applies medium spacing", () => {
    render(
      <Section data-testid="section" spacing="md">
        Content
      </Section>
    );

    const el = screen.getByTestId("section");
    expect(el).toHaveClass("py-14");
  });

  test("applies secondary background", () => {
    render(
      <Section background="secondary" data-testid="section">
        Content
      </Section>
    );

    const el = screen.getByTestId("section");
    expect(el).toHaveClass("bg-secondary");
  });

  test("applies overflow-x-hidden", () => {
    render(<Section data-testid="section">Content</Section>);

    const el = screen.getByTestId("section");
    expect(el).toHaveClass("overflow-x-hidden");
  });

  test("passes id prop", () => {
    render(
      <Section data-testid="section" id="about">
        Content
      </Section>
    );

    const el = screen.getByTestId("section");
    expect(el).toHaveAttribute("id", "about");
  });

  test("wraps children in a container with max-width", () => {
    render(<Section data-testid="section">Content</Section>);

    const section = screen.getByTestId("section");
    const container = section.firstChild as HTMLElement;
    expect(container).toHaveClass("mx-auto", "max-w-7xl");
  });

  test("applies custom className", () => {
    render(
      <Section className="custom-class" data-testid="section">
        Content
      </Section>
    );

    const el = screen.getByTestId("section");
    expect(el).toHaveClass("custom-class");
  });
});
