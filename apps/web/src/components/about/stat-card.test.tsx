import { render, screen } from "@testing-library/react";
import { LuClock, LuHeart } from "react-icons/lu";
import { describe, expect, test } from "vitest";
import { StatCard } from "./stat-card";

describe("StatCard", () => {
  test("renders label text", () => {
    render(
      <StatCard
        icon={LuClock}
        label="Lat doświadczenia"
        suffix="+"
        valueNumeric={20}
      />
    );

    expect(screen.getByText("Lat doświadczenia")).toBeInTheDocument();
  });

  test("renders animated counter when valueNumeric is provided", () => {
    render(
      <StatCard
        icon={LuClock}
        label="Experience"
        suffix="+"
        valueNumeric={20}
      />
    );

    expect(screen.getByTestId("stat-card-value")).toBeInTheDocument();
  });

  test("renders static suffix when valueNumeric is null", () => {
    render(
      <StatCard icon={LuHeart} label="Passion" suffix="∞" valueNumeric={null} />
    );

    expect(screen.getByText("∞")).toBeInTheDocument();
  });

  test("renders static suffix when valueNumeric is undefined", () => {
    render(<StatCard icon={LuHeart} label="Passion" suffix="∞" />);

    expect(screen.getByText("∞")).toBeInTheDocument();
  });

  test("applies default data-testid", () => {
    render(
      <StatCard icon={LuClock} label="Test" suffix="+" valueNumeric={20} />
    );

    expect(screen.getByTestId("stat-card")).toBeInTheDocument();
  });

  test("has text-center alignment", () => {
    render(
      <StatCard icon={LuClock} label="Test" suffix="+" valueNumeric={20} />
    );

    const card = screen.getByTestId("stat-card");
    expect(card).toHaveClass("text-center");
  });
});
