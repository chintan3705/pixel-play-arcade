
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSlot from '@/components/AdSlot';
import { Gamepad2, Users, Zap, Heart, Shield, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <AdSlot size="leaderboard" className="mx-auto" />
          </div>
          
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-3 rounded-full">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">About ZappyGames</h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            We're passionate about bringing you the best free HTML5 games, playable instantly in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Our Story */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
              <div className="text-slate-300 space-y-4">
                <p>
                  ZappyGames was born from a simple idea: gaming should be accessible to everyone, everywhere. 
                  No downloads, no installations, no barriers between you and fun.
                </p>
                <p>
                  In a world where games often require hefty downloads and expensive hardware, we believe in 
                  the power of HTML5 technology to deliver amazing gaming experiences right in your browser. 
                  Whether you're on a break at work, waiting for the bus, or relaxing at home, your next 
                  gaming adventure is just a click away.
                </p>
                <p>
                  Our carefully curated collection spans multiple genres, ensuring there's something for 
                  every type of gamer. From puzzle enthusiasts to action seekers, casual players to 
                  competitive gamers – we've got you covered.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Why Choose ZappyGames?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <Zap className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">Instant Play</h3>
                    <p className="text-slate-400 text-sm">
                      No downloads or installations required. Click and play instantly.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">100% Safe</h3>
                    <p className="text-slate-400 text-sm">
                      All our games are thoroughly tested and completely safe to play.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Globe className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">Cross-Platform</h3>
                    <p className="text-slate-400 text-sm">
                      Play on any device - desktop, tablet, or mobile.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Heart className="w-6 h-6 text-red-400 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">Always Free</h3>
                    <p className="text-slate-400 text-sm">
                      Enjoy unlimited gaming without any subscription fees.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-slate-300">
                To democratize gaming by providing a platform where anyone can discover, play, and enjoy 
                high-quality games without barriers. We believe gaming is a universal language that brings 
                people together, sparks creativity, and provides endless entertainment.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AdSlot size="rectangle" />
            
            {/* Stats */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-bold text-white mb-4">By the Numbers</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">10+</div>
                  <div className="text-slate-400 text-sm">Games Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">1M+</div>
                  <div className="text-slate-400 text-sm">Games Played</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">5</div>
                  <div className="text-slate-400 text-sm">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">100%</div>
                  <div className="text-slate-400 text-sm">Free to Play</div>
                </div>
              </div>
            </div>

            {/* Team */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-bold text-white mb-4">Our Team</h3>
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-blue-400" />
                <span className="text-white">Passionate Gamers</span>
              </div>
              <p className="text-slate-400 text-sm">
                We're a small but dedicated team of gaming enthusiasts who understand what makes a great gaming experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
