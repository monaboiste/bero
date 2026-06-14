import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SectionHeader } from "./section-header";

describe("SectionHeader", () => {
  test("renders title text", () => {
    render(<SectionHeader title="O nas" />);

    expect(screen.getByText("O nas")).toBeInTheDocument();
  });

  test("renders h2 by default", () => {
    render(<SectionHeader title="Projects" />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Projects");
  });

  test("renders custom heading level", () => {
    render(<SectionHeader as="h3" title="Services" />);

    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("Services");
  });

  test("renders subtitle when provided", () => {
    render(<SectionHeader subtitle="A brief description" title="Title" />);

    expect(screen.getByText("A brief description")).toBeInTheDocument();
  });

  test("does not render subtitle paragraph when not provided", () => {
    const { container } = render(<SectionHeader title="Title" />);

    const paragraph = container.querySelector("p");
    expect(paragraph).not.toBeInTheDocument();
  });

  test("renders decoration bar", () => {
    const { container } = render(<SectionHeader title="Title" />);

    const decoration = container.querySelector(".bg-accent");
    expect(decoration).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(
      <SectionHeader className="mt-8" data-testid="header" title="Title" />
    );

    const header = screen.getByTestId("header");
    expect(header).toHaveClass("mt-8");
  });

  test("applies data-testid", () => {
    render(<SectionHeader data-testid="section-header" title="Title" />);

    expect(screen.getByTestId("section-header")).toBeInTheDocument();
  });

  test("has centered text alignment", () => {
    render(<SectionHeader data-testid="header" title="Title" />);

    const header = screen.getByTestId("header");
    expect(header).toHaveClass("text-center");
  });
});
