// components/hero/ChatbotDemo.jsx
import React from 'react';
import { Bot, ArrowRight, MessageCircle, Zap, Star } from 'lucide-react';

const ChatbotDemo = () => {
  const messages = [
    {
      type: 'bot',
      content: "👋 Hi! I'm your AI assistant. How can I help you today?",
      time: 'Just now'
    },
    {
      type: 'user',
      content: 'What are your business hours and return policy?',
      time: 'Typing...'
    },
    {
      type: 'bot',
      content: "We're open Monday-Friday 9AM-6PM EST. We offer a 30-day money-back guarantee on all products. You can initiate returns through your account dashboard or contact our support team.",
      time: '2 seconds ago'
    }
  ];

  return (
    <div className="relative">
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 animate-float">
        <div className="space-y-6">
          {/* Browser Header */}
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2">
              <div className="text-xs text-gray-500 font-mono">chatbot.yoursite.com</div>
            </div>
          </div>
          
          {/* Messages */}
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-4 ml-8 border-l-4 border-blue-700' 
                    : 'bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl p-4 border-l-4 border-green-500'
                }`}
              >
                {message.type === 'bot' && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 font-medium">{message.content}</p>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                  </div>
                )}
                {message.type === 'user' && (
                  <>
                    <p className="text-sm font-medium">{message.content}</p>
                    <span className="text-xs text-blue-200">{message.time}</span>
                  </>
                )}
              </div>
            ))}
          </div>
          
          {/* Input */}
          <div className="flex items-center space-x-2 pt-4">
            <input 
              type="text" 
              placeholder="Ask me anything..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute -top-6 -right-6 bg-gradient-to-br from-green-500 to-teal-600 text-white p-4 rounded-2xl shadow-xl animate-pulse">
        <MessageCircle className="w-8 h-8" />
      </div>
      <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-purple-500 to-pink-600 text-white p-4 rounded-2xl shadow-xl animate-pulse">
        <Zap className="w-8 h-8" />
      </div>
      <div className="absolute top-1/2 -right-12 bg-gradient-to-br from-orange-500 to-red-600 text-white p-3 rounded-xl shadow-lg animate-bounce">
        <Star className="w-6 h-6" />
      </div>
    </div>
  );
};

export default ChatbotDemo;
