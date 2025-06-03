
import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Star, Users, Calendar, ArrowLeft, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GameLoader from '@/components/GameLoader';
import AdSlot from '@/components/AdSlot';
import { getGameBySlug } from '@/data/games';
import { useRecentlyPlayed } from '@/hooks/useRecentlyPlayed';

const GameDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [gameLoaded, setGameLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const { addToRecentlyPlayed } = useRecentlyPlayed();

  const game = slug ? getGameBySlug(slug) : null;

  if (!game) {
    return <Navigate to="/" replace />;
  }

  const handlePlayGame = () => {
    addToRecentlyPlayed(game);
    setShowLoader(true);
  };

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setGameLoaded(true);
  };

  const formatPlays = (plays: number) => {
    if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
    if (plays >= 1000) return `${(plays / 1000).toFixed(1)}K`;
    return plays.toString();
  };

  if (showLoader) {
    return <GameLoader onLoadComplete={handleLoaderComplete} gameTitle={game.title} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Games</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Game Content */}
          <div className="lg:col-span-3">
            {/* Game Header */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-slate-700/50">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <img 
                  src={game.thumbnail} 
                  alt={game.title}
                  className="w-full md:w-48 h-48 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">{game.title}</h1>
                      <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {game.category}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 mb-4">{game.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-slate-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{game.rating} rating</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{formatPlays(game.plays)} plays</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>HTML5</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.tags.map(tag => (
                      <span key={tag} className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {!gameLoaded && (
                    <button
                      onClick={handlePlayGame}
                      className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                    >
                      Play Now
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Game Frame */}
            {gameLoaded && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Now Playing: {game.title}</h2>
                  <a 
                    href={game.gameUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open in new tab</span>
                  </a>
                </div>
                <div className="relative w-full" style={{ paddingBottom: '60%' }}>
                  <iframe
                    src={game.gameUrl}
                    className="absolute inset-0 w-full h-full rounded-lg border border-slate-600"
                    frameBorder="0"
                    allowFullScreen
                    title={game.title}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Sidebar Ad */}
              <AdSlot size="rectangle" />
              
              {/* Game Info */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-lg font-bold text-white mb-4">Game Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Category:</span>
                    <span className="text-white">{game.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Rating:</span>
                    <span className="text-white">{game.rating}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Plays:</span>
                    <span className="text-white">{formatPlays(game.plays)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Platform:</span>
                    <span className="text-white">HTML5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GameDetail;
