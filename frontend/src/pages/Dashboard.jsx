import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import ChatInterface from '../components/ui/ChatInterface';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('chat');
  const [notifications, setNotifications] = useState(3);
  const [chatHistory, setChatHistory] = useState([]);
  
  // Mock data for dashboard
  const healthMetrics = [
    { id: 1, name: "Heart Rate", value: "72 BPM", change: "+2", trend: "up" },
    { id: 2, name: "Blood Pressure", value: "120/80", change: "-5", trend: "down" },
    { id: 3, name: "Sleep", value: "7.2 hrs", change: "+0.5", trend: "up" },
    { id: 4, name: "Steps", value: "8,452", change: "+1,200", trend: "up" },
  ];

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

  const recentMedications = [
    {
      id: 1,
      name: "Atorvastatin",
      dosage: "10mg",
      frequency: "Daily",
      time: "Evening",
      lastTaken: "Today, 8:00 PM"
    },
    {
      id: 2,
      name: "Lisinopril",
      dosage: "5mg",
      frequency: "Daily",
      time: "Morning",
      lastTaken: "Today, 9:00 AM"
    },
    {
      id: 3,
      name: "Cetirizine",
      dosage: "10mg",
      frequency: "As needed",
      time: "Any",
      lastTaken: "Yesterday, 2:00 PM"
    }
  ];

  // Sidebar navigation items
  const sidebarItems = [
    { id: 'chat', label: 'AI Chat', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    )},
    { id: 'health', label: 'Health Records', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )},
    { id: 'appointments', label: 'Appointments', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )},
    { id: 'medications', label: 'Medications', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )},
    { id: 'reports', label: 'Reports & Analytics', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )},
    { id: 'settings', label: 'Settings', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )}
  ];

  // Mock suggested questions for chat
  const suggestedQuestions = [
    "What might cause persistent headaches?", 
    "How can I improve my sleep quality?",
    "Tell me about vitamin D deficiency symptoms",
    "What exercises are good for lower back pain?"
  ];

  return (
    <div className="flex h-screen bg-medantra-neutral-50">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r border-medantra-neutral-200">
        <div className="px-6 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold text-medantra-primary-600">
            Med<span className="text-medantra-secondary-500">antra</span>
          </h2>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="px-3 py-4">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg ${
                    activeTab === item.id 
                    ? 'bg-medantra-primary-50 text-medantra-primary-600' 
                    : 'text-medantra-neutral-700 hover:bg-medantra-neutral-100'
                  }`}
                >
                  <span className={`mr-3 ${activeTab === item.id ? 'text-medantra-primary-600' : 'text-medantra-neutral-500'}`}>
                    {item.icon}
                  </span>
                  {item.label}

                  {/* Notification badge for chat */}
                  {item.id === 'chat' && notifications > 0 && (
                    <span className="ml-auto bg-medantra-secondary-500 text-white px-2 py-0.5 rounded-full text-xs">
                      {notifications}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User profile section */}
        <div className="px-3 py-3 border-t border-medantra-neutral-200">
          <div className="flex items-center px-2 py-2.5">
            <div className="w-10 h-10 rounded-full bg-medantra-primary-600 text-white flex items-center justify-center">
              {currentUser?.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-medantra-neutral-900 truncate">
                {currentUser?.displayName || currentUser?.email || 'User'}
              </p>
              <p className="text-xs text-medantra-neutral-500 truncate">
                {currentUser?.email}
              </p>
            </div>
            <button className="p-1 text-medantra-neutral-500 hover:text-medantra-primary-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button className="md:hidden mr-2 bg-medantra-neutral-100 p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-medantra-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl font-display font-semibold text-medantra-neutral-900">
                {activeTab === 'chat' && 'AI Health Assistant'}
                {activeTab === 'health' && 'Health Records'}
                {activeTab === 'appointments' && 'Appointments'}
                {activeTab === 'medications' && 'Medications'}
                {activeTab === 'reports' && 'Reports & Analytics'}
                {activeTab === 'settings' && 'Settings'}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-1.5 text-medantra-neutral-500 hover:bg-medantra-neutral-100 rounded-full relative transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-medantra-secondary-500"></span>
                )}
              </button>
              <button className="p-1.5 text-medantra-neutral-500 hover:bg-medantra-neutral-100 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard content based on active tab */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-medantra-neutral-50">
          {activeTab === 'chat' && (
            <div className="flex flex-col h-full max-h-full">
              {/* Chat interface layout */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full p-4 md:p-6">
                {/* Main chat area */}
                <div className="lg:col-span-3 flex flex-col h-full bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="flex-1 overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto px-4 py-4">
                      {/* Welcome message when chat is empty */}
                      {chatHistory.length === 0 && (
                        <div className="text-center py-16">
                          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-medantra-primary-100 mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-medantra-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-display font-semibold text-medantra-neutral-900 mb-2">Welcome to Medantra AI Chat</h3>
                          <p className="text-medantra-neutral-600 max-w-md mx-auto mb-6">
                            Your personal AI health assistant is ready to answer your questions and provide guidance based on your health information.
                          </p>
                          <div className="flex flex-wrap justify-center gap-2">
                            {suggestedQuestions.map((question, index) => (
                              <button 
                                key={index}
                                className="px-4 py-2 bg-medantra-primary-50 text-medantra-primary-600 text-sm rounded-full hover:bg-medantra-primary-100 transition-colors"
                              >
                                {question}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ChatInterface component handles the actual messages */}
                      <ChatInterface isAuthenticated={true} dashboardMode={true} />
                    </div>
                    
                    {/* Message input area */}
                    <div className="border-t border-medantra-neutral-200 px-4 py-3">
                      <div className="flex items-end space-x-2">
                        <div className="flex-1 min-h-[80px]">
                          <textarea 
                            className="w-full h-full min-h-[80px] px-4 py-3 bg-medantra-neutral-50 border border-medantra-neutral-200 rounded-lg focus:ring-2 focus:ring-medantra-primary-500 focus:border-transparent resize-none"
                            placeholder="Type your health question here..."
                            rows={3}
                          ></textarea>
                        </div>
                        <div>
                          <button className="inline-flex items-center justify-center p-3 bg-medantra-primary-600 hover:bg-medantra-primary-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-xs text-medantra-neutral-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Medantra AI provides general guidance but does not replace professional medical advice</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Health sidebar */}
                <div className="hidden lg:flex flex-col space-y-6">
                  {/* Health metrics */}
                  <div className="bg-white rounded-xl shadow-md p-5 transition-shadow hover:shadow-lg">
                    <h3 className="text-lg font-display font-semibold text-medantra-neutral-900 mb-4">Your Health Overview</h3>
                    <div className="space-y-4">
                      {healthMetrics.map((metric) => (
                        <div key={metric.id} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-medantra-neutral-600">{metric.name}</p>
                            <p className="font-medium text-medantra-neutral-900">{metric.value}</p>
                          </div>
                          <div className={`flex items-center text-xs ${metric.trend === 'up' ? 'text-medantra-success' : 'text-medantra-error'}`}>
                            {metric.trend === 'up' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5-5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                              </svg>
                            )}
                            <span className="ml-1">{metric.change}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-medantra-neutral-200">
                      <a href="#" className="text-sm text-medantra-primary-600 hover:text-medantra-primary-700 font-medium flex items-center transition-colors">
                        View full health report
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Next appointment */}
                  <div className="bg-white rounded-xl shadow-md p-5 transition-shadow hover:shadow-lg">
                    <h3 className="text-lg font-display font-semibold text-medantra-neutral-900 mb-2">Next Appointment</h3>
                    {upcomingAppointments.length > 0 ? (
                      <div>
                        <div className={`mt-2 p-3 border rounded-lg ${upcomingAppointments[0].virtual ? 'border-medantra-secondary-200 bg-medantra-secondary-50' : 'border-medantra-primary-200 bg-medantra-primary-50'}`}>
                          <div className="flex items-start">
                            <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center mr-3 ${upcomingAppointments[0].virtual ? 'bg-medantra-secondary-100 text-medantra-secondary-600' : 'bg-medantra-primary-100 text-medantra-primary-600'}`}>
                              {upcomingAppointments[0].virtual ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-medantra-neutral-900">{upcomingAppointments[0].doctor}</p>
                              <p className="text-sm text-medantra-neutral-600">{upcomingAppointments[0].specialty}</p>
                              <p className="mt-1 text-sm text-medantra-neutral-900">
                                {upcomingAppointments[0].date} at {upcomingAppointments[0].time}
                              </p>
                              <p className="text-sm text-medantra-neutral-600">{upcomingAppointments[0].location}</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-between space-x-2">
                          <button className="flex-1 text-sm bg-white border border-medantra-neutral-300 hover:bg-medantra-neutral-50 text-medantra-neutral-800 font-medium py-2 rounded-md transition-colors">Reschedule</button>
                          <button className="flex-1 text-sm bg-medantra-primary-600 hover:bg-medantra-primary-700 text-white font-medium py-2 rounded-md transition-colors shadow-sm hover:shadow">
                            {upcomingAppointments[0].virtual ? 'Join Call' : 'Check In'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-medantra-neutral-500">
                        <p>No upcoming appointments</p>
                        <button className="mt-2 text-sm bg-medantra-primary-600 hover:bg-medantra-primary-700 text-white font-medium px-4 py-2 rounded-md transition-colors shadow-sm hover:shadow">
                          Schedule Now
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Medication reminders */}
                  <div className="bg-white rounded-xl shadow-md p-5 transition-shadow hover:shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-display font-semibold text-medantra-neutral-900">Medications</h3>
                      <Link to="/medications" className="text-sm text-medantra-secondary-600 hover:text-medantra-secondary-700 transition-colors">
                        View All
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {recentMedications.slice(0, 2).map((med) => (
                        <div key={med.id} className="flex items-center p-3 border border-medantra-neutral-200 rounded-lg hover:border-medantra-secondary-300 transition-colors">
                          <div className="w-10 h-10 bg-medantra-secondary-100 rounded-lg flex items-center justify-center text-medantra-secondary-600 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-medantra-neutral-900">{med.name} {med.dosage}</p>
                            <p className="text-xs text-medantra-neutral-500">{med.frequency}, {med.time}</p>
                            <p className="text-xs text-medantra-neutral-600 mt-1">Last taken: {med.lastTaken}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'health' && (
            <div className="p-6">
              <div className="bg-white rounded-xl shadow-md p-6 transition-shadow hover:shadow-lg">
                <h2 className="text-xl font-display font-semibold text-medantra-neutral-900 mb-4">Health Records</h2>
                <p className="text-medantra-neutral-600">Your health records content will be shown here.</p>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="p-6">
              <div className="bg-white rounded-xl shadow-md p-6 transition-shadow hover:shadow-lg">
                <h2 className="text-xl font-display font-semibold text-medantra-neutral-900 mb-4">Your Appointments</h2>
                <p className="text-medantra-neutral-600">Your appointments content will be shown here.</p>
              </div>
            </div>
          )}

          {activeTab === 'medications' && (
            <div className="p-6">
              <div className="bg-white rounded-xl shadow-md p-6 transition-shadow hover:shadow-lg">
                <h2 className="text-xl font-display font-semibold text-medantra-neutral-900 mb-4">Medication Tracking</h2>
                <p className="text-medantra-neutral-600">Your medications content will be shown here.</p>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="p-6">
              <div className="bg-white rounded-xl shadow-md p-6 transition-shadow hover:shadow-lg">
                <h2 className="text-xl font-display font-semibold text-medantra-neutral-900 mb-4">Health Reports</h2>
                <p className="text-medantra-neutral-600">Your health reports and analytics will be shown here.</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6">
              <div className="bg-white rounded-xl shadow-md p-6 transition-shadow hover:shadow-lg">
                <h2 className="text-xl font-display font-semibold text-medantra-neutral-900 mb-4">Account Settings</h2>
                <p className="text-medantra-neutral-600">Your account settings will be shown here.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;