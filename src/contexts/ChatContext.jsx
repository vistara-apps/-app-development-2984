import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { generateChatResponse, generateMVPCode } from '../lib/openai';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    content: "Hey there! 👋 I'm your PredictionForge AI assistant. I can help you create app predictions, validate your ideas, and even generate MVPs when your ideas get enough upvotes. What would you like to do today?",
    actions: [
      { id: 'create-prediction', label: 'Create a prediction', icon: 'zap', action: 'createPrediction' },
      { id: 'explore-platform', label: 'Explore the platform', icon: 'arrow-right', action: 'explorePlatform' },
      { id: 'view-leaderboard', label: 'View top predictions', icon: 'arrow-right', action: 'viewLeaderboard' },
    ]
  }
];

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = useCallback(async (content) => {
    // Add user message to the chat
    const userMessage = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    
    // Update chat history for context
    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);
    
    // Set typing indicator
    setIsTyping(true);
    
    try {
      // Get AI response
      const response = await generateChatResponse(content, updatedHistory);
      
      // Add AI response to the chat
      setTimeout(() => {
        setMessages(prev => [...prev, response]);
        setIsTyping(false);
        
        // Increment unread count if chat is not in focus
        if (document.visibilityState !== 'visible') {
          setUnreadCount(prev => prev + 1);
        }
        
        // Update chat history
        setChatHistory(prev => [...prev, response]);
      }, 500 + Math.random() * 1000); // Add a small random delay for a more natural feel
    } catch (error) {
      console.error('Error generating chat response:', error);
      
      // Add error message
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: "I'm sorry, I encountered an error while processing your request. Please try again." 
          }
        ]);
        setIsTyping(false);
      }, 500);
    }
  }, [chatHistory]);

  const executeAction = useCallback(async (action) => {
    switch (action.action) {
      case 'createPrediction':
        sendMessage("I want to create a new prediction");
        break;
      case 'explorePlatform':
        sendMessage("Tell me how PredictionForge works");
        break;
      case 'viewLeaderboard':
        sendMessage("Show me the top predictions");
        break;
      case 'generateMVP':
        if (action.predictionId && action.statement) {
          setIsTyping(true);
          try {
            // Simulate MVP generation
            setTimeout(() => {
              setMessages(prev => [
                ...prev,
                {
                  role: 'assistant',
                  content: `I'm generating an MVP for your prediction: "${action.statement}". This will take a moment...`
                }
              ]);
              
              // After a delay, show success message
              setTimeout(() => {
                setMessages(prev => [
                  ...prev,
                  {
                    role: 'assistant',
                    content: "✅ MVP generated successfully! You can now view the code repository and live preview.",
                    actions: [
                      { 
                        id: 'view-repo', 
                        label: 'View Repository', 
                        icon: 'arrow-right', 
                        action: 'openUrl',
                        url: `https://github.com/demo/generated-mvp-${action.predictionId}`
                      },
                      { 
                        id: 'view-preview', 
                        label: 'View Live Preview', 
                        icon: 'arrow-right', 
                        action: 'openUrl',
                        url: `https://generated-mvp-${action.predictionId}.vercel.app`
                      }
                    ]
                  }
                ]);
                setIsTyping(false);
              }, 3000);
            }, 1000);
          } catch (error) {
            console.error('Error generating MVP:', error);
            setIsTyping(false);
          }
        }
        break;
      case 'openUrl':
        if (action.url) {
          window.open(action.url, '_blank');
        }
        break;
      default:
        console.warn('Unknown action:', action.action);
    }
  }, [sendMessage]);

  const resetUnreadCount = useCallback(() => {
    setUnreadCount(0);
  }, []);

  const clearChat = useCallback(() => {
    setMessages(INITIAL_MESSAGES);
    setChatHistory([]);
    localStorage.removeItem('chatMessages');
  }, []);

  const value = {
    messages,
    isTyping,
    unreadCount,
    sendMessage,
    executeAction,
    resetUnreadCount,
    clearChat
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

