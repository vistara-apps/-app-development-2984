import React, { useState, useRef, useEffect } from 'react';
import { X, Minimize, Maximize, Trash2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatTypingIndicator } from './ChatTypingIndicator';
import { ChatOnboarding } from './ChatOnboarding';
import { useChat } from '../../contexts/ChatContext';
import { hasCompletedOnboarding, markOnboardingComplete } from '../../lib/chatOnboarding';

export const ChatContainer = ({ isOpen, onClose, minimized, onMinimize, onMaximize }) => {
  const { messages, isTyping, clearChat } = useChat();
  const messagesEndRef = useRef(null);
  const [showOnboarding, setShowOnboarding] = useState(!hasCompletedOnboarding());
  
  // Scroll to bottom when messages change or when typing indicator appears/disappears
  useEffect(() => {
    if (messagesEndRef.current && isOpen && !minimized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, minimized]);
  
  // Handle onboarding completion
  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    markOnboardingComplete();
  };
  
  if (!isOpen) {
    return null;
  }
  
  return (
    <div className={`
      fixed z-50 transition-all duration-300 ease-in-out
      ${minimized 
        ? 'bottom-4 right-4 w-60 h-12 rounded-full shadow-md' 
        : 'bottom-4 right-4 w-96 h-[600px] max-h-[80vh] rounded-2xl shadow-xl'
      }
    `}>
      {/* Minimized state */}
      {minimized && (
        <div 
          onClick={onMaximize}
          className="w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-between px-4 cursor-pointer"
        >
          <span className="text-white font-medium truncate">PredictionForge AI</span>
          <Maximize size={18} className="text-white" />
        </div>
      )}
      
      {/* Expanded state */}
      {!minimized && (
        <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600">
            <h3 className="text-white font-medium">PredictionForge AI</h3>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => clearChat()}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Clear chat"
              >
                <Trash2 size={16} />
              </button>
              
              <button
                onClick={onMinimize}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Minimize chat"
              >
                <Minimize size={16} />
              </button>
              
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 chat-scrollbar">
            {showOnboarding && (
              <ChatOnboarding onComplete={handleOnboardingComplete} />
            )}
            
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            
            {isTyping && <ChatTypingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-800">
            <ChatInput />
          </div>
        </div>
      )}
    </div>
  );
};

