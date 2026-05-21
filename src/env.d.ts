declare module "*.astro" {
  import type { AstroComponentFactory } from "astro/runtime/server/index.js";
  const Component: AstroComponentFactory;
  export default Component;
}

declare module "*.svg?react" {
  import type { ComponentType, SVGProps } from "react";
  const Component: ComponentType<SVGProps<SVGSVGElement>>;
  export default Component;
}
