import { useState, useEffect } from 'react';
import NavigationBar from '../components/ui/NavigationBar';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';

const ImageEmbedTest = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [embedding, setEmbedding] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savedEmbeddingId, setSavedEmbeddingId] = useState(null);
  const [recentEmbeddings, setRecentEmbeddings] = useState([]);
  const [loadingEmbeddings, setLoadingEmbeddings] = useState(false);
  
  // Fetch recent embeddings from Firestore
  useEffect(() => {
    fetchRecentEmbeddings();
  }, []);

  // Function to fetch the most recent embeddings
  const fetchRecentEmbeddings = async () => {
    setLoadingEmbeddings(true);
    try {
      const embeddingsQuery = query(
        collection(db, "embeddings"),
        orderBy("createdAt", "desc"),
        limit(5)
      );
      
      const querySnapshot = await getDocs(embeddingsQuery);
      const embeddings = [];
      
      querySnapshot.forEach((doc) => {
        embeddings.push({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore timestamp to JS Date
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        });
      });
      
      setRecentEmbeddings(embeddings);
    } catch (err) {
      console.error("Error fetching recent embeddings:", err);
    } finally {
      setLoadingEmbeddings(false);
    }
  };

  // Refresh embeddings list after saving a new one
  useEffect(() => {
    if (savedEmbeddingId) {
      fetchRecentEmbeddings();
    }
  }, [savedEmbeddingId]);

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
    setSavedEmbeddingId(null);
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
      
      // Save embedding to Firestore
      await saveEmbeddingToFirebase(data.embedding);
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err.message || 'Failed to get embedding from server');
    } finally {
      setLoading(false);
    }
  };
  // Save embedding data to Firebase
  const saveEmbeddingToFirebase = async (embeddingData) => {
    try {
      // Save only the embedding data and metadata to Firestore (no image storage)
      const docRef = await addDoc(collection(db, "embeddings"), {
        embedding: embeddingData,
        metadata: {
          name: selectedImage.name,
          type: selectedImage.type,
          size: selectedImage.size,
          dimensions: embeddingData.length
        },
        createdAt: serverTimestamp()
      });
      
      console.log("Embedding saved to Firestore with ID:", docRef.id);
      setSavedEmbeddingId(docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error saving embedding to Firebase:", error);
      setError("Embedding generated but failed to save to database: " + error.message);
      throw error;
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
                  
                  {savedEmbeddingId && (
                    <div className="mt-2 flex items-center text-medantra-secondary-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-sm font-medium">
                        Embedding saved to Firestore with ID: <span className="font-mono text-xs">{savedEmbeddingId}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>            )}
            
            {/* Recent Embeddings Section */}
            <div className="mt-10 pt-8 border-t border-medantra-neutral-200">
              <h2 className="text-lg font-semibold text-medantra-neutral-800 mb-4">Recent Embeddings</h2>
              
              {loadingEmbeddings ? (
                <div className="flex justify-center py-8">
                  <svg className="animate-spin h-8 w-8 text-medantra-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : recentEmbeddings.length > 0 ? (                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {recentEmbeddings.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-white border border-medantra-neutral-200 rounded-lg shadow-sm overflow-hidden"
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-medantra-neutral-900 truncate">
                            {item.metadata?.name || 'Unnamed Vector'}
                          </h3>
                          <span className="text-xs bg-medantra-primary-100 text-medantra-primary-800 py-1 px-2 rounded">
                            {item.metadata?.dimensions || 0} dimensions
                          </span>
                        </div>
                        
                        <p className="text-xs text-medantra-neutral-500 mb-3">
                          {new Date(item.createdAt).toLocaleString()}
                        </p>
                        
                        <div className="bg-medantra-neutral-50 p-2 rounded-md mb-3 overflow-hidden">
                          <p className="text-xs font-mono truncate">
                            [{item.embedding?.slice(0, 3).map(n => n.toFixed(4)).join(', ')}, ...]
                          </p>
                        </div>
                        
                        <div className="flex justify-end">
                          <button 
                            onClick={() => {
                              // Could add functionality to use this embedding
                              console.log(`Selected embedding ID: ${item.id}`);
                            }}
                            className="text-xs text-medantra-secondary-600 hover:text-medantra-secondary-800"
                          >
                            Use Embedding
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-medantra-neutral-500">
                  <p>No embeddings have been saved yet.</p>
                  <p className="text-sm mt-1">Generate embeddings from images to see them here.</p>
                </div>
              )}
              
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={fetchRecentEmbeddings}
                  className="text-sm text-medantra-primary-600 hover:text-medantra-primary-800 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEmbedTest;
