
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Clock, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';
import CategoryCarousel from '@/components/CategoryCarousel';
import AdSlot from '@/components/AdSlot';
import { games, getFeaturedGames } from '@/data/games';
import { useRecentlyPlayed } from '@/hooks/useRecentlyPlayed';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const heroVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const gameGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Index = () => {
  const featuredGames = getFeaturedGames();
  const trendingGames = games.slice().sort((a, b) => b.plays - a.plays).slice(0, 6);
  const { recentGames } = useRecentlyPlayed();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-20 w-24 h-24 bg-purple-500 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/4 w-40 h-40 bg-emerald-500 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <Header />
      
      {/* Hero Section */}
      <motion.section 
        className="container mx-auto px-4 py-12 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-center mb-12"
          variants={heroVariants}
        >
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <AdSlot size="leaderboard" className="mx-auto" />
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent font-orbitron">
              Epic Browser Games
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto font-vt323"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            🎮 No Downloads • 🚀 Instant Fun • 💯 Totally Free
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
          >
            <Link 
              to="/categories"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25 font-orbitron"
            >
              <Sparkles className="w-5 h-5" />
              <span>Start Playing Now</span>
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Category Carousel */}
        <motion.div
          variants={sectionVariants}
        >
          <CategoryCarousel />
        </motion.div>
      </motion.section>

      {/* Recently Played */}
      {recentGames.length > 0 && (
        <motion.section 
          className="container mx-auto px-4 mb-16 relative z-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div 
            className="flex items-center space-x-3 mb-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Clock className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white font-orbitron">Recently Played</h2>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={gameGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {recentGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </motion.div>
        </motion.section>
      )}

      {/* Featured Games */}
      <motion.section 
        className="container mx-auto px-4 mb-16 relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="flex items-center space-x-3 mb-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Star className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white font-orbitron">⭐ Featured Games</h2>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={gameGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featuredGames.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </motion.div>
      </motion.section>

      {/* Mid-content Ad */}
      <motion.section 
        className="container mx-auto px-4 mb-16 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center">
          <AdSlot size="banner" />
        </div>
      </motion.section>

      {/* Trending Games */}
      <motion.section 
        className="container mx-auto px-4 mb-16 relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="flex items-center space-x-3 mb-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          <h2 className="text-2xl font-bold text-white font-orbitron">🔥 Trending Now</h2>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={gameGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {trendingGames.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </motion.div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Index;
