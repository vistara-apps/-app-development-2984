import React from 'react';
import { ArrowRight, Zap, ExternalLink } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';

export const ChatActionCard = ({ title, description, actions, className }) => {
  const { executeAction } = useChat();
  
  return (
    <div className={`
      my-4 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900
      bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30
      ${className || ''}
    `}>
      {title && (
        <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">
          {title}
        </h3>
      )}
      
      {description && (
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          {description}
        </p>
      )}
      
      {actions && actions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {actions.map((action, index) => {
            const Icon = action.icon === 'zap' ? Zap : 
                         action.icon === 'external-link' ? ExternalLink : 
                         ArrowRight;
            
            return (
              <button
                key={index}
                onClick={() => executeAction(action)}
                className="flex items-center space-x-1 text-sm font-medium text-white 
                           bg-gradient-to-r from-indigo-600 to-purple-600 
                           px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity
                           shadow-sm hover:shadow-md"
              >
                <span>{action.label}</span>
                <Icon size={14} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

