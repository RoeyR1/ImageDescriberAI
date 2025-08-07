
import React, { useState, useCallback } from 'react';

interface ImageUploaderProps {
    onImageSelect: (file: File) => void;
    onImageRemove: () => void;
    imagePreviewUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, onImageRemove, imagePreviewUrl }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            onImageSelect(event.target.files[0]);
        }
    };

    const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onImageSelect(e.dataTransfer.files[0]);
        }
    }, [onImageSelect]);

    const handleRemoveImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        onImageRemove();
    };

    return (
        <div
            className={`relative w-full h-80 rounded-3xl flex justify-center items-center transition-all duration-300 transform hover:scale-[1.02] group
        ${!imagePreviewUrl ? 'border-2 border-dashed' : ''}
        ${isDragging
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-lg shadow-blue-500/25 scale-[1.02]'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 hover:shadow-lg hover:shadow-gray-500/10'}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute w-full h-full opacity-0 cursor-pointer"
                aria-label="Upload an image"
            />
            {imagePreviewUrl ? (
                <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                    <img
                        src={imagePreviewUrl}
                        alt="Preview"
                        className="object-cover w-full h-full rounded-2xl transition-transform duration-300 group-hover:scale-102"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                    {/* Remove button */}
                    <button
                        onClick={handleRemoveImage}
                        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all duration-200 transform hover:scale-110 z-10"
                        aria-label="Remove image"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                </div>
            ) : (
                <div className="text-center p-8">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${isDragging
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25'
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 group-hover:from-blue-100 group-hover:to-indigo-100 dark:group-hover:from-blue-900/30 dark:group-hover:to-indigo-900/30'
                        }`}>
                        <svg className={`w-10 h-10 transition-colors duration-300 ${isDragging
                            ? 'text-white'
                            : 'text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                    <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${isDragging
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                        }`}>
                        {isDragging ? 'Drop your image here' : 'Drag & Drop or Click to Upload'}
                    </h3>
                    <p className={`text-sm transition-colors duration-300 ${isDragging
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-300'
                        }`}>
                        PNG, JPG, GIF, WEBP up to 10MB
                    </p>
                    {!isDragging && (
                        <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-400 dark:text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Click or drag to upload</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
