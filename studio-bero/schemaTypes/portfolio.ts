import { defineField, defineType, type KeyedObject, type Rule } from "sanity";
import { baseLanguage, languages } from "../languages";

export default defineType({
  name: "portfolio",
  title: "Portfolio",
  type: "document",
  groups: [
    {
      name: "common",
      title: "Common",
    },
    {
      name: "localized",
      title: "Translations",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
      group: "localized",
      validation: requireAllLanguages("Title"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "URL fragment, e.g. renowacja-fotela-klubowego",
      type: "localizedSlug",
      group: "localized",
      validation: requireAllSlugLanguages(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "internationalizedArrayText",
      group: "localized",
      validation: requireAllLanguages("Description"),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      group: "common",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "highlight",
      title: "Highlight",
      type: "boolean",
      group: "common",
      initialValue: false,
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "image",
      group: "common",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "common",
      of: [{ type: "string" }],
      options: {
        list: [
          // TODO: locatized
          { title: "Fotele", value: "armchairs" },
          { title: "Sofy", value: "sofas" },
          { title: "Krzesła", value: "chairs" },
          { title: "Renowacja", value: "restoration" },
        ],
      },
    }),
  ],
  orderings: [
    {
      title: "Date (newest)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      media: "featuredImage",
    },
    prepare({ title, date, media }) {
      const localizedTitle =
        (title as KeyedObject[])?.find((v) => v._key === baseLanguage)?.value ??
        (title as KeyedObject[])?.[0]?.value ??
        "No title";

      return {
        title: localizedTitle as string,
        subtitle: date ?? "",
        media,
      };
    },
  },
});

function requireAllLanguages(fieldLabel: string) {
  return (rule: Rule) =>
    rule.custom<{ _key: string; value: string }[]>((value) => {
      if (!value || value.length === 0) {
        return `${fieldLabel} is mandatory`;
      }
      const emptyItems = value.filter(
        (item) => !item.value || item.value.trim() === "",
      );
      if (emptyItems.length > 0) {
        return emptyItems.map((item) => ({
          message: `${fieldLabel} is mandatory for language: ${item._key}`,
          path: [{ _key: item._key }, "value"],
        }));
      }
      return true;
    });
}

function requireAllSlugLanguages() {
  return (rule: Rule) =>
    rule.custom<Record<string, { _type: string; current: string }>>((value) => {
      if (!value) {
        return "Slug is mandatory";
      }
      const emptyLangs = languages.filter(
        (lang) => !value[lang.id]?.current?.trim(),
      );
      if (emptyLangs.length > 0) {
        return emptyLangs.map((lang) => ({
          message: `Slug is mandatory for language: ${lang.id}`,
          path: [lang.id],
        }));
      }
      return true;
    });
}
