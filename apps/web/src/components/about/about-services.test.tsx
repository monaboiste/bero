import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { AboutServices } from "./about-services";

const TEST_SERVICES = [
  { title: "Renowacja mebli", description: "Przywracamy dawny blask meblom" },
  { title: "Wymiana tapicerki", description: "Nadajemy meblom nowe życie" },
  { title: "Naprawa konstrukcji", description: "Wzmacniamy konstrukcje" },
  {
    title: "Tapicerstwo samochodowe",
    description: "Odnawiamy wnętrza pojazdów",
  },
];

describe("AboutServices", () => {
  test("renders section title", () => {
    render(<AboutServices services={TEST_SERVICES} title="Nasze usługi" />);

    expect(screen.getByText("Nasze usługi")).toBeInTheDocument();
  });

  test("renders all service cards", () => {
    render(<AboutServices services={TEST_SERVICES} title="Services" />);

    const cards = screen.getAllByTestId("service-card");
    expect(cards).toHaveLength(4);
  });

  test("renders service titles", () => {
    render(<AboutServices services={TEST_SERVICES} title="Services" />);

    expect(screen.getByText("Renowacja mebli")).toBeInTheDocument();
    expect(screen.getByText("Wymiana tapicerki")).toBeInTheDocument();
    expect(screen.getByText("Naprawa konstrukcji")).toBeInTheDocument();
    expect(screen.getByText("Tapicerstwo samochodowe")).toBeInTheDocument();
  });

  test("applies default data-testid", () => {
    render(<AboutServices services={TEST_SERVICES} title="Services" />);

    expect(screen.getByTestId("about-services")).toBeInTheDocument();
  });

  test("title is an h3 element", () => {
    render(<AboutServices services={TEST_SERVICES} title="Nasze usługi" />);

    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("Nasze usługi");
  });
});
