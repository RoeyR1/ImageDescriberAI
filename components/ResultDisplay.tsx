
import React from 'react';

interface ResultDisplayProps {
    text: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ text }) => {
    // Function to convert markdown bold syntax to HTML
    const formatText = (text: string) => {
        // Convert **text** to <strong>text</strong>
        const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Split by line breaks and create React elements
        return formattedText.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                <span dangerouslySetInnerHTML={{ __html: line }} />
                {index < formattedText.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-green-800 dark:text-green-200">Analysis Complete</h3>
                </div>
                <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 border border-green-100 dark:border-green-800/50">
                    <div className="text-gray-800 dark:text-gray-200 leading-relaxed text-sm sm:text-base">
                        {formatText(text)}
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-green-600 dark:text-green-400">
                    <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Powered by Google Gemini AI</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Analysis successful</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultDisplay;
