import React from 'react';
import { Zap, ArrowRight, Check, X } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';

export const ChatActionButton = ({ action }) => {
  const { executeAction } = useChat();
  const [status, setStatus] = React.useState('idle'); // idle, loading, success, error

  const handleClick = async () => {
    if (status !== 'idle') return;
    
    setStatus('loading');
    try {
      await executeAction(action);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (error) {
      console.error('Error executing action:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'loading':
        return <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>;
      case 'success':
        return <Check size={14} />;
      case 'error':
        return <X size={14} />;
      default:
        return action.icon === 'zap' ? <Zap size={14} /> : <ArrowRight size={14} />;
    }
  };

  const getStyles = () => {
    switch (status) {
      case 'success':
        return 'bg-green-600 hover:bg-green-700';
      case 'error':
        return 'bg-red-600 hover:bg-red-700';
      case 'loading':
        return 'bg-indigo-400 cursor-wait';
      default:
        return 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90';
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={status === 'loading'}
      className={`
        ${getStyles()}
        text-white text-sm font-medium px-4 py-2 rounded-lg
        flex items-center space-x-2 transition-all duration-200
        hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
      `}
    >
      <span>{getIcon()}</span>
      <span>{action.label}</span>
    </button>
  );
};

