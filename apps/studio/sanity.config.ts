import { defaultLang, languages } from "@bero/locales";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "bero",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID as string,
  dataset: process.env.SANITY_STUDIO_DATASET as string,

  plugins: [
    structureTool(),
    visionTool(),
    internationalizedArray({
      languages: [...languages],
      defaultLanguages: [defaultLang],
      fieldTypes: ["string", "text"],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
