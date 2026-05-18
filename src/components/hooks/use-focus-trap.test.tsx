import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef } from "react";
import { describe, expect, test, vi } from "vitest";
import { useFocusTrap } from "./use-focus-trap";

function TrapContainer({
  isActive,
  onEscape,
}: {
  isActive: boolean;
  onEscape?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, { isActive, onEscape });

  return (
    <div data-testid="trap-container" ref={ref}>
      <button data-testid="btn-1" type="button">
        First
      </button>
      <button data-testid="btn-2" type="button">
        Second
      </button>
      <button data-testid="btn-3" type="button">
        Third
      </button>
    </div>
  );
}

describe("useFocusTrap", () => {
  test("focuses first element when activated", () => {
    render(<TrapContainer isActive={true} />);

    expect(document.activeElement).toBe(screen.getByTestId("btn-1"));
  });

  test("cycles focus forward on Tab", async () => {
    const user = userEvent.setup();
    render(<TrapContainer isActive={true} />);

    // Focus starts at first button
    expect(document.activeElement).toBe(screen.getByTestId("btn-1"));

    await user.tab();
    expect(document.activeElement).toBe(screen.getByTestId("btn-2"));

    await user.tab();
    expect(document.activeElement).toBe(screen.getByTestId("btn-3"));

    // Should wrap to first
    await user.tab();
    expect(document.activeElement).toBe(screen.getByTestId("btn-1"));
  });

  test("cycles focus backward on Shift+Tab", async () => {
    const user = userEvent.setup();
    render(<TrapContainer isActive={true} />);

    // Focus starts at first button, Shift+Tab wraps to last
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(screen.getByTestId("btn-3"));
  });

  test("calls onEscape when Escape is pressed", async () => {
    const user = userEvent.setup();
    const onEscape = vi.fn();
    render(<TrapContainer isActive={true} onEscape={onEscape} />);

    await user.keyboard("{Escape}");
    expect(onEscape).toHaveBeenCalledOnce();
  });

  test("does not trap focus when inactive", () => {
    render(
      <div>
        <button data-testid="outside" type="button">
          Outside
        </button>
        <TrapContainer isActive={false} />
      </div>
    );

    // Focus should not move to trap container
    expect(document.activeElement).not.toBe(screen.getByTestId("btn-1"));
  });

  test("restores focus on deactivation", () => {
    const { rerender } = render(
      <div>
        <button data-testid="outside" type="button">
          Outside
        </button>
        <TrapContainer isActive={false} />
      </div>
    );

    // Focus the outside button
    screen.getByTestId("outside").focus();
    expect(document.activeElement).toBe(screen.getByTestId("outside"));

    // Activate trap
    rerender(
      <div>
        <button data-testid="outside" type="button">
          Outside
        </button>
        <TrapContainer isActive={true} />
      </div>
    );
    expect(document.activeElement).toBe(screen.getByTestId("btn-1"));

    // Deactivate trap — focus should return to previously focused element
    rerender(
      <div>
        <button data-testid="outside" type="button">
          Outside
        </button>
        <TrapContainer isActive={false} />
      </div>
    );
    expect(document.activeElement).toBe(screen.getByTestId("outside"));
  });
});
