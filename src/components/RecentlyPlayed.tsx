
import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useRecentlyPlayed } from '@/hooks/useRecentlyPlayed';
import GameCard from './GameCard';

const containerVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  }
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const RecentlyPlayed = () => {
  const { recentGames } = useRecentlyPlayed();

  if (recentGames.length === 0) {
    return null;
  }

  return (
    <motion.section 
      className="container mx-auto px-4 mb-12 sm:mb-16 relative z-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div 
        className="flex items-center space-x-3 mb-6 sm:mb-8"
        variants={headerVariants}
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
        </motion.div>
        <h2 className="text-xl sm:text-2xl font-bold text-white font-orbitron">Recently Played</h2>
        <motion.div 
          className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </motion.div>
      
      <motion.div 
        className="overflow-x-auto pb-4"
        variants={gridVariants}
      >
        <div className="flex space-x-4 sm:space-x-6 min-w-max">
          {recentGames.map((game, index) => (
            <motion.div
              key={game.id}
              className="w-64 sm:w-72 flex-shrink-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.5,
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
            >
              <GameCard game={game} index={index} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default RecentlyPlayed;
