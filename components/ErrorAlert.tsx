
import React from 'react';

interface ErrorAlertProps {
    message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => (
    <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 shadow-lg backdrop-blur-sm" role="alert">
        <div className="flex items-start">
            <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
            </div>
            <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Something went wrong</h3>
                <p className="text-red-700 dark:text-red-300 leading-relaxed">{message}</p>
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                    <p className="text-sm text-red-600 dark:text-red-400">
                        💡 <strong>Tip:</strong> Make sure your image is clear and try asking a different question.
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default ErrorAlert;
