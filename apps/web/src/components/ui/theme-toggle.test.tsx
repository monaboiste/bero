import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { ThemeToggle } from "./theme-toggle";

describe("ThemeToggle", () => {
  test("renders button with accessible label", () => {
    render(<ThemeToggle lang="pl" />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label");
    expect(button.getAttribute("aria-label")).toBeTruthy();
  });

  test("shows Moon icon in light mode", () => {
    document.documentElement.classList.remove("dark");

    render(<ThemeToggle lang="pl" />);

    expect(screen.getByTestId("icon-moon")).toBeInTheDocument();
  });

  test("shows Sun icon in dark mode", () => {
    document.documentElement.classList.add("dark");

    render(<ThemeToggle lang="pl" />);

    expect(screen.getByTestId("icon-sun")).toBeInTheDocument();

    document.documentElement.classList.remove("dark");
  });

  test("toggles theme on click", async () => {
    const user = userEvent.setup();
    document.documentElement.classList.remove("dark");

    render(<ThemeToggle lang="pl" />);

    expect(screen.getByTestId("icon-moon")).toBeInTheDocument();

    await user.click(screen.getByRole("button"));

    expect(screen.getByTestId("icon-sun")).toBeInTheDocument();
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    // Cleanup
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("theme");
  });

  test("applies custom className", () => {
    render(<ThemeToggle className="ml-4" lang="pl" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("ml-4");
  });

  test("applies custom id", () => {
    render(<ThemeToggle id="mobile-theme-toggle" lang="pl" />);

    const button = screen.getByTestId("mobile-theme-toggle");
    expect(button).toHaveAttribute("id", "mobile-theme-toggle");
  });
});
