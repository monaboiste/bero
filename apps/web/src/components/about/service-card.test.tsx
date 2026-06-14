import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ServiceCard } from "./service-card";

describe("ServiceCard", () => {
  const defaultProps = {
    title: "Renowacja mebli",
    description: "Przywracamy dawny blask meblom",
  };

  test("renders title", () => {
    render(<ServiceCard {...defaultProps} />);

    expect(screen.getByText("Renowacja mebli")).toBeInTheDocument();
  });

  test("renders description", () => {
    render(<ServiceCard {...defaultProps} />);

    expect(
      screen.getByText("Przywracamy dawny blask meblom")
    ).toBeInTheDocument();
  });

  test("applies default data-testid", () => {
    render(<ServiceCard {...defaultProps} />);

    expect(screen.getByTestId("service-card")).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(<ServiceCard {...defaultProps} className="mt-4" />);

    const card = screen.getByTestId("service-card");
    expect(card).toHaveClass("mt-4");
  });

  test("has hover border effect classes", () => {
    render(<ServiceCard {...defaultProps} />);

    const card = screen.getByTestId("service-card");
    expect(card).toHaveClass("hover:border-accent");
    expect(card).toHaveClass("hover:shadow-lg");
  });

  test("renders decoration bar", () => {
    const { container } = render(<ServiceCard {...defaultProps} />);

    const decoration = container.querySelector(".bg-accent");
    expect(decoration).toBeInTheDocument();
  });
});
