import { describe, expect, test } from "vitest";

import { useRichText } from "./richtext";

describe("useRichText", () => {
  test("returns a function", () => {
    const richText = useRichText("pl");
    expect(typeof richText).toBe("function");
  });

  test("returns a single plain part for a key without tags", () => {
    const richText = useRichText("pl");
    const parts = richText("nav.home");
    expect(parts).toEqual([{ text: "Strona główna" }]);
  });

  test("splits hero.title into text and accent parts", () => {
    const richText = useRichText("pl");
    const parts = richText("hero.title", ["accent"]);
    expect(parts).toEqual([
      { text: "Tapicerstwo w\u00A0nowoczesnym wydaniu" },
      { text: ".", tag: "accent" },
    ]);
  });

  test("returns full string as single part when tags list is empty", () => {
    const richText = useRichText("en");
    const parts = richText("hero.title");
    expect(parts).toHaveLength(1);
    expect(parts[0]?.text).toBe("Upholstery, redefined<accent>.</accent>");
    expect(parts[0]?.tag).toBeUndefined();
  });
});
