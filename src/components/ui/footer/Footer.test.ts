import { describe, expect, test } from "vitest";
import { renderAstroComponent } from "../../test/helpers.ts";
import Footer from "./Footer.astro";

describe("Footer", () => {
  test("renders footer element", async () => {
    const result = await renderAstroComponent(Footer);

    const footer = result.querySelector("footer");

    expect(footer).not.toBeNull();
    expect(footer?.getAttribute("data-testid")).toBe("footer");
  });

  test("displays company about text", async () => {
    const result = await renderAstroComponent(Footer);

    const aboutSection = result.querySelector('[data-testid="footer-about"]');

    expect(aboutSection?.textContent).toContain(
      "Studio Tapicerskie BERO to rodzinna firma z ponad 20-letnim doswiadczeniem"
    );
  });

  test("renders social media link for Facebook", async () => {
    const result = await renderAstroComponent(Footer);

    const socialLinks = result.querySelectorAll("a");
    const facebookLink = Array.from(socialLinks).find((link) =>
      link.getAttribute("aria-label")?.includes("Facebook")
    );

    expect(facebookLink).not.toBeNull();
  });

  test("renders quick navigation links", async () => {
    const result = await renderAstroComponent(Footer);

    const quickLinks = result.querySelector(
      '[data-testid="footer-quick-links"]'
    );

    expect(quickLinks?.textContent).toContain("Strona glowna");
    expect(quickLinks?.textContent).toContain("Realizacje");
    expect(quickLinks?.textContent).toContain("O nas");
    expect(quickLinks?.textContent).toContain("Kontakt");
  });

  test("renders legal link for privacy policy", async () => {
    const result = await renderAstroComponent(Footer);

    const privacyLink = result.querySelector('a[href="/privacy-policy"]');

    expect(privacyLink).not.toBeNull();
    expect(privacyLink?.textContent).toContain("Polityka prywatnosci");
  });

  test("displays phone number", async () => {
    const result = await renderAstroComponent(Footer);

    const phoneText = result.textContent;

    expect(phoneText).toContain("+48 123 456 789");
  });

  test("displays email address", async () => {
    const result = await renderAstroComponent(Footer);

    const emailText = result.textContent;

    expect(emailText).toContain("kontakt@studiotapicerskie.pl");
  });

  test("displays copyright with current year", async () => {
    const result = await renderAstroComponent(Footer);

    const copyright = result.querySelector('[data-testid="footer-copyright"]');
    const currentYear = new Date().getFullYear();

    expect(copyright?.textContent).toContain(`© ${currentYear}`);
    expect(copyright?.textContent).toContain("Studio Tapicerskie BERO");
  });
});
