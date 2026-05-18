import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Footer } from "./footer";

describe("Footer", () => {
  test("renders footer element with data-testid", () => {
    render(<Footer lang="pl" />);

    const footer = screen.getByTestId("footer");
    expect(footer.tagName).toBe("FOOTER");
  });

  test("displays about text", () => {
    render(<Footer lang="pl" />);

    const aboutSection = screen.getByTestId("footer-about");
    expect(aboutSection.textContent).toBeTruthy();
  });

  test("renders Facebook social link", () => {
    render(<Footer lang="pl" />);

    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Facebook")).toHaveAttribute(
      "href",
      "https://www.facebook.com/StudioTapicerskieBERO"
    );
  });

  test("renders Instagram social link", () => {
    render(<Footer lang="pl" />);

    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toHaveAttribute(
      "href",
      "https://www.instagram.com/studio.tapicerskie.bero"
    );
  });

  test("renders quick navigation links", () => {
    render(<Footer lang="pl" />);

    const quickLinks = screen.getByTestId("footer-quick-links");
    expect(quickLinks).toBeInTheDocument();

    expect(screen.getByTestId("footer-link-home")).toBeInTheDocument();
    expect(screen.getByTestId("footer-link-projects")).toBeInTheDocument();
    expect(screen.getByTestId("footer-link-about")).toBeInTheDocument();
    expect(screen.getByTestId("footer-link-contact")).toBeInTheDocument();
    expect(screen.getByTestId("footer-link-gallery")).toBeInTheDocument();
  });

  test("renders privacy policy link", () => {
    render(<Footer lang="pl" />);

    const links = screen.getAllByRole("link");
    const privacyLink = links.find(
      (link) =>
        link.getAttribute("href")?.includes("prywatno") ||
        link.getAttribute("href")?.includes("privacy")
    );
    expect(privacyLink).toBeTruthy();
  });

  test("displays phone number", () => {
    render(<Footer lang="pl" />);

    expect(screen.getByText("+48 720 770 960")).toBeInTheDocument();
  });

  test("displays email address", () => {
    render(<Footer lang="pl" />);

    expect(screen.getByText("szumnyfilip@gmail.com")).toBeInTheDocument();
  });

  test("displays copyright with current year", () => {
    render(<Footer lang="pl" />);

    const copyright = screen.getByTestId("footer-copyright");
    const currentYear = new Date().getFullYear();

    expect(copyright.textContent).toContain(`© ${currentYear}`);
    expect(copyright.textContent).toContain("Studio Tapicerskie BERO");
  });
});
