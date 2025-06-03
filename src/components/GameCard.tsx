
import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '@/types/Game';
import { Star, Play, Users } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const formatPlays = (plays: number) => {
    if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
    if (plays >= 1000) return `${(plays / 1000).toFixed(1)}K`;
    return plays.toString();
  };

  return (
    <Link to={`/games/${game.slug}`} className="group">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-2 border border-slate-700/50">
        <div className="relative overflow-hidden">
          <img 
            src={game.thumbnail} 
            alt={game.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 right-3">
            <span className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {game.category}
            </span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-blue-500 rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-8 h-8 text-white fill-current" />
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
            {game.title}
          </h3>
          <p className="text-slate-400 text-sm mb-3 line-clamp-2">
            {game.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-xs text-slate-500">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{game.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{formatPlays(game.plays)}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {game.tags.slice(0, 2).map(tag => (
                <span key={tag} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
