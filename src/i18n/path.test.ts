import { describe, expect, test } from "vitest";

import {
  getCanonicalBasePath,
  getRoute,
  getTranslatedPath,
  stripLocalePrefix,
} from "./path";

describe("getTranslatedPath", () => {
  test("returns a function", () => {
    const translatePath = getTranslatedPath("pl");
    expect(typeof translatePath).toBe("function");
  });

  test("translates a known route for the default language", () => {
    const translatePath = getTranslatedPath("pl");
    expect(translatePath("privacy-policy")).toBe("/pl/polityka-prywatnosci");
  });

  test("translates a known route for English", () => {
    const translatePath = getTranslatedPath("en");
    expect(translatePath("privacy-policy")).toBe("/en/privacy-policy");
  });

  test("translates a known route for German", () => {
    const translatePath = getTranslatedPath("de");
    expect(translatePath("privacy-policy")).toBe("/de/datenschutzerklarung");
  });

  test("translates portfolio route (same slug across languages)", () => {
    const translatePath = getTranslatedPath("en");
    expect(translatePath("portfolio")).toBe("/en/portfolio");
  });

  test("preserves unknown routes and adds locale prefix", () => {
    const translatePath = getTranslatedPath("pl");
    expect(translatePath("/unknown-page")).toBe("/pl/unknown-page");
  });

  test("overrides language via second parameter", () => {
    const translatePath = getTranslatedPath("pl");
    expect(translatePath("privacy-policy", "de")).toBe(
      "/de/datenschutzerklarung"
    );
  });

  test("handles path with leading slash for a known route", () => {
    const translatePath = getTranslatedPath("de");
    expect(translatePath("/privacy-policy")).toBe("/de/datenschutzerklarung");
  });

  test("handles path with trailing slash for a known route", () => {
    const translatePath = getTranslatedPath("de");
    expect(translatePath("privacy-policy/")).toBe("/de/datenschutzerklarung");
  });

  test("handles path with both leading and trailing slashes", () => {
    const translatePath = getTranslatedPath("en");
    expect(translatePath("/portfolio/")).toBe("/en/portfolio");
  });
});

describe("getRoute", () => {
  test("returns canonical key for a German translated slug", () => {
    const url = new URL("https://example.com/de/datenschutzerklarung");
    expect(getRoute(url)).toBe("privacy-policy");
  });

  test("returns canonical key for a Polish translated slug", () => {
    const url = new URL("https://example.com/pl/polityka-prywatnosci");
    expect(getRoute(url)).toBe("privacy-policy");
  });

  test("returns canonical key for an English slug", () => {
    const url = new URL("https://example.com/en/privacy-policy");
    expect(getRoute(url)).toBe("privacy-policy");
  });

  test("returns canonical key for portfolio", () => {
    const url = new URL("https://example.com/en/portfolio");
    expect(getRoute(url)).toBe("portfolio");
  });

  test("returns undefined for an unknown slug", () => {
    const url = new URL("https://example.com/en/unknown-page");
    expect(getRoute(url)).toBeUndefined();
  });

  test("returns undefined for a root-only path", () => {
    const url = new URL("https://example.com/");
    expect(getRoute(url)).toBeUndefined();
  });

  test("handles trailing slash on translated URL", () => {
    const url = new URL("https://example.com/de/datenschutzerklarung/");
    expect(getRoute(url)).toBe("privacy-policy");
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
