export interface GalleryImage {
  thumbnail: string;
  url: string;
  alt: string;
  description: string;
  title: string;
  date?: string;
  tags: string[];
  orientation?: "landscape" | "portrait";
  gallery?: string;
}
