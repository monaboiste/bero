import type { OptimisedImage } from "@components/ui/types";

/**
 * Lightweight tile data passed as React props (no heavy description text).
 * Used by GridGallery and GalleryTile for rendering the grid.
 */
export interface GalleryTileData {
  gallery?: string;
  orientation?: "landscape" | "portrait";
  tags: string[];
  thumbnail: OptimisedImage;
  title: string;
  url: string;
}

/**
 * Full image data including description and date.
 * Used in Astro views to generate the static description template.
 */
export interface GalleryImage extends GalleryTileData {
  date?: string;
  description: string;
}
