import React, { useRef, useEffect } from 'react';
import type { ChatMessage as ChatMessageType, Medicine } from '../types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { DisclaimerBanner } from './DisclaimerBanner';
import { Bot, Sparkles } from 'lucide-react';

interface ChatWindowProps {
  messages: ChatMessageType[];
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  onClearChat: () => void;
  onRegenerateResponse: () => void;
  onOpenMedicineModal: (medicine: Medicine) => void;
  sampleQuestions: string[];
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isTyping,
  onSendMessage,
  onClearChat,
  onRegenerateResponse,
  onOpenMedicineModal,
  sampleQuestions
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
      <div className="px-6 py-3.5 bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
              <span>MediBot AI Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Virtual Pharmacy Intelligence • Simulated AI Engine
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>Frontend Tool Calling Enabled</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        <DisclaimerBanner compact />

        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12 px-4">
            <div className="w-16 h-16 rounded-3xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 flex items-center justify-center shadow-inner">
              <Bot className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-md">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                How can I assist your pharmacy query today?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ask about medicines (Paracetamol, Ibuprofen, Cetirizine, Amoxicillin, Omeprazole), health precautions, or general pharmacy guidance.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              isLast={index === messages.length - 1}
              onRegenerate={onRegenerateResponse}
              onOpenMedicineModal={onOpenMedicineModal}
            />
          ))
        )}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-slate-50/80 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700/80">
        <ChatInput
          onSendMessage={onSendMessage}
          onClearChat={onClearChat}
          disabled={isTyping}
          sampleQuestions={sampleQuestions}
        />
      </div>
    </div>
  );
};
