
import React, { useState, useCallback } from 'react';
import { AppStatus } from './types';
import { analyzeImage } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import Spinner from './components/Spinner';
import ErrorAlert from './components/ErrorAlert';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('What is this?');
    const [response, setResponse] = useState<string | null>(null);
    const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
    const [error, setError] = useState<string | null>(null);

    const handleImageSelect = useCallback((file: File) => {
        setImageFile(file);
        setResponse(null);
        setError(null);
        setStatus(AppStatus.IDLE);
        if (imagePreviewUrl) {
            URL.revokeObjectURL(imagePreviewUrl);
        }
        setImagePreviewUrl(URL.createObjectURL(file));
    }, [imagePreviewUrl]);

    const handleImageRemove = useCallback(() => {
        setImageFile(null);
        setResponse(null);
        setError(null);
        setStatus(AppStatus.IDLE);
        if (imagePreviewUrl) {
            URL.revokeObjectURL(imagePreviewUrl);
        }
        setImagePreviewUrl(null);
    }, [imagePreviewUrl]);

    const handleSubmit = async () => {
        if (!imageFile) {
            setError('Please upload an image first.');
            setStatus(AppStatus.ERROR);
            return;
        }

        setStatus(AppStatus.LOADING);
        setError(null);
        setResponse(null);

        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = async () => {
            try {
                const base64Data = (reader.result as string).split(',')[1];
                if (!base64Data) {
                    throw new Error("Failed to read image data.");
                }
                const apiResponse = await analyzeImage(prompt, base64Data, imageFile.type);
                setResponse(apiResponse);
                setStatus(AppStatus.SUCCESS);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
                setError(errorMessage);
                setStatus(AppStatus.ERROR);
            }
        };
        reader.onerror = () => {
            setError('Failed to read the file.');
            setStatus(AppStatus.ERROR);
        };
    };

    const isButtonDisabled = status === AppStatus.LOADING || !imageFile;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 text-gray-900 dark:text-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <header className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 overflow-visible">
                        <span className="inline-block pb-1">AI Image Assistant</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Upload an image, ask the AI assistant, get detailed answers.
                    </p>
                </header>

                <main className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
                    <div className="space-y-8">
                        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50">
                            <div className="mb-8">
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-white font-bold text-sm">1</span>
                                    </div>
                                    <label htmlFor="image-uploader" className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                        Upload Image
                                    </label>
                                </div>
                                <ImageUploader onImageSelect={handleImageSelect} imagePreviewUrl={imagePreviewUrl} onImageRemove={handleImageRemove} />
                            </div>

                            <div className="mb-8">
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-white font-bold text-sm">2</span>
                                    </div>
                                    <label htmlFor="prompt-input" className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                        Ask a Question
                                    </label>
                                </div>
                                <textarea
                                    id="prompt-input"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none"
                                    rows={3}
                                    placeholder="What would you like to know about this image?"
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={isButtonDisabled}
                                className={`w-full py-4 px-6 font-bold text-white rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg
                    ${isButtonDisabled
                                        ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed shadow-none'
                                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/25'}`}
                            >
                                {status === AppStatus.LOADING ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Analyzing...
                                    </div>
                                ) : (
                                    'Analyze Image'
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 min-h-[400px] flex items-center justify-center">
                            {status === AppStatus.LOADING && <Spinner />}
                            {status === AppStatus.ERROR && error && <ErrorAlert message={error} />}
                            {status === AppStatus.SUCCESS && response && <ResultDisplay text={response} />}
                            {status === AppStatus.IDLE && (
                                <div className="text-center text-gray-500 dark:text-gray-400">
                                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Your analysis will appear here</h3>
                                    <p className="text-gray-500 dark:text-gray-400">Upload an image and click "Analyze Image" to begin</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;