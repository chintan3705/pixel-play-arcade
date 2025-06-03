
import { useState, useEffect } from 'react';
import { Game } from '@/types/Game';

const RECENTLY_PLAYED_KEY = 'zappy-games-recent';
const MAX_RECENT_GAMES = 6;

export const useRecentlyPlayed = () => {
  const [recentGames, setRecentGames] = useState<Game[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(RECENTLY_PLAYED_KEY);
    if (stored) {
      try {
        setRecentGames(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing recently played games:', error);
      }
    }
  }, []);

  const addToRecentlyPlayed = (game: Game) => {
    setRecentGames(prevRecent => {
      const filtered = prevRecent.filter(g => g.id !== game.id);
      const updated = [game, ...filtered].slice(0, MAX_RECENT_GAMES);
      localStorage.setItem(RECENTLY_PLAYED_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecentlyPlayed = () => {
    setRecentGames([]);
    localStorage.removeItem(RECENTLY_PLAYED_KEY);
  };

  return {
    recentGames,
    addToRecentlyPlayed,
    clearRecentlyPlayed
  };
};
