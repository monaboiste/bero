/**
 * Vite plugin that redirects `.svg` imports to a mock Astro component.
 *
 * Astro's asset pipeline transforms `.svg` files into Astro components
 * at build time, but this transform doesn't work correctly inside
 * `AstroContainer` during vitest runs, causing "NoMatchingRenderer"
 * errors. This plugin intercepts `.svg` resolution and points it to a
 * minimal mock component instead.
 */
export function svgMockPlugin() {
  const virtualId = "virtual:svg-mock";
  const resolvedVirtualId = `\0${virtualId}`;

  return {
    name: "svg-mock",
    enforce: "pre" as const,

    resolveId(source: string) {
      if (source.endsWith(".svg")) {
        return resolvedVirtualId;
      }
    },

    load(id: string) {
      if (id === resolvedVirtualId) {
        return `
          import { createComponent, render } from "astro/runtime/server/index.js";

          export default createComponent((_result, _props) => {
            return render\`<svg data-testid="svg-mock"></svg>\`;
          });
        `;
      }
    },
  };
}
