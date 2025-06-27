import React from 'react';
import { Sparkles } from 'lucide-react'; // Use Lucide icon for a modern look

interface NumberBoxProps {
  number: number;
  direction: 'vertical' | 'horizontal';
}

const NumberBox: React.FC<NumberBoxProps> = ({ number, direction }) => {
  return (
    <div
      className={`relative flex items-center justify-center rounded-2xl shadow-xl border border-white/30 bg-white/20 backdrop-blur-md text-6xl font-extrabold m-8 transition-all duration-500 hover:scale-105 glass-card
        ${direction === 'vertical' ? 'h-[30vh] w-full' : 'h-[40vh] w-[40vh] min-w-[40vh]'}
      `}
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
    >
      <span className="flex items-center gap-2 text-blue-900 drop-shadow-lg">
        <Sparkles className="w-8 h-8 text-purple-400/80" />
        {number}
      </span>
    </div>
  );
};

export default NumberBox;

// Tailwind CSS animation (add to globals.css or tailwind.config.js):
// .animate-fade-in { animation: fadeIn 0.5s ease; }
// @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
