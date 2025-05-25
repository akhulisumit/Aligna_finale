// components/features/FeatureCard.jsx
import React from 'react';

const FeatureCard = ({ icon, title, description, gradient, delay = "0" }) => {
  return (
    <div 
      className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl hover:from-white hover:to-gray-50 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed text-lg">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
