import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { FormStatus } from "./form-status";

describe("FormStatus", () => {
  test("is hidden by default", () => {
    render(<FormStatus variant="success">Message sent!</FormStatus>);

    const el = screen.getByRole("status");
    expect(el).toHaveClass("hidden");
  });

  test("is visible when visible prop is true", () => {
    render(
      <FormStatus variant="success" visible>
        Message sent!
      </FormStatus>
    );

    const el = screen.getByRole("status");
    expect(el).not.toHaveClass("hidden");
    expect(el).toHaveTextContent("Message sent!");
  });

  test("renders success variant classes", () => {
    render(
      <FormStatus variant="success" visible>
        Success
      </FormStatus>
    );

    const el = screen.getByRole("status");
    expect(el).toHaveClass("bg-green-50", "text-green-800");
  });

  test("renders error variant classes", () => {
    render(
      <FormStatus variant="error" visible>
        Error occurred
      </FormStatus>
    );

    const el = screen.getByRole("alert");
    expect(el).toHaveClass("bg-red-50", "text-red-800");
  });

  test("error variant uses alert role", () => {
    render(
      <FormStatus variant="error" visible>
        Error
      </FormStatus>
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  test("success variant uses status role", () => {
    render(
      <FormStatus variant="success" visible>
        OK
      </FormStatus>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("applies custom id", () => {
    render(
      <FormStatus id="form-success" variant="success" visible>
        Done
      </FormStatus>
    );

    const el = screen.getByRole("status");
    expect(el).toHaveAttribute("id", "form-success");
  });

  test("applies custom className", () => {
    render(
      <FormStatus className="mt-4" variant="success" visible>
        Done
      </FormStatus>
    );

    const el = screen.getByRole("status");
    expect(el).toHaveClass("mt-4");
  });
});
