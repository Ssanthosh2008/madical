import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-3 my-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shrink-0">
        <Bot className="w-4 h-4 animate-bounce" />
      </div>
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3.5 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mr-1">
          MediBot AI is thinking
        </span>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-150"></div>
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  );
};
