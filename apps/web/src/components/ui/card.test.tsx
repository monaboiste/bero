import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Card } from "./card";

describe("Card", () => {
  const defaultImage = { src: "/images/test.webp", alt: "Test image" };

  test("renders image with correct src and alt", () => {
    render(<Card image={defaultImage} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/images/test.webp");
    expect(img).toHaveAttribute("alt", "Test image");
  });

  test("renders image with lazy loading", () => {
    render(<Card image={defaultImage} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("loading", "lazy");
  });

  test("renders date badge when date is provided", () => {
    render(<Card date="2024-03" image={defaultImage} />);

    expect(screen.getByText("2024-03")).toBeInTheDocument();
  });

  test("does not render date badge when date is not provided", () => {
    render(<Card image={defaultImage} />);

    expect(screen.queryByText(/\d{4}-\d{2}/)).not.toBeInTheDocument();
  });

  test("renders children in content area", () => {
    render(
      <Card image={defaultImage}>
        <h3>Project Title</h3>
        <p>Description text</p>
      </Card>
    );

    expect(screen.getByText("Project Title")).toBeInTheDocument();
    expect(screen.getByText("Description text")).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(
      <Card className="col-span-2" data-testid="card" image={defaultImage} />
    );

    const card = screen.getByTestId("card");
    expect(card).toHaveClass("col-span-2");
  });

  test("applies data-testid", () => {
    render(<Card data-testid="project-card" image={defaultImage} />);

    expect(screen.getByTestId("project-card")).toBeInTheDocument();
  });

  test("has group class for hover effects", () => {
    render(<Card data-testid="card" image={defaultImage} />);

    const card = screen.getByTestId("card");
    expect(card).toHaveClass("group");
  });
});
