import React, { useState } from 'react';
import { Copy, Check, Code } from 'lucide-react';

export const ChatCodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting (in a real app, you'd use a library like Prism.js)
  const highlightCode = (code, language) => {
    // This is a very basic implementation
    if (language === 'javascript' || language === 'js') {
      return code
        .replace(/(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await)/g, '<span class="text-purple-600">$1</span>')
        .replace(/(["'`])(.*?)\1/g, '<span class="text-green-600">$1$2$1</span>')
        .replace(/(\{|\}|\(|\)|\[|\]|;|,|\.)/g, '<span class="text-yellow-600">$1</span>')
        .replace(/(\/\/.*)/g, '<span class="text-gray-500">$1</span>');
    }
    return code;
  };

  return (
    <div className="my-3 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Code size={14} className="text-gray-500" />
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{language}</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code 
          dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
          className="font-mono text-gray-800 dark:text-gray-200"
        />
      </pre>
    </div>
  );
};

