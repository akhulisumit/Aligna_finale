// components/common/SectionTitle.jsx
import React from 'react';

const SectionTitle = ({ 
  title, 
  subtitle, 
  highlight, 
  centered = true,
  className = '' 
}) => {
  return (
    <div className={`${centered ? 'text-center' : ''} space-y-6 mb-20 ${className}`}>
      <h2 className="text-4xl md:text-5xl font-black text-gray-900 text-shadow">
        {title}
        {highlight && (
          <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
