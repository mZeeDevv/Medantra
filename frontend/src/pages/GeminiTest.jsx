// filepath: d:\Medantra\src\pages\GeminiTest.jsx
import { useState, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import NavigationBar from '../components/ui/NavigationBar';

const GeminiTest = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const MODEL = "gemini-2.0-flash"; // Using a single model for both text and multimodal queries
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() && !selectedImage) return;

    setLoading(true);
    setResponse('');

    try {
      // Initialize the Gemini API client with the correct class name
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL });
      let responseText;

      if (selectedImage) {
        // Convert image to inline data for the API
        const imageData = await fileToGenerativePart(selectedImage);
        
        // Prepare the content parts (text and image)
        const parts = [];
        
        if (input.trim()) {
          parts.push({ text: input });
        } else {
          parts.push({ text: "Describe what you see in this image in detail." });
        }
        
        parts.push(imageData);
        
        // Generate content with image
        const result = await model.generateContent({
          contents: [{ role: "user", parts }],
        });
        
        const response = await result.response;
        responseText = response.text();
      } else {
        // Text-only query
        const result = await model.generateContent(input);
        const response = await result.response;
        responseText = response.text();
      }

      setResponse(responseText);
      
      // Add to history
      setHistory((prevHistory) => [
        ...prevHistory,
        { 
          question: input, 
          image: imagePreview, 
          answer: responseText 
        }
      ]);
      
      // Clear input and image for next query
      setInput('');
      removeImage();
      
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert File to Generative Part
  const fileToGenerativePart = async (file) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
    
    const base64EncodedData = await base64EncodedDataPromise;
    
    return {
      inlineData: {
        data: base64EncodedData,
        mimeType: file.type
      }
    };
  };

  return (
    <div className="min-h-screen bg-medantra-neutral-50">
      <NavigationBar />
      
      <div className="max-w-6xl mx-auto pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-medantra-primary-600 to-medantra-primary-700 p-6">
            <h1 className="text-2xl font-display font-bold text-white">Gemini API Test</h1>
            <p className="text-medantra-primary-100">
              Test the Gemini model with text and image inputs
            </p>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="mb-4">
                <label htmlFor="prompt" className="block text-sm font-medium text-medantra-neutral-700 mb-2">
                  Enter your prompt:
                </label>
                <textarea 
                  id="prompt"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full px-4 py-3 border border-medantra-neutral-300 rounded-lg focus:ring-2 focus:ring-medantra-primary-500 focus:border-medantra-primary-500 min-h-[120px]"
                  placeholder="Enter a prompt for Gemini, or just upload an image..."
                />
              </div>
              
              {/* Image Upload Area */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-medantra-neutral-700 mb-2">
                  Upload Image (optional):
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                    id="image-upload"
                  />
                  <label 
                    htmlFor="image-upload"
                    className="px-4 py-2 bg-medantra-neutral-200 hover:bg-medantra-neutral-300 text-medantra-neutral-800 rounded-lg cursor-pointer mr-3"
                  >
                    Select Image
                  </label>
                  {selectedImage && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="px-3 py-1 text-sm bg-medantra-neutral-100 hover:bg-medantra-neutral-200 text-medantra-neutral-700 rounded-lg"
                    >
                      Remove Image
                    </button>
                  )}
                </div>
                
                {imagePreview && (
                  <div className="mt-3">
                    <p className="text-xs text-medantra-neutral-500 mb-1">Image Preview:</p>
                    <div className="relative w-40 h-40 overflow-hidden border border-medantra-neutral-300 rounded-lg">
                      <img 
                        src={imagePreview} 
                        alt="Selected preview" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                type="submit" 
                disabled={loading || (!input.trim() && !selectedImage)}
                className="px-6 py-3 bg-medantra-secondary-500 hover:bg-medantra-secondary-600 text-white font-medium rounded-lg transition-colors shadow-lg disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : "Submit to Gemini"}
              </button>
            </form>

            {response && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-medantra-neutral-800 mb-2">Gemini Response:</h2>
                <div className="bg-medantra-neutral-50 border border-medantra-neutral-200 rounded-lg p-4 whitespace-pre-wrap">
                  {response}
                </div>
              </div>
            )}

            {history.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-medantra-neutral-800 mb-4 border-b border-medantra-neutral-200 pb-2">
                  Conversation History
                </h2>
                <div className="space-y-6">
                  {history.map((item, index) => (
                    <div key={index} className="border-b border-medantra-neutral-200 pb-4 last:border-0">
                      <div className="mb-2">
                        <span className="font-medium text-medantra-primary-700">Query:</span>
                        <p className="ml-4 text-medantra-neutral-700">{item.question}</p>
                        
                        {item.image && (
                          <div className="mt-2 ml-4">
                            <p className="text-xs text-medantra-neutral-500 mb-1">Uploaded Image:</p>
                            <div className="w-32 h-32 overflow-hidden border border-medantra-neutral-300 rounded-lg">
                              <img 
                                src={item.image} 
                                alt={`Query image ${index}`} 
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="font-medium text-medantra-secondary-700">Answer:</span>
                        <p className="ml-4 text-medantra-neutral-700 whitespace-pre-wrap">{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiTest;