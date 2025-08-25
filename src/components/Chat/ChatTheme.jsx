import React from 'react';

// This component doesn't render anything visible
// It's used to inject degen-friendly theme styles into the app
export const ChatTheme = () => {
  return (
    <style jsx global>{`
      /* Neon glow effects */
      .neon-glow {
        box-shadow: 0 0 10px rgba(99, 102, 241, 0.5), 0 0 20px rgba(99, 102, 241, 0.3);
      }
      
      .neon-text {
        text-shadow: 0 0 5px rgba(99, 102, 241, 0.5);
      }
      
      /* Gradient animations */
      .gradient-shift {
        background-size: 200% 200%;
        animation: gradient-shift 5s ease infinite;
      }
      
      @keyframes gradient-shift {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
      
      /* Hover effects */
      .hover-scale {
        transition: transform 0.2s ease;
      }
      
      .hover-scale:hover {
        transform: scale(1.05);
      }
      
      /* Pulse animations */
      .pulse-slow {
        animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      
      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.7;
        }
      }
      
      /* Custom scrollbar for chat */
      .chat-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      
      .chat-scrollbar::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 10px;
      }
      
      .chat-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(99, 102, 241, 0.5);
        border-radius: 10px;
      }
      
      .chat-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(99, 102, 241, 0.7);
      }
      
      /* Glass morphism effect */
      .glass-effect {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      /* Dark mode glass effect */
      .dark .glass-effect {
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
    `}</style>
  );
};

