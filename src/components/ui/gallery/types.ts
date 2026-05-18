import type { OptimisedImage } from "@components/ui/types";

export interface GalleryImage {
  thumbnail: OptimisedImage;
  url: string;
  description: string;
  title: string;
  date?: string;
  tags: string[];
  orientation?: "landscape" | "portrait";
  gallery?: string;
}
