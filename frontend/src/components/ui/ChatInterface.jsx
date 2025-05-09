import { useState } from 'react';

const ChatInterface = ({ isAuthenticated = false, dashboardMode = false }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      content: 'Hello! I\'m ReviveRx AI, your medical assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        content: generateDemoResponse(input, isAuthenticated),
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  // Demo responses based on authentication status
  const generateDemoResponse = (query, isAuth) => {
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('headache') || lowercaseQuery.includes('head pain')) {
      if (isAuth) {
        return 'Based on your health profile and the symptoms you\'ve described, this could be a tension headache. I recommend rest and over-the-counter pain relievers like acetaminophen. If the pain persists for more than 3 days or worsens significantly, please consult with Dr. Roberts as mentioned in your last checkup. Would you like me to schedule an appointment?';
      } else {
        return 'Headaches can be caused by various factors including stress, dehydration, or eye strain. For occasional headaches, rest and over-the-counter pain relievers may help. However, I recommend consulting with a healthcare professional for persistent or severe headaches. Would you like more information on headache management?';
      }
    } else if (lowercaseQuery.includes('cold') || lowercaseQuery.includes('flu') || lowercaseQuery.includes('fever')) {
      if (isAuth) {
        return 'I see from your records that you\'ve had seasonal allergies in the past. Your symptoms might be related to that or could be a common cold. Rest, stay hydrated, and consider the antihistamines that worked for you previously. Your temperature records don\'t show a history of high fevers, but if your temperature exceeds 101°F, please contact your physician.';
      } else {
        return 'Common cold symptoms include runny nose, sore throat, and mild fever. Rest, stay hydrated, and over-the-counter cold medications may help manage symptoms. If symptoms persist beyond a week or worsen significantly, please consult a healthcare professional.';
      }
    } else if (lowercaseQuery.includes('sleep') || lowercaseQuery.includes('insomnia')) {
      if (isAuth) {
        return 'According to your health data, your average sleep duration has decreased by 1.2 hours in the past month. This could be contributing to your symptoms. Your past medical history doesn\'t show chronic insomnia, but your recent screen time metrics show increased usage before bedtime. Try reducing screen time 1-2 hours before bed and consider the relaxation techniques we discussed in your last wellness check.';
      } else {
        return 'Poor sleep can be caused by many factors including stress, caffeine consumption, irregular sleep schedule, or screen time before bed. Establishing a relaxing bedtime routine, keeping your bedroom cool and dark, and maintaining regular sleep hours can help improve sleep quality. If insomnia persists, consider speaking with a healthcare provider.';
      }
    } else if (lowercaseQuery.includes('vitamin') || lowercaseQuery.includes('supplement')) {
      if (isAuth) {
        return 'Based on your most recent blood work from March, your vitamin D levels were slightly below the optimal range at 28 ng/mL. This is common in your demographic. Given your current medications and health history, a daily supplement of 1000-2000 IU vitamin D3 would be appropriate. I\'d recommend discussing this with your doctor at your upcoming appointment on May 12th.';
      } else {
        return 'Vitamins and supplements should be taken based on specific nutritional needs, which can vary widely between individuals. Before starting any supplement regimen, it\'s best to consult with a healthcare provider who can assess your specific needs, possibly through blood tests, and make appropriate recommendations based on your health status.';
      }
    } else {
      if (isAuth) {
        return 'Thank you for your question. Based on your medical history and the information provided, I can offer personalized advice. For more detailed analysis, I can review your health records or connect you with your healthcare provider. Is there anything specific about your medical history you\'d like me to consider?';
      } else {
        return 'Thank you for your question. While I can provide general health information, for personalized medical advice, I recommend consulting with a healthcare professional. Creating an account will allow me to provide more tailored guidance based on your health profile. Would you like more general information on this topic?';
      }
    }
  };

  // Render different UI based on dashboardMode
  if (dashboardMode) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-medantra-secondary-500 text-white rounded-tr-none shadow-sm' 
                    : 'bg-medantra-neutral-100 text-medantra-neutral-800 rounded-tl-none shadow-sm'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-medantra-neutral-100 text-medantra-neutral-800 p-3 rounded-lg rounded-tl-none max-w-[80%] shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-medantra-primary-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-medantra-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-medantra-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Standard chat interface for non-dashboard mode
  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-medantra-primary-600 to-medantra-primary-700 p-4">
        <h2 className="text-white text-lg font-semibold">ReviveRx AI Health Assistant</h2>
        <p className="text-medantra-primary-100 text-sm">
          {isAuthenticated 
            ? 'Personalized medical guidance based on your health profile' 
            : 'General medical information and guidance'}
        </p>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-medantra-secondary-500 text-white rounded-tr-none' 
                  : 'bg-medantra-neutral-100 text-medantra-neutral-800 rounded-tl-none'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-medantra-neutral-100 text-medantra-neutral-800 p-3 rounded-lg rounded-tl-none max-w-[80%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-medantra-primary-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-medantra-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-medantra-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t border-medantra-neutral-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about your health concerns..."
            className="flex-grow px-4 py-2 border border-medantra-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medantra-primary-500"
          />
          <button 
            type="submit" 
            className="bg-medantra-primary-600 hover:bg-medantra-primary-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
            disabled={!input.trim() || isTyping}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        {!isAuthenticated && (
          <p className="mt-2 text-xs text-medantra-neutral-500 italic">
            Sign in or create an account for personalized medical guidance based on your health profile.
          </p>
        )}
      </form>
    </div>
  );
};

export default ChatInterface;