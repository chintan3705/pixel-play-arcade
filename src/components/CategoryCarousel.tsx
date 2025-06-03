
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  { name: 'All', icon: '🎮', color: 'from-purple-500 to-pink-500', slug: '' },
  { name: 'Puzzle', icon: '🧩', color: 'from-blue-500 to-cyan-500', slug: 'puzzle' },
  { name: 'Arcade', icon: '🚀', color: 'from-red-500 to-orange-500', slug: 'arcade' },
  { name: 'Strategy', icon: '♟️', color: 'from-green-500 to-emerald-500', slug: 'strategy' },
  { name: 'Adventure', icon: '🗺️', color: 'from-yellow-500 to-amber-500', slug: 'adventure' },
  { name: 'Shooter', icon: '🎯', color: 'from-indigo-500 to-purple-500', slug: 'shooter' },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const categoryVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.8
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

const hoverVariants = {
  hover: {
    scale: 1.05,
    y: -3,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 400
    }
  },
  tap: {
    scale: 0.98
  }
};

const buttonVariants = {
  hover: {
    scale: 1.1,
    backgroundColor: "rgba(51, 65, 85, 0.8)",
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 400
    }
  },
  tap: {
    scale: 0.95
  }
};

const CategoryCarousel = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = 200;
      const container = scrollContainer.current;
      
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div 
      className="relative mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-white font-orbitron">Browse Categories</h2>
        <div className="flex space-x-2">
          <motion.button
            onClick={() => scroll('left')}
            className="bg-slate-800/50 hover:bg-slate-700/50 text-white p-2 rounded-full transition-colors backdrop-blur-sm border border-slate-700/50"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
          <motion.button
            onClick={() => scroll('right')}
            className="bg-slate-800/50 hover:bg-slate-700/50 text-white p-2 rounded-full transition-colors backdrop-blur-sm border border-slate-700/50"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>
      </motion.div>
      
      <div
        ref={scrollContainer}
        className="flex space-x-3 sm:space-x-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory scroll-smooth"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {categories.map((category, index) => (
          <Link
            key={category.name}
            to={category.slug ? `/categories?filter=${category.slug}` : '/categories'}
            className="flex-shrink-0 group snap-start"
          >
            <motion.div
              className={`
                bg-gradient-to-r ${category.color} p-3 sm:p-4 rounded-xl 
                min-w-[120px] sm:min-w-[140px] text-center shadow-lg 
                hover:shadow-xl hover:shadow-current/20 backdrop-blur-sm
                border border-white/10
              `}
              variants={categoryVariants}
              whileHover="hover"
              whileTap="tap"
              custom={index}
            >
              <motion.div 
                className="text-2xl sm:text-3xl mb-2"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: index * 0.1 + 0.3, 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20 
                }}
              >
                {category.icon}
              </motion.div>
              <motion.div 
                className="text-white font-semibold font-orbitron text-xs sm:text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
              >
                {category.name}
              </motion.div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoryCarousel;
