export type Portfolio = PortfolioEntry[];

export interface PortfolioEntry {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  description: string;
  tags: string[];
  featuredImage: {
    thumbnail: string;
    url: string;
    aspectRatio: number;
  };
}
