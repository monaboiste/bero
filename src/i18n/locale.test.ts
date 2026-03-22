import { describe, expect, test } from "vitest";

import { getLang, useTranslations } from "./locale";

describe("getLang", () => {
  test("returns 'pl' for currentLocale 'pl'", () => {
    expect(getLang("pl")).toBe("pl");
  });

  test("returns 'en' for currentLocale 'en'", () => {
    expect(getLang("en")).toBe("en");
  });

  test("returns 'de' for currentLocale 'de'", () => {
    expect(getLang("de")).toBe("de");
  });

  test("falls back to defaultLang when currentLocale is undefined", () => {
    expect(getLang(undefined)).toBe("pl");
  });

  test("falls back to defaultLang for an unsupported locale", () => {
    expect(getLang("fr")).toBe("pl");
  });

  test("falls back to defaultLang for an empty string", () => {
    expect(getLang("")).toBe("pl");
  });
});

describe("useTranslations", () => {
  test("returns a function", () => {
    const t = useTranslations("pl");
    expect(typeof t).toBe("function");
  });

  test("returns Polish translation for lang 'pl'", () => {
    const t = useTranslations("pl");
    expect(t("nav.home")).toBe("Strona główna");
  });

  test("returns English translation for lang 'en'", () => {
    const t = useTranslations("en");
    expect(t("nav.home")).toBe("Home");
  });

  test("returns German translation for lang 'de'", () => {
    const t = useTranslations("de");
    expect(t("nav.home")).toBe("Startseite");
  });

  test("different keys return different values", () => {
    const t = useTranslations("en");
    expect(t("nav.home")).not.toBe(t("nav.projects"));
  });
});
