
import React from 'react';
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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
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
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.1,
    backgroundColor: "rgba(51, 65, 85, 0.7)",
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.95
  }
};

const CategoryCarousel = () => {
  const scrollContainer = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = 200;
      scrollContainer.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div 
      className="relative mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-white font-orbitron">Browse Categories</h2>
        <div className="flex space-x-2">
          <motion.button
            onClick={() => scroll('left')}
            className="bg-slate-800/50 hover:bg-slate-700/50 text-white p-2 rounded-full transition-colors"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={() => scroll('right')}
            className="bg-slate-800/50 hover:bg-slate-700/50 text-white p-2 rounded-full transition-colors"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
      
      <motion.div
        ref={scrollContainer}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.slug ? `/categories?filter=${category.slug}` : '/categories'}
            className="flex-shrink-0 group"
          >
            <motion.div
              className={`
                bg-gradient-to-r ${category.color} p-4 rounded-xl 
                min-w-[140px] text-center shadow-lg hover:shadow-xl
              `}
              variants={categoryVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="text-3xl mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
              >
                {category.icon}
              </motion.div>
              <div className="text-white font-semibold font-orbitron text-sm">
                {category.name}
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CategoryCarousel;
