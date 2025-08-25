import React, { useRef, useEffect } from 'react';
import { X, Minimize, Maximize } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatTypingIndicator } from './ChatTypingIndicator';

export const ChatContainer = ({ isOpen, onClose, minimized, onMinimize, onMaximize }) => {
  const { messages, isTyping } = useChat();
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && !minimized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, minimized]);

  if (!isOpen) return null;

  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full p-3 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 animate-pulse" onClick={onMaximize}>
        <div className="w-10 h-10 flex items-center justify-center text-white">
          <span className="text-xl font-bold">AI</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-[380px] h-[600px] max-h-[80vh] bg-surface border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden z-50 animate-slide-up">
      {/* Chat header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <h3 className="text-white font-bold">PredictionForge AI</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={onMinimize}
            className="text-white/80 hover:text-white transition-colors"
          >
            <Minimize size={18} />
          </button>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl text-white">🚀</span>
            </div>
            <h3 className="text-lg font-bold mb-2">PredictionForge AI Assistant</h3>
            <p className="text-text-secondary text-sm">
              I can help you create predictions, explain how the platform works, and guide you through the MVP generation process.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isTyping && <ChatTypingIndicator />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-border p-4 bg-surface">
        <ChatInput />
      </div>
    </div>
  );
};

