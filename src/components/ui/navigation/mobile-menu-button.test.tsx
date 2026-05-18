import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { MobileMenuButton } from "./mobile-menu-button";

describe("MobileMenuButton", () => {
  test("renders button with accessible label", () => {
    render(<MobileMenuButton isOpen={false} lang="pl" onToggle={vi.fn()} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label");
    expect(button.getAttribute("aria-label")).toBeTruthy();
  });

  test("shows Menu icon when closed", () => {
    render(<MobileMenuButton isOpen={false} lang="pl" onToggle={vi.fn()} />);

    expect(screen.getByTestId("icon-menu")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-close")).not.toBeInTheDocument();
  });

  test("shows X icon when open", () => {
    render(<MobileMenuButton isOpen={true} lang="pl" onToggle={vi.fn()} />);

    expect(screen.getByTestId("icon-close")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-menu")).not.toBeInTheDocument();
  });

  test("calls onToggle on click", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<MobileMenuButton isOpen={false} lang="pl" onToggle={onToggle} />);

    await user.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledOnce();
  });

  test("sets aria-expanded based on isOpen", () => {
    const { rerender } = render(
      <MobileMenuButton isOpen={false} lang="pl" onToggle={vi.fn()} />
    );

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-expanded",
      "false"
    );

    rerender(<MobileMenuButton isOpen={true} lang="pl" onToggle={vi.fn()} />);

    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });
});
