export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface OptimisedImage {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  width: number;
  height: number;
}
