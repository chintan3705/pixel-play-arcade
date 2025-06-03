
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock } from 'lucide-react';
import AdSlot from './AdSlot';

interface GameLoaderProps {
  onLoadComplete: () => void;
  gameTitle: string;
}

const loaderVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const iconVariants = {
  animate: {
    scale: [1, 1.2, 1],
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const countdownVariants = {
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const GameLoader: React.FC<GameLoaderProps> = ({ onLoadComplete, gameTitle }) => {
  const [countdown, setCountdown] = useState(5);

  const handleLoadComplete = useCallback(() => {
    onLoadComplete();
  }, [onLoadComplete]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => {
            handleLoadComplete();
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [handleLoadComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      <motion.div 
        className="text-center mb-8"
        initial="hidden"
        animate="visible"
        variants={loaderVariants}
      >
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AdSlot size="banner" className="mx-auto" />
        </motion.div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 max-w-md mx-auto">
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
          >
            <motion.div 
              className="bg-gradient-to-r from-blue-500 to-emerald-500 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center"
              variants={iconVariants}
              animate="animate"
            >
              <Play className="w-10 h-10 text-white fill-current" />
            </motion.div>
            <motion.h2 
              className="text-2xl font-bold text-white mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Loading {gameTitle}
            </motion.h2>
            <motion.p 
              className="text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Your game will start in {countdown} seconds
            </motion.p>
          </motion.div>

          <motion.div 
            className="flex items-center justify-center space-x-2 text-slate-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Clock className="w-5 h-5" />
            <motion.span 
              className="text-3xl font-bold text-blue-400"
              key={countdown}
              variants={countdownVariants}
              animate="animate"
            >
              {countdown}
            </motion.span>
          </motion.div>

          <motion.div 
            className="mt-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <div className="w-full bg-slate-700 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${((5 - countdown) / 5) * 100}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default GameLoader;
