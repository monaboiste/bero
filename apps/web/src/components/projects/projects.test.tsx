import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Projects } from "./projects";

const TEST_PROJECTS = [
  {
    title: "Renowacja fotela klubowego",
    excerpt: "Kompleksowa odnowa klasycznego fotela.",
    date: "2026-02-12",
    image: "https://example.com/img1.jpg",
  },
  {
    title: "Tapicerka sofy",
    excerpt: "Wymiana tapicerki na sofie.",
    date: "2026-01-05",
    image: "https://example.com/img2.jpg",
  },
  {
    title: "Renowacja krzeseł",
    excerpt: "Naprawa i odnowa krzeseł.",
    date: "2025-12-20",
    image: "https://example.com/img3.jpg",
  },
];

describe("Projects", () => {
  test("renders section with correct id", () => {
    render(<Projects lang="pl" projects={TEST_PROJECTS} />);

    const section = screen.getByTestId("projects");
    expect(section).toHaveAttribute("id", "projects");
  });

  test("renders section header with translated title", () => {
    render(<Projects lang="pl" projects={TEST_PROJECTS} />);

    expect(screen.getByText("Nasze realizacje")).toBeInTheDocument();
  });

  test("renders section header with translated subtitle", () => {
    render(<Projects lang="pl" projects={TEST_PROJECTS} />);

    expect(
      screen.getByText("Starannie wyselekcjonowane projekty")
    ).toBeInTheDocument();
  });

  test("renders all project cards", () => {
    render(<Projects lang="pl" projects={TEST_PROJECTS} />);

    const cards = screen.getAllByTestId("project-card");
    expect(cards).toHaveLength(3);
  });

  test("renders project titles", () => {
    render(<Projects lang="pl" projects={TEST_PROJECTS} />);

    expect(screen.getByText("Renowacja fotela klubowego")).toBeInTheDocument();
    expect(screen.getByText("Tapicerka sofy")).toBeInTheDocument();
    expect(screen.getByText("Renowacja krzeseł")).toBeInTheDocument();
  });

  test("renders view all button with correct href", () => {
    render(<Projects lang="pl" projects={TEST_PROJECTS} />);

    const button = screen.getByTestId("projects-view-all");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/pl/portfolio");
  });

  test("renders view all button text", () => {
    render(<Projects lang="pl" projects={TEST_PROJECTS} />);

    expect(screen.getByText("Zobacz wszystkie realizacje")).toBeInTheDocument();
  });

  test("has bg-secondary background", () => {
    render(<Projects lang="pl" projects={TEST_PROJECTS} />);

    const section = screen.getByTestId("projects");
    expect(section).toHaveClass("bg-secondary");
  });
});
