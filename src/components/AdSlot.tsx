
import React from 'react';

interface AdSlotProps {
  size: 'banner' | 'rectangle' | 'leaderboard' | 'sidebar';
  className?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({ size, className = '' }) => {
  const sizeConfig = {
    banner: { width: '728px', height: '90px', text: '728 x 90 Banner Ad' },
    rectangle: { width: '300px', height: '250px', text: '300 x 250 Rectangle Ad' },
    leaderboard: { width: '970px', height: '90px', text: '970 x 90 Leaderboard Ad' },
    sidebar: { width: '160px', height: '600px', text: '160 x 600 Sidebar Ad' }
  };

  const config = sizeConfig[size];

  return (
    <div 
      className={`bg-slate-800 border-2 border-dashed border-slate-600 flex items-center justify-center text-slate-400 text-sm font-medium ${className}`}
      style={{ width: config.width, height: config.height }}
    >
      <div className="text-center">
        <div className="mb-1">📢 Advertisement</div>
        <div className="text-xs opacity-70">{config.text}</div>
      </div>
    </div>
  );
};

export default AdSlot;
