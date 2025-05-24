// pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadData, setUploadData] = useState({
    file: null,
    chatbotName: '',
    description: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [dragActive, setDragActive] = useState(false);

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

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
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
      // Create unique file name
      const fileExt = uploadData.file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Upload to Supabase Storage
      const { data: uploadResult, error: uploadError } = await supabase.storage
        .from('pdfs')
        .upload(fileName, uploadData.file);

      clearInterval(progressInterval);
      setUploadProgress(95);

      if (uploadError) {
        throw new Error('Failed to upload file. Please make sure the storage bucket exists.');
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('pdfs')
        .getPublicUrl(fileName);

      // Save to database
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

      // Reset form and refresh PDFs list
      setUploadData({ file: null, chatbotName: '', description: '' });
      getPdfs();

      // Reset progress after a delay
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

  const deletePdf = async (pdfId) => {
    if (!window.confirm('Are you sure you want to delete this PDF?')) return;

    try {
      const { error } = await supabase
        .from('pdfs')
        .delete()
        .eq('id', pdfId);

      if (error) throw error;
      getPdfs(); // Refresh list
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">ChatBot AI Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {user?.user_metadata?.full_name || user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Total PDFs</h3>
                <p className="text-3xl font-bold text-blue-600">{pdfs.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Active Chatbots</h3>
                <p className="text-3xl font-bold text-green-600">{pdfs.filter(pdf => pdf.status === 'uploaded').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Conversations</h3>
                <p className="text-3xl font-bold text-purple-600">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* PDF Upload Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Upload New PDF</h2>
            <p className="text-sm text-gray-600 mt-1">Create a new AI chatbot from your PDF document</p>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chatbot Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadData.chatbotName}
                    onChange={(e) => setUploadData(prev => ({ ...prev, chatbotName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Customer Support Bot"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <input
                    type="text"
                    value={uploadData.description}
                    onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of the chatbot"
                  />
                </div>
              </div>

              {/* File Upload Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PDF File *
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
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
                  
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      {isUploading ? (
                        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <span className="text-2xl">📄</span>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {uploadData.file ? uploadData.file.name : (isUploading ? 'Uploading...' : 'Drop your PDF here')}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
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
                        Choose PDF File
                      </label>
                    )}
                  </div>
                </div>
                
                <div className="mt-2 text-xs text-gray-500">
                  <p>• Supported format: PDF</p>
                  <p>• Maximum file size: 10MB</p>
                </div>
              </div>

              {uploadError && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                  {uploadError}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isUploading || !uploadData.file || !uploadData.chatbotName}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isUploading ? 'Uploading...' : 'Upload PDF'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* PDFs List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Your PDFs</h2>
            <p className="text-sm text-gray-600 mt-1">Manage your uploaded PDF documents</p>
          </div>
          
          <div className="p-6">
            {pdfs.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📄</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No PDFs uploaded yet</h3>
                <p className="text-gray-500">Upload your first PDF to get started with AI chatbots!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pdfs.map((pdf) => (
                  <div key={pdf.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{pdf.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {pdf.file_name} • {Math.round(pdf.file_size / 1024)} KB
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Uploaded {new Date(pdf.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          pdf.status === 'uploaded' ? 'bg-green-100 text-green-800' :
                          pdf.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {pdf.status}
                        </span>
                        
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View
                        </button>
                        
                        <button 
                          onClick={() => deletePdf(pdf.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
