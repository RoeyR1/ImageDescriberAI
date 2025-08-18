# Image Assistant AI

A web app for analyzing images with natural language. Upload a photo, ask a question, and get clear, contextual answers powered by Google's Gemini multimodal AI. The app runs entirely in the browser for a fast, simple workflow.

---

## Built With

- **Framework**: React (Vite, TypeScript)
- **Styling**: Tailwind CSS
- **AI**: Google GenAI 

---

## Image Analysis

- **Drag & Drop Upload**: Add images using drag-and-drop or a file picker, with live preview and easy removal
- **Prompted Q&A**: Ask questions about your image to guide the analysis
- **Gemini Multimodal**: Combines image and text input to provide relevant, insightful responses
- **User-Friendly Results**: Receive concise, well-structured answers for quick understanding

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Google AI Studio API key

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/RoeyR1/ImageAssistantAI.git
   cd ImageAssistantAI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the project root with:
   ```
   VITE_API_KEY=your_google_ai_studio_api_key
   ```

---

## Running the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Access the app**:
   - Navigate to the application URL
   - Upload an image, ask a question, and analyze results

---

## Usage

1. **Upload an Image**: Drag and drop or click to select a file 
2. **Ask a Question**: Enter a prompt describing what you want to know
3. **Analyze**: Click "Analyze Image" and wait for the response
4. **Review Results**: Read the answer, with key points emphasized for clarity
5. **Repeat**: Ask new questions or upload another image for more insights
