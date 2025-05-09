import { useAuth } from '../contexts/AuthContext';
import NavigationBar from '../components/ui/NavigationBar';
import ChatInterface from '../components/ui/ChatInterface';
import { Link } from 'react-router-dom';

const Home = () => {
  const { currentUser } = useAuth();

  // Features sections for the homepage
  const features = [
    {
      id: 1,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: "Health Records",
      description: "Track your medical history, prescriptions, and upcoming appointments in one secure place."
    },
    {
      id: 2,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Schedule Appointments",
      description: "Easily schedule appointments with healthcare providers based on AI recommendations."
    },
    {
      id: 3,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "Medication Tracking",
      description: "Get reminders for medications and track their effectiveness over time."
    },
    {
      id: 4,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Health Reports",
      description: "AI-generated insights and summaries from your health data and medical history."
    }
  ];

  // Health metrics for logged-in users
  const healthMetrics = [
    { id: 1, name: "Heart Rate", value: "72 BPM", change: "+2", trend: "up" },
    { id: 2, name: "Blood Pressure", value: "120/80", change: "-5", trend: "down" },
    { id: 3, name: "Sleep", value: "7.2 hrs", change: "+0.5", trend: "up" },
    { id: 4, name: "Steps", value: "8,452", change: "+1,200", trend: "up" },
  ];

  // Article teasers for the health blog section
  const healthArticles = [
    {
      id: 1,
      title: "Understanding Seasonal Allergies",
      summary: "Learn about causes, symptoms, and effective treatment options for seasonal allergies.",
      image: "https://images.unsplash.com/photo-1607939279521-c110ec4bc9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      readTime: "4 min read"
    },
    {
      id: 2,
      title: "The Science of Sleep and Recovery",
      summary: "How quality sleep affects your body's ability to heal and maintain optimal health.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "Nutrition Basics: Building a Balanced Diet",
      summary: "Essential components of a healthy diet and how to incorporate them into daily meals.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      readTime: "5 min read"
    }
  ];

  // Upcoming appointments for logged-in users
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Williams",
      specialty: "General Practitioner",
      date: "May 12, 2025",
      time: "10:30 AM",
      location: "Medantra Health Center",
      virtual: false
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Cardiologist",
      date: "May 18, 2025",
      time: "2:15 PM",
      location: "Virtual Consultation",
      virtual: true
    }
  ];

  return (
    <div className="min-h-screen bg-medantra-neutral-50">
      <NavigationBar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-medantra-primary-700 to-medantra-primary-900 overflow-hidden">
        <div className="absolute inset-0">
          <svg className="absolute right-0 top-0 h-full w-full transform translate-x-1/2" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="rgba(255, 255, 255, 0.08)" d="M42.3,-71.5C52,-62,55.4,-44.5,62.8,-29C70.3,-13.5,81.7,-0.1,81.6,13.9C81.5,27.9,70,42.6,56.6,52.5C43.2,62.5,28,67.8,11.9,73C-4.1,78.3,-21.1,83.5,-35.5,79C-49.9,74.4,-61.9,60,-70.2,44.1C-78.6,28.2,-83.2,10.7,-81.6,-5.6C-79.9,-21.9,-71.9,-37,-60.2,-47.5C-48.5,-57.9,-33,-63.7,-18,-69.3C-3,-74.9,11.5,-80.3,25.4,-77.4C39.4,-74.5,52.9,-63.3,42.3,-71.5Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-display font-bold text-white leading-tight">
                Medical Guidance Powered by AI Intelligence
              </h1>
              <p className="text-xl text-medantra-primary-100 max-w-xl">
                Ask health questions, get personalized insights, and take control of your wellness journey with Medantra's advanced AI technology.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/signup" className="px-8 py-3 bg-medantra-secondary-500 hover:bg-medantra-secondary-600 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl">
                  Get Started
                </Link>
                <Link to="/about" className="px-8 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 text-white border border-white border-opacity-20 font-medium rounded-lg transition-all">
                  Learn More
                </Link>
              </div>

              <div className="flex items-center space-x-2 text-medantra-primary-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>HIPAA Compliant</span>
                <span className="mx-2">•</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Secure Data</span>
                <span className="mx-2">•</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span>Expert Support</span>
              </div>
            </div>

            <div className="h-[500px] relative rounded-lg shadow-xl">
              <ChatInterface isAuthenticated={!!currentUser} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-medantra-neutral-900 mb-4">Comprehensive Healthcare Features</h2>
          <p className="text-xl text-medantra-neutral-600 max-w-2xl mx-auto">
            ReviveRx provides intelligent tools to help you manage your health effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center"
            >
              <div className="text-medantra-primary-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-medantra-neutral-900 mb-3">{feature.title}</h3>
              <p className="text-medantra-neutral-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Personalized Content for Logged In Users */}
      {currentUser && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Health Dashboard */}
            <div className="lg:col-span-2 grid grid-cols-1 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-medantra-neutral-900">Your Health Dashboard</h3>
                  <button className="text-sm text-medantra-secondary-500 hover:text-medantra-secondary-600">
                    View Details
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {healthMetrics.map((metric) => (
                    <div key={metric.id} className="bg-medantra-neutral-50 rounded-lg p-4">
                      <p className="text-sm text-medantra-neutral-600 mb-1">{metric.name}</p>
                      <div className="flex items-end justify-between">
                        <p className="text-xl font-semibold text-medantra-neutral-900">{metric.value}</p>
                        <div className={`flex items-center text-xs ${metric.trend === 'up' ? 'text-medantra-success' : 'text-medantra-error'}`}>
                          {metric.trend === 'up' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                            </svg>
                          )}
                          <span className="ml-1">{metric.change}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-medantra-neutral-900">Upcoming Appointments</h3>
                  <button className="text-sm text-medantra-secondary-500 hover:text-medantra-secondary-600">
                    Schedule New
                  </button>
                </div>

                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center p-4 border border-medantra-neutral-200 rounded-lg hover:bg-medantra-neutral-50">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${appointment.virtual ? 'bg-medantra-secondary-100 text-medantra-secondary-600' : 'bg-medantra-primary-100 text-medantra-primary-600'}`}>
                          {appointment.virtual ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium text-medantra-neutral-900">{appointment.doctor}</p>
                          <p className="text-sm text-medantra-neutral-600">{appointment.specialty}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-medantra-neutral-900">{appointment.date}</p>
                          <p className="text-sm text-medantra-neutral-600">{appointment.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-medantra-neutral-500">
                    <p>No upcoming appointments</p>
                  </div>
                )}
              </div>
            </div>

            {/* Personalized Health Tips */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-medantra-neutral-900 mb-6">Your Health Tips</h3>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-medantra-primary-50 to-medantra-primary-100 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-medantra-primary-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="font-medium text-medantra-primary-700">Hydration Reminder</p>
                  </div>
                  <p className="text-sm text-medantra-primary-800">Based on your activity level, try to drink at least 2.5 liters of water today.</p>
                </div>

                <div className="bg-gradient-to-br from-medantra-secondary-50 to-medantra-secondary-100 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-medantra-secondary-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                    </svg>
                    <p className="font-medium text-medantra-secondary-700">Medication Reminder</p>
                  </div>
                  <p className="text-sm text-medantra-secondary-800">Remember to take your allergy medication with breakfast.</p>
                </div>

                <div className="p-4 border border-medantra-neutral-200 rounded-lg">
                  <div className="flex items-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-medantra-warning mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="font-medium text-medantra-warning">Pollen Alert</p>
                  </div>
                  <p className="text-sm text-medantra-neutral-800">Pollen levels are high today. Consider taking preventive measures for your allergies.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Health Blog Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-baseline mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-medantra-neutral-900">Health Articles</h2>
            <p className="text-lg text-medantra-neutral-600">Latest insights from medical professionals</p>
          </div>
          <Link to="/blog" className="text-medantra-secondary-600 hover:text-medantra-secondary-700 font-medium">
            View All Articles
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {healthArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-medantra-neutral-900 mb-2">{article.title}</h3>
                <p className="text-medantra-neutral-600 mb-4">{article.summary}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-medantra-neutral-500">{article.readTime}</span>
                  <Link to={`/blog/${article.id}`} className="text-medantra-secondary-600 hover:text-medantra-secondary-700 text-sm font-medium">
                    Read More &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-gradient-to-br from-medantra-secondary-600 to-medantra-secondary-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            Start Your Health Journey with AI-Powered Guidance
          </h2>
          <p className="text-xl text-medantra-secondary-100 mb-8 max-w-2xl mx-auto">
            Create your personalized health profile and get customized medical guidance based on your unique health needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="px-8 py-3 bg-white text-medantra-secondary-700 hover:bg-medantra-secondary-50 font-medium rounded-lg transition-colors shadow-lg">
              Create Your Account
            </Link>
            <Link to="/about" className="px-8 py-3 bg-transparent border border-white text-white hover:bg-white hover:bg-opacity-10 font-medium rounded-lg transition-all">
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-medantra-neutral-900 text-medantra-neutral-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-display font-bold text-white mb-4">
              Med<span className="text-medantra-secondary-500">antra</span>
            </h3>
            <p className="mb-6 max-w-md">
              AI-powered healthcare guidance for personalized wellness journeys. Your health companion that understands your unique needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-medantra-neutral-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a href="#" className="text-medantra-neutral-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-medantra-neutral-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        
          <div>
            <h4 className="font-semibold text-white mb-3">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Medical AI Assistant</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Health Records</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Telemedicine</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Medication Tracking</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Health Analytics</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessibility</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-medantra-neutral-800 pt-8 mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Medantra. All rights reserved.</p>
          <p className="mt-2">Disclaimer: Medantra AI provides general health information and is not a substitute for professional medical advice, diagnosis, or treatment.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;