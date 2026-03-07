import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { baseLanguage, languages } from "./languages";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "bero",

  projectId: "pc07lowk",
  dataset: "production",

  plugins: [
    structureTool(),
    visionTool(),
    internationalizedArray({
      languages: [...languages],
      defaultLanguages: [baseLanguage],
      fieldTypes: ["string", "text"],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
