// components/navigation/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Logo = ({ size = 'default' }) => {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-lg', subtitle: 'text-xs' },
    default: { icon: 'w-12 h-12', text: 'text-2xl', subtitle: 'text-xs' }
  };
  
  const currentSize = sizes[size];
  
  return (
    <Link to="/" className="flex items-center space-x-3 group">
      <div className={`${currentSize.icon} bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
        <Sparkles className="w-7 h-7 text-white" />
      </div>
      <div className="flex flex-col">
        <span className={`${currentSize.text} font-bold text-gray-900 tracking-tight`}>
          ChatBot AI
        </span>
        <span className={`${currentSize.subtitle} text-gray-500 font-medium tracking-wider`}>
          INTELLIGENT AUTOMATION
        </span>
      </div>
    </Link>
  );
};

export default Logo;
