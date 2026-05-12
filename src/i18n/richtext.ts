import { IntlMessageFormat } from "intl-messageformat";

import { defaultLang, type Lang, type TranslationKey, ui } from "./locale";

/**
 * A single segment of rich text produced by {@link getRichText}.
 * Plain text has only `text`; tagged text also carries the `tag` name
 * so the caller can apply styling per tag.
 */
export interface RichTextPart {
  text: string;
  tag?: string;
}

/**
 * Returns a function that formats a translation string containing
 * ICU-style XML tags (e.g. `<accent>.</accent>`) into an array of
 * {@link RichTextPart} objects.
 *
 * @example
 * ```ts
 * const richText = useRichText("pl");
 * const parts = richText("hero.title", ["accent"]);
 * // [{ text: "Tapicerstwo w nowoczesnym wydaniu" }, { text: ".", tag: "accent" }]
 * ```
 */
export function getRichText(lang: Lang) {
  return function richText(
    key: TranslationKey,
    tags: string[] = []
  ): RichTextPart[] {
    const raw = ui[lang][key] ?? ui[defaultLang][key];
    const ignoreTags = tags.length === 0;
    const msg = new IntlMessageFormat(raw, lang, undefined, {
      ignoreTag: ignoreTags,
    });

    const tagValues: Record<
      string,
      (chunks: (string | RichTextPart)[]) => RichTextPart
    > = {};
    for (const tag of tags) {
      tagValues[tag] = (chunks) => ({
        text: chunks.map((c) => (typeof c === "string" ? c : c.text)).join(""),
        tag,
      });
    }

    const result = msg.format(tagValues);

    if (typeof result === "string") {
      return [{ text: result }];
    }

    return (result as (string | RichTextPart)[]).map((part) =>
      typeof part === "string" ? { text: part } : part
    );
  };
}
