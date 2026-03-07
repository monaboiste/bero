import { defineField, defineType, type KeyedObject } from "sanity";

export default defineType({
  name: "portfolio",
  title: "Portfolio",
  type: "document",
  groups: [
    {
      name: "common",
      title: "Wspólne",
    },
    {
      name: "localized",
      title: "Tłumaczenia",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "internationalizedArrayString",
      group: "localized",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "Fragment URL, np. renowacja-fotela-klubowego",
      type: "localizedSlug",
      group: "localized",
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "internationalizedArrayText",
      group: "localized",
    }),
    defineField({
      name: "date",
      title: "Data",
      type: "date",
      group: "common",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "highlight",
      title: "Wyróżniony",
      type: "boolean",
      group: "common",
      initialValue: false,
    }),
    defineField({
      name: "featuredImage",
      title: "Zdjęcie główne",
      type: "image",
      group: "common",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tagi",
      type: "array",
      group: "common",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Fotele", value: "armchairs" },
          { title: "Sofy", value: "sofas" },
          { title: "Krzesła", value: "chairs" },
          { title: "Renowacja", value: "restoration" },
          { title: "Projekt indywidualny", value: "custom" },
        ],
      },
    }),
  ],
  orderings: [
    {
      title: "Data (najnowsze)",
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
        (title as KeyedObject[])?.find((v) => v._key === "pl")?.value ??
        (title as KeyedObject[])?.[0]?.value ??
        "Bez tytułu";

      return {
        title: localizedTitle as string,
        subtitle: date ?? "",
        media,
      };
    },
  },
});
