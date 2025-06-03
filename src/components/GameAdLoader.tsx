
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Gamepad2 } from 'lucide-react';
import AdSlot from './AdSlot';

interface GameAdLoaderProps {
  gameTitle: string;
  gameUrl: string;
  onClose: () => void;
}

const loaderVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    backdropFilter: "blur(0px)"
  },
  visible: {
    opacity: 1,
    scale: 1,
    backdropFilter: "blur(4px)",
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    backdropFilter: "blur(0px)",
    transition: {
      duration: 0.3
    }
  }
};

const contentVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const pixelVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const GameAdLoader: React.FC<GameAdLoaderProps> = ({ gameTitle, gameUrl, onClose }) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Open game in new tab after countdown
          window.open(gameUrl, '_blank');
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameUrl, onClose]);

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-50"
      variants={loaderVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div 
        className="text-center mb-8 max-w-md"
        variants={contentVariants}
      >
        <AdSlot size="banner" className="mx-auto mb-6" />
      </motion.div>
      
      <motion.div 
        className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-700/50 max-w-sm mx-auto text-center"
        variants={contentVariants}
      >
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
        >
          <div className="relative">
            <motion.div 
              className="bg-gradient-to-r from-blue-500 to-emerald-500 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center"
              variants={spinnerVariants}
              animate="animate"
            >
              <Gamepad2 className="w-10 h-10 text-white" />
            </motion.div>
            
            {/* Pixel loading dots */}
            <div className="flex justify-center space-x-2 mb-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-400 rounded-sm"
                  variants={pixelVariants}
                  animate="animate"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
          
          <motion.h2 
            className="text-xl sm:text-2xl font-bold text-white mb-2 font-orbitron"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Loading {gameTitle}
          </motion.h2>
          
          <motion.p 
            className="text-slate-400 font-vt323"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Game will open in {countdown} seconds...
          </motion.p>
        </motion.div>

        <motion.div 
          className="flex items-center justify-center space-x-3 text-slate-400 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Play className="w-4 h-4" />
          <motion.span 
            className="text-2xl font-bold text-blue-400 font-pixel"
            key={countdown}
            animate={{ 
              scale: [1, 1.2, 1],
              color: countdown <= 1 ? "#10b981" : "#3b82f6"
            }}
            transition={{ duration: 0.3 }}
          >
            {countdown}
          </motion.span>
        </motion.div>

        <motion.div 
          className="w-full bg-slate-700 rounded-full h-2 overflow-hidden"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((3 - countdown) / 3) * 100}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GameAdLoader;
