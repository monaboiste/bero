export interface PortfolioEntry {
  title: string;
  slug: string;
  date: string;
  featuredImageUrl: string;
  featuredImageFullUrl: string;
  excerpt: string;
  description: string;
  tags: string[];
}

export interface RawSanityPortfolio {
  title: string | null;
  slug: string | null;
  date: string | null;
  featuredImage: string | null;
  excerpt: string | null;
  description: string | null;
  tags: string[] | null;
}
