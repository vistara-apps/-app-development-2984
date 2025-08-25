import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Lightbulb, TrendingUp, Zap } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';

export const ChatOnboarding = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const { sendMessage } = useChat();
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const steps = [
    {
      title: "Welcome to PredictionForge! 👋",
      description: "I'm your AI assistant. I'll help you navigate the platform and make the most of your experience.",
      icon: <Lightbulb className="text-yellow-500" />,
      action: {
        label: "Get Started",
        onClick: () => {
          setStep(1);
          setHasInteracted(true);
        }
      }
    },
    {
      title: "Submit Your Predictions",
      description: "Share your app ideas as predictions. Be specific about what you're building and what success looks like.",
      icon: <TrendingUp className="text-green-500" />,
      action: {
        label: "Tell Me More",
        onClick: () => {
          setStep(2);
          setHasInteracted(true);
        }
      }
    },
    {
      title: "Get Community Validation",
      description: "Other users will upvote predictions they believe in. This helps validate your ideas before building.",
      icon: <Check className="text-blue-500" />,
      action: {
        label: "Next",
        onClick: () => {
          setStep(3);
          setHasInteracted(true);
        }
      }
    },
    {
      title: "Generate MVPs with AI",
      description: "Once your prediction reaches 50 upvotes, our AI will generate a working MVP codebase for you to start with.",
      icon: <Zap className="text-purple-500" />,
      action: {
        label: "Got It!",
        onClick: () => {
          sendMessage("I'd like to create my first prediction");
          onComplete();
          setHasInteracted(true);
        }
      }
    }
  ];
  
  // Auto-advance if user hasn't interacted
  useEffect(() => {
    if (hasInteracted) return;
    
    const timer = setTimeout(() => {
      if (step < steps.length - 1) {
        setStep(step + 1);
      } else {
        onComplete();
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [step, steps.length, hasInteracted, onComplete]);
  
  const currentStep = steps[step];
  
  return (
    <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-900/30 rounded-xl border border-indigo-100 dark:border-indigo-900 mb-4">
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
          {currentStep.icon}
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-1">
            {currentStep.title}
          </h3>
          
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {currentStep.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {steps.map((_, i) => (
                <div 
                  key={i}
                  className={`
                    w-2 h-2 rounded-full transition-colors
                    ${i === step ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-gray-300 dark:bg-gray-700'}
                  `}
                />
              ))}
            </div>
            
            <button
              onClick={currentStep.action.onClick}
              className="flex items-center space-x-1 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              <span>{currentStep.action.label}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

