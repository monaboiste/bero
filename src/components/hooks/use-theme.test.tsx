import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { useTheme } from "./use-theme";

function ThemeConsumer() {
  const { isDark, toggle } = useTheme();
  return (
    <div>
      <span data-testid="theme-state">{isDark ? "dark" : "light"}</span>
      <button data-testid="toggle-btn" onClick={toggle} type="button">
        Toggle
      </button>
    </div>
  );
}

describe("useTheme", () => {
  test("returns isDark true when html has dark class", () => {
    document.documentElement.classList.add("dark");

    render(<ThemeConsumer />);

    expect(screen.getByTestId("theme-state")).toHaveTextContent("dark");

    document.documentElement.classList.remove("dark");
  });

  test("returns isDark false when html has no dark class", () => {
    document.documentElement.classList.remove("dark");

    render(<ThemeConsumer />);

    expect(screen.getByTestId("theme-state")).toHaveTextContent("light");
  });

  test("toggle adds dark class and sets localStorage", async () => {
    const user = userEvent.setup();
    document.documentElement.classList.remove("dark");

    render(<ThemeConsumer />);

    await user.click(screen.getByTestId("toggle-btn"));

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(screen.getByTestId("theme-state")).toHaveTextContent("dark");

    // Cleanup
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("theme");
  });

  test("toggle removes dark class and sets localStorage to light", async () => {
    const user = userEvent.setup();
    document.documentElement.classList.add("dark");

    render(<ThemeConsumer />);

    await user.click(screen.getByTestId("toggle-btn"));

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
    expect(screen.getByTestId("theme-state")).toHaveTextContent("light");

    // Cleanup
    localStorage.removeItem("theme");
  });
});
