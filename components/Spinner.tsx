
import React from 'react';

const Spinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center space-y-6" aria-label="Loading...">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin" style={{ animationDelay: '-0.5s' }}></div>
        </div>
        <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Analyzing your image</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">This may take a few seconds...</p>
        </div>
        <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
    </div>
);

export default Spinner;
