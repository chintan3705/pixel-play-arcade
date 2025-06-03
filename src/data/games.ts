
import { Game } from '@/types/Game';

export const games: Game[] = [
  {
    id: '1',
    title: '2048',
    description: 'Slide numbered tiles on a grid to combine them and create a tile with the number 2048.',
    category: 'Puzzle',
    thumbnail: '/placeholder.svg',
    gameUrl: 'https://play2048.co/',
    tags: ['puzzle', 'numbers', 'strategy'],
    slug: '2048',
    featured: true,
    rating: 4.8,
    plays: 125000
  },
  {
    id: '2',
    title: 'Tic Tac Toe',
    description: 'Classic strategy game for two players. Get three in a row to win!',
    category: 'Strategy',
    thumbnail: '/placeholder.svg',
    gameUrl: 'https://playtictactoe.org/',
    tags: ['strategy', 'classic', 'multiplayer'],
    slug: 'tic-tac-toe',
    featured: true,
    rating: 4.5,
    plays: 98000
  },
  {
    id: '3',
    title: 'Flappy Bird',
    description: 'Navigate through pipes by tapping to make the bird fly. How far can you go?',
    category: 'Arcade',
    thumbnail: '/placeholder.svg',
    gameUrl: 'https://flappybird.io/',
    tags: ['arcade', 'endless', 'challenging'],
    slug: 'flappy-bird',
    featured: false,
    rating: 4.6,
    plays: 156000
  },
  {
    id: '4',
    title: 'Snake',
    description: 'Control a growing snake as it eats food and avoid hitting walls or yourself.',
    category: 'Arcade',
    thumbnail: '/placeholder.svg',
    gameUrl: 'https://playsnake.org/',
    tags: ['arcade', 'classic', 'retro'],
    slug: 'snake',
    featured: true,
    rating: 4.7,
    plays: 134000
  },
  {
    id: '5',
    title: 'Space Invaders',
    description: 'Defend Earth from waves of alien invaders in this classic shooter.',
    category: 'Shooter',
    thumbnail: '/placeholder.svg',
    gameUrl: 'https://www.minijuegos.com/game/space-invaders',
    tags: ['shooter', 'classic', 'retro'],
    slug: 'space-invaders',
    featured: false,
    rating: 4.4,
    plays: 87000
  },
  {
    id: '6',
    title: 'Sudoku',
    description: 'Fill the 9x9 grid with numbers so each row, column, and 3x3 box contains all digits 1-9.',
    category: 'Puzzle',
    thumbnail: '/placeholder.svg',
    gameUrl: 'https://sudoku.com/easy/',
    tags: ['puzzle', 'logic', 'numbers'],
    slug: 'sudoku',
    featured: true,
    rating: 4.9,
    plays: 203000
  },
  {
    id: '7',
    title: 'Memory Match',
    description: 'Test your memory by matching pairs of cards in this classic concentration game.',
    category: 'Puzzle',
    thumbnail: '/placeholder.svg',
    gameUrl: 'https://www.memozor.com/memory-games/for-all/memory-game',
    tags: ['memory', 'cards', 'concentration'],
    slug: 'memory-match',
    featured: false,
    rating: 4.3,
    plays: 76000
  },
  {
    id: '8',
    title: 'Chess',
    description: 'Play the classic strategy game of chess against the computer or a friend.',
    category: 'Strategy',
    thumbnail: '/placeholder.svg',
    gameUrl: 'https://www.chess.com/play/computer',
    tags: ['strategy', 'chess', 'classic'],
    slug: 'chess',
    featured: true,
    rating: 4.8,
    plays: 189000
  },
  {
    id: '9',
    title: 'Platform Adventure',
    description: 'Jump and run through challenging levels in this exciting platformer.',
    category: 'Adventure',
    thumbnail: '/placeholder.svg',
    gameUrl: 'https://www.crazygames.com/game/fireboy-and-watergirl-forest-temple',
    tags: ['platform', 'adventure', 'jumping'],
    slug: 'platform-adventure',
    featured: false,
    rating: 4.5,
    plays: 112000
  },
  {
    id: '10',
    title: 'Bubble Shooter',
    description: 'Aim and shoot colored bubbles to create groups of three or more.',
    category: 'Puzzle',
    thumbnail: '/placeholder.svg',
    gameUrl: 'https://bubble-shooter.co/',
    tags: ['puzzle', 'bubbles', 'matching'],
    slug: 'bubble-shooter',
    featured: false,
    rating: 4.4,
    plays: 95000
  }
];

export const getGameBySlug = (slug: string): Game | undefined => {
  return games.find(game => game.slug === slug);
};

export const getFeaturedGames = (): Game[] => {
  return games.filter(game => game.featured);
};

export const getGamesByCategory = (category: string): Game[] => {
  return games.filter(game => game.category.toLowerCase() === category.toLowerCase());
};
