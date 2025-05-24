// pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadData, setUploadData] = useState({
    file: null,
    chatbotName: '',
    description: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // Demo Bot State
  const [demoMessages, setDemoMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: "👋 Hi! I'm your AI assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [demoInput, setDemoInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    getUser();
    getPdfs();
  }, []);

  const getUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error('Error getting user:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPdfs = async () => {
    try {
      const { data, error } = await supabase
        .from('pdfs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPdfs(data || []);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadData(prev => ({ ...prev, file }));
      setUploadError('');
    } else {
      setUploadError('Please select a valid PDF file');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadData(prev => ({ ...prev, file }));
      setUploadError('');
    } else {
      setUploadError('Please drop a valid PDF file');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!uploadData.file || !uploadData.chatbotName) {
      setUploadError('Please fill in all required fields');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError('');

    try {
      const fileExt = uploadData.file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const { data: uploadResult, error: uploadError } = await supabase.storage
        .from('pdfs')
        .upload(fileName, uploadData.file);

      clearInterval(progressInterval);
      setUploadProgress(95);

      if (uploadError) {
        throw new Error('Failed to upload file. Please make sure the storage bucket exists.');
      }

      const { data: { publicUrl } } = supabase.storage
        .from('pdfs')
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase
        .from('pdfs')
        .insert([
          {
            user_id: user.id,
            name: uploadData.chatbotName,
            file_name: uploadData.file.name,
            file_size: uploadData.file.size,
            file_url: publicUrl,
            status: 'uploaded'
          }
        ]);

      if (dbError) throw dbError;

      setUploadProgress(100);
      setUploadData({ file: null, chatbotName: '', description: '' });
      getPdfs();

      setTimeout(() => {
        setUploadProgress(0);
      }, 2000);

    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error.message || 'Failed to upload PDF');
    } finally {
      setIsUploading(false);
    }
  };

  // Demo Bot Functions
  const handleDemoSend = () => {
    if (!demoInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: demoInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setDemoMessages(prev => [...prev, userMessage]);
    setDemoInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "That's a great question! Based on your uploaded documents, I can help you with that.",
        "I'd be happy to assist you with that information from your knowledge base.",
        "Let me check that for you. According to your documents...",
        "Great question! I can provide you with detailed information about that topic.",
        "I understand what you're looking for. Here's what I found in your documents..."
      ];

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setDemoMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'history', label: 'History', icon: '📊' },
    { id: 'status', label: 'Status', icon: '⚡' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ChatBot AI</h1>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.user_metadata?.full_name || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h2>
              <p className="text-gray-600 mt-1">
                {activeTab === 'dashboard' && 'Manage your AI chatbots and upload new PDFs'}
                {activeTab === 'history' && 'View your chatbot conversation history'}
                {activeTab === 'status' && 'Monitor your chatbot performance and status'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                ✅ All Systems Operational
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Upload & Stats */}
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">📄</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-600">Total PDFs</h3>
                        <p className="text-2xl font-bold text-gray-900">{pdfs.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🤖</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-600">Active Bots</h3>
                        <p className="text-2xl font-bold text-gray-900">{pdfs.filter(pdf => pdf.status === 'uploaded').length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PDF Upload */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Upload New PDF</h3>
                    <p className="text-sm text-gray-600 mt-1">Create a new AI chatbot from your document</p>
                  </div>
                  
                  <div className="p-6">
                    <form onSubmit={handleUpload} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Chatbot Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={uploadData.chatbotName}
                          onChange={(e) => setUploadData(prev => ({ ...prev, chatbotName: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Customer Support Bot"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          PDF File *
                        </label>
                        <div
                          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
                            dragActive 
                              ? 'border-blue-400 bg-blue-50' 
                              : 'border-gray-300 hover:border-gray-400'
                          } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                          onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
                          onDrop={handleDrop}
                        >
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="pdf-upload"
                            disabled={isUploading}
                          />
                          
                          <div className="space-y-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                              {isUploading ? (
                                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <span className="text-xl">📄</span>
                              )}
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">
                                {uploadData.file ? uploadData.file.name : (isUploading ? 'Uploading...' : 'Drop your PDF here')}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">
                                {isUploading ? `${uploadProgress}% complete` : 'or click to browse files'}
                              </p>
                            </div>
                            
                            {isUploading && (
                              <div className="w-full max-w-xs mx-auto">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                            
                            {!uploadData.file && !isUploading && (
                              <label
                                htmlFor="pdf-upload"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                              >
                                Choose File
                              </label>
                            )}
                          </div>
                        </div>
                      </div>

                      {uploadError && (
                        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                          {uploadError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isUploading || !uploadData.file || !uploadData.chatbotName}
                        className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                      >
                        {isUploading ? 'Uploading...' : 'Upload PDF'}
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Right Column - Demo Bot */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[600px]">
                {/* Bot Header */}
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">🤖</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Demo AI Assistant</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <p className="text-sm text-gray-600">Online • Ready to help</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {demoMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        msg.type === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${
                          msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-6 border-t border-gray-100">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={demoInput}
                      onChange={(e) => setDemoInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleDemoSend()}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleDemoSend}
                      disabled={!demoInput.trim()}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <span className="text-lg">📤</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    This is a demo interface. Your actual chatbot will be trained on your uploaded PDFs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversation History</h3>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">No conversations yet</h4>
                <p className="text-gray-500">Conversation history will appear here once your chatbots start receiving messages.</p>
              </div>
            </div>
          )}

          {activeTab === 'status' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-green-900">AI Processing</span>
                    </div>
                    <span className="text-green-600 font-medium">Operational</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-green-900">File Storage</span>
                    </div>
                    <span className="text-green-600 font-medium">Operational</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-green-900">Chatbot API</span>
                    </div>
                    <span className="text-green-600 font-medium">Operational</span>
                  </div>
                </div>
              </div>

              {/* Your PDFs */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your PDFs Status</h3>
                {pdfs.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">📄</span>
                    </div>
                    <p className="text-gray-500">No PDFs uploaded yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pdfs.map((pdf) => (
                      <div key={pdf.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{pdf.name}</h4>
                          <p className="text-sm text-gray-500">{pdf.file_name}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          pdf.status === 'uploaded' ? 'bg-green-100 text-green-800' :
                          pdf.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {pdf.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
