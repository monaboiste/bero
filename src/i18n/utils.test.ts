import { describe, expect, test } from "vitest";

import {
  getCanonicalBasePath,
  getLang,
  getRouteFromUrl,
  stripLocalePrefix,
  useTranslatedPath,
  useTranslations,
} from "./utils";

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

describe("useTranslatedPath", () => {
  test("returns a function", () => {
    const translatePath = useTranslatedPath("pl");
    expect(typeof translatePath).toBe("function");
  });

  test("translates a known route for the default language", () => {
    const translatePath = useTranslatedPath("pl");
    expect(translatePath("privacy-policy")).toBe("/pl/polityka-prywatnosci");
  });

  test("translates a known route for English", () => {
    const translatePath = useTranslatedPath("en");
    expect(translatePath("privacy-policy")).toBe("/en/privacy-policy");
  });

  test("translates a known route for German", () => {
    const translatePath = useTranslatedPath("de");
    expect(translatePath("privacy-policy")).toBe("/de/datenschutzerklarung");
  });

  test("translates portfolio route (same slug across languages)", () => {
    const translatePath = useTranslatedPath("en");
    expect(translatePath("portfolio")).toBe("/en/portfolio");
  });

  test("preserves unknown routes and adds locale prefix", () => {
    const translatePath = useTranslatedPath("pl");
    expect(translatePath("/unknown-page")).toBe("/pl/unknown-page");
  });

  test("overrides language via second parameter", () => {
    const translatePath = useTranslatedPath("pl");
    expect(translatePath("privacy-policy", "de")).toBe(
      "/de/datenschutzerklarung"
    );
  });

  test("handles path with leading slash for a known route", () => {
    const translatePath = useTranslatedPath("de");
    expect(translatePath("/privacy-policy")).toBe("/de/datenschutzerklarung");
  });

  test("handles path with trailing slash for a known route", () => {
    const translatePath = useTranslatedPath("de");
    expect(translatePath("privacy-policy/")).toBe("/de/datenschutzerklarung");
  });

  test("handles path with both leading and trailing slashes", () => {
    const translatePath = useTranslatedPath("en");
    expect(translatePath("/portfolio/")).toBe("/en/portfolio");
  });
});

describe("getRouteFromUrl", () => {
  test("returns canonical key for a German translated slug", () => {
    const url = new URL("https://example.com/de/datenschutzerklarung");
    expect(getRouteFromUrl(url)).toBe("privacy-policy");
  });

  test("returns canonical key for a Polish translated slug", () => {
    const url = new URL("https://example.com/pl/polityka-prywatnosci");
    expect(getRouteFromUrl(url)).toBe("privacy-policy");
  });

  test("returns canonical key for an English slug", () => {
    const url = new URL("https://example.com/en/privacy-policy");
    expect(getRouteFromUrl(url)).toBe("privacy-policy");
  });

  test("returns canonical key for portfolio", () => {
    const url = new URL("https://example.com/en/portfolio");
    expect(getRouteFromUrl(url)).toBe("portfolio");
  });

  test("returns undefined for an unknown slug", () => {
    const url = new URL("https://example.com/en/unknown-page");
    expect(getRouteFromUrl(url)).toBeUndefined();
  });

  test("returns undefined for a root-only path", () => {
    const url = new URL("https://example.com/");
    expect(getRouteFromUrl(url)).toBeUndefined();
  });

  test("handles trailing slash on translated URL", () => {
    const url = new URL("https://example.com/de/datenschutzerklarung/");
    expect(getRouteFromUrl(url)).toBe("privacy-policy");
  });
});

describe("getCanonicalBasePath", () => {
  test("returns canonical route for a known German translated URL", () => {
    const url = new URL("https://example.com/de/datenschutzerklarung");
    expect(getCanonicalBasePath(url)).toBe("/privacy-policy");
  });

  test("returns canonical route for a known Polish translated URL", () => {
    const url = new URL("https://example.com/pl/polityka-prywatnosci");
    expect(getCanonicalBasePath(url)).toBe("/privacy-policy");
  });

  test("falls back to stripped path for an unknown route", () => {
    const url = new URL("https://example.com/en/some-page");
    expect(getCanonicalBasePath(url)).toBe("/some-page");
  });

  test("returns '/' for locale-only path", () => {
    const url = new URL("https://example.com/pl");
    expect(getCanonicalBasePath(url)).toBe("/");
  });

  test("returns '/' for root path", () => {
    const url = new URL("https://example.com/");
    expect(getCanonicalBasePath(url)).toBe("/");
  });
});

describe("stripLocalePrefix", () => {
  test("strips /pl prefix and returns '/'", () => {
    expect(stripLocalePrefix("/pl")).toBe("/");
  });

  test("strips /en prefix and returns '/'", () => {
    expect(stripLocalePrefix("/en")).toBe("/");
  });

  test("strips /de prefix and returns '/'", () => {
    expect(stripLocalePrefix("/de")).toBe("/");
  });

  test("strips locale prefix from a deeper path", () => {
    expect(stripLocalePrefix("/en/some-page")).toBe("/some-page");
  });

  test("strips locale prefix preserving nested segments", () => {
    expect(stripLocalePrefix("/de/foo/bar")).toBe("/foo/bar");
  });

  test("returns '/' for root path without locale", () => {
    expect(stripLocalePrefix("/")).toBe("/");
  });

  test("leaves non-locale paths unchanged", () => {
    expect(stripLocalePrefix("/other/path")).toBe("/other/path");
  });

  test("does not strip partial locale matches (word boundary enforced)", () => {
    expect(stripLocalePrefix("/planet")).toBe("/planet");
    expect(stripLocalePrefix("/deploy")).toBe("/deploy");
    expect(stripLocalePrefix("/planner/test")).toBe("/planner/test");
  });
});
