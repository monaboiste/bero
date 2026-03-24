import {
  experimental_AstroContainer as AstroContainer,
  type ContainerRenderOptions,
} from "astro/container";
import type { ComponentProps } from "astro/types";

const SITE = "https://studio-bero.com";

// biome-ignore lint: lint/suspicion/noExplicitAny
type AstroComponentFactory = (...args: any[]) => any;

type ComponentContainerRenderOptions<T extends AstroComponentFactory> = Omit<
  ContainerRenderOptions,
  "props"
> & {
  props?: ComponentProps<T>;
};

export async function renderAstroComponent<T extends AstroComponentFactory>(
  Component: T,
  options: ComponentContainerRenderOptions<T> = {}
): Promise<DocumentFragment> {
  const container = await AstroContainer.create({
    astroConfig: { site: SITE },
  });
  const result = await container.renderToString(Component, options);

  const template = document.createElement("template");
  template.innerHTML = result;

  return template.content;
}

/**
 * Renders an Astro component and returns a full Document via DOMParser.
 * Unlike renderAstroComponent (which returns a DocumentFragment and strips
 * structural tags), this preserves <html>, <head>, and <body> so they can
 * be queried directly. Use this for layout-level tests.
 */
export async function renderAstroDocument<T extends AstroComponentFactory>(
  Component: T,
  options: ComponentContainerRenderOptions<T> = {}
): Promise<Document> {
  const container = await AstroContainer.create({
    astroConfig: { site: SITE },
  });
  const html = await container.renderToString(Component, options);

  return new DOMParser().parseFromString(html, "text/html");
}
