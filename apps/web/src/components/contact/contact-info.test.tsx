import { render, screen } from "@testing-library/react";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { describe, expect, test } from "vitest";
import { ContactInfo } from "./contact-info";

const TEST_ITEMS = [
  { icon: LuMapPin, label: "Św. Wojciech 70, Międzyrzecz" },
  { icon: LuPhone, label: "+48 720 770 960" },
  { icon: LuMail, label: "test@example.com" },
];

describe("ContactInfo", () => {
  test("renders all contact items", () => {
    render(<ContactInfo items={TEST_ITEMS} />);

    expect(
      screen.getByText("Św. Wojciech 70, Międzyrzecz")
    ).toBeInTheDocument();
    expect(screen.getByText("+48 720 770 960")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  test("renders correct number of rows", () => {
    render(<ContactInfo items={TEST_ITEMS} />);

    const rows = screen.getAllByTestId("contact-info-row");
    expect(rows).toHaveLength(3);
  });

  test("applies default data-testid", () => {
    render(<ContactInfo items={TEST_ITEMS} />);

    expect(screen.getByTestId("contact-info")).toBeInTheDocument();
  });

  test("applies custom data-testid", () => {
    render(<ContactInfo data-testid="custom-info" items={TEST_ITEMS} />);

    expect(screen.getByTestId("custom-info")).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(<ContactInfo className="mb-12" items={TEST_ITEMS} />);

    const container = screen.getByTestId("contact-info");
    expect(container).toHaveClass("mb-12");
  });

  test("has space-y-8 spacing", () => {
    render(<ContactInfo items={TEST_ITEMS} />);

    const container = screen.getByTestId("contact-info");
    expect(container).toHaveClass("space-y-8");
  });
});
