import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { ChatContainer } from './ChatContainer';
import { useChat } from '../../contexts/ChatContext';

export const ChatOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const { resetUnreadCount, unreadCount } = useChat();

  const toggleChat = () => {
    if (minimized) {
      setMinimized(false);
    } else if (isOpen) {
      setMinimized(true);
    } else {
      setIsOpen(true);
      setMinimized(false);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setMinimized(false);
  };

  // Reset unread count when opening chat
  useEffect(() => {
    if (isOpen && !minimized) {
      resetUnreadCount();
    }
  }, [isOpen, minimized, resetUnreadCount]);

  return (
    <>
      <ChatContainer 
        isOpen={isOpen} 
        onClose={closeChat} 
        minimized={minimized}
        onMinimize={() => setMinimized(true)}
        onMaximize={() => setMinimized(false)}
      />
      
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group z-50"
          aria-label="Open chat"
        >
          <MessageSquare className="text-white" size={24} />
          
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
              {unreadCount}
            </div>
          )}
          
          <span className="absolute -top-10 right-0 bg-gray-800 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Chat with AI
          </span>
        </button>
      )}
    </>
  );
};

