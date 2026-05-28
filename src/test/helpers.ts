import { loadRenderers } from "astro:container";
import { getContainerRenderer as reactContainerRenderer } from "@astrojs/react";
import {
  experimental_AstroContainer as AstroContainer,
  type ContainerRenderOptions,
} from "astro/container";
import type { ComponentProps } from "astro/types";
import { Window } from "happy-dom";

// biome-ignore lint: lint/suspicion/noExplicitAny
type AstroComponentFactory = (...args: any[]) => any;

type ComponentContainerRenderOptions<T extends AstroComponentFactory> = Omit<
  ContainerRenderOptions,
  "props"
> & {
  props?: ComponentProps<T>;
};

/**
 * @see https://angelika.me/2025/02/01/astro-component-unit-tests/
 */
export async function renderAstroComponent<T extends AstroComponentFactory>(
  Component: T,
  options: ComponentContainerRenderOptions<T> = {}
) {
  const renderers = await loadRenderers([reactContainerRenderer()]);
  const container = await AstroContainer.create({ renderers });

  const result = await container.renderToString(Component, options);

  const window = new Window();

  await window.happyDOM.waitUntilComplete();

  const template = window.document.createElement("template");
  template.innerHTML = result;

  await window.happyDOM.close();
  return template.content as unknown as DocumentFragment;
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
) {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Component, options);

  return new DOMParser().parseFromString(html, "text/html");
}
