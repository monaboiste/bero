import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { LanguageSelector } from "./language-selector";

describe("LanguageSelector", () => {
  describe("dropdown variant", () => {
    test("renders current language code", () => {
      render(<LanguageSelector lang="pl" />);

      // Text is "pl" with CSS uppercase class applied
      const button = screen.getByRole("button");
      expect(button).toHaveTextContent("pl");
      expect(button.querySelector(".uppercase")).toBeInTheDocument();
    });

    test("opens dropdown on button click", async () => {
      const user = userEvent.setup();
      render(<LanguageSelector lang="pl" />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-expanded", "false");

      await user.click(button);

      expect(button).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    test("shows all language options when open", async () => {
      const user = userEvent.setup();
      render(<LanguageSelector lang="pl" />);

      await user.click(screen.getByRole("button"));

      expect(screen.getByText("Polski")).toBeInTheDocument();
      expect(screen.getByText("English")).toBeInTheDocument();
      expect(screen.getByText("Deutsch")).toBeInTheDocument();
    });

    test("closes on Escape key", async () => {
      const user = userEvent.setup();
      render(<LanguageSelector lang="pl" />);

      await user.click(screen.getByRole("button"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    test("closes on outside click", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <button data-testid="outside" type="button">
            Outside
          </button>
          <LanguageSelector lang="pl" />
        </div>
      );

      await user.click(screen.getByRole("button", { name: /pl/i }));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.click(screen.getByTestId("outside"));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    test("navigates with ArrowDown key", async () => {
      const user = userEvent.setup();
      render(<LanguageSelector lang="pl" />);

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard("{ArrowDown}");

      // Menu should open
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    test("highlights current language", async () => {
      const user = userEvent.setup();
      render(<LanguageSelector lang="en" />);

      await user.click(screen.getByRole("button"));

      const englishOption = screen.getByText("English");
      expect(englishOption).toHaveClass("bg-muted", "font-medium");
    });

    test("language links have correct data-lang attribute", async () => {
      const user = userEvent.setup();
      render(<LanguageSelector lang="pl" />);

      await user.click(screen.getByRole("button"));

      const options = screen.getAllByRole("option");
      expect(options[0]).toHaveAttribute("data-lang", "pl");
      expect(options[1]).toHaveAttribute("data-lang", "en");
      expect(options[2]).toHaveAttribute("data-lang", "de");
    });
  });

  describe("inline variant", () => {
    test("renders all language codes as links", () => {
      render(<LanguageSelector lang="pl" variant="inline" />);

      expect(screen.getByText("PL")).toBeInTheDocument();
      expect(screen.getByText("EN")).toBeInTheDocument();
      expect(screen.getByText("DE")).toBeInTheDocument();
    });

    test("highlights current language", () => {
      render(<LanguageSelector lang="pl" variant="inline" />);

      const plLink = screen.getByText("PL");
      expect(plLink).toHaveClass("bg-accent", "text-accent-foreground");
    });

    test("non-current languages have hover styling", () => {
      render(<LanguageSelector lang="pl" variant="inline" />);

      const enLink = screen.getByText("EN");
      expect(enLink).toHaveClass("hover:bg-muted");
      expect(enLink).not.toHaveClass("bg-accent");
    });
  });

  test("applies custom className", () => {
    render(<LanguageSelector className="ml-4" lang="pl" />);

    const container = screen.getByTestId("language-selector");
    expect(container).toHaveClass("ml-4");
  });
});
