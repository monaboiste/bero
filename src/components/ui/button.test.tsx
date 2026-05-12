import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  test("renders as anchor when href is provided", () => {
    render(<Button href="/contact">Contact</Button>);

    const link = screen.getByRole("link");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/contact");
    expect(link).toHaveTextContent("Contact");
  });

  test("renders as button when href is not provided", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button");
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveTextContent("Click me");
  });

  test("applies primary variant by default", () => {
    render(
      <Button data-testid="btn" href="/test">
        Primary
      </Button>
    );

    const btn = screen.getByTestId("btn");
    expect(btn).toHaveClass("bg-accent", "text-white");
  });

  test("applies secondary variant", () => {
    render(
      <Button data-testid="btn" href="/test" variant="secondary">
        Secondary
      </Button>
    );

    const btn = screen.getByTestId("btn");
    expect(btn).toHaveClass("border", "backdrop-blur-sm");
  });

  test("applies ghost variant", () => {
    render(
      <Button data-testid="btn" variant="ghost">
        Ghost
      </Button>
    );

    const btn = screen.getByTestId("btn");
    expect(btn).toHaveClass("text-foreground", "hover:bg-muted");
  });

  test("sets button type attribute", () => {
    render(<Button type="submit">Submit</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });

  test("defaults to type button", () => {
    render(<Button>Default</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });

  test("handles disabled state", () => {
    render(
      <Button data-testid="btn" disabled>
        Disabled
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("cursor-not-allowed", "opacity-50");
  });

  test("handles onClick", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  test("applies custom className", () => {
    render(
      <Button className="w-full" data-testid="btn" href="/test">
        Full Width
      </Button>
    );

    const btn = screen.getByTestId("btn");
    expect(btn).toHaveClass("w-full");
  });

  test("applies data-testid", () => {
    render(
      <Button data-testid="cta-button" href="/test">
        CTA
      </Button>
    );

    expect(screen.getByTestId("cta-button")).toBeInTheDocument();
  });

  test("renders children content", () => {
    render(
      <Button href="/test">
        <span>Label</span>
        <svg data-testid="icon" />
      </Button>
    );

    expect(screen.getByText("Label")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
