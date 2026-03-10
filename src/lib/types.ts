import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

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
  featuredImage: SanityImageSource | null;
  description: string | null;
  tags: string[] | null;
}
