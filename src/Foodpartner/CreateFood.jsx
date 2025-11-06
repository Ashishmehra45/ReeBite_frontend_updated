import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateVideoItem = () => {
  const navigate = useNavigate();

  // State to manage form inputs (Video URL removed, file added)
  const [videoFile, setVideoFile] = useState(null); // File object store karega
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // State for form submission feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    // Select ki gayi file ko state mein store karein
    setVideoFile(e.target.files[0]);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // 1. Setup & Loading START (Move loading up here)
  setError('');
  setSuccess('');
  setLoading(true); // <-- This should be the first action after e.preventDefault()
  
  // Basic client-side validation
  if (!videoFile || !name || !description) {
    setError('Please select a video file and fill in all required fields.');
    setLoading(false);
    return;
  }

  // 2. FormData Preparation (Only once)
  const formData = new FormData();
  formData.append('video', videoFile); // Ensure no space here!
  formData.append('name', name);
  formData.append('description', description);
  
  // 3. The actual, correct request in the try block runs now.
  try {
    const response = await axios.post(
      'https://reebite-backend.onrender.com/api/food/', // <-- Your intended endpoint
      formData,
      { 
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
        withCredentials: true 
      }
    );
    navigate('/')
    console.log(response.data)
    // ... success logic ...
  } catch (err) {
    // ... error handling ...
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 via-indigo-900 to-indigo-950 p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-12">
          <h2 className="text-3xl font-bold text-white mb-2">Upload Your Dish Video</h2>
          <p className="text-purple-100 text-sm">Share your culinary creation with our community</p>
        </div>

        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          
          <div>
            <label htmlFor="videoFile" className="block text-sm font-semibold text-gray-700 mb-3">
              Video File <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="relative">
              <input
                id="videoFile"
                name="videoFile"
                type="file"
                accept="video/*"
                required
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex items-center justify-center w-full px-4 py-4 border-2 border-dashed border-purple-300 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200">
                <div className="text-center">
                  <svg className="mx-auto h-8 w-8 text-purple-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {videoFile ? (
                    <div>
                      <p className="text-sm font-medium text-gray-900">{videoFile.name}</p>
                      <p className="text-xs text-gray-500 mt-1">Click to change file</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-1">Video files only</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dish Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Dish Name <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="e.g., Spicy Chicken Tikka"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                         transition-all duration-200 text-sm"
            />
          </div>

        
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description <span className="text-red-500 font-bold">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              placeholder="Tell us about this delicious dish, ingredients, cooking method, etc."
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                         transition-all duration-200 text-sm resize-none"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">{description.length}/500 characters</p>
          </div>

         
          {error && (
            <div className="flex items-start p-4 bg-red-50 border border-red-200 rounded-lg">
              <svg className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-red-700">{error}</span>
            </div>
          )}
          {success && (
            <div className="flex items-start p-4 bg-green-50 border border-green-200 rounded-lg">
              <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-green-700">{success}</span>
            </div>
          )}

          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 
                       text-white font-semibold rounded-lg shadow-md transition-all duration-200 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                       disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:from-purple-600 disabled:hover:to-indigo-600
                       flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Upload Video</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateVideoItem;