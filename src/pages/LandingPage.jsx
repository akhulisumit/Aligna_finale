// pages/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageCircle, 
  Zap, 
  Shield, 
  Clock, 
  Users, 
  Star,
  Check,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Play,
  FileText,
  Bot,
  Sparkles,
  Globe,
  BarChart3,
  HeadphonesIcon,
  ShoppingCart,
  GraduationCap,
  Building,
  Upload,
  Smartphone,
  Code,
  TrendingUp,
  Award,
  Lightbulb,
  Target,
  Rocket,
  Heart,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Facebook,
  Instagram
} from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Lightning Fast Setup",
      description: "Get your AI chatbot up and running in under 5 minutes. Just upload your PDF and we'll handle the rest with our advanced processing.",
      gradient: "from-amber-400 via-orange-500 to-red-500",
      delay: "0"
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Enterprise Security",
      description: "Bank-level encryption and security. Your data is protected with SOC 2 compliance and never shared with third parties.",
      gradient: "from-emerald-400 via-teal-500 to-blue-500",
      delay: "100"
    },
    {
      icon: <Bot className="w-7 h-7" />,
      title: "Advanced AI Brain",
      description: "Powered by GPT-4 with contextual understanding. Provides accurate, human-like responses from your documents.",
      gradient: "from-purple-400 via-violet-500 to-pink-500",
      delay: "200"
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: "Universal Integration",
      description: "One-click embed on any platform. Works seamlessly with WordPress, Shopify, React, and 50+ platforms.",
      gradient: "from-blue-400 via-cyan-500 to-teal-500",
      delay: "300"
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: "Smart Analytics",
      description: "Real-time insights and performance metrics. Track user satisfaction, popular queries, and conversion rates.",
      gradient: "from-indigo-400 via-purple-500 to-pink-500",
      delay: "400"
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "Always Available",
      description: "24/7 instant support for your customers. Never miss a query with our reliable cloud infrastructure.",
      gradient: "from-rose-400 via-pink-500 to-purple-500",
      delay: "500"
    }
  ];

  const useCases = [
    {
      icon: <HeadphonesIcon className="w-10 h-10" />,
      title: "Customer Support",
      description: "Automate 80% of support queries and reduce response time from hours to seconds",
      gradient: "from-blue-500 to-blue-600",
      stats: "80% faster response",
      metric: "Response Time",
      before: "2.5 hours",
      after: "30 seconds"
    },
    {
      icon: <ShoppingCart className="w-10 h-10" />,
      title: "E-commerce",
      description: "Boost sales with instant product recommendations and shopping assistance",
      gradient: "from-green-500 to-green-600",
      stats: "35% more conversions",
      metric: "Conversion Rate",
      before: "2.3%",
      after: "3.1%"
    },
    {
      icon: <GraduationCap className="w-10 h-10" />,
      title: "Education",
      description: "Create interactive learning experiences with AI tutors and course assistants",
      gradient: "from-purple-500 to-purple-600",
      stats: "90% student satisfaction",
      metric: "Student Engagement",
      before: "65%",
      after: "90%"
    },
    {
      icon: <Building className="w-10 h-10" />,
      title: "Enterprise",
      description: "Scale internal knowledge sharing and reduce training costs significantly",
      gradient: "from-orange-500 to-orange-600",
      stats: "60% cost reduction",
      metric: "Training Costs",
      before: "$50K/month",
      after: "$20K/month"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Customer Success Manager",
      company: "TechCorp Inc.",
      content: "This platform completely transformed our customer support operations. We reduced response time by 80% and our customer satisfaction scores went through the roof. The setup was incredibly intuitive and the results were immediate.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
      companyLogo: "🚀",
      improvement: "+80% faster responses"
    },
    {
      name: "Michael Chen",
      role: "Founder & CEO",
      company: "StartupXYZ",
      content: "As a bootstrapped startup, we couldn't afford 24/7 support staff. This AI chatbot solved that problem perfectly while maintaining quality. Our customers get instant, accurate answers and we save $8K monthly on support costs.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
      companyLogo: "💡",
      improvement: "$8K monthly savings"
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Director",
      company: "RetailPlus",
      content: "The setup was remarkably simple - we had our chatbot running in under 10 minutes. Our sales increased by 25% in the first month as customers got instant product information. It's like having a sales assistant that never sleeps.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
      companyLogo: "🛍️",
      improvement: "+25% sales increase"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Upload Your PDF",
      description: "Simply drag and drop your documents. Our AI processes them in minutes.",
      icon: <Upload className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "02", 
      title: "AI Training",
      description: "Our advanced AI learns from your content and creates a smart knowledge base.",
      icon: <Bot className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "03",
      title: "Deploy & Embed",
      description: "Get your embed code and add the chatbot to your website instantly.",
      icon: <Code className="w-8 h-8" />,
      color: "from-green-500 to-teal-500"
    }
  ];

  const faqs = [
    {
      question: "How does the AI chatbot actually work?",
      answer: "Our AI uses advanced natural language processing to understand and learn from your PDF documents. When a user asks a question, the AI searches through the trained knowledge base and provides accurate, contextual answers. It's like having a super-smart assistant that has read and memorized all your documents."
    },
    {
      question: "What file formats and sizes are supported?",
      answer: "Currently, we support PDF files up to 10MB in size. We're actively working on adding support for Word documents, PowerPoint presentations, text files, and web pages. You can upload multiple PDFs to create a comprehensive knowledge base for your chatbot."
    },
    {
      question: "How long does the training process take?",
      answer: "Training typically takes 2-5 minutes depending on your PDF size and complexity. You'll see real-time progress updates in your dashboard. Once training is complete, your chatbot is immediately ready to handle customer queries with intelligent responses."
    },
    {
      question: "Can I customize the chatbot's appearance and behavior?",
      answer: "Absolutely! You can customize colors, fonts, messages, positioning, and branding to match your website perfectly. Pro and Enterprise plans include advanced customization options like custom CSS, conversation flows, and white-label solutions."
    },
    {
      question: "Is there really a free trial with no strings attached?",
      answer: "Yes! We offer a complete 14-day free trial with full access to all features. No credit card required, no hidden fees. You can create up to 3 chatbots and handle 500 conversations. Cancel anytime or upgrade when you're ready."
    },
    {
      question: "How easy is it to embed the chatbot on my website?",
      answer: "Super easy! After training, you get a simple code snippet that works with any website platform - WordPress, Shopify, Wix, React, or custom HTML. Just copy, paste, and your chatbot is live. The whole process takes under 2 minutes."
    },
    {
      question: "What languages and regions are supported?",
      answer: "Our AI chatbots support 50+ languages including English, Spanish, French, German, Chinese, Japanese, and more. The AI automatically detects the user's language and responds accordingly. We have global data centers for fast response times worldwide."
    },
    {
      question: "How secure is my data and my customers' conversations?",
      answer: "Security is our top priority. We use bank-level encryption, SOC 2 compliance, and GDPR-compliant data handling. Your documents and conversations are encrypted at rest and in transit. We never use your data to train other models or share it with third parties."
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for trying out the platform",
      features: [
        "1 Chatbot",
        "500 conversations/month",
        "Basic analytics",
        "Email support",
        "Standard customization",
        "Community access"
      ],
      cta: "Get Started Free",
      popular: false,
      gradient: "from-gray-50 to-gray-100"
    },
    {
      name: "Professional",
      price: "$29",
      period: "per month",
      description: "Best for growing businesses",
      features: [
        "5 Chatbots",
        "5,000 conversations/month",
        "Advanced analytics",
        "Priority support",
        "Custom branding",
        "API access",
        "Integrations",
        "A/B testing"
      ],
      cta: "Start Free Trial",
      popular: true,
      gradient: "from-blue-50 to-indigo-100"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations",
      features: [
        "Unlimited chatbots",
        "Unlimited conversations",
        "White-label solution",
        "Dedicated support",
        "Custom integrations",
        "SLA guarantee",
        "Advanced security",
        "Training & onboarding"
      ],
      cta: "Contact Sales",
      popular: false,
      gradient: "from-purple-50 to-pink-100"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Chatbots", icon: <Bot className="w-6 h-6" /> },
    { number: "2M+", label: "Conversations", icon: <MessageCircle className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime", icon: <Zap className="w-6 h-6" /> },
    { number: "150+", label: "Countries", icon: <Globe className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Custom Font Import */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');
          
          .font-inter { font-family: 'Inter', sans-serif; }
          .font-mono { font-family: 'JetBrains Mono', monospace; }
          
          .gradient-text {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .hero-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          
          .glass-effect {
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .animate-pulse-slow {
            animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          .text-shadow {
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
        `}
      </style>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-effect shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900 tracking-tight">ChatBot AI</span>
                <span className="text-xs text-gray-500 font-medium tracking-wider">INTELLIGENT AUTOMATION</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#use-cases" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                Use Cases
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#faq" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                FAQ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link 
                to="/login"
                className="text-gray-700 hover:text-gray-900 font-semibold transition-colors duration-200 px-4 py-2 rounded-xl hover:bg-gray-100"
              >
                Sign In
              </Link>
              <Link 
                to="/signup"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get Started Free
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-6 border-t border-gray-100 glass-effect">
              <div className="flex flex-col space-y-6">
                <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium text-lg">Features</a>
                <a href="#use-cases" className="text-gray-700 hover:text-blue-600 font-medium text-lg">Use Cases</a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium text-lg">Pricing</a>
                <a href="#faq" className="text-gray-700 hover:text-blue-600 font-medium text-lg">FAQ</a>
                <div className="pt-6 border-t border-gray-200 space-y-4">
                  <Link 
                    to="/login"
                    className="block w-full text-center text-gray-700 hover:text-gray-900 font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup"
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-center"
                  >
                    Get Started Free
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
                <Link 
                  to="/signup"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-2xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl"
                >
                  Start Building Free
                  <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <button className="group inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 text-lg font-bold rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                  <Play className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-black text-gray-900">5 min</div>
                  <div className="text-sm text-gray-600 font-medium">Setup Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-gray-900">99.9%</div>
                  <div className="text-sm text-gray-600 font-medium">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600 font-medium">Available</div>
                </div>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span className="font-medium">No credit card required</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span className="font-medium">14-day free trial</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span className="font-medium">Cancel anytime</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 animate-float">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2">
                      <div className="text-xs text-gray-500 font-mono">chatbot.yoursite.com</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl p-4 border-l-4 border-blue-500">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 font-medium">👋 Hi! I'm your AI assistant. How can I help you today?</p>
                          <span className="text-xs text-gray-500">Just now</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-4 ml-8 border-l-4 border-blue-700">
                      <p className="text-sm font-medium">What are your business hours and return policy?</p>
                      <span className="text-xs text-blue-200">Typing...</span>
                    </div>
                    
                    <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl p-4 border-l-4 border-green-500">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 font-medium">We're open Monday-Friday 9AM-6PM EST. We offer a 30-day money-back guarantee on all products. You can initiate returns through your account dashboard or contact our support team.</p>
                          <span className="text-xs text-gray-500">2 seconds ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
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
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-4 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
                  <div className="text-blue-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-black text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 text-shadow">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Get your AI chatbot up and running in three simple steps. No technical expertise required.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`relative group ${currentStep === index ? 'scale-105' : ''} transition-all duration-500`}
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-300">
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg`}>
                    {step.icon}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-6xl font-black text-gray-200">{step.number}</span>
                      <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 text-shadow">
              Powerful Features for
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Modern Businesses
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
              Everything you need to create, deploy, and manage AI chatbots that actually help your customers and grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl hover:from-white hover:to-gray-50 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200"
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 text-shadow">
              Perfect for Every Industry
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
              From startups to Fortune 500 companies, our AI chatbots adapt to your specific needs and industry requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2">
                <div className={`w-20 h-20 ${useCase.gradient} text-white rounded-3xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {useCase.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {useCase.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {useCase.description}
                </p>
                
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-4 border border-green-200">
                  <div className="text-sm font-semibold text-green-800 mb-1">{useCase.metric}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-600">
                      <span className="line-through">{useCase.before}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-green-600" />
                    <div className="text-sm font-bold text-green-700">
                      {useCase.after}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 text-shadow">
              Loved by Thousands of
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Happy Customers
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              See what our customers have to say about their transformation.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-12 shadow-2xl border border-gray-100">
              <div className="text-center space-y-8">
                <div className="flex justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-2xl md:text-3xl text-gray-900 font-bold leading-relaxed text-shadow">
                  "{testimonials[activeTestimonial].content}"
                </blockquote>
                
                <div className="flex items-center justify-center space-x-6">
                  <img 
                    src={testimonials[activeTestimonial].avatar} 
                    alt={testimonials[activeTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover shadow-lg border-4 border-white"
                  />
                  <div className="text-left">
                    <p className="text-xl font-bold text-gray-900">{testimonials[activeTestimonial].name}</p>
                    <p className="text-gray-600 font-medium">{testimonials[activeTestimonial].role}</p>
                    <p className="text-blue-600 font-semibold">{testimonials[activeTestimonial].company}</p>
                  </div>
                  <div className="text-4xl">{testimonials[activeTestimonial].companyLogo}</div>
                </div>
                
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {testimonials[activeTestimonial].improvement}
                </div>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center space-x-3 mt-10">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === activeTestimonial 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 text-shadow">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Choose the plan that fits your business needs. Upgrade or downgrade anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-3xl p-10 shadow-xl border-2 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 ${
                plan.popular 
                  ? 'border-blue-600 scale-105 bg-gradient-to-br from-blue-50 to-purple-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                      🔥 Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  
                  <div className="space-y-2">
                    <div className="text-5xl font-black text-gray-900">
                      {plan.price}
                      {plan.price !== 'Free' && plan.price !== 'Custom' && (
                        <span className="text-xl text-gray-500 font-medium">/{plan.period}</span>
                      )}
                    </div>
                    <p className="text-gray-600 font-medium">{plan.description}</p>
                  </div>
                </div>

                <ul className="space-y-4 my-10">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.cta === 'Contact Sales' ? '#contact' : '/signup'}
                  className={`block w-full py-4 px-8 rounded-2xl font-bold text-center transition-all duration-300 transform hover:scale-105 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-600 font-medium mb-6">
              All plans include our core features with no hidden fees
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-500" />
                SSL Security
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-500" />
                24/7 Support
              </div>
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2 text-purple-500" />
                Global CDN
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-2 text-orange-500" />
                99.9% Uptime SLA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 text-shadow">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Everything you need to know about our AI chatbot platform.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                >
                  <span className="text-lg font-bold text-gray-900 pr-8">{faq.question}</span>
                  <div className={`transform transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-6 h-6 text-gray-500" />
                  </div>
                </button>
                
                {openFaq === index && (
                  <div className="px-8 pb-6 animate-in slide-in-from-top duration-300">
                    <p className="text-gray-700 leading-relaxed text-lg font-medium">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-600 font-medium mb-6">
              Still have questions? We're here to help!
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="space-y-10">
            <h2 className="text-4xl md:text-6xl font-black text-white text-shadow">
              Ready to Transform Your
              <span className="block">Customer Experience?</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-medium leading-relaxed">
              Join thousands of businesses using AI chatbots to provide instant, accurate customer support 24/7. 
              Start your free trial today and see the difference.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/signup"
                className="group inline-flex items-center justify-center px-10 py-5 bg-white text-blue-600 text-lg font-black rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Start Your Free Trial
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="inline-flex items-center justify-center px-10 py-5 border-2 border-white text-white text-lg font-black rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300">
                <Play className="w-6 h-6 mr-2" />
                Watch Demo
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-2">14 Days</div>
                <div className="text-blue-200 font-medium">Free Trial</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-2">No Setup</div>
                <div className="text-blue-200 font-medium">Fees</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-2">Cancel</div>
                <div className="text-blue-200 font-medium">Anytime</div>
              </div>
            </div>
            
            <p className="text-blue-200 text-sm font-medium">
              No credit card required • Setup in 5 minutes • 24/7 support included
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">ChatBot AI</span>
                  <div className="text-xs text-gray-400 font-medium tracking-wider">INTELLIGENT AUTOMATION</div>
                </div>
              </Link>
              
              <p className="text-gray-400 leading-relaxed text-lg font-medium max-w-md">
                Transform your PDFs into intelligent chatbots that provide instant, accurate customer support. 
                Trusted by thousands of businesses worldwide.
              </p>
              
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors duration-200 font-medium">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors duration-200 font-medium">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 font-medium">API Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 font-medium">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 font-medium">Changelog</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200 font-medium">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 font-medium">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 font-medium">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 font-medium">System Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 font-medium">Community</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200 font-medium">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 font-medium">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 font-medium">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 font-medium">Press Kit</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 font-medium">Partners</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-10 flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
              <p className="text-gray-400 text-sm font-medium">
                © 2024 ChatBot AI. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors font-medium">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors font-medium">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors font-medium">Cookie Policy</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="font-medium">Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span className="font-medium">for amazing businesses</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
