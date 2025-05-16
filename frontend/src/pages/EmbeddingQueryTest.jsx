import { useState, useEffect } from 'react';
import NavigationBar from '../components/ui/NavigationBar';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const EmbeddingQueryTest = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [embeddingsFound, setEmbeddingsFound] = useState([]);
  const [selectedEmbeddings, setSelectedEmbeddings] = useState([]);
  const [allEmbeddings, setAllEmbeddings] = useState([]);

  // Fetch all available embeddings from Firestore
  useEffect(() => {
    const fetchAllEmbeddings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "embeddings"));
        const embeddings = [];
        
        querySnapshot.forEach((doc) => {
          embeddings.push({
            id: doc.id,
            ...doc.data(),
            // Convert Firestore timestamp to JS Date
            createdAt: doc.data().createdAt?.toDate() || new Date(),
          });
        });
        
        setAllEmbeddings(embeddings);
      } catch (err) {
        console.error("Error fetching embeddings:", err);
        setError("Failed to fetch embeddings from database");
      }
    };

    fetchAllEmbeddings();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!question.trim()) {
      setError("Please enter a question");
      return;
    }

    if (selectedEmbeddings.length === 0) {
      setError("Please select at least one embedding for context");
      return;
    }

    setLoading(true);
    setError(null);
    setAnswer('');

    try {
      // Prepare the context embeddings from selected embeddings
      const contextEmbeddings = selectedEmbeddings.map(id => {
        const embeddingObj = allEmbeddings.find(e => e.id === id);
        return embeddingObj.embedding;
      });

      // Call the backend API
      const response = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question,
          context_embeddings: contextEmbeddings
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setAnswer(data.answer);
    } catch (err) {
      console.error('Error asking question:', err);
      setError(err.message || 'Failed to get answer from server');
    } finally {
      setLoading(false);
    }
  };

  // Toggle selection of an embedding
  const toggleEmbeddingSelection = (id) => {
    setSelectedEmbeddings(prev => {
      if (prev.includes(id)) {
        return prev.filter(embId => embId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="min-h-screen bg-medantra-neutral-50">
      <NavigationBar />
      
      <div className="max-w-6xl mx-auto pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-medantra-primary-600 to-medantra-primary-700 p-6">
            <h1 className="text-2xl font-display font-bold text-white">Embedding Query Test</h1>
            <p className="text-medantra-primary-100">
              Use stored embeddings to provide context for questions
            </p>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-medantra-neutral-800 mb-4">Available Embeddings</h2>
              
              {allEmbeddings.length === 0 ? (
                <div className="text-center py-8 text-medantra-neutral-500">
                  <p>No embeddings available in the database.</p>
                  <p className="text-sm mt-1">Generate embeddings first using the Image Embedding Test page.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {allEmbeddings.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => toggleEmbeddingSelection(item.id)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedEmbeddings.includes(item.id) 
                          ? 'border-medantra-primary-500 bg-medantra-primary-50' 
                          : 'border-medantra-neutral-200 hover:border-medantra-primary-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-medantra-neutral-900 truncate">
                          {item.metadata?.name || 'Unnamed Vector'}
                        </h3>
                        <span className="text-xs bg-medantra-primary-100 text-medantra-primary-800 py-1 px-2 rounded">
                          {item.metadata?.dimensions || 0} dims
                        </span>
                      </div>
                      
                      <p className="text-xs text-medantra-neutral-500 mb-2">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                      
                      <div className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          checked={selectedEmbeddings.includes(item.id)}
                          onChange={() => {}} // Controlled by the div click
                          className="h-4 w-4 text-medantra-primary-600 focus:ring-medantra-primary-500 border-medantra-neutral-300 rounded"
                        />
                        <span className="ml-2 text-xs text-medantra-neutral-600">
                          {selectedEmbeddings.includes(item.id) ? 'Selected' : 'Select for context'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-medantra-neutral-100 p-4 rounded-lg mb-4">
                <p className="text-sm text-medantra-neutral-700">
                  <strong>Selected context:</strong> {selectedEmbeddings.length} embeddings
                </p>
                <p className="text-xs text-medantra-neutral-500 mt-1">
                  Select embeddings above to provide context for your question
                </p>
              </div>
            </div>

            {/* Question Form */}
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="mb-4">
                <label htmlFor="question" className="block text-sm font-medium text-medantra-neutral-700 mb-2">
                  Ask a question using selected embeddings as context:
                </label>
                <textarea
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question here..."
                  rows={4}
                  className="w-full px-3 py-2 border border-medantra-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medantra-primary-500 focus:border-transparent"
                  required
                ></textarea>
              </div>

              <div className="mb-8">
                <button 
                  type="submit"
                  disabled={loading || selectedEmbeddings.length === 0}
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
                  ) : "Ask Question"}
                </button>
              </div>
            </form>
            
            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <p className="font-medium mb-1">Error:</p>
                <p>{error}</p>
              </div>
            )}
            
            {/* Answer Display */}
            {answer && (
              <div>
                <h2 className="text-lg font-semibold text-medantra-neutral-800 mb-2">Answer:</h2>
                <div className="bg-medantra-neutral-50 border border-medantra-neutral-200 rounded-lg p-4">
                  <p className="text-medantra-neutral-800 whitespace-pre-wrap">{answer}</p>
                </div>
                
                <div className="mt-4 p-4 bg-medantra-primary-50 border border-medantra-primary-100 rounded-lg">
                  <p className="text-sm text-medantra-primary-700">
                    <strong>Note:</strong> This answer was generated using {selectedEmbeddings.length} embedding vectors as context.
                    The backend currently uses a simplified RAG approach.
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

export default EmbeddingQueryTest;
