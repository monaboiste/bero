import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Hero } from "./hero";

const defaultProps = {
  lang: "pl" as const,
  image: {
    src: "/_astro/hero.webp",
    srcSet: "/_astro/hero-640.webp 640w, /_astro/hero-1024.webp 1024w",
    sizes: "100vw",
  },
};

describe("Hero", () => {
  test("renders section with correct id", () => {
    render(<Hero {...defaultProps} />);

    const section = screen.getByTestId("hero");
    expect(section).toHaveAttribute("id", "home");
  });

  test("renders hero title with accent styling", () => {
    render(<Hero {...defaultProps} />);

    const title = screen.getByTestId("hero-title");
    expect(title).toBeInTheDocument();

    const accentSpan = title.querySelector(".text-accent");
    expect(accentSpan).toBeInTheDocument();
  });

  test("renders hero description", () => {
    render(<Hero {...defaultProps} />);

    expect(
      screen.getByText(
        "Dokładność wykonania, dopracowane detale i trwałe rozwiązania."
      )
    ).toBeInTheDocument();
  });

  test("renders primary CTA with correct href", () => {
    render(<Hero {...defaultProps} />);

    const cta = screen.getByTestId("hero-cta-primary");
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/pl/#contact");
  });

  test("renders secondary CTA with correct href", () => {
    render(<Hero {...defaultProps} />);

    const cta = screen.getByTestId("hero-cta-secondary");
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/pl/#projects");
  });

  test("renders primary CTA text", () => {
    render(<Hero {...defaultProps} />);

    expect(screen.getByText("Skontaktuj się z nami")).toBeInTheDocument();
  });

  test("renders secondary CTA text", () => {
    render(<Hero {...defaultProps} />);

    expect(screen.getByText("Wybrane realizacje")).toBeInTheDocument();
  });

  test("renders background image with srcSet", () => {
    render(<Hero {...defaultProps} />);

    const img = screen.getByAltText("Ekskluzywna tapicerka");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/_astro/hero.webp");
    expect(img).toHaveAttribute(
      "srcset",
      "/_astro/hero-640.webp 640w, /_astro/hero-1024.webp 1024w"
    );
    expect(img).toHaveAttribute("sizes", "100vw");
  });

  test("background image has eager loading", () => {
    render(<Hero {...defaultProps} />);

    const img = screen.getByAltText("Ekskluzywna tapicerka");
    expect(img).toHaveAttribute("loading", "eager");
  });
});
