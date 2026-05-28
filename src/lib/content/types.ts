export type Portfolio = Project[];

export interface ProjectImage {
  aspectRatio: number;
  thumbnail: string;
  url: string;
}

export interface Project {
  date: string;
  description: string;
  excerpt: string;
  images: ProjectImage[];
  slug: string;
  tags: string[];
  title: string;
}
