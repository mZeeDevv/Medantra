import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const NavigationBar = () => {
  const { currentUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for transparent to solid transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg py-2' 
          : 'bg-gradient-to-r from-medantra-primary-800/90 to-medantra-primary-900/90 backdrop-blur-md py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              {isScrolled ? (
                <div className="flex items-center space-x-1">
                  <span className="h-8 w-8 bg-gradient-to-br from-medantra-primary-600 to-medantra-secondary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">M</span>
                  <span className="text-2xl font-display font-bold bg-gradient-to-r from-medantra-primary-700 to-medantra-secondary-600 bg-clip-text text-transparent group-hover:from-medantra-primary-600 group-hover:to-medantra-secondary-500 transition-all">
                    Medantra
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <span className="h-9 w-9 bg-white/90 rounded-full flex items-center justify-center text-medantra-primary-700 font-bold text-lg shadow-lg">M</span>
                  <span className="text-2xl font-display font-bold text-white group-hover:text-medantra-primary-100 transition-colors">
                    Medantra
                  </span>
                </div>
              )}
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">            {[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
              { name: 'Services', path: '/services' },
              { name: 'Health Blog', path: '/blog' },
              { name: 'Gemini Test', path: '/gemini-test' },
              { name: 'Image Embed Test', path: '/image-embed-test' } // Add Image Embed Test to navigation
            ].map((item) => (
              <Link 
                key={item.name}
                to={item.path} 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? isScrolled 
                      ? 'bg-medantra-primary-50 text-medantra-primary-700' 
                      : 'bg-white/10 text-white'
                    : isScrolled 
                      ? 'text-medantra-neutral-700 hover:text-medantra-primary-700 hover:bg-medantra-primary-50'
                      : 'text-medantra-primary-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {currentUser ? (
              <div className="ml-4 flex items-center">
                <div className={`hidden lg:block rounded-full px-3 py-1 mr-3 ${
                  isScrolled ? 'bg-medantra-primary-50 text-medantra-primary-700' : 'bg-white/10 text-white'
                }`}>
                  <span className="text-sm font-medium truncate max-w-[150px] inline-block align-middle">
                    {currentUser.email}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <Link 
                    to="/dashboard" 
                    className={`px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-all ${
                      isScrolled
                        ? 'bg-medantra-primary-600 text-white hover:bg-medantra-primary-700'
                        : 'bg-white text-medantra-primary-700 hover:bg-medantra-primary-50'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-all ${
                      isScrolled
                        ? 'bg-medantra-neutral-100 text-medantra-neutral-700 hover:bg-medantra-neutral-200'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4">
                <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    isScrolled
                      ? 'border border-medantra-secondary-500 text-medantra-secondary-600 hover:bg-medantra-secondary-50'
                      : 'border border-white/30 text-white hover:bg-white/10'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className={`px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-all ${
                    isScrolled
                      ? 'bg-medantra-secondary-500 text-white hover:bg-medantra-secondary-600'
                      : 'bg-white text-medantra-primary-700 hover:bg-medantra-primary-50'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled
                  ? 'text-medantra-neutral-700 hover:text-medantra-primary-600 hover:bg-medantra-primary-50'
                  : 'text-white hover:text-white hover:bg-white/10'
              } transition-colors focus:outline-none`}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 pointer-events-none'
        } overflow-hidden`}
      >
        <div className={`space-y-1 px-4 pt-2 pb-3 ${isScrolled ? 'bg-white' : 'bg-medantra-primary-900/95'}`}>
          {[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Services', path: '/services' },
            { name: 'Health Blog', path: '/blog' },
            { name: 'Gemini Test', path: '/gemini-test' } // Add Gemini Test to mobile menu
          ].map((item) => (
            <Link 
              key={item.name}
              to={item.path} 
              className={`block px-3 py-2 rounded-lg text-base font-medium ${
                isActive(item.path)
                  ? isScrolled
                    ? 'bg-medantra-primary-50 text-medantra-primary-700'
                    : 'bg-white/10 text-white'
                  : isScrolled
                    ? 'text-medantra-neutral-700 hover:bg-medantra-primary-50 hover:text-medantra-primary-700'
                    : 'text-medantra-primary-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className={`px-4 py-4 border-t ${
          isScrolled 
            ? 'border-medantra-neutral-200' 
            : 'border-medantra-primary-800'
        }`}>
          {currentUser ? (
            <div className="space-y-3">
              <div className={`rounded-lg px-3 py-2 flex items-center space-x-2 ${
                isScrolled ? 'bg-medantra-primary-50' : 'bg-white/10'
              }`}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 ${isScrolled ? 'text-medantra-primary-600' : 'text-white'}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <p className={`text-sm ${isScrolled ? 'text-medantra-neutral-600' : 'text-medantra-primary-200'}`}>
                    Signed in as:
                  </p>
                  <p className={`text-base font-medium truncate ${isScrolled ? 'text-medantra-primary-600' : 'text-white'}`}>
                    {currentUser.email}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link 
                  to="/dashboard" 
                  className={`px-4 py-2 text-center text-sm font-medium rounded-lg shadow-sm transition-all ${
                    isScrolled
                      ? 'bg-medantra-primary-600 text-white hover:bg-medantra-primary-700'
                      : 'bg-white text-medantra-primary-700 hover:bg-medantra-primary-50'
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 text-center text-sm font-medium rounded-lg shadow-sm transition-all ${
                    isScrolled
                      ? 'bg-medantra-neutral-100 text-medantra-neutral-700 hover:bg-medantra-neutral-200'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/login"
                className={`block w-full px-4 py-2 text-center text-sm font-medium rounded-lg transition-all ${
                  isScrolled
                    ? 'border border-medantra-secondary-500 text-medantra-secondary-600 hover:bg-medantra-secondary-50'
                    : 'border border-white/30 text-white hover:bg-white/10'
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className={`block w-full px-4 py-2 text-center text-sm font-medium rounded-lg shadow-sm transition-all ${
                  isScrolled
                    ? 'bg-medantra-secondary-500 text-white hover:bg-medantra-secondary-600'
                    : 'bg-white text-medantra-primary-700 hover:bg-medantra-primary-50'
                }`}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;