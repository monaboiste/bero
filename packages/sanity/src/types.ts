/** Raw Sanity document shape — all fields optional because GROQ coalesce may miss. */
export interface SanityPortfolioDocument {
  title?: string;
  slug?: string;
  date?: string;
  images?: unknown[];
  excerpt?: string;
  description?: string;
  tags?: string[];
}

export interface SanityProjectImage {
  thumbnail: string;
  url: string;
  aspectRatio: number;
}
