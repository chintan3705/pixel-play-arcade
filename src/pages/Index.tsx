
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Clock, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';
import CategoryCarousel from '@/components/CategoryCarousel';
import AdSlot from '@/components/AdSlot';
import { games, getFeaturedGames } from '@/data/games';
import { useRecentlyPlayed } from '@/hooks/useRecentlyPlayed';

const Index = () => {
  const featuredGames = getFeaturedGames();
  const trendingGames = games.slice().sort((a, b) => b.plays - a.plays).slice(0, 6);
  const { recentGames } = useRecentlyPlayed();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-purple-500 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-emerald-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <div className="mb-6">
            <AdSlot size="leaderboard" className="mx-auto" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-bounce-in">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent font-orbitron">
              Epic Browser Games
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto font-vt323 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            🎮 No Downloads • 🚀 Instant Fun • 💯 Totally Free
          </p>
          <Link 
            to="/categories"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25 font-orbitron animate-bounce-in"
            style={{ animationDelay: '0.4s' }}
          >
            <Sparkles className="w-5 h-5" />
            <span>Start Playing Now</span>
          </Link>
        </div>
        
        {/* Category Carousel */}
        <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <CategoryCarousel />
        </div>
      </section>

      {/* Recently Played */}
      {recentGames.length > 0 && (
        <section className="container mx-auto px-4 mb-16 relative z-10">
          <div className="flex items-center space-x-3 mb-8">
            <Clock className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white font-orbitron">Recently Played</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Games */}
      <section className="container mx-auto px-4 mb-16 relative z-10">
        <div className="flex items-center space-x-3 mb-8">
          <Star className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white font-orbitron">⭐ Featured Games</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredGames.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </div>
      </section>

      {/* Mid-content Ad */}
      <section className="container mx-auto px-4 mb-16 relative z-10">
        <div className="flex justify-center">
          <AdSlot size="banner" />
        </div>
      </section>

      {/* Trending Games */}
      <section className="container mx-auto px-4 mb-16 relative z-10">
        <div className="flex items-center space-x-3 mb-8">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          <h2 className="text-2xl font-bold text-white font-orbitron">🔥 Trending Now</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trendingGames.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
