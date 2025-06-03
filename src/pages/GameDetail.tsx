
import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Star, Users, Calendar, ArrowLeft, ExternalLink, Gamepad2, Monitor, Smartphone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';
import GameLoader from '@/components/GameLoader';
import AdSlot from '@/components/AdSlot';
import { getGameBySlug, games } from '@/data/games';
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

  const relatedGames = games
    .filter(g => g.id !== game.id && g.category === game.category)
    .slice(0, 4);

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

  // Add structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Game",
    "name": game.title,
    "description": game.description,
    "applicationCategory": game.category,
    "operatingSystem": "Browser",
    "url": `https://zappygames.com/games/${game.slug}`,
    "image": game.thumbnail,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": game.rating,
      "ratingCount": game.plays
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 left-10 w-32 h-32 bg-purple-500 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <Header />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-slate-400 hover:text-white mb-6 transition-colors font-orbitron"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Games</span>
        </button>

        {/* Top Banner Ad */}
        <div className="mb-8 flex justify-center">
          <AdSlot size="leaderboard" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Game Content */}
          <div className="lg:col-span-3">
            {/* Game Hero Section */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-slate-700/50 animate-slide-up">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <img 
                  src={game.thumbnail} 
                  alt={game.title}
                  className="w-full md:w-64 h-64 object-cover rounded-lg shadow-2xl"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-4xl font-bold text-white mb-3 font-orbitron">{game.title}</h1>
                      <span className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold font-orbitron">
                        {game.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-slate-400 mb-6">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-vt323">{game.rating} rating</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span className="font-vt323">{formatPlays(game.plays)} plays</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span className="font-vt323">HTML5</span>
                    </div>
                  </div>
                  
                  {!gameLoaded && (
                    <button
                      onClick={handlePlayGame}
                      className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25 font-orbitron text-lg"
                    >
                      🎮 PLAY NOW
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Game Description - SEO Rich Content */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-slate-700/50 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-2xl font-bold text-white mb-4 font-orbitron">About {game.title}</h2>
              <p className="text-slate-300 mb-6 leading-relaxed">
                {game.description} Experience the thrill of this amazing {game.category.toLowerCase()} game 
                that brings classic gaming to your browser. No downloads required - just pure gaming fun!
              </p>
              
              <h3 className="text-xl font-bold text-white mb-3 font-orbitron">Game Features</h3>
              <ul className="text-slate-300 space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <Monitor className="w-4 h-4 text-blue-400" />
                  <span>🖥️ Works on desktop and laptop computers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-green-400" />
                  <span>📱 Mobile-friendly responsive design</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Gamepad2 className="w-4 h-4 text-purple-400" />
                  <span>🎮 Intuitive controls and smooth gameplay</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>⚡ No downloads or installations needed</span>
                </li>
              </ul>

              <h3 className="text-xl font-bold text-white mb-3 font-orbitron">How to Play</h3>
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <p className="text-slate-300">
                  Simply click the "PLAY NOW" button above to start playing {game.title} instantly in your browser. 
                  The game will load in just a few seconds and you'll be ready to enjoy hours of entertainment!
                </p>
              </div>
            </div>

            {/* Mid-content Ad */}
            <div className="mb-8 flex justify-center">
              <AdSlot size="rectangle" />
            </div>

            {/* Game Tags */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-slate-700/50 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-lg font-bold text-white mb-4 font-orbitron">Game Tags</h3>
              <div className="flex flex-wrap gap-3">
                {game.tags.map(tag => (
                  <span key={tag} className="bg-gradient-to-r from-slate-700 to-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm font-vt323 border border-slate-600/50 hover:border-blue-500/50 transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Game Frame */}
            {gameLoaded && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 animate-bounce-in">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white font-orbitron">🎮 Now Playing: {game.title}</h2>
                  <a 
                    href={game.gameUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm font-orbitron"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open in new tab</span>
                  </a>
                </div>
                <div className="relative w-full" style={{ paddingBottom: '60%' }}>
                  <iframe
                    src={game.gameUrl}
                    className="absolute inset-0 w-full h-full rounded-lg border-2 border-slate-600"
                    frameBorder="0"
                    allowFullScreen
                    title={game.title}
                  />
                </div>
              </div>
            )}

            {/* Related Games */}
            {relatedGames.length > 0 && (
              <div className="mt-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-2xl font-bold text-white mb-6 font-orbitron">🎯 More {game.category} Games</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedGames.map((relatedGame, index) => (
                    <GameCard key={relatedGame.id} game={relatedGame} index={index} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Sidebar Ad */}
              <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <AdSlot size="rectangle" />
              </div>
              
              {/* Game Info */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <h3 className="text-lg font-bold text-white mb-4 font-orbitron">🎮 Game Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Category:</span>
                    <span className="text-white font-vt323">{game.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Rating:</span>
                    <span className="text-white font-vt323">{game.rating}/5 ⭐</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Plays:</span>
                    <span className="text-white font-vt323">{formatPlays(game.plays)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Platform:</span>
                    <span className="text-white font-vt323">HTML5 🌐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Ad */}
        <div className="mt-12 flex justify-center">
          <AdSlot size="leaderboard" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GameDetail;
