
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  { name: 'All', icon: '🎮', color: 'from-purple-500 to-pink-500', slug: '' },
  { name: 'Puzzle', icon: '🧩', color: 'from-blue-500 to-cyan-500', slug: 'puzzle' },
  { name: 'Arcade', icon: '🚀', color: 'from-red-500 to-orange-500', slug: 'arcade' },
  { name: 'Strategy', icon: '♟️', color: 'from-green-500 to-emerald-500', slug: 'strategy' },
  { name: 'Adventure', icon: '🗺️', color: 'from-yellow-500 to-amber-500', slug: 'adventure' },
  { name: 'Shooter', icon: '🎯', color: 'from-indigo-500 to-purple-500', slug: 'shooter' },
];

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
    <div className="relative mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white font-orbitron">Browse Categories</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            className="bg-slate-800/50 hover:bg-slate-700/50 text-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="bg-slate-800/50 hover:bg-slate-700/50 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div
        ref={scrollContainer}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category, index) => (
          <Link
            key={category.name}
            to={category.slug ? `/categories?filter=${category.slug}` : '/categories'}
            className="flex-shrink-0 group"
          >
            <div
              className={`
                bg-gradient-to-r ${category.color} p-4 rounded-xl 
                min-w-[140px] text-center hover:scale-105 transition-all duration-300
                shadow-lg hover:shadow-xl hover:animate-glow
                animate-slide-up
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="text-white font-semibold font-orbitron text-sm">
                {category.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
