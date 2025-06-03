
export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  gameUrl: string;
  tags: string[];
  slug: string;
  featured: boolean;
  rating: number;
  plays: number;
}
