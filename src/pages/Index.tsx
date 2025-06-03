
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Clock, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';
import AdSlot from '@/components/AdSlot';
import { games, getFeaturedGames } from '@/data/games';
import { useRecentlyPlayed } from '@/hooks/useRecentlyPlayed';

const Index = () => {
  const featuredGames = getFeaturedGames();
  const trendingGames = games.slice().sort((a, b) => b.plays - a.plays).slice(0, 6);
  const { recentGames } = useRecentlyPlayed();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="mb-6">
            <AdSlot size="leaderboard" className="mx-auto" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Play Free HTML5 Games
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Discover thousands of amazing browser games. No downloads, no waiting - just instant fun!
          </p>
          <Link 
            to="/categories"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
          >
            <Sparkles className="w-5 h-5" />
            <span>Browse All Games</span>
          </Link>
        </div>
      </section>

      {/* Recently Played */}
      {recentGames.length > 0 && (
        <section className="container mx-auto px-4 mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <Clock className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Recently Played</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Games */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex items-center space-x-3 mb-8">
          <Star className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white">Featured Games</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Trending Games */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex items-center space-x-3 mb-8">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          <h2 className="text-2xl font-bold text-white">Trending Now</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trendingGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
