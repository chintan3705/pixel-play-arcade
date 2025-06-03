
import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Heart } from 'lucide-react';
import AdSlot from './AdSlot';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      {/* Footer Ad */}
      <div className="container mx-auto px-4 py-6 flex justify-center">
        <AdSlot size="leaderboard" />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-2 rounded-lg">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                ZappyGames
              </span>
            </Link>
            <p className="text-slate-400 mb-4 max-w-md">
              Your ultimate destination for free HTML5 browser games. Play instantly without downloads!
            </p>
            <div className="flex items-center text-slate-400 text-sm">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by ZappyGames Team
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-400 hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/categories" className="text-slate-400 hover:text-blue-400 transition-colors">Categories</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Game Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/categories/puzzle" className="text-slate-400 hover:text-blue-400 transition-colors">Puzzle</Link></li>
              <li><Link to="/categories/arcade" className="text-slate-400 hover:text-blue-400 transition-colors">Arcade</Link></li>
              <li><Link to="/categories/strategy" className="text-slate-400 hover:text-blue-400 transition-colors">Strategy</Link></li>
              <li><Link to="/categories/adventure" className="text-slate-400 hover:text-blue-400 transition-colors">Adventure</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2024 ZappyGames. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
