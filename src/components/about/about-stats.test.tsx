import { render, screen } from "@testing-library/react";
import { LuAward, LuClock, LuHeart, LuUsers } from "react-icons/lu";
import { describe, expect, test } from "vitest";
import { AboutStats } from "./about-stats";

const TEST_STATS = [
  { icon: LuClock, valueNumeric: 20, suffix: "+", label: "Lat doświadczenia" },
  {
    icon: LuAward,
    valueNumeric: 1000,
    suffix: "+",
    label: "Zrealizowanych projektów",
  },
  {
    icon: LuUsers,
    valueNumeric: 100,
    suffix: "%",
    label: "Zadowolonych klientów",
  },
  {
    icon: LuHeart,
    valueNumeric: null,
    suffix: "∞",
    label: "Pasja w każdym detalu",
  },
];

describe("AboutStats", () => {
  test("renders all stat cards", () => {
    render(<AboutStats stats={TEST_STATS} />);

    const cards = screen.getAllByTestId("stat-card");
    expect(cards).toHaveLength(4);
  });

  test("renders stat labels", () => {
    render(<AboutStats stats={TEST_STATS} />);

    expect(screen.getByText("Lat doświadczenia")).toBeInTheDocument();
    expect(screen.getByText("Zrealizowanych projektów")).toBeInTheDocument();
    expect(screen.getByText("Zadowolonych klientów")).toBeInTheDocument();
    expect(screen.getByText("Pasja w każdym detalu")).toBeInTheDocument();
  });

  test("applies default data-testid", () => {
    render(<AboutStats stats={TEST_STATS} />);

    expect(screen.getByTestId("about-stats")).toBeInTheDocument();
  });

  test("has grid layout with 4 columns on desktop", () => {
    render(<AboutStats stats={TEST_STATS} />);

    const grid = screen.getByTestId("about-stats");
    expect(grid).toHaveClass("grid-cols-2");
    expect(grid).toHaveClass("md:grid-cols-4");
  });

  test("renders infinity symbol for passion stat", () => {
    render(<AboutStats stats={TEST_STATS} />);

    expect(screen.getByText("∞")).toBeInTheDocument();
  });
});
