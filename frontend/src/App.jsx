import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard'; 
import GeminiTest from './pages/GeminiTest';
import ImageEmbedTest from './pages/ImageEmbedTest'; // Import the image embedding test component
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-medantra-neutral-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/gemini-test" element={<GeminiTest />} />
            <Route path="/image-embed-test" element={<ImageEmbedTest />} /> {/* Add the new ImageEmbedTest route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
