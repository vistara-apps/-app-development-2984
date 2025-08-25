import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, Zap } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';

export const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { sendMessage, isTyping } = useChat();
  const inputRef = useRef(null);

  // Auto-focus the input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className={`
        flex items-center border rounded-xl overflow-hidden transition-all duration-200
        ${isFocused 
          ? 'border-indigo-500 shadow-[0_0_0_1px_rgba(99,102,241,0.5)]' 
          : 'border-border'
        }
      `}>
        <button
          type="button"
          className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
          aria-label="Add emoji"
        >
          <Smile size={20} />
        </button>
        
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Message PredictionForge AI..."
          disabled={isTyping}
          className="flex-1 py-3 px-2 bg-transparent focus:outline-none text-text-primary dark:text-white placeholder:text-gray-400"
        />
        
        <div className="flex items-center">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
            aria-label="Attach file"
          >
            <Paperclip size={20} />
          </button>
          
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
            aria-label="Quick actions"
          >
            <Zap size={20} />
          </button>
          
          <button
            type="submit"
            disabled={!message.trim() || isTyping}
            className={`
              p-2 mx-1 rounded-lg transition-all duration-200
              ${message.trim() && !isTyping
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-md hover:opacity-90'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
      
      {isTyping && (
        <div className="absolute -top-6 left-0 right-0 text-center">
          <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full animate-pulse">
            AI is thinking...
          </span>
        </div>
      )}
    </form>
  );
};

