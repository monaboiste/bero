import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MapEmbed } from "./map-embed";

const TEST_SRC = "https://www.google.com/maps/embed?pb=test";

describe("MapEmbed", () => {
  test("renders iframe with correct src", () => {
    render(<MapEmbed src={TEST_SRC} />);

    const iframe = screen.getByTitle("Location map");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", TEST_SRC);
  });

  test("applies default data-testid", () => {
    render(<MapEmbed src={TEST_SRC} />);

    expect(screen.getByTestId("contact-map")).toBeInTheDocument();
  });

  test("applies custom data-testid", () => {
    render(<MapEmbed data-testid="custom-map" src={TEST_SRC} />);

    expect(screen.getByTestId("custom-map")).toBeInTheDocument();
  });

  test("renders custom title on iframe", () => {
    render(<MapEmbed src={TEST_SRC} title="Our location" />);

    expect(screen.getByTitle("Our location")).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(<MapEmbed className="mt-4" src={TEST_SRC} />);

    const container = screen.getByTestId("contact-map");
    expect(container).toHaveClass("mt-4");
  });

  test("has aspect-video container styling", () => {
    render(<MapEmbed src={TEST_SRC} />);

    const container = screen.getByTestId("contact-map");
    expect(container).toHaveClass("aspect-video");
    expect(container).toHaveClass("overflow-hidden");
    expect(container).toHaveClass("rounded-lg");
  });

  test("iframe has lazy loading", () => {
    render(<MapEmbed src={TEST_SRC} />);

    const iframe = screen.getByTitle("Location map");
    expect(iframe).toHaveAttribute("loading", "lazy");
  });
});
