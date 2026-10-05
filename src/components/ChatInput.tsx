import React, { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { Send, Trash2, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onClearChat: () => void;
  disabled?: boolean;
  sampleQuestions?: string[];
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onClearChat,
  disabled = false,
  sampleQuestions = []
}) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSendMessage(text.trim());
      setText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  return (
    <div className="space-y-3">
      {sampleQuestions.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-500" /> Suggestions:
          </span>
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(q)}
              disabled={disabled}
              className="px-3 py-1 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full shrink-0 transition-colors shadow-2xs font-medium text-xs disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl p-2 shadow-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask MediBot AI about medicines, usage, precautions... (Press Enter to send)"
          disabled={disabled}
          rows={1}
          className="w-full bg-transparent px-3 py-2 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-none min-h-[44px] max-h-[120px]"
        />

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60 px-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              onClick={onClearChat}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors flex items-center gap-1"
              title="Clear active chat conversation"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-medium">Clear Chat</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 hidden sm:inline">
              Shift + Enter for new line
            </span>
            <button
              onClick={handleSend}
              disabled={!text.trim() || disabled}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium text-xs flex items-center gap-1.5 shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
