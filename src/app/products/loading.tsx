"use client"


import React from 'react';

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Main Loading Spinner */}
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-blue-200 dark:border-gray-700 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-500"></div>
          <div className="absolute top-2 left-2 w-16 h-16 border-4 border-transparent border-t-indigo-400 rounded-full animate-spin animation-delay-150"></div>
        </div>

        {/* Loading Text with Animation */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 animate-pulse">
            Loading
          </h2>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce animation-delay-75"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce animation-delay-150"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full animate-pulse loading-bar"></div>
        </div>

        {/* Loading Message */}
        <p className="text-gray-600 dark:text-gray-400 text-sm animate-fade-in">
          Please wait while we prepare your content...
        </p>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-400 opacity-20 rounded-full animate-float"></div>
        <div className="absolute top-1/4 right-8 w-6 h-6 bg-indigo-400 opacity-20 rounded-full animate-float animation-delay-300"></div>
        <div className="absolute bottom-1/4 left-8 w-4 h-4 bg-purple-400 opacity-20 rounded-full animate-float animation-delay-500"></div>
        <div className="absolute bottom-8 right-1/4 w-5 h-5 bg-pink-400 opacity-20 rounded-full animate-float animation-delay-700"></div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 2s ease-in-out infinite;
        }
        
        .animation-delay-75 {
          animation-delay: 0.075s;
        }
        
        .animation-delay-150 {
          animation-delay: 0.15s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
};

// Alternative Simple Loading Component
export const SimpleLoader = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-200 dark:border-gray-700 rounded-full animate-spin border-t-blue-600 mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
};

// Loading with Custom Message
export const CustomLoader = ({ message = "Loading...", showProgress = false }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl text-center max-w-sm mx-4">
        <div className="w-16 h-16 border-4 border-blue-200 dark:border-gray-700 rounded-full animate-spin border-t-blue-600 mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{message}</h3>
        {showProgress && (
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
          </div>
        )}
        <p className="text-sm text-gray-600 dark:text-gray-400">Please wait...</p>
      </div>
    </div>
  );
};

export default LoadingPage;