import { useState } from 'react';
import NavigationBar from '../components/ui/NavigationBar';

const ImageEmbedTest = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [embedding, setEmbedding] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setEmbedding(null); // Clear previous embeddings
      setError(null); // Clear any errors
    }
  };

  // Clear the selected image and embedding
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setEmbedding(null);
    setError(null);
  };

  // Send image to backend API for embedding
  const handleUpload = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);

    try {
      // Create form data to send the file
      const formData = new FormData();
      formData.append('file', selectedImage);
      
      // Call the backend API
      const response = await fetch('http://127.0.0.1:8000/embed-image', {
        method: 'POST',
        body: formData, // FormData handles the content type automatically
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setEmbedding(data.embedding);
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err.message || 'Failed to get embedding from server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-medantra-neutral-50">
      <NavigationBar />
      
      <div className="max-w-6xl mx-auto pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-medantra-primary-600 to-medantra-primary-700 p-6">
            <h1 className="text-2xl font-display font-bold text-white">Image Embedding Test</h1>
            <p className="text-medantra-primary-100">
              Test the backend API to get image embeddings using the Cohere API
            </p>
          </div>
          
          <div className="p-6">
            {/* Image Upload Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-medantra-neutral-700 mb-2">
                Upload an image to generate embeddings:
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-medantra-neutral-700
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-medium
                    file:bg-medantra-neutral-200 file:text-medantra-neutral-800
                    hover:file:bg-medantra-neutral-300"
                />
                
                {selectedImage && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="ml-3 px-3 py-1 text-sm bg-medantra-neutral-100 hover:bg-medantra-neutral-200 text-medantra-neutral-700 rounded-lg"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-3">
                  <p className="text-sm text-medantra-neutral-500 mb-1">Image Preview:</p>
                  <div className="relative w-48 h-48 overflow-hidden border border-medantra-neutral-300 rounded-lg">
                    <img 
                      src={imagePreview} 
                      alt="Selected preview" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Upload Button */}
            <div className="mb-8">
              <button 
                onClick={handleUpload}
                disabled={!selectedImage || loading}
                className="px-5 py-2 bg-medantra-secondary-500 hover:bg-medantra-secondary-600 
                          text-white font-medium rounded-lg transition-colors shadow-md
                          disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : "Get Embedding"}
              </button>
            </div>
            
            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <p className="font-medium mb-1">Error:</p>
                <p>{error}</p>
              </div>
            )}
            
            {/* Results Display */}
            {embedding && (
              <div>
                <h2 className="text-lg font-semibold text-medantra-neutral-800 mb-2">Image Embedding:</h2>
                <div className="bg-medantra-neutral-50 border border-medantra-neutral-200 rounded-lg p-4 overflow-auto max-h-80">
                  <p className="text-xs font-mono">
                    <span className="font-medium">Vector Length:</span> {embedding.length} dimensions
                  </p>
                  <pre className="text-xs mt-2 overflow-auto">
                    {JSON.stringify(embedding.slice(0, 20), null, 2)}... 
                    <span className="text-medantra-neutral-500">(showing first 20 dimensions)</span>
                  </pre>
                </div>
                
                <div className="mt-4 p-4 bg-medantra-primary-50 border border-medantra-primary-100 rounded-lg">
                  <p className="text-sm text-medantra-primary-700">
                    <strong>Success!</strong> The image embedding was successfully generated using the backend Cohere API.
                    These embeddings can be used for similarity search, clustering, or as input for other machine learning models.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEmbedTest;
