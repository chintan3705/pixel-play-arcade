
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Game } from '@/types/Game';
import { Star, Play, Users } from 'lucide-react';

interface GameCardProps {
  game: Game;
  index?: number;
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  }),
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const imageVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const playButtonVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "backOut"
    }
  }
};

const GameCard: React.FC<GameCardProps> = ({ game, index = 0 }) => {
  const formatPlays = (plays: number) => {
    if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
    if (plays >= 1000) return `${(plays / 1000).toFixed(1)}K`;
    return plays.toString();
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Puzzle': 'from-blue-500 to-cyan-500',
      'Arcade': 'from-red-500 to-orange-500',
      'Strategy': 'from-green-500 to-emerald-500',
      'Adventure': 'from-yellow-500 to-amber-500',
      'Shooter': 'from-indigo-500 to-purple-500',
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <Link to={`/games/${game.slug}`} className="group">
      <motion.div 
        className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-slate-700/50 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        custom={index}
      >
        <div className="relative overflow-hidden">
          <motion.img 
            src={game.thumbnail} 
            alt={game.title}
            className="w-full h-48 object-cover"
            variants={imageVariants}
            loading="lazy"
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          <div className="absolute top-3 right-3">
            <motion.span 
              className={`bg-gradient-to-r ${getCategoryColor(game.category)} text-white px-3 py-1 rounded-full text-xs font-semibold font-orbitron shadow-lg`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
            >
              {game.category}
            </motion.span>
          </div>
          
          {game.featured && (
            <div className="absolute top-3 left-3">
              <motion.span 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold font-pixel"
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  delay: index * 0.1 + 0.3, 
                  duration: 0.3,
                  scale: { repeat: Infinity, duration: 2 }
                }}
              >
                ⭐ FEATURED
              </motion.span>
            </div>
          )}
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial="hidden"
            whileHover="visible"
            variants={playButtonVariants}
          >
            <div className="bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full p-4 shadow-2xl">
              <Play className="w-8 h-8 text-white fill-current" />
            </div>
          </motion.div>
        </div>
        
        <div className="p-4">
          <motion.h3 
            className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors font-orbitron"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
          >
            {game.title}
          </motion.h3>
          <motion.p 
            className="text-slate-400 text-sm mb-3 line-clamp-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
          >
            {game.description}
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.6, duration: 0.3 }}
          >
            <div className="flex items-center space-x-3 text-xs text-slate-500">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="font-vt323">{game.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span className="font-vt323">{formatPlays(game.plays)}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {game.tags.slice(0, 2).map((tag, tagIndex) => (
                <motion.span 
                  key={tag} 
                  className="bg-slate-700/50 text-slate-300 px-2 py-1 rounded text-xs font-vt323 border border-slate-600/50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.7 + tagIndex * 0.1, duration: 0.2 }}
                >
                  #{tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default GameCard;
