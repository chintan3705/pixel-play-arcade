
import React, { useState, useEffect, useCallback } from 'react';
import { Play, Clock } from 'lucide-react';
import AdSlot from './AdSlot';

interface GameLoaderProps {
  onLoadComplete: () => void;
  gameTitle: string;
}

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
          // Use setTimeout to avoid setState during render
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
      <div className="text-center mb-8">
        <div className="mb-6">
          <AdSlot size="banner" className="mx-auto" />
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 max-w-md mx-auto">
          <div className="mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center animate-pulse">
              <Play className="w-10 h-10 text-white fill-current" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Loading {gameTitle}
            </h2>
            <p className="text-slate-400">
              Your game will start in {countdown} seconds
            </p>
          </div>

          <div className="flex items-center justify-center space-x-2 text-slate-400">
            <Clock className="w-5 h-5" />
            <span className="text-3xl font-bold text-blue-400">{countdown}</span>
          </div>

          <div className="mt-6">
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLoader;
