import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { About } from "./about";

describe("About", () => {
  const defaultProps = {
    lang: "pl" as const,
    imageUrl: "https://example.com/about.webp",
  };

  test("renders section with correct id", () => {
    render(<About {...defaultProps} />);

    const section = screen.getByTestId("about");
    expect(section).toHaveAttribute("id", "about");
  });

  test("renders section header with translated title", () => {
    render(<About {...defaultProps} />);

    expect(screen.getByText("O nas")).toBeInTheDocument();
  });

  test("renders section header with translated subtitle", () => {
    render(<About {...defaultProps} />);

    expect(
      screen.getByText("Pasja, doświadczenie i dbałość o detale")
    ).toBeInTheDocument();
  });

  test("renders story section", () => {
    render(<About {...defaultProps} />);

    expect(screen.getByTestId("about-story")).toBeInTheDocument();
  });

  test("renders about stats", () => {
    render(<About {...defaultProps} />);

    expect(screen.getByTestId("about-stats")).toBeInTheDocument();
    expect(screen.getByText("Lat doświadczenia")).toBeInTheDocument();
  });

  test("renders about services", () => {
    render(<About {...defaultProps} />);

    expect(screen.getByTestId("about-services")).toBeInTheDocument();
    expect(screen.getByText("Nasze usługi")).toBeInTheDocument();
  });

  test("renders all 4 stat cards", () => {
    render(<About {...defaultProps} />);

    const cards = screen.getAllByTestId("stat-card");
    expect(cards).toHaveLength(4);
  });

  test("renders all 4 service cards", () => {
    render(<About {...defaultProps} />);

    const cards = screen.getAllByTestId("service-card");
    expect(cards).toHaveLength(4);
  });

  test("passes image URL to story section", () => {
    render(<About {...defaultProps} />);

    const img = screen.getByAltText("Rzemieślnik podczas pracy");
    expect(img).toHaveAttribute("src", "https://example.com/about.webp");
  });
});
