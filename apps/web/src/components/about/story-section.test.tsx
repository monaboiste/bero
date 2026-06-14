import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { StorySection } from "./story-section";

const defaultProps = {
  story: "Studio Tapicerskie BERO to rodzinna pracownia.",
  mission: "Przywracamy meblom ich wyjątkowy charakter.",
  image: {
    src: "https://example.com/about.webp",
    alt: "Rzemieślnik podczas pracy",
    width: 1200,
    height: 800,
  },
};

describe("StorySection", () => {
  test("renders story text", () => {
    render(<StorySection {...defaultProps} />);

    expect(
      screen.getByText("Studio Tapicerskie BERO to rodzinna pracownia.")
    ).toBeInTheDocument();
  });

  test("renders mission text", () => {
    render(<StorySection {...defaultProps} />);

    expect(
      screen.getByText("Przywracamy meblom ich wyjątkowy charakter.")
    ).toBeInTheDocument();
  });

  test("renders image with alt text", () => {
    render(<StorySection {...defaultProps} />);

    const img = screen.getByAltText("Rzemieślnik podczas pracy");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/about.webp");
  });

  test("renders Bero signature", () => {
    render(<StorySection {...defaultProps} />);

    expect(screen.getByText("Bero")).toBeInTheDocument();
  });

  test("signature has accent styling", () => {
    render(<StorySection {...defaultProps} />);

    const signature = screen.getByText("Bero");
    expect(signature).toHaveClass("text-accent");
    expect(signature).toHaveClass("font-accent");
  });

  test("applies default data-testid", () => {
    render(<StorySection {...defaultProps} />);

    expect(screen.getByTestId("about-story")).toBeInTheDocument();
  });

  test("image has lazy loading", () => {
    render(<StorySection {...defaultProps} />);

    const img = screen.getByAltText("Rzemieślnik podczas pracy");
    expect(img).toHaveAttribute("loading", "lazy");
  });
});
