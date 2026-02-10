import {
  experimental_AstroContainer as AstroContainer,
  type ContainerRenderOptions,
} from "astro/container";
import type { ComponentProps } from "astro/types";

// biome-ignore lint: noExplicitAny
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
) {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Component, options);

  const template = document.createElement("template");
  template.innerHTML = result;

  return template.content;
}
