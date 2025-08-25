import React from 'react';
import { User, Bot, ExternalLink, Copy, Check } from 'lucide-react';
import { ChatActionButton } from './ChatActionButton';
import { ChatCodeBlock } from './ChatCodeBlock';

export const ChatMessage = ({ message }) => {
  const [copied, setCopied] = React.useState(false);
  const isUser = message.role === 'user';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Function to render message content with support for code blocks and links
  const renderContent = (content) => {
    if (typeof content !== 'string') {
      return content;
    }

    // Check if the content contains code blocks
    if (content.includes('```')) {
      const parts = content.split(/(```[\s\S]*?```)/g);
      return parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const code = part.slice(3, -3);
          const language = code.split('\n')[0].trim();
          const codeContent = language ? code.substring(language.length + 1) : code;
          
          return (
            <ChatCodeBlock 
              key={index} 
              code={codeContent} 
              language={language || 'javascript'} 
            />
          );
        }
        
        // Process links in regular text
        return <span key={index}>{processLinks(part)}</span>;
      });
    }
    
    return processLinks(content);
  };

  // Process links in text
  const processLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 underline inline-flex items-center"
          >
            {part.length > 30 ? part.substring(0, 30) + '...' : part}
            <ExternalLink size={12} className="ml-1" />
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className={`mb-4 ${isUser ? 'flex justify-end' : 'flex justify-start'}`}>
      <div className={`
        max-w-[85%] rounded-2xl p-3 relative group
        ${isUser 
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-none' 
          : 'bg-white dark:bg-gray-800 border border-border shadow-sm rounded-tl-none'
        }
      `}>
        <div className="flex items-start space-x-2">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1
            ${isUser 
              ? 'bg-indigo-700 text-white' 
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
            }
          `}>
            {isUser ? <User size={14} /> : <Bot size={14} />}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className={`text-xs font-medium mb-1 ${isUser ? 'text-indigo-100' : 'text-indigo-600'}`}>
              {isUser ? 'You' : 'PredictionForge AI'}
            </div>
            
            <div className={`text-sm ${isUser ? 'text-white' : 'text-text-primary dark:text-gray-200'}`}>
              {renderContent(message.content)}
            </div>
            
            {message.actions && message.actions.length > 0 && (
              <div className="mt-3 space-y-2">
                {message.actions.map((action, index) => (
                  <ChatActionButton key={index} action={action} />
                ))}
              </div>
            )}
          </div>
        </div>
        
        {!isUser && (
          <button 
            onClick={copyToClipboard}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            aria-label="Copy message"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        )}
      </div>
    </div>
  );
};

