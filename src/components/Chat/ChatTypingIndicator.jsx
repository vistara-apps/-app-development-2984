import React from 'react';
import { Bot } from 'lucide-react';

export const ChatTypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[85%] bg-white dark:bg-gray-800 border border-border rounded-2xl rounded-tl-none p-3 shadow-sm">
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
            <Bot size={14} className="text-white" />
          </div>
          
          <div className="flex items-center h-6">
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

