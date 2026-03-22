import { describe, expect, test } from "vitest";

import {
  getCanonicalBasePath,
  getRouteFromUrl,
  stripLocalePrefix,
  useTranslatedPath,
} from "./path";

describe("useTranslatedPath", () => {
  test("returns a function", () => {
    const translatePath = useTranslatedPath("pl");
    expect(typeof translatePath).toBe("function");
  });

  test("translates a known route for the default language", () => {
    const translatePath = useTranslatedPath("pl");
    expect(translatePath("privacy-policy")).toBe("/pl/polityka-prywatnosci");
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
  test("returns canonical route for a known translated URL", () => {
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
