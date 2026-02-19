// biome-ignore-all lint/suspicious/noSkippedTests: Skip Contact Form

import { renderAstroComponent } from "@test/helpers.ts";
import { describe, expect, test } from "vitest";
import Contact from "./Contact.astro";

describe("Contact", () => {
  test("renders section with id contact", async () => {
    const result = await renderAstroComponent(Contact);

    const section = result.querySelector('[id="contact"]');

    expect(section).not.toBeNull();
    expect(section?.getAttribute("data-testid")).toBe("contact");
  });

  test("displays header Kontakt", async () => {
    const result = await renderAstroComponent(Contact);

    const heading = result.querySelector("h2");

    expect(heading?.textContent?.trim()).toContain("Kontakt");
  });

  test("displays address", async () => {
    const result = await renderAstroComponent(Contact);

    const address = result.textContent;

    expect(address).toContain("ul. Przykladowa 123, 00-000 Warszawa");
  });

  test("displays phone number", async () => {
    const result = await renderAstroComponent(Contact);

    const phone = result.textContent;

    expect(phone).toContain("+48 123 456 789");
  });

  test("displays email", async () => {
    const result = await renderAstroComponent(Contact);

    const email = result.textContent;

    expect(email).toContain("kontakt@studiotapicerskie.pl");
  });

  test("renders Google Maps iframe", async () => {
    const result = await renderAstroComponent(Contact);

    const iframe = result.querySelector("iframe");

    expect(iframe).not.toBeNull();
    expect(iframe?.getAttribute("src")).toContain("google.com/maps");
  });

  test.skip("renders contact form", async () => {
    const result = await renderAstroComponent(Contact);

    const form = result.querySelector('form[data-testid="contact-form"]');

    expect(form).not.toBeNull();
  });

  test.skip("form contains name, email, and message fields", async () => {
    const result = await renderAstroComponent(Contact);

    const nameField = result.querySelector('input[name="name"]');
    const emailField = result.querySelector('input[name="email"]');
    const messageField = result.querySelector('textarea[name="message"]');

    expect(nameField).not.toBeNull();
    expect(emailField).not.toBeNull();
    expect(messageField).not.toBeNull();
  });

  test.skip("form contains consent checkbox", async () => {
    const result = await renderAstroComponent(Contact);

    const consentCheckbox = result.querySelector(
      'input[type="checkbox"][name="consent"]'
    );

    expect(consentCheckbox).not.toBeNull();
  });

  test.skip("form contains submit button", async () => {
    const result = await renderAstroComponent(Contact);

    const submitButton = result.querySelector(
      'button[data-testid="contact-form-submit"]'
    );

    expect(submitButton).not.toBeNull();
    expect(submitButton?.textContent).toContain("Wyslij wiadomosc");
  });

  test.skip("form has honeypot field for spam protection", async () => {
    const result = await renderAstroComponent(Contact);

    const honeypot = result.querySelector('input[name="website"]');

    expect(honeypot).not.toBeNull();
    expect(honeypot?.classList.contains("hidden")).toBe(true);
  });
});
