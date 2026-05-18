import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Contact } from "./contact";

describe("Contact", () => {
  test("renders section with correct id", () => {
    render(<Contact lang="pl" />);

    const section = screen.getByTestId("contact");
    expect(section).toHaveAttribute("id", "contact");
  });

  test("renders section header with translated title", () => {
    render(<Contact lang="pl" />);

    expect(screen.getByText("Kontakt")).toBeInTheDocument();
  });

  test("renders section header with translated subtitle", () => {
    render(<Contact lang="pl" />);

    expect(
      screen.getByText("Porozmawiajmy o Twoim projekcie")
    ).toBeInTheDocument();
  });

  test("renders contact info with address", () => {
    render(<Contact lang="pl" />);

    expect(screen.getByTestId("contact-info")).toBeInTheDocument();
    expect(
      screen.getByText("Św. Wojciech 70, Międzyrzecz, PL, 66-300")
    ).toBeInTheDocument();
  });

  test("renders contact info with phone", () => {
    render(<Contact lang="pl" />);

    expect(screen.getByText("+48 720 770 960")).toBeInTheDocument();
  });

  test("renders contact info with email", () => {
    render(<Contact lang="pl" />);

    expect(screen.getByText("szumnyfilip@gmail.com")).toBeInTheDocument();
  });

  test("renders map embed", () => {
    render(<Contact lang="pl" />);

    expect(screen.getByTestId("contact-map")).toBeInTheDocument();
    expect(screen.getByTitle("Lokalizacja")).toBeInTheDocument();
  });

  test("has bg-secondary background", () => {
    render(<Contact lang="pl" />);

    const section = screen.getByTestId("contact");
    expect(section).toHaveClass("bg-secondary");
  });
});
