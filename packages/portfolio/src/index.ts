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

export type Portfolio = Project[];

export const projectTags = [
  "armchairs",
  "sofas",
  "chairs",
  "restoration",
  "automotive",
] as const;

export type ProjectTag = (typeof projectTags)[number];

export interface PortfolioService {
  count(): Promise<number>;
  fetchPortfolioPage(page: { start: number; end: number }): Promise<Portfolio>;
  fetchPortfolioLatestProjects(limit: number): Promise<Portfolio>;
}
