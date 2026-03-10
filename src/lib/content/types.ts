export interface PortfolioEntry {
  title: string;
  slug: string;
  date: string;
  highlight: boolean;
  featuredImageUrl: string;
  featuredImageFullUrl: string;
  description: string;
  tags: string[];
}

export interface RawSanityPortfolio {
  title: string | null;
  slug: string | null;
  date: string | null;
  highlight: boolean | null;
  featuredImage: string | null;
  description: string | null;
  tags: string[] | null;
}
