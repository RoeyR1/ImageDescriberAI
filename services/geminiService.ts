
import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
    throw new Error("VITE_API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Analyzes an image using a text prompt.
 * @param prompt The text prompt to guide the analysis.
 * @param imageBase64 The base64 encoded image data.
 * @param mimeType The MIME type of the image.
 * @returns The text response from the Gemini API.
 */
export const analyzeImage = async (prompt: string, imageBase64: string, mimeType: string): Promise<string> => {
    try {
        const imagePart = {
            inlineData: {
                mimeType: mimeType,
                data: imageBase64,
            },
        };

        const textPart = {
            text: prompt,
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });

        return response.text || "No response received from the AI model.";
    } catch (error) {
        console.error("Error analyzing image:", error);
        if (error instanceof Error) {
            return `An error occurred while analyzing the image: ${error.message}`;
        }
        return "An unknown error occurred while analyzing the image.";
    }
};