import { defaultLang, languages } from "@bero/locales";
import { projectTags } from "@bero/portfolio";
import { defineField, defineType, type KeyedObject, type Rule } from "sanity";

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
      title: "Title (max 50 characters)",
      type: "internationalizedArrayString",
      group: "localized",
      validation: requireAllLanguages("Title", { maxLength: 50 }),
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
      name: "excerpt",
      title: "Excerpt",
      description: "Short description for cards (max 150 characters)",
      type: "internationalizedArrayString",
      group: "localized",
      validation: requireAllLanguages("Excerpt", { maxLength: 150 }),
    }),
    defineField({
      name: "description",
      title: "Description (max 850 characters)",
      type: "internationalizedArrayText",
      group: "localized",
      validation: requireAllLanguages("Description", { maxLength: 850 }),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      group: "common",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      description:
        "Project photos. The first image is used as the featured image.",
      type: "array",
      group: "common",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "common",
      of: [{ type: "string" }],
      options: {
        list: projectTags.map((key) => ({
          title: key.charAt(0).toUpperCase() + key.slice(1),
          value: key,
        })),
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
      media: "images.0",
    },
    prepare({ title, date, media }) {
      const localizedTitle =
        (title as KeyedObject[])?.find((v) => v._key === defaultLang)?.value ??
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

function requireAllLanguages(
  fieldLabel: string,
  options?: { maxLength?: number }
) {
  return (rule: Rule) =>
    rule.custom<{ _key: string; value: string }[]>((value) => {
      if (!value || value.length === 0) {
        return `${fieldLabel} is mandatory`;
      }
      const errors: {
        message: string;
        path: Array<{ _key: string } | string>;
      }[] = [];
      for (const item of value) {
        if (!item.value || item.value.trim() === "") {
          errors.push({
            message: `${fieldLabel} is mandatory for language: ${item._key}`,
            path: [{ _key: item._key }, "value"],
          });
        } else if (
          options?.maxLength &&
          item.value.length > options.maxLength
        ) {
          errors.push({
            message: `${fieldLabel} must be at most ${options.maxLength} characters for language: ${item._key} (currently ${item.value.length})`,
            path: [{ _key: item._key }, "value"],
          });
        }
      }
      return errors.length > 0 ? errors : true;
    });
}

function requireAllSlugLanguages() {
  return (rule: Rule) =>
    rule.custom<Record<string, { _type: string; current: string }>>((value) => {
      if (!value) {
        return "Slug is mandatory";
      }
      const emptyLangs = languages.filter(
        (lang) => !value[lang.id]?.current?.trim()
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
