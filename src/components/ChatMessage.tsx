import React, { useState } from 'react';
import { Bot, User, Copy, Check, RefreshCw, Pill, Sparkles } from 'lucide-react';
import type { ChatMessage as ChatMessageType, Medicine } from '../types';
import { ToolCallBadge } from './ToolCallBadge';

interface ChatMessageProps {
  message: ChatMessageType;
  isLast?: boolean;
  onRegenerate?: () => void;
  onOpenMedicineModal?: (medicine: Medicine) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isLast,
  onRegenerate,
  onOpenMedicineModal
}) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      let parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <React.Fragment key={i}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="font-semibold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
          {i < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div className={`flex items-start gap-3 my-4 group ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm ${
          isUser
            ? 'bg-slate-700 dark:bg-slate-600'
            : 'bg-gradient-to-tr from-blue-600 to-indigo-600'
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      <div className={`max-w-[85%] sm:max-w-[75%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="font-medium text-slate-600 dark:text-slate-300">
            {isUser ? 'You' : 'MediBot AI'}
          </span>
          <span>•</span>
          <span>{message.timestamp}</span>
          {message.isSimulated && !isUser && (
            <span className="inline-flex items-center gap-1 text-[10px] bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded font-medium border border-blue-200 dark:border-blue-800">
              <Sparkles className="w-2.5 h-2.5" /> Simulated AI Response
            </span>
          )}
        </div>

        <div
          className={`p-4 rounded-2xl shadow-sm text-xs sm:text-sm leading-relaxed relative ${
            isUser
              ? 'bg-blue-600 text-white rounded-tr-xs'
              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-tl-xs'
          }`}
        >
          {message.toolCall && !isUser && (
            <ToolCallBadge toolCall={message.toolCall} />
          )}

          <div className="whitespace-pre-wrap">
            {renderFormattedText(message.text)}
          </div>

          {message.medicineRef && onOpenMedicineModal && (
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400">
                <Pill className="w-4 h-4" />
                <span>{message.medicineRef.name} Card</span>
              </div>
              <button
                onClick={() => onOpenMedicineModal(message.medicineRef!)}
                className="text-xs bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-800 font-medium transition-colors"
              >
                View Full Details
              </button>
            </div>
          )}
        </div>

        <div className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <button
            onClick={handleCopy}
            className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-[11px]"
            title="Copy message"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="text-[10px]">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {!isUser && isLast && onRegenerate && (
            <button
              onClick={onRegenerate}
              className="p-1 rounded text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-[11px] ml-2"
              title="Regenerate response"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="text-[10px]">Regenerate</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
