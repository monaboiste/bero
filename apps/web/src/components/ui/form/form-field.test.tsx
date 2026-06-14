import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { FormField } from "./form-field";

describe("FormField", () => {
  test("renders text input with label", () => {
    render(<FormField label="Name" name="name" />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveAttribute("type", "text");
  });

  test("renders email input", () => {
    render(<FormField label="Email" name="email" type="email" />);

    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
  });

  test("renders textarea when type is textarea", () => {
    render(<FormField label="Message" name="message" type="textarea" />);

    const textarea = screen.getByLabelText("Message");
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveAttribute("rows", "5");
  });

  test("renders textarea with custom rows", () => {
    render(
      <FormField label="Message" name="message" rows={10} type="textarea" />
    );

    expect(screen.getByLabelText("Message")).toHaveAttribute("rows", "10");
  });

  test("shows required indicator", () => {
    render(<FormField label="Name" name="name" required />);

    const label = screen.getByText("Name").closest("label");
    expect(label).toHaveTextContent("*");
  });

  test("does not show required indicator when not required", () => {
    render(<FormField label="Name" name="name" />);

    const label = screen.getByText("Name").closest("label");
    expect(label).not.toHaveTextContent("*");
  });

  test("sets required attribute on input", () => {
    render(<FormField label="Name" name="name" required />);

    expect(screen.getByLabelText(/Name/)).toBeRequired();
  });

  test("uses name as id by default", () => {
    render(<FormField label="Email" name="email" />);

    expect(screen.getByLabelText("Email")).toHaveAttribute("id", "email");
  });

  test("uses custom id when provided", () => {
    render(<FormField id="custom-id" label="Email" name="email" />);

    expect(screen.getByLabelText("Email")).toHaveAttribute("id", "custom-id");
  });

  test("applies data-testid", () => {
    render(<FormField data-testid="field-name" label="Name" name="name" />);

    expect(screen.getByTestId("field-name")).toBeInTheDocument();
  });

  test("supports controlled value and onChange", async () => {
    const handleChange = vi.fn();
    render(
      <FormField
        label="Name"
        name="name"
        onChange={handleChange}
        value="test"
      />
    );

    const input = screen.getByLabelText("Name");
    expect(input).toHaveValue("test");

    await userEvent.type(input, "x");
    expect(handleChange).toHaveBeenCalled();
  });
});
