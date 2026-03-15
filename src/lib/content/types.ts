export type Portfolio = Project[];

export interface ProjectImage {
  thumbnail: string;
  url: string;
  aspectRatio: number;
}

export interface Project {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  description: string;
  tags: string[];
  images: ProjectImage[];
}
