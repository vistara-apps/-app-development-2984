import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

export const ChatProgressIndicator = ({ steps, currentStep }) => {
  return (
    <div className="my-4 px-2">
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <div 
              key={index}
              className={`
                flex items-start space-x-3 p-2 rounded-lg transition-colors
                ${isCompleted ? 'bg-green-50 dark:bg-green-900/20' : ''}
                ${isCurrent ? 'bg-indigo-50 dark:bg-indigo-900/20 animate-pulse' : ''}
              `}
            >
              <div className="mt-0.5">
                {isCompleted ? (
                  <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                ) : isCurrent ? (
                  <Clock size={16} className="text-indigo-600 dark:text-indigo-400" />
                ) : (
                  <Circle size={16} className="text-gray-400" />
                )}
              </div>
              
              <div className="flex-1">
                <p className={`
                  text-sm font-medium
                  ${isCompleted ? 'text-green-800 dark:text-green-300' : ''}
                  ${isCurrent ? 'text-indigo-800 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400'}
                `}>
                  {step.title}
                </p>
                
                {(isCompleted || isCurrent) && step.description && (
                  <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                )}
                
                {isCompleted && step.result && (
                  <div className="mt-2 text-xs bg-white dark:bg-gray-800 p-2 rounded border border-green-200 dark:border-green-800">
                    {step.result}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {currentStep < steps.length && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-4">
          <div 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-1.5 rounded-full"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

