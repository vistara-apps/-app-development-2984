import React, { useEffect, useState } from 'react';

export const ChatMobileOptimizations = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Add mobile-specific classes and behaviors
  useEffect(() => {
    if (isMobile) {
      // Add mobile-specific classes to the chat container
      const chatContainer = document.querySelector('.chat-container');
      if (chatContainer) {
        chatContainer.classList.add('mobile-chat');
      }
      
      // Handle keyboard appearance on mobile
      const handleFocus = () => {
        // Scroll to the input after a short delay to ensure the keyboard is open
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight);
        }, 300);
      };
      
      const chatInput = document.querySelector('.chat-input');
      if (chatInput) {
        chatInput.addEventListener('focus', handleFocus);
      }
      
      // Cleanup
      return () => {
        if (chatContainer) {
          chatContainer.classList.remove('mobile-chat');
        }
        
        if (chatInput) {
          chatInput.removeEventListener('focus', handleFocus);
        }
      };
    }
  }, [isMobile]);
  
  // Add swipe gesture detection for mobile
  useEffect(() => {
    if (!isMobile) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };
    
    const handleTouchMove = (e) => {
      touchEndX = e.touches[0].clientX;
    };
    
    const handleTouchEnd = () => {
      // Detect swipe direction
      const swipeDistance = touchEndX - touchStartX;
      const minSwipeDistance = 100; // Minimum distance to be considered a swipe
      
      if (Math.abs(swipeDistance) < minSwipeDistance) return;
      
      // Swipe right to close chat
      if (swipeDistance > 0) {
        const chatCloseButton = document.querySelector('.chat-close-button');
        if (chatCloseButton) {
          chatCloseButton.click();
        }
      }
    };
    
    // Add event listeners
    const chatElement = document.querySelector('.chat-container');
    if (chatElement) {
      chatElement.addEventListener('touchstart', handleTouchStart);
      chatElement.addEventListener('touchmove', handleTouchMove);
      chatElement.addEventListener('touchend', handleTouchEnd);
    }
    
    // Cleanup
    return () => {
      if (chatElement) {
        chatElement.removeEventListener('touchstart', handleTouchStart);
        chatElement.removeEventListener('touchmove', handleTouchMove);
        chatElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isMobile]);
  
  return (
    <>
      {/* Add mobile-specific styles */}
      <style jsx global>{`
        /* Mobile chat styles */
        @media (max-width: 767px) {
          .chat-container {
            width: 100% !important;
            height: 100% !important;
            max-height: 100% !important;
            bottom: 0 !important;
            right: 0 !important;
            border-radius: 0 !important;
          }
          
          .mobile-chat {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
          }
          
          /* Optimize touch targets */
          .chat-action-button {
            min-height: 44px;
          }
          
          /* Ensure input is above keyboard */
          .chat-input-container {
            position: sticky;
            bottom: 0;
            background-color: var(--bg-surface);
            z-index: 10;
          }
        }
      `}</style>
      
      {children}
    </>
  );
};

