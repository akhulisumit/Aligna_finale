// components/hero/HeroContent.jsx
import React from 'react';
import { ArrowRight, Play, Check, Sparkles } from 'lucide-react';
import Button from '../common/Button';

const HeroContent = () => {
  const stats = [
    { value: '5 min', label: 'Setup Time' },
    { value: '99.9%', label: 'Accuracy' },
    { value: '24/7', label: 'Available' }
  ];

  const benefits = [
    'No credit card required',
    '14-day free trial',
    'Cancel anytime'
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-semibold rounded-full border border-blue-200">
          <Sparkles className="w-4 h-4 mr-2" />
          #1 AI-Powered Customer Support Platform
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight text-shadow">
          Transform Your
          <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            PDFs Into Smart
          </span>
          <span className="block">AI Chatbots</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
          Upload your documents and create an intelligent AI assistant that provides instant, accurate answers to your customers. 
          <span className="text-blue-600 font-semibold"> No coding required, setup in minutes.</span>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <Button 
          size="lg" 
          to="/signup"
          icon={<ArrowRight className="w-6 h-6" />}
        >
          Start Building Free
        </Button>
        
        <Button 
          variant="secondary" 
          size="lg"
          icon={<Play className="w-6 h-6" />}
        >
          Watch Demo
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-8 pt-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-black text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-8 text-sm text-gray-500">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-2" />
            <span className="font-medium">{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroContent;
