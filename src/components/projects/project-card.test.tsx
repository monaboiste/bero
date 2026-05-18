import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ProjectCard } from "./project-card";

describe("ProjectCard", () => {
  const defaultProps = {
    title: "Club armchair renovation",
    description: "Comprehensive restoration of a classic armchair.",
    image: "https://example.com/image.jpg",
  };

  test("renders project title", () => {
    render(<ProjectCard {...defaultProps} />);

    expect(screen.getByText("Club armchair renovation")).toBeInTheDocument();
  });

  test("renders project description", () => {
    render(<ProjectCard {...defaultProps} />);

    expect(
      screen.getByText("Comprehensive restoration of a classic armchair.")
    ).toBeInTheDocument();
  });

  test("renders image with title as alt text", () => {
    render(<ProjectCard {...defaultProps} />);

    const img = screen.getByAltText("Club armchair renovation");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  test("renders date when provided", () => {
    render(<ProjectCard {...defaultProps} date="2026-02-12" />);

    expect(screen.getByText("2026-02-12")).toBeInTheDocument();
  });

  test("applies default data-testid", () => {
    render(<ProjectCard {...defaultProps} />);

    expect(screen.getByTestId("project-card")).toBeInTheDocument();
  });

  test("title has line-clamp-2 for truncation", () => {
    render(<ProjectCard {...defaultProps} />);

    const heading = screen.getByText("Club armchair renovation");
    expect(heading).toHaveClass("line-clamp-2");
  });
});
