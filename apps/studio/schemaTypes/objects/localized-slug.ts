import { languages } from "@bero/locales";
import { defineField, defineType } from "sanity";

interface InternationalizedArrayItem {
  _key: string;
  value: string;
}

export default defineType({
  name: "localizedSlug",
  title: "Localized Slug",
  type: "object",
  fieldsets: [
    {
      title: "Tłumaczenia",
      name: "translations",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: languages.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: "slug",
      fieldset: "isDefault" in lang ? undefined : "translations",
      options: {
        source: (doc: Record<string, unknown>) => {
          const titleArray = doc.title as
            | InternationalizedArrayItem[]
            | undefined;
          return titleArray?.find((v) => v._key === lang.id)?.value ?? "";
        },
      },
    })
  ),
});
